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
  CheckCircle as CheckIcon,
  Visibility as ViewIcon,
  Refresh as RefreshIcon,
  AutoAwesome as AutoAwesomeIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useUploadJob } from '@/hooks/useJob';
import InfoRow from '@/components/cards/InfoRow';
import ChipList from '@/components/common/ChipList';
import RawText from '@/components/common/RawText';
import type { Job } from '@/utils/types';

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const PARSING_STEPS = [
  'Reading job description…',
  'Detecting language…',
  'Extracting required skills…',
  'Parsing experience & requirements…',
  'Finalizing the job profile…',
];

export default function UploadJob() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useUploadJob();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [parsingStep, setParsingStep] = useState(0);
  const [parsedJob, setParsedJob] = useState<Job | null>(null);
  const [isDragging, setIsDragging] = useState(false);

const validateFile = (file: File): boolean => {
    // The FastAPI backend (src/api/routers/job_router.py) only accepts .json files.
    const isJson = file.name.toLowerCase().endsWith('.json');
    if (!isJson) {
      toast.error('Only JSON files are allowed by the backend.');
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
      setParsedJob(null);

      const stepTimer = window.setInterval(() => {
        setParsingStep((s) => Math.min(s + 1, PARSING_STEPS.length - 1));
      }, 700);

      uploadMutation.mutate(
        { file, onProgress: (pct) => setProgress(pct) },
        {
          onSuccess: (data) => {
            window.clearInterval(stepTimer);
            setParsingStep(PARSING_STEPS.length - 1);
            setParsedJob(data.job);
            setUploading(false);
            toast.success('Job description uploaded and parsed successfully!');
          },
          onError: () => {
            window.clearInterval(stepTimer);
            setUploading(false);
            setSelectedFile(null);
            toast.error('Failed to upload job description. Please try again.');
          },
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
    setParsedJob(null);
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

  const title = parsedJob?.job_title || parsedJob?.title || parsedJob?.filename || 'Parsed Job';

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
            label="AI Job Parsing"
            color="secondary"
            variant="outlined"
            sx={{ fontWeight: 600, mb: 2 }}
          />
          <Typography
            variant="h2"
            fontWeight="bold"
            gutterBottom
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
              backgroundClip: 'text',
              textFillColor: 'transparent',
            }}
          >
            Upload Job Description
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 620, mx: 'auto' }}>
            Add a new job opening to match against your talent pool.
          </Typography>
        </Box>
      </motion.div>

      {/* Feature cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 5 }}>
          {[
            { icon: <WorkIcon />, title: 'Job Requirements', desc: 'Extracts skills & experience' },
            { icon: <BusinessIcon />, title: 'Company Details', desc: 'Organization & role info' },
            { icon: <CategoryIcon />, title: 'Structured Parsing', desc: 'Ready for AI matching' },
          ].map((f) => (
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
                    background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.12)}, ${alpha(theme.palette.primary.main, 0.12)})`,
                    color: 'secondary.main',
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
        {!parsedJob ? (
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
                  ? `2px dashed ${theme.palette.secondary.main}`
                  : `2px dashed ${alpha(theme.palette.divider, 0.3)}`,
                transition: 'all 0.3s ease',
                '&:hover': { borderColor: theme.palette.secondary.main, transform: 'translateY(-4px)' },
              }}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
              onClick={() => fileInputRef.current?.click()}
            >
<input
                type="file"
                hidden
                accept=".json,application/json"
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
                <CloudUploadIcon sx={{ fontSize: 80, color: theme.palette.secondary.main, mb: 2 }} />
              </motion.div>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {isDragging ? 'Drop the file here' : 'Drag & Drop Job Description'}
              </Typography>
<Typography color="text.secondary" sx={{ mb: 3 }}>
                or click to browse files (JSON only, max 5MB)
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
                    <Typography variant="caption" sx={{ color: 'secondary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 0.5 }}>
                      <WorkIcon sx={{ fontSize: 14 }} /> {PARSING_STEPS[parsingStep]}
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
              Successfully parsed <strong>{title}</strong>! Review the extracted job profile below.
            </Alert>

            <Card sx={glassStyle}>
              <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} mb={3} spacing={1}>
                  <Box>
                    <Typography variant="h5" fontWeight="bold">{title}</Typography>
                    {parsedJob.company && (
                      <Typography variant="body2" color="text.secondary">{parsedJob.company}</Typography>
                    )}
                  </Box>
                  <Chip label={`${parsedJob.experience_required ?? parsedJob.experience_years ?? 0} Yrs Req.`} color="secondary" />
                </Stack>

                <Divider sx={{ mb: 3 }} />

                <Stack spacing={3}>
                  <Box>
                    <InfoRow icon={<WorkIcon fontSize="small" />} label="Required Skills">
                      <ChipList items={parsedJob.skills} color="secondary" empty="No skills detected" />
                    </InfoRow>
                  </Box>

                  {parsedJob.job_title && (
                    <Box>
                      <InfoRow icon={<CategoryIcon fontSize="small" />} label="Job Title">
                        <Typography variant="body2">{parsedJob.job_title}</Typography>
                      </InfoRow>
                    </Box>
                  )}

                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase" letterSpacing="0.04em">
                      Description
                    </Typography>
                    <RawText text={parsedJob.description || parsedJob.raw_text} maxHeight={220} />
                  </Box>
                </Stack>

                <Divider sx={{ my: 3 }} />

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<ViewIcon />}
                    onClick={() => navigate(`/jobs/${parsedJob.id}`)}
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                      boxShadow: `0 4px 20px ${alpha(theme.palette.secondary.main, 0.4)}`,
                    }}
                  >
                    View Job Details
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
    </Container>
  );
}
