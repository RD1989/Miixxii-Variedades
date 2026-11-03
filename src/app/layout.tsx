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
      <body className="min-h-screen bg-[#FDF4F7] text-[#1F1F1F] font-sans antialiased selection:bg-[#C8105D] selection:text-white">
        {children}
      </body>
    </html>
  );
}
