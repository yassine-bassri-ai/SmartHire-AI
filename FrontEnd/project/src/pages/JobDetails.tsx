import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Paper,
  Stack,
  Button,
  Skeleton,
  alpha,
  useTheme,
  Chip,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  Psychology as PsychologyIcon,
  Language as LanguageIcon,
  Article as TextIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useJob } from '@/hooks/useJob';
import InfoRow from '@/components/cards/InfoRow';
import ChipList from '@/components/common/ChipList';
import RawText from '@/components/common/RawText';

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  const navigate = useNavigate();
  const jobId = id ? Number(id) : undefined;

  const { data: job, isLoading, isError } = useJob(jobId);

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

  if (isError || !job) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Button startIcon={<BackIcon />} onClick={() => navigate('/jobs')} sx={{ mb: 3 }}>
          Back to Jobs
        </Button>
        <Paper sx={{ ...glassStyle, textAlign: 'center', py: 8 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>Job not found</Typography>
          <Typography variant="body2" color="text.secondary">
            Make sure the FastAPI backend is running and this job exists.
          </Typography>
        </Paper>
      </Container>
    );
  }

  const title = job.job_title || job.title || job.filename || 'Untitled Job';

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Button startIcon={<BackIcon />} onClick={() => navigate('/jobs')} sx={{ mb: 3 }}>
          Back to Jobs
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
                  background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.12)}, ${alpha(theme.palette.primary.main, 0.12)})`,
                  color: 'secondary.main',
                }}
              >
                <WorkIcon />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 0.5 }}>
                  {title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Job ID: {job.id}
                  {job.company ? ` • ${job.company}` : ''}
                </Typography>
              </Box>
            </Stack>
            {job.experience_required !== undefined && (
              <Chip label={`${job.experience_required} Yrs Required`} color="secondary" />
            )}
          </Stack>

          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
              <Box sx={{ flex: 1, p: 2, borderRadius: 3, bgcolor: alpha(theme.palette.background.default, 0.4) }}>
                <InfoRow icon={<PsychologyIcon fontSize="small" />} label="Required Skills">
                  <ChipList items={job.skills} color="secondary" empty="No skills detected" />
                </InfoRow>
              </Box>
              <Box sx={{ flex: 1, p: 2, borderRadius: 3, bgcolor: alpha(theme.palette.background.default, 0.4) }}>
                <InfoRow icon={<LanguageIcon fontSize="small" />} label="Language">
                  <Chip label={job.language?.toUpperCase() ?? 'EN'} size="small" variant="outlined" />
                </InfoRow>
              </Box>
            </Stack>

            {(job.company || job.job_title) && (
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                {job.company && (
                  <Box sx={{ flex: 1, p: 2, borderRadius: 3, bgcolor: alpha(theme.palette.background.default, 0.4) }}>
                    <InfoRow icon={<BusinessIcon fontSize="small" />} label="Company">
                      <Typography variant="body2">{job.company}</Typography>
                    </InfoRow>
                  </Box>
                )}
                {job.title && (
                  <Box sx={{ flex: 1, p: 2, borderRadius: 3, bgcolor: alpha(theme.palette.background.default, 0.4) }}>
                    <InfoRow icon={<CategoryIcon fontSize="small" />} label="Job Title">
                      <Typography variant="body2">{job.title}</Typography>
                    </InfoRow>
                  </Box>
                )}
              </Stack>
            )}

            <Box sx={{ p: 2, borderRadius: 3, bgcolor: alpha(theme.palette.background.default, 0.4) }}>
              <InfoRow icon={<TextIcon fontSize="small" />} label="Description / Raw Text">
                <RawText text={job.description || job.raw_text} maxHeight={400} />
              </InfoRow>
            </Box>
          </Stack>
        </Paper>
      </motion.div>
    </Container>
  );
}
