import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Stack,
  useTheme,
  alpha,
  Avatar,
  Chip,
} from '@mui/material';

import {
  People as PeopleIcon,
  Work as WorkIcon,
  Insights as InsightsIcon,
  CheckCircle as CheckCircleIcon,
  Language as LanguageIcon,
  EmojiEvents as TrophyIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

import { motion } from 'framer-motion';

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { useQuery } from '@tanstack/react-query';

import {
  getAnalytics,
  type AnalyticsData,
} from '@/api/analyticsApi';


// ============================================================
// COLORS
// ============================================================

const PALETTE = [
  '#2563EB',
  '#14B8A6',
  '#F59E0B',
  '#0EA5E9',
  '#16A34A',
  '#DC2626',
  '#8B5CF6',
  '#EC4899',
];


// ============================================================
// DASHBOARD
// ============================================================

export default function Dashboard() {
  const theme = useTheme();
  const navigate = useNavigate();

  // ==========================================================
  // ANALYTICS
  // ==========================================================

  const {
    data: analytics,
    isLoading,
    isError,
  } = useQuery<AnalyticsData>({
    queryKey: ['analytics'],
    queryFn: getAnalytics,
    staleTime: 30_000,
  });


  // ==========================================================
  // DATA
  // ==========================================================

  const languages = useMemo(() => {
    return (analytics?.languages ?? []).map((item) => ({
      name: item.language?.toUpperCase() || 'UNKNOWN',
      value: item.total,
    }));
  }, [analytics]);


  const scoreDistribution = useMemo(() => {
    return (analytics?.score_distribution ?? []).map((item) => ({
      name: item.score_range,
      value: item.total,
    }));
  }, [analytics]);


  const topJobs = useMemo(() => {
    return (analytics?.top_jobs ?? []).map((job) => ({
      name:
        job.job_title && job.job_title.length > 28
          ? `${job.job_title.substring(0, 28)}...`
          : job.job_title || 'Unknown Job',
      matches: job.matches,
      score: job.average_score,
    }));
  }, [analytics]);


  // ==========================================================
  // KPI CARDS
  // ==========================================================

  const statCards = [
    {
      title: 'Total Candidates',
      value: analytics?.total_resumes ?? 0,
      icon: <PeopleIcon />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Total Jobs',
      value: analytics?.total_jobs ?? 0,
      icon: <WorkIcon />,
      color: theme.palette.secondary.main,
    },
    {
      title: 'Total Predictions',
      value: analytics?.total_predictions ?? 0,
      icon: <InsightsIcon />,
      color: theme.palette.warning.main,
    },
    {
      title: 'Successful Matches',
      value: analytics?.successful_predictions ?? 0,
      icon: <CheckCircleIcon />,
      color: theme.palette.success.main,
    },
  ];


  // ==========================================================
  // STYLES
  // ==========================================================

  const glassStyle = {
    background:
      theme.palette.mode === 'light'
        ? 'rgba(255,255,255,0.75)'
        : 'rgba(17,24,39,0.7)',

    backdropFilter: 'blur(20px)',

    WebkitBackdropFilter: 'blur(20px)',

    border: `1px solid ${alpha(
      theme.palette.divider,
      0.1
    )}`,

    boxShadow:
      '0 8px 32px 0 rgba(0, 0, 0, 0.08)',

    borderRadius: 4,

    p: 3,
  };


  const tooltipStyle = {
    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 12,
    fontSize: '0.85rem',
  };


  // ==========================================================
  // ERROR
  // ==========================================================

  if (isError) {
    return (
      <Container
        maxWidth="xl"
        sx={{ py: 6 }}
      >
        <Paper
          sx={{
            ...glassStyle,
            textAlign: 'center',
            py: 8,
          }}
        >
          <Typography
            variant="h5"
            color="error"
            fontWeight="bold"
          >
            Impossible de charger les statistiques.
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Vérifie que le backend FastAPI est lancé
            et que l'endpoint /analytics fonctionne.
          </Typography>
        </Paper>
      </Container>
    );
  }


  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 4 }}
    >

      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >

        {/* ==================================================
            HEADER
        ================================================== */}

        <Box sx={{ mb: 4 }}>

          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{
              background: `linear-gradient(
                135deg,
                ${theme.palette.primary.main} 0%,
                ${theme.palette.secondary.main} 100%
              )`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            SmartHire AI Dashboard
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
          >
            Overview of your candidates, jobs and AI
            matching performance.
          </Typography>

        </Box>


        {/* ==================================================
            KPI CARDS
        ================================================== */}

        <Grid
          container
          spacing={3}
          sx={{ mb: 4 }}
        >

          {statCards.map((stat) => (

            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={stat.title}
            >

              <motion.div
                whileHover={{ y: -5 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                }}
              >

                <Paper sx={glassStyle}>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >

                    <Box>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontWeight="bold"
                      >
                        {stat.title}
                      </Typography>

                      <Typography
                        variant="h3"
                        fontWeight="bold"
                        sx={{
                          mt: 1,
                          color: stat.color,
                        }}
                      >
                        {isLoading
                          ? '–'
                          : stat.value.toLocaleString()}
                      </Typography>

                    </Box>


                    <Avatar
                      sx={{
                        bgcolor: alpha(
                          stat.color,
                          0.12
                        ),
                        color: stat.color,
                        width: 56,
                        height: 56,
                      }}
                    >
                      {stat.icon}
                    </Avatar>

                  </Stack>

                </Paper>

              </motion.div>

            </Grid>

          ))}

        </Grid>


        {/* ==================================================
            SECONDARY KPI
        ================================================== */}

        <Grid
          container
          spacing={3}
          sx={{ mb: 4 }}
        >

          {/* Average Score */}

          <Grid
            item
            xs={12}
            md={4}
          >

            <Paper sx={glassStyle}>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >

                <Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight="bold"
                  >
                    Average Match Score
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{
                      mt: 1,
                      color: theme.palette.primary.main,
                    }}
                  >
                    {isLoading
                      ? '–'
                      : `${analytics?.average_score?.toFixed(2) ?? 0}%`}
                  </Typography>

                </Box>

                <Avatar
                  sx={{
                    bgcolor: alpha(
                      theme.palette.primary.main,
                      0.12
                    ),
                    color: theme.palette.primary.main,
                  }}
                >
                  <TrendingUpIcon />
                </Avatar>

              </Stack>

            </Paper>

          </Grid>


          {/* Successful Rate */}

          <Grid
            item
            xs={12}
            md={4}
          >

            <Paper sx={glassStyle}>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >

                <Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight="bold"
                  >
                    Match Success Rate
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{
                      mt: 1,
                      color: theme.palette.success.main,
                    }}
                  >
                    {isLoading
                      ? '–'
                      : analytics?.total_predictions
                        ? `${(
                            (analytics.successful_predictions /
                              analytics.total_predictions) *
                            100
                          ).toFixed(1)}%`
                        : '0%'}
                  </Typography>

                </Box>

                <Avatar
                  sx={{
                    bgcolor: alpha(
                      theme.palette.success.main,
                      0.12
                    ),
                    color: theme.palette.success.main,
                  }}
                >
                  <CheckCircleIcon />
                </Avatar>

              </Stack>

            </Paper>

          </Grid>


          {/* Languages */}

          <Grid
            item
            xs={12}
            md={4}
          >

            <Paper sx={glassStyle}>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >

                <Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight="bold"
                  >
                    Languages
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{
                      mt: 1,
                      color: theme.palette.warning.main,
                    }}
                  >
                    {isLoading
                      ? '–'
                      : languages.length}
                  </Typography>

                </Box>

                <Avatar
                  sx={{
                    bgcolor: alpha(
                      theme.palette.warning.main,
                      0.12
                    ),
                    color: theme.palette.warning.main,
                  }}
                >
                  <LanguageIcon />
                </Avatar>

              </Stack>

            </Paper>

          </Grid>

        </Grid>


        {/* ==================================================
            LANGUAGES + SCORE DISTRIBUTION
        ================================================== */}

        <Grid
          container
          spacing={3}
          sx={{ mb: 4 }}
        >

          {/* LANGUAGES */}

          <Grid
            item
            xs={12}
            md={6}
          >

            <Paper sx={glassStyle}>

              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
              >
                Candidate Languages
              </Typography>

              <Box sx={{ height: 320 }}>

                {languages.length > 0 ? (

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <PieChart>

                      <Pie
                        data={languages}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={105}
                        paddingAngle={5}
                        dataKey="value"
                        nameKey="name"
                      >

                        {languages.map(
                          (_, index) => (
                            <Cell
                              key={index}
                              fill={
                                PALETTE[
                                  index %
                                    PALETTE.length
                                ]
                              }
                            />
                          )
                        )}

                      </Pie>

                      <Tooltip
                        contentStyle={
                          tooltipStyle
                        }
                      />

                    </PieChart>

                  </ResponsiveContainer>

                ) : (

                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      color="text.secondary"
                    >
                      No language data available.
                    </Typography>
                  </Box>

                )}

              </Box>


              <Stack
                direction="row"
                flexWrap="wrap"
                gap={1}
                justifyContent="center"
              >

                {languages.map(
                  (language, index) => (

                    <Chip
                      key={language.name}
                      label={`${language.name}: ${language.value}`}
                      size="small"
                      sx={{
                        bgcolor: alpha(
                          PALETTE[
                            index %
                              PALETTE.length
                          ],
                          0.12
                        ),
                      }}
                    />

                  )
                )}

              </Stack>

            </Paper>

          </Grid>


          {/* SCORE DISTRIBUTION */}

          <Grid
            item
            xs={12}
            md={6}
          >

            <Paper sx={glassStyle}>

              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
              >
                AI Score Distribution
              </Typography>

              <Box sx={{ height: 320 }}>

                {scoreDistribution.length > 0 ? (

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <BarChart
                      data={scoreDistribution}
                      margin={{
                        top: 10,
                        right: 20,
                        left: 0,
                        bottom: 10,
                      }}
                    >

                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={alpha(
                          theme.palette.divider,
                          0.15
                        )}
                        vertical={false}
                      />

                      <XAxis
                        dataKey="name"
                        stroke={
                          theme.palette.text.secondary
                        }
                        fontSize={12}
                        axisLine={false}
                        tickLine={false}
                      />

                      <YAxis
                        stroke={
                          theme.palette.text.secondary
                        }
                        fontSize={12}
                        axisLine={false}
                        tickLine={false}
                      />

                      <Tooltip
                        contentStyle={
                          tooltipStyle
                        }
                      />

                      <Bar
                        dataKey="value"
                        name="Predictions"
                        radius={[
                          8,
                          8,
                          0,
                          0,
                        ]}
                      >

                        {scoreDistribution.map(
                          (_, index) => (

                            <Cell
                              key={index}
                              fill={
                                PALETTE[
                                  index %
                                    PALETTE.length
                                ]
                              }
                            />

                          )
                        )}

                      </Bar>

                    </BarChart>

                  </ResponsiveContainer>

                ) : (

                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      color="text.secondary"
                    >
                      No score data available.
                    </Typography>
                  </Box>

                )}

              </Box>

            </Paper>

          </Grid>

        </Grid>


        {/* ==================================================
            TOP JOBS
        ================================================== */}

        <Grid
          container
          spacing={3}
          sx={{ mb: 4 }}
        >

          <Grid
            item
            xs={12}
          >

            <Paper sx={glassStyle}>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
              >

                <Box>

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                  >
                    Top Matching Jobs
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Jobs with the highest candidate
                    match scores.
                  </Typography>

                </Box>

                <Chip
                  icon={<TrophyIcon />}
                  label="AI Ranking"
                  color="primary"
                  variant="outlined"
                />

              </Stack>


              <Box sx={{ height: 380 }}>

                {topJobs.length > 0 ? (

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <BarChart
                      data={topJobs}
                      layout="vertical"
                      margin={{
                        top: 10,
                        right: 30,
                        left: 30,
                        bottom: 10,
                      }}
                    >

                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={alpha(
                          theme.palette.divider,
                          0.15
                        )}
                        horizontal={false}
                      />

                      <XAxis
                        type="number"
                        stroke={
                          theme.palette.text.secondary
                        }
                        fontSize={12}
                        axisLine={false}
                        tickLine={false}
                      />

                      <YAxis
                        type="category"
                        dataKey="name"
                        width={220}
                        stroke={
                          theme.palette.text.secondary
                        }
                        fontSize={11}
                        axisLine={false}
                        tickLine={false}
                      />

                      <Tooltip
                        contentStyle={
                          tooltipStyle
                        }
                      />

                      <Bar
                        dataKey="score"
                        name="Average Score"
                        radius={[
                          0,
                          8,
                          8,
                          0,
                        ]}
                        barSize={24}
                      >

                        {topJobs.map(
                          (_, index) => (

                            <Cell
                              key={index}
                              fill={
                                PALETTE[
                                  index %
                                    PALETTE.length
                                ]
                              }
                            />

                          )
                        )}

                      </Bar>

                    </BarChart>

                  </ResponsiveContainer>

                ) : (

                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >

                    <Typography
                      color="text.secondary"
                    >
                      No job ranking available.
                    </Typography>

                  </Box>

                )}

              </Box>

            </Paper>

          </Grid>

        </Grid>


        {/* ==================================================
            TOP JOBS TABLE
        ================================================== */}

        <Grid
          container
          spacing={3}
        >

          <Grid
            item
            xs={12}
          >

            <Paper sx={glassStyle}>

              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
              >
                Best Matching Jobs
              </Typography>


              <Stack spacing={1}>

                {(analytics?.top_jobs ?? [])
                  .slice(0, 10)
                  .map((job, index) => (

                    <Box
                      key={`${job.job_id}-${index}`}
                      onClick={() =>
                        navigate(
                          `/jobs/${job.job_id}`
                        )
                      }
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        cursor: 'pointer',

                        '&:hover': {
                          bgcolor: alpha(
                            theme.palette.primary.main,
                            0.06
                          ),
                        },
                      }}
                    >

                      <Stack
                        direction={{
                          xs: 'column',
                          sm: 'row',
                        }}
                        justifyContent="space-between"
                        alignItems={{
                          sm: 'center',
                        }}
                        spacing={1}
                      >

                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1.5}
                        >

                          <Avatar
                            sx={{
                              width: 34,
                              height: 34,
                              bgcolor:
                                alpha(
                                  theme.palette.primary.main,
                                  0.12
                                ),
                              color:
                                theme.palette.primary.main,
                              fontSize: 14,
                              fontWeight: 'bold',
                            }}
                          >
                            {index + 1}
                          </Avatar>

                          <Box>

                            <Typography
                              variant="body2"
                              fontWeight="bold"
                            >
                              {job.job_title ||
                                'Unknown Job'}
                            </Typography>

                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Job ID #{job.job_id}
                              {' • '}
                              {job.matches} match
                              {job.matches > 1
                                ? 'es'
                                : ''}
                            </Typography>

                          </Box>

                        </Stack>


                        <Chip
                          label={`${job.average_score.toFixed(
                            1
                          )}%`}
                          color={
                            job.average_score >=
                            85
                              ? 'success'
                              : job.average_score >=
                                  70
                                ? 'warning'
                                : 'default'
                          }
                          size="small"
                        />

                      </Stack>

                    </Box>

                  ))}

              </Stack>

            </Paper>

          </Grid>

        </Grid>

      </motion.div>

    </Container>
  );
}