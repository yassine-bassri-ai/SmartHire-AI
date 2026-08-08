import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  LinearProgress,
  alpha,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  PlayArrow as PlayIcon,
  AutoAwesome as AutoAwesomeIcon,
  Insights as InsightsIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useResume } from '@/hooks/useResume';
import { useRunPrediction, usePredictions } from '@/hooks/usePrediction';
import ScoreBadge, { scoreColor, scoreLabel } from '@/components/common/ScoreBadge';
import type { Prediction } from '@/utils/types';

const LOADING_STEPS = [
  'Extracting candidate features…',
  'Computing semantic similarity…',
  'Scoring against job descriptions…',
  'Ranking best matches…',
];

export default function PredictionPage() {
  const { resumeId } = useParams<{ resumeId: string }>();
  const theme = useTheme();
  const navigate = useNavigate();
  const id = resumeId ? Number(resumeId) : undefined;

  const { data: resume } = useResume(id);
  const runMutation = useRunPrediction();
  const { data: previous = [], isLoading: loadingPrev } = usePredictions(id);

  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [hasRun, setHasRun] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [sortBy, setSortBy] = useState<'score' | 'probability'>('score');
  const [minScore, setMinScore] = useState('');
  const [selectedJob, setSelectedJob] = useState<Prediction | null>(null);

  useEffect(() => {
    if (previous.length > 0) {
      setPredictions(previous);
      setHasRun(true);
    }
  }, [previous]);

  const run = async () => {
    if (!id) return;
    setHasRun(true);
    setLoadingStep(0);
    const stepTimer = window.setInterval(() => {
      setLoadingStep((s) => Math.min(s + 1, LOADING_STEPS.length - 1));
    }, 900);
    try {
      const result = await runMutation.mutateAsync(id);
      window.clearInterval(stepTimer);
      setPredictions(result);
      toast.success(`AI Matching complete — ${result.length} job matches found!`);
    } catch {
      window.clearInterval(stepTimer);
      toast.error('Failed to run predictions. Ensure the model is trained and jobs exist.');
    }
  };

  const sorted = useMemo(() => {
    const list = [...predictions];
    list.sort((a, b) => {
      const va = sortBy === 'score' ? a.score : a.probability * 100;
      const vb = sortBy === 'score' ? b.score : b.probability * 100;
      return vb - va;
    });
    return list
      .map((p, i) => ({ ...p, rank: i + 1 }))
      .filter((p) => !minScore || p.score >= Number(minScore));
  }, [predictions, sortBy, minScore]);

  const glassStyle = {
    background: alpha(theme.palette.background.paper, 0.6),
    backdropFilter: 'blur(20px)',
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    p: 4,
  };

  const isPending = runMutation.isPending;

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Button startIcon={<BackIcon />} onClick={() => navigate(-1)} sx={{ mb: 3 }}>
          Back
        </Button>

        {/* Header */}
        <Paper sx={{ ...glassStyle, mb: 4, p: 3 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ md: 'center' }} spacing={2}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)}, ${alpha(theme.palette.secondary.main, 0.12)})`,
                  color: 'primary.main',
                }}
              >
                <InsightsIcon />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="bold">AI Match Predictions</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Resume: {resume?.filename ?? `#${id}`}
                </Typography>
              </Box>
            </Stack>
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayIcon />}
              onClick={run}
              disabled={isPending}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
              }}
            >
              {isPending ? 'Analyzing…' : predictions.length ? 'Re-run AI' : 'Run AI Matching'}
            </Button>
          </Stack>
        </Paper>

        {/* Loading state */}
        {isPending && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{ display: 'inline-block' }}
            >
              <AutoAwesomeIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.div
                key={loadingStep}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
              >
                <Typography variant="h6" sx={{ mt: 2 }}>{LOADING_STEPS[loadingStep]}</Typography>
              </motion.div>
            </AnimatePresence>
            <LinearProgress sx={{ mt: 3, maxWidth: 300, mx: 'auto', height: 8, borderRadius: 4 }} />
          </Box>
        )}

        {/* Results */}
        {!isPending && hasRun && (
          <>
            {/* Toolbar */}
            <Paper sx={{ ...glassStyle, mb: 3, p: 2 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }} justifyContent="space-between">
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Top {sorted.length} Job Matches
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select value={sortBy} label="Sort By" onChange={(e) => setSortBy(e.target.value as 'score' | 'probability')}>
                      <MenuItem value="score">Score</MenuItem>
                      <MenuItem value="probability">Probability</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>Min Score</InputLabel>
                    <Select value={minScore} label="Min Score" onChange={(e) => setMinScore(e.target.value)}>
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="50">50+</MenuItem>
                      <MenuItem value="70">70+</MenuItem>
                      <MenuItem value="85">85+</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Stack>
            </Paper>

            {/* Result cards */}
            {sorted.length === 0 ? (
              <Paper sx={{ ...glassStyle, textAlign: 'center', py: 8 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>No matches found</Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting the filters or run predictions with a different resume.
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                <AnimatePresence>
                  {sorted.map((job) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={job.job_id}>
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (job.rank! - 1) * 0.05, type: 'spring', stiffness: 100 }}
                      >
                        <Card
                          sx={{
                            ...glassStyle,
                            p: 0,
                            height: '100%',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'translateY(-8px)', borderColor: theme.palette.primary.main },
                          }}
                        >
                          <CardContent>
                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
                              <Chip
                                label={`#${job.rank}`}
                                size="small"
                                sx={{
                                  fontWeight: 700,
                                  bgcolor: job.rank === 1 ? 'rgba(245,158,11,0.14)' : 'action.hover',
                                  color: job.rank === 1 ? 'accent.main' : 'text.primary',
                                }}
                              />
                              <ScoreBadge score={job.score} />
                            </Stack>
                            <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5, minHeight: 40 }}>
                              {job.job_title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {scoreLabel(job.score)} match
                            </Typography>

                            <Box sx={{ mt: 2 }}>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Match Probability
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={job.probability * 100}
                                sx={{
                                  height: 8,
                                  borderRadius: 4,
                                  bgcolor: alpha(theme.palette.divider, 0.1),
                                  '& .MuiLinearProgress-bar': { bgcolor: scoreColor(job.score) },
                                }}
                              />
                              <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
                                {(job.probability * 100).toFixed(2)}% confidence
                              </Typography>
                            </Box>

                            <Button
                              fullWidth
                              variant="outlined"
                              sx={{ mt: 2 }}
                              onClick={() => setSelectedJob(job)}
                            >
                              View Job Details
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </AnimatePresence>
              </Grid>
            )}
          </>
        )}

        {!isPending && !hasRun && !loadingPrev && (
          <Paper sx={{ ...glassStyle, textAlign: 'center', py: 8 }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                mx: 'auto',
                mb: 2,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: 'primary.main',
              }}
            >
              <InsightsIcon sx={{ fontSize: 36 }} />
            </Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>No predictions yet</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420, mx: 'auto' }}>
              Click "Run AI Matching" to analyze this resume against all job descriptions and rank the best matches.
            </Typography>
          </Paper>
        )}
      </motion.div>

      {/* Job details dialog */}
      <Dialog open={Boolean(selectedJob)} onClose={() => setSelectedJob(null)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {selectedJob?.job_title}
          <Tooltip title="Close">
            <IconButton size="small" onClick={() => setSelectedJob(null)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <DialogContent dividers>
          {selectedJob && (
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip label={`Job ID: ${selectedJob.job_id}`} size="small" variant="outlined" />
                <ScoreBadge score={selectedJob.score} />
              </Stack>
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>Match Probability</Typography>
                <LinearProgress
                  variant="determinate"
                  value={selectedJob.probability * 100}
                  sx={{ mt: 0.5, height: 8, borderRadius: 4, '& .MuiLinearProgress-bar': { bgcolor: scoreColor(selectedJob.score) } }}
                />
                <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                  {(selectedJob.probability * 100).toFixed(2)}%
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>Match Score</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: scoreColor(selectedJob.score) }}>
                  {Math.round(selectedJob.score)}%
                </Typography>
                <Typography variant="body2" color="text.secondary">{scoreLabel(selectedJob.score)} match</Typography>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedJob(null)}>Close</Button>
          <Button
            variant="contained"
            onClick={() => {
              const jid = selectedJob?.job_id;
              setSelectedJob(null);
              if (jid !== undefined) navigate(`/jobs/${jid}`);
            }}
          >
            Open Full Job
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
