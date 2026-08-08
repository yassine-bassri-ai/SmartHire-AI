import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Grid2 as Grid, Card, CardContent, Typography, Button, LinearProgress, Chip,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, Select, FormControl, InputLabel, Stack,
} from '@mui/material';
import { motion } from 'framer-motion';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import PageHeader, { CardWrapper, CardTitle } from '@/components/PageHeader';
import EmptyState from '@/components/EmptyState';
import { useResumes } from '@/hooks/useApi';
import { getPredictions, type Prediction } from '@/services/endpoints';
import toast from 'react-hot-toast';

function scoreColor(s: number) {
  if (s >= 85) return '#16A34A';
  if (s >= 70) return '#2563EB';
  if (s >= 50) return '#F59E0B';
  return '#DC2626';
}

export default function Predictions() {
  const navigate = useNavigate();
  const { data: resumes, loading } = useResumes();
  const [selectedResume, setSelectedResume] = useState<string>('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [fetching, setFetching] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (resumes && resumes.length > 0 && !selectedResume) {
      setSelectedResume(String(resumes[0].id ?? ''));
    }
  }, [resumes]);

  const runPredictions = async () => {
    if (!selectedResume) {
      toast.error('Please select a resume first');
      return;
    }
    setFetching(true);
    setHasFetched(true);
    try {
      const result = await getPredictions(selectedResume);
      setPredictions(result);
      toast.success(`Found ${result.length} job matches`);
    } catch (e) {
      // Fallback demo data
      setPredictions([
        { rank: 1, job_title: 'Senior Backend Engineer', company: 'TechCorp', probability: 0.94, prediction: 'Strong Match', matching_score: 94, job_id: 'job-1' },
        { rank: 2, job_title: 'Full Stack Developer', company: 'DataSys', probability: 0.88, prediction: 'Good Match', matching_score: 88, job_id: 'job-2' },
        { rank: 3, job_title: 'DevOps Engineer', company: 'CloudNet', probability: 0.81, prediction: 'Good Match', matching_score: 81, job_id: 'job-3' },
        { rank: 4, job_title: 'ML Engineer', company: 'AI Labs', probability: 0.76, prediction: 'Fair Match', matching_score: 76, job_id: 'job-4' },
        { rank: 5, job_title: 'Data Analyst', company: 'InsightCo', probability: 0.68, prediction: 'Fair Match', matching_score: 68, job_id: 'job-5' },
      ]);
      toast('Showing demo predictions (API unavailable)', { icon: 'ℹ️' });
    } finally {
      setFetching(false);
    }
  };

  return (
    <Box>
      <PageHeader
        title="Predictions"
        subtitle="Select a resume and generate AI-powered job match predictions"
        icon={<InsightsRoundedIcon />}
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <CardWrapper>
            <CardTitle title="Select Resume" />
            <CardContent sx={{ pt: 1 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Resume</InputLabel>
                <Select
                  value={selectedResume}
                  label="Resume"
                  onChange={(e) => setSelectedResume(e.target.value)}
                >
                  {(resumes ?? []).map((r, i) => (
                    <MenuItem key={r.id ?? i} value={String(r.id ?? i)}>
                      {r.filename ?? r.name ?? `Resume ${i + 1}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={runPredictions}
                disabled={fetching || !selectedResume}
                sx={{ mt: 2 }}
                startIcon={<InsightsRoundedIcon />}
              >
                {fetching ? 'Generating…' : 'Generate Predictions'}
              </Button>
            </CardContent>
          </CardWrapper>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <CardWrapper sx={{ height: '100%' }}>
            <CardTitle title="Match Results" />
            <CardContent sx={{ pt: 1 }}>
              {!hasFetched && !fetching ? (
                <EmptyState
                  title="No predictions yet"
                  description="Select a resume and click Generate Predictions to see ranked job matches with matching scores."
                  icon={<InsightsRoundedIcon sx={{ fontSize: 40 }} />}
                />
              ) : fetching ? (
                <Stack spacing={1.5}>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Box key={i} sx={{ p: 2, borderRadius: 2, bgcolor: 'action.hover' }}>
                      <LinearProgress sx={{ height: 8, borderRadius: 999 }} />
                    </Box>
                  ))}
                </Stack>
              ) : predictions.length === 0 ? (
                <EmptyState title="No matches found" description="Try selecting a different resume." />
              ) : (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Rank</TableCell>
                        <TableCell>Job Title</TableCell>
                        <TableCell>Company</TableCell>
                        <TableCell>Probability</TableCell>
                        <TableCell>Match</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {predictions.map((p, idx) => {
                        const score = Math.round((p.matching_score ?? p.probability * 100));
                        return (
                          <TableRow
                            key={idx}
                            component={motion.tr}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.06 }}
                            hover
                          >
                            <TableCell>
                              <Chip label={`#${p.rank}`} size="small" sx={{ fontWeight: 700, bgcolor: p.rank === 1 ? 'rgba(245,158,11,0.14)' : 'action.hover', color: p.rank === 1 ? 'accent.main' : 'text.primary' }} />
                            </TableCell>
                            <TableCell><Typography variant="body2" sx={{ fontWeight: 600 }}>{p.job_title}</Typography></TableCell>
                            <TableCell><Typography variant="body2" sx={{ color: 'text.secondary' }}>{p.company}</Typography></TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: scoreColor(score) }}>
                                {(p.probability * 100).toFixed(1)}%
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ minWidth: 100 }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={score}
                                  sx={{ height: 6, borderRadius: 999, '& .MuiLinearProgress-bar': { bgcolor: scoreColor(score) } }}
                                />
                              </Box>
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<PersonSearchRoundedIcon />}
                                onClick={() => navigate(`/candidate-analysis/${selectedResume}/${p.job_id ?? idx}`)}
                              >
                                Analyse
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </CardWrapper>
        </Grid>
      </Grid>
    </Box>
  );
}
