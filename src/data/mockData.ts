export type SizeOption = 'G' | 'GG' | 'G1' | 'G2' | 'G3';

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  badge: 'Novo' | 'Oferta' | 'Destaque' | 'Festa';
  rating: number;
  reviewsCount: number;
  sizes: SizeOption[];
  colors: ColorOption[];
  image: string;
  description: string;
  section?: 'novidades' | 'mais-vendidos' | 'colecao-festa';
}

export interface CartItem {
  product: Product;
  selectedSize: SizeOption;
  selectedColor: ColorOption;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

// 1. Configurações Gerais e Design System da Loja
export const STORE_CONFIG = {
  name: 'MIIXXIIE',
  subtitle: 'Variedades',
  niche: 'MODA PLUS SIZE FEMININA',
  slogan: 'Estilo, Conforto e Autoestima',
  footerTagline: 'Beleza em todas as formas!',
  city: 'Manaus - AM',
  whatsappNumber: '5592999999999',
  colors: {
    primary: '#C8105D',
    primaryLight: '#D81B60',
    burgundyDark: '#6B0833',
    burgundyMain: '#9E0B4B',
    backgroundSoft: '#FDF4F7',
    cardBorder: '#F3D6E2',
    whatsapp: '#25D366',
  },
};

// 2. Categorias Circulares da Vitrine (com fotos geradas)
export const CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Vestidos', slug: 'vestidos', image: '/images/categories/vestidos.jpg' },
  { id: 'cat-2', name: 'Conjuntos', slug: 'conjuntos', image: '/images/categories/conjuntos.jpg' },
  { id: 'cat-3', name: 'Blusas', slug: 'blusas', image: '/images/categories/blusas.jpg' },
  { id: 'cat-4', name: 'Calças', slug: 'calcas', image: '/images/categories/calcas.jpg' },
  { id: 'cat-5', name: 'Shorts', slug: 'shorts', image: '/images/categories/shorts.jpg' },
  { id: 'cat-6', name: 'Saias', slug: 'saias', image: '/images/categories/saias.jpg' },
  { id: 'cat-7', name: 'Macacões', slug: 'macacoes', image: '/images/categories/macacoes.jpg' },
  { id: 'cat-8', name: 'Plus Size', slug: 'plus-size', image: '/images/categories/plus-size.jpg' },
];

