'use client';

import {Banner} from "@/features/contact/banner";
import {ContactMethods} from "@/features/contact/contact-methods";
import {ContactForm} from "@/features/contact/contact-form";
import {Impact} from "@/components/impact";
import {FAQ} from "@/components/faq";

export default function Index() {
    return (
        <div className="min-h-screen w-full">
            <Banner/>
            <ContactMethods/>
            <ContactForm/>
            <FAQ className='pt-10'/>
            <Impact className='mt-44'/>
        </div>
    );
}
