import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  ListMusic,
  MessageCircle,
  Music,
  Shield,
  Sliders,
  Zap,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SiDiscord } from "react-icons/si";

// ──────────────────────────────────────────────
// Router
// ──────────────────────────────────────────────
function useHashRoute() {
  const getHash = () => window.location.hash.replace("#", "") || "";
  const [route, setRoute] = useState<string>(getHash);

  useEffect(() => {
    const getHashInner = () => window.location.hash.replace("#", "") || "";
    const onHashChange = () => setRoute(getHashInner());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}

function navigate(hash: string) {
  window.location.hash = hash;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ──────────────────────────────────────────────
// Animation helpers
// ──────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// Shared legal components
// ──────────────────────────────────────────────
function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="font-display font-700 text-xl text-foreground mb-3 pb-2 border-b border-border/40">
        {title}
      </h2>
      <div className="text-muted-foreground text-sm leading-7 space-y-3">
        {children}
      </div>
    </section>
  );
}

function LegalFooter() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;
  return (
    <footer className="border-t border-border/50 bg-card/20">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <img
            src="/assets/generated/nekomii-logo.png"
            alt="NekoMii"
            className="w-7 h-7 object-contain rounded-full"
          />
          <span className="font-display font-600 text-sm text-muted-foreground">
            NekoMii © {year}
          </span>
        </div>
        <nav className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
          <button
            type="button"
            onClick={() => navigate("privacy")}
            className="hover:text-foreground transition-colors"
            data-ocid="footer.link"
          >
            Privacy Policy
          </button>
          <button
            type="button"
            onClick={() => navigate("terms")}
            className="hover:text-foreground transition-colors"
            data-ocid="footer.link"
          >
            Terms of Service
          </button>
        </nav>
        <p className="text-xs text-muted-foreground/50">
          Built with ♥ using{" "}
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-muted-foreground transition-colors underline underline-offset-2"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

function LegalPage({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-md bg-background/80">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <button
            type="button"
            onClick={() => navigate("")}
            className="flex items-center gap-2.5"
            data-ocid="nav.link"
          >
            <img
              src="/assets/generated/nekomii-logo.png"
              alt="NekoMii"
              className="w-9 h-9 object-contain rounded-full"
            />
            <span className="font-display font-700 text-lg tracking-tight text-foreground">
              NekoMii
            </span>
          </button>
          <button
            type="button"
            onClick={() => navigate("")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="nav.link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </header>

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              NekoMii
            </p>
            <h1 className="font-display font-800 text-4xl md:text-5xl text-foreground mb-4">
              {title}
            </h1>
            <p className="text-muted-foreground text-base mb-10">{subtitle}</p>
            <div className="w-16 h-px bg-primary/40 mb-12" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {children}
          </motion.div>
        </div>
      </main>

      <LegalFooter />
    </div>
  );
}

// ──────────────────────────────────────────────
// Privacy Policy
// ──────────────────────────────────────────────
function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" subtitle="Last updated: March 30, 2026">
      <LegalSection title="1. Overview">
        <p>
          NekoMii ("we," "our," or "us") is a Discord music bot. This Privacy
          Policy explains what information we collect when you use NekoMii in
          your Discord server, how we use that information, and your rights
          regarding your data.
        </p>
        <p>
          By adding NekoMii to your server or using any of its commands, you
          agree to the practices described in this policy.
        </p>
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <p>NekoMii collects only the minimum data required to operate:</p>
        <ul className="list-disc list-inside space-y-1.5 pl-2">
          <li>
            <strong className="text-foreground">Discord User IDs</strong> — to
            associate playlists, liked tracks, and per-user settings.
          </li>
          <li>
            <strong className="text-foreground">
              Discord Server (Guild) IDs
            </strong>{" "}
            — to store server-level configuration such as prefix overrides,
            autoplay, and theme settings.
          </li>
          <li>
            <strong className="text-foreground">Command Usage Data</strong> —
            anonymised command invocations for abuse detection and bot
            performance monitoring.
          </li>
          <li>
            <strong className="text-foreground">Playback History</strong> —
            track names and source URLs saved when you use the{" "}
            <code className="text-primary bg-primary/10 px-1 rounded text-xs">
              .history
            </code>{" "}
            feature. You can delete your history at any time with{" "}
            <code className="text-primary bg-primary/10 px-1 rounded text-xs">
              .history-clean
            </code>
            .
          </li>
          <li>
            <strong className="text-foreground">Spotify OAuth Tokens</strong> —
            only if you voluntarily link your Spotify account via{" "}
            <code className="text-primary bg-primary/10 px-1 rounded text-xs">
              .spotify-login
            </code>
            . These tokens are encrypted at rest and used solely to fetch your
            playlists.
          </li>
        </ul>
        <p>
          We do not collect message content, voice audio, or any personally
          identifiable information beyond Discord-provided IDs.
        </p>
      </LegalSection>

      <LegalSection title="3. How We Use Your Information">
        <ul className="list-disc list-inside space-y-1.5 pl-2">
          <li>To deliver music playback and bot features you request.</li>
          <li>
            To persist your playlists, liked tracks, and preferences across
            sessions.
          </li>
          <li>To enforce rate limits and prevent abuse of the service.</li>
          <li>To improve bot performance and diagnose technical issues.</li>
        </ul>
        <p>
          We never sell, rent, or share your data with third parties for
          marketing purposes.
        </p>
      </LegalSection>

      <LegalSection title="4. Third-Party Services">
        <p>NekoMii integrates with the following platforms to provide music:</p>
        <ul className="list-disc list-inside space-y-1.5 pl-2">
          <li>
            <strong className="text-foreground">Discord</strong> — all bot
            interactions occur within Discord's platform. Discord's own{" "}
            <a
              href="https://discord.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Privacy Policy
            </a>{" "}
            applies.
          </li>
          <li>
            <strong className="text-foreground">Spotify</strong> — optional
            integration. Spotify's{" "}
            <a
              href="https://www.spotify.com/legal/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Privacy Policy
            </a>{" "}
            governs data handled on their end.
          </li>
          <li>
            <strong className="text-foreground">JioSaavn</strong> — used as a
            music source. No personal data is shared with JioSaavn.
          </li>
          <li>
            <strong className="text-foreground">YouTube / SoundCloud</strong> —
            audio streamed via public APIs. No personal data is transmitted.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Data Retention">
        <p>
          We retain user data for as long as NekoMii remains in your server or
          until you request deletion. Playback history can be self-deleted at
          any time using{" "}
          <code className="text-primary bg-primary/10 px-1 rounded text-xs">
            .history-clean
          </code>
          . To request full deletion of all stored data associated with your
          Discord ID, please contact us via our Support Server.
        </p>
      </LegalSection>

      <LegalSection title="6. Security">
        <p>
          We use industry-standard encryption for sensitive data (e.g., Spotify
          OAuth tokens). However, no system is completely secure. We encourage
          you to use the{" "}
          <code className="text-primary bg-primary/10 px-1 rounded text-xs">
            .spotify-unlink
          </code>{" "}
          command to revoke Spotify access when you no longer need it.
        </p>
      </LegalSection>

      <LegalSection title="7. Children's Privacy">
        <p>
          NekoMii is not directed to children under 13. If you are under 13,
          please do not use the bot. We do not knowingly collect data from
          children under 13.
        </p>
      </LegalSection>

      <LegalSection title="8. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. Changes will be
          announced in our Support Server. Continued use of NekoMii after
          changes constitutes acceptance of the updated policy.
        </p>
      </LegalSection>

      <LegalSection title="9. Contact">
        <p>
          For privacy-related questions or data deletion requests, join our{" "}
          <a
            href="https://discord.gg/vhsACTFFTq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Support Server
          </a>{" "}
          and open a support ticket.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

// ──────────────────────────────────────────────
// Terms of Service
// ──────────────────────────────────────────────
function TermsOfServicePage() {
  return (
    <LegalPage title="Terms of Service" subtitle="Last updated: March 30, 2026">
      <LegalSection title="1. Acceptance of Terms">
        <p>
          By adding NekoMii to your Discord server or using any of its commands,
          you agree to be bound by these Terms of Service. If you do not agree,
          please remove the bot from your server.
        </p>
      </LegalSection>

      <LegalSection title="2. Description of Service">
        <p>
          NekoMii is a Discord bot that provides music playback, queue
          management, audio filters, AI-powered recommendations, Spotify
          integration, and related features within Discord servers. The service
          is provided free of charge on a best-effort basis.
        </p>
      </LegalSection>

      <LegalSection title="3. Eligibility">
        <p>
          You must be at least 13 years old (or the minimum age required by
          Discord's Terms of Service in your jurisdiction) to use NekoMii. By
          using the bot you represent and warrant that you meet this
          requirement.
        </p>
      </LegalSection>

      <LegalSection title="4. Acceptable Use">
        <p>You agree to use NekoMii only for lawful purposes. You must NOT:</p>
        <ul className="list-disc list-inside space-y-1.5 pl-2">
          <li>
            Use the bot to stream or distribute copyrighted content in violation
            of applicable law.
          </li>
          <li>
            Attempt to reverse-engineer, exploit, or abuse the bot's
            infrastructure.
          </li>
          <li>
            Spam commands or use automated scripts to send excessive requests
            (rate-limit evasion).
          </li>
          <li>Use the bot to harass, threaten, or harm other users.</li>
          <li>
            Attempt to extract, scrape, or harvest data from the bot's responses
            beyond normal usage.
          </li>
          <li>
            Redistribute, resell, or commercially exploit the NekoMii service
            without written permission.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Music & Copyright">
        <p>
          NekoMii streams audio from third-party platforms (YouTube, Spotify,
          JioSaavn, SoundCloud, etc.) using their public APIs. You are
          responsible for ensuring your use complies with the terms of those
          platforms and applicable copyright laws. NekoMii does not host, store,
          or distribute audio files.
        </p>
      </LegalSection>

      <LegalSection title="6. Availability & Uptime">
        <p>
          We strive to maintain maximum uptime but do not guarantee
          uninterrupted availability. The service may experience downtime due to
          maintenance, Discord API outages, or unforeseen technical issues. We
          are not liable for any loss or damage caused by service interruptions.
        </p>
      </LegalSection>

      <LegalSection title="7. Termination">
        <p>
          We reserve the right to blacklist users or servers that violate these
          Terms without prior notice. You may remove NekoMii from your server at
          any time through Discord's server settings.
        </p>
      </LegalSection>

      <LegalSection title="8. Disclaimer of Warranties">
        <p>
          NekoMii is provided "as is" without warranties of any kind, express or
          implied, including but not limited to merchantability, fitness for a
          particular purpose, or non-infringement. We make no warranty that the
          service will meet your requirements or be error-free.
        </p>
      </LegalSection>

      <LegalSection title="9. Limitation of Liability">
        <p>
          To the fullest extent permitted by law, NekoMii and its developers
          shall not be liable for any indirect, incidental, special,
          consequential, or punitive damages arising from your use of, or
          inability to use, the service.
        </p>
      </LegalSection>

      <LegalSection title="10. Modifications to Terms">
        <p>
          We may revise these Terms at any time. Material changes will be
          announced in our Support Server. Your continued use of NekoMii after
          changes are posted constitutes your acceptance of the revised Terms.
        </p>
      </LegalSection>

      <LegalSection title="11. Governing Law">
        <p>
          These Terms are governed by and construed in accordance with
          applicable law. Any disputes shall be resolved through good-faith
          negotiation; if that fails, through binding arbitration or the courts
          of the relevant jurisdiction.
        </p>
      </LegalSection>

      <LegalSection title="12. Contact">
        <p>
          Questions about these Terms? Join our{" "}
          <a
            href="https://discord.gg/vhsACTFFTq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Support Server
          </a>{" "}
          and open a support ticket.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

// ──────────────────────────────────────────────
// Navbar
// ──────────────────────────────────────────────
function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-md bg-background/80">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <button
          type="button"
          onClick={() => navigate("")}
          className="flex items-center gap-2.5"
          data-ocid="nav.link"
        >
          <img
            src="/assets/generated/nekomii-logo.png"
            alt="NekoMii"
            className="w-9 h-9 object-contain rounded-full"
          />
          <span className="font-display font-700 text-lg tracking-tight text-foreground">
            NekoMii
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground font-medium">
          <a
            href="#features"
            className="hover:text-foreground transition-colors"
            data-ocid="nav.link"
          >
            Features
          </a>
          <a
            href="#commands"
            className="hover:text-foreground transition-colors"
            data-ocid="nav.link"
          >
            Commands
          </a>
          <a
            href="#support"
            className="hover:text-foreground transition-colors"
            data-ocid="nav.link"
          >
            Support
          </a>
        </nav>

        <a
          href="https://discord.com/oauth2/authorize?client_id=1484764048993292389&permissions=8&integration_type=0&scope=bot+applications.commands"
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="nav.primary_button"
        >
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:opacity-90 gap-1.5"
          >
            <SiDiscord className="w-4 h-4" />
            Add to Discord
          </Button>
        </a>
      </div>
    </header>
  );
}

// ──────────────────────────────────────────────
// Hero
// ──────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, oklch(0.72 0.18 295 / 0.12) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 20% 80%, oklch(0.65 0.15 260 / 0.08) 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="animate-float mx-auto mb-8 w-28 h-28"
        >
          <img
            src="/assets/generated/nekomii-logo.png"
            alt="NekoMii mascot"
            className="w-full h-full object-contain rounded-full drop-shadow-[0_0_30px_oklch(0.72_0.18_295_/_0.5)]"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-800 text-7xl md:text-8xl lg:text-9xl tracking-tight text-foreground mb-6"
        >
          Neko<span className="text-primary">Mii</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
        >
          A lightweight Discord music bot built for a calm, clean, and
          effortless listening experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="https://discord.com/oauth2/authorize?client_id=1484764048993292389&permissions=8&integration_type=0&scope=bot+applications.commands"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.primary_button"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:opacity-90 gap-2 shadow-glow animate-pulse-glow px-8"
            >
              <SiDiscord className="w-5 h-5" />
              Add to Discord
            </Button>
          </a>
          <a href="#commands" data-ocid="hero.secondary_button">
            <Button
              size="lg"
              variant="outline"
              className="border-border/60 text-foreground hover:bg-muted/50 gap-2 px-8"
            >
              View Commands
              <ChevronRight className="w-4 h-4" />
            </Button>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground/50 text-xs"
      >
        <span>scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/40 to-transparent" />
      </motion.div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Stats bar
// ──────────────────────────────────────────────
const stats = [
  { value: "53", label: "Servers" },
  { value: "5.0k", label: "Listeners" },
  { value: "100%", label: "Uptime" },
];

function StatsBar() {
  return (
    <section className="border-y border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-8">
        <FadeIn>
          <div className="grid grid-cols-3 divide-x divide-border/50">
            {stats.map((s) => (
              <div key={s.label} className="text-center px-4 py-2">
                <p className="font-display font-700 text-3xl md:text-4xl text-primary">
                  {s.value}
                </p>
                <p className="text-muted-foreground text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Features
// ──────────────────────────────────────────────
const features = [
  {
    icon: Music,
    title: "High Quality Audio",
    desc: "Crystal clear playback from YouTube, Spotify, and SoundCloud with no compression artifacts.",
  },
  {
    icon: Zap,
    title: "Simple Commands",
    desc: "Easy prefix commands with intuitive UX — no learning curve, just music.",
  },
  {
    icon: ListMusic,
    title: "Queue Management",
    desc: "Add, skip, shuffle, loop, and manage your full queue with ease.",
  },
  {
    icon: Sliders,
    title: "Filters & EQ",
    desc: "Bass boost, nightcore, vaporwave, and many more real-time audio filters.",
  },
  {
    icon: Clock,
    title: "24/7 Uptime",
    desc: "Always available when you need music — rain or shine, day or night.",
  },
  {
    icon: Shield,
    title: "Reliable & Fast",
    desc: "Low latency, high performance infrastructure so your music never skips.",
  },
];

function Features() {
  return (
    <section id="features" className="py-28">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              Why NekoMii?
            </p>
            <h2 className="font-display font-700 text-4xl md:text-5xl text-foreground">
              Everything you need
            </h2>
            <p className="text-muted-foreground mt-4 text-lg max-w-lg mx-auto">
              Packed with features, yet perfectly simple to use.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.08}>
              <div
                className="group relative rounded-xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-glow hover:-translate-y-0.5"
                data-ocid={`features.card.${i + 1}`}
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-2.5">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-600 text-lg text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Commands
// ──────────────────────────────────────────────
const commandRegistry = [
  {
    id: "music",
    label: "Music",
    commands: [
      "bump",
      "clear",
      "guessmusic",
      "history",
      "join",
      "likes",
      "loop",
      "lyrics",
      "move",
      "nowplaying",
      "pause",
      "play",
      "previous",
      "queue",
      "remove",
      "replay",
      "resume",
      "search",
      "seek",
      "shuffle",
      "skip",
      "sleep",
      "stop",
      "livelyrics",
      "volume",
    ],
  },
  {
    id: "filter",
    label: "Filter",
    commands: [
      "acoustic",
      "bassboost",
      "chipmunk",
      "clarity",
      "clearfilters",
      "danceflow",
      "daycore",
      "deepbass",
      "doubletime",
      "eightd",
      "electronic",
      "filter",
      "highquality",
      "karaoke",
      "nightcore",
      "party",
      "pitch",
      "pop",
      "rock",
      "slowmo",
      "soft",
      "superbass",
      "television",
      "treblebass",
      "vaporwave",
      "vibrate",
    ],
  },
  {
    id: "ai",
    label: "AI",
    commands: [
      "ai-filter",
      "ai-radio",
      "explain",
      "lyric-summary",
      "play-ai",
      "recommend",
      "translate",
      "vibe",
    ],
  },
  {
    id: "playlist",
    label: "Playlist",
    commands: [
      "add-to-playlist",
      "create-playlist",
      "delete-from-playlist",
      "delete-playlist",
      "edit-playlist",
      "playlists",
      "move-tracks",
    ],
  },
  {
    id: "info",
    label: "Info",
    commands: [
      "help",
      "history-clean",
      "invite",
      "new-releases",
      "ping",
      "shard",
      "botinfo",
      "top-artists",
      "uptime",
      "node",
    ],
  },
  {
    id: "config",
    label: "Config",
    commands: ["autoplay", "noprefix", "prefix", "request", "settheme", "247"],
  },
  {
    id: "misc",
    label: "Misc",
    commands: [
      "ai-roast",
      "animeopenings",
      "equalizer",
      "lyricsguess",
      "radio",
      "set-background",
      "set-color",
    ],
  },
  {
    id: "spotify",
    label: "Spotify",
    commands: ["spotify-login", "spotify-playlists", "spotify-unlink"],
  },
  {
    id: "sources",
    label: "Sources",
    commands: ["jiosaavn"],
  },
];

function Commands() {
  return (
    <section id="commands" className="py-28 bg-card/20">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              Commands
            </p>
            <h2 className="font-display font-700 text-4xl md:text-5xl text-foreground">
              Full Command Registry
            </h2>
            <p className="text-muted-foreground mt-4 text-lg max-w-lg mx-auto">
              Use prefix{" "}
              <code className="font-mono text-primary bg-primary/10 px-2 py-0.5 rounded text-base font-bold">
                .
              </code>{" "}
              before any command — e.g.{" "}
              <code className="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded text-sm">
                .play
              </code>
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="max-w-4xl mx-auto rounded-2xl border border-border/60 bg-background/60 backdrop-blur-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border/50 bg-card/50">
              <div className="w-3 h-3 rounded-full bg-destructive/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
              <span className="ml-2 text-xs text-muted-foreground font-mono">
                nekomii — command registry — prefix:{" "}
                <span className="text-primary font-bold">.</span>
              </span>
            </div>

            <Tabs defaultValue="music" className="w-full">
              <ScrollArea className="w-full">
                <TabsList
                  className="flex w-max min-w-full rounded-none border-b border-border/50 bg-card/30 h-auto px-2 pt-2 pb-0 gap-0"
                  data-ocid="commands.tab"
                >
                  {commandRegistry.map((cat) => (
                    <TabsTrigger
                      key={cat.id}
                      value={cat.id}
                      className="rounded-t-lg rounded-b-none border border-transparent data-[state=active]:border-border/60 data-[state=active]:border-b-background data-[state=active]:bg-background/80 data-[state=active]:text-primary text-muted-foreground text-xs font-mono px-4 py-2 transition-all"
                      data-ocid="commands.tab"
                    >
                      {cat.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </ScrollArea>

              {commandRegistry.map((cat) => (
                <TabsContent
                  key={cat.id}
                  value={cat.id}
                  className="mt-0 p-5 focus-visible:outline-none"
                >
                  <div className="flex flex-wrap gap-2">
                    {cat.commands.map((cmd, i) => (
                      <Badge
                        key={cmd}
                        variant="secondary"
                        className="font-mono text-sm px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
                        data-ocid={`commands.item.${i + 1}`}
                      >
                        .{cmd}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// CTA Banner
// ──────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div
            className="relative rounded-2xl overflow-hidden border border-primary/20 p-12 md:p-20 text-center"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.72 0.18 295 / 0.12) 0%, transparent 70%), oklch(0.13 0.015 285)",
            }}
          >
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
              Get started
            </p>
            <h2 className="font-display font-700 text-4xl md:text-5xl text-foreground mb-4">
              Ready to listen?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
              Add NekoMii to your server and enjoy effortless music in seconds.
            </p>
            <a
              href="https://discord.com/oauth2/authorize?client_id=1484764048993292389&permissions=8&integration_type=0&scope=bot+applications.commands"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="cta.primary_button"
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:opacity-90 gap-2 px-10 shadow-glow"
              >
                <SiDiscord className="w-5 h-5" />
                Add NekoMii to your server
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Footer
// ──────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer id="support" className="border-t border-border/50 bg-card/20">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/generated/nekomii-logo.png"
              alt="NekoMii"
              className="w-7 h-7 object-contain rounded-full"
            />
            <span className="font-display font-600 text-sm text-muted-foreground">
              NekoMii © {year}
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-5 text-sm text-muted-foreground">
            <button
              type="button"
              onClick={() => navigate("privacy")}
              className="hover:text-foreground transition-colors"
              data-ocid="footer.link"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => navigate("terms")}
              className="hover:text-foreground transition-colors"
              data-ocid="footer.link"
            >
              Terms of Service
            </button>
            <a
              href="https://discord.gg/vhsACTFFTq"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors inline-flex items-center gap-1.5"
              data-ocid="footer.link"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Support Server
            </a>
          </nav>

          <p className="text-xs text-muted-foreground/50">
            Built with ♥ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-muted-foreground transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ──────────────────────────────────────────────
// Home Page
// ──────────────────────────────────────────────
function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Features />
        <Commands />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}

// ──────────────────────────────────────────────
// App
// ──────────────────────────────────────────────
export default function App() {
  const route = useHashRoute();

  if (route === "privacy") return <PrivacyPolicyPage />;
  if (route === "terms") return <TermsOfServicePage />;
  return <HomePage />;
}
