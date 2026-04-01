"use client";

import {useState} from "react";
import {Icon} from "@iconify/react";
import RootWrapper from "@/shared/root-wrapper";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Label} from "@/components/ui/label";
import {InfoRow} from "@/features/contact/info-row";

export function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        userType: "developer",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            setSubmitted(true);
            setFormData({
                name: "",
                email: "",
                userType: "developer",
                message: "",
            });
            setTimeout(() => setSubmitted(false), 5000);
        }, 1000);
    };

    return (
        <section id="contact-form" className="py-28 bg-fill-background mb-20">
            <RootWrapper className="grid lg:grid-cols-2 gap-18 items-start">
                <div>
                    <h2 className="text-3xl mb-3 sm:text-4xl font-bold text-white leading-tight">
                        Start a conversation with the DevJobs Network team
                    </h2>

                    <p className="text-lg text-accent/80 max-w-2xl mx-auto">
                        DevJobs Network is built on trust, transparency, and community. Whether you’re
                        a tech professional, a hiring company, or a partner, we’re here to listen,
                        understand your needs, and help you take the next step with confidence.
                    </p>

                    <div className="space-y-6 mt-10">
                        <InfoRow
                            icon="mdi:email-outline"
                            title="Email"
                            value="hello@devjobsnetwork.com"
                        />
                        <InfoRow
                            icon="mdi:clock-outline"
                            title="Response time"
                            value="Within 48 hours"
                        />
                        <InfoRow
                            icon="mdi:account-check-outline"
                            title="Hiring support"
                            value="Direct access to verified tech talent"
                        />
                    </div>
                </div>

                <div>
                    <div className="relative rounded-xl border border-border bg-background p-8">
                        {submitted && (
                            <div
                                className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-background/90 backdrop-blur-sm rounded-xl text-center">
                                <div
                                    className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-lighter/20">
                                    <Icon icon="mdi:check" className="h-7 w-7 text-primary"/>
                                </div>
                                <h3 className="text-lg font-semibold">Message sent</h3>
                                <p className="text-muted-foreground">
                                    We’ll get back to you shortly.
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className='text-base text-gray-800 font-semibold'>Full
                                        name</Label>
                                    <Input
                                        id="name"
                                        className='w-full h-11 shadow-none focus-visible:ring-primary-lighter/30 border-border'
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({...formData, name: e.target.value})
                                        }
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email"
                                           className='text-base text-gray-800 font-semibold'>Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        className='w-full h-11 shadow-none focus-visible:ring-primary-lighter/30 border-border'
                                        placeholder="Your Email Address"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({...formData, email: e.target.value})
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className='text-base text-gray-800 font-semibold'>I am a</Label>
                                <Select
                                    value={formData.userType}
                                    onValueChange={(value) =>
                                        setFormData({...formData, userType: value})
                                    }
                                >
                                    <SelectTrigger
                                        className='w-full py-5 border-border focus-visible:ring-primary-lighter/30'>
                                        <SelectValue placeholder="Select one"/>
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="developer">Tech Talent</SelectItem>
                                        <SelectItem value="company">Hiring Company</SelectItem>
                                        <SelectItem value="sponsor">Sponsor / Partner</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message"
                                       className='text-base text-gray-800 font-semibold'>Message</Label>
                                <Textarea
                                    id="message"
                                    className='w-full h-40 shadow-none focus-visible:ring-primary-lighter/30 border-border'
                                    placeholder="Tell us how we can help you…"
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData({...formData, message: e.target.value})
                                    }
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full rounded-lg hover:bg-primary-lighter h-12 mt-4 font-semibold"
                                disabled={isLoading}
                            >
                                {isLoading ? "Sending…" : "Send message"}
                            </Button>
                        </form>
                    </div>
                </div>
            </RootWrapper>
        </section>
    );
}
