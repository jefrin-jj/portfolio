import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu, X, Github, Linkedin, Mail, Phone, MapPin, Download,
  ExternalLink, GraduationCap, Briefcase, Send, ChevronRight,
  Terminal, Cpu, Database, Wrench, Code2, Layers, BatteryCharging,
  ChevronDown, CheckCircle2
} from "lucide-react";

/* ---------------------------------------------------------------- */
/* Data — sourced strictly from the resume brief                    */
/* ---------------------------------------------------------------- */

const PROFILE = {
  name: "Jefrin J J",
  role: "Java Full Stack Developer",
  location: "Marthandam, Kanyakumari, Tamil Nadu, India",
  email: "jefrin66666@gmail.com",
  phone: "+91 9600755460",
  linkedin: "https://www.linkedin.com/in/jefrin-jj",
  github: "https://github.com/jefrin-jj",
};

const HIGHLIGHTS = [
  { icon: Code2, label: "Java Full Stack Developer" },
  { icon: GraduationCap, label: "BE Computer Science & Engineering" },
  { icon: ChevronRight, label: "2026 Graduate" },
  { icon: Layers, label: "Full Stack Development Experience" },
];

const SKILLS = [
  {
    title: "Programming & frameworks",
    icon: Code2,
    items: ["Java", "Spring Boot", "Spring MVC", "HTML5", "CSS3", "JavaScript"],
  },
  {
    title: "Backend & architecture",
    icon: Layers,
    items: ["REST APIs", "MVC architecture", "CRUD operations", "Backend validation"],
  },
  {
    title: "Database",
    icon: Database,
    items: ["MySQL", "SQL"],
  },
  {
    title: "Other",
    icon: Cpu,
    items: ["Flutter — beginner", "OOP", "SDLC basics", "Debugging", "Testing", "Responsive web design"],
  },
  {
    title: "Tools",
    icon: Wrench,
    items: ["Eclipse", "IntelliJ IDEA", "VS Code", "MySQL Workbench", "Git", "GitHub"],
  },
];

const EXPERIENCE = [
  {
    kind: "internship",
    role: "Java Full Stack Intern",
    org: null,
    duration: "1 month",
    points: [
      "Completed a 1-month intensive internship in Java Full Stack Development.",
      "Gained hands-on experience in Core Java and Object-Oriented Programming.",
      "Worked with database integration and backend connectivity.",
      "Developed practical full stack development skills.",
    ],
  },
  {
    kind: "internship",
    role: "React JS Intern",
    org: "Srishti Innovative Computer Systems, Technopark, Thiruvananthapuram",
    duration: "1 month",
    points: [
      "Hands-on experience in frontend web development.",
      "Developed basic React JS applications.",
      "Learned component-based architecture.",
      "Worked on responsive UI design and JavaScript fundamentals.",
    ],
  },
  {
    kind: "internship",
    role: "Full Stack Web Development Intern",
    org: "AK InfoPark, Nagercoil",
    duration: "2 weeks",
    points: [
      "Hands-on experience with frontend and backend technologies.",
      "Developed responsive web applications.",
      "Gained practical knowledge of web development concepts.",
    ],
  },
];

const TRAINING = {
  role: "Java Full Stack Development Course",
  org: "Cadpoint Institute",
  duration: "6 months",
};

const PROJECTS = [
  {
    title: "Smart-Coaching Institution Management Portal",
    description:
      "Developed a responsive coaching institution portal with an interactive interface for managing course details and student-related information.",
    tech: ["HTML", "CSS", "JavaScript"],
    features: [
      "Responsive design",
      "Course management interface",
      "Student-related information",
      "User-friendly interface",
      "Mobile-friendly pages",
    ],
    live: "https://responsive-coaching-portal-with-wha.vercel.app/",
    repo: null,
    accent: "blue",
    icon: GraduationCap,
  },
  {
    title: "Remaining Useful Life Predictor for EV Batteries Using Machine Learning",
    description:
      "Developed a machine learning-based system to predict the Remaining Useful Life (RUL) of EV batteries.",
    tech: ["Python", "Django", "Machine Learning", "HTML/CSS"],
    features: [
      "Data preprocessing",
      "Model training",
      "Prediction",
      "Battery health analysis",
      "Prediction visualization",
      "Responsive web interface",
    ],
    live: null,
    repo: null,
    accent: "violet",
    icon: BatteryCharging,
  },
];

const EDUCATION = {
  degree: "Bachelor of Engineering — Computer Science and Engineering",
  school: "Ponjesly College of Engineering, Nagercoil",
  cgpa: "7.8",
  year: "2026",
};

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const JAVA_SNIPPET = [
  "public class Developer {",
  "    private String name = \"Jefrin J J\";",
  "    private String role = \"Full Stack Dev\";",
  "",
  "    public void buildSomething() {",
  "        Stack stack = new Stack(",
  "            \"Java\", \"Spring Boot\", \"React\"",
  "        );",
  "        stack.deploy();",
  "    }",
  "}",
];

