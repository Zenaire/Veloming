export type ReportStatus = 
  | 'MENUNGGU_VERIFIKASI'
  | 'DIPROSES'
  | 'SELESAI'
  | 'DITOLAK';

export type ReportCategory =
  | 'Infrastruktur Jalan & Jembatan'
  | 'Fasilitas Publik'
  | 'Kebersihan & Lingkungan'
  | 'Ketertiban & Keamanan'
  | 'Pelayanan Publik'
  | 'Lainnya';

export interface ReportTimelineItem {
  id: string;
  status: ReportStatus;
  title: string;
  description: string;
  timestamp: string;
  actor?: string;
}

export interface Report {
  id: string;
  trackingCode: string;
  title: string;
  category: ReportCategory;
  description: string;
  location: string;
  reporterName?: string;
  isAnonymous: boolean;
  createdAt: string;
  status: ReportStatus;
  attachments?: string[];
  timeline: ReportTimelineItem[];
}

