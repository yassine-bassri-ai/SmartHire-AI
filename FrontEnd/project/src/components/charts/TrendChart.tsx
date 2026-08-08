import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useTheme } from '@mui/material';

export interface TrendDatum {
  label: string;
  resumes?: number;
  jobs?: number;
  predictions?: number;
}

type Key = 'resumes' | 'jobs' | 'predictions';

interface TrendChartProps {
  data: TrendDatum[];
  dataKey?: Key;
  height?: number;
  color?: string;
}

export default function TrendChart({ data, dataKey = 'resumes', height = 280, color = '#2563EB' }: TrendChartProps) {
  const theme = useTheme();
  if (!data || data.length === 0) return null;
  const gradId = `grad-${dataKey}-${color.replace('#', '')}`;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
        <XAxis dataKey="label" tick={{ fontSize: 12, fill: theme.palette.text.secondary }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: theme.palette.text.secondary }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ borderRadius: 14, border: `1px solid ${theme.palette.divider}`, fontSize: '0.85rem' }} />
        <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} fill={`url(#${gradId})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
