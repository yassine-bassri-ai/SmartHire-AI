import { Box, Typography } from '@mui/material';

interface RawTextProps {
  text?: string;
  maxHeight?: number;
}

export default function RawText({ text, maxHeight = 320 }: RawTextProps) {
  if (!text || !text.trim()) {
    return <Typography variant="body2" sx={{ color: 'text.secondary' }}>No raw text available.</Typography>;
  }
  return (
    <Box
      sx={{
        mt: 1,
        p: 2,
        maxHeight,
        overflow: 'auto',
        borderRadius: 2,
        bgcolor: 'action.hover',
        border: (t) => `1px solid ${t.palette.divider}`,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        fontFamily: 'monospace',
        fontSize: '0.8rem',
        lineHeight: 1.6,
        color: 'text.secondary',
      }}
    >
      {text}
    </Box>
  );
}
