import { Card, CardContent, Box, Typography, Chip } from '@mui/material';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  trend?: number;
  suffix?: string;
  delay?: number;
}

const colorMap: Record<string, { bg: string; fg: string }> = {
  primary: { bg: 'rgba(37,99,235,0.10)', fg: '#2563EB' },
  secondary: { bg: 'rgba(20,184,166,0.10)', fg: '#14B8A6' },
  accent: { bg: 'rgba(245,158,11,0.10)', fg: '#F59E0B' },
  success: { bg: 'rgba(22,163,74,0.10)', fg: '#16A34A' },
  warning: { bg: 'rgba(245,158,11,0.10)', fg: '#F59E0B' },
  error: { bg: 'rgba(220,38,38,0.10)', fg: '#DC2626' },
};

function useCountUp(target: number, duration = 900) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

export default function StatCard({ title, value, icon, color = 'primary', trend, suffix, delay = 0 }: StatCardProps) {
  const animated = useCountUp(value);
  const c = colorMap[color];

  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
      sx={{ position: 'relative', overflow: 'hidden' }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: c.bg,
          pointerEvents: 'none',
        }}
      />
      <CardContent sx={{ position: 'relative', p: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: c.bg,
              color: c.fg,
            }}
          >
            {icon}
          </Box>
          {trend !== undefined && (
            <Chip
              size="small"
              icon={trend >= 0 ? <TrendingUpRoundedIcon sx={{ fontSize: 16 }} /> : <TrendingDownRoundedIcon sx={{ fontSize: 16 }} />}
              label={`${trend >= 0 ? '+' : ''}${trend}%`}
              sx={{
                bgcolor: trend >= 0 ? 'rgba(22,163,74,0.10)' : 'rgba(220,38,38,0.10)',
                color: trend >= 0 ? 'success.main' : 'error.main',
                fontWeight: 600,
                fontSize: '0.72rem',
                height: 22,
              }}
            />
          )}
        </Box>
        <Typography variant="h3" sx={{ fontWeight: 700, lineHeight: 1.1, mb: 0.5 }}>
          {animated.toLocaleString()}{suffix}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
