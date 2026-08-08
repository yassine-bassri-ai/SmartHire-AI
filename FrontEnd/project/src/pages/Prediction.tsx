import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box, Grid2 as Grid, CardContent, Typography, Button, MenuItem, Select, FormControl, InputLabel, Stack,
  LinearProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import PageHeader, { CardWrapper, CardTitle } from '@/components/PageHeader';
import PredictionTable from '@/components/prediction/PredictionTable';
import EmptyData from '@/components/layout/EmptyData';
import ScoreBadge, { scoreLabel } from '@/components/common/ScoreBadge';
import { useResumes } from '@/hooks/useResume';
import { useRunPrediction } from '@/hooks/usePrediction';
import { useQueryClient } from '@tanstack/react-query';
import { predictionKeys } from '@/hooks/usePrediction';
import type { Prediction } from '@/utils/types';
import toast from 'react-hot-toast';

const LOADING_STEPS = [
  'Extracting candidate features…',
  'Computing semantic similarity…',
  'Scoring against job descriptions…',
  'Ranking best matches…',
];

export default function Prediction() {
  const [searchParams] = useSearchParams();
  const qc = useQueryClient();
  const { data: resumes = [], isLoading } = useResumes();
  const initial = searchParams.get('resume') ?? '';
  const [selectedResume, setSelectedResume] = useState<string>(initial);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [hasRun, setHasRun] = useState(false);
  const runMutation = useRunPrediction();

  const selectedId = selectedResume ? Number(selectedResume) : undefined;

  const run = async () => {
    if (!selectedId) {
      toast.error('Please select a resume first');
      return;
    }
    try {
      const result = await runMutation.mutateAsync(selectedId);
      setPredictions(result);
      setHasRun(true);
      qc.invalidateQueries({ queryKey: predictionKeys.all });
      toast.success(`Found ${result.length} job matches`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Prediction failed');
    }
  };

  const topMatch = predictions[0]?.score ?? 0;
  const loadingStep = useMemo(() => {
    return LOADING_STEPS[Math.min(Math.floor((Date.now() / 1200) % LOADING_STEPS.length), LOADING_STEPS.length - 1)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runMutation.isPending]);

  return (
    <Box>
      <PageHeader
        title="Prediction Page"
        subtitle="Select a resume and run AI-powered job match predictions"
        icon={<InsightsRoundedIcon />}
      />

      <Grid container spacing={3}>
        {/* Control panel */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CardWrapper>
            <CardTitle title="Configure Prediction" />
            <CardContent sx={{ pt: 1 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Select Resume</InputLabel>
                <Select
                  value={selectedResume}
                  label="Select Resume"
                  onChange={(e) => setSelectedResume(e.target.value)}
                >
                  {resumes.map((r) => (
                    <MenuItem key={r.id} value={r.id}>{r.filename}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={run}
                disabled={runMutation.isPending || !selectedId}
                sx={{ mt: 2 }}
                startIcon={<AutoAwesomeRoundedIcon />}
              >
                {runMutation.isPending ? 'Generating…' : 'Run Prediction'}
              </Button>

              {isLoading && (
                <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'text.secondary' }}>
                  Loading resumes…
                </Typography>
              )}
              {!isLoading && resumes.length === 0 && (
                <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'text.secondary' }}>
                  No resumes uploaded yet. Please upload one first.
                </Typography>
              )}

              {hasRun && predictions.length > 0 && (
                <Box sx={{ mt: 3, p: 2, borderRadius: 3, bgcolor: 'action.hover' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>TOP MATCH</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, flex: 1, minWidth: 0, mr: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {predictions[0].job_title}
                    </Typography>
                    <ScoreBadge score={topMatch} />
                  </Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {scoreLabel(topMatch)} match · {(predictions[0].probability * 100).toFixed(1)}% probability
                  </Typography>
                </Box>
              )}
            </CardContent>
          </CardWrapper>
        </Grid>

        {/* Results */}
        <Grid size={{ xs: 12, md: 8 }}>
          <CardWrapper sx={{ height: '100%' }}>
            <CardTitle title="Ranking Results" action={hasRun && <ChipResult count={predictions.length} />} />
            <CardContent sx={{ pt: 1 }}>
              {runMutation.isPending ? (
                <Box sx={{ py: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Box sx={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg,#2563EB,#14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AutoAwesomeRoundedIcon sx={{ color: '#fff' }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Running prediction…</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>{loadingStep}</Typography>
                    </Box>
                  </Box>
                  <Stack spacing={1.5}>
                    {[90, 70, 82, 60, 75].map((v, i) => (
                      <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.15 }}>
                        <LinearProgress variant="determinate" value={v} sx={{ height: 8, borderRadius: 999 }} />
                      </motion.div>
                    ))}
                  </Stack>
                </Box>
              ) : !hasRun ? (
                <EmptyData
                  title="No predictions yet"
                  description="Select a resume and click 'Run Prediction' to see ranked job matches with scores and probabilities."
                  icon={<InsightsRoundedIcon sx={{ fontSize: 40 }} />}
                />
              ) : predictions.length === 0 ? (
                <EmptyData title="No matches found" description="Try selecting a different resume or ensure jobs are uploaded." />
              ) : (
                <PredictionTable predictions={predictions} />
              )}
            </CardContent>
          </CardWrapper>
        </Grid>
      </Grid>
    </Box>
  );
}

function ChipResult({ count }: { count: number }) {
  return (
    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
      {count} matches
    </Typography>
  );
}
