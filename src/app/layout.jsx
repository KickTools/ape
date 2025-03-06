// app/layout.js
import { ToastProvider } from '@/contexts/ToastContext';
import './styles/index.css';

export const metadata = {
  title: "Ape Gang Community - SquadW Online",
  description: "Welcome to the Ape Gang Community at SquadW Online. Join the TrainwrecksTV community and meet other like-minded individuals.",
};

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