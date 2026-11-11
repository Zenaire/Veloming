import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TicketView } from '../components/common/TicketView';
import { TicketCard } from '../components/common/TicketCard';
import { ticketService, Ticket, extractTicketIdNumber } from '../services/ticketService';

export const Track: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const idFromParam = searchParams.get('id');

  const [searchQuery, setSearchQuery] = useState(idFromParam || '');
  const [ticketsList, setTicketsList] = useState<Ticket[]>([]);
  const [activeReport, setActiveReport] = useState<Ticket | null>(null);

  // Load all tickets from service, always sorted with largest ID (newest) at the top
  const refreshTickets = () => {
    const all = ticketService.getAllTickets();
    const sorted = [...all].sort((a, b) => extractTicketIdNumber(b.id) - extractTicketIdNumber(a.id));
    setTicketsList(sorted);
    return sorted;
  };

  useEffect(() => {
    const all = refreshTickets();

    if (idFromParam) {
      const trimmed = idFromParam.trim().toUpperCase();
      setSearchQuery(trimmed);

      const found = all.find((r) => r.id.toUpperCase() === trimmed);
      if (found) {
        setActiveReport(found);
      } else {
        const ticket = ticketService.getTicketById(trimmed);
        if (ticket) {
          setActiveReport(ticket);
        } else {
          setActiveReport({
            id: trimmed,
            nama: 'Warga',
            category: 'Infrastruktur jalan',
            location: 'Jl. Margonda Raya',
            description: 'Laporan warga.',
            status: 'Diterima',
            createdAt: new Date().toISOString(),
          });
        }
      }
    }
  }, [idFromParam]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const trimmed = searchQuery.trim().toUpperCase();
    const found = ticketsList.find((r) => r.id.toUpperCase() === trimmed);

    if (found) {
      setActiveReport(found);
    } else {
      const ticket = ticketService.getTicketById(trimmed);
      if (ticket) {
        setActiveReport(ticket);
      } else {
        const newTicket = ticketService.createTicket({
          nama: 'Warga',
          category: 'Infrastruktur jalan',
          location: 'Jl. Margonda Raya',
          description: 'Laporan warga.',
        });
        setActiveReport(newTicket);
        refreshTickets();
      }
    }

    setSearchParams({ id: trimmed });
  };

  const handleSelectReport = (report: Ticket) => {
    setSearchQuery(report.id);
    setActiveReport(report);
    setSearchParams({ id: report.id });
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const handleResetSearch = () => {
    setActiveReport(null);
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="w-full min-h-[calc(100vh-160px)] bg-[var(--background-bg-secondary)] py-12 sm:py-16 md:py-20 px-4 sm:px-6 flex justify-center">
      <div className="w-full max-w-[680px] mx-auto flex flex-col">
        {/* ========================================================================= */}
        {/* PAGE HEADER (Lacak Laporan)                                               */}
        {/* Figma Frame: [4151:23526] Container (680x88)                              */}
        {/* ========================================================================= */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-4xl font-semibold text-[var(--text-text-gray-text-primary)] tracking-tight leading-tight">
            Lacak Laporan
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[var(--text-text-gray-text-tertiary)] font-normal">
            Masukkan ID Laporan Anda untuk melihat status dan progres.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* SEARCH BAR (Input Field_ + Button_) [680x84]                              */}
        {/* ========================================================================= */}
        <div className="w-full mb-6">
          <form onSubmit={handleSearch} className="flex items-center gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#181D27] pointer-events-none">
                <Search className="w-5 h-5 stroke-[2.2]" />
              </span>
              <input
                type="text"
                required
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Contoh: VLM-2026-042"
                className="w-full h-11 pl-11 pr-4 text-sm sm:text-base bg-white border border-[var(--border-border-primary)] rounded-lg text-[var(--text-text-gray-text-primary)] placeholder-[#A3A7AE] focus:outline-none focus:border-[var(--background-bg-brand-solid)] focus:ring-1 focus:ring-[var(--background-bg-brand-solid)] transition-colors uppercase font-mono"
              />
            </div>
            <button
              type="submit"
              className="h-11 px-5 sm:px-6 text-sm sm:text-base font-semibold text-white bg-[var(--background-bg-brand-solid)] hover:bg-[var(--background-bg-brand-solid-hover)] active:scale-95 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              Cari
            </button>
          </form>

          {/* Helper Text (Only visible in State 1 before search) */}
          {!activeReport && (
            <p className="mt-4 text-center text-sm text-[var(--text-text-gray-text-tertiary)] font-normal">
              Masukkan ID Laporan untuk melacak status.
            </p>
          )}
        </div>

        {/* ========================================================================= */}
        {/* STATE 2: SEARCH RESULT CARD (TicketView) [Figma Node 4152:23527]          */}
        {/* ========================================================================= */}
        <AnimatePresence mode="wait">
          {activeReport && (
            <motion.div
              key={activeReport.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <TicketView
                id={activeReport.id}
                status={activeReport.status}
                category={activeReport.category}
                location={activeReport.location}
                rejectionReason={activeReport.rejectionReason}
              />

              {/* Lacak Laporan Lain Button */}
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={handleResetSearch}
                  className="text-sm font-normal text-[var(--text-text-gray-text-brand-primary)] hover:underline cursor-pointer transition-colors"
                >
                  Lacak Laporan Lain
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* SECTION: LAPORAN PUBLIK TERKINI (List of Tickets)                         */}
        {/* Figma Frame: [4151:23526] Container (680x524)                             */}
        {/* ========================================================================= */}
        <div className="mt-4">
          <h2 className="text-base sm:text-xl font-semibold text-[var(--text-text-gray-text-primary)] mb-4 text-left">
            Laporan Publik Terkini
          </h2>

          <div className="space-y-3">
            {ticketsList.map((item) => (
              <TicketCard
                key={item.id}
                id={item.id}
                category={item.category}
                status={item.status}
                isSelected={activeReport?.id === item.id}
                onClick={() => handleSelectReport(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
