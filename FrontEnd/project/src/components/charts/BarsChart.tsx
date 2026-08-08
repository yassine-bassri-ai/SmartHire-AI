import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { useTheme } from '@mui/material';

export interface BarDatum {
  name: string;
  value: number;
  color?: string;
}

interface BarsChartProps {
  data: BarDatum[];
  height?: number;
  horizontal?: boolean;
  color?: string;
}

export default function BarsChart({ data, height = 260, horizontal = false, color = '#2563EB' }: BarsChartProps) {
  const theme = useTheme();
  if (!data || data.length === 0) return null;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout={horizontal ? 'vertical' : 'horizontal'} margin={{ left: 10, right: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} horizontal={!horizontal} vertical={horizontal} />
        {horizontal ? (
          <>
            <XAxis type="number" tick={{ fontSize: 12, fill: theme.palette.text.secondary }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 11, fill: theme.palette.text.secondary }} axisLine={false} tickLine={false} />
          </>
        ) : (
          <>
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: theme.palette.text.secondary }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: theme.palette.text.secondary }} axisLine={false} tickLine={false} />
          </>
        )}
        <Tooltip contentStyle={{ borderRadius: 14, border: `1px solid ${theme.palette.divider}`, fontSize: '0.85rem' }} cursor={{ fill: theme.palette.action.hover }} />
        <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={24}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color ?? color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
