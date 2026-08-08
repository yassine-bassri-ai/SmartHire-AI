import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useTheme } from '@mui/material';

export interface DonutSlice {
  name: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutSlice[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
}

export default function DonutChart({ data, height = 260, innerRadius = 60, outerRadius = 95 }: DonutChartProps) {
  const theme = useTheme();
  if (!data || data.length === 0) return null;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={4}
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} stroke={theme.palette.background.paper} strokeWidth={2} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: 14, border: `1px solid ${theme.palette.divider}`, fontSize: '0.85rem' }} />
        <Legend wrapperStyle={{ fontSize: '0.8rem' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
