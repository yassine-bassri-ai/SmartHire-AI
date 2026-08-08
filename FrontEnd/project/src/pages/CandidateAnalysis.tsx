import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Grid2 as Grid, Card, CardContent, Typography, Chip, Stack, Divider, Button, MenuItem, Select, FormControl, InputLabel,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip,
} from 'recharts';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import RecommendRoundedIcon from '@mui/icons-material/RecommendRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import PageHeader, { CardWrapper, CardTitle } from '@/components/PageHeader';
import ScoreRing, { ScoreBar } from '@/components/ScoreRing';
import { useResumes, useJobs } from '@/hooks/useApi';
import { getCandidateAnalysis, type CandidateAnalysis } from '@/services/endpoints';
import { useTheme } from '@mui/material';
import toast from 'react-hot-toast';

function ProfileRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ py: 1 }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</Typography>
        <Box sx={{ mt: 0.5 }}>{children}</Box>
      </Box>
    </Stack>
  );
}

function ChipList({ items, color = 'primary' }: { items?: string[]; color?: 'primary' | 'secondary' }) {
  if (!items || items.length === 0) return <Typography variant="body2" sx={{ color: 'text.secondary' }}>—</Typography>;
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
      {items.map((s, i) => (
        <Chip key={i} label={s} size="small" color={color} variant="outlined" sx={{ fontWeight: 500 }} />
      ))}
    </Box>
  );
}

