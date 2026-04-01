'use client'

import * as React from "react"
import {Slot} from "@radix-ui/react-slot"
import {cva, type VariantProps} from "class-variance-authority"
import {motion} from "framer-motion"
import {cn} from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none disabled:!cursor-not-allowed",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                outline: "border bg-background hover:bg-accent",
                ghost: "hover:bg-accent",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4",
                sm: "h-8 px-3",
                lg: "h-10 px-6",
                icon: "size-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
    className?: string
    asChild?: boolean
    disabled?: boolean
    animate?: boolean
}

type ButtonAsButton = ButtonBaseProps &
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: never
}

type ButtonAsLink = ButtonBaseProps &
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const Button = React.forwardRef<
    HTMLButtonElement | HTMLAnchorElement,
    ButtonProps
>((props, ref) => {

    const {
        className,
        variant = "default",
        size = "default",
        asChild,
        href,
        disabled,
        animate = true,
        children,
        ...rest
    } = props

    const [isHovered, setIsHovered] = React.useState(false)

    const Comp = asChild ? Slot : href ? "a" : "button"

    const classes = cn(
        buttonVariants({variant, size}),
        disabled && href && "pointer-events-none opacity-50",
        className
    )

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        if (animate && !disabled) {
            setIsHovered(true)
        }
        const originalHandler = rest.onMouseEnter as ((e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void) | undefined
        if (originalHandler) {
            originalHandler(e)
        }
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        if (animate && !disabled) {
            setIsHovered(false)
        }
        const originalHandler = rest.onMouseLeave as ((e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void) | undefined
        if (originalHandler) {
            originalHandler(e)
        }
    }

    const content = animate ? (
        <span className="relative inline-flex items-center gap-2 overflow-hidden">
            <motion.span
                className="inline-flex items-center gap-2"
                initial={{y: 0}}
                animate={{y: isHovered ? "-100%" : 0}}
                transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                }}
            >
                {children}
            </motion.span>
            <motion.span
                className="absolute inset-0 inline-flex items-center gap-2"
                initial={{y: "100%"}}
                animate={{y: isHovered ? 0 : "100%"}}
                transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                }}
            >
                {children}
            </motion.span>
        </span>
    ) : children

    if (href) {
        const anchorProps = rest as Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'onMouseEnter' | 'onMouseLeave'>
        return (
            <Comp
                // @ts-ignore
                ref={ref as React.Ref<HTMLAnchorElement>}
                href={disabled ? undefined : href}
                aria-disabled={disabled}
                tabIndex={disabled ? -1 : undefined}
                className={classes}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                {...anchorProps}
            >
                {content}
            </Comp>
        )
    }

    const buttonProps = rest as Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onMouseEnter' | 'onMouseLeave'>
    return (
        <Comp
            // @ts-ignore
            ref={ref as React.Ref<HTMLButtonElement>}
            disabled={disabled}
            className={classes}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...buttonProps}
        >
            {content}
        </Comp>
    )
})

Button.displayName = "Button"

// @ts-ignore
export {Button, buttonVariants}