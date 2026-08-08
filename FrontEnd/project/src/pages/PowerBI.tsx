import { Box, Typography, Alert, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import PageHeader, { CardWrapper, CardTitle } from '@/components/PageHeader';

const POWER_BI_EMBED = 'https://app.powerbi.com/view?r=eyJrIjoiZmFrZS1lbWJlZC11cmwiLCJhbGciOiJSUzI1NiJ9';

export default function PowerBI() {
  return (
    <Box>
      <PageHeader title="Power BI Dashboard" subtitle="Embedded analytics dashboard for recruitment insights" icon={<BarChartRoundedIcon />} />

      <CardWrapper
        sx={{
          overflow: 'hidden',
          position: 'relative',
          minHeight: { xs: 420, md: 620 },
          background: 'linear-gradient(135deg,rgba(37,99,235,0.04),rgba(20,184,166,0.04))',
        }}
      >
        <CardTitle title="Recruitment Analytics" action={<Typography variant="caption" sx={{ color: 'text.secondary' }}>Live embed</Typography>} />
        <Box sx={{ position: 'relative', width: '100%', height: { xs: 420, md: 600 }, p: 2 }}>
          <Box
            component={motion.iframe}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={POWER_BI_EMBED}
            title="Power BI Dashboard"
            sx={{
              width: '100%',
              height: '100%',
              border: 0,
              borderRadius: 3,
              bgcolor: 'background.paper',
            }}
            allowFullScreen
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 16,
              borderRadius: 3,
              bgcolor: 'rgba(255,255,255,0.96)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              p: 4,
              gap: 1.5,
              backdropFilter: 'blur(4px)',
            }}
          >
            <BarChartRoundedIcon sx={{ fontSize: 56, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Power BI Embed</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 480 }}>
              Replace the embed URL in <code>src/pages/PowerBI.tsx</code> with your published Power BI report link to display live analytics here.
            </Typography>
            <Alert severity="info" sx={{ mt: 1, borderRadius: 2, maxWidth: 480 }}>
              In Power BI: File → Embed report → Publish to web (public) → copy the link.
            </Alert>
          </Box>
        </Box>
      </CardWrapper>
    </Box>
  );
}
