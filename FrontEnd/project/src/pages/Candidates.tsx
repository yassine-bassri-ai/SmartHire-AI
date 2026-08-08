import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  InputAdornment,
  Stack,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';

import {
  Search as SearchIcon,
  Person as PersonIcon,
  Visibility as VisibilityIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

import { useTheme, alpha } from '@mui/material/styles';
import { useResumes } from '@/hooks/useResume';

export default function Candidates() {
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    data: resumes = [],
    isLoading,
    isError,
    error,
  } = useResumes();

  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState('all');
  const [experience, setExperience] = useState('all');

  /*
   * ---------------------------------------------------------
   * Languages available in the loaded CVs
   * ---------------------------------------------------------
   */
  const languages = useMemo(() => {
    const values = new Set<string>();

    resumes.forEach((resume) => {
      if (resume.language) {
        values.add(resume.language);
      }
    });

    return Array.from(values).sort();
  }, [resumes]);

  /*
   * ---------------------------------------------------------
   * Filter candidates
   * ---------------------------------------------------------
   */
  const filteredResumes = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return resumes.filter((resume) => {
      /*
       * Search
       */
      const searchableText = [
        resume.filename,
        resume.language,
        ...(resume.skills ?? []),
        ...(resume.education ?? []),
        ...(resume.languages ?? []),
        ...(resume.certifications ?? []),
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch =
        normalizedSearch === '' ||
        searchableText.includes(normalizedSearch);

      /*
       * Language
       */
      const matchesLanguage =
        language === 'all' ||
        (resume.language ?? '').toLowerCase() === language.toLowerCase();

      /*
       * Experience
       */
      const years = Number(resume.experience_years ?? 0);

      let matchesExperience = true;

      if (experience === '0-2') {
        matchesExperience = years < 3;
      }

      if (experience === '3-5') {
        matchesExperience = years >= 3 && years <= 5;
      }

      if (experience === '6-9') {
        matchesExperience = years >= 6 && years <= 9;
      }

      if (experience === '10+') {
        matchesExperience = years >= 10;
      }

      return (
        matchesSearch &&
        matchesLanguage &&
        matchesExperience
      );
    });
  }, [resumes, search, language, experience]);

  /*
   * ---------------------------------------------------------
   * Clear filters
   * ---------------------------------------------------------
   */
  const clearFilters = () => {
    setSearch('');
    setLanguage('all');
    setExperience('all');
  };

  /*
   * ---------------------------------------------------------
   * Loading
   * ---------------------------------------------------------
   */
  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: 400 }}
          spacing={2}
        >
          <CircularProgress />
          <Typography color="text.secondary">
            Loading candidates...
          </Typography>
        </Stack>
      </Container>
    );
  }

  /*
   * ---------------------------------------------------------
   * Error
   * ---------------------------------------------------------
   */
  if (isError) {
    return (
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Alert severity="error">
          Unable to load candidates.
          {error instanceof Error ? ` ${error.message}` : ''}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>

      {/* =====================================================
          HEADER
      ===================================================== */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          fontWeight={800}
          gutterBottom
          sx={{
            background: `linear-gradient(
              135deg,
              ${theme.palette.primary.main},
              ${theme.palette.secondary.main}
            )`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Candidates
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
        >
          Manage and analyze uploaded CVs.
        </Typography>
      </Box>

      {/* =====================================================
          SUMMARY
      ===================================================== */}
      <Paper
        sx={{
          mb: 3,
          p: 2.5,
          borderRadius: 3,
          border: `1px solid ${alpha(
            theme.palette.divider,
            0.15
          )}`,
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={2}
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Total candidates
            </Typography>

            <Typography
              variant="h4"
              fontWeight={800}
            >
              {resumes.length}
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Showing
            </Typography>

            <Typography
              variant="h5"
              fontWeight={700}
              color="primary"
            >
              {filteredResumes.length}
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {/* =====================================================
          FILTERS
      ===================================================== */}
      <Paper
        sx={{
          p: 2.5,
          mb: 3,
          borderRadius: 3,
          border: `1px solid ${alpha(
            theme.palette.divider,
            0.15
          )}`,
        }}
      >
        <Stack
          direction={{
            xs: 'column',
            md: 'row',
          }}
          spacing={2}
          alignItems={{
            xs: 'stretch',
            md: 'center',
          }}
        >

          {/* Search */}
          <TextField
            fullWidth
            label="Search candidates"
            placeholder="Name, skill, education..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Language */}
          <FormControl
            sx={{
              minWidth: { xs: '100%', md: 180 },
            }}
          >
            <InputLabel>
              Language
            </InputLabel>

            <Select
              value={language}
              label="Language"
              onChange={(event) =>
                setLanguage(event.target.value)
              }
            >
              <MenuItem value="all">
                All languages
              </MenuItem>

              {languages.map((lang) => (
                <MenuItem
                  key={lang}
                  value={lang}
                >
                  {lang}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Experience */}
          <FormControl
            sx={{
              minWidth: { xs: '100%', md: 180 },
            }}
          >
            <InputLabel>
              Experience
            </InputLabel>

            <Select
              value={experience}
              label="Experience"
              onChange={(event) =>
                setExperience(event.target.value)
              }
            >
              <MenuItem value="all">
                All experience
              </MenuItem>

              <MenuItem value="0-2">
                0 - 2 years
              </MenuItem>

              <MenuItem value="3-5">
                3 - 5 years
              </MenuItem>

              <MenuItem value="6-9">
                6 - 9 years
              </MenuItem>

              <MenuItem value="10+">
                10+ years
              </MenuItem>
            </Select>
          </FormControl>

          {/* Clear */}
          <Button
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={clearFilters}
            sx={{
              minWidth: { xs: '100%', md: 130 },
              height: 56,
            }}
          >
            Clear
          </Button>

        </Stack>
      </Paper>

      {/* =====================================================
          EMPTY
      ===================================================== */}
      {filteredResumes.length === 0 ? (
        <Paper
          sx={{
            p: 6,
            textAlign: 'center',
            borderRadius: 3,
          }}
        >
          <PersonIcon
            sx={{
              fontSize: 60,
              color: 'text.disabled',
              mb: 2,
            }}
          />

          <Typography
            variant="h6"
            fontWeight={700}
          >
            No candidates found
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1, mb: 3 }}
          >
            Try changing your search or filters.
          </Typography>

          <Button
            variant="contained"
            onClick={clearFilters}
          >
            Reset filters
          </Button>
        </Paper>
      ) : (
        /* ===================================================
           CANDIDATES TABLE
        =================================================== */
        <Paper
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            border: `1px solid ${alpha(
              theme.palette.divider,
              0.15
            )}`,
          }}
        >

          {/* Table header */}
          <Box
            sx={{
              display: {
                xs: 'none',
                md: 'grid',
              },
              gridTemplateColumns:
                '2fr 1.2fr 1fr 2.5fr 1fr 100px',
              gap: 2,
              px: 3,
              py: 2,
              bgcolor: alpha(
                theme.palette.primary.main,
                0.04
              ),
              borderBottom: `1px solid ${alpha(
                theme.palette.divider,
                0.15
              )}`,
            }}
          >
            <Typography
              variant="caption"
              fontWeight={800}
              color="text.secondary"
            >
              CANDIDATE
            </Typography>

            <Typography
              variant="caption"
              fontWeight={800}
              color="text.secondary"
            >
              EXPERIENCE
            </Typography>

            <Typography
              variant="caption"
              fontWeight={800}
              color="text.secondary"
            >
              LANGUAGE
            </Typography>

            <Typography
              variant="caption"
              fontWeight={800}
              color="text.secondary"
            >
              SKILLS
            </Typography>

            <Typography
              variant="caption"
              fontWeight={800}
              color="text.secondary"
            >
              ID
            </Typography>

            <Typography
              variant="caption"
              fontWeight={800}
              color="text.secondary"
            >
              ACTION
            </Typography>
          </Box>

          {/* Rows */}
          {filteredResumes.map((resume, index) => (

            <Box
              key={resume.id}
              sx={{
                display: {
                  xs: 'block',
                  md: 'grid',
                },
                gridTemplateColumns:
                  '2fr 1.2fr 1fr 2.5fr 1fr 100px',
                gap: 2,
                alignItems: 'center',
                px: 3,
                py: 2,
                borderBottom:
                  index !== filteredResumes.length - 1
                    ? `1px solid ${alpha(
                        theme.palette.divider,
                        0.1
                      )}`
                    : 'none',

                '&:hover': {
                  bgcolor: alpha(
                    theme.palette.primary.main,
                    0.025
                  ),
                },
              }}
            >

              {/* Candidate */}
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
              >
                <Avatar
                  sx={{
                    bgcolor: alpha(
                      theme.palette.primary.main,
                      0.12
                    ),
                    color:
                      theme.palette.primary.main,
                  }}
                >
                  <PersonIcon />
                </Avatar>

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    fontWeight={700}
                    noWrap
                  >
                    {resume.filename}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Candidate #{resume.id}
                  </Typography>
                </Box>
              </Stack>

              {/* Experience */}
              <Box sx={{ mt: { xs: 2, md: 0 } }}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                >
                  {resume.experience_years ?? 0} years
                </Typography>
              </Box>

              {/* Language */}
              <Box sx={{ mt: { xs: 1, md: 0 } }}>
                <Chip
                  label={
                    resume.language || 'unknown'
                  }
                  size="small"
                  variant="outlined"
                />
              </Box>

              {/* Skills */}
              <Stack
                direction="row"
                spacing={0.5}
                flexWrap="wrap"
                useFlexGap
                sx={{
                  mt: { xs: 1, md: 0 },
                }}
              >
                {(resume.skills ?? [])
                  .slice(0, 5)
                  .map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      size="small"
                      sx={{
                        mb: 0.5,
                        bgcolor: alpha(
                          theme.palette.primary.main,
                          0.07
                        ),
                      }}
                    />
                  ))}

                {(resume.skills ?? []).length > 5 && (
                  <Chip
                    label={`+${
                      resume.skills.length - 5
                    }`}
                    size="small"
                    variant="outlined"
                  />
                )}
              </Stack>

              {/* ID */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: { xs: 1, md: 0 } }}
              >
                #{resume.id}
              </Typography>

              {/* Action */}
              <Box
                sx={{
                  mt: { xs: 1, md: 0 },
                  textAlign: {
                    xs: 'left',
                    md: 'center',
                  },
                }}
              >
                <Tooltip title="View candidate">
                  <IconButton
                    color="primary"
                    onClick={() =>
                      navigate(
                        `/candidates/${resume.id}`
                      )
                    }
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
              </Box>

            </Box>
          ))}

        </Paper>
      )}

    </Container>
  );
}