"use client";

import {useEffect, useState, useRef, useCallback} from "react";
import {apiClient} from "@/lib/api-client";
import {API_ENDPOINTS} from "@/config/api-endpoints";
import {useAuthStore} from "@/store/auth-store";
import {getSocket} from "@/lib/socket";
import {cn} from "@/lib/utils";
import {formatRelativeTime} from "@/helpers";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Badge} from "@/components/ui/badge";
import {Skeleton} from "@/components/ui/skeleton";
import {Send, MessageSquare, Search, Circle} from "lucide-react";

interface Contact {
    _id: string;
    username: string;
    email: string;
    role: string;
}

interface Message {
    _id: string;
    sender: Contact;
    receiver: Contact;
    content: string;
    read: boolean;
    createdAt: string;
}

interface Conversation {
    user: Contact;
    lastMessage: Message | null;
    unreadCount: number;
}

export default function MessagesPage() {
    const {user} = useAuthStore();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loadingConv, setLoadingConv] = useState(true);
    const [loadingMsg, setLoadingMsg] = useState(false);
    const [sending, setSending] = useState(false);
    const [typing, setTyping] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const typingTimeout = useRef<NodeJS.Timeout | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    };

    // Fetch conversations and contacts
    useEffect(() => {
        Promise.all([
            apiClient.get<{ conversations: Conversation[] }>(API_ENDPOINTS.messages.conversations),
            apiClient.get<{ contacts: Contact[] }>(API_ENDPOINTS.messages.contacts),
        ]).then(([convData, contactData]) => {
            setConversations(convData.conversations || []);
            setContacts(contactData.contacts || []);
        }).catch(console.error).finally(() => setLoadingConv(false));
    }, []);

    // Fetch messages for selected contact
    const fetchMessages = useCallback(async (contactId: string) => {
        setLoadingMsg(true);
        try {
            const data = await apiClient.get<{ messages: Message[] }>(
                API_ENDPOINTS.messages.withContact(contactId)
            );
            setMessages(data.messages || []);
        } catch (err) {
            console.error("Failed to fetch messages:", err);
        } finally {
            setLoadingMsg(false);
        }
    }, []);

    useEffect(() => {
        if (selectedContact) {
            fetchMessages(selectedContact._id);
        }
    }, [selectedContact, fetchMessages]);

    useEffect(() => scrollToBottom(), [messages]);

    // Socket listeners
    useEffect(() => {
        const socket = getSocket();
        if (!socket) return;

        const handleNewMessage = (msg: Message) => {
            const senderId = typeof msg.sender === "object" ? msg.sender._id : msg.sender;
            const receiverId = typeof msg.receiver === "object" ? msg.receiver._id : msg.receiver;
            const isRelevant =
                (selectedContact && (senderId === selectedContact._id || receiverId === selectedContact._id));

            if (isRelevant) {
                setMessages((prev) => {
                    if (prev.some((m) => m._id === msg._id)) return prev;
                    return [...prev, msg];
                });
            }

            // Update conversation list
            setConversations((prev) => {
                const contactId = senderId === user?._id || senderId === user?.id ? receiverId : senderId;
                const existing = prev.find((c) => c.user._id === contactId);
                if (existing) {
                    return prev.map((c) =>
                        c.user._id === contactId
                            ? {...c, lastMessage: msg, unreadCount: isRelevant ? 0 : c.unreadCount + 1}
                            : c
                    ).sort((a, b) => {
                        const aTime = a.lastMessage?.createdAt || "";
                        const bTime = b.lastMessage?.createdAt || "";
                        return new Date(bTime).getTime() - new Date(aTime).getTime();
                    });
                }
                return prev;
            });
        };

        const handleTyping = (data: { from: string; typing: boolean }) => {
            if (selectedContact && data.from === selectedContact._id) {
                setTyping(data.typing);
            }
        };

        const handleOnline = (data: { userId: string; online: boolean }) => {
            setOnlineUsers((prev) => {
                const next = new Set(prev);
                if (data.online) next.add(data.userId);
                else next.delete(data.userId);
                return next;
            });
        };

        const handleRead = (data: { contactId: string }) => {
            if (selectedContact && data.contactId === selectedContact._id) {
                setMessages((prev) => prev.map((m) => ({...m, read: true})));
            }
        };

        socket.on("message:new", handleNewMessage);
        socket.on("message:typing", handleTyping);
        socket.on("user:online", handleOnline);
        socket.on("message:read", handleRead);

        return () => {
            socket.off("message:new", handleNewMessage);
            socket.off("message:typing", handleTyping);
            socket.off("user:online", handleOnline);
            socket.off("message:read", handleRead);
        };
    }, [selectedContact, user]);

    const handleSend = async () => {
        if (!input.trim() || !selectedContact || sending) return;
        setSending(true);
        try {
            await apiClient.post(API_ENDPOINTS.messages.send, {
                receiverId: selectedContact._id,
                content: input.trim(),
            });
            setInput("");
            emitTyping(false);
        } catch (err) {
            console.error("Failed to send:", err);
        } finally {
            setSending(false);
        }
    };

    const emitTyping = (isTyping: boolean) => {
        const socket = getSocket();
        if (socket && selectedContact) {
            socket.emit("message:typing", {to: selectedContact._id, typing: isTyping});
        }
    };

    const handleInputChange = (value: string) => {
        setInput(value);
        emitTyping(true);
        if (typingTimeout.current) clearTimeout(typingTimeout.current);
        typingTimeout.current = setTimeout(() => emitTyping(false), 1500);
    };

    const selectContact = (contact: Contact) => {
        setSelectedContact(contact);
        setMessages([]);
        // Clear unread for this contact
        setConversations((prev) =>
            prev.map((c) => c.user._id === contact._id ? {...c, unreadCount: 0} : c)
        );
    };

    // Merge contacts into conversation list (show contacts without conversations too)
    const allContacts = contacts.map((contact) => {
        const conv = conversations.find((c) => c.user._id === contact._id);
        return {
            user: contact,
            lastMessage: conv?.lastMessage || null,
            unreadCount: conv?.unreadCount || 0,
        };
    });

    // Add any conversation contacts not in the contacts list
    for (const conv of conversations) {
        if (!allContacts.find((c) => c.user._id === conv.user._id)) {
            allContacts.push(conv);
        }
    }

    const filteredContacts = searchQuery
        ? allContacts.filter((c) =>
            c.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.user.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : allContacts;

    const currentUserId = user?._id || user?.id;

    return (
        <div className="flex h-[calc(100vh-8rem)] bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm overflow-hidden">
            {/* Sidebar - Contact List */}
            <div className={cn(
                "w-80 border-r border-slate-100 dark:border-slate-700/50 flex flex-col shrink-0",
                selectedContact ? "hidden md:flex" : "flex w-full md:w-80"
            )}>
                <div className="p-4 border-b border-slate-100 dark:border-slate-700/50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400"/>
                        <Input
                            placeholder="Search contacts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 rounded-xl"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {loadingConv ? (
                        <div className="p-3 space-y-2">
                            {Array.from({length: 5}).map((_, i) => (
                                <Skeleton key={i} className="h-16 rounded-xl"/>
                            ))}
                        </div>
                    ) : filteredContacts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 text-slate-400">
                            <MessageSquare className="size-8 mb-2 opacity-40"/>
                            <p className="text-sm">No contacts found</p>
                        </div>
                    ) : (
                        <div className="p-2">
                            {filteredContacts.map((conv) => {
                                const isSelected = selectedContact?._id === conv.user._id;
                                const isOnline = onlineUsers.has(conv.user._id);
                                return (
                                    <button
                                        key={conv.user._id}
                                        onClick={() => selectContact(conv.user)}
                                        className={cn(
                                            "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors",
                                            isSelected
                                                ? "bg-primary-light/10 dark:bg-primary-light/20"
                                                : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                        )}
                                    >
                                        <div className="relative">
                                            <div className="size-10 rounded-full bg-gradient-to-br from-primary-light to-purple-700 flex items-center justify-center text-white font-semibold text-sm">
                                                {conv.user.username.charAt(0).toUpperCase()}
                                            </div>
                                            {isOnline && (
                                                <Circle className="absolute -bottom-0.5 -right-0.5 size-3.5 fill-emerald-500 text-white dark:text-slate-900 stroke-2"/>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <span className={cn(
                                                    "text-sm font-medium truncate",
                                                    isSelected ? "text-primary-light" : "text-slate-700 dark:text-slate-300"
                                                )}>
                                                    {conv.user.username}
                                                </span>
                                                {conv.lastMessage && (
                                                    <span className="text-[10px] text-slate-400 shrink-0 ml-2">
                                                        {formatRelativeTime(conv.lastMessage.createdAt)}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between mt-0.5">
                                                <p className="text-xs text-slate-400 truncate max-w-[160px]">
                                                    {conv.lastMessage?.content || (
                                                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 rounded-full border-slate-200 dark:border-slate-600">
                                                            {conv.user.role}
                                                        </Badge>
                                                    )}
                                                </p>
                                                {conv.unreadCount > 0 && (
                                                    <span className="min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-primary-light text-white text-[10px] font-bold">
                                                        {conv.unreadCount}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className={cn(
                "flex-1 flex flex-col",
                !selectedContact ? "hidden md:flex" : "flex"
            )}>
                {selectedContact ? (
                    <>
                        {/* Chat Header */}
                        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-700/50 shrink-0">
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden size-8 rounded-lg"
                                    onClick={() => setSelectedContact(null)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                                </Button>
                                <div className="relative">
                                    <div className="size-9 rounded-full bg-gradient-to-br from-primary-light to-purple-700 flex items-center justify-center text-white font-semibold text-sm">
                                        {selectedContact.username.charAt(0).toUpperCase()}
                                    </div>
                                    {onlineUsers.has(selectedContact._id) && (
                                        <Circle className="absolute -bottom-0.5 -right-0.5 size-3 fill-emerald-500 text-white dark:text-slate-900 stroke-2"/>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                        {selectedContact.username}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        {typing ? (
                                            <span className="text-primary-light">typing...</span>
                                        ) : onlineUsers.has(selectedContact._id) ? (
                                            <span className="text-emerald-500">online</span>
                                        ) : (
                                            selectedContact.role
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4">
                            {loadingMsg ? (
                                <div className="flex items-center justify-center h-40">
                                    <div className="size-6 border-2 border-primary-light border-t-transparent rounded-full animate-spin"/>
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-500">
                                    <MessageSquare className="size-12 mb-3 opacity-30"/>
                                    <p className="text-sm">No messages yet</p>
                                    <p className="text-xs mt-1">Send a message to start the conversation</p>
                                </div>
                            ) : (
                                messages.map((msg) => {
                                    const senderId = typeof msg.sender === "object" ? msg.sender._id : msg.sender;
                                    const isMine = senderId === currentUserId;
                                    return (
                                        <div key={msg._id} className={cn("flex", isMine ? "justify-end" : "justify-start")}>
                                            <div className={cn(
                                                "max-w-[70%] rounded-2xl px-4 py-2.5",
                                                isMine
                                                    ? "bg-primary-light text-white rounded-br-md"
                                                    : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-md"
                                            )}>
                                                <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                                                <div className={cn(
                                                    "flex items-center gap-1 mt-1",
                                                    isMine ? "justify-end" : "justify-start"
                                                )}>
                                                    <span className={cn(
                                                        "text-[10px]",
                                                        isMine ? "text-white/60" : "text-slate-400"
                                                    )}>
                                                        {formatRelativeTime(msg.createdAt)}
                                                    </span>
                                                    {isMine && (
                                                        <span className={cn("text-[10px]", msg.read ? "text-white/90" : "text-white/40")}>
                                                            {msg.read ? "✓✓" : "✓"}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                            <div ref={messagesEndRef}/>
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-slate-100 dark:border-slate-700/50 shrink-0">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex items-center gap-2"
                            >
                                <Input
                                    value={input}
                                    onChange={(e) => handleInputChange(e.target.value)}
                                    placeholder="Type a message..."
                                    className="rounded-xl flex-1"
                                    disabled={sending}
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={!input.trim() || sending}
                                    className="size-10 rounded-xl bg-primary-light hover:bg-primary-light/90 shrink-0"
                                >
                                    <Send className="size-4"/>
                                </Button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                        <MessageSquare className="size-16 mb-4 opacity-20"/>
                        <p className="text-lg font-medium text-slate-500 dark:text-slate-400">Messages</p>
                        <p className="text-sm mt-1">Select a contact to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
}
