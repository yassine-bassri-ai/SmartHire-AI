import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Button,
  TextField,
  Stack,
  IconButton,
  Tooltip,
  alpha,
  useTheme,
  Chip,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Add as AddIcon,
  Visibility as ViewIcon,
  PlayArrow as PlayIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Article as ArticleIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useResumes, useDeleteResume } from '@/hooks/useResume';
import type { Resume } from '@/utils/types';

export default function ResumeList() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data: resumes = [], isLoading, isError } = useResumes();
  const deleteMutation = useDeleteResume();

  const [search, setSearch] = useState('');
  const [langFilter, setLangFilter] = useState('');
  const [deleting, setDeleting] = useState<Resume | null>(null);

  const languages = useMemo(
    () => [...new Set(resumes.map((r) => r.language).filter(Boolean))],
    [resumes]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return resumes.filter((r) => {
      const matchSearch = !q || (r.filename ?? '').toLowerCase().includes(q);
      const matchLang = !langFilter || r.language === langFilter;
      return matchSearch && matchLang;
    });
  }, [resumes, search, langFilter]);

  const confirmDelete = async () => {
    if (!deleting) return;
    try {
      await deleteMutation.mutateAsync(deleting.id);
      toast.success('Resume deleted successfully');
    } catch {
      toast.error('Delete failed — the backend does not expose DELETE /resume/{id}.');
    } finally {
      setDeleting(null);
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
          #{params.row.id}
        </Typography>
      ),
    },
    {
      field: 'filename',
      headerName: 'Filename',
      flex: 1,
      minWidth: 220,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <ArticleIcon sx={{ color: 'primary.main', fontSize: 20 }} />
          <Typography variant="body2" sx={{ fontWeight: 600 }}>{params.row.filename}</Typography>
        </Stack>
      ),
    },
    {
      field: 'language',
      headerName: 'Language',
      width: 130,
      renderCell: (params) => (
        <Chip label={params.row.language ?? 'Unknown'} size="small" variant="outlined" />
      ),
    },
    {
      field: 'experience_years',
      headerName: 'Experience (Yrs)',
      width: 140,
      renderCell: (params) => (
        <Typography variant="body2">{params.row.experience_years ?? 0} years</Typography>
      ),
    },
    {
      field: 'skills_count',
      headerName: 'Skills',
      width: 120,
      renderCell: (params) => (
        <Chip label={`${params.row.skills?.length ?? 0} skills`} size="small" color="primary" variant="outlined" />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="View Details">
            <IconButton size="small" onClick={() => navigate(`/resumes/${params.row.id}`)}>
              <ViewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Run AI Prediction">
            <IconButton size="small" color="primary" onClick={() => navigate(`/predictions/${params.row.id}`)}>
              <PlayIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" color="error" onClick={() => setDeleting(params.row)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ md: 'center' }} mb={4} gap={2}>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              textFillColor: 'transparent',
            }}
          >
            Resumes Database
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/upload-resume')}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
            }}
          >
            Upload New Resume
          </Button>
        </Stack>

        {/* Filters */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
          <TextField
            fullWidth
            placeholder="Search by filename…"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                background: alpha(theme.palette.background.paper, 0.6),
                backdropFilter: 'blur(20px)',
                borderRadius: 3,
              },
            }}
          />
          <FormControl
            sx={{
              minWidth: 160,
              '& .MuiOutlinedInput-root': {
                background: alpha(theme.palette.background.paper, 0.6),
                backdropFilter: 'blur(20px)',
                borderRadius: 3,
              },
            }}
          >
            <InputLabel>Language</InputLabel>
            <Select value={langFilter} label="Language" onChange={(e) => setLangFilter(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              {languages.map((l) => (
                <MenuItem key={l} value={l}>{l}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        {/* DataGrid */}
        <Box
          sx={{
            height: 640,
            width: '100%',
            background: alpha(theme.palette.background.paper, 0.6),
            backdropFilter: 'blur(20px)',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
            borderRadius: 4,
            p: 1,
          }}
        >
          <DataGrid
            rows={filtered}
            columns={columns}
            loading={isLoading}
            getRowId={(row) => row.id}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
              sorting: { sortModel: [{ field: 'id', sort: 'desc' }] },
            }}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            autoHeight={false}
            slots={{
              noRowsOverlay: () => (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', p: 3 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                    {isError
                      ? 'Could not load resumes. Make sure the FastAPI backend is running at http://localhost:8000.'
                      : 'No resumes found. Upload your first resume to get started.'}
                  </Typography>
                </Box>
              ),
            }}
            sx={{
              border: 'none',
              '& .MuiDataGrid-cell': { borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` },
              '& .MuiDataGrid-columnHeaders': { background: alpha(theme.palette.background.default, 0.3) },
            }}
          />
        </Box>
      </motion.div>

      {/* Delete confirmation */}
      <Dialog open={Boolean(deleting)} onClose={() => setDeleting(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Delete resume?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Are you sure you want to delete <strong>{deleting?.filename}</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleting(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete} disabled={deleteMutation.isPending}>
            {deleteMutation.isPending ? 'Deleting…' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