// 3. Catálogo Amplo de Produtos (18 Looks com Fotos Criadas pelo Gemini)
export const PRODUCTS: Product[] = [
  // SEÇÃO 1: NOVIDADES (6 Produtos)
  {
    id: 'prod-1',
    name: 'Vestido Midi Estampado Folhagens',
    slug: 'vestido-midi-estampado',
    category: 'vestidos',
    price: 79.90,
    badge: 'Novo',
    rating: 4.9,
    reviewsCount: 124,
    sizes: ['G', 'GG', 'G1', 'G2', 'G3'],
    colors: [
      { name: 'Preto', hex: '#1F1F1F' },
      { name: 'Azul', hex: '#3B5998' },
      { name: 'Verde', hex: '#2E7D32' },
      { name: 'Terracota', hex: '#C62828' },
    ],
    image: '/images/products/vestido-midi-estampado.jpg',
    description: 'Vestido midi em tecido leve e fluido com decote transpassado e estampa de folhagens exclusivas. Modelagem anatômica que valoriza as curvas femininas com máximo frescor para o clima de Manaus.',
    section: 'novidades',
  },
  {
    id: 'prod-2',
    name: 'Vestido Plus Size com Cinto Gold',
    slug: 'vestido-plus-size-com-cinto',
    category: 'vestidos',
    price: 69.90,
    originalPrice: 89.90,
    badge: 'Oferta',
    rating: 4.9,
    reviewsCount: 98,
    sizes: ['G', 'GG', 'G1', 'G2', 'G3'],
    colors: [
      { name: 'Pink Magenta', hex: '#C8105D' },
      { name: 'Preto', hex: '#1F1F1F' },
      { name: 'Vinho', hex: '#6B0833' },
    ],
    image: '/images/products/vestido-plus-size-cinto.jpg',
    description: 'Peça nobre em tom magenta vibrante acompanhada de cinto com fivela dourada circular. Tecido estruturado com elastano que não marca e garante caimento perfeito.',
    section: 'novidades',
  },
  {
    id: 'prod-3',
    name: 'Vestido Longo Floral Royal',
    slug: 'vestido-estampado-floral-azul',
    category: 'vestidos',
    price: 79.90,
    badge: 'Novo',
    rating: 4.8,
    reviewsCount: 86,
    sizes: ['G', 'GG', 'G1', 'G2', 'G3'],
    colors: [
      { name: 'Azul Royal', hex: '#1E56A0' },
      { name: 'Verde', hex: '#2E7D32' },
    ],
    image: '/images/products/vestido-estampado-azul.jpg',
    description: 'Vestido longo estampado floral em azul royal e branco com manga japonesa soltinha. Caimento esvoaçante que proporciona movimento e muita sofisticação.',
    section: 'novidades',
  },
  {
    id: 'prod-4',
    name: 'Conjunto Social Alfaiataria Preto',
    slug: 'conjunto-plus-size',
    category: 'conjuntos',
    price: 79.90,
    originalPrice: 99.90,
    badge: 'Oferta',
    rating: 5.0,
    reviewsCount: 142,
    sizes: ['G', 'GG', 'G1', 'G2', 'G3'],
    colors: [
      { name: 'Preto Nobre', hex: '#1F1F1F' },
      { name: 'Pink', hex: '#C8105D' },
    ],
    image: '/images/products/conjunto-plus-size-preto.jpg',
    description: 'Conjunto sofisticado de duas peças composto por blusa estruturada com botões frontais e calça reta de corte alfaiataria. Perfeito para trabalhar ou eventos especiais.',
    section: 'novidades',
  },
  {
    id: 'prod-5',
    name: 'Calça Pantalona Cintura Alta Caramelo',
    slug: 'calca-pantalona',
    category: 'calcas',
    price: 89.90,
    badge: 'Novo',
    rating: 4.9,
    reviewsCount: 64,
    sizes: ['G', 'GG', 'G1', 'G2', 'G3'],
    colors: [
      { name: 'Caramelo', hex: '#795548' },
      { name: 'Preto', hex: '#1F1F1F' },
      { name: 'Bege', hex: '#D7CCC8' },
    ],
    image: '/images/products/calca-pantalona.jpg',
    description: 'Calça pantalona fluida com pregas frontais e cós anatômico que alonga a silhueta. Tecido com toque aveludado e bolsos funcionais.',
    section: 'novidades',
  },
  {
    id: 'prod-6',
    name: 'Conjunto Short e Blusa Verde Oliva',
    slug: 'conjunto-short-e-blusa',
    category: 'conjuntos',
    price: 69.90,
    originalPrice: 89.90,
    badge: 'Oferta',
    rating: 4.8,
    reviewsCount: 77,
    sizes: ['G', 'GG', 'G1', 'G2', 'G3'],
    colors: [
      { name: 'Verde Militar', hex: '#556B2F' },
      { name: 'Preto', hex: '#1F1F1F' },
      { name: 'Terracota', hex: '#C62828' },
    ],
    image: '/images/products/conjunto-short-blusa.jpg',
    description: 'Conjunto leve em viscose premium com short de cintura média com elástico e faixa de amarração e camisa soltinha com gola polo.',
    section: 'novidades',
  },

  // SEÇÃO 2: MAIS VENDIDOS & DESTAQUES DE MANAUS (6 Produtos)
  {
    id: 'prod-7',
    name: 'Vestido Envelope Floral Terracota',
    slug: 'vestido-envelope-terracota',
    category: 'vestidos',
    price: 84.90,
    originalPrice: 99.90,
    badge: 'Destaque',
    rating: 4.9,
    reviewsCount: 168,
    sizes: ['G', 'GG', 'G1', 'G2', 'G3'],
    colors: [
      { name: 'Terracota', hex: '#C62828' },
      { name: 'Verde Floresta', hex: '#2E7D32' },
      { name: 'Preto', hex: '#1F1F1F' },
    ],
    image: '/images/products/vestido-envelope-terracota.jpg',
    description: 'O clássico wrap dress em estampa floral quente. Ajuste lateral com laço que modela a cintura sem apertar e mangas fluidas 3/4.',
    section: 'mais-vendidos',
  },
  {
    id: 'prod-8',
    name: 'Macacão Pantalona Verde Esmeralda',
    slug: 'macacao-pantalona-esmeralda',
    category: 'macacoes',
    price: 119.90,
    badge: 'Destaque',
    rating: 5.0,
    reviewsCount: 112,
    sizes: ['G', 'GG', 'G1', 'G2', 'G3'],
    colors: [
      { name: 'Verde Esmeralda', hex: '#00695C' },
      { name: 'Azul Marinho', hex: '#1A237E' },
      { name: 'Bordô', hex: '#6B0833' },
    ],
    image: '/images/products/macacao-pantalona-esmeralda.jpg',
    description: 'Macacão longo com corte pantalona impecável, decote V transpassado que valoriza o colo e cinto com fivela dourada. Sucesso absoluto nas lojas de Manaus.',
    section: 'mais-vendidos',
  },
  {
    id: 'prod-9',
    name: 'Conjunto Alfaiataria Rosé Blush',
    slug: 'conjunto-rose-alfaiataria',
    category: 'conjuntos',
    price: 139.90,
    badge: 'Destaque',
    rating: 4.9,
    reviewsCount: 89,
    sizes: ['G', 'GG', 'G1', 'G2', 'G3'],
    colors: [
      { name: 'Rosé Blush', hex: '#E8A598' },
      { name: 'Off-White', hex: '#F5F5F5' },
      { name: 'Preto', hex: '#1F1F1F' },
    ],
    image: '/images/products/conjunto-rose-alfaiataria.jpg',
    description: 'Conjunto moderno composto por blazer alongado com caimento solto e calça reta com pregas. Perfeito para mulheres decididas e empoderadas.',
    section: 'mais-vendidos',
  },
  {
    id: 'prod-10',
    name: 'Vestido Chemise Midi Pink Vibrante',
    slug: 'vestido-chemise-pink',
    category: 'vestidos',
    price: 89.90,
    badge: 'Destaque',
    rating: 4.8,
    reviewsCount: 94,
    sizes: ['G', 'GG', 'G1', 'G2', 'G3'],
    colors: [
      { name: 'Pink Fúcsia', hex: '#D81B60' },
      { name: 'Verde Militar', hex: '#556B2F' },
      { name: 'Azul Jeans', hex: '#3B5998' },
    ],
    image: '/images/products/vestido-chemise-pink.jpg',
    description: 'Chemise midi em tecido leve estilo camisaria com botões frontais, fenda discreta e faixa para amarração na cintura. Muito prático e versátil.',
    section: 'mais-vendidos',
  },
  {
    id: 'prod-11',
    name: 'Conjunto Casual Linho Cru Chic',
    slug: 'conjunto-linho-cru',
    category: 'conjuntos',
    price: 94.90,
    originalPrice: 119.90,
    badge: 'Oferta',
    rating: 4.9,
    reviewsCount: 78,
    sizes: ['G', 'GG', 'G1', 'G2', 'G3'],
    colors: [
      { name: 'Linho Cru', hex: '#D7CCC8' },
      { name: 'Verde Menta', hex: '#81C784' },
      { name: 'Terracota', hex: '#C62828' },
    ],
    image: '/images/products/conjunto-linho-cru.jpg',
    description: 'Conjunto fresco em linho misto com blusa soltinha decote V e calça pantacourt super confortável. A cara dos dias ensolarados de Manaus.',
    section: 'mais-vendidos',
  },
  {
    id: 'prod-12',
    name: 'Vestido Evasê Plus Size Magenta',
    slug: 'vestido-evase-plus-size-magenta',
    category: 'vestidos',
    price: 79.90,
    originalPrice: 99.90,
    badge: 'Oferta',
    rating: 4.8,
    reviewsCount: 65,
    sizes: ['G', 'GG', 'G1', 'G2', 'G3'],
    colors: [
      { name: 'Magenta Brand', hex: '#C8105D' },
      { name: 'Preto', hex: '#1F1F1F' },
    ],
    image: '/images/products/vestido-plus-size-cinto.jpg',
    description: 'Vestido com corte evasê que disfarça o quadril e realça a cintura com acabamento acetinado de alta qualidade.',
    section: 'mais-vendidos',
  },

  // SEÇÃO 3: COLEÇÃO FESTA & NOITE (6 Produtos)
  {
    id: 'prod-13',
    name: 'Vestido Longo Gala Vinho Marsala',
    slug: 'vestido-longo-festa-vinho',
    category: 'vestidos',
    price: 149.90,
    originalPrice: 189.90,
    badge: 'Festa',
    rating: 5.0,
    reviewsCount: 88,
    sizes: ['G', 'GG', 'G1', 'G2', 'G3'],
    colors: [
      { name: 'Vinho Marsala', hex: '#6B0833' },
      { name: 'Preto Gala', hex: '#1F1F1F' },
      { name: 'Azul Noite', hex: '#1A237E' },
    ],
    image: '/images/products/vestido-festa-vinho.jpg',
    description: 'Vestido longo de festa em tecido acetinado de brilho sofisticado, decote transpassado que valoriza o colo e cinto com detalhe em pedraria.',
    section: 'colecao-festa',
  },
  {
    id: 'prod-14',
    name: 'Vestido Gala Dourado Champagne',
    slug: 'vestido-festa-champagne',
    category: 'vestidos',
    price: 169.90,
    originalPrice: 219.90,
    badge: 'Festa',
    rating: 5.0,
    reviewsCount: 62,
    sizes: ['G', 'GG', 'G1', 'G2', 'G3'],
    colors: [
      { name: 'Champagne Dourado', hex: '#D4AF37' },
      { name: 'Prata Nobre', hex: '#C0C0C0' },
      { name: 'Rosé Gold', hex: '#E8A598' },
    ],
    image: '/images/products/vestido-festa-champagne.jpg',
    description: 'Vestido longo deslumbrante com bordados luxuosos e brilho sutil. Caimento fluido com forro duplo que garante conforto a noite toda.',
    section: 'colecao-festa',
  },
  {
    id: 'prod-15',
    name: 'Macacão Social Alfaiataria Noite',
    slug: 'macacao-social-noite',
    category: 'macacoes',
    price: 129.90,
    badge: 'Festa',
    rating: 4.9,
    reviewsCount: 54,
    sizes: ['G', 'GG', 'G1', 'G2', 'G3'],
    colors: [
      { name: 'Preto Total', hex: '#1F1F1F' },
      { name: 'Verde Esmeralda', hex: '#00695C' },
    ],
    image: '/images/products/macacao-pantalona-esmeralda.jpg',
    description: 'Macacão sofisticado para formaturas, casamentos ou jantares elegantes em Manaus, combinando conforto com atitude.',
    section: 'colecao-festa',
  },
  {
    id: 'prod-16',
    name: 'Vestido Midi Festa Terracota Chic',
    slug: 'vestido-midi-festa-terracota',
    category: 'vestidos',
    price: 89.90,
    originalPrice: 110.00,
    badge: 'Festa',
    rating: 4.8,
    reviewsCount: 47,
    sizes: ['G', 'GG', 'G1', 'G2', 'G3'],
    colors: [
      { name: 'Terracota', hex: '#C62828' },
      { name: 'Marsala', hex: '#6B0833' },
    ],
    image: '/images/products/vestido-envelope-terracota.jpg',
    description: 'Comprimento midi perfeito para coquetéis e celebrações diurnas ou noturnas com tecido de caimento nobre.',
    section: 'colecao-festa',
  },
  {
    id: 'prod-17',
    name: 'Conjunto Alfaiataria Premium Noite',
    slug: 'conjunto-alfaiataria-premium-noite',
    category: 'conjuntos',
    price: 149.90,
    badge: 'Festa',
    rating: 5.0,
    reviewsCount: 39,
    sizes: ['G', 'GG', 'G1', 'G2', 'G3'],
    colors: [
      { name: 'Rosé', hex: '#E8A598' },
      { name: 'Preto', hex: '#1F1F1F' },
    ],
    image: '/images/products/conjunto-rose-alfaiataria.jpg',
    description: 'Conjunto completo de alfaiataria fina com acabamento acetinado de alta costura para ocasiões memoráveis.',
    section: 'colecao-festa',
  },
  {
    id: 'prod-18',
    name: 'Vestido Longo Noite Folhagens Gold',
    slug: 'vestido-longo-folhagens-gold',
    category: 'vestidos',
    price: 89.90,
    badge: 'Festa',
    rating: 4.9,
    reviewsCount: 71,
    sizes: ['G', 'GG', 'G1', 'G2', 'G3'],
    colors: [
      { name: 'Preto & Branco', hex: '#1F1F1F' },
      { name: 'Azul & Ouro', hex: '#1E56A0' },
    ],
    image: '/images/products/vestido-midi-estampado.jpg',
    description: 'Vestido longo leve com recorte que valoriza o busto e caimento impecável para noites especiais em Manaus.',
    section: 'colecao-festa',
  },
];

