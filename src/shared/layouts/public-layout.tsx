import {ComponentProps, ReactNode} from 'react'
import {Navbar} from "@/shared/layouts/navbar";
import {Footer} from "@/shared/layouts/footer";

type PublicLayoutProps = {
    children: ReactNode
    navProps?: ComponentProps<'nav'>
    mainProps?: ComponentProps<'main'>
    footerProps?: ComponentProps<'footer'>
}

export default function PublicLayout({
                                         children,
                                         navProps,
                                         mainProps,
                                         footerProps,
                                     }: PublicLayoutProps) {
    return (
        <>
            <Navbar {...navProps} />

            <main {...mainProps}>{children}</main>

            <Footer {...footerProps} />
        </>
    )
}
