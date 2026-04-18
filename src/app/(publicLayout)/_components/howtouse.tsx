import React from 'react';
import Image from 'next/image';

const roles = [
  {
    title: 'Frontend developer',
    color: 'bg-emerald-100',
    icons: 'typescript,react,next,tailwind',
  },
  {
    title: 'Backend developer',
    color: 'bg-blue-100',
    icons: 'go,python,nodejs,postgresql',
  },
  {
    title: 'DevOps engineer',
    color: 'bg-purple-100',
    icons: 'docker,kubernetes,linux,github',
  },
];

const steps = [
  {
    title: 'Search for icons',
    desc: 'Use the search bar to find icons by name — react, docker, python, and more.',
  },
  {
    title: 'Click to select',
    desc: 'Click any icon to add it to your selection. A highlight ring appears. Click again to deselect.',
  },
  {
    title: 'Review in the floating bar',
    desc: 'Your selected icons appear in the bar at the bottom. Hover to remove individually.',
  },
  {
    title: 'Copy the URL',
    desc: 'Hit "Copy URL" to get a single link that loads all your icons — perfect for a README or portfolio.',
  },
];

export default function HowToUse() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-12">
      {/* Steps */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-8">How to Use</h2>
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-4">steps</p>
        <div className="flex flex-col">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 py-4 border-b border-border/50 last:border-none">
              <div className="size-7 rounded-full border border-border/50 flex items-center justify-center text-xs font-medium text-muted-foreground shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-foreground">{step.title}</span>
                <span className="text-sm text-muted-foreground leading-relaxed">{step.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Example URL */}
      <div>
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
          example url
        </p>
        <div className="rounded-lg border border-border/50 bg-muted/40 px-4 py-3 font-mono text-xs text-muted-foreground break-all leading-relaxed">
          https://stack-symbols.vercel.app/svg/
          <span className="text-emerald-600 font-medium">react,next,tailwind,typescript</span>
          ?w=64&h=64
        </div>
      </div>

      {/* Use cases */}
      <div>
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
          use cases
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 ">
          {roles.map((role) => (
            <div
              key={role.title}
              className="rounded-xl border border-border/50 bg-[#f1edeb] p-4 flex flex-col gap-3 shadow-sm"
            >
              <span className="text-sm text-center font-medium text-foreground">{role.title}</span>
              <div className={`rounded-lg flex items-center gap-2 px-3 py-2 w-max`}>
                <Image
                  src={`https://stack-symbols.vercel.app/svg/${role.icons}?w=64&h=64`}
                  alt={role.title}
                  width={64}
                  height={64}
                  className="h-8 w-auto"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
