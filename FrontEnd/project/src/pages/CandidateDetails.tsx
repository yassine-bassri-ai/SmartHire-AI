import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';

interface Candidate {
  id: number;
  filename?: string;
  resume_name?: string;
  language?: string;
  experience_years?: number;
  skills?: string[];
  education?: string[];
}

export default function CandidateDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  const loadCandidate = async () => {
    if (!id) {
      setError('ID du candidat manquant.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const url = `http://127.0.0.1:8000/resume/${id}`;

      console.log('================================');
      console.log('Chargement candidat');
      console.log('ID :', id);
      console.log('URL :', url);

      const response = await fetch(url);

      console.log('HTTP STATUS :', response.status);
      console.log('HTTP OK :', response.ok);

      if (!response.ok) {
        const errorText = await response.text();

        console.error('Erreur backend :', errorText);

        throw new Error(
          `Erreur HTTP ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();

      console.log('DONNÉES REÇUES :', data);
      console.log('TYPE :', typeof data);

      setCandidate(data);

      console.log('Candidat chargé avec succès');
      console.log('================================');

    } catch (error) {
      console.error('================================');
      console.error('ERREUR CANDIDAT :', error);
      console.error('================================');

      setError(
        error instanceof Error
          ? error.message
          : 'Impossible de charger le candidat.'
      );

    } finally {
      setLoading(false);
    }
  };

  loadCandidate();
}, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !candidate) {
    return (
      <Box sx={{ p: 4 }}>
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => navigate('/candidates')}
        >
          Retour aux candidats
        </Button>

        <Typography
          variant="h5"
          color="error"
          sx={{ mt: 4 }}
        >
          {error || 'Candidat introuvable'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>

      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => navigate('/candidates')}
        >
          Retour
        </Button>

        <Typography variant="h4" fontWeight={700}>
          Candidate Profile
        </Typography>
      </Stack>

      {/* Informations générales */}
      <Card sx={{ mb: 3 }}>
        <CardContent>

          <Typography
            variant="h5"
            fontWeight={700}
            gutterBottom
          >
            {candidate.filename ||
              candidate.resume_name ||
              `Candidate #${candidate.id}`}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Candidate ID : {candidate.id}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={5}
          >

            {/* Experience */}
            <Stack direction="row" spacing={1.5}>
              <WorkOutlineRoundedIcon color="primary" />

              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Experience
                </Typography>

                <Typography fontWeight={600}>
                  {candidate.experience_years ?? 0} years
                </Typography>
              </Box>
            </Stack>

            {/* Language */}
            <Stack direction="row" spacing={1.5}>
              <LanguageRoundedIcon color="primary" />

              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Language
                </Typography>

                <Typography fontWeight={600}>
                  {candidate.language || 'Unknown'}
                </Typography>
              </Box>
            </Stack>

            {/* Education */}
            <Stack direction="row" spacing={1.5}>
              <SchoolRoundedIcon color="primary" />

              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Education
                </Typography>

                <Typography fontWeight={600}>
                  {candidate.education?.length ?? 0}
                </Typography>
              </Box>
            </Stack>

          </Stack>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card sx={{ mb: 3 }}>
        <CardContent>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <PsychologyRoundedIcon color="primary" />

            <Typography
              variant="h6"
              fontWeight={700}
            >
              Skills
            </Typography>
          </Stack>

          {candidate.skills &&
          candidate.skills.length > 0 ? (
            <Stack
              direction="row"
              flexWrap="wrap"
              gap={1}
            >
              {candidate.skills.map((skill, index) => (
                <Chip
                  key={`${skill}-${index}`}
                  label={skill}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Stack>
          ) : (
            <Typography color="text.secondary">
              No skills found.
            </Typography>
          )}

        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardContent>

          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ mb: 2 }}
          >
            Education
          </Typography>

          {candidate.education &&
          candidate.education.length > 0 ? (
            <Stack spacing={1}>
              {candidate.education.map(
                (education, index) => (
                  <Typography key={index}>
                    • {education}
                  </Typography>
                )
              )}
            </Stack>
          ) : (
            <Typography color="text.secondary">
              No education information available.
            </Typography>
          )}

        </CardContent>
      </Card>

    </Box>
  );
}