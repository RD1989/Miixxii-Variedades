import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  CartItem,
  Product,
  SizeOption,
  ColorOption,
  INITIAL_DEMO_CART,
  PRODUCTS,
  ADMIN_DASHBOARD_DATA,
} from '@/data/mockData';

export interface AdminOrder {
  id: string;
  customer: string;
  itemsCount: number;
  extraItemsBadge?: string;
  total: number;
  status: 'Pago' | 'Em Atendimento' | 'Pendente' | 'Enviado';
  statusBadge: string;
  date?: string;
}

interface StoreState {
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size: SizeOption, color: ColorOption, quantity?: number) => void;
  removeFromCart: (productId: string, size: SizeOption, colorName: string) => void;
  updateQuantity: (productId: string, size: SizeOption, colorName: string, delta: number) => void;
  clearCart: () => void;
  resetToDemoCart: () => void;

  // Product Detail Modal
  selectedProduct: Product | null;
  isDetailOpen: boolean;
  openDetail: (product: Product) => void;
  closeDetail: () => void;

  // WhatsApp Checkout Modal & Chat Simulation
  isWhatsAppModalOpen: boolean;
  openWhatsAppModal: () => void;
  closeWhatsAppModal: () => void;
  customerName: string;
  setCustomerName: (name: string) => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;

  // Category Filter & Search
  selectedCategory: string | null;
  setSelectedCategory: (slug: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Informational / Secondary Modal
  infoModal: {
    isOpen: boolean;
    title: string;
    description: string;
  };
  openInfoModal: (title: string, description: string) => void;
  closeInfoModal: () => void;

  // Admin Live Orders
  adminOrders: AdminOrder[];
  addAdminOrder: (order: AdminOrder) => void;
  updateOrderStatus: (orderId: string, status: AdminOrder['status']) => void;
}

const statusBadgeMap: Record<AdminOrder['status'], string> = {
  Pago: 'bg-emerald-100 text-emerald-700',
  'Em Atendimento': 'bg-blue-100 text-blue-700',
  Pendente: 'bg-amber-100 text-amber-700',
  Enviado: 'bg-purple-100 text-purple-700',
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart initialized with demo items from Step 3
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
            const updated = [...state.cart];
            updated[existingIndex].quantity += quantity;
            return { cart: updated, isCartOpen: true };
          }

          return {
            cart: [
              ...state.cart,
              {
                product,
                selectedSize: size,
                selectedColor: color,
                quantity,
              },
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
          const updated = state.cart
            .map((item) => {
              if (
                item.product.id === productId &&
                item.selectedSize === size &&
                item.selectedColor.name === colorName
              ) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
              }
              return item;
            })
            .filter(Boolean) as CartItem[];

          return { cart: updated };
        });
      },

      clearCart: () => set({ cart: [] }),
      resetToDemoCart: () => set({ cart: INITIAL_DEMO_CART }),

      // Product Detail
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

      // Favorites
      favorites: ['prod-1', 'prod-2'],
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

      // Secondary Modal (Zero Links Quebrados)
      infoModal: {
        isOpen: false,
        title: '',
        description: '',
      },
      openInfoModal: (title, description) =>
        set({ infoModal: { isOpen: true, title, description } }),
      closeInfoModal: () =>
        set({ infoModal: { isOpen: false, title: '', description: '' } }),

      // Admin Orders
      adminOrders: ADMIN_DASHBOARD_DATA.recentOrders as AdminOrder[],
      addAdminOrder: (order) =>
        set((state) => ({ adminOrders: [order, ...state.adminOrders] })),
      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          adminOrders: state.adminOrders.map((ord) =>
            ord.id === orderId
              ? { ...ord, status, statusBadge: statusBadgeMap[status] }
              : ord
          ),
        }));
      },
    }),
    {
      name: 'miixxiie_store_v1',
      partialize: (state) => ({
        cart: state.cart,
        favorites: state.favorites,
        adminOrders: state.adminOrders,
      }),
    }
  )
);
