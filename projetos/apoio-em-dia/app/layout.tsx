import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Apoio em Dia | Pré-vestibular social',description:'MVP de triagem e acompanhamento de pedidos de apoio estudantil.'};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="pt-BR"><body>{children}</body></html>}
