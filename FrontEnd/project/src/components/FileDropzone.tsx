import { useCallback, useState } from 'react';
import { useDropzone, type FileRejection } from 'react-dropzone';
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  Chip,
  Stack,
  alpha,
} from '@mui/material';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface FileDropzoneProps {
  onFileSelected: (file: File) => void;
  accept?: Record<string, string[]>;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  uploading?: boolean;
  progress?: number;
  uploadedFile?: string | null;
  onClear?: () => void;
  buttonText?: string;
  maxHeight?: number;
}

export default function FileDropzone({
  onFileSelected,
  accept,
  title,
  subtitle,
  icon,
  uploading = false,
  progress = 0,
  uploadedFile,
  onClear,
  buttonText = 'Upload',
  maxHeight = 360,
}: FileDropzoneProps) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (accepted: File[], rejected: FileRejection[]) => {
      if (rejected.length) {
        toast.error(`Invalid file: ${rejected[0].errors[0]?.message ?? 'rejected'}`);
        return;
      }
      if (accepted.length) {
        setFile(accepted[0]);
      }
    },
    [],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
    multiple: false,
  });

  const handleUpload = () => {
    if (file) onFileSelected(file);
  };

  const handleClear = () => {
    setFile(null);
    onClear?.();
  };

  return (
    <Box>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: isDragReject ? 'error.main' : isDragActive ? 'primary.main' : 'divider',
          borderRadius: 4,
          p: { xs: 3, md: 5 },
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: (t) =>
            isDragActive
              ? alpha(t.palette.primary.main, 0.06)
              : t.palette.mode === 'light'
                ? 'rgba(248,250,252,0.6)'
                : 'rgba(255,255,255,0.02)',
          transition: 'all 0.2s ease',
          maxHeight,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5,
          transform: isDragActive ? 'scale(1.01)' : 'scale(1)',
          '&:hover': { borderColor: 'primary.main', bgcolor: (t) => alpha(t.palette.primary.main, 0.04) },
        }}
      >
        <input {...getInputProps()} />
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg,rgba(37,99,235,0.12),rgba(20,184,166,0.12))',
            color: 'primary.main',
          }}
        >
          {icon ?? <CloudUploadRoundedIcon sx={{ fontSize: 36 }} />}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {isDragActive ? 'Drop the file here…' : title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {subtitle ?? 'Drag & drop or click to browse'}
        </Typography>
      </Box>

      <AnimatePresence>
        {(file || uploadedFile) && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{
                mt: 2,
                p: 2,
                borderRadius: 3,
                border: (t) => `1px solid ${t.palette.divider}`,
                bgcolor: 'background.paper',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0, flex: 1 }}>
                <InsertDriveFileRoundedIcon color="primary" />
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {uploadedFile ?? file?.name}
                  </Typography>
                  {file && <Typography variant="caption" sx={{ color: 'text.secondary' }}>{(file.size / 1024).toFixed(1)} KB</Typography>}
                </Box>
                {uploadedFile && <Chip size="small" color="success" icon={<CheckCircleRoundedIcon sx={{ fontSize: 14 }} />} label="Uploaded" sx={{ fontWeight: 600 }} />}
              </Box>
              <Stack direction="row" spacing={1}>
                <Button variant="contained" color="primary" onClick={handleUpload} disabled={uploading || !file || !!uploadedFile} startIcon={<CloudUploadRoundedIcon />}>
                  {uploading ? 'Uploading…' : buttonText}
                </Button>
                <Button variant="outlined" color="inherit" onClick={handleClear} disabled={uploading} sx={{ minWidth: 'auto', px: 1 }}>
                  <CloseRoundedIcon />
                </Button>
              </Stack>
            </Stack>
            {uploading && (
              <Box sx={{ mt: 1.5 }}>
                <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 999 }} />
                <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>{progress}%</Typography>
              </Box>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
