import { useState, useEffect, useMemo, useRef } from "react"
import { GlobePulse } from "@/components/ui/cobe-globe-pulse"
import { Sparkles, TerminalSquare, Rss, ArrowRight, Sun, Moon, ExternalLink, Cpu, Search, X, Command } from "lucide-react"

interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  published_at: string;
  dev_summary: string;
  casual_summary: string;
  tags: string[];
  score: number;
}

function App() {
  const [isDark, setIsDark] = useState(true)
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"dev" | "casual">("dev")
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  
  const searchInputRef = useRef<HTMLInputElement>(null)
  const toggle = () => setIsDark(d => !d)

  useEffect(() => {
    fetch("/latest_news.json")
      .then(res => res.json())
      .then(data => {
        setNews(data.items || [])
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to fetch news:", err)
        setLoading(false)
      })
  }, [])

  // Derived filtered news
  const filteredNews = useMemo(() => {
    if (!searchQuery.trim()) return news
    const q = searchQuery.toLowerCase()
    return news.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.source.toLowerCase().includes(q) ||
      item.tags.some(t => t.toLowerCase().includes(q))
    )
  }, [news, searchQuery])

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowSearch(true)
      }
      if (e.key === 'Escape') {
        setShowSearch(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (showSearch) {
      setTimeout(() => searchInputRef.current?.focus(), 100)
    }
  }, [showSearch])

  return (
    <div className={isDark ? "" : "light"}>
      <div className="relative min-h-screen" style={{ background: "var(--bg)", color: "var(--text-secondary)", transition: "background 0.3s, color 0.3s" }}>

        {/* Search Modal Overlay */}
        {showSearch && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 backdrop-blur-md bg-black/40 animate-fade-in">
            <div 
              className="w-full max-w-2xl overflow-hidden border shadow-2xl animate-fade-in-up"
              style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <div className="flex items-center p-6 gap-4 border-b" style={{ borderColor: "var(--border)" }}>
                <Search className="w-5 h-5" style={{ color: "var(--neon)" }} />
                <input 
                  ref={searchInputRef}
                  type="text"
                  placeholder="Query system intelligence... (name, tag, or company)"
                  className="flex-grow bg-transparent border-none outline-none font-mono text-sm uppercase tracking-widest placeholder:opacity-30"
                  style={{ color: "var(--text-primary)" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  onClick={() => setShowSearch(false)}
                  className="p-1 hover:opacity-50 transition-opacity">
                  <X className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
                </button>
              </div>
              
              <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                <div className="px-2 py-4 border-b border-dashed mb-4" style={{ borderColor: "var(--border)" }}>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold" style={{ color: "var(--text-muted)" }}>
                    {searchQuery ? `Filtering: ${filteredNews.length} matches found` : "Active Datastream Index"}
                  </span>
                </div>
                
                <div className="flex flex-col gap-2">
                  {filteredNews.map((item, idx) => (
                    <button 
                      key={item.id || idx}
                      onClick={() => {
                        setShowSearch(false);
                        const el = document.getElementById(`news-${item.id || idx}`);
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="group flex flex-col items-start p-4 hover:bg-white/5 text-left border border-transparent hover:border-[var(--border)] transition-all">
                      <div className="flex justify-between w-full items-center mb-1">
                        <span className="text-[10px] font-mono font-bold" style={{ color: "var(--neon)" }}>{item.source}</span>
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" style={{ color: "var(--neon)" }} />
                      </div>
                      <span className="text-sm font-serif group-hover:text-[var(--neon)] transition-colors" style={{ color: "var(--text-primary)" }}>{item.title}</span>
                    </button>
                  ))}
                  {filteredNews.length === 0 && (
                    <div className="py-12 flex flex-col items-center gap-4">
                      <TerminalSquare className="w-8 h-8 animate-pulse text-[var(--text-muted)]" />
                      <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>No matches in current intelligence sector.</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-4 border-t flex justify-between items-center bg-black/20" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-center gap-4 text-[9px] font-mono uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                  <span className="flex items-center gap-1"><span className="px-1.5 py-0.5 border rounded" style={{ borderColor: "var(--border)" }}>ESC</span> to close</span>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-[var(--neon)] font-bold animate-pulse">
                  <Cpu className="w-3 h-3" />
                  STATUS: SCANNED
                </div>
              </div>
            </div>
          </div>
        )}

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
                  <img src="/logo.png" alt="AI Gyan"
                    className={"w-full h-full object-contain " + (isDark ? "filter invert opacity-90" : "opacity-90")}
                    onError={(e) => { e.currentTarget.style.display = 'none' }} />
                </div>
                <div className="hidden sm:flex flex-col justify-center">
                  <span className="font-serif text-2xl tracking-tighter leading-none" style={{ color: "var(--text-primary)" }}>AI Gyan</span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] mt-1" style={{ color: "var(--text-muted)" }}>Intelligence</span>
                </div>
              </div>

              {/* Nav */}
              <nav className="hidden md:flex justify-center">
                <ul className="flex gap-4 items-center px-4 py-1.5 rounded-full border text-[10px] font-mono uppercase tracking-[0.12em] font-semibold"
                  style={{ background: isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.7)", borderColor: "var(--border)" }}>
                  <li>
                    <button 
                      onClick={() => setViewMode("dev")}
                      style={{ color: viewMode === "dev" ? "var(--neon)" : "var(--text-muted)" }} 
                      className="hover:opacity-70 transition-all px-3 py-1 rounded-full">
                      Developer Specs
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setViewMode("casual")}
                      style={{ color: viewMode === "casual" ? "var(--neon-alt)" : "var(--text-muted)" }} 
                      className="hover:opacity-70 transition-all px-3 py-1 rounded-full">
                      Casual Feed
                    </button>
                  </li>
                </ul>
              </nav>

              {/* Right actions */}
              <div className="flex justify-end items-center gap-3">
                {/* Dark/Light Toggle */}
                <button
                  onClick={toggle}
                  className="relative flex items-center w-14 h-7 rounded-full border transition-all duration-300 cursor-pointer focus:outline-none"
                  style={{ background: "var(--surface)", borderColor: "var(--neon)" }}
                  aria-label="Toggle theme"
                >
                  <span
                    className="absolute left-1 flex items-center justify-center w-5 h-5 rounded-full transition-transform duration-300 z-10"
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
                  <Sun className="absolute right-1.5 w-3 h-3" style={{ color: isDark ? "var(--text-muted)" : "var(--neon)" }} />
                  <Moon className="absolute left-1.5 w-3 h-3 opacity-0" />
                </button>

                <button 
                  onClick={() => setShowSearch(true)}
                  className="flex items-center gap-2 border py-2 px-4 text-xs font-mono uppercase font-bold tracking-widest transition-all rounded-sm group hover:border-[var(--neon)]"
                  style={{ borderColor: "var(--border)", color: "var(--text-secondary)", background: "var(--surface)" }}>
                  <TerminalSquare className="w-3.5 h-3.5 group-hover:animate-pulse" style={{ color: "var(--neon)" }} />
                  Run Query
                  <span className="text-[10px] opacity-40 hidden lg:inline ml-1 font-normal font-mono px-1 rounded bg-white/5">⌘K</span>
                </button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="w-full max-w-[1400px] mx-auto px-6 flex flex-col items-center">
            
            {/* Hero Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-12 md:mt-24 pb-20 w-full">
              {/* Left Column */}
              <div className="md:col-span-7 flex flex-col justify-center animate-fade-in-up">

                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--neon-alt)" }}></span>
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--neon-alt)" }}></span>
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest font-bold" style={{ color: "var(--neon-alt)" }}>
                    Agents Scraping Global Datastream
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
                    {news.length || 10} crucial updates
                  </span>{" "}
                  daily. Formatted for the builder. Readable by the layman.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up delay-300">
                  <button 
                    onClick={() => {
                      document.getElementById('feed-start')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="group flex items-center justify-center gap-3 font-semibold font-mono uppercase tracking-widest text-xs py-4 px-8 rounded-none border transition-all duration-300"
                    style={{ background: "var(--text-primary)", color: "var(--bg)", borderColor: "var(--text-primary)" }}>
                    <Rss className="w-4 h-4" />
                    Enter the Feed
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button 
                    onClick={() => setShowSearch(true)}
                    className="group flex items-center justify-center gap-3 font-mono uppercase tracking-widest text-xs py-4 px-8 rounded-none transition-all duration-300 border"
                    style={{ background: "transparent", color: "var(--text-secondary)", borderColor: "var(--border)" }}>
                    <Search className="w-4 h-4" style={{ color: "var(--neon)" }} />
                    Global Search
                  </button>
                </div>
              </div>

              {/* Right Column — Globe Panel */}
              <div className="md:col-span-5 relative flex items-center justify-center overflow-hidden opacity-0 animate-fade-in-up delay-300 min-h-[450px]"
                style={{ background: isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)", border: `1px solid var(--border)`, boxShadow: isDark ? "0 0 50px rgba(0,0,0,0.8)" : "0 0 30px rgba(0,0,0,0.05)" }}>
                {["tl", "tr", "bl", "br"].map(c => (
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
                <div className="absolute inset-x-0 bottom-0 h-32 z-20 pointer-events-none"
                  style={{ background: `linear-gradient(to top, var(--bg), transparent)` }} />
                <div className="absolute top-4 right-4 z-30 font-mono flex flex-col items-end gap-1.5 px-3 py-2.5 backdrop-blur-sm"
                  style={{ background: isDark ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.9)", border: `1px solid color-mix(in srgb, var(--neon) 40%, transparent)` }}>
                  <span className="text-[11px] uppercase tracking-[0.2em] font-bold" style={{ color: "var(--neon)" }}>⬡ Global Scan</span>
                  <span className="text-[11px] font-semibold tracking-widest" style={{ color: "var(--text-primary)" }}>LAT 51.51 / LNG -0.13</span>
                  <span className="text-[11px] font-bold tracking-wider animate-pulse" style={{ color: "var(--neon)" }}>● Active Connections: {news.length || 0}</span>
                </div>
                <div className="w-[150%] max-w-[800px] absolute scale-[1.2] translate-y-12">
                  <GlobePulse speed={0.003} />
                </div>
              </div>
            </div>

            {/* News Feed Section */}
            <div id="feed-start" className="w-full pt-20 border-t" style={{ borderColor: "var(--border)" }}>
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div>
                  <h2 className="text-4xl md:text-5xl font-serif mb-4 italic" style={{ color: "var(--text-primary)" }}>Daily Core Feed {searchQuery && <span className="text-2xl font-mono text-[var(--neon)]">/ Filtered</span>}</h2>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] font-bold" style={{ color: "var(--text-muted)" }}>{new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
                
                <div className="flex items-center gap-4 p-1 rounded-sm border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                  <button 
                    onClick={() => setViewMode("dev")}
                    className={"px-4 py-2 text-[10px] font-mono uppercase tracking-widest font-bold transition-all " + (viewMode === 'dev' ? 'bg-[var(--text-primary)] text-[var(--bg)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]')}>
                    Dev Specs
                  </button>
                  <button 
                    onClick={() => setViewMode("casual")}
                    className={"px-4 py-2 text-[10px] font-mono uppercase tracking-widest font-bold transition-all " + (viewMode === 'casual' ? 'bg-[var(--text-primary)] text-[var(--bg)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]')}>
                    Casual
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-32 gap-6">
                  <div className="w-12 h-12 border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--neon) var(--border) var(--border) var(--border)" }}></div>
                  <span className="font-mono text-xs uppercase tracking-widest animate-pulse" style={{ color: "var(--text-muted)" }}>Polling Agent API...</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border" style={{ background: "var(--border)", borderColor: "var(--border)" }}>
                  {filteredNews.map((item, idx) => (
                    <article 
                      id={`news-${item.id || idx}`}
                      key={item.id || idx} 
                      className="group relative flex flex-col p-8 transition-all duration-500 overflow-hidden"
                      style={{ background: "var(--card-bg)" }}>
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                        <Cpu className="w-12 h-12" style={{ color: viewMode === 'dev' ? "var(--neon)" : "var(--neon-alt)" }} />
                      </div>
                      
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] px-2 py-0.5 border"
                          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                          {item.source}
                        </span>
                        <span className="text-[14px] font-mono font-bold" style={{ color: "var(--neon)" }}>
                          0{news.indexOf(item) + 1}
                        </span>
                      </div>

                      <h3 className="text-xl font-serif mb-6 leading-tight group-hover:translate-x-1 transition-transform" style={{ color: "var(--text-primary)" }}>
                        {item.title}
                      </h3>

                      <p className="text-sm font-mono leading-relaxed mb-8 flex-grow" style={{ color: "var(--text-secondary)" }}>
                        {viewMode === "dev" ? item.dev_summary : item.casual_summary}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {item.tags?.map(tag => (
                          <span key={tag} className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 border-b cursor-pointer hover:text-[var(--neon)] transition-colors"
                            onClick={() => { setShowSearch(true); setSearchQuery(tag); }}
                            style={{ borderColor: "var(--tag-border)", color: "var(--text-muted)" }}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a href={item.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] font-bold mt-auto group/link"
                        style={{ color: "var(--text-primary)" }}>
                        Access Intelligence
                        <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" style={{ color: "var(--neon)" }} />
                      </a>
                    </article>
                  ))}
                  {filteredNews.length === 0 && (
                    <div className="col-span-full py-32 flex flex-col items-center justify-center gap-6" style={{ background: "var(--bg)" }}>
                      <Search className="w-12 h-12 opacity-10" />
                      <div className="text-center">
                        <p className="font-serif text-2xl italic mb-2">Sector Empty.</p>
                        <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>No intelligence matches query: "{searchQuery}"</p>
                        <button 
                          onClick={() => setSearchQuery("")}
                          className="mt-8 text-xs font-mono uppercase tracking-[0.2em] font-bold border-b py-1"
                          style={{ color: "var(--neon)", borderColor: "var(--neon)" }}>
                          Reset Connection
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <footer className="w-full py-20 mt-20 border-t flex flex-col md:flex-row justify-between items-center gap-10" style={{ borderColor: "var(--border)" }}>
              <div className="flex flex-col items-center md:items-start">
                <span className="font-serif text-2xl" style={{ color: "var(--text-primary)" }}>AI Gyan</span>
                <span className="font-mono text-xs uppercase tracking-widest mt-2" style={{ color: "var(--text-muted)" }}>Intelligence, Simplified.</span>
              </div>
              <div className="flex gap-10 font-mono text-[10px] uppercase tracking-widest font-bold">
                <a href="#" style={{ color: "var(--text-muted)" }} className="hover:text-[var(--neon)]">Twitter</a>
                <a href="#" style={{ color: "var(--text-muted)" }} className="hover:text-[var(--neon)]">Newsletter</a>
                <a href="#" style={{ color: "var(--text-muted)" }} className="hover:text-[var(--neon)]">API docs</a>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
