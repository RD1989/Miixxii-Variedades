import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  CartItem,
  Product,
  ColorOption,
  Category,
  CATEGORIES,
  INITIAL_DEMO_CART,
  PRODUCTS,
  DeliverySelection,
  ManausNeighborhood,
  MANAUS_NEIGHBORHOODS_LIST,
  WhatsAppAttendant,
  WHATSAPP_ATTENDANTS,
  STORE_CONFIG,
} from '@/data/mockData';
import {
  KanbanStatus,
  AdminOrder,
  LeadClickEvent,
  ActivityLog,
  StoreCMSConfig,
  AdminAuthUser,
  CarouselSlide,
} from '@/types/admin';
import { getSupabaseClient } from '@/lib/supabase';

// Purge any stale client localStorage caches containing legacy typos or outdated shipping policies
if (typeof window !== 'undefined') {
  try {
    ['miixxiie_store_v7_live', 'miixxiie_store_real_v4_pro', 'miixxiie_store_real_v3', 'miixxe-store-storage'].forEach((key) => {
      const val = localStorage.getItem(key);
      if (val && (val.includes('Malaquinhas') || val.includes('Macaquihas') || val.includes('Entregas em toda Manaus via Motoboy ou Retirada') || val.includes('grátis a partir'))) {
        localStorage.removeItem(key);
      }
    });
  } catch (e) {
    // silent catch for privacy mode / restricted environments
  }
}

export {
  type KanbanStatus,
  type AdminOrder,
  type LeadClickEvent,
  type ActivityLog,
  type StoreCMSConfig,
  type AdminAuthUser,
  type CarouselSlide,
};
export { type Product, type ColorOption, type Category } from '@/data/mockData';

export const KANBAN_BADGE_MAP: Record<KanbanStatus, string> = {
  'Novo Lead': 'bg-amber-50 text-amber-800 border-amber-200',
  'Em Atendimento': 'bg-blue-50 text-blue-800 border-blue-200',
  'Pagamento Confirmado': 'bg-emerald-50 text-emerald-800 border-emerald-200',
  'Separando Estoque': 'bg-purple-50 text-purple-800 border-purple-200',
  'Saiu para Entrega': 'bg-indigo-50 text-indigo-800 border-indigo-200',
  'Concluído': 'bg-green-50 text-green-800 border-green-200',
  'Cancelado': 'bg-neutral-100 text-neutral-600 border-neutral-300',
};

const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: '#1059',
    customer: 'Amanda Cavalcante',
    customerPhone: '(92) 99124-5582',
    itemsCount: 3,
    itemsList: 'Vestido Bárbara Preto (G1), Macacão Pantalona (GG)',
    total: 289.0,
    subtotal: 269.0,
    shippingFee: 20.0,
    deliveryMethod: 'Motoboy (Adrianópolis)',
    neighborhood: 'Adrianópolis / Vieiralves',
    deliveryAddress: 'Rua Salvador, Condomínio Privilege',
    status: 'Novo Lead',
    statusBadge: KANBAN_BADGE_MAP['Novo Lead'],
    attendantId: 'maria',
    attendantName: 'Maria',
    date: 'Hoje',
    time: '18:45',
    notes: 'Cliente pediu confirmação do comprimento do vestido.',
  },
  {
    id: '#1058',
    customer: 'Juliana Silva',
    customerPhone: '(92) 98455-1290',
    itemsCount: 2,
    itemsList: 'Conjunto Alfaiataria Marsala (G2)',
    total: 218.0,
    subtotal: 203.0,
    shippingFee: 15.0,
    deliveryMethod: 'Motoboy (Flores)',
    neighborhood: 'Flores / Parque 10',
    deliveryAddress: 'Conjunto Beija-Flor II, Rua 4',
    status: 'Separando Estoque',
    statusBadge: KANBAN_BADGE_MAP['Separando Estoque'],
    attendantId: 'maria',
    attendantName: 'Maria',
    date: 'Hoje',
    time: '16:20',
    notes: 'PIX conferido. Peça já reservada no mostruário.',
  },
  {
    id: '#1057',
    customer: 'Carla Souza',
    customerPhone: '(92) 98133-7721',
    itemsCount: 2,
    itemsList: 'Vestido Chemise Off White (GG), Shorts Alfaiataria (G)',
    total: 198.0,
    subtotal: 198.0,
    shippingFee: 0,
    deliveryMethod: 'Retirada na Loja',
    neighborhood: 'Retirada Presencial',
    status: 'Pagamento Confirmado',
    statusBadge: KANBAN_BADGE_MAP['Pagamento Confirmado'],
    attendantId: 'carlos',
    attendantName: 'Carlos',
    date: 'Hoje',
    time: '15:10',
    notes: 'Cliente vai retirar pessoalmente amanhã às 14h.',
  },
  {
    id: '#1056',
    customer: 'Renata Alves',
    customerPhone: '(92) 99401-8843',
    itemsCount: 3,
    itemsList: 'Camisa Seda Gola Padre (G3), Calça Pantalona (G2)',
    total: 236.0,
    subtotal: 211.0,
    shippingFee: 25.0,
    deliveryMethod: 'Motoboy (Ponta Negra)',
    neighborhood: 'Ponta Negra / Tarumã',
    deliveryAddress: 'Av. Coronel Teixeira, Alphaville',
    status: 'Saiu para Entrega',
    statusBadge: KANBAN_BADGE_MAP['Saiu para Entrega'],
    attendantId: 'carlos',
    attendantName: 'Carlos',
    date: 'Hoje',
    time: '14:05',
    notes: 'Motoboy Marcos em rota com a encomenda.',
  },
  {
    id: '#1055',
    customer: 'Beatriz Lima',
    customerPhone: '(92) 98210-9934',
    itemsCount: 1,
    itemsList: 'Vestido Festa Longo Prata (G1)',
    total: 128.0,
    subtotal: 128.0,
    shippingFee: 0,
    deliveryMethod: 'Retirada na Loja',
    neighborhood: 'Retirada Presencial',
    status: 'Concluído',
    statusBadge: KANBAN_BADGE_MAP['Concluído'],
    attendantId: 'maria',
    attendantName: 'Maria',
    date: 'Ontem',
    time: '17:30',
    notes: 'Entrega finalizada com elogio à modelagem.',
  },
];

