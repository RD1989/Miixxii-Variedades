import type { Metadata, Viewport } from 'next';
import { Cinzel, Dancing_Script, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-cinzel',
  display: 'swap',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-dancing',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'MIIXXIIE Variedades | Moda Plus Size Feminina — Manaus AM',
  description:
    'Estilo, Conforto e Autoestima ♡ Compre moda plus size feminina de qualidade com finalização rápida e entregas exclusivas em toda Manaus - AM via WhatsApp.',
  keywords: [
    'moda plus size',
    'roupas femininas plus size',
    'manaus',
    'vestidos plus size',
    'conjuntos plus size',
    'comprar pelo whatsapp',
  ],
  icons: {
    icon: '/images/logo-square.png',
    shortcut: '/images/logo-square.png',
    apple: '/images/logo-square.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${cinzel.variable} ${dancingScript.variable} ${plusJakarta.variable}`}
    >
      <body className="min-h-screen bg-[#F8F8FA] text-[#111111] font-sans antialiased selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}
