import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Headphones, 
  PenTool, 
  Mic, 
  GraduationCap, 
  ChevronRight, 
  Sparkles,
  ArrowUpDown,
  Tag,
  CheckCircle,
  Play
} from 'lucide-react';
import { MockTestItem, ModuleType, ExamSource, ExamFormat } from '../types/ielts';

interface TestBankExplorerProps {
  tests: MockTestItem[];
  selectedModule: ModuleType;
  onSelectModule: (module: ModuleType) => void;
  onStartTest: (testId: number, module: ModuleType) => void;
}

export const TestBankExplorer: React.FC<TestBankExplorerProps> = ({
  tests,
  selectedModule,
  onSelectModule,
  onStartTest,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [formatFilter, setFormatFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter logic
  const filteredTests = useMemo(() => {
    return tests.filter(test => {
      // Search text match
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        const matchesCode = test.code.toLowerCase().includes(query);
        const matchesNum = String(test.id) === query || test.title.toLowerCase().includes(query);
        const matchesTopic = test.topics.some(t => t.toLowerCase().includes(query));
        const matchesSource = test.source.toLowerCase().includes(query);
        if (!matchesCode && !matchesNum && !matchesTopic && !matchesSource) return false;
      }

      // Source filter
      if (sourceFilter !== 'all' && test.source !== sourceFilter) return false;

      // Format filter
      if (formatFilter !== 'all' && test.format !== formatFilter) return false;

      // Difficulty filter
      if (difficultyFilter !== 'all' && !test.difficulty.includes(difficultyFilter)) return false;

      return true;
    });
  }, [tests, searchQuery, sourceFilter, formatFilter, difficultyFilter]);

  const totalPages = Math.ceil(filteredTests.length / itemsPerPage);
  const paginatedTests = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTests.slice(start, start + itemsPerPage);
  }, [filteredTests, currentPage]);

  const jumpToTest = (num: number) => {
    if (num >= 1 && num <= 100) {
      setSearchQuery(`MOCK-${String(num).padStart(3, '0')}`);
      setCurrentPage(1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#173F7A] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 mb-2">
            <GraduationCap className="w-3.5 h-3.5" /> Full IELTS Question Repository
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            100 Free IELTS Mock Tests (Mock 01 - 100)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Replicating the exact format of Alfa IELTS, Cambridge English Books 14-19, British Council & IDP Exam Banks.
          </p>
        </div>

        {/* Quick jump input */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm text-xs">
          <span className="text-slate-500 font-medium">Jump to Test #:</span>
          <input
            type="number"
            min="1"
            max="100"
            placeholder="1-100"
            className="w-16 px-2 py-1 rounded border border-slate-200 text-center font-bold text-[#173F7A] focus:outline-none focus:ring-1 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                jumpToTest(parseInt((e.target as HTMLInputElement).value));
              }
            }}
          />
        </div>
      </div>

      {/* Module Selector Tabs (Alfa IELTS Style) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'full-mock', label: 'All 100 Full Mocks', icon: GraduationCap, color: 'text-[#173F7A]' },
          { id: 'reading', label: 'Reading Tests (1-100)', icon: BookOpen, color: 'text-emerald-600' },
          { id: 'listening', label: 'Listening Tests (1-100)', icon: Headphones, color: 'text-indigo-600' },
          { id: 'writing', label: 'Writing Tests (1-100)', icon: PenTool, color: 'text-amber-600' },
          { id: 'speaking', label: 'Speaking Tests (1-100)', icon: Mic, color: 'text-rose-600' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedModule === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                onSelectModule(tab.id as ModuleType);
                setCurrentPage(1);
              }}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 ${
                isActive
                  ? 'bg-[#173F7A] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.color}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by test # (e.g. 15), topic (Architecture, Climate, AI), or source (Cambridge 19)..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder-slate-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Source Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={sourceFilter}
              onChange={(e) => {
                setSourceFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full md:w-auto"
            >
              <option value="all">All Sources (Cambridge, BC, IDP)</option>
              <option value="Cambridge 19">Cambridge English 19</option>
              <option value="Cambridge 18">Cambridge English 18</option>
              <option value="Cambridge 17">Cambridge English 17</option>
              <option value="British Council Official">British Council Official</option>
              <option value="IDP Official Exam">IDP Official Exam</option>
              <option value="Recent Actual 2025">Recent Actual 2025</option>
            </select>

            {/* Format Filter */}
            <select
              value={formatFilter}
              onChange={(e) => {
                setFormatFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Formats</option>
              <option value="Academic">Academic</option>
              <option value="General Training">General Training</option>
            </select>

            {/* Difficulty Filter */}
            <select
              value={difficultyFilter}
              onChange={(e) => {
                setDifficultyFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Difficulties</option>
              <option value="Standard">Standard (Band 6.0-7.0)</option>
              <option value="Challenging">Challenging (Band 7.0-8.0)</option>
              <option value="Mastery">Mastery (Band 8.0-9.0)</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>
            Showing <strong className="text-slate-800">{filteredTests.length}</strong> of 100 Mock Tests
          </span>
          <span>Page {currentPage} of {totalPages || 1}</span>
        </div>
      </div>

      {/* Test Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {paginatedTests.map((test) => (
          <div
            key={test.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all hover:border-[#173F7A]/40 flex flex-col justify-between"
          >
            <div>
              {/* Top Tags */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs font-black text-[#173F7A] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  {test.code}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  test.format === 'Academic' ? 'bg-indigo-50 text-indigo-700' : 'bg-emerald-50 text-emerald-700'
                }`}>
                  {test.format}
                </span>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {test.source}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                {test.title}
              </h3>

              {/* Topics */}
              <div className="mt-3 flex flex-wrap gap-1">
                {test.topics.map((t, i) => (
                  <span key={i} className="text-[10px] text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>

              {/* Difficulty */}
              <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Target: <strong className="text-slate-700">{test.difficulty.split(' ')[0]}</strong></span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> 100% Free
                </span>
              </div>
            </div>

            {/* Action Buttons for Module Practice */}
            <div className="mt-5 pt-3 border-t border-slate-100 space-y-2">
              {selectedModule === 'full-mock' ? (
                <div className="space-y-2">
                  <button
                    onClick={() => onStartTest(test.id, 'full-mock')}
                    className="w-full bg-[#173F7A] hover:bg-blue-900 text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" /> Take Full 4-Module Mock Test
                  </button>
                  <div className="grid grid-cols-4 gap-1 text-[10px] font-semibold">
                    <button
                      onClick={() => onStartTest(test.id, 'reading')}
                      className="py-1 px-1 text-center bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 rounded border border-slate-200 transition"
                    >
                      Reading
                    </button>
                    <button
                      onClick={() => onStartTest(test.id, 'listening')}
                      className="py-1 px-1 text-center bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 rounded border border-slate-200 transition"
                    >
                      Listening
                    </button>
                    <button
                      onClick={() => onStartTest(test.id, 'writing')}
                      className="py-1 px-1 text-center bg-slate-50 hover:bg-amber-50 hover:text-amber-700 rounded border border-slate-200 transition"
                    >
                      Writing
                    </button>
                    <button
                      onClick={() => onStartTest(test.id, 'speaking')}
                      className="py-1 px-1 text-center bg-slate-50 hover:bg-rose-50 hover:text-rose-700 rounded border border-slate-200 transition"
                    >
                      Speaking
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => onStartTest(test.id, selectedModule)}
                  className={`w-full font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow text-white ${
                    selectedModule === 'reading' ? 'bg-emerald-600 hover:bg-emerald-700' :
                    selectedModule === 'listening' ? 'bg-indigo-600 hover:bg-indigo-700' :
                    selectedModule === 'writing' ? 'bg-amber-600 hover:bg-amber-700' :
                    'bg-rose-600 hover:bg-rose-700'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-white" /> Start {selectedModule.toUpperCase()} Test
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold disabled:opacity-40 hover:bg-slate-100"
          >
            Previous
          </button>
          {Array.from({ length: Math.min(8, totalPages) }, (_, i) => i + 1).map((pg) => (
            <button
              key={pg}
              onClick={() => setCurrentPage(pg)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                currentPage === pg
                  ? 'bg-[#173F7A] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {pg}
            </button>
          ))}
          {totalPages > 8 && <span className="text-slate-400">... {totalPages}</span>}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold disabled:opacity-40 hover:bg-slate-100"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

