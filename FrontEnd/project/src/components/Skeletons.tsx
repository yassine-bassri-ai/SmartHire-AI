import { Box, Skeleton, Card, CardContent, Stack } from '@mui/material';

export function StatCardSkeleton() {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="40%" height={20} />
            <Skeleton variant="text" width="60%" height={40} />
            <Skeleton variant="text" width="50%" height={16} />
          </Box>
          <Skeleton variant="circular" width={48} height={48} />
        </Stack>
      </CardContent>
    </Card>
  );
}

export function TableSkeleton({ rows = 6, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <Card>
      <CardContent>
        <Skeleton variant="text" width="20%" height={28} sx={{ mb: 2 }} />
        <Stack spacing={1.5}>
          {Array.from({ length: rows }).map((_, r) => (
            <Stack key={r} direction="row" spacing={2}>
              {Array.from({ length: cols }).map((_, c) => (
                <Skeleton key={c} variant="text" width={`${100 / cols}%`} height={24} />
              ))}
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export function ChartSkeleton() {
  return (
    <Card sx={{ height: 320 }}>
      <CardContent>
        <Skeleton variant="text" width="30%" height={24} sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: 220, gap: 2 }}>
          {[40, 70, 55, 90, 65, 80, 45].map((h, i) => (
            <Skeleton key={i} variant="rectangular" width="8%" height={`${h}%`} sx={{ borderRadius: 2 }} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export function FullPageLoader() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <StatCardSkeleton />
      <ChartSkeleton />
      <TableSkeleton />
    </Box>
  );
}
