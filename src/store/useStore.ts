import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  CartItem,
  Product,
  ColorOption,
  INITIAL_DEMO_CART,
  PRODUCTS,
  ADMIN_DASHBOARD_DATA,
  DeliverySelection,
  ManausNeighborhood,
  MANAUS_NEIGHBORHOODS_LIST,
} from '@/data/mockData';

export interface AdminOrder {
  id: string;
  customer: string;
  itemsCount: number;
  extraItemsBadge?: string;
  total: number;
  deliveryMethod?: string;
  status: 'Pago' | 'Em Atendimento' | 'Pendente' | 'Enviado';
  statusBadge: string;
  date?: string;
}

interface StoreState {
  // Products & Inventory (Managed in Admin, displayed on Storefront)
  products: Product[];
  setProducts: (products: Product[]) => void;
  updateStock: (productId: string, newTotal: number) => void;
  updateSizeStock: (productId: string, size: string, newQty: number) => void;
  updateProductColors: (productId: string, colors: ColorOption[]) => void;
  updateProductPrice: (productId: string, price: number, originalPrice?: number | null) => void;
  toggleProductActive: (productId: string) => void;
  addProduct: (product: Product) => void;

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
  deliverySelection: DeliverySelection;
  setDeliveryType: (type: 'motoboy' | 'retirada') => void;
  setSelectedNeighborhood: (neighborhood: ManausNeighborhood) => void;
  setDeliveryAddress: (address: string) => void;

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
      // Products catalog initialized with 40 real products
      products: PRODUCTS,
      setProducts: (products) => set({ products }),

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
            p.id === productId ? { ...p, price, originalPrice } : p
          ),
        }));
      },

      toggleProductActive: (productId) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId ? { ...p, isActive: p.isActive === false ? true : false } : p
          ),
        }));
      },

      addProduct: (newProd) => {
        set((state) => ({ products: [newProd, ...state.products] }));
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

      // Local Delivery Manaus
      deliverySelection: {
        type: 'motoboy',
        neighborhood: MANAUS_NEIGHBORHOODS_LIST[1], // Adrianópolis / Vieiralves default
        deliveryAddress: '',
      },
      setDeliveryType: (type) =>
        set((state) => ({
          deliverySelection: { ...state.deliverySelection, type },
        })),
      setSelectedNeighborhood: (neighborhood) =>
        set((state) => ({
          deliverySelection: { ...state.deliverySelection, neighborhood },
        })),
      setDeliveryAddress: (address) =>
        set((state) => ({
          deliverySelection: { ...state.deliverySelection, deliveryAddress: address },
        })),

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
      name: 'miixxiie_store_real_v2',
      partialize: (state) => ({
        products: state.products,
        cart: state.cart,
        favorites: state.favorites,
        adminOrders: state.adminOrders,
        deliverySelection: state.deliverySelection,
      }),
    }
  )
);
