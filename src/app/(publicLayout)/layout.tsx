import type { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-[#EDE9E6]">
            {children}
        </div>
    );
}
