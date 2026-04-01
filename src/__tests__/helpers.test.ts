import { describe, it, expect } from "vitest";
import {
    formatCurrency,
    formatDate,
    formatRelativeTime,
    formatActionLabel,
    truncateId,
} from "@/helpers";

describe("formatCurrency", () => {
    it("formats whole numbers", () => {
        expect(formatCurrency(100)).toBe("$100.00");
    });

    it("formats decimals", () => {
        expect(formatCurrency(99.5)).toBe("$99.50");
    });

    it("formats large numbers with commas", () => {
        expect(formatCurrency(1234567)).toBe("$1,234,567.00");
    });

    it("formats zero", () => {
        expect(formatCurrency(0)).toBe("$0.00");
    });
});

describe("formatDate", () => {
    it("formats ISO date string", () => {
        const result = formatDate("2026-01-15T10:30:00.000Z");
        expect(result).toContain("Jan");
        expect(result).toContain("15");
        expect(result).toContain("2026");
    });
});

describe("formatRelativeTime", () => {
    it("returns 'Just now' for recent times", () => {
        const now = new Date().toISOString();
        expect(formatRelativeTime(now)).toBe("Just now");
    });

    it("returns minutes ago", () => {
        const fiveMinAgo = new Date(Date.now() - 5 * 60000).toISOString();
        expect(formatRelativeTime(fiveMinAgo)).toBe("5m ago");
    });

    it("returns hours ago", () => {
        const threeHoursAgo = new Date(Date.now() - 3 * 3600000).toISOString();
        expect(formatRelativeTime(threeHoursAgo)).toBe("3h ago");
    });

    it("returns days ago", () => {
        const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toISOString();
        expect(formatRelativeTime(twoDaysAgo)).toBe("2d ago");
    });
});

describe("formatActionLabel", () => {
    it("maps known actions", () => {
        expect(formatActionLabel("ORDER_CREATED")).toBe("Order Created");
        expect(formatActionLabel("PRODUCT_RESTOCKED")).toBe("Product Restocked");
        expect(formatActionLabel("ORDER_CANCELLED")).toBe("Order Cancelled");
    });

    it("falls back for unknown actions", () => {
        expect(formatActionLabel("SOME_UNKNOWN_ACTION")).toBe("SOME UNKNOWN ACTION");
    });
});

describe("truncateId", () => {
    it("truncates long IDs", () => {
        const id = "507f1f77bcf86cd799439011";
        const result = truncateId(id);
        expect(result).toBe("507f...9011");
        expect(result.length).toBeLessThan(id.length);
    });

    it("keeps short IDs as-is", () => {
        expect(truncateId("abc123")).toBe("abc123");
    });
});
