import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  CircularProgress,
  alpha,
  useTheme,
} from '@mui/material';

import {
  PeopleRounded as PeopleIcon,
  WorkRounded as WorkIcon,
  AutoGraphRounded as PredictionIcon,
  CheckCircleRounded as SuccessIcon,
  LanguageRounded as LanguageIcon,
  TrendingUpRounded as TrendingUpIcon,
} from '@mui/icons-material';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

import PageHeader from '@/components/PageHeader';

interface LanguageStat {
  language: string;
  total: number;
}

interface TopJob {
  job_id: number;
  job_title: string;
  matches: number;
  average_score: number;
}

interface ScoreDistribution {
  score_range: string;
  total: number;
}

interface AnalyticsData {
  total_resumes: number;
  total_jobs: number;
  total_predictions: number;
  average_score: number;
  successful_predictions: number;
  languages: LanguageStat[];
  top_jobs: TopJob[];
  score_distribution: ScoreDistribution[];
}

interface AnalyticsResponse {
  success: boolean;
  analytics: AnalyticsData;
}

const API_URL = 'http://127.0.0.1:8000';

export default function Analytics() {
  const theme = useTheme();

  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(`${API_URL}/analytics`);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data: AnalyticsResponse = await response.json();

        if (!data.success) {
          throw new Error('Analytics API returned success=false');
        }

        setAnalytics(data.analytics);
      } catch (err) {
        console.error('Analytics error:', err);
        setError('Impossible de charger les analytics.');
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 4 }}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: 400 }}
        >
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>
            Chargement des analytics...
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (error || !analytics) {
    return (
      <Box sx={{ p: 4 }}>
        <PageHeader
          title="Analytics"
          subtitle="Analyse globale de la plateforme SmartHire AI"
          icon={<TrendingUpIcon />}
        />

        <Paper
          sx={{
            mt: 3,
            p: 5,
            textAlign: 'center',
            borderRadius: 4,
          }}
        >
          <Typography color="error" variant="h6">
            {error || 'Aucune donnée disponible'}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Vérifie que le backend FastAPI est démarré.
          </Typography>
        </Paper>
      </Box>
    );
  }

  const statCards = [
    {
      title: 'Total Candidates',
      value: analytics.total_resumes,
      icon: <PeopleIcon />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Total Jobs',
      value: analytics.total_jobs,
      icon: <WorkIcon />,
      color: theme.palette.secondary.main,
    },
    {
      title: 'Predictions',
      value: analytics.total_predictions,
      icon: <PredictionIcon />,
      color: '#8B5CF6',
    },
    {
      title: 'Successful Matches',
      value: analytics.successful_predictions,
      icon: <SuccessIcon />,
      color: '#10B981',
    },
  ];

  const languageData = analytics.languages.map((item) => ({
    name: item.language.toUpperCase(),
    value: item.total,
  }));

  const scoreData = analytics.score_distribution.map((item) => ({
    range: item.score_range,
    total: item.total,
  }));

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>

      <PageHeader
        title="Analytics"
        subtitle="Analyse globale des candidats, offres et performances IA"
        icon={<TrendingUpIcon />}
      />

      {/* ========================= */}
      {/* KPI CARDS */}
      {/* ========================= */}

      <Box
        sx={{
          mt: 3,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 2,
        }}
      >
        {statCards.map((stat) => (
          <Paper
            key={stat.title}
            sx={{
              p: 2.5,
              borderRadius: 4,
              border: `1px solid ${alpha(
                theme.palette.divider,
                0.15
              )}`,
              background: alpha(
                theme.palette.background.paper,
                0.7
              ),
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {stat.title}
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight={800}
                  sx={{ mt: 1 }}
                >
                  {stat.value.toLocaleString()}
                </Typography>
              </Box>

              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: stat.color,
                  backgroundColor: alpha(stat.color, 0.1),
                }}
              >
                {stat.icon}
              </Box>
            </Stack>
          </Paper>
        ))}
      </Box>

      {/* ========================= */}
      {/* SCORE + AVERAGE */}
      {/* ========================= */}

      <Box
        sx={{
          mt: 3,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
          },
          gap: 2,
        }}
      >
        <Paper
          sx={{
            p: 3,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={700}
          >
            Average AI Match Score
          </Typography>

          <Typography
            variant="h2"
            fontWeight={800}
            sx={{
              mt: 2,
              color: 'primary.main',
            }}
          >
            {analytics.average_score.toFixed(2)}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Average score across all predictions
          </Typography>
        </Paper>

        <Paper
          sx={{
            p: 3,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={700}
          >
            Successful Predictions
          </Typography>

          <Typography
            variant="h2"
            fontWeight={800}
            sx={{
              mt: 2,
              color: '#10B981',
            }}
          >
            {analytics.successful_predictions}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Predictions classified as successful matches
          </Typography>
        </Paper>
      </Box>

      {/* ========================= */}
      {/* CHARTS */}
      {/* ========================= */}

      <Box
        sx={{
          mt: 3,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
          },
          gap: 2,
        }}
      >

        {/* LANGUAGE CHART */}

        <Paper
          sx={{
            p: 3,
            borderRadius: 4,
            minHeight: 400,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ mb: 2 }}
          >
            Candidates by Language
          </Typography>

          <Box sx={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={languageData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {languageData.map((_, index) => (
                    <Cell key={index} />
                  ))}
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>

        {/* SCORE DISTRIBUTION */}

        <Paper
          sx={{
            p: 3,
            borderRadius: 4,
            minHeight: 400,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ mb: 2 }}
          >
            Score Distribution
          </Typography>

          <Box sx={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="range" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="total"
                  name="Predictions"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>

      </Box>

      {/* ========================= */}
      {/* TOP JOBS */}
      {/* ========================= */}

      <Paper
        sx={{
          mt: 3,
          p: 3,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ mb: 3 }}
        >
          Top Matching Jobs
        </Typography>

        <Stack spacing={2}>
          {analytics.top_jobs.map((job, index) => (
            <Box
              key={job.job_id}
              sx={{
                p: 2,
                borderRadius: 3,
                backgroundColor: alpha(
                  theme.palette.primary.main,
                  0.04
                ),
                border: `1px solid ${alpha(
                  theme.palette.divider,
                  0.12
                )}`,
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ minWidth: 0 }}
                >
                  <Chip
                    label={`#${index + 1}`}
                    size="small"
                    color={
                      index === 0
                        ? 'primary'
                        : 'default'
                    }
                  />

                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      fontWeight={600}
                      noWrap
                    >
                      {job.job_title}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      Job ID: {job.job_id} •{' '}
                      {job.matches} matches
                    </Typography>
                  </Box>
                </Stack>

                <Typography
                  fontWeight={800}
                  color="primary.main"
                >
                  {job.average_score.toFixed(0)}%
                </Typography>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Paper>

    </Box>
  );
}