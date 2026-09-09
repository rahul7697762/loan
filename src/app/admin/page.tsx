'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  LogOut,
  Link2,
  Save,
  ExternalLink,
  Download,
  Search,
  Trash2,
  Database,
  Phone,
  Calendar,
  CheckCircle2,
  RefreshCw,
  Loader2,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';

interface Lead {
  id: string;
  phone_number: string;
  status: string;
  user_agent?: string;
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [redirectUrl, setRedirectUrl] = useState('');
  const [newRedirectUrl, setNewRedirectUrl] = useState('');
  const [savingUrl, setSavingUrl] = useState(false);
  const [urlMessage, setUrlMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

  // Fetch settings & leads on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoadingLeads(true);
    try {
      // 1. Fetch current settings
      const settingsRes = await fetch('/api/admin/settings');
      if (settingsRes.status === 401) {
        router.push('/admin/login');
        return;
      }
      const settingsData = await settingsRes.json();
      if (settingsData.success) {
        setRedirectUrl(settingsData.settings.redirect_url);
        setNewRedirectUrl(settingsData.settings.redirect_url);
        setIsSupabaseConnected(settingsData.isSupabaseConnected);
      }

      // 2. Fetch leads list
      const leadsRes = await fetch('/api/admin/leads');
      const leadsData = await leadsRes.json();
      if (leadsData.success) {
        setLeads(leadsData.leads);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoadingLeads(false);
    }
  };

  const handleSaveRedirectUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    setUrlMessage(null);
    setSavingUrl(true);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'redirect_url', value: newRedirectUrl }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update redirect URL');
      }

      setRedirectUrl(data.value);
      setUrlMessage({ type: 'success', text: 'Redirect link updated successfully in Supabase!' });
    } catch (err: any) {
      setUrlMessage({ type: 'error', text: err.message || 'Failed to save URL' });
    } finally {
      setSavingUrl(false);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead record?')) return;

    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setLeads(leads.filter((l) => l.id !== id));
      } else {
        alert(data.error || 'Failed to delete');
      }
    } catch (err) {
      alert('Error deleting lead');
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;

    const headers = ['ID', 'Phone Number', 'Status', 'Created At', 'User Agent'];
    const csvRows = [
      headers.join(','),
      ...leads.map((l) =>
        [
          `"${l.id}"`,
          `"${l.phone_number}"`,
          `"${l.status}"`,
          `"${new Date(l.created_at).toLocaleString()}"`,
          `"${(l.user_agent || '').replace(/"/g, '""')}"`,
        ].join(',')
      ),
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `loan_applications_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  // Filter leads based on search
  const filteredLeads = leads.filter((l) =>
    l.phone_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navbar */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white">FlexiLoan Admin</span>
            </Link>
            <span className="hidden sm:inline-block text-[11px] font-medium text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
              Management Portal
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
              <Database className={`w-3.5 h-3.5 ${isSupabaseConnected ? 'text-emerald-400' : 'text-amber-400'}`} />
              <span>
                Supabase:{' '}
                <strong className={isSupabaseConnected ? 'text-emerald-400' : 'text-amber-400'}>
                  {isSupabaseConnected ? 'Connected Live' : 'Dev Memory Fallback'}
                </strong>
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:border-red-500/30 rounded-lg border border-slate-800 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* STATS OVERVIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Total Applications Captured</span>
              <span className="text-2xl font-bold text-white">{leads.length} Leads</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Redirect Destination</span>
              <span className="text-sm font-semibold text-emerald-400 truncate max-w-[200px] block">
                {redirectUrl || 'Loading...'}
              </span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Database Status</span>
              <span className="text-sm font-bold text-slate-200">
                {isSupabaseConnected ? 'Supabase Active' : 'Demo Fallback Active'}
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 1: REDIRECT URL EDITOR */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Target Redirect Link Setting</h2>
              <p className="text-xs text-slate-400">
                After users submit their phone number on the loan page, they will automatically be redirected to this URL.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveRedirectUrl} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Redirect Link (Stored in Supabase `settings` table)
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="url"
                  placeholder="https://example.com/thank-you-or-offer-page"
                  value={newRedirectUrl}
                  onChange={(e) => setNewRedirectUrl(e.target.value)}
                  required
                  className="flex-grow px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono text-sm"
                />

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={savingUrl}
                    className="px-6 py-3.5 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {savingUrl ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>Save Link</span>
                  </button>

                  {redirectUrl && (
                    <a
                      href={redirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="hidden sm:inline">Test Link</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {urlMessage && (
              <div
                className={`p-3.5 rounded-xl border text-xs font-medium flex items-center gap-2 ${
                  urlMessage.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}
              >
                {urlMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{urlMessage.text}</span>
              </div>
            )}
          </form>
        </section>

        {/* SECTION 2: CAPTURED LEADS DATA TABLE */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">Submitted Loan Applications</h2>
              <p className="text-xs text-slate-400">
                Live entries of all phone numbers saved into the database.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* Search Bar */}
              <div className="relative flex-grow sm:w-64">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search phone number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Refresh Button */}
              <button
                onClick={fetchData}
                title="Refresh leads"
                className="p-2.5 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-800 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loadingLeads ? 'animate-spin' : ''}`} />
              </button>

              {/* CSV Export */}
              <button
                onClick={handleExportCSV}
                disabled={leads.length === 0}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto border border-slate-800 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">#</th>
                  <th className="py-3.5 px-4">Phone Number</th>
                  <th className="py-3.5 px-4">Date & Time</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/60">
                {loadingLeads ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
                        <span>Loading submitted applications...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500 font-medium">
                      No loan applications found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead, idx) => (
                    <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-4 font-mono text-slate-500">{idx + 1}</td>
                      <td className="py-4 px-4 font-semibold text-emerald-400 text-sm">
                        {lead.phone_number}
                      </td>
                      <td className="py-4 px-4 text-slate-300">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          <span>{new Date(lead.created_at).toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {lead.status || 'Captured'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          title="Delete application"
                          className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: SUPABASE INSTRUCTIONS BOX */}
        {!isSupabaseConnected && (
          <section className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-6 text-amber-200 space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-300">
              <Database className="w-5 h-5" />
              <span>Connect Your Real Supabase Project</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Currently running in memory preview mode. To link your live Supabase database, copy the SQL script from{' '}
              <code className="text-emerald-400 bg-slate-950 px-1.5 py-0.5 rounded font-mono">
                supabase_schema.sql
              </code>{' '}
              into your Supabase SQL Editor and update your credentials in{' '}
              <code className="text-emerald-400 bg-slate-950 px-1.5 py-0.5 rounded font-mono">
                .env.local
              </code>
              :
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto">
              <div>NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co</div>
              <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key</div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
