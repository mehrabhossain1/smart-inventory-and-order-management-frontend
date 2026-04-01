"use client";

import React from "react"
import {Icon} from "@iconify/react";
import type {BlogPost} from "../types";

interface BlogContentProps {
    post: BlogPost;
    prevPost?: BlogPost;
    nextPost?: BlogPost;
}

export function BlogContent({post, prevPost, nextPost}: BlogContentProps) {

    const renderContent = (content: string) => {
        const lines = content.split("\n");
        const elements: React.ReactNode[] = [];
        let inBlockquote = false;
        let blockquoteContent: string[] = [];

        lines.forEach((line, index) => {
            if (line.startsWith("> ")) {
                if (!inBlockquote) {
                    inBlockquote = true;
                    blockquoteContent = [];
                }
                blockquoteContent.push(line.substring(2));
                return;
            }
            if (inBlockquote && blockquoteContent.length > 0) {
                elements.push(
                    <blockquote
                        key={`bq-${index}`}
                        className="border-l-4 border-primary-light bg-primary-light/5 pl-6 py-4 my-6 italic text-muted-foreground rounded-r-lg"
                    >
                        {blockquoteContent.join(" ")}
                    </blockquote>
                );
                inBlockquote = false;
                blockquoteContent = [];
            }

            if (line.startsWith("## ")) {
                elements.push(
                    <h2
                        key={`h2-${index}`}
                        className="text-2xl font-bold text-foreground mt-10 mb-4"
                    >
                        {line.substring(3)}
                    </h2>
                );
                return;
            }

            if (line.startsWith("- ")) {
                elements.push(
                    <li
                        key={`li-${index}`}
                        className="text-muted-foreground ml-4 mb-2 list-disc"
                    >
                        {line.substring(2)}
                    </li>
                );
                return;
            }

            if (line === "---") {
                elements.push(
                    <hr key={`hr-${index}`} className="my-8 border-border"/>
                );
                return;
            }

            if (line.trim() === "") {
                return;
            }

            let formattedLine = line;
            // Bold
            formattedLine = formattedLine.replace(
                /\*\*(.*?)\*\*/g,
                '<strong class="font-semibold text-foreground">$1</strong>'
            );
            // Italic
            formattedLine = formattedLine.replace(
                /\*(.*?)\*/g,
                '<em class="italic">$1</em>'
            );
            // Inline code
            formattedLine = formattedLine.replace(
                /`(.*?)`/g,
                '<code class="px-1.5 py-0.5 bg-primary-light/10 text-primary-light rounded text-sm font-mono">$1</code>'
            );

            elements.push(
                <p
                    key={`p-${index}`}
                    className="text-muted-foreground leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{__html: formattedLine}}
                />
            );
        });

        if (inBlockquote && blockquoteContent.length > 0) {
            elements.push(
                <blockquote
                    key="bq-final"
                    className="border-l-4 border-primary-light bg-primary-light/5 pl-6 py-4 my-6 italic text-muted-foreground rounded-r-lg"
                >
                    {blockquoteContent.join(" ")}
                </blockquote>
            );
        }

        return elements;
    };

    return (
        <main className='mt-10'>
            <div
                className="w-full h-64 md:h-96 bg-gradient-to-br from-primary-light/20 via-primary-lighter/10 to-secondary/10 rounded-2xl mb-10 flex items-center justify-center">
                <Icon icon="solar:document-text-bold" className="w-24 h-24 text-primary-light/30"/>
            </div>

            <article className="prose prose-lg max-w-5xl mx-auto">
                {renderContent(post.content)}
            </article>
        </main>
    );
}
