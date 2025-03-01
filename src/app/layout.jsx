// app/layout.js
import { ToastProvider } from '@/contexts/ToastContext';
import './styles/index.css';

export const metadata = {
  title: 'SquadW.online',
  description: 'Ape Gang Community',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
        {children}
        </ToastProvider>
      </body>
    </html>
  )
}