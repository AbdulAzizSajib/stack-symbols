"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BarChart3,
    FolderKanban,
    GalleryVerticalEnd,
    LayoutDashboard,
    LogOut,
    type LucideIcon,
    Shapes,
    Sparkles,
    Users,
} from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type NavItem = {
    href: string;
    label: string;
    icon: LucideIcon;
    exact?: boolean;
};

const navigation: NavItem[] = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/svg", label: "SVG", icon: Shapes },
    { href: "/admin/logout", label: "Logout", icon: LogOut },

];

function isActivePath(pathname: string, item: NavItem) {
    if (item.exact) {
        return pathname === item.href;
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function AdminShell({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen">
            <div className="mx-auto flex min-h-screen  flex-col lg:flex-row">
                <aside className="border-border/70 bg-background/85 backdrop-blur  lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:border-r">
                    <div className="flex h-full flex-col gap-6 p-5">
                        <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card px-4 py-4 shadow-sm">
                            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/15">
                                <Sparkles className="size-5" />
                            </div>
                            <div>
                                <p className="font-heading text-lg font-semibold">Skill SVG</p>
                                <p className="text-sm text-muted-foreground">Admin workspace</p>
                            </div>
                        </div>

                        <nav className="grid gap-1">
                            {navigation.map((item) => {
                                const active = isActivePath(pathname, item);
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "group flex items-center gap-3 rounded-xl border px-3 py-3 text-sm font-medium transition-all",
                                            active
                                                ? "border-primary/20 bg-primary/10 text-primary shadow-sm"
                                                : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground",
                                        )}
                                    >
                                        <span className={cn("flex size-9 items-center justify-center rounded-lg transition-colors", active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-background")}>
                                            <Icon className="size-4" />
                                        </span>
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        <Card className="mt-auto border-primary/15 bg-primary/5 shadow-none">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">Workspace status</CardTitle>
                                <CardDescription>Publishing pipeline and moderation queue are healthy.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Queued uploads</span>
                                    <span className="font-medium">12</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Pending reviews</span>
                                    <span className="font-medium">4</span>
                                </div>
                                <Button className="w-full" variant="outline" size="sm" asChild>
                                    <Link href="/admin/analytics">View analytics</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </aside>

                <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
                    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">{children}</div>
                </main>
            </div>
        </div>
    );
}