/* ---------------------------------------------------------------- */
/* Reveal-on-scroll wrapper                                          */
/* ---------------------------------------------------------------- */

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Small building blocks                                             */
/* ---------------------------------------------------------------- */

function SectionEyebrow({ children }) {
  return (
    <p className="font-mono text-xs tracking-[0.25em] uppercase text-blue-400/80 mb-3">
      {children}
    </p>
  );
}

function GradientButton({ children, onClick, href, icon: Icon, variant = "primary" }) {
  const base =
    "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 group";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-900/30 hover:shadow-blue-700/40 hover:-translate-y-0.5"
      : "bg-white/[0.04] text-slate-200 border border-white/10 hover:border-blue-400/40 hover:bg-white/[0.07] hover:-translate-y-0.5";
  const content = (
    <>
      {children}
      {Icon && <Icon size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />}
    </>
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={`${base} ${styles}`}>
        {content}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      {content}
    </button>
  );
}

function SocialIcon({ href, icon: Icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white hover:border-blue-400/50 hover:bg-white/[0.08] transition-all duration-300"
    >
      <Icon size={17} />
    </a>
  );
}

/* ---------------------------------------------------------------- */
/* IDE mock — hero signature element                                 */
/* ---------------------------------------------------------------- */

function CodeWindow() {
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    if (lineCount >= JAVA_SNIPPET.length) return;
    const t = setTimeout(() => setLineCount((c) => c + 1), 220);
    return () => clearTimeout(t);
  }, [lineCount]);

  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-gradient-to-br from-blue-600/20 via-violet-600/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="relative rounded-2xl border border-white/10 bg-[#0a0a12]/90 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-amber-400/70" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
          <span className="ml-3 font-mono text-[11px] text-slate-500">Developer.java</span>
        </div>
        <div className="p-5 font-mono text-[13px] leading-relaxed min-h-[240px]">
          {JAVA_SNIPPET.slice(0, lineCount).map((line, i) => (
            <div key={i} className="flex">
              <span className="w-6 text-slate-600 select-none">{i + 1}</span>
              <span
                className="text-slate-300"
                dangerouslySetInnerHTML={{ __html: highlightJava(line) }}
              />
              {i === lineCount - 1 && (
                <span className="ml-0.5 w-[7px] h-[15px] bg-blue-400 animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function highlightJava(line) {
  return line
    .replace(/(public|private|class|void|new)/g, '<span style="color:#a78bfa">$1</span>')
    .replace(/(String|Stack)/g, '<span style="color:#60a5fa">$1</span>')
    .replace(/(".*?")/g, '<span style="color:#5eead4">$1</span>');
}

/* ---------------------------------------------------------------- */
/* Nav                                                                */
/* ---------------------------------------------------------------- */

function Nav({ onDownload }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#050508]/85 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <button
          onClick={() => go("home")}
          className="font-mono text-sm font-medium text-white tracking-tight"
        >
          jefrin<span className="text-blue-400">.</span>dev
        </button>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="px-3 py-2 text-sm text-slate-400 hover:text-white transition-colors duration-200"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <GradientButton onClick={onDownload} icon={Download} variant="secondary">
            Resume
          </GradientButton>
        </div>

        <button
          className="md:hidden text-slate-200"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#050508]/97 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="text-left py-2 text-sm text-slate-300 hover:text-white"
            >
              {l.label}
            </button>
          ))}
          <div className="pt-2">
            <GradientButton onClick={onDownload} icon={Download} variant="secondary">
              Resume
            </GradientButton>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ---------------------------------------------------------------- */
/* Sections                                                           */
/* ---------------------------------------------------------------- */

function Hero({ onDownload }) {
  return (
    <section id="home" className="relative pt-36 pb-24 px-6 overflow-hidden">
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center relative">
        <Reveal>
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 opacity-80 blur-[2px]" />
            <img
              src="/profile.png"
              alt={PROFILE.name}
              className="relative w-24 h-24 rounded-full object-cover border-2 border-[#050508]"
            />
          </div>
          <p className="font-mono text-sm text-blue-400 mb-4 tracking-wide">
            Hi, I&apos;m {PROFILE.name}
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-white leading-[1.1] mb-5">
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-violet-400 bg-clip-text text-transparent">
              {PROFILE.role}
            </span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-lg">
            Motivated Java Full Stack Developer fresher with hands-on experience in Java, Spring Boot,
            HTML, CSS, JavaScript, and SQL. Passionate about building responsive web applications and
            developing practical software solutions.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <GradientButton onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} icon={ChevronRight}>
              View my projects
            </GradientButton>
            <GradientButton onClick={onDownload} icon={Download} variant="secondary">
              Download resume
            </GradientButton>
            <GradientButton onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} variant="secondary">
              Contact me
            </GradientButton>
          </div>

          <div className="flex gap-3">
            <SocialIcon href={PROFILE.linkedin} icon={Linkedin} label="LinkedIn" />
            <SocialIcon href={PROFILE.github} icon={Github} label="GitHub" />
            <SocialIcon href={`mailto:${PROFILE.email}`} icon={Mail} label="Email" />
          </div>
        </Reveal>

        <Reveal delay={150}>
          <CodeWindow />
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12">
        <Reveal className="md:col-span-2">
          <SectionEyebrow>About</SectionEyebrow>
          <h2 className="text-3xl font-semibold text-white mb-5">A fresher, ready to build.</h2>
          <p className="text-slate-400 leading-relaxed">
            I&apos;m a Java Full Stack Developer fresher with hands-on experience across frontend,
            backend, and database integration. Through internships and a dedicated full stack
            training program, I&apos;ve built practical skills in Java, Spring Boot, and modern web
            technologies — and I&apos;m looking for an opportunity to put them to work on real
            products.
          </p>
        </Reveal>

        <div className="md:col-span-3 grid sm:grid-cols-2 gap-4">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal key={h.label} delay={i * 80}>
              <div className="h-full rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 flex items-center gap-4 hover:border-blue-400/30 hover:bg-white/[0.05] transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600/20 to-violet-600/20 border border-white/10 flex items-center justify-center shrink-0">
                  <h.icon size={18} className="text-blue-300" />
                </div>
                <span className="text-sm text-slate-200">{h.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionEyebrow>Skills</SectionEyebrow>
          <h2 className="text-3xl font-semibold text-white mb-12">Technical toolkit</h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 90}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 hover:border-blue-400/30 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600/20 to-violet-600/20 border border-white/10 flex items-center justify-center">
                    <cat.icon size={16} className="text-violet-300" />
                  </div>
                  <h3 className="text-sm font-medium text-white">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-slate-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionEyebrow>Experience</SectionEyebrow>
          <h2 className="text-3xl font-semibold text-white mb-12">Where I&apos;ve worked</h2>
        </Reveal>

        <div className="relative pl-8 border-l border-white/10 space-y-8 mb-12">
          {EXPERIENCE.map((e, i) => (
            <Reveal key={e.role} delay={i * 100}>
              <div className="relative">
                <span className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-500/15" />
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-blue-400/30 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase size={14} className="text-blue-400" />
                    <h3 className="text-white font-medium text-sm">{e.role}</h3>
                  </div>
                  {e.org && <p className="text-xs text-slate-500 mb-1">{e.org}</p>}
                  <p className="font-mono text-[11px] text-blue-400/80 mb-3">{e.duration}</p>
                  <ul className="space-y-1.5">
                    {e.points.map((p) => (
                      <li key={p} className="text-sm text-slate-400 flex gap-2">
                        <span className="text-blue-400/60 mt-1.5">›</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="rounded-xl border border-violet-400/20 bg-violet-500/[0.04] p-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] text-violet-300/80 uppercase tracking-wider mb-1">
                Training / certification
              </p>
              <h3 className="text-white font-medium text-sm">{TRAINING.role}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{TRAINING.org}</p>
            </div>
            <span className="font-mono text-xs text-violet-300 bg-violet-500/10 border border-violet-400/20 rounded-full px-3 py-1">
              {TRAINING.duration}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectCard({ project, delay }) {
  const [expanded, setExpanded] = useState(false);
  const accentClasses =
    project.accent === "blue"
      ? { grad: "from-blue-600/25 to-blue-400/5", text: "text-blue-300", border: "hover:border-blue-400/30" }
      : { grad: "from-violet-600/25 to-violet-400/5", text: "text-violet-300", border: "hover:border-violet-400/30" };

  return (
    <Reveal delay={delay}>
      <div className={`rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden ${accentClasses.border} transition-all duration-300`}>
        <div className={`h-36 bg-gradient-to-br ${accentClasses.grad} flex items-center justify-center relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "18px 18px",
          }} />
          <project.icon size={44} className={`${accentClasses.text} relative`} strokeWidth={1.3} />
        </div>

        <div className="p-6">
          <h3 className="text-white font-medium text-base mb-2">{project.title}</h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-4">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((t) => (
              <span key={t} className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-slate-300">
                {t}
              </span>
            ))}
          </div>

          {expanded && (
            <ul className="space-y-1.5 mb-4 border-t border-white/10 pt-4">
              {project.features.map((f) => (
                <li key={f} className="text-sm text-slate-400 flex gap-2">
                  <CheckCircle2 size={14} className={`${accentClasses.text} mt-0.5 shrink-0`} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-3 pt-1">
            {project.live && (
              <GradientButton href={project.live} icon={ExternalLink}>
                Live demo
              </GradientButton>
            )}
            <GradientButton onClick={() => setExpanded((v) => !v)} variant="secondary" icon={ChevronDown}>
              {expanded ? "Hide details" : "View project"}
            </GradientButton>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionEyebrow>Projects</SectionEyebrow>
          <h2 className="text-3xl font-semibold text-white mb-12">Things I&apos;ve built</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionEyebrow>Education</SectionEyebrow>
          <h2 className="text-3xl font-semibold text-white mb-12">Academic background</h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 flex items-start gap-5 max-w-2xl hover:border-blue-400/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-violet-600/20 border border-white/10 flex items-center justify-center shrink-0">
              <GraduationCap size={22} className="text-blue-300" />
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">{EDUCATION.degree}</h3>
              <p className="text-sm text-slate-400 mb-3">{EDUCATION.school}</p>
              <div className="flex gap-3">
                <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300">
                  CGPA {EDUCATION.cgpa}
                </span>
                <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300">
                  Class of {EDUCATION.year}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ResumeCta({ onDownload }) {
  return (
    <section className="py-20 px-6 border-t border-white/5">
      <Reveal>
        <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-gradient-to-br from-blue-600/10 via-white/[0.02] to-violet-600/10 p-10 text-center">
          <h2 className="text-2xl font-semibold text-white mb-3">Want to know more about me?</h2>
          <p className="text-slate-400 mb-7 max-w-md mx-auto">
            Download my resume to explore my skills, experience, education, and projects.
          </p>
          <GradientButton onClick={onDownload} icon={Download}>
            Download resume
          </GradientButton>
        </div>
      </Reveal>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.open(`mailto:${PROFILE.email}?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14">
        <Reveal>
          <SectionEyebrow>Contact</SectionEyebrow>
          <h2 className="text-3xl font-semibold text-white mb-5">Let&apos;s build something together.</h2>
          <p className="text-slate-400 mb-8 max-w-sm">
            Open to opportunities as a Java Full Stack Developer. Reach out and I&apos;ll get back to you.
          </p>

          <div className="space-y-4 mb-8">
            <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors">
              <span className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center">
                <Mail size={15} className="text-blue-300" />
              </span>
              {PROFILE.email}
            </a>
            <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors">
              <span className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center">
                <Phone size={15} className="text-blue-300" />
              </span>
              {PROFILE.phone}
            </a>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <span className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center">
                <MapPin size={15} className="text-blue-300" />
              </span>
              {PROFILE.location}
            </div>
          </div>

          <div className="flex gap-3">
            <SocialIcon href={PROFILE.linkedin} icon={Linkedin} label="LinkedIn" />
            <SocialIcon href={PROFILE.github} icon={Github} label="GitHub" />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="Your name"
                className="w-full rounded-lg bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-400/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-400/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tell me about the opportunity..."
                className="w-full rounded-lg bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-400/50 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-900/30 hover:shadow-blue-700/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              Send message <Send size={15} />
            </button>
            {sent && (
              <p className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 pt-1">
                <CheckCircle2 size={13} /> Opening your mail app...
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} {PROFILE.name}. Built with React & Tailwind.
        </p>
        <div className="flex gap-3">
          <SocialIcon href={PROFILE.linkedin} icon={Linkedin} label="LinkedIn" />
          <SocialIcon href={PROFILE.github} icon={Github} label="GitHub" />
          <SocialIcon href={`mailto:${PROFILE.email}`} icon={Mail} label="Email" />
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------- */
/* Root                                                               */
/* ---------------------------------------------------------------- */

export default function Portfolio() {
  const [toast, setToast] = useState(false);

  const handleDownload = useCallback(() => {
    setToast(true);
    setTimeout(() => setToast(false), 3200);
  }, []);

  return (
    <div className="bg-[#050508] min-h-screen font-sans" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        h1, h2, h3 { font-family: 'Space Grotesk', system-ui, sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <Nav onDownload={handleDownload} />
      <Hero onDownload={handleDownload} />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <ResumeCta onDownload={handleDownload} />
      <Contact />
      <Footer />

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0d0d16] border border-white/10 text-slate-200 text-sm px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2">
          <Download size={15} className="text-blue-400" />
          Upload your resume PDF and I&apos;ll wire this button to it.
        </div>
      )}
    </div>
  );
}
