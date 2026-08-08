import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 2, textAlign: 'center' }}
    >
      <Typography variant="h1" sx={{ fontWeight: 800, background: 'linear-gradient(135deg,#2563EB,#14B8A6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>Page not found</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 360 }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button variant="contained" startIcon={<HomeRoundedIcon />} onClick={() => navigate('/')} sx={{ mt: 1 }}>
        Back to Dashboard
      </Button>
    </Box>
  );
}
