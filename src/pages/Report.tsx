import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Tag, MapPin, FileText, Plus, ChevronDown, X, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ticketService } from '../services/ticketService';

export const Report: React.FC = () => {
  // Default initial state: all input fields are completely blank with placeholders
  const [formData, setFormData] = useState({
    nama: '',
    kategori: '',
    lokasi: '',
    deskripsi: '',
  });

  const [selectedFile, setSelectedFile] = useState<{ name: string; size: number } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedId, setGeneratedId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Exact categories from Figma node 4124:14917 (Report>Kategori-masalah>Dropdown)
  const categories = [
    'Infrastruktur jalan',
    'Penerangan jalan',
    'Kebersihan & sampah',
    'Drainase & saluran air',
    'Fasilitas umum',
    'Lainnya',
  ];

  // Close custom dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Handle escape key to close dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDropdownOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectCategory = (category: string) => {
    setFormData((prev) => ({ ...prev, kategori: category }));
    setIsDropdownOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile({
        name: file.name,
        size: file.size,
      });
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.kategori) {
      setIsDropdownOpen(true);
      return;
    }
    setIsSubmitting(true);

    setTimeout(() => {
      // Create new ticket: checks existing IDs, increments ID, and sets status = 'Diterima'
      const newTicket = ticketService.createTicket({
        nama: formData.nama,
        category: formData.kategori,
        location: formData.lokasi,
        description: formData.deskripsi,
        photoName: selectedFile?.name,
      });

      setGeneratedId(newTicket.id);
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 400);
  };

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(generatedId);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setFormData({ nama: '', kategori: '', lokasi: '', deskripsi: '' });
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-160px)] bg-[var(--background-bg-primary)] py-12 sm:py-16 md:py-20 px-4 sm:px-6 flex justify-center">
      <div className="w-full max-w-[680px] mx-auto flex flex-col">
        {/* ========================================================================= */}
        {/* PAGE HEADER (Buat Laporan)                                               */}
        {/* Figma Frame: [I4104:13838;4103:13508]                                     */}
        {/* ========================================================================= */}
        <div className="mb-8 sm:mb-10 text-left">
          <h1 className="text-3xl sm:text-4xl font-semibold text-[var(--text-text-gray-text-primary)] tracking-tight">
            Buat Laporan
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[var(--text-text-gray-text-tertiary)] font-normal">
            Isi formulir di bawah ini dengan detail masalah yang Anda temukan.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* FORM CARD                                                                 */}
        {/* Figma Frame: [I4104:13838;4103:13514] Form (680x884, r:16, border:#e9eaeb)*/}
        {/* ========================================================================= */}
        <div className="bg-white rounded-2xl border border-[var(--border-border-secondary)] p-6 sm:p-10 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Nama Lengkap */}
            <div>
              <label
                htmlFor="nama"
                className="flex items-center gap-1 text-sm sm:text-base font-medium text-[var(--text-text-gray-text-primary)] mb-2"
              >
                <span>Nama lengkap</span>
                <span className="text-[var(--text-text-gray-text-error)]">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-[#535862] pointer-events-none">
                  <User className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  required
                  value={formData.nama}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama lengkap Anda"
                  className="w-full h-11 pl-11 pr-4 text-sm sm:text-base bg-white border border-[var(--border-border-secondary)] rounded-lg text-[var(--text-text-gray-text-primary)] placeholder-[#A3A7AE] focus:outline-none focus:border-[var(--background-bg-brand-solid)] focus:ring-1 focus:ring-[var(--background-bg-brand-solid)] transition-colors"
                />
              </div>
            </div>

            {/* 2. Kategori Masalah (MODERN CUSTOM DROPDOWN - Figma Node 4124:14917) */}
            <div ref={dropdownRef} className="relative">
              <label
                htmlFor="kategori-trigger"
                className="flex items-center gap-1 text-sm sm:text-base font-medium text-[var(--text-text-gray-text-primary)] mb-2"
              >
                <span>Kategori masalah</span>
                <span className="text-[var(--text-text-gray-text-error)]">*</span>
              </label>

              {/* Hidden input for form submission & validation */}
              <input
                type="hidden"
                id="kategori"
                name="kategori"
                value={formData.kategori}
                required
              />

              {/* Trigger Input Field Box */}
              <button
                type="button"
                id="kategori-trigger"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
                className={`relative w-full h-11 pl-11 pr-10 text-left text-sm sm:text-base bg-white border rounded-lg transition-all flex items-center justify-between cursor-pointer select-none ${
                  isDropdownOpen
                    ? 'border-[var(--background-bg-brand-solid)] ring-1 ring-[var(--background-bg-brand-solid)]'
                    : 'border-[var(--border-border-secondary)] hover:border-gray-300'
                }`}
              >
                <span className="absolute left-3.5 text-[#535862] pointer-events-none flex items-center">
                  <Tag className="w-5 h-5" />
                </span>

                <span
                  className={`truncate ${
                    formData.kategori
                      ? 'text-[var(--text-text-gray-text-primary)]'
                      : 'text-[#A3A7AE]'
                  }`}
                >
                  {formData.kategori || 'Pilih kategori masalah'}
                </span>

                <span
                  className={`absolute right-3.5 text-[#717680] pointer-events-none transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                >
                  <ChevronDown className="w-5 h-5" />
                </span>
              </button>

              {/* Modern Dropdown Floating Menu (Figma Frame: 598x264, r:8, shadow-lg) */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.99 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute left-0 right-0 top-[calc(100%+6px)] z-40 bg-white rounded-lg border border-[var(--border-border-secondary)] shadow-[0px_6px_12px_-2px_rgba(0,0,0,0.2)] overflow-hidden py-1"
                    role="listbox"
                  >
                    {categories.map((category) => {
                      const isSelected = formData.kategori === category;
                      return (
                        <button
                          key={category}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleSelectCategory(category)}
                          className={`w-full h-11 px-4 text-left text-sm sm:text-base transition-colors flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-[var(--background-bg-secondary)] font-medium text-[var(--text-text-gray-text-primary)]'
                              : 'text-[var(--text-text-gray-text-primary)] hover:bg-[var(--background-bg-secondary)]'
                          }`}
                        >
                          <span className="truncate">{category}</span>
                          {isSelected && (
                            <Check className="w-4 h-4 text-[var(--background-bg-brand-solid)] stroke-[2.2] shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Lokasi Kejadian */}
            <div>
              <label
                htmlFor="lokasi"
                className="flex items-center gap-1 text-sm sm:text-base font-medium text-[var(--text-text-gray-text-primary)] mb-2"
              >
                <span>Lokasi kejadian</span>
                <span className="text-[var(--text-text-gray-text-error)]">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-[#535862] pointer-events-none">
                  <MapPin className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  id="lokasi"
                  name="lokasi"
                  required
                  value={formData.lokasi}
                  onChange={handleInputChange}
                  placeholder="Contoh: Jl. Margonda Raya"
                  className="w-full h-11 pl-11 pr-4 text-sm sm:text-base bg-white border border-[var(--border-border-secondary)] rounded-lg text-[var(--text-text-gray-text-primary)] placeholder-[#A3A7AE] focus:outline-none focus:border-[var(--background-bg-brand-solid)] focus:ring-1 focus:ring-[var(--background-bg-brand-solid)] transition-colors"
                />
              </div>
            </div>

            {/* 4. Deskripsi Laporan */}
            <div>
              <label
                htmlFor="deskripsi"
                className="flex items-center gap-1 text-sm sm:text-base font-medium text-[var(--text-text-gray-text-primary)] mb-2"
              >
                <span>Deskripsi laporan</span>
                <span className="text-[var(--text-text-gray-text-error)]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-[#535862] pointer-events-none">
                  <FileText className="w-5 h-5" />
                </span>
                <textarea
                  id="deskripsi"
                  name="deskripsi"
                  rows={4}
                  required
                  value={formData.deskripsi}
                  onChange={handleInputChange}
                  placeholder="Jelaskan masalah yang Anda temukan secara detail."
                  className="w-full pl-11 pr-4 py-3 text-sm sm:text-base bg-white border border-[var(--border-border-secondary)] rounded-lg text-[var(--text-text-gray-text-primary)] placeholder-[#A3A7AE] focus:outline-none focus:border-[var(--background-bg-brand-solid)] focus:ring-1 focus:ring-[var(--background-bg-brand-solid)] resize-none transition-colors"
                ></textarea>
              </div>
            </div>

            {/* 5. Foto (opsional) */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-[var(--text-text-gray-text-primary)] mb-2">
                Foto (opsional)
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="group border border-dashed border-[var(--border-border-secondary)] hover:border-[#64A2E0] bg-white rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  id="foto"
                  name="foto"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {selectedFile ? (
                  <div className="relative flex flex-col items-center">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Pratinjau Foto"
                        className="w-32 h-32 object-cover rounded-xl border border-[var(--border-border-secondary)] mb-2 shadow-sm"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[var(--background-bg-brand-secondary)] text-[var(--background-bg-brand-solid)] flex items-center justify-center mb-3">
                        <FileText className="w-6 h-6" />
                      </div>
                    )}
                    <p className="text-sm font-medium text-[var(--text-text-gray-text-primary)] max-w-xs truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-[var(--text-text-gray-text-tertiary)] mt-0.5">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="mt-2.5 inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-full transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Hapus foto</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-[var(--background-bg-brand-secondary)] text-[var(--background-bg-brand-solid)] flex items-center justify-center mb-3 transition-transform group-hover:scale-105">
                      <Plus className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <p className="text-sm sm:text-base font-medium text-[var(--text-text-gray-text-primary)]">
                      Klik untuk unggah foto
                    </p>
                    <p className="text-xs sm:text-sm text-[var(--text-text-gray-text-tertiary)] mt-1">
                      PNG, JPG hingga 5MB
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Submit Button & Disclaimer */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-sm sm:text-base font-semibold text-white bg-[var(--background-bg-brand-solid)] hover:bg-[var(--background-bg-brand-solid-hover)] active:scale-[0.99] rounded-full shadow-sm hover:shadow transition-all duration-150 flex items-center justify-center disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim laporan'}
              </button>

              <p className="text-center text-xs text-[var(--text-text-gray-text-tertiary)] leading-relaxed">
                Dengan mengirim laporan, Anda menyetujui data akan diverifikasi oleh instansi terkait.
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUBMISSION SUCCESS MODAL (Report After Click "Kirim Laporan")             */}
      {/* Figma Frame: node 4287:5949 / Report_Sent (448x458 Desktop, 346x426 Mobile)*/}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={handleCloseModal}
          >
            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ type: 'spring' as const, stiffness: 380, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[346px] sm:max-w-[448px] bg-white rounded-2xl p-8 shadow-[0px_6px_24px_-2px_rgba(0,0,0,0.2)] border border-[var(--border-border-secondary)] flex flex-col items-center text-center"
            >
              {/* Checkmark Icon Badge: IconX [48x48 Desktop, 40x40 Tablet, 32x32 Mobile] */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-[var(--background-bg-brand-secondary)] flex items-center justify-center text-[var(--background-bg-brand-solid)]">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              {/* Modal Heading */}
              <h2 className="mt-4 sm:mt-6 text-base sm:text-xl font-semibold text-[var(--text-text-gray-text-primary)] leading-6 sm:leading-7 tracking-tight">
                Laporan Berhasil Dikirim!
              </h2>

              {/* Subtitle */}
              <p className="mt-2 text-sm text-[var(--text-text-gray-text-tertiary)] leading-5 max-w-[384px]">
                Simpan ID Laporan di bawah ini untuk memantau progres secara real-time.
              </p>

              {/* ID Laporan Box (p-4, r:8, bg: #FAFAFA, border: #E9EAEB) */}
              <div className="w-full mt-6 p-4 rounded-lg bg-[var(--background-bg-secondary)] border border-[var(--border-border-secondary)] flex items-center justify-between gap-3 text-left">
                <div>
                  <span className="text-xs text-[var(--text-text-gray-text-tertiary)] block font-normal leading-4">
                    ID Laporan
                  </span>
                  <span className="text-lg sm:text-2xl font-semibold text-[var(--text-text-gray-text-brand-primary)] leading-7 sm:leading-8 mt-0.5 block font-sans tracking-tight">
                    {generatedId}
                  </span>
                </div>

                {/* Salin Button */}
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[var(--border-border-secondary)] rounded-md text-sm text-[var(--text-text-gray-text-tertiary)] hover:bg-gray-50 active:scale-95 transition-all shadow-xs cursor-pointer select-none"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600 stroke-[2.2]" />
                      <span className="text-emerald-700 font-medium">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 stroke-[2]" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action Buttons (mt-6, space-y-3) */}
              <div className="w-full mt-6 space-y-3">
                {/* Primary Button: Lacak laporan sekarang */}
                <Link
                  to={`/track?id=${generatedId}`}
                  className="w-full h-10 sm:h-12 rounded-full bg-[var(--background-bg-brand-solid)] hover:bg-[var(--background-bg-brand-solid-hover)] text-white text-sm sm:text-base font-semibold flex items-center justify-center transition-all active:scale-[0.99] shadow-sm cursor-pointer"
                >
                  Lacak laporan sekarang
                </Link>

                {/* Secondary Button: Tutup */}
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="w-full h-10 sm:h-12 rounded-full bg-transparent hover:bg-[var(--background-bg-secondary)] text-[var(--text-text-gray-text-tertiary)] hover:text-[var(--text-text-gray-text-primary)] text-sm sm:text-base font-semibold flex items-center justify-center transition-all active:scale-[0.99] cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
