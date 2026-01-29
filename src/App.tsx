import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Github, Mail,
  ExternalLink, Code2, Briefcase, Sparkles, GraduationCap, Languages, User,
} from "lucide-react";

const PROFILE = {
  name: "Johan Rodríguez",
  email: "johanrodsa2210@gmail.com",
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
  { label: "Email", href: "mailto:" + PROFILE.email, group: "work", icon: Mail },
];

export type Project = { 
  title: string; 
  summary: string; 
  tools: string[];
  skills?: string[];
  url?: string;
  featured?: boolean;
};

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
  const { t, i18n } = useTranslation();
  const { isDark, setIsDark } = useTheme();

  const [filter, setFilter] = useState<"all" | LinkGroup>("all");
  const filteredLinks = useMemo(
    () => (filter === "all" ? LINKS : LINKS.filter((l) => l.group === filter)),
    [filter]
  );

  const workLinks = useMemo(() => LINKS.filter((l) => l.group === "work"), []);

  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    fetch("/projects.json").then(r => r.json()).then(setProjects).catch(() => setProjects([]));
  }, []);
  const featured = projects.filter(p => p.featured !== false).slice(0, 3);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative min-h-screen text-slate-800 antialiased dark:text-slate-100">
      <BackgroundAesthetic />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-10 flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/20 bg-white/60 px-6 py-4 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-900/50">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-white/70 shadow-sm ring-1 ring-black/5 backdrop-blur-md transition-transform hover:scale-[1.02] active:scale-[0.98] dark:bg-slate-900/60 dark:ring-white/10">
                <img src="/avatar.png" alt="Avatar" className="h-14 w-14 rounded-lg object-cover" />
            </div>
            <div className="text-center">
              <h1 className="text-sm font-semibold tracking-tight">{PROFILE.name}</h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                @johanx22x · {t('profile.role')}
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-2xl border border-white/20 bg-white/70 px-2 py-1.5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-900/60">
              {(['en', 'es', 'ja'] as const).map((lng) => (
                <button
                  key={lng}
                  onClick={() => changeLanguage(lng)}
                  className={cx(
                    "rounded-lg px-2.5 py-1 text-xs font-medium transition",
                    i18n.language === lng
                      ? "bg-white/90 text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                  )}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className="rounded-2xl border border-white/20 bg-white/60 px-3 py-2 text-xs font-medium shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/40 active:translate-y-0 dark:border-white/10 dark:bg-slate-900/60 dark:hover:bg-slate-900/80"
            >
              {isDark ? t('theme.light') : t('theme.dark')}
            </button>
          </nav>
        </header>

        {/* Hero */}
        <section className="relative mb-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              {t('hero.greeting', { name: PROFILE.name })}
            </h2>
            <p className="mt-3 text-pretty text-sm text-slate-600 dark:text-slate-400 sm:text-base">
              {t('profile.tagline')}
            </p>
          </div>
        </section>

        {/* Bio Section */}
        <GlassCard className="mb-6" icon={User} title={t('sections.bio')}>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t('bio.text')}
          </p>
        </GlassCard>

        {/* Grid principal */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left column — Experience, Education, Languages */}
          <div className="space-y-6 lg:col-span-1">
            <GlassCard icon={Sparkles} title={t('sections.experience')}>
              <ul className="space-y-3 text-sm">
                <li>
                  <h4 className="font-medium">{t('experience.computerVision.title')}</h4>
                  <ul className="ml-4 list-disc text-slate-600 dark:text-slate-400">
                    {(t('experience.computerVision.bullets', { returnObjects: true }) as string[]).map((bullet: string, i: number) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </li>
                <li>
                  <h4 className="font-medium">{t('experience.mathTutor.title')}</h4>
                  <ul className="ml-4 list-disc text-slate-600 dark:text-slate-400">
                    {(t('experience.mathTutor.bullets', { returnObjects: true }) as string[]).map((bullet: string, i: number) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </li>
              </ul>
            </GlassCard>

            <GlassCard icon={GraduationCap} title={t('sections.education')}>
              <ul className="space-y-2 text-sm">
                <li>
                  <h4 className="font-medium">{t('education.bsc.title')} ({t('education.bsc.period')})</h4>
                  <p className="text-slate-600 dark:text-slate-400">{t('education.bsc.institution')}</p>
                </li>
              </ul>
            </GlassCard>

            <GlassCard icon={Languages} title={t('sections.languages')}>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="font-medium">{t('languages.spanish')}</span>
                  <span className="text-slate-600 dark:text-slate-400">{t('languages.levels.native')}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">{t('languages.english')}</span>
                  <span className="text-slate-600 dark:text-slate-400">{t('languages.levels.b2')}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">{t('languages.japanese')}</span>
                  <span className="text-slate-600 dark:text-slate-400">{t('languages.levels.n5')}</span>
                </li>
              </ul>
            </GlassCard>
          </div>

          {/* Right column — Featured Projects in single column */}
          <GlassCard className="lg:col-span-2" icon={Briefcase} title={t('sections.featuredProjects')}>
            {featured.length ? (
              <div className="grid grid-cols-1 gap-4">
                {featured.map((p, idx) => {
                  const projectKeys = ['mobileApp', 'benchmark', 'snakeAI'];
                  return (
                    <ProjectCard key={p.title} project={p} projectKey={projectKeys[idx]} />
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                Add a <code>projects.json</code> file in <code>/public</code>.
              </p>
            )}
          </GlassCard>
        </div>

        {/* Contact */}
        <GlassCard className="mt-6" icon={Mail} title={t('sections.contact')}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {workLinks.map((item) => (
              <LinkButton key={item.label} item={item} />
            ))}
          </div>
        </GlassCard>

        <footer className="mt-12 text-center text-xs text-slate-600 dark:text-slate-400">
          <p>{t('footer.builtWith')}</p>
        </footer>
      </div>
    </div>
  );
}

/* ---- UI blocks ---- */
function ProjectCard({ project, large = false, projectKey }: { project: Project; large?: boolean; projectKey?: string }) {
  const { t } = useTranslation();
  
  const title = projectKey ? t(`projects.${projectKey}.title`) : project.title;
  const summary = projectKey ? t(`projects.${projectKey}.summary`) : project.summary;
  
  const className = cx(
    "group rounded-2xl border border-white/20 bg-white/75 p-5 shadow-sm ring-1 ring-black/5 backdrop-blur-md transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/40 active:translate-y-0 dark:border-white/10 dark:bg-slate-900/60 dark:ring-white/10",
    large && "sm:p-6"
  );
  
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className={cx("font-semibold tracking-tight", large ? "text-lg" : "text-base")}>
          {title}
        </h3>
        <Code2 className={cx("shrink-0 opacity-60 transition group-hover:opacity-100", large ? "h-5 w-5" : "h-4 w-4")} />
      </div>
      <p className={cx("mt-2 text-slate-600 dark:text-slate-400", large ? "text-base" : "text-sm")}>
        {summary}
      </p>
      
      {/* Tools */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tools.map((t) => (
          <span
            key={t}
            className="rounded-full border border-blue-300/30 bg-blue-50/60 px-2 py-0.5 text-[10px] font-medium text-blue-700 dark:border-blue-400/20 dark:bg-blue-900/30 dark:text-blue-300"
          >
            {t}
          </span>
        ))}
      </div>
      
      {/* Skills */}
      {project.skills && project.skills.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.skills.map((s) => (
            <span
              key={s}
              className="rounded-full border border-pink-300/30 bg-pink-50/60 px-2 py-0.5 text-[10px] font-medium text-pink-700 dark:border-pink-400/20 dark:bg-pink-900/30 dark:text-pink-300"
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </>
  );
  
  // If project has no URL, render as div; otherwise render as link
  if (!project.url) {
    return <div className={className}>{content}</div>;
  }
  
  return (
    <a
      target="_blank"
      href={project.url}
      rel="noopener noreferrer"
      className={className}
    >
      {content}
    </a>
  );
}

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