export default function CandidateAnalysis() {
  const { resumeId, jobId } = useParams();
  const theme = useTheme();
  const { data: resumes } = useResumes();
  const { data: jobs } = useJobs();
  const [selResume, setSelResume] = useState(resumeId ?? '');
  const [selJob, setSelJob] = useState(jobId ?? '');
  const [analysis, setAnalysis] = useState<CandidateAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAnalysis = async (rId: string, jId: string) => {
    if (!rId || !jId) return;
    setLoading(true);
    try {
      const result = await getCandidateAnalysis(rId, jId);
      setAnalysis(result);
    } catch {
      setAnalysis({
        semantic_similarity: 88,
        skill_matching: 92,
        language_matching: 85,
        education_matching: 78,
        experience_matching: 90,
        overall_score: 87,
        recommendations: ['Strengthen cloud architecture experience', 'Add more leadership examples'],
        missing_skills: ['Kubernetes', 'GraphQL', 'Terraform'],
        strengths: ['Strong Python background', 'Excellent communication skills', '5+ years experience'],
        weaknesses: ['Limited cloud certifications', 'No team management experience'],
        suitable_positions: ['Backend Engineer', 'Full Stack Developer', 'API Architect'],
      });
      toast('Showing demo analysis (API unavailable)', { icon: 'ℹ️' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resumeId && jobId) fetchAnalysis(resumeId, jobId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeId, jobId]);

  useEffect(() => {
    if (resumes?.length && !selResume) setSelResume(String(resumes[0].id ?? ''));
    if (jobs?.length && !selJob) setSelJob(String(jobs[0].id ?? ''));
  }, [resumes, jobs, selResume, selJob]);

  const radarData = analysis
    ? [
        { metric: 'Semantic', value: analysis.semantic_similarity ?? 0 },
        { metric: 'Skills', value: analysis.skill_matching ?? 0 },
        { metric: 'Language', value: analysis.language_matching ?? 0 },
        { metric: 'Education', value: analysis.education_matching ?? 0 },
        { metric: 'Experience', value: analysis.experience_matching ?? 0 },
      ]
    : [];

  return (
    <Box>
      <PageHeader
        title="Candidate Analysis"
        subtitle="Deep-dive analytics for a candidate against a job"
        icon={<PersonSearchRoundedIcon />}
        action={
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Resume</InputLabel>
              <Select value={selResume} label="Resume" onChange={(e) => setSelResume(e.target.value)}>
                {(resumes ?? []).map((r, i) => (
                  <MenuItem key={r.id ?? i} value={String(r.id ?? i)}>{r.filename ?? r.name ?? `Resume ${i + 1}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Job</InputLabel>
              <Select value={selJob} label="Job" onChange={(e) => setSelJob(e.target.value)}>
                {(jobs ?? []).map((j, i) => (
                  <MenuItem key={j.id ?? i} value={String(j.id ?? i)}>{j.job_title ?? j.title ?? `Job ${i + 1}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={() => fetchAnalysis(selResume, selJob)} disabled={loading || !selResume || !selJob}>
              {loading ? 'Analysing…' : 'Analyse'}
            </Button>
          </Stack>
        }
      />

      {!analysis ? (
        <CardWrapper>
          <CardContent>
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Ready to analyse</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Select a resume and job above, then click Analyse to generate the candidate analytics.
              </Typography>
            </Box>
          </CardContent>
        </CardWrapper>
      ) : (
        <Grid container spacing={3}>
          {/* Left — Profile */}
          <Grid size={{ xs: 12, lg: 3 }}>
            <CardWrapper sx={{ height: '100%' }}>
              <CardTitle title="Candidate Profile" />
              <CardContent sx={{ pt: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                  <Box sx={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: 'linear-gradient(135deg,#2563EB,#14B8A6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1,
                  }}>
                    <PersonSearchRoundedIcon sx={{ color: '#fff', fontSize: 36 }} />
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{analysis.profile?.name ?? 'Sarah Chen'}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>{analysis.profile?.email ?? 'sarah.chen@email.com'}</Typography>
                </Box>
                <Divider />
                <ProfileRow label="Language">{<Typography variant="body2">{analysis.profile?.language ?? 'English'}</Typography>}</ProfileRow>
                <Divider />
                <ProfileRow label="Experience">{<Typography variant="body2">{analysis.profile?.experience ?? '6 years'}</Typography>}</ProfileRow>
                <Divider />
                <ProfileRow label="Education"><ChipList items={analysis.profile?.education ?? ['M.Sc. Computer Science']} /></ProfileRow>
                <Divider />
                <ProfileRow label="Skills"><ChipList items={analysis.profile?.skills ?? ['Python', 'React', 'SQL', 'Docker']} /></ProfileRow>
              </CardContent>
            </CardWrapper>
          </Grid>

          {/* Center — Scores & Radar */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <CardWrapper sx={{ height: '100%' }}>
              <CardTitle title="Matching Scores" />
              <CardContent sx={{ pt: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                  <ScoreRing value={analysis.overall_score ?? 87} label="Overall Match" sublabel="Candidate vs Job" />
                </Box>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <ScoreBar label="Semantic Similarity" value={analysis.semantic_similarity ?? 0} color="#2563EB" />
                    <ScoreBar label="Skill Matching" value={analysis.skill_matching ?? 0} color="#14B8A6" />
                    <ScoreBar label="Language Matching" value={analysis.language_matching ?? 0} color="#F59E0B" />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <ScoreBar label="Education Matching" value={analysis.education_matching ?? 0} color="#16A34A" />
                    <ScoreBar label="Experience Matching" value={analysis.experience_matching ?? 0} color="#0EA5E9" />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                  <ResponsiveContainer width="100%" height={260}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke={theme.palette.divider} />
                      <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: theme.palette.text.secondary }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10, fill: theme.palette.text.secondary }} />
                      <Radar dataKey="value" stroke="#2563EB" fill="#2563EB" fillOpacity={0.25} strokeWidth={2} />
                      <Tooltip contentStyle={{ borderRadius: 14, border: `1px solid ${theme.palette.divider}`, fontSize: '0.85rem' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </CardWrapper>
          </Grid>

          {/* Right — Recommendations */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <CardWrapper sx={{ height: '100%' }}>
              <CardTitle title="Recommendations" />
              <CardContent sx={{ pt: 1 }}>
                <Box sx={{ mb: 2 }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <LightbulbRoundedIcon color="primary" fontSize="small" />
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Recommendations</Typography>
                  </Stack>
                  <Stack spacing={1}>
                    {(analysis.recommendations ?? []).map((r, i) => (
                      <Typography key={i} variant="body2" sx={{ color: 'text.secondary', pl: 3, position: 'relative' }}>
                        <Box component="span" sx={{ position: 'absolute', left: 0, color: 'primary.main' }}>•</Box>{r}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
                <Divider sx={{ my: 1.5 }} />
                <Box sx={{ mb: 2 }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <WarningAmberRoundedIcon color="error" fontSize="small" />
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Missing Skills</Typography>
                  </Stack>
                  <ChipList items={analysis.missing_skills} color="primary" />
                </Box>
                <Divider sx={{ my: 1.5 }} />
                <Box sx={{ mb: 2 }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <CheckCircleRoundedIcon color="success" fontSize="small" />
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Strengths</Typography>
                  </Stack>
                  <Stack spacing={0.5}>
                    {(analysis.strengths ?? []).map((s, i) => (
                      <Typography key={i} variant="body2" sx={{ color: 'text.secondary' }}>• {s}</Typography>
                    ))}
                  </Stack>
                </Box>
                <Divider sx={{ my: 1.5 }} />
                <Box sx={{ mb: 2 }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <WarningAmberRoundedIcon color="warning" fontSize="small" />
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Weaknesses</Typography>
                  </Stack>
                  <Stack spacing={0.5}>
                    {(analysis.weaknesses ?? []).map((w, i) => (
                      <Typography key={i} variant="body2" sx={{ color: 'text.secondary' }}>• {w}</Typography>
                    ))}
                  </Stack>
                </Box>
                <Divider sx={{ my: 1.5 }} />
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <RecommendRoundedIcon color="secondary" fontSize="small" />
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Suitable Positions</Typography>
                  </Stack>
                  <ChipList items={analysis.suitable_positions} color="secondary" />
                </Box>
              </CardContent>
            </CardWrapper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
