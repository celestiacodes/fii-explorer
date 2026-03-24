"use client";

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, Star, LogOut, Users, Target, BarChart3, Sparkles } from 'lucide-react';
import AttendeeCard from '@/components/AttendeeCard';
import StatsBar from '@/components/StatsBar';
import FilterPanel from '@/components/FilterPanel';
import { Attendee } from '@/types/attendee';

export default function ExplorerPage() {
  const router = useRouter();
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'company' | 'priority'>('priority');
  const [showOnlyTopTargets, setShowOnlyTopTargets] = useState(false);
  const [showOnlyEnriched, setShowOnlyEnriched] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'enriched'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('fii-auth') === 'true';
    if (!isAuthenticated) {
      router.push('/');
      return;
    }

    const loadData = async () => {
      try {
        // Try enriched data first, fall back to regular
        let data;
        try {
          const enrichedResponse = await fetch('/data/processed-attendees-enriched.json');
          if (enrichedResponse.ok) {
            data = await enrichedResponse.json();
          }
        } catch {}
        
        if (!data) {
          const response = await fetch('/data/processed-attendees.json');
          data = await response.json();
        }
        
        setAttendees(data);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [router]);

  const enrichedCount = useMemo(() => {
    return attendees.filter(a => {
      const e = a.enriched as any;
      return e?.company_details || e?.personal_details || e?.biography || e?.enriched_bio;
    }).length;
  }, [attendees]);

  const filteredAttendees = useMemo(() => {
    let filtered = [...attendees];

    // Enriched tab filter
    if (activeTab === 'enriched') {
      filtered = filtered.filter(a => {
        const e = a.enriched as any;
        return e?.company_details || e?.personal_details || e?.biography || e?.enriched_bio;
      });
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(attendee =>
        attendee.name.toLowerCase().includes(query) ||
        attendee.title.toLowerCase().includes(query) ||
        attendee.company.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(attendee => attendee.category === selectedCategory);
    }

    if (showOnlyTopTargets) {
      filtered = filtered.filter(attendee => attendee.isTopTarget);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'company':
          return a.company.localeCompare(b.company);
        case 'priority':
          return (b.priorityScore || 0) - (a.priorityScore || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [attendees, searchQuery, selectedCategory, showOnlyTopTargets, sortBy, activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('fii-auth');
    router.push('/');
  };

  const categories = [
    { id: 'all', label: 'All Categories', count: attendees.length },
    { id: 'Investors', label: 'Investors', count: attendees.filter(a => a.category === 'Investors').length },
    { id: 'Tech/AI', label: 'Tech/AI', count: attendees.filter(a => a.category === 'Tech/AI').length },
    { id: 'EdTech', label: 'EdTech', count: attendees.filter(a => a.category === 'EdTech').length },
    { id: 'Longevity/Health', label: 'Longevity/Health', count: attendees.filter(a => a.category === 'Longevity/Health').length },
    { id: 'Middle East', label: 'Middle East', count: attendees.filter(a => a.category === 'Middle East').length },
    { id: 'Other', label: 'Other', count: attendees.filter(a => a.category === 'Other').length },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Loading attendee data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center justify-between md:justify-start">
              <div>
                <h1 className="text-3xl font-bold text-white">FII Miami 2026 Explorer</h1>
                <p className="text-gray-400 text-base mt-1">Primer Seed Round Targets</p>
              </div>
              <button
                onClick={handleLogout}
                className="md:hidden flex items-center gap-2 px-3 py-2 text-base text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex-1 md:max-w-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by name, title, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 px-4 py-3 text-base text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-base font-medium transition-all ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Users className="w-5 h-5" />
              All Attendees
              <span className="ml-1 text-sm opacity-75">({attendees.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('enriched')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-base font-medium transition-all ${
                activeTab === 'enriched'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-600/20'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              Enriched Bios
              <span className="ml-1 text-sm opacity-75">({enrichedCount})</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Bar */}
        <StatsBar
          totalAttendees={attendees.length}
          filteredCount={filteredAttendees.length}
          topTargetsCount={attendees.filter(a => a.isTopTarget).length}
        />

        {/* Enriched Section Banner (when on enriched tab) */}
        {activeTab === 'enriched' && (
          <div className="mt-6 p-5 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl border border-purple-700/30">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-bold text-white">Enriched Bios</h2>
            </div>
            <p className="text-base text-gray-300">
              AI-enriched profiles with company details, career highlights, recent news, and Primer relevance analysis. 
              Click "View Full Profile" on any card to see the enriched data.
            </p>
            <div className="flex items-center gap-4 mt-3">
              <span className="text-base text-purple-300 font-medium">{enrichedCount} enriched</span>
              <span className="text-gray-600">|</span>
              <span className="text-base text-gray-400">{attendees.length - enrichedCount} pending</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterPanel
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
              showOnlyTopTargets={showOnlyTopTargets}
              onTopTargetsToggle={() => setShowOnlyTopTargets(!showOnlyTopTargets)}
            />
          </div>

          {/* Attendee Grid */}
          <div className="lg:col-span-3">
            {filteredAttendees.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No attendees found</h3>
                <p className="text-gray-500 text-base">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-base text-gray-400">
                  Showing {filteredAttendees.length} of {attendees.length} attendees
                  {activeTab === 'enriched' && (
                    <span className="ml-2 text-purple-400">• Enriched profiles only</span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredAttendees.map((attendee) => (
                    <AttendeeCard key={attendee.number} attendee={attendee} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-base">
              <p>FII Miami 2026 • Future of Investment Initiative</p>
              <p className="mt-1">Built for Primer Seed Round targeting • Powered by Celestia</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-400">
                <Users className="w-5 h-5" />
                <span className="text-base">{attendees.length} attendees</span>
              </div>
              <div className="flex items-center gap-2 text-purple-400">
                <Sparkles className="w-5 h-5" />
                <span className="text-base">{enrichedCount} enriched</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Target className="w-5 h-5" />
                <span className="text-base">{attendees.filter(a => a.isTopTarget).length} top targets</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}