import React, { useEffect, useMemo, useState } from "react";
import {
  Github, Linkedin, Mail, PlayCircle, Film, Gamepad2, BookOpen, Link as LinkIcon,
  ExternalLink, Code2, Briefcase, Sparkles, GraduationCap, Cpu,
} from "lucide-react";

const PROFILE = {
  name: "Johan Rodríguez",
  role: "Computer Engineering Student",
  tagline: "Exploring technology, learning, and creativity — always building and discovering.",
  email: "johanrodsa2210@gmail.com",
  resumeUrl: "/Johan-CV.pdf",
};

export type LinkGroup = "work" | "hobby" | "social";
export type LinkItem = {
  label: string;
  href: string;
  group: LinkGroup;
  icon?: React.ComponentType<{ className?: string }>;
  note?: string;
};

const LINKS: LinkItem[] = [
  { label: "GitHub", href: "https://github.com/Johanx22x", group: "work", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/your-handle", group: "work", icon: Linkedin },
  { label: "Email", href: "mailto:" + PROFILE.email, group: "work", icon: Mail },

  { label: "AniList", href: "https://anilist.co/user/your-handle", group: "hobby", icon: Film, note: "Anime list" },
  { label: "Letterboxd", href: "https://letterboxd.com/your-handle", group: "hobby", icon: Film },
  { label: "Backloggd", href: "https://www.backloggd.com/u/your-handle", group: "hobby", icon: Gamepad2 },
  { label: "Hardcover", href: "https://hardcover.app/your-handle", group: "hobby", icon: BookOpen },

  { label: "YouTube", href: "https://www.youtube.com/@your-channel", group: "social", icon: PlayCircle },
  { label: "Discord", href: "https://discord.com/users/your-id", group: "social", icon: LinkIcon },
];

export type Project = { title: string; summary: string; tech: string[]; url?: string };

const cx = (...a: Array<string | false | null | undefined>) => a.filter(Boolean).join(" ");

function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
    try { localStorage.setItem("theme", isDark ? "dark" : "light"); } catch {}
  }, [isDark]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const saved = localStorage.getItem("theme");
      if (!saved) setIsDark(mq.matches);
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return { isDark, setIsDark } as const;
}

