import { createTheme, type Theme } from '@mui/material/styles';

export const brand = {
  primary: '#2563EB',
  secondary: '#14B8A6',
  accent: '#F59E0B',
  background: '#F8FAFC',
};

export const getDesignTokens = (mode: 'light' | 'dark') => ({
  palette: {
    mode,
    primary: {
      main: brand.primary,
      light: '#60A5FA',
      dark: '#1D4ED8',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: brand.secondary,
      light: '#5EEAD4',
      dark: '#0D9488',
      contrastText: '#FFFFFF',
    },
    accent: {
      main: brand.accent,
      light: '#FCD34D',
      dark: '#D97706',
      contrastText: '#1F2937',
    },
    success: { main: '#16A34A', light: '#4ADE80', dark: '#15803D' },
    warning: { main: '#F59E0B', light: '#FCD34D', dark: '#D97706' },
    error: { main: '#DC2626', light: '#F87171', dark: '#B91C1C' },
    info: { main: '#0EA5E9', light: '#38BDF8', dark: '#0284C7' },
    background: {
      default: mode === 'light' ? '#F8FAFC' : '#0B1120',
      paper: mode === 'light' ? '#FFFFFF' : '#111827',
    },
    text: {
      primary: mode === 'light' ? '#0F172A' : '#F1F5F9',
      secondary: mode === 'light' ? '#475569' : '#94A3B8',
    },
    divider: mode === 'light' ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)',
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: "'Poppins','Inter',system-ui,-apple-system,sans-serif",
    h1: { fontWeight: 700, fontSize: '2.5rem', lineHeight: 1.2 },
    h2: { fontWeight: 700, fontSize: '2rem', lineHeight: 1.2 },
    h3: { fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.25 },
    h4: { fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.3 },
    h5: { fontWeight: 600, fontSize: '1.1rem', lineHeight: 1.35 },
    h6: { fontWeight: 600, fontSize: '1rem', lineHeight: 1.4 },
    body1: { fontSize: '0.95rem', lineHeight: 1.6 },
    body2: { fontSize: '0.85rem', lineHeight: 1.55 },
    button: { fontWeight: 600, textTransform: 'none' as const, fontSize: '0.9rem' },
    subtitle1: { fontWeight: 500, fontSize: '0.95rem' },
    subtitle2: { fontWeight: 500, fontSize: '0.8rem' },
    caption: { fontSize: '0.75rem' },
    overline: { fontSize: '0.7rem', letterSpacing: '0.08em', fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: mode === 'light' ? '#F8FAFC' : '#0B1120',
          transition: 'background-color 0.3s ease',
        },
        '*': { scrollbarWidth: 'thin' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 18,
          transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        },
        rounded: { borderRadius: 18 },
        elevation1: { boxShadow: '0 4px 24px -8px rgba(15,23,42,0.10)' },
      },
      defaultProps: { elevation: 0 },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: '0 4px 24px -8px rgba(15,23,42,0.10), 0 2px 8px -4px rgba(15,23,42,0.04)',
          border: `1px solid ${mode === 'light' ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.06)'}`,
          overflow: 'hidden',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          paddingInline: 18,
          paddingBlock: 9,
          fontWeight: 600,
          transition: 'all 0.2s ease',
        },
        containedPrimary: {
          boxShadow: '0 6px 16px -6px rgba(37,99,235,0.5)',
          '&:hover': { boxShadow: '0 10px 24px -8px rgba(37,99,235,0.6)', transform: 'translateY(-1px)' },
        },
        containedSecondary: {
          boxShadow: '0 6px 16px -6px rgba(20,184,166,0.5)',
          '&:hover': { boxShadow: '0 10px 24px -8px rgba(20,184,166,0.6)', transform: 'translateY(-1px)' },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: 'small' },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 14 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 10, fontWeight: 500 },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: mode === 'light' ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.06)' },
        head: { fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: mode === 'light' ? '#475569' : '#94A3B8' },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: { borderRadius: 10, fontSize: '0.75rem' },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 999 },
      },
    },
    MuiDialog: {
      styleOverrides: { paper: { borderRadius: 18 } },
    },
    MuiMenu: {
      styleOverrides: { paper: { borderRadius: 14, marginTop: 1 } },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          margin: '2px 8px',
          transition: 'all 0.2s ease',
        },
      },
    },
  },
});

export const buildTheme = (mode: 'light' | 'dark'): Theme => createTheme(getDesignTokens(mode) as any);
