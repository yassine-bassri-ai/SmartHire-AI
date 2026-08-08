import { Box, Chip, Typography } from '@mui/material';

interface ChipListProps {
  items?: Array<string | number | null | undefined>;
  color?: 'primary' | 'secondary' | 'default' | 'success' | 'warning' | 'error' | 'info';
  empty?: string;
  max?: number;
}

export default function ChipList({ items, color = 'primary', empty = '—', max }: ChipListProps) {
  const list = (items ?? []).filter((i) => i !== null && i !== undefined && String(i).trim() !== '');
  if (list.length === 0) {
    return <Typography variant="body2" sx={{ color: 'text.secondary' }}>{empty}</Typography>;
  }
  const shown = max && list.length > max ? list.slice(0, max) : list;
  const hidden = max && list.length > max ? list.length - max : 0;
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
      {shown.map((s, i) => (
        <Chip key={i} label={String(s)} size="small" color={color} variant="outlined" sx={{ fontWeight: 500 }} />
      ))}
      {hidden > 0 && <Chip label={`+${hidden}`} size="small" variant="outlined" sx={{ fontWeight: 600 }} />}
    </Box>
  );
}
