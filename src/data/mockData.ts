export type SizeOption = string;

export interface ColorOption {
  name: string;
  hex: string;
  image?: string;
  stock?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number | null;
  comboOffer?: string | null;
  badge: 'Novo' | 'Oferta' | 'Destaque' | 'Festa' | 'Mais Vendido';
  rating: number;
  reviewsCount: number;
  sizes: string[];
  colors: ColorOption[];
  image: string;
  gallery: string[];
  description: string;
  material: string;
  stockTotal: number;
  sizeStock: Record<string, number>;
  section?: 'novidades' | 'mais-vendidos' | 'colecao-festa' | 'promocoes';
  isActive?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: ColorOption;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  count: number;
}

export interface ManausNeighborhood {
  name: string;
  zone: string;
  fee: number;
  time: string;
}

export interface DeliverySelection {
  type: 'motoboy' | 'retirada';
  neighborhood?: ManausNeighborhood;
  deliveryAddress?: string;
  deliveryNotes?: string;
}


// 1. Configurações da Loja MIIXXIIE (Negócio Local em Manaus - AM)
export const STORE_CONFIG = {
  name: 'MIIXXIIE',
  subtitle: 'Variedades',
  niche: 'MODA PLUS SIZE FEMININA',
  slogan: 'Estilo, Conforto e Autoestima',
  footerTagline: 'Beleza em todas as formas!',
  city: 'Manaus - AM',
  whatsappNumber: '559284199013', // Número Oficial do Catálogo
  catalogUrl: 'https://wa.me/c/559284199013',
  storeAddress: 'Manaus - AM (Atendimento e Retirada Presencial com Agendamento)',
  shippingPolicy: {
    notice: 'Entregas Somente em Manaus - AM (Frete por Bairro via Motoboy ou Retirada na Loja)',
    motoboyInfo: 'Frete a combinar por distância / bairro em toda Manaus.',
    pickupInfo: 'Retirada na loja física disponível gratuitamente.',
  },
  colors: {
    primary: '#0A0A0A',
    primaryLight: '#1F1F1F',
    dark: '#050505',
    darkMain: '#121214',
    backgroundSoft: '#F8F8FA',
    cardBorder: '#E4E4E7',
    whatsapp: '#25D366',
  },
};

export const MANAUS_NEIGHBORHOODS_LIST: ManausNeighborhood[] = [
  {
    "name": "Centro / Praça 14 / Cachoeirinha",
    "zone": "Centro-Sul",
    "fee": 12.0,
    "time": "2 a 4 horas"
  },
  {
    "name": "Adrianópolis / Vieiralves / N. S. das Graças",
    "zone": "Centro-Sul",
    "fee": 15.0,
    "time": "2 a 4 horas"
  },
  {
    "name": "Flores / Parque 10 / Aleixo",
    "zone": "Centro-Sul",
    "fee": 15.0,
    "time": "2 a 4 horas"
  },
  {
    "name": "São Geraldo / Chapada / Dom Pedro",
    "zone": "Oeste / Centro-Sul",
    "fee": 15.0,
    "time": "2 a 4 horas"
  },
  {
    "name": "Ponta Negra / Tarumã / São Jorge",
    "zone": "Oeste",
    "fee": 25.0,
    "time": "Mesmo dia"
  },
  {
    "name": "Cidade Nova / Manoa / Nova Cidade",
    "zone": "Norte",
    "fee": 20.0,
    "time": "Mesmo dia"
  },
  {
    "name": "Coroado / São José / Tiradentes",
    "zone": "Leste",
    "fee": 20.0,
    "time": "Mesmo dia"
  },
  {
    "name": "Armando Mendes / Zumbi / Jorge Teixeira",
    "zone": "Leste",
    "fee": 25.0,
    "time": "Mesmo dia"
  },
  {
    "name": "Monte das Oliveiras / Colônia Terra Nova",
    "zone": "Norte",
    "fee": 25.0,
    "time": "Mesmo dia"
  },
  {
    "name": "Outro Bairro de Manaus (Combinar no WhatsApp)",
    "zone": "Manaus",
    "fee": 15.0,
    "time": "A combinar"
  }
];

export const CATEGORIES: Category[] = [
  {
    "id": "cat-vestidos-midi",
    "name": "Vestidos Midi",
    "slug": "vestidos-midi",
    "image": "/images/catalog/vestidos-midi/vestido-farm/1.png",
    "count": 4
  },
  {
    "id": "cat-vestidos-longos",
    "name": "Vestidos Longos",
    "slug": "vestidos-longos",
    "image": "/images/catalog/vestidos-longos/chemise-keyla-longo/1.png",
    "count": 5
  },
  {
    "id": "cat-vestidos-curtos",
    "name": "Vestidos Curtos",
    "slug": "vestidos-curtos",
    "image": "/images/catalog/vestidos-curtos/vestido-liz/1.png",
    "count": 6
  },
  {
    "id": "cat-conjuntos-shorts",
    "name": "Conjuntos Shorts",
    "slug": "conjuntos-de-shorts",
    "image": "/images/catalog/conjuntos-de-shorts/trijunto-de-alfaiateria/1.png",
    "count": 11
  },
  {
    "id": "cat-conjuntos-calca",
    "name": "Conjuntos Calça",
    "slug": "conjuntos-de-calca",
    "image": "/images/catalog/conjuntos-de-calca/conjunto-sheyla/1.png",
    "count": 2
  },
  {
    "id": "cat-calcas",
    "name": "Calças",
    "slug": "calcas",
    "image": "/images/catalog/calcas/calca-lucia/1.png",
    "count": 3
  },
  {
    "id": "cat-bermudas-shorts",
    "name": "Bermudas & Shorts",
    "slug": "bermudas-e-shorts",
    "image": "/images/catalog/bermudas-e-shorts/bermuda-meia-coxa-de-linho/1.png",
    "count": 3
  },
  {
    "id": "cat-camisas-regatas",
    "name": "Camisas & Regatas",
    "slug": "camisas-e-regatas",
    "image": "/images/catalog/camisas-e-regatas/camisa-lorena/1.png",
    "count": 5
  },
  {
    "id": "cat-macaquinhos",
    "name": "Macaquinhos",
    "slug": "macaquinhos",
    "image": "/images/catalog/macaquinhos/macaquinho-keyla/1.png",
    "count": 1
  }
];

