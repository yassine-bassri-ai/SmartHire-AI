import { Box, Typography, Button, type SxProps, type Theme } from '@mui/material';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export default function EmptyState({ title, description, actionLabel, onAction, icon, sx }: EmptyStateProps) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 6,
        px: 3,
        gap: 1.5,
        ...sx,
      }}
    >
      <Box
        sx={{
          width: 84,
          height: 84,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: (t) => (t.palette.mode === 'light' ? 'rgba(37,99,235,0.08)' : 'rgba(37,99,235,0.16)'),
          color: 'primary.main',
          mb: 1,
        }}
      >
        {icon ?? <InboxRoundedIcon sx={{ fontSize: 40 }} />}
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 420 }}>
          {description}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button variant="contained" color="primary" onClick={onAction} sx={{ mt: 1 }}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}