// 4. Carrinho Pré-Populado de Demonstração
export const INITIAL_DEMO_CART: CartItem[] = [
  {
    product: PRODUCTS[0],
    selectedSize: 'GG',
    selectedColor: { name: 'Preto', hex: '#1F1F1F' },
    quantity: 1,
  },
  {
    product: { ...PRODUCTS[3], price: 89.90 },
    selectedSize: 'G1',
    selectedColor: { name: 'Pink', hex: '#C8105D' },
    quantity: 1,
  },
];

// 5. Dados do Painel Administrativo (/admin)
export const ADMIN_DASHBOARD_DATA = {
  kpis: [
    {
      id: 'kpi-pedidos',
      label: 'Pedidos Totais',
      value: '248',
      growth: '+12%',
      color: 'pink',
      sparkline: [30, 42, 38, 55, 48, 70, 85],
    },
    {
      id: 'kpi-visitantes',
      label: 'Visitantes no Mês',
      value: '1.850',
      growth: '+18%',
      color: 'purple',
      sparkline: [120, 150, 140, 190, 210, 250, 310],
    },
    {
      id: 'kpi-faturamento',
      label: 'Faturamento do Mês',
      value: 'R$ 12.850,00',
      growth: '+22%',
      color: 'green',
      sparkline: [800, 1100, 950, 1400, 1350, 1800, 2200],
    },
    {
      id: 'kpi-avaliacao',
      label: 'Avaliação dos Clientes',
      value: '4.9',
      stars: 5,
      color: 'amber',
    },
  ],
  salesChart30Days: [
    { date: '01/10', sales: 35, revenue: 420 },
    { date: '04/10', sales: 75, revenue: 790 },
    { date: '07/10', sales: 85, revenue: 880 },
    { date: '10/10', sales: 112, revenue: 1050 },
    { date: '13/10', sales: 82, revenue: 840 },
    { date: '16/10', sales: 55, revenue: 590 },
    { date: '19/10', sales: 128, revenue: 1150 },
    { date: '22/10', sales: 105, revenue: 980 },
    { date: '24/10', sales: 142, revenue: 1245, highlight: true },
    { date: '25/10', sales: 108, revenue: 990 },
    { date: '28/10', sales: 125, revenue: 1120 },
    { date: '31/10', sales: 165, revenue: 1490 },
  ],
  whatsappLiveQueue: [
    {
      id: 'wa-1',
      name: 'Juliana Silva',
      time: '11:45',
      message: 'Gostaria de saber se tem...',
      status: 'Atendimento',
      statusColor: 'bg-emerald-100 text-emerald-700',
      avatar: '/images/avatars/juliana.jpg',
    },
    {
      id: 'wa-2',
      name: 'Carla Souza',
      time: '11:40',
      message: 'Quero fazer um pedido...',
      status: 'Em Atendimento',
      statusColor: 'bg-blue-100 text-blue-700',
      avatar: '/images/avatars/carla.jpg',
    },
    {
      id: 'wa-3',
      name: 'Renata Alves',
      time: '11:35',
      message: 'Qual o tamanho da calça?',
      status: 'Aguardando',
      statusColor: 'bg-gray-100 text-gray-700',
      avatar: '/images/avatars/renata.jpg',
    },
    {
      id: 'wa-4',
      name: 'Beatriz Lima',
      time: '11:30',
      message: 'Pode separar esse vestido?',
      status: 'Atendido',
      statusColor: 'bg-green-100 text-green-700',
      avatar: '/images/avatars/beatriz.jpg',
    },
  ],
  recentOrders: [
    {
      id: '#1058',
      customer: 'Juliana Silva',
      itemsCount: 4,
      extraItemsBadge: '+1',
      total: 159.90,
      status: 'Pago',
      statusBadge: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: '#1057',
      customer: 'Carla Souza',
      itemsCount: 3,
      total: 129.90,
      status: 'Em Atendimento',
      statusBadge: 'bg-blue-100 text-blue-700',
    },
    {
      id: '#1056',
      customer: 'Renata Alves',
      itemsCount: 3,
      total: 199.90,
      status: 'Pendente',
      statusBadge: 'bg-amber-100 text-amber-700',
    },
    {
      id: '#1055',
      customer: 'Beatriz Lima',
      itemsCount: 2,
      extraItemsBadge: '+',
      total: 89.90,
      status: 'Pago',
      statusBadge: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: '#1054',
      customer: 'Fernanda Costa',
      itemsCount: 3,
      extraItemsBadge: '+1',
      total: 149.90,
      status: 'Enviado',
      statusBadge: 'bg-purple-100 text-purple-700',
    },
  ],
  bottomCounters: [
    { label: 'Produtos Cadastrados', count: '320', growth: '+5%', actionLabel: 'Gerenciar Produtos' },
    { label: 'Categorias', count: '12', growth: '+1%', actionLabel: 'Gerenciar Categorias' },
    { label: 'Clientes Cadastrados', count: '1.240', growth: '+14%', actionLabel: 'Ver Clientes' },
    { label: 'Cupons Ativos', count: '6', growth: '+0%', actionLabel: 'Gerenciar Cupons' },
  ],
  lastUpdate: '31/10/2026 às 11:45',
};

