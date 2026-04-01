import {Icon} from "@iconify/react";

export function InfoRow({
                            icon,
                            title,
                            value,
                        }: {
    icon: string;
    title: string;
    value: string;
}) {
    return (
        <div className="flex gap-4">
            <div className="flex size-11 items-center justify-center rounded-lg bg-white">
                <Icon icon={icon} className="size-6 text-primary"/>
            </div>
            <div>
                <p className="text-base text-white font-semibold">{title}</p>
                <p className="text-sm text-accent/70">{value}</p>
            </div>
        </div>
    );
}