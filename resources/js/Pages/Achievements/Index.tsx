"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "@/Components/Elements/navbar";
import { Footer } from "@/Components/Elements/footer";
import { InteractiveCursor } from "@/Components/Elements/InteractiveCursor";
import { Head, Link } from "@inertiajs/react";
import { AnimateIn } from "@/Components/Elements/AnimateIn";
import { Badge } from "@/Components/UI/badge";
import { buttonVariants } from "@/Components/UI/button";
import { Input } from "@/Components/UI/input";
import { RiArrowRightLine, RiTrophyLine, RiMedalLine, RiStarLine, RiLoader4Line, RiSearchLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

interface PaginatedData {
  data: any[];
  current_page: number;
  last_page: number;
}

interface Props {
  achievements: PaginatedData;
}

export default function AchievementsIndex({ achievements }: Props) {
  const [items, setItems] = useState<any[]>(achievements.data);
  const [page, setPage] = useState(achievements.current_page);
  const [lastPage, setLastPage] = useState(achievements.last_page);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const categories = ["all", "event", "award", "certification"];

  useEffect(() => {
    // Skip fetching if it's the initial load state
    if (category === 'all' && search === "" && page === achievements.current_page && items.length === achievements.data.length && items.length > 0) {
        return; 
    }
    
    setLoading(true);
    const timer = setTimeout(() => {
        axios.get(`/achievements?category=${category}&search=${search}&page=1`, {
            headers: { Accept: 'application/json' }
        }).then(res => {
            setItems(res.data.data);
            setPage(res.data.current_page);
            setLastPage(res.data.last_page);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, 500);

    return () => clearTimeout(timer);
  }, [category, search]);

  const loadMore = () => {
    if (page >= lastPage || loading) return;
    
    setLoading(true);
    axios.get(`/achievements?category=${category}&search=${search}&page=${page + 1}`, {
        headers: { Accept: 'application/json' }
    }).then(res => {
        setItems(prev => [...prev, ...res.data.data]);
        setPage(res.data.current_page);
        setLoading(false);
    }).catch(err => {
        console.error(err);
        setLoading(false);
    });
  };

  const getIcon = (cat: string) => {
    switch (cat) {
      case 'award': return RiTrophyLine;
      case 'certification': return RiMedalLine;
      default: return RiStarLine;
    }
  };

  return (
    <div className="font-sans bg-background text-foreground selection:bg-primary/10 selection:text-primary">
      <Head title="Achievements - Portfolio" />
      <InteractiveCursor />
      <Navbar />

      <main className="min-h-screen w-full pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <AnimateIn variant="blur-fade">
              <Badge variant="secondary" className="mb-4">Achievements</Badge>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
                Recognition & <span className="text-primary">Milestones</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                A comprehensive gallery of my awards, certifications, and event participations throughout my journey.
              </p>
            </AnimateIn>
          </div>

          {/* Filters & Search */}
          <AnimateIn variant="blur-fade" delay={0.1}>
            <div className="flex flex-col md:flex-row gap-4 mb-10 items-start md:items-center justify-between">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-bold tracking-wide capitalize transition-all border",
                      category === cat 
                        ? "bg-primary text-primary-foreground border-primary shadow-md" 
                        : "bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                    type="text" 
                    placeholder="Search achievements..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 rounded-full bg-card shadow-sm w-full"
                />
                {loading && <RiLoader4Line className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />}
              </div>
            </div>
          </AnimateIn>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, idx) => {
                const Icon = getIcon(item.category);
                return (
                  <AnimateIn key={`${item.id}-${idx}`} variant="blur-fade" delay={Math.min(idx * 0.05, 0.5)}>
                    <Link href={`/achievements/${item.id}?from=gallery`} className="block h-[280px] relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-zinc-200/50 dark:border-zinc-800/50 bg-card">
                        {/* Image Background */}
                        {item.preview_image ? (
                            <img 
                                src={`/storage/${item.preview_image}`} 
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                        ) : (
                            <div className="absolute inset-0 w-full h-full bg-muted flex items-center justify-center">
                                <Icon className="size-16 text-muted-foreground/20" />
                            </div>
                        )}
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm" />

                        {/* Hover Content */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-white">
                            <div className="flex justify-between items-start">
                                <Badge variant="outline" className="text-white border-white/20 bg-black/20 backdrop-blur-md text-xs font-bold tracking-widest capitalize">
                                    {item.category} {item.year ? `· ${item.year}` : ''}
                                </Badge>
                                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center">
                                    <Icon className="size-5 text-white" />
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-xl leading-tight mb-2">
                                    {item.title}
                                </h4>
                                <p className="text-xs text-white/80 font-medium mb-3">
                                    {item.organization}
                                </p>
                                <p className="text-sm text-white/70 line-clamp-2 mb-4">
                                    {item.description}
                                </p>
                                
                                <div className="text-xs font-bold uppercase tracking-widest text-white/90 flex items-center gap-1 group/btn">
                                    View Details <RiArrowRightLine className="size-4 transform group-hover/btn:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </Link>
                  </AnimateIn>
                );
            })}

            {/* Skeletons while loading */}
            {loading && items.length === 0 && Array.from({ length: 6 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="h-[280px] rounded-2xl bg-muted/50 border border-border animate-pulse relative overflow-hidden">
                    <div className="absolute bottom-6 left-6 right-6 space-y-3 opacity-30">
                        <div className="h-6 w-3/4 bg-muted-foreground/30 rounded" />
                        <div className="h-4 w-1/2 bg-muted-foreground/30 rounded" />
                    </div>
                </div>
            ))}
          </div>

          {!loading && items.length === 0 && (
            <div className="py-20 text-center border border-dashed rounded-3xl mt-6 border-border">
              {search ? <RiSearchLine className="size-16 text-muted-foreground/20 mx-auto mb-4" /> : <RiTrophyLine className="size-16 text-muted-foreground/20 mx-auto mb-4" />}
              <h3 className="text-xl font-bold">{search ? 'No results found' : 'No achievements yet'}</h3>
              <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                {search ? `We couldn't find anything matching "${search}". Try adjusting your keywords or category.` : 'Check back later for new updates.'}
              </p>
            </div>
          )}

          {/* Load More Button */}
          {page < lastPage && items.length > 0 && (
            <div className="mt-16 flex justify-center">
              <button 
                onClick={loadMore}
                disabled={loading}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-full px-8 gap-2 group transition-all",
                  loading && "opacity-70 cursor-not-allowed"
                )}
              >
                {loading ? (
                    <>
                      <RiLoader4Line className="size-5 animate-spin" /> Loading...
                    </>
                ) : (
                    <>
                      Load More <RiArrowRightLine className="size-4 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
