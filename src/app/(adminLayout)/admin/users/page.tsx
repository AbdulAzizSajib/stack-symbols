import { Mail, Shield, UserCog, UserRound, UserRoundCheck, Users } from "lucide-react";

import { PageHero, SectionCard, SideList, StatGrid } from "@/components/admin/admin-shell";

const userMetrics = [
    { label: "Total users", value: "8,214", hint: "Active accounts in the workspace", icon: Users, tone: "info" as const },
    { label: "Admins", value: "14", hint: "Supervisors and moderators", icon: Shield, tone: "warning" as const },
    { label: "Verified", value: "92%", hint: "Email verification completed", icon: UserRoundCheck, tone: "positive" as const },
    { label: "Profile updates", value: "418", hint: "Changed in the last 30 days", icon: UserCog, tone: "default" as const },
];

const userSummary = [
    { label: "New signups", value: "126", hint: "Today", accent: "text-primary" },
    { label: "Need review", value: "8", hint: "Suspicious profiles", accent: "text-foreground" },
    { label: "Need password reset", value: "31", hint: "Account recovery flow", accent: "text-foreground" },
    { label: "Email issues", value: "5", hint: "Delivery retries", accent: "text-foreground" },
];

const users = [
    { name: "Ava Rivera", email: "ava@example.com", role: "ADMIN", status: "Verified", lastSeen: "3 min ago" },
    { name: "Marcus Chen", email: "marcus@example.com", role: "USER", status: "Active", lastSeen: "11 min ago" },
    { name: "Nora Patel", email: "nora@example.com", role: "USER", status: "Needs review", lastSeen: "2 hours ago" },
    { name: "Imran Ali", email: "imran@example.com", role: "ADMIN", status: "Verified", lastSeen: "1 day ago" },
];

export default function UsersPage() {
    return (
        <>
            <PageHero
                eyebrow="Users"
                title="Manage the people behind the SVG library"
                description="This dashboard surfaces moderation-worthy profiles, verified accounts, and the most recent account activity so admins can move quickly."
            />

            <StatGrid items={userMetrics} />

            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <SectionCard title="User roster" description="A compact admin view of key account details.">
                    <div className="overflow-hidden rounded-2xl border border-border/70">
                        <div className="grid grid-cols-[1.4fr_1.5fr_0.8fr_0.9fr_0.8fr] gap-3 border-b border-border/70 bg-muted/40 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            <span>Name</span>
                            <span>Email</span>
                            <span>Role</span>
                            <span>Status</span>
                            <span>Last seen</span>
                        </div>
                        <div className="divide-y divide-border/70">
                            {users.map((user) => (
                                <div key={user.email} className="grid grid-cols-[1.4fr_1.5fr_0.8fr_0.9fr_0.8fr] gap-3 px-4 py-4 text-sm">
                                    <div>
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-muted-foreground">Profile complete</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Mail className="size-4" />
                                        {user.email}
                                    </div>
                                    <span className="font-medium">{user.role}</span>
                                    <span className="rounded-full border border-border/70 bg-background px-3 py-1 text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                        {user.status}
                                    </span>
                                    <span className="text-muted-foreground">{user.lastSeen}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </SectionCard>

                <SideList title="Account signals" description="Fast checks for user health and moderation." items={userSummary} />
            </div>
        </>
    );
}
