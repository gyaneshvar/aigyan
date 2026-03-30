import { useState, useMemo } from "react"
import { ExternalLink, Wrench, BookOpen, Globe, Star, Tag, ChevronRight, Play } from "lucide-react"

// Inline YouTube icon (not in this version of lucide-react)
function YoutubeIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

export interface ResourceItem {
  id: string
  name: string
  description: string
  link: string
  icon: string
  tags: string[]
  featured: boolean
}

export interface VideoItem {
  id: string
  video_id: string
  title: string
  channel: string
  description: string
  link: string
  thumbnail: string
  tags: string[]
  featured: boolean
}

export interface ResourcesData {
  version: string
  updated_at: string
  ai_tools: ResourceItem[]
  popular_skills: ResourceItem[]
  powerful_websites: ResourceItem[]
  youtube_videos: VideoItem[]
}

type Category = "all" | "ai_tools" | "popular_skills" | "powerful_websites" | "youtube_videos"

interface ResourcesGridProps {
  data: ResourcesData | null
  loading: boolean
  onTagClick?: (tag: string) => void
  searchQuery?: string
}

const CATEGORIES: { key: Category; label: string; icon: React.ReactNode; color: string }[] = [
  { key: "all", label: "All Resources", icon: <Star className="w-3.5 h-3.5" />, color: "var(--neon)" },
  { key: "ai_tools", label: "AI Tools", icon: <Wrench className="w-3.5 h-3.5" />, color: "var(--neon)" },
  { key: "popular_skills", label: "Popular Skills", icon: <BookOpen className="w-3.5 h-3.5" />, color: "var(--neon-alt)" },
  { key: "powerful_websites", label: "Powerful Websites", icon: <Globe className="w-3.5 h-3.5" />, color: "#a78bfa" },
  { key: "youtube_videos", label: "YouTube Videos", icon: <YoutubeIcon className="w-3.5 h-3.5" />, color: "#ff0000" },
]

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  ai_tools: { label: "AI Tool", color: "var(--neon)" },
  popular_skills: { label: "Skill", color: "var(--neon-alt)" },
  powerful_websites: { label: "Website", color: "#a78bfa" },
  youtube_videos: { label: "YouTube", color: "#ff0000" },
}

function ResourceCard({
  item,
  category,
  onTagClick,
}: {
  item: ResourceItem
  category: string
  onTagClick?: (tag: string) => void
}) {
  const meta = CATEGORY_LABELS[category] ?? { label: category, color: "var(--neon)" }

  return (
    <article
      className="group relative flex flex-col p-7 transition-all duration-500 overflow-hidden"
      style={{ background: "var(--card-bg)" }}
    >
      <div
        className="absolute top-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-700"
        style={{ background: `linear-gradient(to right, ${meta.color}, transparent)` }}
      />
      {item.featured && (
        <div
          className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest border"
          style={{ color: meta.color, borderColor: `color-mix(in srgb, ${meta.color} 40%, transparent)`, background: `color-mix(in srgb, ${meta.color} 8%, transparent)` }}
        >
          <Star className="w-2.5 h-2.5" /> Featured
        </div>
      )}

      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <span
            className="text-2xl w-10 h-10 flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            {item.icon}
          </span>
          <span
            className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] px-2 py-0.5 border"
            style={{ color: meta.color, borderColor: `color-mix(in srgb, ${meta.color} 30%, transparent)` }}
          >
            {meta.label}
          </span>
        </div>
      </div>

      <h3 className="text-lg font-serif mb-3 leading-tight transition-all duration-300 group-hover:translate-x-1" style={{ color: "var(--text-primary)" }}>
        {item.name}
      </h3>
      <p className="text-sm font-mono leading-relaxed mb-6 flex-grow" style={{ color: "var(--text-secondary)", lineHeight: "1.7" }}>
        {item.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {item.tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagClick?.(tag)}
            className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 border-b transition-all hover:opacity-100 opacity-60"
            style={{ borderColor: "var(--tag-border)", color: "var(--text-muted)" }}
          >
            <Tag className="w-2 h-2" />
            {tag}
          </button>
        ))}
      </div>

      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] font-bold mt-auto group/link w-fit"
        style={{ color: meta.color }}
      >
        Open Resource
        <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" style={{ color: meta.color }} />
        <ExternalLink className="w-3 h-3 opacity-50" />
      </a>
    </article>
  )
}

function VideoCard({
  item,
  onTagClick,
}: {
  item: VideoItem & { _category: string }
  onTagClick?: (tag: string) => void
}) {
  const YT_COLOR = "#ff0000"

  return (
    <article
      className="group relative flex flex-col overflow-hidden transition-all duration-500"
      style={{ background: "var(--card-bg)" }}
    >
      {/* Thumbnail */}
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="relative block overflow-hidden">
        <div className="absolute top-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-700 z-10" style={{ background: `linear-gradient(to right, ${YT_COLOR}, transparent)` }} />
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // fallback to hqdefault if maxresdefault fails
            e.currentTarget.src = `https://img.youtube.com/vi/${item.video_id}/hqdefault.jpg`
          }}
        />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: YT_COLOR }}>
            <Play className="w-6 h-6 text-white ml-1" fill="white" />
          </div>
        </div>
        {/* Featured badge */}
        {item.featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest border z-10"
            style={{ color: YT_COLOR, borderColor: `color-mix(in srgb, ${YT_COLOR} 50%, transparent)`, background: "rgba(0,0,0,0.85)" }}>
            <Star className="w-2.5 h-2.5" /> Featured
          </div>
        )}
      </a>

      {/* Content below thumbnail */}
      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center gap-2 mb-3">
          <YoutubeIcon className="w-3.5 h-3.5" style={{ color: YT_COLOR }} />
          <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em]" style={{ color: YT_COLOR }}>
            YouTube · {item.channel}
          </span>
        </div>

        <h3 className="text-base font-serif mb-3 leading-snug transition-all duration-300 group-hover:translate-x-1" style={{ color: "var(--text-primary)" }}>
          {item.title}
        </h3>
        <p className="text-sm font-mono leading-relaxed mb-5 flex-grow" style={{ color: "var(--text-secondary)", lineHeight: "1.7" }}>
          {item.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {item.tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick?.(tag)}
              className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 border-b transition-all hover:opacity-100 opacity-60"
              style={{ borderColor: "var(--tag-border)", color: "var(--text-muted)" }}
            >
              <Tag className="w-2 h-2" />
              {tag}
            </button>
          ))}
        </div>

        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] font-bold mt-auto group/link w-fit"
          style={{ color: YT_COLOR }}
        >
          Watch on YouTube
          <Play className="w-3 h-3 transition-transform group-hover/link:translate-x-1" fill="currentColor" />
        </a>
      </div>
    </article>
  )
}

