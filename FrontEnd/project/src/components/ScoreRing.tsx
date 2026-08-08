import { Box, LinearProgress, Typography, useTheme, type SxProps } from '@mui/material';

interface ScoreRingProps {
  value: number;
  size?: number;
  thickness?: number;
  label?: string;
  sublabel?: string;
  color?: string;
  sx?: SxProps;
}

export default function ScoreRing({
  value,
  size = 160,
  thickness = 12,
  label,
  sublabel,
  color,
  sx,
}: ScoreRingProps) {
  const theme = useTheme();
  const clamped = Math.max(0, Math.min(100, value));
  const radius = (size - thickness) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (clamped / 100) * circ;
  const stroke = color ?? theme.palette.primary.main;

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', ...sx }}>
      <Box sx={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={theme.palette.divider}
            strokeWidth={thickness}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth={thickness}
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
        </svg>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 700, lineHeight: 1 }}>
            {Math.round(clamped)}%
          </Typography>
          {sublabel && (
            <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5 }}>
              {sublabel}
            </Typography>
          )}
        </Box>
      </Box>
      {label && (
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 1.5 }}>
          {label}
        </Typography>
      )}
    </Box>
  );
}

export function ScoreBar({ label, value, color }: { label: string; value: number; color?: string }) {
  const theme = useTheme();
  return (
    <Box sx={{ mb: 1.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>{label}</Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>{Math.round(value)}%</Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 8,
          borderRadius: 999,
          bgcolor: theme.palette.divider,
          '& .MuiLinearProgress-bar': { borderRadius: 999, bgcolor: color ?? 'primary.main' },
        }}
      />
    </Box>
  );
}
