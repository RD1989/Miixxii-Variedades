-- ==============================================================================
-- SCHEMA SUPABASE: MIIXXIIE VARIEDADES (MODA PLUS SIZE FEMININA - MANAUS AM)
-- Sistema Profissional de Gestão de Loja Local & Catálogo Virtual
-- ==============================================================================

-- 1. Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Tabela de Configurações da Loja Local (Store Settings & CMS)
CREATE TABLE IF NOT EXISTS public.store_settings (
    id TEXT PRIMARY KEY DEFAULT 'miixxiie_manaus',
    store_name TEXT NOT NULL DEFAULT 'MIIXXIIE',
    subtitle TEXT NOT NULL DEFAULT 'Variedades',
    niche TEXT NOT NULL DEFAULT 'MODA PLUS SIZE FEMININA',
    slogan TEXT DEFAULT 'Estilo, Conforto e Autoestima',
    city TEXT DEFAULT 'Manaus - AM',
    address TEXT DEFAULT 'Manaus - AM (Atendimento e Retirada Presencial com Agendamento)',
    whatsapp_maria TEXT DEFAULT '5592986137969',
    whatsapp_carlos TEXT DEFAULT '5592986064005',
    catalog_url TEXT DEFAULT 'https://wa.me/c/559284199013',
    banner_headline TEXT DEFAULT 'Elegância Sem Medidas',
    banner_subheadline TEXT DEFAULT 'Coleções exclusivas do G ao G3 pensadas para realçar sua melhor versão com conforto absoluto em Manaus.',
    shipping_notice TEXT DEFAULT 'Entregas Somente em Manaus - AM (Frete por Bairro via Motoboy ou Retirada na Loja)',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Tabela de Produtos do Catálogo
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    subcategory TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    original_price NUMERIC(10, 2),
    combo_offer TEXT,
    badge TEXT DEFAULT 'Novo',
    rating NUMERIC(3, 1) DEFAULT 5.0,
    reviews_count INTEGER DEFAULT 12,
    sizes JSONB NOT NULL DEFAULT '["G", "GG", "G1", "G2"]'::jsonb,
    colors JSONB NOT NULL DEFAULT '[]'::jsonb,
    image TEXT NOT NULL,
    gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
    description TEXT,
    material TEXT,
    stock_total INTEGER DEFAULT 10,
    size_stock JSONB NOT NULL DEFAULT '{}'::jsonb,
    section TEXT DEFAULT 'novidades',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Tabela de Pedidos / Vendas & Fluxo Kanban
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer TEXT NOT NULL,
    customer_phone TEXT,
    items JSONB NOT NULL,
    total NUMERIC(10, 2) NOT NULL,
    subtotal NUMERIC(10, 2) NOT NULL,
    shipping_fee NUMERIC(10, 2) DEFAULT 0,
    delivery_type TEXT NOT NULL DEFAULT 'motoboy', -- 'motoboy' ou 'retirada'
    neighborhood TEXT,
    delivery_address TEXT,
    status TEXT NOT NULL DEFAULT 'Novo Lead', 
    -- Status Kanban: 'Novo Lead', 'Em Atendimento', 'Pagamento Confirmado', 'Separando Estoque', 'Saiu para Entrega', 'Concluído', 'Cancelado'
    attendant_id TEXT, -- 'maria' ou 'carlos'
    attendant_name TEXT,
    payment_method TEXT DEFAULT 'PIX / Cartão na Entrega',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. Tabela de Métricas & Registro de Cada Clique no WhatsApp (Lead Analytics)
CREATE TABLE IF NOT EXISTS public.lead_clicks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attendant_id TEXT NOT NULL, -- 'maria' ou 'carlos'
    attendant_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    product_id TEXT,
    product_name TEXT,
    source TEXT DEFAULT 'site_header', -- 'header', 'navbar', 'product_modal', 'cart_checkout', 'intermediate_banner', 'footer'
    neighborhood TEXT,
    device_type TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. Tabela de Logs de Atividades / Auditoria
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action_type TEXT NOT NULL, -- 'update_stock', 'new_order', 'kanban_move', 'price_change', 'upload_image', 'login'
    description TEXT NOT NULL,
    user_name TEXT DEFAULT 'Administrador',
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. Índices de Alta Performance
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lead_clicks_attendant ON public.lead_clicks(attendant_id);
CREATE INDEX IF NOT EXISTS idx_lead_clicks_created_at ON public.lead_clicks(created_at DESC);

-- 8. Configurações de Segurança Row Level Security (RLS)
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Políticas de Leitura Pública para Catálogo da Loja
CREATE POLICY "Produtos visíveis publicamente" ON public.products FOR SELECT USING (true);
CREATE POLICY "Configurações da loja visíveis publicamente" ON public.store_settings FOR SELECT USING (true);
CREATE POLICY "Permitir inserção de cliques de leads" ON public.lead_clicks FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir criação de pedidos pelo cliente" ON public.orders FOR INSERT WITH CHECK (true);

-- Políticas com Controle Total para Usuários Autenticados (Painel Admin)
CREATE POLICY "Admin controle total produtos" ON public.products FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin controle total pedidos" ON public.orders FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin controle total settings" ON public.store_settings FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin controle total lead_clicks" ON public.lead_clicks FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin controle total activity_logs" ON public.activity_logs FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