export const PRODUCTS: Product[] = [
  {
    "id": "miixxe-001",
    "name": "Bermuda Bengaline Plus",
    "slug": "bermuda-bangaline",
    "category": "bermudas-e-shorts",
    "subcategory": "Bermudas Bengaline",
    "price": 50.0,
    "originalPrice": null,
    "comboOffer": "Combo: 3 peças por R$ 110,00",
    "badge": "Oferta",
    "rating": 4.8,
    "reviewsCount": 31,
    "sizes": [
      "42",
      "44",
      "46",
      "48",
      "50",
      "52"
    ],
    "colors": [
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/bermudas-e-shorts/bermuda-bangaline/1.png",
        "stock": 4
      },
      {
        "name": "Preto 2",
        "hex": "#1F1F1F",
        "image": "/images/catalog/bermudas-e-shorts/bermuda-bangaline/2.png",
        "stock": 4
      },
      {
        "name": "Preto 3",
        "hex": "#1F1F1F",
        "image": "/images/catalog/bermudas-e-shorts/bermuda-bangaline/3.png",
        "stock": 4
      },
      {
        "name": "Verde Militar",
        "hex": "#556B2F",
        "image": "/images/catalog/bermudas-e-shorts/bermuda-bangaline/4.png",
        "stock": 4
      },
      {
        "name": "Terracota / Telha",
        "hex": "#C62828",
        "image": "/images/catalog/bermudas-e-shorts/bermuda-bangaline/5.png",
        "stock": 4
      },
      {
        "name": "Preto 4",
        "hex": "#1F1F1F",
        "image": "/images/catalog/bermudas-e-shorts/bermuda-bangaline/6.png",
        "stock": 4
      },
      {
        "name": "Azul Royal",
        "hex": "#1E56A0",
        "image": "/images/catalog/bermudas-e-shorts/bermuda-bangaline/7.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/bermudas-e-shorts/bermuda-bangaline/1.png",
    "gallery": [
      "/images/catalog/bermudas-e-shorts/bermuda-bangaline/1.png",
      "/images/catalog/bermudas-e-shorts/bermuda-bangaline/2.png",
      "/images/catalog/bermudas-e-shorts/bermuda-bangaline/3.png",
      "/images/catalog/bermudas-e-shorts/bermuda-bangaline/4.png",
      "/images/catalog/bermudas-e-shorts/bermuda-bangaline/5.png",
      "/images/catalog/bermudas-e-shorts/bermuda-bangaline/6.png",
      "/images/catalog/bermudas-e-shorts/bermuda-bangaline/7.png"
    ],
    "description": "Bermuda bengaline super confortável com elastano de alta densidade que modela e não marca. Caimento impecável e cós anatômico. Oferta especial combo: 3 por R$ 110,00.",
    "material": "Bengaline Premium com Elastano",
    "stockTotal": 18,
    "sizeStock": {
      "42": 3,
      "44": 3,
      "46": 3,
      "48": 3,
      "50": 3,
      "52": 3
    },
    "section": "novidades"
  },
  {
    "id": "miixxe-002",
    "name": "Bermuda Meia Coxa de Linho",
    "slug": "bermuda-meia-coxa-de-linho",
    "category": "bermudas-e-shorts",
    "subcategory": "Bermudas de Linho",
    "price": 68.0,
    "originalPrice": 80.0,
    "comboOffer": null,
    "badge": "Oferta",
    "rating": 4.9,
    "reviewsCount": 38,
    "sizes": [
      "42",
      "44",
      "46",
      "48",
      "50"
    ],
    "colors": [
      {
        "name": "Branco / Off-White",
        "hex": "#F5F5F5",
        "image": "/images/catalog/bermudas-e-shorts/bermuda-meia-coxa-de-linho/1.png",
        "stock": 4
      },
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/bermudas-e-shorts/bermuda-meia-coxa-de-linho/2.png",
        "stock": 4
      },
      {
        "name": "Verde Militar",
        "hex": "#556B2F",
        "image": "/images/catalog/bermudas-e-shorts/bermuda-meia-coxa-de-linho/3.png",
        "stock": 4
      },
      {
        "name": "Caramelo / Mostarda",
        "hex": "#C49000",
        "image": "/images/catalog/bermudas-e-shorts/bermuda-meia-coxa-de-linho/4.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/bermudas-e-shorts/bermuda-meia-coxa-de-linho/1.png",
    "gallery": [
      "/images/catalog/bermudas-e-shorts/bermuda-meia-coxa-de-linho/1.png",
      "/images/catalog/bermudas-e-shorts/bermuda-meia-coxa-de-linho/2.png",
      "/images/catalog/bermudas-e-shorts/bermuda-meia-coxa-de-linho/3.png",
      "/images/catalog/bermudas-e-shorts/bermuda-meia-coxa-de-linho/4.png"
    ],
    "description": "Bermuda meia coxa elegante em linho misto respirável, ideal para os dias quentes de Manaus. Possui bolsos laterais e botão frontal.",
    "material": "Linho Misto com Viscose",
    "stockTotal": 15,
    "sizeStock": {
      "42": 3,
      "44": 3,
      "46": 3,
      "48": 3,
      "50": 3
    },
    "section": "novidades"
  },
  {
    "id": "miixxe-003",
    "name": "Short Plus Duna com Elástico",
    "slug": "short-plus-duna",
    "category": "bermudas-e-shorts",
    "subcategory": "Shorts Duna",
    "price": 38.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Mais Vendido",
    "rating": 5.0,
    "reviewsCount": 45,
    "sizes": [
      "46",
      "48",
      "50",
      "52"
    ],
    "colors": [
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/bermudas-e-shorts/short-plus-duna/1.png",
        "stock": 4
      },
      {
        "name": "Preto 2",
        "hex": "#1F1F1F",
        "image": "/images/catalog/bermudas-e-shorts/short-plus-duna/2.png",
        "stock": 4
      },
      {
        "name": "Branco / Off-White",
        "hex": "#F5F5F5",
        "image": "/images/catalog/bermudas-e-shorts/short-plus-duna/3.png",
        "stock": 4
      },
      {
        "name": "Branco / Off-White 2",
        "hex": "#F5F5F5",
        "image": "/images/catalog/bermudas-e-shorts/short-plus-duna/4.png",
        "stock": 4
      },
      {
        "name": "Branco / Off-White 3",
        "hex": "#F5F5F5",
        "image": "/images/catalog/bermudas-e-shorts/short-plus-duna/5.png",
        "stock": 4
      },
      {
        "name": "Rosé Blush",
        "hex": "#E8A598",
        "image": "/images/catalog/bermudas-e-shorts/short-plus-duna/6.png",
        "stock": 4
      },
      {
        "name": "Branco / Off-White 4",
        "hex": "#F5F5F5",
        "image": "/images/catalog/bermudas-e-shorts/short-plus-duna/7.png",
        "stock": 4
      },
      {
        "name": "Vermelho Paixão",
        "hex": "#D32F2F",
        "image": "/images/catalog/bermudas-e-shorts/short-plus-duna/8.png",
        "stock": 4
      },
      {
        "name": "Branco / Off-White 5",
        "hex": "#F5F5F5",
        "image": "/images/catalog/bermudas-e-shorts/short-plus-duna/9.png",
        "stock": 4
      },
      {
        "name": "Azul Marinho",
        "hex": "#1A237E",
        "image": "/images/catalog/bermudas-e-shorts/short-plus-duna/10.png",
        "stock": 4
      },
      {
        "name": "Branco / Off-White 6",
        "hex": "#F5F5F5",
        "image": "/images/catalog/bermudas-e-shorts/short-plus-duna/11.png",
        "stock": 4
      },
      {
        "name": "Marrom Chocolate",
        "hex": "#5D4037",
        "image": "/images/catalog/bermudas-e-shorts/short-plus-duna/12.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/bermudas-e-shorts/short-plus-duna/1.png",
    "gallery": [
      "/images/catalog/bermudas-e-shorts/short-plus-duna/1.png",
      "/images/catalog/bermudas-e-shorts/short-plus-duna/2.png",
      "/images/catalog/bermudas-e-shorts/short-plus-duna/3.png",
      "/images/catalog/bermudas-e-shorts/short-plus-duna/4.png",
      "/images/catalog/bermudas-e-shorts/short-plus-duna/5.png",
      "/images/catalog/bermudas-e-shorts/short-plus-duna/6.png",
      "/images/catalog/bermudas-e-shorts/short-plus-duna/7.png",
      "/images/catalog/bermudas-e-shorts/short-plus-duna/8.png",
      "/images/catalog/bermudas-e-shorts/short-plus-duna/9.png",
      "/images/catalog/bermudas-e-shorts/short-plus-duna/10.png",
      "/images/catalog/bermudas-e-shorts/short-plus-duna/11.png",
      "/images/catalog/bermudas-e-shorts/short-plus-duna/12.png"
    ],
    "description": "Short plus em tecido Duna leve e texturizado que não precisa passar. Cós com elástico largo e amarração decorativa. Prático e fresquinho.",
    "material": "Tecido Duna (não amassa)",
    "stockTotal": 12,
    "sizeStock": {
      "46": 3,
      "48": 3,
      "50": 3,
      "52": 3
    },
    "section": "novidades"
  },
  {
    "id": "miixxe-004",
    "name": "Calça Lúcia Alfaiataria",
    "slug": "calca-lucia",
    "category": "calcas",
    "subcategory": "Calças Alfaiataria",
    "price": 128.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Destaque",
    "rating": 4.7,
    "reviewsCount": 52,
    "sizes": [
      "42",
      "44",
      "46",
      "48"
    ],
    "colors": [
      {
        "name": "Marrom Chocolate",
        "hex": "#5D4037",
        "image": "/images/catalog/calcas/calca-lucia/1.png",
        "stock": 4
      },
      {
        "name": "Marrom Chocolate 2",
        "hex": "#5D4037",
        "image": "/images/catalog/calcas/calca-lucia/2.png",
        "stock": 4
      },
      {
        "name": "Verde Oliva",
        "hex": "#6B8E23",
        "image": "/images/catalog/calcas/calca-lucia/3.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/calcas/calca-lucia/1.png",
    "gallery": [
      "/images/catalog/calcas/calca-lucia/1.png",
      "/images/catalog/calcas/calca-lucia/2.png",
      "/images/catalog/calcas/calca-lucia/3.png"
    ],
    "description": "Calça de alfaiataria com corte cenoura refinado, acompanha cinto fino encapado e bolsos faca funcionais. Perfeita para trabalho e ocasiões sofisticadas.",
    "material": "Alfaiataria Premium",
    "stockTotal": 12,
    "sizeStock": {
      "42": 3,
      "44": 3,
      "46": 3,
      "48": 3
    },
    "section": "novidades"
  },
  {
    "id": "miixxe-005",
    "name": "Calça Pantalona Plus Duna",
    "slug": "calca-pantalona-plus-duna",
    "category": "calcas",
    "subcategory": "Calças Pantalona",
    "price": 70.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Novo",
    "rating": 4.8,
    "reviewsCount": 59,
    "sizes": [
      "46",
      "48",
      "50",
      "52"
    ],
    "colors": [
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/calcas/calca-pantalona-plus-duna/1.png",
        "stock": 4
      },
      {
        "name": "Preto 2",
        "hex": "#1F1F1F",
        "image": "/images/catalog/calcas/calca-pantalona-plus-duna/2.png",
        "stock": 4
      },
      {
        "name": "Preto 3",
        "hex": "#1F1F1F",
        "image": "/images/catalog/calcas/calca-pantalona-plus-duna/3.png",
        "stock": 4
      },
      {
        "name": "Preto 4",
        "hex": "#1F1F1F",
        "image": "/images/catalog/calcas/calca-pantalona-plus-duna/4.png",
        "stock": 4
      },
      {
        "name": "Preto 5",
        "hex": "#1F1F1F",
        "image": "/images/catalog/calcas/calca-pantalona-plus-duna/5.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/calcas/calca-pantalona-plus-duna/1.png",
    "gallery": [
      "/images/catalog/calcas/calca-pantalona-plus-duna/1.png",
      "/images/catalog/calcas/calca-pantalona-plus-duna/2.png",
      "/images/catalog/calcas/calca-pantalona-plus-duna/3.png",
      "/images/catalog/calcas/calca-pantalona-plus-duna/4.png",
      "/images/catalog/calcas/calca-pantalona-plus-duna/5.png"
    ],
    "description": "Calça pantalona ampla e esvoaçante que alonga a silhueta com máximo conforto. Cós alto com elástico traseiro.",
    "material": "Tecido Duna Fluido",
    "stockTotal": 12,
    "sizeStock": {
      "46": 3,
      "48": 3,
      "50": 3,
      "52": 3
    },
    "section": "novidades"
  },
  {
    "id": "miixxe-006",
    "name": "Calça Skinny de Alfaiataria",
    "slug": "calca-skinny-de-alfaiataria",
    "category": "calcas",
    "subcategory": "Calças Alfaiataria",
    "price": 90.0,
    "originalPrice": 110.0,
    "comboOffer": null,
    "badge": "Oferta",
    "rating": 4.9,
    "reviewsCount": 66,
    "sizes": [
      "44",
      "46",
      "48",
      "50",
      "52"
    ],
    "colors": [
      {
        "name": "Estampado Floral",
        "hex": "#4A6572",
        "image": "/images/catalog/calcas/calca-skinny-de-alfaiataria/1.png",
        "stock": 4
      },
      {
        "name": "Estampado Floral 2",
        "hex": "#4A6572",
        "image": "/images/catalog/calcas/calca-skinny-de-alfaiataria/2.png",
        "stock": 4
      },
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/calcas/calca-skinny-de-alfaiataria/3.png",
        "stock": 4
      },
      {
        "name": "Preto 2",
        "hex": "#1F1F1F",
        "image": "/images/catalog/calcas/calca-skinny-de-alfaiataria/4.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/calcas/calca-skinny-de-alfaiataria/1.png",
    "gallery": [
      "/images/catalog/calcas/calca-skinny-de-alfaiataria/1.png",
      "/images/catalog/calcas/calca-skinny-de-alfaiataria/2.png",
      "/images/catalog/calcas/calca-skinny-de-alfaiataria/3.png",
      "/images/catalog/calcas/calca-skinny-de-alfaiataria/4.png"
    ],
    "description": "Calça skinny em alfaiataria nobre com detalhe de pregas e bolsos frontais. Veste com elegância e liberdade de movimento.",
    "material": "Alfaiataria com Elastano",
    "stockTotal": 15,
    "sizeStock": {
      "44": 3,
      "46": 3,
      "48": 3,
      "50": 3,
      "52": 3
    },
    "section": "novidades"
  },
  {
    "id": "miixxe-007",
    "name": "Blusa T-Shirt Estampada Chic",
    "slug": "blusa-t-shit",
    "category": "camisas-e-regatas",
    "subcategory": "T-Shirts",
    "price": 49.9,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Novo",
    "rating": 5.0,
    "reviewsCount": 73,
    "sizes": [
      "GG (44-46)",
      "G2 (48-50)"
    ],
    "colors": [
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/camisas-e-regatas/blusa-t-shit/1.png",
        "stock": 4
      },
      {
        "name": "Rosé Blush",
        "hex": "#E8A598",
        "image": "/images/catalog/camisas-e-regatas/blusa-t-shit/2.png",
        "stock": 4
      },
      {
        "name": "Branco / Off-White",
        "hex": "#F5F5F5",
        "image": "/images/catalog/camisas-e-regatas/blusa-t-shit/3.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/camisas-e-regatas/blusa-t-shit/1.png",
    "gallery": [
      "/images/catalog/camisas-e-regatas/blusa-t-shit/1.png",
      "/images/catalog/camisas-e-regatas/blusa-t-shit/2.png",
      "/images/catalog/camisas-e-regatas/blusa-t-shit/3.png"
    ],
    "description": "T-shirt luxo com estampas exclusivas e detalhes sutis em pedraria na gola. Toque macio e caimento soltinho.",
    "material": "Algodão com Pedraria e Silk Nobre",
    "stockTotal": 6,
    "sizeStock": {
      "GG (44-46)": 3,
      "G2 (48-50)": 3
    },
    "section": "novidades"
  },
  {
    "id": "miixxe-008",
    "name": "Camisa Lorena Linho Manga Curta",
    "slug": "camisa-lorena",
    "category": "camisas-e-regatas",
    "subcategory": "Camisas",
    "price": 58.0,
    "originalPrice": 65.0,
    "comboOffer": null,
    "badge": "Oferta",
    "rating": 4.7,
    "reviewsCount": 80,
    "sizes": [
      "42",
      "44",
      "46",
      "48"
    ],
    "colors": [
      {
        "name": "Terracota / Telha",
        "hex": "#C62828",
        "image": "/images/catalog/camisas-e-regatas/camisa-lorena/1.png",
        "stock": 4
      },
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/camisas-e-regatas/camisa-lorena/2.png",
        "stock": 4
      },
      {
        "name": "Branco / Off-White",
        "hex": "#F5F5F5",
        "image": "/images/catalog/camisas-e-regatas/camisa-lorena/3.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/camisas-e-regatas/camisa-lorena/1.png",
    "gallery": [
      "/images/catalog/camisas-e-regatas/camisa-lorena/1.png",
      "/images/catalog/camisas-e-regatas/camisa-lorena/2.png",
      "/images/catalog/camisas-e-regatas/camisa-lorena/3.png"
    ],
    "description": "Camisa clássica com colarinho e botões frontais contrastantes. Tecido fresco e fluido ideal para compor com bermudas e calças.",
    "material": "Viscose com Toque de Linho",
    "stockTotal": 12,
    "sizeStock": {
      "42": 3,
      "44": 3,
      "46": 3,
      "48": 3
    },
    "section": "novidades"
  },
  {
    "id": "miixxe-009",
    "name": "Camiseta Básica Ribana Premium",
    "slug": "camisa-ribana",
    "category": "camisas-e-regatas",
    "subcategory": "Camisetas",
    "price": 50.0,
    "originalPrice": 65.0,
    "comboOffer": null,
    "badge": "Oferta",
    "rating": 4.8,
    "reviewsCount": 87,
    "sizes": [
      "44/46",
      "46/48"
    ],
    "colors": [
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/camisas-e-regatas/camisa-ribana/1.png",
        "stock": 4
      },
      {
        "name": "Rosé Blush",
        "hex": "#E8A598",
        "image": "/images/catalog/camisas-e-regatas/camisa-ribana/2.png",
        "stock": 4
      },
      {
        "name": "Preto 2",
        "hex": "#1F1F1F",
        "image": "/images/catalog/camisas-e-regatas/camisa-ribana/3.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/camisas-e-regatas/camisa-ribana/1.png",
    "gallery": [
      "/images/catalog/camisas-e-regatas/camisa-ribana/1.png",
      "/images/catalog/camisas-e-regatas/camisa-ribana/2.png",
      "/images/catalog/camisas-e-regatas/camisa-ribana/3.png"
    ],
    "description": "Camiseta em ribana canelada que ajusta suavemente ao corpo com toque ultra macio. Peça coringa para o dia a dia.",
    "material": "Malha Canelada Ribana com Elastano",
    "stockTotal": 6,
    "sizeStock": {
      "44/46": 3,
      "46/48": 3
    },
    "section": "novidades"
  },
  {
    "id": "miixxe-010",
    "name": "Camiseta Luara Decote Canoa",
    "slug": "camiseta-luara",
    "category": "camisas-e-regatas",
    "subcategory": "Camisetas",
    "price": 65.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Novo",
    "rating": 4.9,
    "reviewsCount": 94,
    "sizes": [
      "44",
      "46",
      "48"
    ],
    "colors": [
      {
        "name": "Azul Marinho",
        "hex": "#1A237E",
        "image": "/images/catalog/camisas-e-regatas/camiseta-luara/1.png",
        "stock": 4
      },
      {
        "name": "Estampado Floral",
        "hex": "#4A6572",
        "image": "/images/catalog/camisas-e-regatas/camiseta-luara/2.png",
        "stock": 4
      },
      {
        "name": "Azul Marinho 2",
        "hex": "#1A237E",
        "image": "/images/catalog/camisas-e-regatas/camiseta-luara/3.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/camisas-e-regatas/camiseta-luara/1.png",
    "gallery": [
      "/images/catalog/camisas-e-regatas/camiseta-luara/1.png",
      "/images/catalog/camisas-e-regatas/camiseta-luara/2.png",
      "/images/catalog/camisas-e-regatas/camiseta-luara/3.png"
    ],
    "description": "Camiseta ampla com decote canoa e mangas fluidas. Peça moderna com caimento leve para compor looks casuais ou formais.",
    "material": "Crepe Soft Premium",
    "stockTotal": 9,
    "sizeStock": {
      "44": 3,
      "46": 3,
      "48": 3
    },
    "section": "novidades"
  },
  {
    "id": "miixxe-011",
    "name": "Regata Ribana Gola Alta Americana",
    "slug": "regata-ribana",
    "category": "camisas-e-regatas",
    "subcategory": "Regatas",
    "price": 50.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Mais Vendido",
    "rating": 5.0,
    "reviewsCount": 101,
    "sizes": [
      "44/46",
      "46/48"
    ],
    "colors": [
      {
        "name": "Vinho Marsala",
        "hex": "#6B0833",
        "image": "/images/catalog/camisas-e-regatas/regata-ribana/1.png",
        "stock": 4
      },
      {
        "name": "Branco / Off-White",
        "hex": "#F5F5F5",
        "image": "/images/catalog/camisas-e-regatas/regata-ribana/2.png",
        "stock": 4
      },
      {
        "name": "Marrom Chocolate",
        "hex": "#5D4037",
        "image": "/images/catalog/camisas-e-regatas/regata-ribana/3.png",
        "stock": 4
      },
      {
        "name": "Estampado Floral",
        "hex": "#4A6572",
        "image": "/images/catalog/camisas-e-regatas/regata-ribana/4.png",
        "stock": 4
      },
      {
        "name": "Marrom Chocolate 2",
        "hex": "#5D4037",
        "image": "/images/catalog/camisas-e-regatas/regata-ribana/5.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/camisas-e-regatas/regata-ribana/1.png",
    "gallery": [
      "/images/catalog/camisas-e-regatas/regata-ribana/1.png",
      "/images/catalog/camisas-e-regatas/regata-ribana/2.png",
      "/images/catalog/camisas-e-regatas/regata-ribana/3.png",
      "/images/catalog/camisas-e-regatas/regata-ribana/4.png",
      "/images/catalog/camisas-e-regatas/regata-ribana/5.png"
    ],
    "description": "Regata clássica com decote estilo americano e gola alta discreta. Valoriza os ombros e traz versatilidade aos looks.",
    "material": "Ribana Canelada",
    "stockTotal": 6,
    "sizeStock": {
      "44/46": 3,
      "46/48": 3
    },
    "section": "mais-vendidos"
  },
  {
    "id": "miixxe-012",
    "name": "Conjunto Kimono e Calça Pantalona",
    "slug": "conjunto-kimono-de-calca",
    "category": "conjuntos-de-calca",
    "subcategory": "Conjuntos Kimono",
    "price": 148.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Destaque",
    "rating": 4.7,
    "reviewsCount": 28,
    "sizes": [
      "48",
      "50"
    ],
    "colors": [
      {
        "name": "Vinho Marsala",
        "hex": "#6B0833",
        "image": "/images/catalog/conjuntos-de-calca/conjunto-kimono-de-calca/1.png",
        "stock": 4
      },
      {
        "name": "Vinho Marsala 2",
        "hex": "#6B0833",
        "image": "/images/catalog/conjuntos-de-calca/conjunto-kimono-de-calca/2.png",
        "stock": 4
      },
      {
        "name": "Marrom Chocolate",
        "hex": "#5D4037",
        "image": "/images/catalog/conjuntos-de-calca/conjunto-kimono-de-calca/3.png",
        "stock": 4
      },
      {
        "name": "Marrom Chocolate 2",
        "hex": "#5D4037",
        "image": "/images/catalog/conjuntos-de-calca/conjunto-kimono-de-calca/4.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/conjuntos-de-calca/conjunto-kimono-de-calca/1.png",
    "gallery": [
      "/images/catalog/conjuntos-de-calca/conjunto-kimono-de-calca/1.png",
      "/images/catalog/conjuntos-de-calca/conjunto-kimono-de-calca/2.png",
      "/images/catalog/conjuntos-de-calca/conjunto-kimono-de-calca/3.png",
      "/images/catalog/conjuntos-de-calca/conjunto-kimono-de-calca/4.png"
    ],
    "description": "Conjunto espetacular composto por kimono alongado fluido e calça pantalona de cintura alta com elástico. Puro charme e elegância.",
    "material": "Viscolinho Soft",
    "stockTotal": 6,
    "sizeStock": {
      "48": 3,
      "50": 3
    },
    "section": "mais-vendidos"
  },
  {
    "id": "miixxe-013",
    "name": "Conjunto Sheyla Alfaiataria",
    "slug": "conjunto-sheyla",
    "category": "conjuntos-de-calca",
    "subcategory": "Conjuntos Alfaiataria",
    "price": 168.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Festa",
    "rating": 4.8,
    "reviewsCount": 35,
    "sizes": [
      "48",
      "50",
      "52"
    ],
    "colors": [
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/conjuntos-de-calca/conjunto-sheyla/1.png",
        "stock": 4
      },
      {
        "name": "Preto 2",
        "hex": "#1F1F1F",
        "image": "/images/catalog/conjuntos-de-calca/conjunto-sheyla/2.png",
        "stock": 4
      },
      {
        "name": "Azul Royal",
        "hex": "#1E56A0",
        "image": "/images/catalog/conjuntos-de-calca/conjunto-sheyla/3.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/conjuntos-de-calca/conjunto-sheyla/1.png",
    "gallery": [
      "/images/catalog/conjuntos-de-calca/conjunto-sheyla/1.png",
      "/images/catalog/conjuntos-de-calca/conjunto-sheyla/2.png",
      "/images/catalog/conjuntos-de-calca/conjunto-sheyla/3.png"
    ],
    "description": "Conjunto de alta costura com colete regata zíper dourado e calça reta com pregas. Presença marcante em eventos e reuniões.",
    "material": "Crepe de Alfaiataria",
    "stockTotal": 9,
    "sizeStock": {
      "48": 3,
      "50": 3,
      "52": 3
    },
    "section": "mais-vendidos"
  },
  {
    "id": "miixxe-014",
    "name": "Conjunto Kimono e Short Estampado",
    "slug": "conjnto-kimono",
    "category": "conjuntos-de-shorts",
    "subcategory": "Conjuntos Kimono",
    "price": 128.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Destaque",
    "rating": 4.9,
    "reviewsCount": 42,
    "sizes": [
      "46",
      "48",
      "50"
    ],
    "colors": [
      {
        "name": "Branco / Off-White",
        "hex": "#F5F5F5",
        "image": "/images/catalog/conjuntos-de-shorts/conjnto-kimono/1.png",
        "stock": 4
      },
      {
        "name": "Branco / Off-White 2",
        "hex": "#F5F5F5",
        "image": "/images/catalog/conjuntos-de-shorts/conjnto-kimono/2.png",
        "stock": 4
      },
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/conjuntos-de-shorts/conjnto-kimono/3.png",
        "stock": 4
      },
      {
        "name": "Marrom Chocolate",
        "hex": "#5D4037",
        "image": "/images/catalog/conjuntos-de-shorts/conjnto-kimono/4.png",
        "stock": 4
      },
      {
        "name": "Branco / Off-White 3",
        "hex": "#F5F5F5",
        "image": "/images/catalog/conjuntos-de-shorts/conjnto-kimono/5.png",
        "stock": 4
      },
      {
        "name": "Azul Royal",
        "hex": "#1E56A0",
        "image": "/images/catalog/conjuntos-de-shorts/conjnto-kimono/6.png",
        "stock": 4
      },
      {
        "name": "Pink Fúcsia",
        "hex": "#C2185B",
        "image": "/images/catalog/conjuntos-de-shorts/conjnto-kimono/7.png",
        "stock": 4
      },
      {
        "name": "Azul Céu",
        "hex": "#64B5F6",
        "image": "/images/catalog/conjuntos-de-shorts/conjnto-kimono/8.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/conjuntos-de-shorts/conjnto-kimono/1.png",
    "gallery": [
      "/images/catalog/conjuntos-de-shorts/conjnto-kimono/1.png",
      "/images/catalog/conjuntos-de-shorts/conjnto-kimono/2.png",
      "/images/catalog/conjuntos-de-shorts/conjnto-kimono/3.png",
      "/images/catalog/conjuntos-de-shorts/conjnto-kimono/4.png",
      "/images/catalog/conjuntos-de-shorts/conjnto-kimono/5.png",
      "/images/catalog/conjuntos-de-shorts/conjnto-kimono/6.png",
      "/images/catalog/conjuntos-de-shorts/conjnto-kimono/7.png",
      "/images/catalog/conjuntos-de-shorts/conjnto-kimono/8.png"
    ],
    "description": "Conjunto moderno com kimono manga 3/4 e short com elástico. Estampas tropicais exclusivas cheias de vida.",
    "material": "Viscose de Alta Densidade",
    "stockTotal": 9,
    "sizeStock": {
      "46": 3,
      "48": 3,
      "50": 3
    },
    "section": "mais-vendidos"
  },
  {
    "id": "miixxe-015",
    "name": "Conjunto Bella Colete e Short",
    "slug": "conjunto-bella",
    "category": "conjuntos-de-shorts",
    "subcategory": "Conjuntos Alfaiataria",
    "price": 168.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Novo",
    "rating": 5.0,
    "reviewsCount": 49,
    "sizes": [
      "46",
      "48",
      "50"
    ],
    "colors": [
      {
        "name": "Rosé Blush",
        "hex": "#E8A598",
        "image": "/images/catalog/conjuntos-de-shorts/conjunto-bella/1.png",
        "stock": 4
      },
      {
        "name": "Rosé Blush 2",
        "hex": "#E8A598",
        "image": "/images/catalog/conjuntos-de-shorts/conjunto-bella/2.png",
        "stock": 4
      },
      {
        "name": "Marrom Chocolate",
        "hex": "#5D4037",
        "image": "/images/catalog/conjuntos-de-shorts/conjunto-bella/3.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/conjuntos-de-shorts/conjunto-bella/1.png",
    "gallery": [
      "/images/catalog/conjuntos-de-shorts/conjunto-bella/1.png",
      "/images/catalog/conjuntos-de-shorts/conjunto-bella/2.png",
      "/images/catalog/conjuntos-de-shorts/conjunto-bella/3.png"
    ],
    "description": "Conjunto com colete de alfaiataria com botões forrados e short meia coxa com bolsos faca. Requinte atemporal.",
    "material": "Linho Misto com Alfaiataria",
    "stockTotal": 9,
    "sizeStock": {
      "46": 3,
      "48": 3,
      "50": 3
    },
    "section": "mais-vendidos"
  },
  {
    "id": "miixxe-016",
    "name": "Conjunto Dandara Blusa e Short",
    "slug": "conjunto-dandara",
    "category": "conjuntos-de-shorts",
    "subcategory": "Conjuntos Casuais",
    "price": 128.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Mais Vendido",
    "rating": 4.7,
    "reviewsCount": 56,
    "sizes": [
      "46",
      "48"
    ],
    "colors": [
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/conjuntos-de-shorts/conjunto-dandara/1.png",
        "stock": 4
      },
      {
        "name": "Preto 2",
        "hex": "#1F1F1F",
        "image": "/images/catalog/conjuntos-de-shorts/conjunto-dandara/2.png",
        "stock": 4
      },
      {
        "name": "Marrom Chocolate",
        "hex": "#5D4037",
        "image": "/images/catalog/conjuntos-de-shorts/conjunto-dandara/3.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/conjuntos-de-shorts/conjunto-dandara/1.png",
    "gallery": [
      "/images/catalog/conjuntos-de-shorts/conjunto-dandara/1.png",
      "/images/catalog/conjuntos-de-shorts/conjunto-dandara/2.png",
      "/images/catalog/conjuntos-de-shorts/conjunto-dandara/3.png"
    ],
    "description": "Conjunto prático e refinado com regata decote V e short de cintura alta com amarração frontal.",
    "material": "Crepe Duna Especial",
    "stockTotal": 6,
    "sizeStock": {
      "46": 3,
      "48": 3
    },
    "section": "mais-vendidos"
  },
  {
    "id": "miixxe-017",
    "name": "Conjunto Danny Colete Botões e Short",
    "slug": "conjunto-danny",
    "category": "conjuntos-de-shorts",
    "subcategory": "Conjuntos Alfaiataria",
    "price": 128.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Oferta",
    "rating": 4.8,
    "reviewsCount": 63,
    "sizes": [
      "44",
      "46",
      "48",
      "50"
    ],
    "colors": [
      {
        "name": "Amarelo Canário",
        "hex": "#FDD835",
        "image": "/images/catalog/conjuntos-de-shorts/conjunto-danny/1.png",
        "stock": 4
      },
      {
        "name": "Amarelo Canário 2",
        "hex": "#FDD835",
        "image": "/images/catalog/conjuntos-de-shorts/conjunto-danny/2.png",
        "stock": 4
      },
      {
        "name": "Marrom Chocolate",
        "hex": "#5D4037",
        "image": "/images/catalog/conjuntos-de-shorts/conjunto-danny/3.png",
        "stock": 4
      },
      {
        "name": "Rosé Blush",
        "hex": "#E8A598",
        "image": "/images/catalog/conjuntos-de-shorts/conjunto-danny/4.png",
        "stock": 4
      },
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/conjuntos-de-shorts/conjunto-danny/5.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/conjuntos-de-shorts/conjunto-danny/1.png",
    "gallery": [
      "/images/catalog/conjuntos-de-shorts/conjunto-danny/1.png",
      "/images/catalog/conjuntos-de-shorts/conjunto-danny/2.png",
      "/images/catalog/conjuntos-de-shorts/conjunto-danny/3.png",
      "/images/catalog/conjuntos-de-shorts/conjunto-danny/4.png",
      "/images/catalog/conjuntos-de-shorts/conjunto-danny/5.png"
    ],
    "description": "Conjunto alegre e elegante composto por colete acinturado com abotoamento frontal e short combinando.",
    "material": "Tecido Duna Estruturado",
    "stockTotal": 12,
    "sizeStock": {
      "44": 3,
      "46": 3,
      "48": 3,
      "50": 3
    },
    "section": "mais-vendidos"
  },
  {
    "id": "miixxe-018",
    "name": "Conjunto Gabi Militar",
    "slug": "conjunto-gabi",
    "category": "conjuntos-de-shorts",
    "subcategory": "Conjuntos Casuais",
    "price": 148.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Novo",
    "rating": 4.9,
    "reviewsCount": 70,
    "sizes": [
      "44",
      "46"
    ],
    "colors": [
      {
        "name": "Marrom Chocolate",
        "hex": "#5D4037",
        "image": "/images/catalog/conjuntos-de-shorts/conjunto-gabi/1.png",
        "stock": 4
      },
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/conjuntos-de-shorts/conjunto-gabi/2.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/conjuntos-de-shorts/conjunto-gabi/1.png",
    "gallery": [
      "/images/catalog/conjuntos-de-shorts/conjunto-gabi/1.png",
      "/images/catalog/conjuntos-de-shorts/conjunto-gabi/2.png"
    ],
    "description": "Conjunto casual chic em tom verde militar com zíper frontal no busto e short confortável.",
    "material": "Viscose com Poliamida",
    "stockTotal": 6,
    "sizeStock": {
      "44": 3,
      "46": 3
    },
    "section": "mais-vendidos"
  },
  {
    "id": "miixxe-019",
    "name": "Conjunto Laura Blusa Manga e Short Cinto",
    "slug": "conjunto-laura",
    "category": "conjuntos-de-shorts",
    "subcategory": "Conjuntos Casuais",
    "price": 128.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Mais Vendido",
    "rating": 5.0,
    "reviewsCount": 77,
    "sizes": [
      "50",
      "52",
      "54"
    ],
    "colors": [
      {
        "name": "Rosé Blush",
        "hex": "#E8A598",
        "image": "/images/catalog/conjuntos-de-shorts/conjunto-laura/1.png",
        "stock": 4
      },
      {
        "name": "Rosé Blush 2",
        "hex": "#E8A598",
        "image": "/images/catalog/conjuntos-de-shorts/conjunto-laura/2.png",
        "stock": 4
      },
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/conjuntos-de-shorts/conjunto-laura/3.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/conjuntos-de-shorts/conjunto-laura/1.png",
    "gallery": [
      "/images/catalog/conjuntos-de-shorts/conjunto-laura/1.png",
      "/images/catalog/conjuntos-de-shorts/conjunto-laura/2.png",
      "/images/catalog/conjuntos-de-shorts/conjunto-laura/3.png"
    ],
    "description": "Conjunto em malha premium com toque aveludado. Blusa manga curta e short com cinto faixa incluso.",
    "material": "Malha Viscolycra Nobre",
    "stockTotal": 9,
    "sizeStock": {
      "50": 3,
      "52": 3,
      "54": 3
    },
    "section": "mais-vendidos"
  },
  {
    "id": "miixxe-020",
    "name": "Conjunto Lolla Blusa Ampla e Short",
    "slug": "conjunto-lolla",
    "category": "conjuntos-de-shorts",
    "subcategory": "Conjuntos Casuais",
    "price": 68.0,
    "originalPrice": 80.0,
    "comboOffer": null,
    "badge": "Oferta",
    "rating": 4.7,
    "reviewsCount": 84,
    "sizes": [
      "46 (G1)",
      "48 (G2)",
      "50 (G3)"
    ],
    "colors": [
      {
        "name": "Terracota / Telha",
        "hex": "#C62828",
        "image": "/images/catalog/conjuntos-de-shorts/conjunto-lolla/1.png",
        "stock": 4
      },
      {
        "name": "Terracota / Telha 2",
        "hex": "#C62828",
        "image": "/images/catalog/conjuntos-de-shorts/conjunto-lolla/2.png",
        "stock": 4
      },
      {
        "name": "Marrom Chocolate",
        "hex": "#5D4037",
        "image": "/images/catalog/conjuntos-de-shorts/conjunto-lolla/3.png",
        "stock": 4
      },
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/conjuntos-de-shorts/conjunto-lolla/4.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/conjuntos-de-shorts/conjunto-lolla/1.png",
    "gallery": [
      "/images/catalog/conjuntos-de-shorts/conjunto-lolla/1.png",
      "/images/catalog/conjuntos-de-shorts/conjunto-lolla/2.png",
      "/images/catalog/conjuntos-de-shorts/conjunto-lolla/3.png",
      "/images/catalog/conjuntos-de-shorts/conjunto-lolla/4.png"
    ],
    "description": "Conjunto com blusa gola canoa soltinha e short de elástico. Caimento solto que prioriza o bem-estar e a beleza.",
    "material": "Duna Texturizado",
    "stockTotal": 9,
    "sizeStock": {
      "46 (G1)": 3,
      "48 (G2)": 3,
      "50 (G3)": 3
    },
    "section": "mais-vendidos"
  },
  {
    "id": "miixxe-021",
    "name": "Conjunto Lúcia Colete e Bermuda",
    "slug": "conjunto-lucia",
    "category": "conjuntos-de-shorts",
    "subcategory": "Conjuntos Alfaiataria",
    "price": 168.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Destaque",
    "rating": 4.8,
    "reviewsCount": 91,
    "sizes": [
      "50",
      "52",
      "54"
    ],
    "colors": [
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/conjuntos-de-shorts/conjunto-lucia/1.png",
        "stock": 4
      },
      {
        "name": "Preto 2",
        "hex": "#1F1F1F",
        "image": "/images/catalog/conjuntos-de-shorts/conjunto-lucia/2.png",
        "stock": 4
      },
      {
        "name": "Rosé Blush",
        "hex": "#E8A598",
        "image": "/images/catalog/conjuntos-de-shorts/conjunto-lucia/3.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/conjuntos-de-shorts/conjunto-lucia/1.png",
    "gallery": [
      "/images/catalog/conjuntos-de-shorts/conjunto-lucia/1.png",
      "/images/catalog/conjuntos-de-shorts/conjunto-lucia/2.png",
      "/images/catalog/conjuntos-de-shorts/conjunto-lucia/3.png"
    ],
    "description": "Conjunto plus size exuberante com colete alongado forrado e short de cós anatômico.",
    "material": "Crepe de Alfaiataria Encorpado",
    "stockTotal": 9,
    "sizeStock": {
      "50": 3,
      "52": 3,
      "54": 3
    },
    "section": "colecao-festa"
  },
  {
    "id": "miixxe-022",
    "name": "Conjunto Ritinha Básico Conforto",
    "slug": "conjunto-ritinha",
    "category": "conjuntos-de-shorts",
    "subcategory": "Conjuntos Casuais",
    "price": 80.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Novo",
    "rating": 4.9,
    "reviewsCount": 98,
    "sizes": [
      "44/46",
      "48/50"
    ],
    "colors": [
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/conjuntos-de-shorts/conjunto-ritinha/1.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/conjuntos-de-shorts/conjunto-ritinha/1.png",
    "gallery": [
      "/images/catalog/conjuntos-de-shorts/conjunto-ritinha/1.png"
    ],
    "description": "Conjunto leve e básico para o dia a dia manauara com blusa decote V e short cós elástico.",
    "material": "Viscose Respirável",
    "stockTotal": 6,
    "sizeStock": {
      "44/46": 3,
      "48/50": 3
    },
    "section": "colecao-festa"
  },
  {
    "id": "miixxe-023",
    "name": "Conjunto Zara Alfaiataria Off-White",
    "slug": "conjunto-zara",
    "category": "conjuntos-de-shorts",
    "subcategory": "Conjuntos Alfaiataria",
    "price": 148.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Festa",
    "rating": 5.0,
    "reviewsCount": 25,
    "sizes": [
      "46",
      "48",
      "50",
      "52"
    ],
    "colors": [
      {
        "name": "Rosé Blush",
        "hex": "#E8A598",
        "image": "/images/catalog/conjuntos-de-shorts/conjunto-zara/1.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/conjuntos-de-shorts/conjunto-zara/1.png",
    "gallery": [
      "/images/catalog/conjuntos-de-shorts/conjunto-zara/1.png"
    ],
    "description": "Peça impecável em alfaiataria clara com recortes precisos e acabamento de alta qualidade.",
    "material": "Alfaiataria Premium",
    "stockTotal": 12,
    "sizeStock": {
      "46": 3,
      "48": 3,
      "50": 3,
      "52": 3
    },
    "section": "colecao-festa"
  },
  {
    "id": "miixxe-024",
    "name": "Trijunto de Alfaiataria 3 Peças",
    "slug": "trijunto-de-alfaiateria",
    "category": "conjuntos-de-shorts",
    "subcategory": "Trijuntos",
    "price": 198.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Destaque",
    "rating": 4.7,
    "reviewsCount": 32,
    "sizes": [
      "46",
      "48",
      "50"
    ],
    "colors": [
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/conjuntos-de-shorts/trijunto-de-alfaiateria/1.png",
        "stock": 4
      },
      {
        "name": "Rosé Blush",
        "hex": "#E8A598",
        "image": "/images/catalog/conjuntos-de-shorts/trijunto-de-alfaiateria/2.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/conjuntos-de-shorts/trijunto-de-alfaiateria/1.png",
    "gallery": [
      "/images/catalog/conjuntos-de-shorts/trijunto-de-alfaiateria/1.png",
      "/images/catalog/conjuntos-de-shorts/trijunto-de-alfaiateria/2.png"
    ],
    "description": "Trijunto de luxo completo: Blazer de alfaiataria, cropped com alças largas e short estruturado. O look definitivo para eventos marcantes.",
    "material": "Alfaiataria Premium Fina",
    "stockTotal": 9,
    "sizeStock": {
      "46": 3,
      "48": 3,
      "50": 3
    },
    "section": "colecao-festa"
  },
  {
    "id": "miixxe-025",
    "name": "Macaquinho Keyla com Babado",
    "slug": "macaquinho-keyla",
    "category": "macaquinhos",
    "subcategory": "Macaquinhos",
    "price": 78.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Mais Vendido",
    "rating": 4.8,
    "reviewsCount": 39,
    "sizes": [
      "44",
      "46",
      "48"
    ],
    "colors": [
      {
        "name": "Marrom Chocolate",
        "hex": "#5D4037",
        "image": "/images/catalog/macaquinhos/macaquinho-keyla/1.png",
        "stock": 4
      },
      {
        "name": "Rosé Blush",
        "hex": "#E8A598",
        "image": "/images/catalog/macaquinhos/macaquinho-keyla/2.png",
        "stock": 4
      },
      {
        "name": "Marrom Chocolate 2",
        "hex": "#5D4037",
        "image": "/images/catalog/macaquinhos/macaquinho-keyla/3.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/macaquinhos/macaquinho-keyla/1.png",
    "gallery": [
      "/images/catalog/macaquinhos/macaquinho-keyla/1.png",
      "/images/catalog/macaquinhos/macaquinho-keyla/2.png",
      "/images/catalog/macaquinhos/macaquinho-keyla/3.png"
    ],
    "description": "Macaquinho charmoso com alças em babados delicados, decote V com botões e cintura com elástico franzido.",
    "material": "Crepe Duna com Elastano",
    "stockTotal": 9,
    "sizeStock": {
      "44": 3,
      "46": 3,
      "48": 3
    },
    "section": "colecao-festa"
  },
  {
    "id": "miixxe-026",
    "name": "Chemise Keyla Curto com Botões",
    "slug": "chemise-keyla-curto",
    "category": "vestidos-curtos",
    "subcategory": "Chemises",
    "price": 78.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Mais Vendido",
    "rating": 4.9,
    "reviewsCount": 46,
    "sizes": [
      "G (44/46)",
      "GG (48/50)"
    ],
    "colors": [
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/vestidos-curtos/chemise-keyla-curto/1.png",
        "stock": 4
      },
      {
        "name": "Preto 2",
        "hex": "#1F1F1F",
        "image": "/images/catalog/vestidos-curtos/chemise-keyla-curto/2.png",
        "stock": 4
      },
      {
        "name": "Terracota / Telha",
        "hex": "#C62828",
        "image": "/images/catalog/vestidos-curtos/chemise-keyla-curto/3.png",
        "stock": 4
      },
      {
        "name": "Marrom Chocolate",
        "hex": "#5D4037",
        "image": "/images/catalog/vestidos-curtos/chemise-keyla-curto/4.png",
        "stock": 4
      },
      {
        "name": "Rosé Blush",
        "hex": "#E8A598",
        "image": "/images/catalog/vestidos-curtos/chemise-keyla-curto/5.png",
        "stock": 4
      },
      {
        "name": "Rosé Blush 2",
        "hex": "#E8A598",
        "image": "/images/catalog/vestidos-curtos/chemise-keyla-curto/6.png",
        "stock": 4
      },
      {
        "name": "Verde Esmeralda",
        "hex": "#00695C",
        "image": "/images/catalog/vestidos-curtos/chemise-keyla-curto/7.png",
        "stock": 4
      },
      {
        "name": "Preto 3",
        "hex": "#1F1F1F",
        "image": "/images/catalog/vestidos-curtos/chemise-keyla-curto/8.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/vestidos-curtos/chemise-keyla-curto/1.png",
    "gallery": [
      "/images/catalog/vestidos-curtos/chemise-keyla-curto/1.png",
      "/images/catalog/vestidos-curtos/chemise-keyla-curto/2.png",
      "/images/catalog/vestidos-curtos/chemise-keyla-curto/3.png",
      "/images/catalog/vestidos-curtos/chemise-keyla-curto/4.png",
      "/images/catalog/vestidos-curtos/chemise-keyla-curto/5.png",
      "/images/catalog/vestidos-curtos/chemise-keyla-curto/6.png",
      "/images/catalog/vestidos-curtos/chemise-keyla-curto/7.png",
      "/images/catalog/vestidos-curtos/chemise-keyla-curto/8.png"
    ],
    "description": "Vestido chemise estilo camisão manga curta com fechamento por botões frontais e faixa para ajuste na cintura.",
    "material": "Viscose Sarjada",
    "stockTotal": 6,
    "sizeStock": {
      "G (44/46)": 3,
      "GG (48/50)": 3
    },
    "section": "colecao-festa"
  },
  {
    "id": "miixxe-027",
    "name": "Vestido Liz Ciganinha Três Marias",
    "slug": "vestido-liz",
    "category": "vestidos-curtos",
    "subcategory": "Vestidos Curtos",
    "price": 128.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Novo",
    "rating": 5.0,
    "reviewsCount": 53,
    "sizes": [
      "48",
      "50",
      "52",
      "54"
    ],
    "colors": [
      {
        "name": "Terracota / Telha",
        "hex": "#C62828",
        "image": "/images/catalog/vestidos-curtos/vestido-liz/1.png",
        "stock": 4
      },
      {
        "name": "Marrom Chocolate",
        "hex": "#5D4037",
        "image": "/images/catalog/vestidos-curtos/vestido-liz/2.png",
        "stock": 4
      },
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/vestidos-curtos/vestido-liz/3.png",
        "stock": 4
      },
      {
        "name": "Preto 2",
        "hex": "#1F1F1F",
        "image": "/images/catalog/vestidos-curtos/vestido-liz/4.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/vestidos-curtos/vestido-liz/1.png",
    "gallery": [
      "/images/catalog/vestidos-curtos/vestido-liz/1.png",
      "/images/catalog/vestidos-curtos/vestido-liz/2.png",
      "/images/catalog/vestidos-curtos/vestido-liz/3.png",
      "/images/catalog/vestidos-curtos/vestido-liz/4.png"
    ],
    "description": "Vestido solto estilo ciganinha com elastex no decote e saia em camadas três marias. Perfeito para passeios e festas ao ar livre.",
    "material": "Viscolinho Premium",
    "stockTotal": 12,
    "sizeStock": {
      "48": 3,
      "50": 3,
      "52": 3,
      "54": 3
    },
    "section": "colecao-festa"
  },
  {
    "id": "miixxe-028",
    "name": "Vestido Luna Floral Evasê",
    "slug": "vestido-luna",
    "category": "vestidos-curtos",
    "subcategory": "Vestidos Curtos",
    "price": 118.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Novo",
    "rating": 4.7,
    "reviewsCount": 60,
    "sizes": [
      "46",
      "48",
      "50",
      "52"
    ],
    "colors": [
      {
        "name": "Terracota / Telha",
        "hex": "#C62828",
        "image": "/images/catalog/vestidos-curtos/vestido-luna/1.png",
        "stock": 4
      },
      {
        "name": "Verde Esmeralda",
        "hex": "#00695C",
        "image": "/images/catalog/vestidos-curtos/vestido-luna/2.png",
        "stock": 4
      },
      {
        "name": "Rosé Blush",
        "hex": "#E8A598",
        "image": "/images/catalog/vestidos-curtos/vestido-luna/3.png",
        "stock": 4
      },
      {
        "name": "Marrom Chocolate",
        "hex": "#5D4037",
        "image": "/images/catalog/vestidos-curtos/vestido-luna/4.png",
        "stock": 4
      },
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/vestidos-curtos/vestido-luna/5.png",
        "stock": 4
      },
      {
        "name": "Marrom Chocolate 2",
        "hex": "#5D4037",
        "image": "/images/catalog/vestidos-curtos/vestido-luna/6.png",
        "stock": 4
      },
      {
        "name": "Rosé Blush 2",
        "hex": "#E8A598",
        "image": "/images/catalog/vestidos-curtos/vestido-luna/7.png",
        "stock": 4
      },
      {
        "name": "Azul Céu",
        "hex": "#64B5F6",
        "image": "/images/catalog/vestidos-curtos/vestido-luna/8.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/vestidos-curtos/vestido-luna/1.png",
    "gallery": [
      "/images/catalog/vestidos-curtos/vestido-luna/1.png",
      "/images/catalog/vestidos-curtos/vestido-luna/2.png",
      "/images/catalog/vestidos-curtos/vestido-luna/3.png",
      "/images/catalog/vestidos-curtos/vestido-luna/4.png",
      "/images/catalog/vestidos-curtos/vestido-luna/5.png",
      "/images/catalog/vestidos-curtos/vestido-luna/6.png",
      "/images/catalog/vestidos-curtos/vestido-luna/7.png",
      "/images/catalog/vestidos-curtos/vestido-luna/8.png"
    ],
    "description": "Vestido curto em estampas vivas com decote quadrado, mangas amplas e cintura com ajuste sutil.",
    "material": "Viscose Fluida",
    "stockTotal": 12,
    "sizeStock": {
      "46": 3,
      "48": 3,
      "50": 3,
      "52": 3
    },
    "section": "colecao-festa"
  },
  {
    "id": "miixxe-029",
    "name": "Vestido Maria Estampado Decote Quadrado",
    "slug": "vestido-maria",
    "category": "vestidos-curtos",
    "subcategory": "Vestidos Curtos",
    "price": 128.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Destaque",
    "rating": 4.8,
    "reviewsCount": 67,
    "sizes": [
      "46",
      "48",
      "50",
      "52"
    ],
    "colors": [
      {
        "name": "Verde Oliva",
        "hex": "#6B8E23",
        "image": "/images/catalog/vestidos-curtos/vestido-maria/1.png",
        "stock": 4
      },
      {
        "name": "Caramelo / Mostarda",
        "hex": "#C49000",
        "image": "/images/catalog/vestidos-curtos/vestido-maria/2.png",
        "stock": 4
      },
      {
        "name": "Rosé Blush",
        "hex": "#E8A598",
        "image": "/images/catalog/vestidos-curtos/vestido-maria/3.png",
        "stock": 4
      },
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/vestidos-curtos/vestido-maria/4.png",
        "stock": 4
      },
      {
        "name": "Marrom Chocolate",
        "hex": "#5D4037",
        "image": "/images/catalog/vestidos-curtos/vestido-maria/5.png",
        "stock": 4
      },
      {
        "name": "Preto 2",
        "hex": "#1F1F1F",
        "image": "/images/catalog/vestidos-curtos/vestido-maria/6.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/vestidos-curtos/vestido-maria/1.png",
    "gallery": [
      "/images/catalog/vestidos-curtos/vestido-maria/1.png",
      "/images/catalog/vestidos-curtos/vestido-maria/2.png",
      "/images/catalog/vestidos-curtos/vestido-maria/3.png",
      "/images/catalog/vestidos-curtos/vestido-maria/4.png",
      "/images/catalog/vestidos-curtos/vestido-maria/5.png",
      "/images/catalog/vestidos-curtos/vestido-maria/6.png"
    ],
    "description": "Vestido curto com decote quadrado clássico, mangas sino e caimento godê fluido que valoriza o corpo.",
    "material": "Viscolinho Estampado",
    "stockTotal": 12,
    "sizeStock": {
      "46": 3,
      "48": 3,
      "50": 3,
      "52": 3
    },
    "section": "colecao-festa"
  },
  {
    "id": "miixxe-030",
    "name": "Vestido Mayra Viscolinho Plus",
    "slug": "vstido-mayra",
    "category": "vestidos-curtos",
    "subcategory": "Vestidos Curtos",
    "price": 128.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Destaque",
    "rating": 4.9,
    "reviewsCount": 74,
    "sizes": [
      "52",
      "54"
    ],
    "colors": [
      {
        "name": "Marrom Chocolate",
        "hex": "#5D4037",
        "image": "/images/catalog/vestidos-curtos/vstido-mayra/1.png",
        "stock": 4
      },
      {
        "name": "Estampado Floral",
        "hex": "#4A6572",
        "image": "/images/catalog/vestidos-curtos/vstido-mayra/2.png",
        "stock": 4
      },
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/vestidos-curtos/vstido-mayra/3.png",
        "stock": 4
      },
      {
        "name": "Rosé Blush",
        "hex": "#E8A598",
        "image": "/images/catalog/vestidos-curtos/vstido-mayra/4.png",
        "stock": 4
      },
      {
        "name": "Preto 2",
        "hex": "#1F1F1F",
        "image": "/images/catalog/vestidos-curtos/vstido-mayra/5.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/vestidos-curtos/vstido-mayra/1.png",
    "gallery": [
      "/images/catalog/vestidos-curtos/vstido-mayra/1.png",
      "/images/catalog/vestidos-curtos/vstido-mayra/2.png",
      "/images/catalog/vestidos-curtos/vstido-mayra/3.png",
      "/images/catalog/vestidos-curtos/vstido-mayra/4.png",
      "/images/catalog/vestidos-curtos/vstido-mayra/5.png"
    ],
    "description": "Vestido amplo em viscolinho encorpado com caimento em evasê e decote canoa. Peça desenvolvida especificamente para numerações 52 e 54.",
    "material": "Viscolinho de Alta Gramatura",
    "stockTotal": 6,
    "sizeStock": {
      "52": 3,
      "54": 3
    },
    "section": "colecao-festa"
  },
  {
    "id": "miixxe-031",
    "name": "Vestido Selina Ombro a Ombro",
    "slug": "vstido-selina",
    "category": "vestidos-curtos",
    "subcategory": "Vestidos Curtos",
    "price": 128.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Novo",
    "rating": 5.0,
    "reviewsCount": 81,
    "sizes": [
      "46",
      "48",
      "50",
      "52"
    ],
    "colors": [
      {
        "name": "Marrom Chocolate",
        "hex": "#5D4037",
        "image": "/images/catalog/vestidos-curtos/vstido-selina/1.png",
        "stock": 4
      },
      {
        "name": "Rosé Blush",
        "hex": "#E8A598",
        "image": "/images/catalog/vestidos-curtos/vstido-selina/2.png",
        "stock": 4
      },
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/vestidos-curtos/vstido-selina/3.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/vestidos-curtos/vstido-selina/1.png",
    "gallery": [
      "/images/catalog/vestidos-curtos/vstido-selina/1.png",
      "/images/catalog/vestidos-curtos/vstido-selina/2.png",
      "/images/catalog/vestidos-curtos/vstido-selina/3.png"
    ],
    "description": "Vestido curto ombro a ombro com babado na barra e elastex na cintura para perfeito ajuste ao corpo.",
    "material": "Crepe Soft Estampado",
    "stockTotal": 12,
    "sizeStock": {
      "46": 3,
      "48": 3,
      "50": 3,
      "52": 3
    },
    "section": "colecao-festa"
  },
  {
    "id": "miixxe-032",
    "name": "Chemise Ivana Longo Botões Dourados",
    "slug": "chemise-ivana",
    "category": "vestidos-longos",
    "subcategory": "Chemises",
    "price": 198.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Festa",
    "rating": 4.7,
    "reviewsCount": 88,
    "sizes": [
      "44/46",
      "46/48"
    ],
    "colors": [
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/vestidos-longos/chemise-ivana/1.png",
        "stock": 4
      },
      {
        "name": "Preto 2",
        "hex": "#1F1F1F",
        "image": "/images/catalog/vestidos-longos/chemise-ivana/2.png",
        "stock": 4
      },
      {
        "name": "Marrom Chocolate",
        "hex": "#5D4037",
        "image": "/images/catalog/vestidos-longos/chemise-ivana/3.png",
        "stock": 4
      },
      {
        "name": "Vinho Marsala",
        "hex": "#6B0833",
        "image": "/images/catalog/vestidos-longos/chemise-ivana/6.png",
        "stock": 4
      },
      {
        "name": "Azul Marinho",
        "hex": "#1A237E",
        "image": "/images/catalog/vestidos-longos/chemise-ivana/7.png",
        "stock": 4
      },
      {
        "name": "Rosé Blush",
        "hex": "#E8A598",
        "image": "/images/catalog/vestidos-longos/chemise-ivana/8.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/vestidos-longos/chemise-ivana/1.png",
    "gallery": [
      "/images/catalog/vestidos-longos/chemise-ivana/1.png",
      "/images/catalog/vestidos-longos/chemise-ivana/2.png",
      "/images/catalog/vestidos-longos/chemise-ivana/3.png",
      "/images/catalog/vestidos-longos/chemise-ivana/6.png",
      "/images/catalog/vestidos-longos/chemise-ivana/7.png",
      "/images/catalog/vestidos-longos/chemise-ivana/8.png"
    ],
    "description": "Chemise longo luxuoso sem mangas com gola camisaria, abotoamento frontal com botões dourados e fenda central imponente.",
    "material": "Crepe Alfaiataria Nobre",
    "stockTotal": 6,
    "sizeStock": {
      "44/46": 3,
      "46/48": 3
    },
    "section": "colecao-festa"
  },
  {
    "id": "miixxe-033",
    "name": "Chemise Keyla Longo com Amarração",
    "slug": "chemise-keyla-longo",
    "category": "vestidos-longos",
    "subcategory": "Chemises",
    "price": 128.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Mais Vendido",
    "rating": 4.8,
    "reviewsCount": 95,
    "sizes": [
      "44/46",
      "48/50"
    ],
    "colors": [
      {
        "name": "Terracota / Telha",
        "hex": "#C62828",
        "image": "/images/catalog/vestidos-longos/chemise-keyla-longo/1.png",
        "stock": 4
      },
      {
        "name": "Verde Esmeralda",
        "hex": "#00695C",
        "image": "/images/catalog/vestidos-longos/chemise-keyla-longo/2.png",
        "stock": 4
      },
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/vestidos-longos/chemise-keyla-longo/3.png",
        "stock": 4
      },
      {
        "name": "Terracota / Telha 2",
        "hex": "#C62828",
        "image": "/images/catalog/vestidos-longos/chemise-keyla-longo/4.png",
        "stock": 4
      },
      {
        "name": "Preto 2",
        "hex": "#1F1F1F",
        "image": "/images/catalog/vestidos-longos/chemise-keyla-longo/5.png",
        "stock": 4
      },
      {
        "name": "Preto 3",
        "hex": "#1F1F1F",
        "image": "/images/catalog/vestidos-longos/chemise-keyla-longo/6.png",
        "stock": 4
      },
      {
        "name": "Rosé Blush",
        "hex": "#E8A598",
        "image": "/images/catalog/vestidos-longos/chemise-keyla-longo/7.png",
        "stock": 4
      },
      {
        "name": "Preto 4",
        "hex": "#1F1F1F",
        "image": "/images/catalog/vestidos-longos/chemise-keyla-longo/8.png",
        "stock": 4
      },
      {
        "name": "Marrom Chocolate",
        "hex": "#5D4037",
        "image": "/images/catalog/vestidos-longos/chemise-keyla-longo/9.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/vestidos-longos/chemise-keyla-longo/1.png",
    "gallery": [
      "/images/catalog/vestidos-longos/chemise-keyla-longo/1.png",
      "/images/catalog/vestidos-longos/chemise-keyla-longo/2.png",
      "/images/catalog/vestidos-longos/chemise-keyla-longo/3.png",
      "/images/catalog/vestidos-longos/chemise-keyla-longo/4.png",
      "/images/catalog/vestidos-longos/chemise-keyla-longo/5.png",
      "/images/catalog/vestidos-longos/chemise-keyla-longo/6.png",
      "/images/catalog/vestidos-longos/chemise-keyla-longo/7.png",
      "/images/catalog/vestidos-longos/chemise-keyla-longo/8.png",
      "/images/catalog/vestidos-longos/chemise-keyla-longo/9.png"
    ],
    "description": "Chemise longo clássico com manga curta, gola polo e botões em todo o comprimento. Acompanha faixa do mesmo tecido para acinturar.",
    "material": "Viscose Premium Fluida",
    "stockTotal": 6,
    "sizeStock": {
      "44/46": 3,
      "48/50": 3
    },
    "section": "colecao-festa"
  },
  {
    "id": "miixxe-034",
    "name": "Vestido Bárbara Longo Viscolinho",
    "slug": "vestido-barata",
    "category": "vestidos-longos",
    "subcategory": "Vestidos Longos",
    "price": 198.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Destaque",
    "rating": 4.9,
    "reviewsCount": 102,
    "sizes": [
      "52",
      "54"
    ],
    "colors": [
      {
        "name": "Estampado Floral",
        "hex": "#4A6572",
        "image": "/images/catalog/vestidos-longos/vestido-barata/1.png",
        "stock": 4
      },
      {
        "name": "Branco / Off-White",
        "hex": "#F5F5F5",
        "image": "/images/catalog/vestidos-longos/vestido-barata/2.png",
        "stock": 4
      },
      {
        "name": "Branco / Off-White 2",
        "hex": "#F5F5F5",
        "image": "/images/catalog/vestidos-longos/vestido-barata/3.png",
        "stock": 4
      },
      {
        "name": "Estampado Floral 2",
        "hex": "#4A6572",
        "image": "/images/catalog/vestidos-longos/vestido-barata/4.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/vestidos-longos/vestido-barata/1.png",
    "gallery": [
      "/images/catalog/vestidos-longos/vestido-barata/1.png",
      "/images/catalog/vestidos-longos/vestido-barata/2.png",
      "/images/catalog/vestidos-longos/vestido-barata/3.png",
      "/images/catalog/vestidos-longos/vestido-barata/4.png"
    ],
    "description": "Vestido longo plus size em viscolinho nobre com mangas 3/4 e elastex na cintura. Estampas elegantes e corte que proporciona conforto absoluto.",
    "material": "Viscolinho Especial com Estampa",
    "stockTotal": 6,
    "sizeStock": {
      "52": 3,
      "54": 3
    },
    "section": "colecao-festa"
  },
  {
    "id": "miixxe-035",
    "name": "Vestido Maysa Longo Ciganinha",
    "slug": "vestido-maysa",
    "category": "vestidos-longos",
    "subcategory": "Vestidos Longos",
    "price": 148.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Destaque",
    "rating": 5.0,
    "reviewsCount": 29,
    "sizes": [
      "46",
      "48",
      "50",
      "52"
    ],
    "colors": [
      {
        "name": "Terracota / Telha",
        "hex": "#C62828",
        "image": "/images/catalog/vestidos-longos/vestido-maysa/1.png",
        "stock": 4
      },
      {
        "name": "Vermelho Paixão",
        "hex": "#D32F2F",
        "image": "/images/catalog/vestidos-longos/vestido-maysa/2.png",
        "stock": 4
      },
      {
        "name": "Estampado Floral",
        "hex": "#4A6572",
        "image": "/images/catalog/vestidos-longos/vestido-maysa/3.png",
        "stock": 4
      },
      {
        "name": "Rosé Blush",
        "hex": "#E8A598",
        "image": "/images/catalog/vestidos-longos/vestido-maysa/4.png",
        "stock": 4
      },
      {
        "name": "Marrom Chocolate",
        "hex": "#5D4037",
        "image": "/images/catalog/vestidos-longos/vestido-maysa/5.png",
        "stock": 4
      },
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/vestidos-longos/vestido-maysa/6.png",
        "stock": 4
      },
      {
        "name": "Marrom Chocolate 2",
        "hex": "#5D4037",
        "image": "/images/catalog/vestidos-longos/vestido-maysa/7.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/vestidos-longos/vestido-maysa/1.png",
    "gallery": [
      "/images/catalog/vestidos-longos/vestido-maysa/1.png",
      "/images/catalog/vestidos-longos/vestido-maysa/2.png",
      "/images/catalog/vestidos-longos/vestido-maysa/3.png",
      "/images/catalog/vestidos-longos/vestido-maysa/4.png",
      "/images/catalog/vestidos-longos/vestido-maysa/5.png",
      "/images/catalog/vestidos-longos/vestido-maysa/6.png",
      "/images/catalog/vestidos-longos/vestido-maysa/7.png"
    ],
    "description": "Vestido longo apaixonante em camadas com decote ciganinha elástico e mangas flare. Caimento magnífico e movimento fluído.",
    "material": "Crepe Duna Esmeralda",
    "stockTotal": 12,
    "sizeStock": {
      "46": 3,
      "48": 3,
      "50": 3,
      "52": 3
    },
    "section": "colecao-festa"
  },
  {
    "id": "miixxe-036",
    "name": "Vestido Vitória Longo Bicolor Decote V",
    "slug": "vestido-vitoria",
    "category": "vestidos-longos",
    "subcategory": "Vestidos Longos",
    "price": 158.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Festa",
    "rating": 4.7,
    "reviewsCount": 36,
    "sizes": [
      "46",
      "48",
      "50",
      "52"
    ],
    "colors": [
      {
        "name": "Vinho Marsala",
        "hex": "#6B0833",
        "image": "/images/catalog/vestidos-longos/vestido-vitoria/1.png",
        "stock": 4
      },
      {
        "name": "Vinho Marsala 2",
        "hex": "#6B0833",
        "image": "/images/catalog/vestidos-longos/vestido-vitoria/2.png",
        "stock": 4
      },
      {
        "name": "Terracota / Telha",
        "hex": "#C62828",
        "image": "/images/catalog/vestidos-longos/vestido-vitoria/3.png",
        "stock": 4
      },
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/vestidos-longos/vestido-vitoria/4.png",
        "stock": 4
      },
      {
        "name": "Preto 2",
        "hex": "#1F1F1F",
        "image": "/images/catalog/vestidos-longos/vestido-vitoria/5.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/vestidos-longos/vestido-vitoria/1.png",
    "gallery": [
      "/images/catalog/vestidos-longos/vestido-vitoria/1.png",
      "/images/catalog/vestidos-longos/vestido-vitoria/2.png",
      "/images/catalog/vestidos-longos/vestido-vitoria/3.png",
      "/images/catalog/vestidos-longos/vestido-vitoria/4.png",
      "/images/catalog/vestidos-longos/vestido-vitoria/5.png"
    ],
    "description": "Vestido longo tubinho com detalhe bicolor contrastante na gola e laterais que alongam e afinam a silhueta. Perfeito para festas e jantares.",
    "material": "Malha Canelada Pesada",
    "stockTotal": 12,
    "sizeStock": {
      "46": 3,
      "48": 3,
      "50": 3,
      "52": 3
    },
    "section": "colecao-festa"
  },
  {
    "id": "miixxe-037",
    "name": "Chemise Midi Casual com Botões",
    "slug": "chemise-midi",
    "category": "vestidos-midi",
    "subcategory": "Chemises",
    "price": 90.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Oferta",
    "rating": 4.8,
    "reviewsCount": 43,
    "sizes": [
      "44",
      "46",
      "48"
    ],
    "colors": [
      {
        "name": "Marrom Chocolate",
        "hex": "#5D4037",
        "image": "/images/catalog/vestidos-midi/chemise-midi/1.png",
        "stock": 4
      },
      {
        "name": "Branco / Off-White",
        "hex": "#F5F5F5",
        "image": "/images/catalog/vestidos-midi/chemise-midi/2.png",
        "stock": 4
      },
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/vestidos-midi/chemise-midi/3.png",
        "stock": 4
      },
      {
        "name": "Verde Militar",
        "hex": "#556B2F",
        "image": "/images/catalog/vestidos-midi/chemise-midi/4.png",
        "stock": 4
      },
      {
        "name": "Vinho Marsala",
        "hex": "#6B0833",
        "image": "/images/catalog/vestidos-midi/chemise-midi/5.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/vestidos-midi/chemise-midi/1.png",
    "gallery": [
      "/images/catalog/vestidos-midi/chemise-midi/1.png",
      "/images/catalog/vestidos-midi/chemise-midi/2.png",
      "/images/catalog/vestidos-midi/chemise-midi/3.png",
      "/images/catalog/vestidos-midi/chemise-midi/4.png",
      "/images/catalog/vestidos-midi/chemise-midi/5.png"
    ],
    "description": "Vestido chemise comprimento midi com bolsos funcionais e botões marmorizados. Peça versátil que vai do trabalho ao almoço de fim de semana.",
    "material": "Viscose com Toque de Seda",
    "stockTotal": 9,
    "sizeStock": {
      "44": 3,
      "46": 3,
      "48": 3
    },
    "section": "colecao-festa"
  },
  {
    "id": "miixxe-038",
    "name": "Vestido Midi Farm com Bordado",
    "slug": "vestido-farm",
    "category": "vestidos-midi",
    "subcategory": "Vestidos Midi",
    "price": 98.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Destaque",
    "rating": 4.9,
    "reviewsCount": 50,
    "sizes": [
      "44",
      "46",
      "48"
    ],
    "colors": [
      {
        "name": "Marrom Chocolate",
        "hex": "#5D4037",
        "image": "/images/catalog/vestidos-midi/vestido-farm/1.png",
        "stock": 4
      },
      {
        "name": "Estampado Floral",
        "hex": "#4A6572",
        "image": "/images/catalog/vestidos-midi/vestido-farm/2.png",
        "stock": 4
      },
      {
        "name": "Estampado Floral 2",
        "hex": "#4A6572",
        "image": "/images/catalog/vestidos-midi/vestido-farm/3.png",
        "stock": 4
      },
      {
        "name": "Rosé Blush",
        "hex": "#E8A598",
        "image": "/images/catalog/vestidos-midi/vestido-farm/4.png",
        "stock": 4
      },
      {
        "name": "Vinho Marsala",
        "hex": "#6B0833",
        "image": "/images/catalog/vestidos-midi/vestido-farm/5.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/vestidos-midi/vestido-farm/1.png",
    "gallery": [
      "/images/catalog/vestidos-midi/vestido-farm/1.png",
      "/images/catalog/vestidos-midi/vestido-farm/2.png",
      "/images/catalog/vestidos-midi/vestido-farm/3.png",
      "/images/catalog/vestidos-midi/vestido-farm/4.png",
      "/images/catalog/vestidos-midi/vestido-farm/5.png"
    ],
    "description": "Vestido midi inspirado na moda tropical Farm com rico bordado floral no peito e saia franzida em camadas.",
    "material": "Algodão com Bordado Exclusivo",
    "stockTotal": 9,
    "sizeStock": {
      "44": 3,
      "46": 3,
      "48": 3
    },
    "section": "colecao-festa"
  },
  {
    "id": "miixxe-039",
    "name": "Vestido Karla Midi Zíper Frontal",
    "slug": "vestido-karla",
    "category": "vestidos-midi",
    "subcategory": "Vestidos Midi",
    "price": 128.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Novo",
    "rating": 5.0,
    "reviewsCount": 57,
    "sizes": [
      "46",
      "48",
      "50"
    ],
    "colors": [
      {
        "name": "Rosé Blush",
        "hex": "#E8A598",
        "image": "/images/catalog/vestidos-midi/vestido-karla/1.png",
        "stock": 4
      },
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/vestidos-midi/vestido-karla/2.png",
        "stock": 4
      },
      {
        "name": "Rosé Blush 2",
        "hex": "#E8A598",
        "image": "/images/catalog/vestidos-midi/vestido-karla/3.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/vestidos-midi/vestido-karla/1.png",
    "gallery": [
      "/images/catalog/vestidos-midi/vestido-karla/1.png",
      "/images/catalog/vestidos-midi/vestido-karla/2.png",
      "/images/catalog/vestidos-midi/vestido-karla/3.png"
    ],
    "description": "Vestido midi refinado com zíper metálico no busto, bolsos frontais e mangas curtas. Estrutura elegante para diversas ocasiões.",
    "material": "Linho Misto Estruturado",
    "stockTotal": 9,
    "sizeStock": {
      "46": 3,
      "48": 3,
      "50": 3
    },
    "section": "colecao-festa"
  },
  {
    "id": "miixxe-040",
    "name": "Vestido Lana Midi Camisaria Alfaiataria",
    "slug": "vestido-lana",
    "category": "vestidos-midi",
    "subcategory": "Vestidos Midi",
    "price": 128.0,
    "originalPrice": null,
    "comboOffer": null,
    "badge": "Destaque",
    "rating": 4.7,
    "reviewsCount": 64,
    "sizes": [
      "44",
      "46",
      "48"
    ],
    "colors": [
      {
        "name": "Preto",
        "hex": "#1F1F1F",
        "image": "/images/catalog/vestidos-midi/vestido-lana/1.png",
        "stock": 4
      },
      {
        "name": "Preto 2",
        "hex": "#1F1F1F",
        "image": "/images/catalog/vestidos-midi/vestido-lana/2.png",
        "stock": 4
      },
      {
        "name": "Rosé Blush",
        "hex": "#E8A598",
        "image": "/images/catalog/vestidos-midi/vestido-lana/3.png",
        "stock": 4
      },
      {
        "name": "Rosé Blush 2",
        "hex": "#E8A598",
        "image": "/images/catalog/vestidos-midi/vestido-lana/4.png",
        "stock": 4
      },
      {
        "name": "Preto 3",
        "hex": "#1F1F1F",
        "image": "/images/catalog/vestidos-midi/vestido-lana/5.png",
        "stock": 4
      },
      {
        "name": "Pink Fúcsia",
        "hex": "#C2185B",
        "image": "/images/catalog/vestidos-midi/vestido-lana/6.png",
        "stock": 4
      }
    ],
    "image": "/images/catalog/vestidos-midi/vestido-lana/1.png",
    "gallery": [
      "/images/catalog/vestidos-midi/vestido-lana/1.png",
      "/images/catalog/vestidos-midi/vestido-lana/2.png",
      "/images/catalog/vestidos-midi/vestido-lana/3.png",
      "/images/catalog/vestidos-midi/vestido-lana/4.png",
      "/images/catalog/vestidos-midi/vestido-lana/5.png",
      "/images/catalog/vestidos-midi/vestido-lana/6.png"
    ],
    "description": "Vestido midi sofisticado estilo camisaria com abotoamento e gola estruturada. Caimento reto que une sobriedade e estilo moderno.",
    "material": "Crepe de Alfaiataria",
    "stockTotal": 9,
    "sizeStock": {
      "44": 3,
      "46": 3,
      "48": 3
    },
    "section": "colecao-festa"
  }
];


// Carrinho Pré-Populado de Demonstração
export const INITIAL_DEMO_CART: CartItem[] = [
  {
    product: PRODUCTS[0],
    selectedSize: '48',
    selectedColor: PRODUCTS[0].colors[0],
    quantity: 1,
  },
  {
    product: PRODUCTS[1],
    selectedSize: '46',
    selectedColor: PRODUCTS[1].colors[0],
    quantity: 1,
  },
];

// Dados do Painel Administrativo (/admin)
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
      value: 'R$ 14.850,00',
      growth: '+24%',
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
      message: 'Gostaria de saber se tem a calça Lúcia no 48...',
      status: 'Atendimento',
      statusColor: 'bg-emerald-100 text-emerald-700',
      avatar: '/images/avatars/juliana.jpg',
    },
    {
      id: 'wa-2',
      name: 'Carla Souza',
      time: '11:40',
      message: 'Quero fechar o pedido do Vestido Bárbara...',
      status: 'Em Atendimento',
      statusColor: 'bg-blue-100 text-blue-700',
      avatar: '/images/avatars/carla.jpg',
    },
    {
      id: 'wa-3',
      name: 'Renata Alves',
      time: '11:35',
      message: 'Qual o valor do frete para o bairro Flores?',
      status: 'Aguardando',
      statusColor: 'bg-gray-100 text-gray-700',
      avatar: '/images/avatars/renata.jpg',
    },
    {
      id: 'wa-4',
      name: 'Beatriz Lima',
      time: '11:30',
      message: 'Posso retirar na loja hoje à tarde?',
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
      total: 218.00,
      deliveryMethod: 'Motoboy (Adrianópolis)',
      status: 'Pago',
      statusBadge: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: '#1057',
      customer: 'Carla Souza',
      itemsCount: 2,
      total: 198.00,
      deliveryMethod: 'Retirada na Loja',
      status: 'Em Atendimento',
      statusBadge: 'bg-blue-100 text-blue-700',
    },
    {
      id: '#1056',
      customer: 'Renata Alves',
      itemsCount: 3,
      total: 236.00,
      deliveryMethod: 'Motoboy (Flores)',
      status: 'Pendente',
      statusBadge: 'bg-amber-100 text-amber-700',
    },
    {
      id: '#1055',
      customer: 'Beatriz Lima',
      itemsCount: 2,
      total: 128.00,
      deliveryMethod: 'Retirada na Loja',
      status: 'Pago',
      statusBadge: 'bg-emerald-100 text-emerald-700',
    },
  ],
  bottomCounters: [
    { label: 'Produtos Cadastrados', count: '40', growth: '+100%', actionLabel: 'Gerenciar Estoque' },
    { label: 'Categorias Reais', count: '9', growth: '+12%', actionLabel: 'Ver Categorias' },
    { label: 'Clientes Cadastrados', count: '1.240', growth: '+14%', actionLabel: 'Ver Clientes' },
    { label: 'Cores Disponíveis', count: '181', growth: '+180%', actionLabel: 'Gerenciar Cores' },
  ],
  lastUpdate: 'Hoje em Manaus',
};

// Funções Utilitárias de Moeda
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
  customerName?: string,
  delivery?: DeliverySelection
): { url: string; rawMessage: string; subtotal: number; shippingFee: number; total: number } {
  const subtotal = calculateCartSubtotal(items);
  const shippingFee = delivery?.type === 'motoboy' && delivery.neighborhood ? delivery.neighborhood.fee : 0;
  const total = subtotal + shippingFee;

  const greeting = customerName
    ? `Olá, *${STORE_CONFIG.name} ${STORE_CONFIG.subtitle}*! 🌸\nMeu nome é *${customerName}* e gostaria de confirmar o meu pedido feito pelo catálogo virtual:`
    : `Olá, *${STORE_CONFIG.name} ${STORE_CONFIG.subtitle}*! 🌸\nGostaria de confirmar o meu pedido feito pelo catálogo virtual:`;

  const itemsList = items
    .map((item, index) => {
      const lineTotal = formatCurrencyBRL(item.product.price * item.quantity);
      return (
        `*${index + 1}. ${item.product.name}*\n` +
        `   • Tamanho: *${item.selectedSize}* | Cor: *${item.selectedColor.name}*\n` +
        `   • Quantidade: ${item.quantity}x (${formatCurrencyBRL(item.product.price)}) = *${lineTotal}*`
      );
    })
    .join('\n\n');

  let deliverySection = '';
  if (delivery?.type === 'retirada') {
    deliverySection = `📦 *Forma de Entrega:* Retirada na Loja Física em Manaus (Grátis)\n`;
  } else if (delivery?.type === 'motoboy') {
    const neigh = delivery.neighborhood?.name || 'A combinar';
    const feeText = shippingFee > 0 ? formatCurrencyBRL(shippingFee) : 'A combinar com o motoboy';
    deliverySection =
      `🛵 *Forma de Entrega:* Motoboy em Manaus\n` +
      `📍 *Bairro:* ${neigh}\n` +
      `💵 *Taxa de Frete:* ${feeText}\n` +
      (delivery.deliveryAddress ? `🏠 *Endereço/Ponto de Ref.:* ${delivery.deliveryAddress}\n` : '');
  } else {
    deliverySection = `🛵 *Entrega:* Em toda Manaus (Frete a combinar por bairro) ou Retirada na Loja\n`;
  }

  const footer =
    `\n------------------------------\n` +
    deliverySection +
    `💰 *Subtotal dos Produtos:* ${formatCurrencyBRL(subtotal)}\n` +
    (shippingFee > 0 ? `🛵 *Taxa de Frete:* ${formatCurrencyBRL(shippingFee)}\n` : '') +
    `💖 *TOTAL FINAL:* ${formatCurrencyBRL(total)}\n` +
    `📍 *Atendimento Local:* ${STORE_CONFIG.city}\n` +
    `------------------------------\n` +
    `Aguardo a confirmação da disponibilidade para pagamento (PIX / Cartão) e envio!`;

  const rawMessage = `${greeting}\n\n${itemsList}${footer}`;
  const encodedMessage = encodeURIComponent(rawMessage);
  const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodedMessage}`;

  return { url, rawMessage, subtotal, shippingFee, total };
}
