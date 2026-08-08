import { Box, LinearProgress, Typography } from '@mui/material';

interface UploadProgressProps {
  uploading: boolean;
  progress: number;
  label?: string;
}

export default function UploadProgress({ uploading, progress, label }: UploadProgressProps) {
  if (!uploading) return null;
  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {label ?? 'Uploading…'}
        </Typography>
        <Typography variant="caption" sx={{ fontWeight: 700 }}>{progress}%</Typography>
      </Box>
      <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 999 }} />
    </Box>
  );
}
