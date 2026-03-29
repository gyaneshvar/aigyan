import { useState } from "react"
import { GlobePulse } from "@/components/ui/cobe-globe-pulse"
import { Sparkles, TerminalSquare, Rss, ArrowRight, Sun, Moon } from "lucide-react"

function App() {
  const [isDark, setIsDark] = useState(true)
  const toggle = () => setIsDark(d => !d)

  return (
    <div className={isDark ? "" : "light"}>
      <div className="relative min-h-screen" style={{ background: "var(--bg)", color: "var(--text-secondary)", transition: "background 0.3s, color 0.3s" }}>

        {/* Grid background */}
        <div className="fixed inset-0 pointer-events-none bg-grid z-0 opacity-100" />

        {/* Top Banner */}
        <div style={{ background: "var(--neon)", color: isDark ? "#000" : "#fff" }}
          className="w-full px-4 py-1.5 flex justify-between items-center text-xs font-mono font-bold tracking-widest uppercase relative z-40">
          <span>INITIALIZING AGENT SYSTEMS</span>
          <span className="hidden sm:inline-block">v1.2 // INTELLIGENCE BRIDGE ACTIVE</span>
          <span className="animate-pulse">ONLINE</span>
        </div>

        <div className="relative z-10 w-full min-h-screen flex flex-col items-center">

          {/* Navbar */}
          <header className="w-full sticky top-0 z-50 backdrop-blur-xl border-b"
            style={{ background: "var(--header-bg)", borderColor: "var(--border)" }}>
            <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 items-center h-[72px] px-6">

              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center p-1 border"
                  style={{ background: isDark ? "#000" : "#f4f4f5", borderColor: "var(--border)", boxShadow: `0 0 15px color-mix(in srgb, var(--neon) 20%, transparent)` }}>
                  <img src="/logo.png" alt="AIGyan"
                    className={"w-full h-full object-contain " + (isDark ? "filter invert opacity-90" : "opacity-90")}
                    onError={(e) => { e.currentTarget.style.display = 'none' }} />
                </div>
                <div className="hidden sm:flex flex-col justify-center">
                  <span className="font-serif text-2xl tracking-tighter leading-none" style={{ color: "var(--text-primary)" }}>AIGyan</span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] mt-1" style={{ color: "var(--text-muted)" }}>Intelligence</span>
                </div>
              </div>

              {/* Nav */}
              <nav className="hidden md:flex justify-center">
                <ul className="flex gap-8 items-center px-6 py-2 rounded-full border text-xs font-mono uppercase tracking-[0.15em] font-semibold"
                  style={{ background: isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.7)", borderColor: "var(--border)" }}>
                  <li><a href="#" style={{ color: "var(--text-primary)" }} className="hover:opacity-70 transition-opacity">Daily Core</a></li>
                  <li><a href="#" style={{ color: "var(--text-muted)" }} className="hover:opacity-100 transition-opacity">Developer Specs</a></li>
                  <li><a href="#" style={{ color: "var(--text-muted)" }} className="hover:opacity-100 transition-opacity">Archive</a></li>
                </ul>
              </nav>

              {/* Right actions */}
              <div className="flex justify-end items-center gap-3">
                {/* Dark/Light Toggle */}
                <button
                  onClick={toggle}
                  className="relative flex items-center w-14 h-7 rounded-full border transition-all duration-300 cursor-pointer focus:outline-none"
                  style={{ background: isDark ? "var(--surface)" : "var(--surface)", borderColor: "var(--neon)" }}
                  aria-label="Toggle theme"
                >
                  {/* Track */}
                  <span
                    className="absolute left-1 flex items-center justify-center w-5 h-5 rounded-full transition-transform duration-300"
                    style={{
                      background: "var(--neon)",
                      transform: isDark ? "translateX(0)" : "translateX(28px)"
                    }}
                  >
                    {isDark
                      ? <Moon className="w-3 h-3" style={{ color: "#000" }} />
                      : <Sun className="w-3 h-3" style={{ color: "#fff" }} />
                    }
                  </span>
                  {/* Icons */}
                  <Sun className="absolute right-1.5 w-3 h-3" style={{ color: isDark ? "var(--text-muted)" : "var(--neon)" }} />
                  <Moon className="absolute left-1.5 w-3 h-3 opacity-0" />
                </button>

                <button className="flex items-center gap-2 border py-2 px-4 text-xs font-mono uppercase font-bold tracking-widest transition-all rounded-sm"
                  style={{ borderColor: "var(--border)", color: "var(--text-secondary)", background: "var(--surface)" }}>
                  <TerminalSquare className="w-3.5 h-3.5" style={{ color: "var(--neon)" }} />
                  Run Query
                </button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="w-full max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 mt-12 md:mt-24 pb-32">

            {/* Left Column */}
            <div className="md:col-span-7 flex flex-col justify-center animate-fade-in-up">

              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--neon-alt)" }}></span>
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--neon-alt)" }}></span>
                </span>
                <span className="font-mono text-xs uppercase tracking-widest font-bold" style={{ color: "var(--neon-alt)" }}>
                  Agents Scraping 403 endpoints
                </span>
              </div>

              <h1 className="text-[4rem] md:text-[6.5rem] leading-[0.85] font-serif italic mb-6 pr-4 tracking-tighter"
                style={{ color: "var(--text-primary)" }}>
                AI Decoded.
                <br />
                <span className="not-italic" style={{
                  background: `linear-gradient(to right, var(--neon), var(--text-primary), var(--text-muted))`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  Intelligence.
                </span>
              </h1>

              <p className="font-mono text-sm md:text-base leading-relaxed max-w-xl pl-6 mb-10 border-l-2 opacity-0 animate-fade-in-up delay-200"
                style={{ color: "var(--text-secondary)", borderColor: `color-mix(in srgb, var(--neon) 50%, transparent)` }}>
                Information overload is obsolete. Our agentic pipeline distills the entire AI ecosystem into exactly{" "}
                <span className="font-bold px-1 rounded" style={{ color: "var(--text-primary)", background: "var(--surface)" }}>
                  10 crucial updates
                </span>{" "}
                daily. Formatted for the builder. Readable by the layman.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up delay-300">
                <button className="group flex items-center justify-center gap-3 font-semibold font-mono uppercase tracking-widest text-xs py-4 px-8 rounded-none border transition-all duration-300"
                  style={{ background: "var(--text-primary)", color: "var(--bg)", borderColor: "var(--text-primary)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--bg)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--text-primary)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--bg)"; }}>
                  <Rss className="w-4 h-4" />
                  Initialize Feed
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="group flex items-center justify-center gap-3 font-mono uppercase tracking-widest text-xs py-4 px-8 rounded-none transition-all duration-300 border"
                  style={{ background: "transparent", color: "var(--text-secondary)", borderColor: "var(--border)" }}>
                  <TerminalSquare className="w-4 h-4" style={{ color: "var(--neon)" }} />
                  Dev Terminal
                </button>
              </div>

              {/* Tags */}
              <div className="mt-16 flex flex-wrap gap-2 opacity-0 animate-fade-in-up delay-500">
                {['#LLM', '#OpenSource', '#Agents', '#Anthropic', '#OpenAI', '#Gemini', '#Claude'].map(tag => (
                  <span key={tag}
                    className="px-3 py-1 font-mono text-[10px] rounded-full cursor-pointer transition-all"
                    style={{ color: "var(--text-muted)", background: "var(--tag-bg)", border: `1px solid var(--tag-border)` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column — Globe Panel */}
            <div className="md:col-span-5 relative flex items-center justify-center overflow-hidden opacity-0 animate-fade-in-up delay-300 min-h-[450px]"
              style={{ background: isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)", border: `1px solid var(--border)`, boxShadow: isDark ? "0 0 50px rgba(0,0,0,0.8)" : "0 0 30px rgba(0,0,0,0.05)" }}>

              {/* Corner accents */}
              {["tl","tr","bl","br"].map(c => (
                <div key={c} className="absolute w-4 h-4 pointer-events-none"
                  style={{
                    top: c.startsWith("t") ? -1 : "auto",
                    bottom: c.startsWith("b") ? -1 : "auto",
                    left: c.endsWith("l") ? -1 : "auto",
                    right: c.endsWith("r") ? -1 : "auto",
                    borderTop: c.startsWith("t") ? `2px solid var(--neon)` : undefined,
                    borderBottom: c.startsWith("b") ? `2px solid var(--neon)` : undefined,
                    borderLeft: c.endsWith("l") ? `2px solid var(--neon)` : undefined,
                    borderRight: c.endsWith("r") ? `2px solid var(--neon)` : undefined,
                    opacity: 0.5,
                  }} />
              ))}

              {/* Fade bottom */}
              <div className="absolute inset-x-0 bottom-0 h-32 z-20 pointer-events-none"
                style={{ background: `linear-gradient(to top, var(--bg), transparent)` }} />

              {/* Overlay HUD */}
              <div className="absolute top-4 right-4 z-30 font-mono flex flex-col items-end gap-1.5 px-3 py-2.5 backdrop-blur-sm"
                style={{ background: isDark ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.9)", border: `1px solid color-mix(in srgb, var(--neon) 40%, transparent)`, boxShadow: `0 0 15px color-mix(in srgb, var(--neon) 10%, transparent)` }}>
                <span className="text-[11px] uppercase tracking-[0.2em] font-bold" style={{ color: "var(--neon)" }}>⬡ Global Scan</span>
                <span className="text-[11px] font-semibold tracking-widest" style={{ color: "var(--text-primary)" }}>LAT 51.51 / LNG -0.13</span>
                <span className="text-[11px] font-bold tracking-wider animate-pulse" style={{ color: "var(--neon)" }}>● Active Connections: 4</span>
              </div>

              {/* Globe */}
              <div className="w-[150%] max-w-[800px] absolute scale-[1.2] translate-y-12">
                <GlobePulse speed={0.003} />
              </div>

              {/* Bottom status bar */}
              <div className="absolute z-10 bottom-6 left-6 flex items-center gap-3 p-3 backdrop-blur-sm"
                style={{ background: isDark ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.85)", border: `1px solid var(--border)` }}>
                <Sparkles className="w-4 h-4" style={{ color: "var(--neon)" }} />
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase" style={{ color: "var(--text-muted)" }}>Processing Activity</span>
                  <span className="font-sans text-sm font-bold tracking-widest" style={{ color: "var(--text-primary)" }}>LIVE DATASTREAM</span>
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  )
}

export default App