// 6. Utilitários de Formatação de Moeda e Geração do Checkout via WhatsApp
export function formatCurrencyBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function calculateCartSubtotal(items: CartItem[]): number {
  return items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
}

export function generateWhatsAppCheckoutUrl(
  items: CartItem[],
  customerName?: string
): { url: string; rawMessage: string; subtotal: number } {
  const subtotal = calculateCartSubtotal(items);

  const greeting = customerName
    ? `Olá, *${STORE_CONFIG.name} ${STORE_CONFIG.subtitle}*! 🌸\nMeu nome é *${customerName}* e gostaria de confirmar o meu pedido:`
    : `Olá, *${STORE_CONFIG.name} ${STORE_CONFIG.subtitle}*! 🌸\nGostaria de confirmar o meu pedido feito pelo site:`;

  const itemsList = items
    .map((item, index) => {
      const lineTotal = formatCurrencyBRL(item.product.price * item.quantity);
      return (
        `*${index + 1}. ${item.product.name}*\n` +
        `   • Tamanho: ${item.selectedSize} | Cor: ${item.selectedColor.name}\n` +
        `   • Qtd: ${item.quantity}x (${formatCurrencyBRL(item.product.price)}) = *${lineTotal}*`
      );
    })
    .join('\n\n');

  const footer =
    `\n\n------------------------------\n` +
    `💖 *Subtotal do Pedido:* ${formatCurrencyBRL(subtotal)}\n` +
    `📍 *Atendimento:* ${STORE_CONFIG.city}\n` +
    `------------------------------\n` +
    `Aguardo as informações para pagamento e entrega!`;

  const rawMessage = `${greeting}\n\n${itemsList}${footer}`;
  const encodedMessage = encodeURIComponent(rawMessage);
  const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodedMessage}`;

  return { url, rawMessage, subtotal };
}
