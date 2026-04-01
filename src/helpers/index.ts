export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
}

export function formatDate(date: string): string {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(new Date(date));
}

export function formatDateTime(date: string): string {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
}

export function formatRelativeTime(date: string): string {
    const now = new Date();
    const then = new Date(date);
    const diffMs = now.getTime() - then.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(date);
}

export function formatActionLabel(action: string): string {
    const labels: Record<string, string> = {
        ORDER_CREATED: "Order Created",
        ORDER_STATUS_CHANGED: "Order Status Changed",
        ORDER_CANCELLED: "Order Cancelled",
        STOCK_UPDATED: "Stock Updated",
        PRODUCT_ADDED_TO_RESTOCK: "Added to Restock Queue",
        PRODUCT_RESTOCKED: "Product Restocked",
        PRODUCT_CREATED: "Product Created",
        PRODUCT_DELETED: "Product Deleted",
    };
    return labels[action] || action.replace(/_/g, " ");
}

export function truncateId(id: string): string {
    return id.length > 8 ? `${id.slice(0, 4)}...${id.slice(-4)}` : id;
}
