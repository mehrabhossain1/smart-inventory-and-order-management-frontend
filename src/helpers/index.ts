import {FAQ} from "@/shared/types";

export const searchFAQs = (query: string, data: FAQ[]) => {
    if (!query.trim()) return data;

    const q = query.toLowerCase();

    return data
        .map((faq) => {
            let score = 0;

            if (faq.question.toLowerCase().includes(q)) score += 3;
            if (faq.answer.toLowerCase().includes(q)) score += 2;
            if (faq.tags.some(tag => tag.includes(q))) score += 4;

            return {faq, score};
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(item => item.faq);
};
