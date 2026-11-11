import { Report } from '../types';

/**
 * Service to manage reports (Mock service - ready to connect to API / Supabase / Backend)
 */
export const reportService = {
  async getRecentReports(): Promise<Report[]> {
    return [
      {
        id: '1',
        trackingCode: 'VLM-2026-042',
        title: 'Jalan berlubang cukup dalam di simpang jalan',
        category: 'Infrastruktur Jalan & Jembatan',
        description: 'Terdapat lubang besar berdiameter 50cm membahayakan pengendara motor.',
        location: 'Jl. Margonda Raya No. 12',
        isAnonymous: false,
        reporterName: 'Warga Depok',
        createdAt: new Date().toISOString(),
        status: 'DIPROSES',
        timeline: [
          {
            id: 't1',
            status: 'MENUNGGU_VERIFIKASI',
            title: 'Laporan Diterima',
            description: 'Laporan telah masuk ke sistem antrean verifikasi.',
            timestamp: '2026-11-09T08:00:00Z',
          },
          {
            id: 't2',
            status: 'DIPROSES',
            title: 'Diteruskan ke Dinas Terkait',
            description: 'Tim teknis dinas bina marga sedang melakukan inspeksi lapangan.',
            timestamp: '2026-11-10T02:00:00Z',
          },
        ],
      },
    ];
  },

  async createReport(data: Omit<Report, 'id' | 'createdAt' | 'status' | 'timeline'>): Promise<Report> {
    const newReport: Report = {
      ...data,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      status: 'MENUNGGU_VERIFIKASI',
      timeline: [
        {
          id: 't-init',
          status: 'MENUNGGU_VERIFIKASI',
          title: 'Laporan Diterima',
          description: 'Laporan telah berhasil didaftarkan.',
          timestamp: new Date().toISOString(),
        },
      ],
    };
    return newReport;
  },
};

