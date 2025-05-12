// TypeScript interfaces voor de Ticket App modellen

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface Venue {
  id: string;
  name: string;
  capacity: number;
  vipCapacity: number;
  wheelchairCapacity: number;
}

export interface Event {
  id: string;
  venueId: string;
  title: string;
  date: string;
  ticketLimits: {
    standard: number;
    vip: number;
    wheelchair: number;
  };
  ticketPrices: {
    standard: number;
    vip: number;
    wheelchair: number;
  };
}

export type TicketType = 'standard' | 'vip' | 'wheelchair';

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  type: TicketType;
  status: 'active' | 'cancelled';
  qrCode: string;
  orderId: string;
}

export interface Order {
  id: string;
  userId: string;
  status: 'pending' | 'paid' | 'cancelled';
  total: number;
  createdAt: string;
}

export interface Reservation {
  id: string;
  eventId: string;
  userId: string;
  ticketType: TicketType;
  expiresAt: string;
} 