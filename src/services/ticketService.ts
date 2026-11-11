import { TicketStatus } from '../components/common/TicketView';

export interface Ticket {
  id: string;
  nama: string;
  category: string;
  location: string;
  description: string;
  photoName?: string;
  status: TicketStatus;
  createdAt: string;
  rejectionReason?: string;
}

const STORAGE_KEY = 'veloming_tickets_v2';

// Helper to extract full numerical value from ID for precise sorting (e.g. VLM-2026-047 -> 2026047)
export const extractTicketIdNumber = (id: string): number => {
  const numbers = id.match(/(\d+)/g);
  if (!numbers) return 0;
  return parseInt(numbers.join(''), 10) || 0;
};

// Seed initial reports sorted descending by ID (largest ID first)
const INITIAL_TICKETS: Ticket[] = [
  {
    id: 'VLM-2026-046',
    nama: 'Anonim',
    category: 'Lainnya',
    location: 'Jl. Margonda Raya',
    description: 'Penjualan produk non fasilitas publik.',
    status: 'Ditolak',
    rejectionReason: 'Laporan tidak valid (spam). Mohon kirim laporan yang relevan dengan fasilitas publik.',
    createdAt: '2026-11-08T11:20:00Z',
  },
  {
    id: 'VLM-2026-045',
    nama: 'Ahmad Fauzi',
    category: 'Drainase & saluran air',
    location: 'Jl. Margonda Raya',
    description: 'Saluran air tersumbat endapan lumpur menyebabkan genangan air saat hujan.',
    status: 'Diproses',
    createdAt: '2026-11-10T16:45:00Z',
  },
  {
    id: 'VLM-2026-044',
    nama: 'Siti Rahma',
    category: 'Kebersihan & sampah',
    location: 'Jl. Margonda Raya',
    description: 'Tumpukan sampah liar di trotoar belum diangkut lebih dari 3 hari.',
    status: 'Diterima',
    createdAt: '2026-11-11T02:10:00Z',
  },
  {
    id: 'VLM-2026-043',
    nama: 'Budi Santoso',
    category: 'Penerangan jalan',
    location: 'Jl. Margonda Raya',
    description: 'Lampu PJU mati sepanjang 200 meter sehingga jalan gelap pada malam hari.',
    status: 'Selesai',
    createdAt: '2026-11-09T14:15:00Z',
  },
  {
    id: 'VLM-2026-042',
    nama: 'Jiguru Kurata',
    category: 'Infrastruktur jalan',
    location: 'Jl. Margonda Raya',
    description: 'Terdapat lubang cukup besar di tengah jalan yang membahayakan pengendara motor.',
    photoName: 'Jalan berlubang.jpg',
    status: 'Diproses',
    createdAt: '2026-11-10T08:30:00Z',
  },
];

class TicketService {
  private getStorage(): Ticket[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed: Ticket[] = JSON.parse(data);
        return parsed.sort((a, b) => extractTicketIdNumber(b.id) - extractTicketIdNumber(a.id));
      }
    } catch {
      // ignore
    }
    this.saveStorage(INITIAL_TICKETS);
    return INITIAL_TICKETS;
  }

  private saveStorage(tickets: Ticket[]): void {
    try {
      const sorted = [...tickets].sort((a, b) => extractTicketIdNumber(b.id) - extractTicketIdNumber(a.id));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted));
    } catch {
      // ignore
    }
  }

  /**
   * Generates next ticket ID incrementally by checking all existing ticket numbers
   */
  public generateNextId(): string {
    const tickets = this.getStorage();
    let maxNumber = 46;

    tickets.forEach((t) => {
      const match = t.id.match(/VLM-2026-(\d+)/i);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNumber) {
          maxNumber = num;
        }
      }
    });

    const nextNum = maxNumber + 1;
    return `VLM-2026-${String(nextNum).padStart(3, '0')}`;
  }

  /**
   * Retrieves all tickets, strictly sorted with largest ID (newest) at the top
   */
  public getAllTickets(): Ticket[] {
    const tickets = this.getStorage();
    return tickets.sort((a, b) => extractTicketIdNumber(b.id) - extractTicketIdNumber(a.id));
  }

  /**
   * Finds ticket by ID (case-insensitive)
   */
  public getTicketById(id: string): Ticket | undefined {
    const trimmed = id.trim().toUpperCase();
    return this.getStorage().find((t) => t.id.toUpperCase() === trimmed);
  }

  /**
   * Creates a new ticket.
   * Lifecycle constraint: Every newly submitted ticket ALWAYS starts with status = 'Diterima'
   */
  public createTicket(input: {
    nama: string;
    category: string;
    location: string;
    description: string;
    photoName?: string;
  }): Ticket {
    const newId = this.generateNextId();
    const newTicket: Ticket = {
      id: newId,
      nama: input.nama || 'Warga',
      category: input.category || 'Infrastruktur jalan',
      location: input.location || 'Jl. Margonda Raya',
      description: input.description || '',
      photoName: input.photoName,
      status: 'Diterima', // Status awal wajib 'Diterima'
      createdAt: new Date().toISOString(),
    };

    const tickets = this.getStorage();
    // Insert and sort so the largest ID is placed at index 0 (top)
    const updated = [newTicket, ...tickets].sort((a, b) => extractTicketIdNumber(b.id) - extractTicketIdNumber(a.id));
    this.saveStorage(updated);

    return newTicket;
  }

  /**
   * Updates ticket status
   */
  public updateTicketStatus(
    id: string,
    newStatus: TicketStatus,
    rejectionReason?: string
  ): Ticket | null {
    const tickets = this.getStorage();
    const index = tickets.findIndex((t) => t.id.toUpperCase() === id.trim().toUpperCase());

    if (index === -1) return null;

    const current = tickets[index];
    const updatedTicket: Ticket = {
      ...current,
      status: newStatus,
      rejectionReason:
        newStatus === 'Ditolak'
          ? rejectionReason || 'Laporan tidak valid (spam). Mohon kirim laporan yang relevan dengan fasilitas publik.'
          : undefined,
    };

    tickets[index] = updatedTicket;
    this.saveStorage(tickets);

    return updatedTicket;
  }

  /**
   * Resets storage to initial demo state
   */
  public resetToDefault(): Ticket[] {
    this.saveStorage(INITIAL_TICKETS);
    return INITIAL_TICKETS;
  }
}

export const ticketService = new TicketService();
