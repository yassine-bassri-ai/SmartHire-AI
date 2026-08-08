import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  TextField, MenuItem, FormControl, InputLabel, Select, Chip, Stack, IconButton, Tooltip,
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import PageHeader, { CardWrapper } from '@/components/PageHeader';
import ChipList from '@/components/common/ChipList';
import EmptyData from '@/components/layout/EmptyData';
import { TableSkeleton } from '@/components/Skeletons';
import { useResumes, useDeleteResume } from '@/hooks/useResume';
import type { Resume } from '@/utils/types';
import toast from 'react-hot-toast';

export default function Resumes() {
  const navigate = useNavigate();
  const { data: resumes = [], isLoading, isError } = useResumes();
  const deleteMutation = useDeleteResume();

  const [search, setSearch] = useState('');
  const [langFilter, setLangFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [deleting, setDeleting] = useState<Resume | null>(null);

  const languages = [...new Set(resumes.map((r) => r.language).filter(Boolean))];

  const filtered = resumes.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch = !q || (r.filename ?? '').toLowerCase().includes(q);
    const matchLang = !langFilter || r.language === langFilter;
    return matchSearch && matchLang;
  });

  const paged = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const confirmDelete = async () => {
    if (!deleting) return;
    try {
      await deleteMutation.mutateAsync(deleting.id);
      toast.success('Resume deleted');
    } catch {
      toast.error('Delete failed — the backend does not expose DELETE.');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <Box>
      <PageHeader title="Resume Management" subtitle="Browse, search and manage uploaded resumes" icon={<ArticleRoundedIcon />} />

      <CardWrapper>
        <Box sx={{ p: 2.5, pb: 1 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }}>
            <TextField
              size="small"
              placeholder="Search resumes by filename…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              sx={{ flex: 1, minWidth: 200 }}
              slotProps={{ input: { startAdornment: <SearchRoundedIcon sx={{ color: 'text.secondary', fontSize: 20, mr: 1 }} /> } }}
            />
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Language</InputLabel>
              <Select value={langFilter} label="Language" onChange={(e) => { setLangFilter(e.target.value); setPage(0); }}>
                <MenuItem value="">All</MenuItem>
                {languages.map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
              </Select>
            </FormControl>
          </Stack>
        </Box>

        {isLoading ? (
          <Box sx={{ p: 2 }}><TableSkeleton rows={6} cols={5} /></Box>
        ) : isError ? (
          <EmptyData title="Could not load resumes" description="Make sure the FastAPI backend is running at http://localhost:8000." />
        ) : paged.length === 0 ? (
          <EmptyData title="No resumes found" description="Upload resumes or adjust your search / filters." />
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Filename</TableCell>
                  <TableCell>Language</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Skills</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paged.map((row, i) => (
                  <TableRow
                    key={row.id}
                    component={motion.tr}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    hover
                  >
                    <TableCell><Typography variant="body2" sx={{ color: 'text.secondary' }}>#{row.id}</Typography></TableCell>
                    <TableCell><Typography variant="body2" sx={{ fontWeight: 600 }}>{row.filename}</Typography></TableCell>
                    <TableCell><Chip label={row.language ?? 'Unknown'} size="small" variant="outlined" /></TableCell>
                    <TableCell><Typography variant="body2">{row.experience_years ?? 0} years</Typography></TableCell>
                    <TableCell>
                      <Box sx={{ maxWidth: 260 }}>
                        <ChipList items={(row.skills ?? []).slice(0, 3)} color="primary" max={3} />
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Open details">
                        <IconButton size="small" onClick={() => navigate(`/resumes/${row.id}`)}><VisibilityRoundedIcon fontSize="small" /></IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" color="error" onClick={() => setDeleting(row)}><DeleteOutlineRoundedIcon fontSize="small" /></IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {!isLoading && filtered.length > 0 && (
          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            onPageChange={(_, p) => setPage(p)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
            rowsPerPageOptions={[8, 16, 24]}
          />
        )}
      </CardWrapper>

      <Dialog open={Boolean(deleting)} onClose={() => setDeleting(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Delete resume?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Are you sure you want to delete <strong>{deleting?.filename}</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleting(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
