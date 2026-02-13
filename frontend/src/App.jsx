import React, { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import { Routes, Route, NavLink, useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Loader2,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  Shield,
  EyeOff,
  DatabaseZap,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  Info,
  ChevronRight,
  SearchCode,
  ArrowRight,
  Activity,
  AlertTriangle,
  ExternalLink,
  Filter,
  Package,
  Terminal,
  Clock,
  LayoutDashboard,
  ChevronDown,
  Check
} from 'lucide-react';
import { SOCAL_LINKS } from './config/links';
import CustomDropdown from './components/CustomDropdown';

const API_BASE_URL = 'http://127.0.0.1:8000/api';
const GLOBAL_HEALTH_URL = 'http://127.0.0.1:8000/health';

// --- Shared Components ---

const ConnectivityStatus = ({ compact = true }) => {
  const [status, setStatus] = useState('checking');
  const [docCount, setDocCount] = useState(0);

  const checkHealth = async () => {
    try {
      const response = await axios.get(GLOBAL_HEALTH_URL, { timeout: 3000 });
      if (response.data.status === 'ok') {
        setStatus('online');
        setDocCount(response.data.document_count);
      } else {
        setStatus('offline');
      }
    } catch (err) {
      setStatus('offline');
    }
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 10000);
    return () => clearInterval(interval);
  }, []);

  if (status === 'checking') return null;

  if (!compact && status === 'offline') {
    return (
      <div className="fixed inset-0 z-[100] bg-[#0F172A]/95 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
        <div className="max-w-md w-full bg-[#1E293B] border border-red-900/20 p-10 rounded-[2.5rem] shadow-2xl text-center space-y-8">
          <div className="w-24 h-24 bg-red-900/10 rounded-3xl flex items-center justify-center mx-auto">
            <AlertTriangle size={48} className="text-red-500" />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-black text-white tracking-tight">Backend Offline</h2>
            <p className="text-slate-400 font-medium leading-relaxed">
              The neural ranking engine is currently unreachable. Start the FastAPI server on port 8000 to resume searching.
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-500 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            Retry Connection <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-500
      ${status === 'online' ? 'bg-emerald-900/10 text-emerald-400 border-emerald-500/20' : 'bg-red-900/10 text-red-400 border-red-500/20 animate-pulse'}
    `}>
      <div className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-emerald-500' : 'bg-red-500'}`} />
      {status === 'online' ? `Engine Ready (${docCount} Docs)` : 'Engine Disconnected'}
    </div>
  );
};

const Navbar = ({ onSearchClick }) => {
  const navItems = [
    { name: 'Search', path: '/' },
    { name: 'How it works', path: '/how-it-works' },
    { name: 'Privacy', path: '/privacy' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0F172A]/80 backdrop-blur-2xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform">
              <Zap size={18} className="text-white fill-current" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">IntelliRank</span>
          </Link>
          <div className="hidden lg:block">
            <ConnectivityStatus />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200
                ${isActive ? 'text-blue-400 bg-blue-900/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}
              `}
            >
              {item.name}
            </NavLink>
          ))}
          <button
            onClick={onSearchClick}
            className="ml-2 px-6 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-500 transition-all active:scale-95 shadow-xl shadow-blue-900/20"
          >
            Start Search
          </button>
        </div>
      </div>
    </nav>
  );
};

const Badge = ({ children, variant = "default" }) => {
  const styles = {
    // V5.0 Default: Neutral/Dark
    default: "bg-slate-800 text-slate-400 border border-slate-700",
    // V5.0 Category: #1E3A8A bg, #BFDBFE text
    category: "bg-[#1E3A8A] text-[#BFDBFE] border border-blue-900/50",
    // V5.0 Match: #064E3B bg, #A7F3D0 text
    match: "bg-[#064E3B] text-[#A7F3D0] border border-emerald-900/50",
    // Technical Blue
    blue: "bg-blue-900/30 text-blue-400 border border-blue-500/30",
    // Product Green
    green: "bg-emerald-900/30 text-emerald-400 border border-emerald-500/30",
    // Warning Amber
    amber: "bg-amber-900/30 text-amber-400 border border-amber-500/30",
  };

  return (
    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest leading-none ${styles[variant]}`}>
      {children}
    </span>
  );
};

// --- Page Components ---

