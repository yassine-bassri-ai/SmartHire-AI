import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Paper,
  Stack,
  Button,
  Grid,
  Skeleton,
  alpha,
  useTheme,
  Chip,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  PlayArrow as PlayIcon,
  Psychology as PsychologyIcon,
  Description as DescriptionIcon,
  Language as LanguageIcon,
  WorkspacePremium as CertIcon,
  Article as TextIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useResume } from '@/hooks/useResume';
import InfoRow from '@/components/cards/InfoRow';
import ChipList from '@/components/common/ChipList';
import RawText from '@/components/common/RawText';

export default function ResumeDetails() {
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  const navigate = useNavigate();
  const resumeId = id ? Number(id) : undefined;

  const { data: resume, isLoading, isError } = useResume(resumeId);

  const glassStyle = {
    background: alpha(theme.palette.background.paper, 0.6),
    backdropFilter: 'blur(20px)',
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    p: 4,
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 4 }} />
      </Container>
    );
  }

  if (isError || !resume) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Button startIcon={<BackIcon />} onClick={() => navigate('/resumes')} sx={{ mb: 3 }}>
          Back to Resumes
        </Button>
        <Paper sx={{ ...glassStyle, textAlign: 'center', py: 8 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>Resume not found</Typography>
          <Typography variant="body2" color="text.secondary">
            Make sure the FastAPI backend is running and this resume exists.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Button startIcon={<BackIcon />} onClick={() => navigate('/resumes')} sx={{ mb: 3 }}>
          Back to Resumes
        </Button>

        <Paper sx={glassStyle}>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} mb={4} spacing={2}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)}, ${alpha(theme.palette.secondary.main, 0.12)})`,
                  color: 'primary.main',
                }}
              >
                <PersonIcon />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 0.5 }}>
                  {resume.filename}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  ID: {resume.id} • {resume.language?.toUpperCase() ?? 'EN'} • {resume.experience_years ?? 0} Years Experience
                </Typography>
              </Box>
            </Stack>
            <Button
              variant="contained"
              startIcon={<PlayIcon />}
              onClick={() => navigate(`/predictions/${resume.id}`)}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
              }}
            >
              Run AI Matching
            </Button>
          </Stack>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, borderRadius: 3, bgcolor: alpha(theme.palette.background.default, 0.4) }}>
                <InfoRow icon={<PsychologyIcon fontSize="small" />} label="Skills">
                  <ChipList items={resume.skills} color="primary" empty="No skills detected" />
                </InfoRow>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, borderRadius: 3, bgcolor: alpha(theme.palette.background.default, 0.4) }}>
                <InfoRow icon={<LanguageIcon fontSize="small" />} label="Languages Spoken">
                  <ChipList items={resume.languages} color="secondary" empty="—" />
                </InfoRow>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, borderRadius: 3, bgcolor: alpha(theme.palette.background.default, 0.4) }}>
                <InfoRow icon={<DescriptionIcon fontSize="small" />} label="Education">
                  {resume.education?.length ? (
                    <Stack spacing={0.5}>
                      {resume.education.map((edu, i) => (
                        <Typography key={i} variant="body2">• {edu}</Typography>
                      ))}
                    </Stack>
                  ) : (
                    <Typography variant="body2" color="text.secondary">No education detected</Typography>
                  )}
                </InfoRow>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, borderRadius: 3, bgcolor: alpha(theme.palette.background.default, 0.4) }}>
                <InfoRow icon={<CertIcon fontSize="small" />} label="Certifications">
                  <ChipList items={resume.certifications} color="success" empty="—" />
                </InfoRow>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ p: 2, borderRadius: 3, bgcolor: alpha(theme.palette.background.default, 0.4) }}>
                <InfoRow icon={<TextIcon fontSize="small" />} label="Raw Text">
                  <RawText text={resume.raw_text} maxHeight={300} />
                </InfoRow>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                <Chip label={`${(resume.skills ?? []).length} Skills`} color="primary" variant="outlined" size="small" />
                <Chip label={`${(resume.education ?? []).length} Education`} color="secondary" variant="outlined" size="small" />
                <Chip label={`${(resume.certifications ?? []).length} Certifications`} color="success" variant="outlined" size="small" />
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>
    </Container>
  );
}
