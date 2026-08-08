import { Card, Box, Typography, IconButton, type SxProps, type Theme } from '@mui/material';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export default function PageHeader({ title, subtitle, action, icon, sx }: PageHeaderProps) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 3, ...sx }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        {icon && (
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg,rgba(37,99,235,0.12),rgba(20,184,166,0.12))',
              color: 'primary.main',
            }}
          >
            {icon}
          </Box>
        )}
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{title}</Typography>
          {subtitle && <Typography variant="body2" sx={{ color: 'text.secondary' }}>{subtitle}</Typography>}
        </Box>
      </Box>
      {action}
    </Box>
  );
}

export function CardWrapper({ children, sx }: { children: React.ReactNode; sx?: SxProps<Theme> }) {
  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      sx={{ height: '100%', ...sx }}
    >
      {children}
    </Card>
  );
}

export function CardTitle({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2.5, pt: 2, pb: 1 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{title}</Typography>
      {action}
    </Box>
  );
}

export function IconBtn({ children, ...rest }: { children: React.ReactNode } & React.ComponentProps<typeof IconButton>) {
  return <IconButton {...rest}>{children}</IconButton>;
}