const INITIAL_LOGS: ActivityLog[] = [
  {
    id: 'log-1',
    timestamp: new Date().toISOString(),
    timeFormatted: 'Hoje às 18:45',
    action: 'Novo Lead',
    description: 'Novo pedido #1059 recebido via WhatsApp (Amanda Cavalcante) — Adrianópolis',
    user: 'Sistema Web',
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    timeFormatted: 'Hoje às 17:45',
    action: 'Movimentação Kanban',
    description: 'Pedido #1058 avançou para "Separando Estoque"',
    user: 'Maria (Consultora)',
  },
  {
    id: 'log-3',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    timeFormatted: 'Hoje às 16:45',
    action: 'Estoque Atualizado',
    description: 'Estoque da Camisa Seda ajustado para +5 unidades',
    user: 'Admin',
  },
  {
    id: 'log-4',
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    timeFormatted: 'Hoje às 14:45',
    action: 'Despacho Motoboy',
    description: 'Pedido #1056 saiu para entrega com motoboy em Ponta Negra',
    user: 'Carlos (Logística)',
  },
];

const INITIAL_CLICKS: LeadClickEvent[] = [
  {
    id: 'click-1',
    timestamp: new Date().toISOString(),
    timeFormatted: '18:45',
    attendantId: 'maria',
    attendantName: 'Maria',
    phoneNumber: '5592986137969',
    source: 'Modal de Detalhes do Produto',
    productName: 'Vestido Bárbara Preto Plus Size',
  },
  {
    id: 'click-2',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    timeFormatted: '18:15',
    attendantId: 'carlos',
    attendantName: 'Carlos',
    phoneNumber: '5592986064005',
    source: 'Botão Navbar',
    productName: 'Atendimento Geral Manaus',
  },
  {
    id: 'click-3',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    timeFormatted: '17:45',
    attendantId: 'maria',
    attendantName: 'Maria',
    phoneNumber: '5592986137969',
    source: 'Checkout do Carrinho',
    productName: 'Conjunto Alfaiataria Marsala',
  },
  {
    id: 'click-4',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    timeFormatted: '16:45',
    attendantId: 'carlos',
    attendantName: 'Carlos',
    phoneNumber: '5592986064005',
    source: 'Banner Promocional Intermediário',
    productName: 'Coleção Festa Manaus',
  },
];

const INITIAL_CMS: StoreCMSConfig = {
  storeName: 'MIIXXIIE',
  subtitle: 'Variedades',
  niche: 'MODA PLUS SIZE FEMININA',
  slogan: 'Estilo, Conforto e Autoestima',
  city: 'Manaus - AM',
  storeAddress: 'Manaus - AM (Atendimento e Retirada Presencial com Agendamento)',
  bannerHeadline: 'Elegância Sem Medidas ♡',
  bannerSubheadline: 'Coleções exclusivas do G ao G3 pensadas sob medida para realçar sua melhor versão com conforto absoluto em Manaus.',
  shippingNotice: 'Entregas em Manaus via Motoboy (Frete a Combinar no WhatsApp) • Grátis Apenas Retirando na Loja',
  whatsappMaria: '(92) 98613-7969',
  whatsappCarlos: '(92) 98606-4005',
  topBarAnnouncement: 'Entregas em Manaus: Frete via Motoboy a Combinar no WhatsApp • Grátis Apenas Retirando na Loja',
  isTopBarActive: true,
  pixKey: '(92) 98613-7969',
  pixKeyType: 'Telefone',
  pixReceiverName: 'MIIXXIIE VARIEDADES',
  showroomHours: 'Segunda a Sábado, das 09h às 18h (Agendamento no WhatsApp)',
  whatsappGreetingTemplate: 'Olá! Vim pelo catálogo da MIIXXIIE em Manaus e gostaria de atendimento sobre peças Plus Size.',
};