export default function App() {
  const { isDark, setIsDark } = useTheme();

  const [filter, setFilter] = useState<"all" | LinkGroup>("all");
  const filteredLinks = useMemo(
    () => (filter === "all" ? LINKS : LINKS.filter((l) => l.group === filter)),
    [filter]
  );

  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    fetch("/projects.json").then(r => r.json()).then(setProjects).catch(() => setProjects([]));
  }, []);
  const featured = projects.slice(0, 4);

  return (
    <div className="relative min-h-screen text-slate-800 antialiased dark:text-slate-100">
      <BackgroundAesthetic />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/70 shadow-sm ring-1 ring-black/5 backdrop-blur-md transition-transform hover:scale-[1.02] active:scale-[0.98] dark:bg-slate-900/60 dark:ring-white/10">
                <img src="/avatar.png" alt="Avatar" className="h-8 w-8 rounded-xl object-cover" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">{PROFILE.name}</h1>
              <p className="text-xs/5 text-slate-600 dark:text-slate-400">{PROFILE.role}</p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <a
              href={PROFILE.resumeUrl}
              className="group inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/70 px-3 py-2 text-xs font-medium shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/40 active:translate-y-0 dark:border-white/10 dark:bg-slate-900/60 dark:hover:bg-slate-900/80"
            >
              <span>View Resume</span>
              <ExternalLink className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </a>
            <button
              onClick={() => setIsDark(!isDark)}
              className="rounded-2xl border border-white/20 bg-white/60 px-3 py-2 text-xs font-medium shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/40 active:translate-y-0 dark:border-white/10 dark:bg-slate-900/60 dark:hover:bg-slate-900/80"
            >
              {isDark ? "Light" : "Dark"}
            </button>
          </nav>
        </header>

        {/* Hero */}
        <section className="relative mb-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Hi, I'm {PROFILE.name}.
            </h2>
            <p className="mt-3 text-pretty text-sm text-slate-600 dark:text-slate-400 sm:text-base">
              {PROFILE.tagline}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {(
                [
                  { key: "all", label: "All" },
                  { key: "work", label: "Work" },
                  { key: "hobby", label: "Hobbies" },
                  { key: "social", label: "Social" },
                ] as const
              ).map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={cx(
                    "rounded-2xl border px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur-md transition ring-0 hover:-translate-y-0.5 hover:shadow md:active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/40",
                    filter === key
                      ? "border-pink-400/50 bg-white/80 dark:bg-slate-900/70"
                      : "border-white/20 bg-white/50 hover:bg-white/80 dark:border-white/10 dark:bg-slate-900/40 dark:hover:bg-slate-900/70"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grid principal */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Featured Projects — 2/3 */}
          <GlassCard className="lg:col-span-2" icon={Briefcase} title="Featured Projects">
            {featured.length ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {featured.map((p) => (
                  <a
                    key={p.title}
                    href={p.url}
                    className="rounded-2xl border border-white/20 bg-white/75 p-5 shadow-sm ring-1 ring-black/5 backdrop-blur-md transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/40 active:translate-y-0 dark:border-white/10 dark:bg-slate-900/60 dark:ring-white/10"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-semibold tracking-tight">{p.title}</h3>
                      <Code2 className="h-4 w-4 shrink-0 opacity-60" />
                    </div>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{p.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/20 bg-white/60 px-2 py-0.5 text-[10px] font-medium shadow-sm dark:border-white/10 dark:bg-slate-900/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                Add a <code>projects.json</code> file in <code>/public</code>.
              </p>
            )}
          </GlassCard>

          {/* Right column — Experience + Education */}
          <div className="space-y-6">
            <GlassCard icon={Sparkles} title="Experience">
              <ul className="space-y-3 text-sm">
                <li>
                  <h4 className="font-medium">Computer Vision Researcher</h4>
                  <ul className="ml-4 list-disc text-slate-600 dark:text-slate-400">
                    <li>Developed image-processing pipelines with AI/ML to support visual analysis.</li>
                    <li>Optimized model performance in a multidisciplinary research setting.</li>
                  </ul>
                </li>
                <li>
                  <h4 className="font-medium">Mathematics Tutor</h4>
                  <ul className="ml-4 list-disc text-slate-600 dark:text-slate-400">
                    <li>Delivered precalculus and problem-solving mentoring through tailored guidance.</li>
                    <li>Strengthened communication and instruction while supporting student outcomes.</li>
                  </ul>
                </li>
              </ul>
            </GlassCard>

            <GlassCard icon={GraduationCap} title="Education">
              <ul className="space-y-2 text-sm">
                <li>
                  <h4 className="font-medium">BSc in Computer Engineering (2022 – Present)</h4>
                  <p className="text-slate-600 dark:text-slate-400">Instituto Tecnológico de Costa Rica</p>
                </li>
              </ul>
            </GlassCard>
          </div>
        </div>

        {/* Link Hub */}
        <GlassCard className="mt-6" icon={LinkIcon} title="Link Hub">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredLinks.map((item) => (
              <LinkButton key={item.label} item={item} />
            ))}
          </div>
        </GlassCard>

        <footer className="mt-12 text-center text-xs text-slate-600 dark:text-slate-400">
          <p>Built with React, Tailwind, and care.</p>
        </footer>
      </div>
    </div>
  );
}

/* ---- UI blocks ---- */
function GlassCard({
  title, icon: Icon, className, children,
}: { title: string; icon?: React.ComponentType<{ className?: string }>; className?: string; children: React.ReactNode; }) {
  return (
    <section
      className={cx(
        "rounded-3xl border border-white/20 bg-white/60 p-5 shadow-xl backdrop-blur-xl transition-shadow dark:border-white/10 dark:bg-slate-900/50",
        "hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-black/20",
        className
      )}
    >
      <div className="mb-4 flex items-center gap-2">
        {Icon ? <Icon className="h-4 w-4 opacity-70" /> : null}
        <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function LinkButton({ item }: { item: LinkItem }) {
  const Icon = item.icon ?? ExternalLink;
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer noopener"
      className={cx(
        "group flex items-center gap-3 rounded-2xl border border-white/20 bg-white/70 p-3 text-sm shadow-sm ring-0 backdrop-blur-md transition",
        "hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/40",
        "dark:border-white/10 dark:bg-slate-900/60"
      )}
    >
      <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/20 bg-white/70 shadow-sm transition group-hover:shadow dark:border-white/10 dark:bg-slate-900/60">
        <Icon className="h-4 w-4 opacity-70 transition group-hover:opacity-100" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{item.label}</span>
          <ExternalLink className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100 group-hover:translate-x-0.5" />
        </div>
        {item.note ? (
          <p className="text-xs text-slate-600 transition group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-300">
            {item.note}
          </p>
        ) : null}
      </div>
    </a>
  );
}

/** Theme-aware background (light ↔ dark) — 2 orbs, transform/opacity only */
function BackgroundAesthetic() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-sky-50 dark:from-[#0a0f1a] dark:via-[#0b1320] dark:to-[#0a0f1a]" />
      {/* orbs */}
      <div
        className="absolute h-[70vmin] w-[70vmin] rounded-full animate-[orbA_16s_ease-in-out_infinite] transform-gpu will-change-transform
                   from-rose-300/40 to-white/40 bg-gradient-to-tr
                   dark:from-white/12 dark:to-[#ff7ab218]"
        style={{ left: "-8%", top: "-12%" }}
      />
      <div
        className="absolute h-[70vmin] w-[70vmin] rounded-full animate-[orbB_18s_ease-in-out_infinite] transform-gpu will-change-transform
                   from-sky-300/40 to-white/30 bg-gradient-to-tr
                   dark:from-white/10 dark:to-[#7ab8ff18]"
        style={{ right: "-12%", bottom: "-14%" }}
      />
    </div>
  );
}

