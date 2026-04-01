import { describe, it, expect, vi } from "vitest";
import { downloadCSV } from "@/lib/export-csv";

describe("downloadCSV", () => {
    it("does nothing with empty array", () => {
        const spy = vi.spyOn(document, "createElement");
        downloadCSV([], "test");
        expect(spy).not.toHaveBeenCalled();
        spy.mockRestore();
    });

    it("generates correct CSV content", () => {
        let blobContent = "";
        const mockUrl = "blob:test";

        vi.spyOn(URL, "createObjectURL").mockReturnValue(mockUrl);
        vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});

        const originalBlob = globalThis.Blob;
        globalThis.Blob = class MockBlob {
            content: string;
            constructor(parts: string[]) {
                this.content = parts.join("");
                blobContent = this.content;
            }
        } as unknown as typeof Blob;

        const mockLink = { href: "", download: "", click: vi.fn() };
        vi.spyOn(document, "createElement").mockReturnValue(mockLink as unknown as HTMLElement);

        downloadCSV(
            [
                { Name: "iPhone", Price: 999, Status: "Active" },
                { Name: "Galaxy", Price: 899, Status: "Out of Stock" },
            ],
            "products"
        );

        expect(blobContent).toContain("Name,Price,Status");
        expect(blobContent).toContain("iPhone,999,Active");
        expect(blobContent).toContain("Galaxy,899,Out of Stock");
        expect(mockLink.download).toBe("products.csv");
        expect(mockLink.click).toHaveBeenCalled();

        globalThis.Blob = originalBlob;
    });

    it("escapes commas and quotes in values", () => {
        let blobContent = "";

        vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:test");
        vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});

        const originalBlob = globalThis.Blob;
        globalThis.Blob = class MockBlob {
            constructor(parts: string[]) {
                blobContent = parts.join("");
            }
        } as unknown as typeof Blob;

        const mockLink = { href: "", download: "", click: vi.fn() };
        vi.spyOn(document, "createElement").mockReturnValue(mockLink as unknown as HTMLElement);

        downloadCSV([{ Name: 'Item "Special", Edition' }], "test");

        expect(blobContent).toContain('"Item ""Special"", Edition"');

        globalThis.Blob = originalBlob;
    });
});
