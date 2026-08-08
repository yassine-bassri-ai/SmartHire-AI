import { Chip, type ChipProps } from '@mui/material';

export function scoreColor(score: number): string {
  if (score >= 85) return '#16A34A';
  if (score >= 70) return '#2563EB';
  if (score >= 50) return '#F59E0B';
  return '#DC2626';
}

export function scoreLabel(score: number): string {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Fair';
  return 'Low';
}

interface ScoreBadgeProps {
  score: number;
  size?: ChipProps['size'];
}

export default function ScoreBadge({ score, size = 'small' }: ScoreBadgeProps) {
  const color = scoreColor(score);
  return (
    <Chip
      size={size}
      label={`${Math.round(score)}%`}
      sx={{
        fontWeight: 700,
        color,
        bgcolor: `${color}1A`,
        borderColor: `${color}55`,
      }}
      variant="outlined"
    />
  );
}