const Home = ({ searchInputRef }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  // Filters
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSubcategory, setActiveSubcategory] = useState('All');

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/categories`);
        setCategories(res.data.categories);
      } catch (err) {
        console.error("Failed to fetch categories");
      }
    };
    fetchCats();
  }, []);

  // Dynamic Subcategory Fetching
  useEffect(() => {
    const fetchSubcats = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/subcategories?category=${activeCategory}`);
        setSubcategories(res.data.subcategories);
      } catch (err) {
        console.error("Failed to fetch subcategories");
      }
    };
    fetchSubcats();
  }, [activeCategory]);

  const handleSearch = async (e, customQuery = null) => {
    e?.preventDefault();
    const finalQuery = customQuery ?? query;
    if (!finalQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/search`, {
        query: finalQuery,
        top_n: 10, // Strictly 10 as per V5.0
        category: activeCategory === 'All' ? null : activeCategory,
        subcategory: activeSubcategory === 'All' ? null : activeSubcategory
      });
      setResults(response.data.results);
    } catch (err) {
      setError('Search failed. Ensure backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const SuggestionChips = () => {
    const chips = ["Python", "Cloud", "Backend", "Headphones", "Laptops"];
    return (
      <div className="flex flex-wrap items-center justify-center gap-2 pt-4 animate-fade-in">
        <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest mr-2">Suggestions:</span>
        {chips.map(chip => (
          <button
            key={chip}
            onClick={() => {
              setQuery(chip);
              handleSearch(null, chip);
            }}
            className="px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-black hover:border-blue-500 hover:text-white transition-all active:scale-95"
          >
            {chip}
          </button>
        ))}
      </div>
    );
  };

  const hasLowConfidence = useMemo(() => {
    return results.some(r => r.low_confidence);
  }, [results]);

  return (
    <div className="space-y-12">
      {/* Hero / Search Section */}
      <section className="pt-20 pb-10 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/20 rounded-2xl border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest">
            <Cpu size={14} /> Multi-Domain Semantic Search
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight">
            Discover the <span className="text-blue-500">Unseen.</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Neural ranking across technology stacks and product catalogs.
            More than keywords—true semantic understanding.
          </p>

          <form onSubmit={handleSearch} className="max-w-3xl mx-auto space-y-4">
            <div className="flex flex-col md:flex-row gap-3 p-2 bg-[#111827] rounded-3xl border border-[#1F2937] focus-within:border-blue-500/50 shadow-2xl transition-all">
              <div className="flex-1 flex items-center px-4">
                <Search className="text-slate-600 mr-4" size={24} />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Ask about Distributed Systems or Mechanical Keyboards..."
                  className="bg-transparent border-none outline-none text-[#E5E7EB] text-lg py-4 w-full placeholder:text-slate-700 font-semibold"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-500 text-white font-black px-10 py-4 rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Execute Sequence'}
              </button>
            </div>

            <SuggestionChips />

            <div className="flex flex-wrap items-center justify-center gap-4 py-4">
              <CustomDropdown
                value={activeCategory}
                onChange={(e) => {
                  setActiveCategory(e.target.value);
                  setActiveSubcategory('All');
                }}
                options={[
                  { value: 'All', label: 'All Domains' },
                  ...categories.map(c => ({ value: c, label: c }))
                ]}
                placeholder="All Domains"
                icon={Filter}
              />

              <CustomDropdown
                value={activeSubcategory}
                onChange={(e) => setActiveSubcategory(e.target.value)}
                options={[
                  { value: 'All', label: 'All Contexts' },
                  ...subcategories.map(s => ({ value: s, label: s }))
                ]}
                placeholder="All Contexts"
                icon={LayoutDashboard}
                disabled={activeCategory === 'All'}
              />
            </div>
          </form>
        </div>
      </section>

      {/* Results Section */}
      <main className="max-w-6xl mx-auto px-6 pb-24 space-y-8">
        {hasLowConfidence && results.length > 0 && (
          <div className="p-4 bg-amber-900/10 border border-amber-500/20 rounded-2xl flex items-center gap-4 animate-fade-in">
            <div className="p-2 bg-amber-900/20 rounded-lg text-amber-500">
              <Info size={20} />
            </div>
            <p className="text-amber-200/80 text-sm font-semibold">
              <span className="text-amber-400 font-black">Low Confidence Signal:</span> Some results might not perfectly match. Try specific keywords or adjust category filters.
            </p>
          </div>
        )}

        {results.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 animate-fade-in">
            {results.map((result) => (
              <div key={result.id} className="glass-card p-8 group flex flex-col justify-between h-full hover:border-blue-500/30">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Badge variant="category">{result.category}</Badge>
                      <Badge>{result.subcategory}</Badge>
                      {result.difficulty_level && <Badge variant="blue">{result.difficulty_level}</Badge>}
                      {result.price_range && <Badge variant="green">{result.price_range}</Badge>}
                    </div>
                    <Badge variant="match">{result.match_percentage} Match</Badge>
                  </div>

                  <h3 className="text-2xl font-black text-[#E5E7EB] group-hover:text-blue-400 transition-colors leading-tight">
                    {result.title}
                    {result.brand && <span className="text-slate-600 ml-2 font-medium">by {result.brand}</span>}
                  </h3>

                  <p className="text-slate-400 font-medium leading-relaxed line-clamp-2">
                    {result.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#1F2937] flex flex-wrap gap-2">
                  {result.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-black uppercase text-slate-600 tracking-widest px-2 py-1 bg-slate-900 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : !loading && query && (
          <div className="text-center py-20 bg-slate-900/30 rounded-[2.5rem] border border-[#1F2937] animate-fade-in">
            <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <SearchCode size={40} className="text-slate-600" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">No Matching Vectors</h3>
            <p className="text-slate-500 font-medium max-w-sm mx-auto">
              Our engine couldn't find a strong enough semantic link. Try broadening your query or checking "All Categories".
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

const HowItWorks = () => (
  <div className="max-w-4xl mx-auto px-6 py-24 space-y-20">
    <header className="text-center space-y-6">
      <Badge variant="blue">The Engine Architecture</Badge>
      <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">Beyond Keywords.</h2>
      <p className="text-slate-400 text-lg font-medium max-w-xl mx-auto leading-relaxed">
        IntelliRank uses weighted vectorization to understand the semantic intent of your query rather than just matching characters.
      </p>
    </header>

    <div className="grid gap-12">
      {[
        {
          step: "01",
          icon: <Activity className="text-blue-500" />,
          title: "Lexical Normalization",
          text: "We strip noise from your query. Stopwords are removed, and important tokens are isolated using NLTK preprocessing to focus on intent."
        },
        {
          step: "02",
          icon: <Layers className="text-emerald-500" />,
          title: "TF-IDF Vectorization",
          text: "Documents are transformed into a multi-dimensional matrix. Terms are weighted by their rarity across the collection, highlighting unique signals."
        },
        {
          step: "03",
          icon: <SearchCode className="text-purple-500" />,
          title: "Cosine Similarity Ranking",
          text: "We measure the angular distance between vectors. Results aren't just 'found'—they are mathematically ranked by their semantic alignment."
        }
      ].map((item, i) => (
        <div key={i} className="flex gap-8 group">
          <div className="flex flex-col items-center gap-4 text-slate-800">
            <div className="text-6xl font-black opacity-10 leading-none group-hover:opacity-20 transition-opacity">{item.step}</div>
            <div className="w-px h-full bg-slate-800" />
          </div>
          <div className="glass-card p-10 flex-1">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 border border-slate-800">
              {item.icon}
            </div>
            <h4 className="text-2xl font-black text-white mb-4">{item.title}</h4>
            <p className="text-slate-400 font-medium leading-relaxed">{item.text}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="p-10 bg-blue-600 rounded-[2.5rem] text-white shadow-2xl shadow-blue-900/20 text-center space-y-4">
      <h4 className="text-2xl font-black tracking-tight">Why no results?</h4>
      <p className="text-blue-100 font-medium max-w-xl mx-auto leading-relaxed text-sm">
        IntelliRank enforces a strict relevance floor. If even the best match doesn't hit our statistical minimum, we display nothing. This ensures output quality exceeds noisy 'guesswork'.
      </p>
    </div>
  </div>
);

const Privacy = () => (
  <div className="max-w-4xl mx-auto px-6 py-24 space-y-20">
    <header className="space-y-6">
      <Badge variant="green">Privacy & Security</Badge>
      <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">Private by Design.</h2>
      <p className="text-slate-400 text-lg font-medium leading-relaxed">
        A search environment built on anonymity, not surveillance.
      </p>
    </header>

    <div className="grid md:grid-cols-2 gap-8">
      <div className="glass-card p-10 space-y-6">
        <div className="w-14 h-14 bg-emerald-900/20 rounded-2xl flex items-center justify-center border border-emerald-500/20">
          <EyeOff size={28} className="text-emerald-500" />
        </div>
        <h4 className="text-2xl font-black text-white">Volatile Memory</h4>
        <p className="text-slate-400 font-medium leading-relaxed text-sm">
          Queries never touch a disk. They exist only in RAM for the fraction of a second needed for retrieval. After response delivery, they are purged completely.
        </p>
      </div>

      <div className="glass-card p-10 space-y-6">
        <div className="w-14 h-14 bg-emerald-900/20 rounded-2xl flex items-center justify-center border border-emerald-500/20">
          <ShieldCheck size={28} className="text-emerald-500" />
        </div>
        <h4 className="text-2xl font-black text-white">Zero Tracking</h4>
        <p className="text-slate-400 font-medium leading-relaxed text-sm">
          We don't use cookies, session IDs, or IP logging. This application is designed to be completely anonymous from request to response.
        </p>
      </div>
    </div>

    <div className="bg-[#1E293B] border border-slate-800 p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
        <Lock size={120} />
      </div>
      <h4 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
        <Lock className="text-blue-500" /> Security Core
      </h4>
      <div className="grid md:grid-cols-2 gap-8">
        {[
          { title: "Stateless API", desc: "No session state or user accounts exist." },
          { title: "No Persistence", desc: "Absolutely no databases involved in search." },
          { title: "Local In-Memory", desc: "Dataset is loaded into RAM upon boot." },
          { title: "Standard Headers", desc: "Minimal CORS setup for local isolation." }
        ].map((item, i) => (
          <div key={i} className="flex gap-4 items-start">
            <div className="p-1 bg-emerald-500/20 rounded-md text-emerald-500 mt-1">
              <CheckCircle2 size={14} />
            </div>
            <div>
              <h5 className="text-white font-bold text-sm">{item.title}</h5>
              <p className="text-slate-500 text-xs font-medium">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="border-t border-slate-800 py-20 bg-[#0F172A]">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl">
              <Zap size={18} className="text-white fill-current" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">IntelliRank</span>
          </div>
          <p className="text-slate-500 text-sm font-bold max-w-xs leading-relaxed uppercase tracking-widest leading-loose">
            AI-Powered Semantic Retrieval for Technical & Retail Domains.
          </p>
        </div>

        <div>
          <h5 className="text-[10px] font-black uppercase text-slate-600 tracking-[0.2em] mb-6">Platform</h5>
          <ul className="space-y-4 text-sm font-bold text-slate-400">
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Start Searching</Link></li>
            <li><Link to="/how-it-works" className="hover:text-blue-400 transition-colors">How it Works</Link></li>
            <li><a href="http://localhost:8000/docs" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-2">REST API <ExternalLink size={14} /></a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-[10px] font-black uppercase text-slate-600 tracking-[0.2em] mb-6">Connect</h5>
          <ul className="space-y-4 text-sm font-bold text-slate-400">
            <li><Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy & Security</Link></li>
            <li><a href={SOCAL_LINKS.github} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-2">Github <ArrowUpRight size={14} /></a></li>
            <li><a href={SOCAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-2">LinkedIn <ArrowUpRight size={14} /></a></li>
          </ul>
        </div>
      </div>

      <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
          &copy; 2026 IntelliRank Ecosystem. Product Quality Search Engine.
        </p>
        <div className="flex items-center gap-6">
          <div className="flex -space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-900 border-2 border-[#0F172A]" />
            <div className="w-8 h-8 rounded-full bg-emerald-900 border-2 border-[#0F172A]" />
            <div className="w-8 h-8 rounded-full bg-purple-900 border-2 border-[#0F172A]" />
          </div>
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Enterprise Secured Index</span>
        </div>
      </div>
    </div>
  </footer>
);

// --- App Layout & Router ---

function App() {
  const { pathname } = useLocation();
  const searchInputRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const focusSearch = () => {
    if (pathname !== '/') {
      // Use navigate or window.location
      window.location.href = '/';
    } else {
      searchInputRef.current?.focus();
      searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] font-sans selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
      <ConnectivityStatus compact={false} />
      <Navbar onSearchClick={focusSearch} />

      <div className="min-h-[calc(100vh-64px-440px)]">
        <Routes>
          <Route path="/" element={<Home searchInputRef={searchInputRef} />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
