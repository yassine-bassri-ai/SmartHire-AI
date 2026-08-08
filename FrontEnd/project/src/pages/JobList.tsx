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
  Delete as DeleteIcon,
  Search as SearchIcon,
  Work as WorkIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useJobs, useDeleteJob } from '@/hooks/useJob';
import type { Job } from '@/utils/types';

export default function JobList() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data: jobs = [], isLoading, isError } = useJobs();
  const deleteMutation = useDeleteJob();

  const [search, setSearch] = useState('');
  const [langFilter, setLangFilter] = useState('');
  const [deleting, setDeleting] = useState<Job | null>(null);

  const languages = useMemo(
    () => [...new Set(jobs.map((j) => j.language).filter(Boolean))],
    [jobs]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return jobs.filter((j) => {
      const matchSearch =
        !q ||
        (j.job_title ?? '').toLowerCase().includes(q) ||
        (j.title ?? '').toLowerCase().includes(q) ||
        (j.filename ?? '').toLowerCase().includes(q) ||
        (j.company ?? '').toLowerCase().includes(q);
      const matchLang = !langFilter || j.language === langFilter;
      return matchSearch && matchLang;
    });
  }, [jobs, search, langFilter]);

  const confirmDelete = async () => {
    if (!deleting) return;
    try {
      await deleteMutation.mutateAsync(deleting.id as number);
      toast.success('Job deleted successfully');
    } catch {
      toast.error('Delete failed — the backend does not expose DELETE /job/{id}.');
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
      field: 'job_title',
      headerName: 'Job Title',
      flex: 1,
      minWidth: 220,
      renderCell: (params) => {
        const title = params.row.job_title || params.row.title || params.row.filename || 'Untitled Job';
        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <WorkIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{title}</Typography>
          </Stack>
        );
      },
    },
    {
      field: 'company',
      headerName: 'Company',
      width: 160,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{params.row.company || '—'}</Typography>
      ),
    },
    {
      field: 'language',
      headerName: 'Language',
      width: 120,
      renderCell: (params) => (
        <Chip label={params.row.language ?? 'Unknown'} size="small" variant="outlined" />
      ),
    },
    {
      field: 'experience_required',
      headerName: 'Experience Req.',
      width: 150,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.row.experience_required ?? params.row.experience_years ?? 0} yrs
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 160,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="View Details">
            <IconButton size="small" onClick={() => navigate(`/jobs/${params.row.id}`)}>
              <ViewIcon fontSize="small" />
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
              background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
              backgroundClip: 'text',
              textFillColor: 'transparent',
            }}
          >
            Jobs Database
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/upload-job')}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              boxShadow: `0 4px 20px ${alpha(theme.palette.secondary.main, 0.4)}`,
            }}
          >
            Add New Job
          </Button>
        </Stack>

        {/* Filters */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
          <TextField
            fullWidth
            placeholder="Search by title, company or filename…"
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
            getRowId={(row) => row.id ?? row.job_id as string}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
              sorting: { sortModel: [{ field: 'id', sort: 'asc' }] },
            }}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            autoHeight={false}
            slots={{
              noRowsOverlay: () => (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', p: 3 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                    {isError
                      ? 'Could not load jobs. Make sure the FastAPI backend is running at http://localhost:8000.'
                      : 'No jobs found. Upload your first job description to get started.'}
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
        <DialogTitle sx={{ fontWeight: 700 }}>Delete job?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Are you sure you want to delete <strong>{deleting?.job_title || deleting?.title || deleting?.filename}</strong>?
            This action cannot be undone.
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
