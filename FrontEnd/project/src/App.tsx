import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppThemeProvider, useThemeMode } from '@/context/ThemeContext';
import AppRoutes from '@/routes/AppRoutes';

function ToastWrapper() {
  const { mode } = useThemeMode();
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3500,
        style: {
          borderRadius: '14px',
          background: mode === 'light' ? '#0F172A' : '#F8FAFC',
          color: mode === 'light' ? '#F8FAFC' : '#0F172A',
          fontSize: '0.85rem',
          fontWeight: 500,
          padding: '12px 16px',
          boxShadow: '0 12px 40px -12px rgba(15,23,42,0.25)',
        },
        success: { iconTheme: { primary: '#14B8A6', secondary: '#fff' } },
        error: { iconTheme: { primary: '#DC2626', secondary: '#fff' } },
      }}
    />
  );
}

export default function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <AppRoutes />
        <ToastWrapper />
      </BrowserRouter>
    </AppThemeProvider>
  );
}