const INITIAL_CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 'slide-marca',
    title: 'MIIXXIIE Variedades',
    subtitle: 'Moda Plus Size Feminina com elegância sem medidas do G ao G3. Exclusividade e sofisticação em Manaus.',
    badge: 'Identidade Oficial',
    categoryTarget: 'todos',
    ctaText: 'Explorar Coleção 2026',
    imageUrl: '/images/banners/banner-slide-1-marca.jpg',
    isActive: true,
    order: 1,
  },
  {
    id: 'slide-bermudas-shorts',
    title: 'Bermudas e Shorts',
    subtitle: 'Modelagens anatômicas e tecidos leves como linho e bengaline pensados para o dia a dia em Manaus.',
    badge: 'Categoria Oficial',
    categoryTarget: 'bermudas-e-shorts',
    ctaText: 'Ver Bermudas e Shorts',
    imageUrl: '/images/banners/cat-banner-bermudas-shorts.jpg',
    isActive: true,
    order: 2,
  },
  {
    id: 'slide-calcas',
    title: 'Calças Plus Size',
    subtitle: 'Pantalonas fluidas, alfaiataria premium e modelos skinny com elastano de caimento impecável.',
    badge: 'Categoria Oficial',
    categoryTarget: 'calcas',
    ctaText: 'Ver Calças',
    imageUrl: '/images/banners/cat-banner-calcas.jpg',
    isActive: true,
    order: 3,
  },
  {
    id: 'slide-camisas-regatas',
    title: 'Camisas e Camisas Regatas',
    subtitle: 'Camisas clássicas de alfaiataria, gola padre e regatas nobres em tecidos frescos e elegantes.',
    badge: 'Categoria Oficial',
    categoryTarget: 'camisas-e-regatas',
    ctaText: 'Ver Camisas e Regatas',
    imageUrl: '/images/banners/cat-banner-camisas-regatas.jpg',
    isActive: true,
    order: 4,
  },
  {
    id: 'slide-chemises',
    title: 'Chemises Elegantes',
    subtitle: 'Versatilidade e sofisticação com abotoamento frontal, gola camisaria e faixas de amarração.',
    badge: 'Categoria Oficial',
    categoryTarget: 'chemises',
    ctaText: 'Ver Chemises',
    imageUrl: '/images/banners/cat-banner-chemises.jpg',
    isActive: true,
    order: 5,
  },
  {
    id: 'slide-conjuntos-calca',
    title: 'Conjuntos de Calça',
    subtitle: 'Coordenações luxuosas em alfaiataria e tecidos nobres para marcar presença com autoridade.',
    badge: 'Categoria Oficial',
    categoryTarget: 'conjuntos-de-calca',
    ctaText: 'Ver Conjuntos de Calça',
    imageUrl: '/images/banners/cat-banner-conjuntos-calca.jpg',
    isActive: true,
    order: 6,
  },
  {
    id: 'slide-conjuntos-shorts',
    title: 'Conjuntos de Shorts',
    subtitle: 'Trijuntos modernos e conjuntos casuais em viscose e linho com charme e conforto absoluto.',
    badge: 'Categoria Oficial',
    categoryTarget: 'conjuntos-de-shorts',
    ctaText: 'Ver Conjuntos de Shorts',
    imageUrl: '/images/banners/cat-banner-conjuntos-shorts.jpg',
    isActive: true,
    order: 7,
  },
  {
    id: 'slide-macaquinhas',
    title: 'Macaquinhas',
    subtitle: 'Praticidade e elegância em peça única com modelagem transpassada e tecidos fluidos.',
    badge: 'Categoria Oficial',
    categoryTarget: 'macaquinhos',
    ctaText: 'Ver Macaquinhas',
    imageUrl: '/images/banners/cat-banner-macaquinhas.jpg',
    isActive: true,
    order: 8,
  },
  {
    id: 'slide-vestidos-curtos',
    title: 'Vestidos Curtos',
    subtitle: 'Modelos tubinho, transpassados e vestidos canelados para ocasiões dinâmicas e especiais.',
    badge: 'Categoria Oficial',
    categoryTarget: 'vestidos-curtos',
    ctaText: 'Ver Vestidos Curtos',
    imageUrl: '/images/banners/cat-banner-vestidos-curtos.jpg',
    isActive: true,
    order: 9,
  },
  {
    id: 'slide-vestidos-longos',
    title: 'Vestidos Longos',
    subtitle: 'Fluidez, imponência e glamour com decotes valorizados para festas e momentos memoráveis.',
    badge: 'Categoria Oficial',
    categoryTarget: 'vestidos-longos',
    ctaText: 'Ver Vestidos Longos',
    imageUrl: '/images/banners/cat-banner-vestidos-longos.jpg',
    isActive: true,
    order: 10,
  },
  {
    id: 'slide-vestidos-midis',
    title: 'Vestidos Midis',
    subtitle: 'O comprimento queridinho das mulheres elegantes: equilíbrio perfeito entre classe e frescor.',
    badge: 'Categoria Oficial',
    categoryTarget: 'vestidos-midi',
    ctaText: 'Ver Vestidos Midis',
    imageUrl: '/images/banners/cat-banner-vestidos-midis.jpg',
    isActive: true,
    order: 11,
  },
];

interface StoreState {
  // Admin Auth
  isAdminLoggedIn: boolean;
  adminUser: AdminAuthUser | null;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;

  // Products & Inventory Management
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  uploadProductImage: (productId: string, dataUrl: string) => void;
  updateStock: (productId: string, newTotal: number) => void;
  updateSizeStock: (productId: string, size: string, newQty: number) => void;
  updateProductColors: (productId: string, colors: ColorOption[]) => void;
  updateProductPrice: (productId: string, price: number, originalPrice?: number | null) => void;
  toggleProductActive: (productId: string) => void;
  toggleProductFeatured: (productId: string) => void;

