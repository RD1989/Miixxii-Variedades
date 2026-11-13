import { ColorOption, ManausNeighborhood } from '@/data/mockData';

export type KanbanStatus =
  | 'Novo Lead'
  | 'Em Atendimento'
  | 'Pagamento Confirmado'
  | 'Separando Estoque'
  | 'Saiu para Entrega'
  | 'Concluído'
  | 'Cancelado';

export interface AdminOrder {
  id: string;
  customer: string;
  customerPhone?: string;
  itemsCount: number;
  itemsList?: string;
  extraItemsBadge?: string;
  total: number;
  subtotal?: number;
  shippingFee?: number;
  deliveryMethod?: string;
  neighborhood?: string;
  deliveryAddress?: string;
  status: KanbanStatus;
  statusBadge: string;
  attendantId?: 'maria' | 'carlos';
  attendantName?: string;
  date?: string;
  time?: string;
  notes?: string;
}

export interface LeadClickEvent {
  id: string;
  timestamp: string;
  timeFormatted: string;
  attendantId: 'maria' | 'carlos';
  attendantName: string;
  phoneNumber: string;
  source: string;
  productId?: string;
  productName?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  timeFormatted: string;
  action: string;
  description: string;
  user: string;
}

export interface StoreCMSConfig {
  storeName: string;
  subtitle: string;
  niche: string;
  slogan: string;
  city: string;
  storeAddress: string;
  bannerHeadline: string;
  bannerSubheadline: string;
  shippingNotice: string;
  whatsappMaria: string;
  whatsappCarlos: string;
  topBarAnnouncement?: string;
  isTopBarActive?: boolean;
  pixKey?: string;
  pixKeyType?: 'CPF' | 'CNPJ' | 'Telefone' | 'E-mail' | 'Aleatória';
  pixReceiverName?: string;
  showroomHours?: string;
  freeShippingThreshold?: number;
  whatsappGreetingTemplate?: string;
}

export interface AdminAuthUser {
  email: string;
  name: string;
  role: string;
  avatar: string;
  lastLogin: string;
}

export interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  categoryTarget: string; // 'todos' | 'Vestidos' | 'Conjuntos' | 'Bermudas' | string
  ctaText: string;
  imageUrl: string;
  isActive: boolean;
  order: number;
}

