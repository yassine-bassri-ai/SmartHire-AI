import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Container, Grid2 as Grid, Stack, Chip, useTheme, IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import { useThemeMode } from '@/context/ThemeContext';

const features = [
  { icon: <UploadFileRoundedIcon />, title: 'Resume Parsing', desc: 'AI extracts skills, experience, education, languages and certifications from any PDF instantly.' },
  { icon: <FileUploadRoundedIcon />, title: 'Job Parsing', desc: 'Upload job descriptions and automatically structure requirements for accurate matching.' },
  { icon: <CompareArrowsRoundedIcon />, title: 'Smart Matching', desc: 'Compare resumes against jobs using advanced NLP and semantic embeddings.' },
  { icon: <EmojiEventsRoundedIcon />, title: 'Candidate Ranking', desc: 'Rank candidates by AI prediction scores to shortlist the best-fit talent fast.' },
];

const stats = [
  { value: '98%', label: 'Parsing Accuracy' },
  { value: '10x', label: 'Faster Screening' },
  { value: '500+', label: 'Skills Detected' },
  { value: '24/7', label: 'AI Availability' },
];

export default function Landing() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { mode, toggleMode } = useThemeMode();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      {/* Nav */}
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          bgcolor: theme.palette.mode === 'light' ? 'rgba(248,250,252,0.8)' : 'rgba(11,17,32,0.8)',
          backdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
              <Box sx={{ width: 40, height: 40, borderRadius: 3, background: 'linear-gradient(135deg,#2563EB,#14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px -6px rgba(37,99,235,0.5)' }}>
                <AutoAwesomeRoundedIcon sx={{ color: '#fff', fontSize: 22 }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.1 }}>SmartHire</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.1em', fontWeight: 600 }}>AI RECRUITMENT</Typography>
              </Box>
            </Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton onClick={toggleMode} size="small">
                {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
              </IconButton>
              <Button variant="outlined" color="primary" onClick={() => navigate('/')}>Dashboard</Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(37,99,235,0.08), rgba(20,184,166,0.08))',
        }}
      >
        {/* Decorative blobs */}
        <Box sx={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.18), transparent 70%)' }} />
        <Box sx={{ position: 'absolute', bottom: -60, left: -60, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(20,184,166,0.18), transparent 70%)' }} />

        <Container maxWidth="lg" sx={{ position: 'relative', py: { xs: 8, md: 12 } }}>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Chip
                  icon={<AutoAwesomeRoundedIcon sx={{ fontSize: 16 }} />}
                  label="AI-Powered Recruitment Platform"
                  color="primary"
                  variant="outlined"
                  sx={{ fontWeight: 600, mb: 3 }}
                />
                <Typography variant="h1" sx={{ fontWeight: 800, mb: 2, lineHeight: 1.1 }}>
                  Hire the best talent with{' '}
                  <Box component="span" sx={{ background: 'linear-gradient(135deg,#2563EB,#14B8A6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    AI intelligence
                  </Box>
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, mb: 4, maxWidth: 560, lineHeight: 1.6 }}>
                  Upload resumes and job descriptions. SmartHire AI parses, compares and ranks candidates using
                  advanced machine learning — so your HR team can focus on the best-fit people.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button variant="contained" color="primary" size="large" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate('/upload-resume')}>
                    Upload a Resume
                  </Button>
                  <Button variant="outlined" color="primary" size="large" onClick={() => navigate('/predictions')} startIcon={<InsightsRoundedIcon />}>
                    Run Predictions
                  </Button>
                </Stack>
              </motion.div>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.15 }}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    background: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: '0 20px 60px -20px rgba(37,99,235,0.3)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: 'rgba(37,99,235,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main' }}>
                      <EmojiEventsRoundedIcon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Top Match</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>Candidate ranking</Typography>
                    </Box>
                    <Chip label="94%" color="success" sx={{ ml: 'auto', fontWeight: 700 }} />
                  </Box>
                  {[
                    { name: 'Sarah Chen', role: 'Senior Backend Engineer', score: 94, color: '#16A34A' },
                    { name: 'John Doe', role: 'Full Stack Developer', score: 88, color: '#2563EB' },
                    { name: 'Maria Garcia', role: 'ML Engineer', score: 81, color: '#F59E0B' },
                  ].map((c, i) => (
                    <motion.div key={c.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.15 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1.25, borderBottom: i < 2 ? `1px solid ${theme.palette.divider}` : 'none' }}>
                        <Box sx={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#2563EB,#14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}>
                          {c.name.split(' ').map(n => n[0]).join('')}
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{c.name}</Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{c.role}</Typography>
                        </Box>
                        <Box sx={{ width: 60, height: 6, borderRadius: 999, bgcolor: theme.palette.divider }}>
                          <Box sx={{ width: `${c.score}%`, height: '100%', borderRadius: 999, bgcolor: c.color }} />
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, width: 32, textAlign: 'right' }}>{c.score}%</Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={3}>
          {stats.map((s, i) => (
            <Grid size={{ xs: 6, md: 3 }} key={s.label}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Box sx={{ textAlign: 'center', p: 3, borderRadius: 4, border: `1px solid ${theme.palette.divider}` }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, background: 'linear-gradient(135deg,#2563EB,#14B8A6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {s.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mt: 0.5 }}>{s.label}</Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features */}
      <Box sx={{ bgcolor: theme.palette.mode === 'light' ? 'rgba(37,99,235,0.03)' : 'rgba(255,255,255,0.02)', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Everything you need to hire smarter</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 560, mx: 'auto' }}>
              A complete AI recruitment suite that transforms how HR teams parse, match and rank candidates.
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {features.map((f, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={f.title}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Box
                    sx={{
                      p: 3,
                      height: '100%',
                      borderRadius: 4,
                      border: `1px solid ${theme.palette.divider}`,
                      transition: 'all 0.2s',
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 16px 40px -16px rgba(37,99,235,0.25)' },
                    }}
                  >
                    <Box sx={{ width: 52, height: 52, borderRadius: 3, background: 'linear-gradient(135deg,rgba(37,99,235,0.12),rgba(20,184,166,0.12))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main', mb: 2 }}>
                      {f.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>{f.title}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{f.desc}</Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Box
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 5,
            textAlign: 'center',
            background: 'linear-gradient(135deg,#2563EB,#14B8A6)',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
          <Box sx={{ position: 'absolute', bottom: -80, left: -40, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
          <Box sx={{ position: 'relative' }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Ready to transform your recruitment?</Typography>
            <Typography sx={{ mb: 3, opacity: 0.9 }}>Start uploading resumes and let AI do the heavy lifting.</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button variant="contained" size="large" sx={{ bgcolor: '#fff', color: '#2563EB', ':hover': { bgcolor: '#f1f5f9' } }} onClick={() => navigate('/upload-resume')}>
                Get Started
              </Button>
              <Button variant="outlined" size="large" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.6)', ':hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' } }} onClick={() => navigate('/')}>
                Explore Dashboard
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ borderTop: `1px solid ${theme.palette.divider}`, py: 3 }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ width: 28, height: 28, borderRadius: 2, background: 'linear-gradient(135deg,#2563EB,#14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AutoAwesomeRoundedIcon sx={{ color: '#fff', fontSize: 16 }} />
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>SmartHire AI</Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Stack direction="row" spacing={0.5} alignItems="center">
                <VerifiedRoundedIcon sx={{ fontSize: 16, color: 'success.main' }} />
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>AI Driven</Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <SpeedRoundedIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Fast</Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <SecurityRoundedIcon sx={{ fontSize: 16, color: 'secondary.main' }} />
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Secure</Typography>
              </Stack>
            </Stack>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>© {new Date().getFullYear()} SmartHire AI. All rights reserved.</Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