  // Categories Management
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Omit<Category, 'id'> | Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (categoryId: string) => void;
  toggleCategoryActive: (categoryId: string) => void;
  reorderCategory: (categoryId: string, direction: 'up' | 'down') => void;
  resetCategoriesToDefault: () => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size: string, color: ColorOption, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, colorName: string) => void;
  updateQuantity: (productId: string, size: string, colorName: string, delta: number) => void;
  clearCart: () => void;
  resetToDemoCart: () => void;

  // Local Delivery (Manaus - AM)
  neighborhoods: ManausNeighborhood[];
  setNeighborhoods: (list: ManausNeighborhood[]) => void;
  updateNeighborhoodFee: (name: string, newFee: number) => void;
  addNeighborhood: (neighborhood: ManausNeighborhood) => void;
  deleteNeighborhood: (name: string) => void;
  deliverySelection: DeliverySelection;
  setDeliveryType: (type: 'motoboy' | 'retirada') => void;
  setSelectedNeighborhood: (neighborhood: ManausNeighborhood) => void;
  setDeliveryAddress: (address: string) => void;

  // Dynamic WhatsApp Alternating Traffic (Maria & Carlos)
  attendants: WhatsAppAttendant[];
  updateAttendant: (id: string, updates: Partial<WhatsAppAttendant>) => void;
  addAttendant: (attendant: Omit<WhatsAppAttendant, 'id'> | WhatsAppAttendant) => void;
  deleteAttendant: (id: string) => void;
  toggleAttendantActive: (id: string) => void;
  currentAttendantIndex: number;
  rotateAttendant: () => WhatsAppAttendant;
  openWhatsAppLead: (customText?: string, source?: string, product?: Product) => void;
  recordLeadClick: (data: { attendantId: 'maria' | 'carlos'; attendantName: string; source: string; productId?: string; productName?: string }) => void;
  leadClicks: LeadClickEvent[];

  // Orders & Kanban Board
  adminOrders: AdminOrder[];
  addAdminOrder: (order: AdminOrder) => void;
  updateOrderStatus: (orderId: string, status: KanbanStatus) => void;
  moveKanbanOrder: (orderId: string, status: KanbanStatus) => void;
  deleteAdminOrder: (orderId: string) => void;
  clearCompletedOrders: () => void;

  // Logs & Audit
  activityLogs: ActivityLog[];
  addActivityLog: (action: string, description: string) => void;

  // Store CMS Customization
  storeCMS: StoreCMSConfig;
  updateStoreCMS: (data: Partial<StoreCMSConfig>) => void;

  // Carousel Slides & Config
  carouselSlides: CarouselSlide[];
  carouselAutoPlay: boolean;
  carouselIntervalSeconds: number;
  setCarouselSlides: (slides: CarouselSlide[]) => void;
  addCarouselSlide: (slide: Omit<CarouselSlide, 'id'>) => void;
  updateCarouselSlide: (slide: CarouselSlide) => void;
  deleteCarouselSlide: (id: string) => void;
  toggleCarouselSlideActive: (id: string) => void;
  setCarouselAutoPlay: (auto: boolean) => void;
  setCarouselIntervalSeconds: (sec: number) => void;
  resetCarouselToDefaults: () => void;

  // Product Detail Modal
  selectedProduct: Product | null;
  isDetailOpen: boolean;
  openDetail: (product: Product) => void;
  closeDetail: () => void;

  // WhatsApp Checkout Modal
  isWhatsAppModalOpen: boolean;
  openWhatsAppModal: () => void;
  closeWhatsAppModal: () => void;
  customerName: string;
  setCustomerName: (name: string) => void;
  customerPhone: string;
  setCustomerPhone: (phone: string) => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;

  // Category Filter & Search
  selectedCategory: string | null;
  setSelectedCategory: (slug: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Informational Modal
  infoModal: {
    isOpen: boolean;
    title: string;
    description: string;
  };
  openInfoModal: (title: string, description: string) => void;
  closeInfoModal: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Admin Authentication
      isAdminLoggedIn: false,
      adminUser: null,

      loginAdmin: (email: string, pass: string) => {
        // Validação com credencial padrão ou aceita qualquer senha administrativa válida
        const trimmedEmail = email.trim().toLowerCase();
        if (
          (trimmedEmail === 'admin@miixxiie.com.br' || trimmedEmail === 'loja@miixxiie.com.br' || trimmedEmail === 'admin') &&
          pass.trim().length >= 4
        ) {
          const user: AdminAuthUser = {
            email: trimmedEmail.includes('@') ? trimmedEmail : 'admin@miixxiie.com.br',
            name: 'Gerência Geral MIIXXIIE',
            role: 'Administrador da Loja',
            avatar: '/images/logo-square.png',
            lastLogin: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          };

          set({ isAdminLoggedIn: true, adminUser: user });
          get().addActivityLog('Login no Painel', `Usuário ${user.email} autenticado no sistema.`);
          return true;
        }
        return false;
      },

      logoutAdmin: () => {
        get().addActivityLog('Logout', 'Sessão administrativa finalizada.');
        set({ isAdminLoggedIn: false, adminUser: null });
      },

      // Products Catalog
      products: PRODUCTS,
      setProducts: (products) => set({ products }),

      addProduct: (product) => {
        set((state) => ({ products: [product, ...state.products] }));
        get().addActivityLog('Novo Produto', `Produto "${product.name}" cadastrado com sucesso.`);

        // Sincronização assíncrona com Supabase se configurado
        const client = getSupabaseClient();
        if (client) {
          client.from('products').insert({
            id: product.id,
            name: product.name,
            slug: product.slug,
            category: product.category,
            subcategory: product.subcategory,
            price: product.price,
            original_price: product.originalPrice,
            combo_offer: product.comboOffer,
            badge: product.badge,
            sizes: product.sizes,
            colors: product.colors,
            image: product.image,
            description: product.description,
            material: product.material,
            stock_total: product.stockTotal,
            size_stock: product.sizeStock,
            is_active: product.isActive ?? true,
          }).then();
        }
      },

      updateProduct: (product) => {
        set((state) => ({
          products: state.products.map((p) => (p.id === product.id ? product : p)),
        }));
        get().addActivityLog('Edição de Produto', `Dados do produto "${product.name}" foram atualizados.`);

        const client = getSupabaseClient();
        if (client) {
          client.from('products').upsert({
            id: product.id,
            name: product.name,
            slug: product.slug,
            category: product.category,
            subcategory: product.subcategory,
            price: product.price,
            original_price: product.originalPrice,
            combo_offer: product.comboOffer,
            badge: product.badge,
            sizes: product.sizes,
            colors: product.colors,
            image: product.image,
            description: product.description,
            material: product.material,
            stock_total: product.stockTotal,
            size_stock: product.sizeStock,
            is_active: product.isActive ?? true,
          }).then();
        }
      },

      deleteProduct: (productId) => {
        const prod = get().products.find((p) => p.id === productId);
        set((state) => ({
          products: state.products.filter((p) => p.id !== productId),
        }));
        get().addActivityLog('Exclusão de Produto', `Produto "${prod?.name || productId}" removido do catálogo.`);

        const client = getSupabaseClient();
        if (client) {
          client.from('products').delete().eq('id', productId).then();
        }
      },

      uploadProductImage: (productId, dataUrl) => {
        set((state) => ({
          products: state.products.map((p) => {
            if (p.id === productId) {
              return {
                ...p,
                image: dataUrl,
                gallery: [dataUrl, ...(p.gallery || [])],
              };
            }
            return p;
          }),
        }));
        get().addActivityLog('Upload de Foto', `Nova foto carregada para o produto ID ${productId}.`);
      },

      updateStock: (productId, newTotal) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId ? { ...p, stockTotal: Math.max(0, newTotal) } : p
          ),
        }));
      },

      updateSizeStock: (productId, size, newQty) => {
        set((state) => ({
          products: state.products.map((p) => {
            if (p.id === productId) {
              const updatedSizeStock = { ...p.sizeStock, [size]: Math.max(0, newQty) };
              const newTotal = Object.values(updatedSizeStock).reduce((a, b) => a + b, 0);
              return { ...p, sizeStock: updatedSizeStock, stockTotal: newTotal };
            }
            return p;
          }),
        }));
      },

      updateProductColors: (productId, colors) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId ? { ...p, colors } : p
          ),
        }));
      },

      updateProductPrice: (productId, price, originalPrice) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId ? { ...p, price, originalPrice: originalPrice ?? p.originalPrice } : p
          ),
        }));
      },

      toggleProductFeatured: (productId) => {
        set((state) => ({
          products: state.products.map((p) => {
            if (p.id === productId) {
              const isFeatured = p.badge === 'Destaque';
              return { ...p, badge: (isFeatured ? 'Novo' : 'Destaque') as Product['badge'] };
            }
            return p;
          }),
        }));
        get().addActivityLog('Destaque de Produto', 'Status de destaque atualizado para o produto ID ' + productId);
      },

      toggleProductActive: (productId) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId ? { ...p, isActive: !(p.isActive ?? true) } : p
          ),
        }));
      },

      // Categories Management
      categories: CATEGORIES.map((c, idx) => ({
        ...c,
        isActive: c.isActive ?? true,
        order: c.order ?? idx + 1,
      })),
      setCategories: (categories) => set({ categories }),
      addCategory: (categoryData) => {
        const newCat: Category = {
          ...categoryData,
          id: 'id' in categoryData && categoryData.id ? categoryData.id : `cat-${Date.now()}`,
          name: categoryData.name,
          slug: categoryData.slug,
          image: categoryData.image || '/images/banners/banner-slide-1-marca.jpg',
          count: categoryData.count ?? 0,
          isActive: categoryData.isActive ?? true,
          order: categoryData.order ?? (get().categories.length + 1),
          description: categoryData.description || '',
        };
        set((state) => ({ categories: [...state.categories, newCat] }));
        get().addActivityLog('Nova Categoria', `Categoria "${newCat.name}" criada.`);
      },
      updateCategory: (updated) => {
        set((state) => ({
          categories: state.categories.map((c) => (c.id === updated.id ? updated : c)),
        }));
        get().addActivityLog('Categoria Atualizada', `Categoria "${updated.name}" foi editada.`);
      },
      deleteCategory: (categoryId) => {
        const cat = get().categories.find((c) => c.id === categoryId);
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== categoryId),
        }));
        get().addActivityLog('Categoria Removida', `Categoria "${cat?.name || categoryId}" removida.`);
      },
      toggleCategoryActive: (categoryId) => {
        let newStatus = true;
        set((state) => ({
          categories: state.categories.map((c) => {
            if (c.id === categoryId) {
              newStatus = !(c.isActive ?? true);
              return { ...c, isActive: newStatus };
            }
            return c;
          }),
        }));
        const cat = get().categories.find((c) => c.id === categoryId);
        get().addActivityLog(
          'Status de Categoria',
          `Categoria "${cat?.name || categoryId}" ${newStatus ? 'ativada (visível)' : 'desativada (oculta)'} na loja.`
        );
      },
      reorderCategory: (categoryId, direction) => {
        const list = [...get().categories].sort((a, b) => (a.order || 0) - (b.order || 0));
        const idx = list.findIndex((c) => c.id === categoryId);
        if (idx === -1) return;
        const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
        if (targetIdx < 0 || targetIdx >= list.length) return;

        const temp = list[idx];
        list[idx] = list[targetIdx];
        list[targetIdx] = temp;

        const reordered = list.map((item, i) => ({ ...item, order: i + 1 }));
        set({ categories: reordered });
        get().addActivityLog('Ordem das Categorias', 'Ordem de exibição das categorias foi reorganizada.');
      },
      resetCategoriesToDefault: () => {
        set({
          categories: CATEGORIES.map((c, idx) => ({ ...c, isActive: true, order: idx + 1 })),
        });
        get().addActivityLog('Categorias Restauradas', 'Categorias restauradas para a configuração oficial.');
      },

      // Cart
      cart: INITIAL_DEMO_CART,
      isCartOpen: false,
      setIsCartOpen: (open) => set({ isCartOpen: open }),

      addToCart: (product, size, color, quantity = 1) => {
        set((state) => {
          const existingIndex = state.cart.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedSize === size &&
              item.selectedColor.name === color.name
          );

          if (existingIndex > -1) {
            const newCart = [...state.cart];
            newCart[existingIndex].quantity += quantity;
            return { cart: newCart, isCartOpen: true };
          }

          return {
            cart: [
              ...state.cart,
              { product, selectedSize: size, selectedColor: color, quantity },
            ],
            isCartOpen: true,
          };
        });
      },

      removeFromCart: (productId, size, colorName) => {
        set((state) => ({
          cart: state.cart.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedSize === size &&
                item.selectedColor.name === colorName
              )
          ),
        }));
      },

      updateQuantity: (productId, size, colorName, delta) => {
        set((state) => {
          const newCart = state.cart
            .map((item) => {
              if (
                item.product.id === productId &&
                item.selectedSize === size &&
                item.selectedColor.name === colorName
              ) {
                const newQuantity = item.quantity + delta;
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
              }
              return item;
            })
            .filter((item): item is CartItem => item !== null);

          return { cart: newCart };
        });
      },

      clearCart: () => set({ cart: [] }),
      resetToDemoCart: () => set({ cart: INITIAL_DEMO_CART }),

      // Local Delivery Manaus
      neighborhoods: MANAUS_NEIGHBORHOODS_LIST,
      setNeighborhoods: (neighborhoods) => set({ neighborhoods }),
      updateNeighborhoodFee: (name, newFee) => {
        set((state) => ({
          neighborhoods: state.neighborhoods.map((n) =>
            n.name === name ? { ...n, fee: Math.max(0, newFee) } : n
          ),
        }));
        get().addActivityLog('Taxa de Entrega', 'Taxa de ' + name + ' alterada para R$ ' + newFee);
      },
      addNeighborhood: (item) => {
        set((state) => ({ neighborhoods: [...state.neighborhoods, item] }));
        get().addActivityLog('Novo Bairro', 'Bairro ' + item.name + ' adicionado.');
      },
      deleteNeighborhood: (name) => {
        set((state) => ({
          neighborhoods: state.neighborhoods.filter((n) => n.name !== name),
        }));
        get().addActivityLog('Remoção de Bairro', 'Bairro ' + name + ' removido.');
      },

      deliverySelection: {
        type: 'motoboy',
        neighborhood: MANAUS_NEIGHBORHOODS_LIST[0],
        deliveryAddress: '',
      },
      setDeliveryType: (type) =>
        set((state) => ({
          deliverySelection: { ...state.deliverySelection, type },
        })),
      setSelectedNeighborhood: (neighborhood) =>
        set((state) => ({
          deliverySelection: {
            ...state.deliverySelection,
            type: 'motoboy',
            neighborhood,
          },
        })),
      setDeliveryAddress: (address) =>
        set((state) => ({
          deliverySelection: { ...state.deliverySelection, deliveryAddress: address },
        })),

      // WhatsApp Dynamic Attendants & Lead Distribution
      attendants: WHATSAPP_ATTENDANTS,
      updateAttendant: (id, updates) => {
        set((state) => ({
          attendants: state.attendants.map((att) =>
            att.id === id ? { ...att, ...updates } : att
          ),
        }));
        get().addActivityLog('Atualização de Atendente', 'Dados da atendente ' + id + ' atualizados.');
      },
      addAttendant: (attendantData) => {
        const newAtt: WhatsAppAttendant = {
          ...attendantData,
          id: 'id' in attendantData && attendantData.id ? attendantData.id : `att-${Date.now()}`,
          name: attendantData.name,
          role: attendantData.role || 'Consultora de Vendas',
          phoneDisplay: attendantData.phoneDisplay,
          phoneNumber: attendantData.phoneNumber.replace(/\D/g, ''),
          clicksCount: 0,
          isActive: attendantData.isActive ?? true,
        };
        set((state) => ({ attendants: [...state.attendants, newAtt] }));
        get().addActivityLog('Novo Atendente', `Atendente "${newAtt.name}" adicionado à equipe.`);
      },
      deleteAttendant: (id) => {
        const att = get().attendants.find((a) => a.id === id);
        set((state) => ({ attendants: state.attendants.filter((a) => a.id !== id) }));
        get().addActivityLog('Atendente Removido', `Atendente "${att?.name || id}" removido.`);
      },
      toggleAttendantActive: (id) => {
        set((state) => ({
          attendants: state.attendants.map((a) =>
            a.id === id ? { ...a, isActive: !(a.isActive ?? true) } : a
          ),
        }));
      },
      currentAttendantIndex: 0,
      leadClicks: INITIAL_CLICKS,

      rotateAttendant: () => {
        const state = get();
        const allList = state.attendants && state.attendants.length > 0 ? state.attendants : WHATSAPP_ATTENDANTS;
        const activeList = allList.filter((a) => a.isActive !== false);
        const list = activeList.length > 0 ? activeList : allList;
        const currentIdx = state.currentAttendantIndex || 0;
        const selected = list[currentIdx % list.length];

        const updatedList = allList.map((att) =>
          att.id === selected.id ? { ...att, clicksCount: (att.clicksCount || 0) + 1 } : att);
        /*
          // previous index logic
        */
        const nextIdx = (currentIdx + 1) % list.length;

        set({
          attendants: updatedList,
          currentAttendantIndex: nextIdx,
        });

        return selected;
      },

      recordLeadClick: (data) => {
        const attendant = data.attendantId === 'maria' ? WHATSAPP_ATTENDANTS[0] : WHATSAPP_ATTENDANTS[1];
        const newClick: LeadClickEvent = {
          id: `click-${Date.now()}`,
          timestamp: new Date().toISOString(),
          timeFormatted: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          attendantId: data.attendantId,
          attendantName: data.attendantName,
          phoneNumber: attendant.phoneNumber,
          source: data.source,
          productId: data.productId,
          productName: data.productName,
        };

        set((state) => ({ leadClicks: [newClick, ...state.leadClicks.slice(0, 49)] }));
        get().addActivityLog('Clique WhatsApp', `Lead direcionado para ${data.attendantName} via ${data.source}.`);

        // Sincronização Supabase
        const client = getSupabaseClient();
        if (client) {
          client.from('lead_clicks').insert({
            attendant_id: data.attendantId,
            attendant_name: data.attendantName,
            phone_number: attendant.phoneNumber,
            product_id: data.productId,
            product_name: data.productName,
            source: data.source,
          }).then();
        }
      },

      openWhatsAppLead: (customText, source = 'site_header', product) => {
        const attendant = get().rotateAttendant();
        get().recordLeadClick({
          attendantId: attendant.id as 'maria' | 'carlos',
          attendantName: attendant.name,
          source,
          productId: product?.id,
          productName: product?.name,
        });

        const defaultMsg = `Olá, *${attendant.name}*! Gostaria de atendimento de vendas na *MIIXXIIE Variedades* em Manaus. 🌸`;
        const msg = customText || defaultMsg;
        const url = `https://wa.me/${attendant.phoneNumber}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      },

      // Orders & Kanban Management
      adminOrders: INITIAL_ORDERS,

      addAdminOrder: (order) => {
        set((state) => ({ adminOrders: [order, ...state.adminOrders] }));
        get().addActivityLog('Novo Pedido', `Pedido ${order.id} registrado para ${order.customer} (${order.status}).`);

        const client = getSupabaseClient();
        if (client) {
          client.from('orders').insert({
            id: order.id,
            customer: order.customer,
            customer_phone: order.customerPhone,
            items: order.itemsList,
            total: order.total,
            subtotal: order.subtotal || order.total,
            shipping_fee: order.shippingFee || 0,
            delivery_type: order.deliveryMethod?.includes('Retirada') ? 'retirada' : 'motoboy',
            neighborhood: order.neighborhood,
            delivery_address: order.deliveryAddress,
            status: order.status,
            attendant_id: order.attendantId,
            attendant_name: order.attendantName,
            notes: order.notes,
          }).then();
        }
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          adminOrders: state.adminOrders.map((ord) =>
            ord.id === orderId
              ? { ...ord, status, statusBadge: KANBAN_BADGE_MAP[status] || ord.statusBadge }
              : ord
          ),
        }));
        get().addActivityLog('Status de Pedido', `Pedido ${orderId} atualizado para "${status}".`);

        const client = getSupabaseClient();
        if (client) {
          client.from('orders').update({ status }).eq('id', orderId).then();
        }
      },

      moveKanbanOrder: (orderId, status) => {
        get().updateOrderStatus(orderId, status);
      },
      deleteAdminOrder: (orderId) => {
        set((state) => ({ adminOrders: state.adminOrders.filter((o) => o.id !== orderId) }));
        get().addActivityLog('Pedido Excluído', `Pedido ${orderId} foi removido do Kanban.`);
      },
      clearCompletedOrders: () => {
        set((state) => ({
          adminOrders: state.adminOrders.filter((o) => o.status !== 'Concluído' && o.status !== 'Cancelado'),
        }));
        get().addActivityLog('Limpeza de Pedidos', 'Pedidos finalizados e cancelados arquivados.');
      },

      // Activity Logs & Audit
      activityLogs: INITIAL_LOGS,
      addActivityLog: (action, description) => {
        const newLog: ActivityLog = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString(),
          timeFormatted: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          action,
          description,
          user: get().adminUser?.name || 'Administrador',
        };
        set((state) => ({ activityLogs: [newLog, ...state.activityLogs.slice(0, 99)] }));

        const client = getSupabaseClient();
        if (client) {
          client.from('activity_logs').insert({
            action_type: action,
            description,
            user_name: newLog.user,
          }).then();
        }
      },

      // Store CMS Settings
      storeCMS: INITIAL_CMS,
      updateStoreCMS: (data) => {
        set((state) => ({ storeCMS: { ...state.storeCMS, ...data } }));
        get().addActivityLog('CMS Atualizado', 'Configurações visuais e de atendimento da loja foram salvas.');

        const client = getSupabaseClient();
        if (client) {
          client.from('store_settings').upsert({
            id: 'miixxiie_manaus',
            store_name: data.storeName,
            subtitle: data.subtitle,
            niche: data.niche,
            slogan: data.slogan,
            city: data.city,
            address: data.storeAddress,
            whatsapp_maria: data.whatsappMaria,
            whatsapp_carlos: data.whatsappCarlos,
            banner_headline: data.bannerHeadline,
            banner_subheadline: data.bannerSubheadline,
            shipping_notice: data.shippingNotice,
          }).then();
        }
      },

      // Carousel Config & Slides
      carouselSlides: INITIAL_CAROUSEL_SLIDES,
      carouselAutoPlay: true,
      carouselIntervalSeconds: 5,
      setCarouselSlides: (slides) => set({ carouselSlides: slides }),
      addCarouselSlide: (slideData) => {
        const newSlide: CarouselSlide = {
          ...slideData,
          id: `slide-${Date.now()}`,
          order: get().carouselSlides.length + 1,
        };
        set((state) => ({ carouselSlides: [...state.carouselSlides, newSlide] }));
        get().addActivityLog('Novo Slide Carrossel', `Slide "${newSlide.title}" adicionado.`);
      },
      updateCarouselSlide: (updated) => {
        set((state) => ({
          carouselSlides: state.carouselSlides.map((s) => (s.id === updated.id ? updated : s)),
        }));
        get().addActivityLog('Slide Editado', `Slide "${updated.title}" atualizado.`);
      },
      deleteCarouselSlide: (id) => {
        set((state) => ({
          carouselSlides: state.carouselSlides.filter((s) => s.id !== id),
        }));
        get().addActivityLog('Slide Removido', `Slide removido do carrossel.`);
      },
      toggleCarouselSlideActive: (id) => {
        set((state) => ({
          carouselSlides: state.carouselSlides.map((s) =>
            s.id === id ? { ...s, isActive: !s.isActive } : s
          ),
        }));
      },
      setCarouselAutoPlay: (auto) => set({ carouselAutoPlay: auto }),
      setCarouselIntervalSeconds: (sec) =>
        set({ carouselIntervalSeconds: Math.max(2, Math.min(15, sec)) }),
      resetCarouselToDefaults: () => {
        set({ carouselSlides: INITIAL_CAROUSEL_SLIDES, carouselAutoPlay: true, carouselIntervalSeconds: 5 });
        get().addActivityLog('Carrossel Restaurado', 'Slides do carrossel restaurados para os modelos de alta definição.');
      },

      // Product Detail Modal
      selectedProduct: null,
      isDetailOpen: false,
      openDetail: (product) => set({ selectedProduct: product, isDetailOpen: true }),
      closeDetail: () => set({ isDetailOpen: false, selectedProduct: null }),

      // WhatsApp Checkout Modal
      isWhatsAppModalOpen: false,
      openWhatsAppModal: () => set({ isWhatsAppModalOpen: true }),
      closeWhatsAppModal: () => set({ isWhatsAppModalOpen: false }),
      customerName: '',
      setCustomerName: (name) => set({ customerName: name }),
      customerPhone: '',
      setCustomerPhone: (phone) => set({ customerPhone: phone }),

      // Favorites
      favorites: [PRODUCTS[0]?.id || '', PRODUCTS[1]?.id || ''],
      toggleFavorite: (productId) => {
        set((state) => {
          const exists = state.favorites.includes(productId);
          return {
            favorites: exists
              ? state.favorites.filter((id) => id !== productId)
              : [...state.favorites, productId],
          };
        });
      },
      isFavorite: (productId) => get().favorites.includes(productId),

      // Filtering & Search
      selectedCategory: null,
      setSelectedCategory: (slug) => set({ selectedCategory: slug }),
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      // Informational Modal
      infoModal: {
        isOpen: false,
        title: '',
        description: '',
      },
      openInfoModal: (title, description) =>
        set({ infoModal: { isOpen: true, title, description } }),
      closeInfoModal: () =>
        set({ infoModal: { isOpen: false, title: '', description: '' } }),
    }),
    {
      name: 'miixxiie_store_v8_live',
      onRehydrateStorage: () => (state) => {
        if (state && state.carouselSlides) {
          let dirty = false;
          const cleaned = state.carouselSlides.map((s) => {
            if (s.title && (s.title.includes('Malaquinhas') || s.title.includes('Macaquihas'))) {
              dirty = true;
              return {
                ...s,
                title: 'Macaquinhas',
                ctaText: 'Ver Macaquinhas',
              };
            }
            return s;
          });
          if (dirty) {
            state.setCarouselSlides(cleaned);
          }
        }
        if (state && state.categories) {
          let dirtyCat = false;
          const cleanedCat = state.categories.map((c) => {
            if (c.name && (c.name.includes('Malaquinhas') || c.name.includes('Macaquihas'))) {
              dirtyCat = true;
              return { ...c, name: 'Macaquinhas' };
            }
            return c;
          });
          if (dirtyCat) {
            state.setCategories(cleanedCat);
          }
        }
        if (state && state.storeCMS) {
          const officialNotice = 'Entregas em Manaus: Frete via Motoboy a Combinar no WhatsApp • Grátis Apenas Retirando na Loja';
          if (
            !state.storeCMS.topBarAnnouncement ||
            state.storeCMS.topBarAnnouncement.includes('toda Manaus via Motoboy') ||
            state.storeCMS.topBarAnnouncement.includes('grátis a partir') ||
            state.storeCMS.shippingNotice?.includes('grátis a partir')
          ) {
            state.updateStoreCMS({
              topBarAnnouncement: officialNotice,
              shippingNotice: officialNotice,
            });
          }
        }
      },
      partialize: (state) => ({
        neighborhoods: state.neighborhoods,
        isAdminLoggedIn: state.isAdminLoggedIn,
        adminUser: state.adminUser,
        products: state.products,
        cart: state.cart,
        favorites: state.favorites,
        adminOrders: state.adminOrders,
        customerName: state.customerName,
        customerPhone: state.customerPhone,
        deliverySelection: state.deliverySelection,
        attendants: state.attendants,
        currentAttendantIndex: state.currentAttendantIndex,
        leadClicks: state.leadClicks,
        activityLogs: state.activityLogs,
        storeCMS: state.storeCMS,
        carouselSlides: state.carouselSlides,
        carouselAutoPlay: state.carouselAutoPlay,
        carouselIntervalSeconds: state.carouselIntervalSeconds,
        categories: state.categories,
      }),
    }
  )
);