type AnyItem = (ResourceItem & { _category: string }) | (VideoItem & { _category: string })

export default function ResourcesGrid({ data, loading, onTagClick, searchQuery = "" }: ResourcesGridProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("all")

  const allItems = useMemo((): AnyItem[] => {
    if (!data) return []
    return [
      ...data.ai_tools.map((i) => ({ ...i, _category: "ai_tools" as const })),
      ...(data.popular_skills ?? []).map((i) => ({ ...i, _category: "popular_skills" as const })),
      ...(data.powerful_websites ?? []).map((i) => ({ ...i, _category: "powerful_websites" as const })),
      ...(data.youtube_videos ?? []).map((i) => ({ ...i, _category: "youtube_videos" as const })),
    ]
  }, [data])

  const filteredItems = useMemo(() => {
    let items = activeCategory === "all" ? allItems : allItems.filter((i) => i._category === activeCategory)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      items = items.filter((i) => {
        if (i._category === "youtube_videos") {
          const v = i as VideoItem & { _category: string }
          return v.title.toLowerCase().includes(q) || v.channel.toLowerCase().includes(q) || v.description.toLowerCase().includes(q) || v.tags.some(t => t.toLowerCase().includes(q))
        }
        const r = i as ResourceItem & { _category: string }
        return r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.tags.some(t => t.toLowerCase().includes(q))
      })
    }
    return [...items].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
  }, [allItems, activeCategory, searchQuery])

  const counts = useMemo(() => ({
    all: allItems.length,
    ai_tools: data?.ai_tools.length ?? 0,
    popular_skills: data?.popular_skills?.length ?? 0,
    powerful_websites: data?.powerful_websites?.length ?? 0,
    youtube_videos: data?.youtube_videos?.length ?? 0,
  }), [allItems, data])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-6">
        <div className="w-12 h-12 border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--neon) var(--border) var(--border) var(--border)" }} />
        <span className="font-mono text-xs uppercase tracking-widest animate-pulse" style={{ color: "var(--text-muted)" }}>Loading Resource Matrix...</span>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <Globe className="w-12 h-12 opacity-10" />
        <p className="font-mono text-sm uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Resource data unavailable.</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif mb-3 italic" style={{ color: "var(--text-primary)" }}>
            Resource Hub
            {searchQuery && <span className="text-2xl font-mono ml-3" style={{ color: "var(--neon)" }}>/ Filtered</span>}
          </h2>
          <p className="font-mono text-xs uppercase tracking-[0.3em] font-bold" style={{ color: "var(--text-muted)" }}>
            {filteredItems.length} resources · curated for builders
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(({ key, label, icon, color }) => {
            const isActive = activeCategory === key
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className="flex items-center gap-2 px-4 py-2 text-[10px] font-mono uppercase tracking-widest font-bold border transition-all duration-300"
                style={{
                  background: isActive ? color : "var(--surface)",
                  color: isActive ? "#000" : "var(--text-muted)",
                  borderColor: isActive ? color : "var(--border)",
                  boxShadow: isActive ? `0 0 20px color-mix(in srgb, ${color} 30%, transparent)` : "none",
                }}
              >
                {icon}
                {label}
                <span
                  className="px-1.5 py-0.5 rounded-full text-[8px]"
                  style={{ background: isActive ? "rgba(0,0,0,0.25)" : "var(--border)", color: isActive ? "#fff" : "var(--text-muted)" }}
                >
                  {counts[key]}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid */}
      {filteredItems.length === 0 ? (
        <div className="py-32 flex flex-col items-center justify-center gap-6 border" style={{ borderColor: "var(--border)" }}>
          <Globe className="w-12 h-12 opacity-10" />
          <div className="text-center">
            <p className="font-serif text-2xl italic mb-2" style={{ color: "var(--text-primary)" }}>No matches found.</p>
            <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>No resources match "{searchQuery}"</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "var(--border)" }}>
          {filteredItems.map((item) =>
            item._category === "youtube_videos" ? (
              <VideoCard
                key={`${item._category}-${item.id}`}
                item={item as VideoItem & { _category: string }}
                onTagClick={onTagClick}
              />
            ) : (
              <ResourceCard
                key={`${item._category}-${item.id}`}
                item={item as ResourceItem & { _category: string }}
                category={item._category}
                onTagClick={onTagClick}
              />
            )
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 flex items-center justify-center gap-3 py-6 border-t" style={{ borderColor: "var(--border)" }}>
        <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
          Manually curated · Updated {data.updated_at} · Add entries via{" "}
          <code className="px-1 py-0.5 text-[10px]" style={{ background: "var(--surface)", color: "var(--neon)" }}>
            public/resources.json
          </code>
        </span>
      </div>
    </div>
  )
}
