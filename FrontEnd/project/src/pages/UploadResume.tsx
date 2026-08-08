import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Alert,
  Stack,
  Card,
  CardContent,
  Divider,
  useTheme,
  alpha,
  Container,
  LinearProgress,
  useMediaQuery,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  InsertDriveFile as FileIcon,
  CheckCircle as CheckIcon,
  PlayArrow as PlayIcon,
  Visibility as ViewIcon,
  Refresh as RefreshIcon,
  AutoAwesome as AutoAwesomeIcon,
  Psychology as PsychologyIcon,
  Description as DescriptionIcon,
  UploadFile as UploadFileIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useUploadResume } from '@/hooks/useResume';
import InfoRow from '@/components/cards/InfoRow';
import ChipList from '@/components/common/ChipList';
import RawText from '@/components/common/RawText';
import type { Resume } from '@/utils/types';

const ACCEPTED_TYPES = ['application/pdf', 'application/x-pdf'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const PARSING_STEPS = [
  'Extracting text from PDF…',
  'Detecting language…',
  'Extracting skills…',
  'Parsing education & experience…',
  'Finalizing your profile…',
];

export default function UploadResume() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useUploadResume();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [parsingStep, setParsingStep] = useState(0);
  const [parsedResume, setParsedResume] = useState<Resume | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file: File): boolean => {
    const isPdf = ACCEPTED_TYPES.includes(file.type) || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      toast.error('Only PDF files are allowed.');
      return false;
    }
    if (file.size > MAX_SIZE) {
      toast.error('File size must be less than 5MB.');
      return false;
    }
    return true;
  };

  const handleUpload = useCallback(
    (file: File) => {
      if (!validateFile(file)) return;
      setSelectedFile(file);
      setUploading(true);
      setProgress(0);
      setParsingStep(0);
      setParsedResume(null);

      // Simulate parsing steps while the upload is being processed.
      const stepTimer = window.setInterval(() => {
        setParsingStep((s) => Math.min(s + 1, PARSING_STEPS.length - 1));
      }, 700);

      uploadMutation.mutate(
        { file, onProgress: (pct) => setProgress(pct) },
        {
          onSuccess: (data) => {
            window.clearInterval(stepTimer);
            setParsingStep(PARSING_STEPS.length - 1);
            setParsedResume(data.resume);
            setUploading(false);
            toast.success('Resume uploaded and parsed successfully!');
          },
          onError: (error: any) => {
            window.clearInterval(stepTimer);

            setUploading(false);

            setSelectedFile(null);

            console.error("UPLOAD ERROR");
            console.error(error);

            if (error.response) {
              console.error("STATUS :", error.response.status);
              console.error("DATA :", error.response.data);
            }

            toast.error(
              error?.response?.data?.detail ??
              error.message ??
              "Upload failed"
            );
          }
        }
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [uploadMutation]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleUpload(file);
    },
    [handleUpload]
  );

  const resetUpload = () => {
    setSelectedFile(null);
    setParsedResume(null);
    setProgress(0);
    setParsingStep(0);
    uploadMutation.reset();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const glassStyle = {
    background:
      theme.palette.mode === 'light'
        ? 'rgba(255,255,255,0.6)'
        : 'rgba(17,24,39,0.6)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
  };

  const hasData = parsedResume && (parsedResume.skills?.length || parsedResume.education?.length);

  return (
    <Container maxWidth="lg" sx={{ py: isMobile ? 3 : 6 }}>
      {/* Hero header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Chip
            icon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
            label="AI Resume Parsing"
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 600, mb: 2 }}
          />
          <Typography
            variant="h2"
            fontWeight="bold"
            gutterBottom
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              textFillColor: 'transparent',
            }}
          >
            Upload Resume
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 620, mx: 'auto' }}>
            Let our AI parse and analyze your professional experience instantly.
          </Typography>
        </Box>
      </motion.div>

      {/* Animated feature cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 5 }}>
          {[
            { icon: <PsychologyIcon />, title: 'Smart Skills Extraction', desc: 'Auto-detects 500+ skills' },
            { icon: <DescriptionIcon />, title: 'Structured Profile', desc: 'Education, experience & more' },
            { icon: <UploadFileIcon />, title: 'Instant Analysis', desc: 'Parsed in seconds' },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{ flex: 1 }}
            >
              <Paper sx={{ ...glassStyle, p: 2.5, textAlign: 'center', height: '100%' }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    mx: 'auto',
                    mb: 1,
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)}, ${alpha(theme.palette.secondary.main, 0.12)})`,
                    color: 'primary.main',
                  }}
                >
                  {f.icon}
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{f.title}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>{f.desc}</Typography>
              </Paper>
            </motion.div>
          ))}
        </Stack>
      </motion.div>

      <AnimatePresence mode="wait">
        {!parsedResume ? (
          <motion.div
            key="upload-zone"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <Paper
              sx={{
                ...glassStyle,
                p: { xs: 4, md: 6 },
                textAlign: 'center',
                cursor: 'pointer',
                border: isDragging
                  ? `2px dashed ${theme.palette.primary.main}`
                  : `2px dashed ${alpha(theme.palette.divider, 0.3)}`,
                transition: 'all 0.3s ease',
                '&:hover': { borderColor: theme.palette.primary.main, transform: 'translateY(-4px)' },
              }}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                hidden
                accept="application/pdf,.pdf"
                ref={fileInputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(file);
                }}
              />
              <motion.div
                animate={{ y: isDragging ? -10 : 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <CloudUploadIcon sx={{ fontSize: 80, color: theme.palette.primary.main, mb: 2 }} />
              </motion.div>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {isDragging ? 'Drop your resume here' : 'Drag & Drop your Resume here'}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                or click to browse files (PDF only, max 5MB)
              </Typography>

              {uploading && (
                <Box sx={{ width: '100%', mt: 2, px: { xs: 1, md: 4 } }}>
                  <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontWeight: 600 }}>
                    Uploading… {progress}%
                  </Typography>
                  <motion.div
                    key={parsingStep}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Typography variant="caption" sx={{ color: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 0.5 }}>
                      <PsychologyIcon sx={{ fontSize: 14 }} /> {PARSING_STEPS[parsingStep]}
                    </Typography>
                  </motion.div>
                </Box>
              )}
            </Paper>
          </motion.div>
        ) : (
          <motion.div
            key="parsed-preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Alert severity="success" icon={<CheckIcon />} sx={{ mb: 4, ...glassStyle, border: 'none' }}>
              Successfully parsed <strong>{parsedResume.filename}</strong>! Review the extracted data below.
            </Alert>

            <Card sx={glassStyle}>
              <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} mb={3} spacing={1}>
                  <Typography variant="h5" fontWeight="bold">Parsed Resume Preview</Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip label={`${parsedResume.experience_years ?? 0} Yrs Exp.`} color="primary" />
                    <Chip label={parsedResume.language?.toUpperCase() ?? 'EN'} variant="outlined" />
                  </Stack>
                </Stack>

                <Divider sx={{ mb: 3 }} />

                <Stack spacing={3}>
                  <Box>
                    <InfoRow icon={<PsychologyIcon fontSize="small" />} label="Skills">
                      <ChipList items={parsedResume.skills} color="primary" empty="No skills detected" />
                    </InfoRow>
                  </Box>

                  <Box>
                    <InfoRow icon={<DescriptionIcon fontSize="small" />} label="Education">
                      {parsedResume.education?.length ? (
                        <Stack spacing={0.5}>
                          {parsedResume.education.map((edu, i) => (
                            <Typography key={i} variant="body2">• {edu}</Typography>
                          ))}
                        </Stack>
                      ) : (
                        <Typography variant="body2" color="text.secondary">No education detected</Typography>
                      )}
                    </InfoRow>
                  </Box>

                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                    <Box sx={{ flex: 1 }}>
                      <InfoRow icon={<DescriptionIcon fontSize="small" />} label="Languages">
                        <ChipList items={parsedResume.languages} color="secondary" empty="—" />
                      </InfoRow>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <InfoRow icon={<CheckIcon fontSize="small" />} label="Certifications">
                        <ChipList items={parsedResume.certifications} color="success" empty="—" />
                      </InfoRow>
                    </Box>
                  </Stack>

                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase" letterSpacing="0.04em">
                      Raw Text Extract
                    </Typography>
                    <RawText text={parsedResume.raw_text} maxHeight={180} />
                  </Box>
                </Stack>

                <Divider sx={{ my: 3 }} />

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayIcon />}
                    onClick={() => navigate(`/predictions?resume=${parsedResume.id}`)}
                    sx={{
                      background: `linear-gradient(
                        135deg,
                        ${theme.palette.primary.main},
                        ${theme.palette.secondary.main}
                      )`,
                      boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                    }}
                  >
                    Run AI Matching
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<ViewIcon />}
                    onClick={() => navigate(`/resumes/${parsedResume.id}`)}
                  >
                    View Resume
                  </Button>
                  <Button
                    variant="text"
                    size="large"
                    startIcon={<RefreshIcon />}
                    onClick={resetUpload}
                  >
                    Upload Another
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {!hasData && parsedResume && (
        <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center', display: 'block', mt: 3 }}>
          Some fields may be empty if the PDF had no extractable structured data. Raw text is always preserved.
        </Typography>
      )}
    </Container>
  );
}
