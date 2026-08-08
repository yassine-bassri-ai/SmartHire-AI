import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  TextField, MenuItem, FormControl, InputLabel, Select, Chip, Stack, IconButton, Tooltip,
} from '@mui/material';
import { motion } from 'framer-motion';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import PageHeader, { CardWrapper } from '@/components/PageHeader';
import ChipList from '@/components/common/ChipList';
import EmptyData from '@/components/layout/EmptyData';
import { TableSkeleton } from '@/components/Skeletons';
import { useJobs } from '@/hooks/useJob';

export default function Jobs() {
  const navigate = useNavigate();
  const { data: jobs = [], isLoading, isError } = useJobs();

  const [search, setSearch] = useState('');
  const [langFilter, setLangFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const languages = [...new Set(jobs.map((j) => j.language).filter(Boolean))];

  const filtered = jobs.filter((j) => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      (j.job_title ?? '').toLowerCase().includes(q) ||
      (j.title ?? '').toLowerCase().includes(q) ||
      (j.company ?? '').toLowerCase().includes(q);
    const matchLang = !langFilter || j.language === langFilter;
    return matchSearch && matchLang;
  });

  const paged = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <PageHeader title="Job Management" subtitle="Browse, search and manage all uploaded job descriptions" icon={<WorkOutlineRoundedIcon />} />

      <CardWrapper>
        <Box sx={{ p: 2.5, pb: 1 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }}>
            <TextField
              size="small"
              placeholder="Search jobs by title or company…"
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
          <EmptyData title="Could not load jobs" description="Make sure the FastAPI backend is running at http://localhost:8000." />
        ) : paged.length === 0 ? (
          <EmptyData title="No jobs found" description="Upload job descriptions or adjust your search / filters." />
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Language</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Skills</TableCell>
                  <TableCell align="center">Action</TableCell>
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
                    <TableCell><Typography variant="body2" sx={{ fontWeight: 600 }}>{row.job_title ?? row.title}</Typography></TableCell>
                    <TableCell><Typography variant="body2" sx={{ color: 'text.secondary' }}>{row.company}</Typography></TableCell>
                    <TableCell><Chip label={row.language ?? 'Unknown'} size="small" variant="outlined" /></TableCell>
                    <TableCell><Typography variant="body2">{row.experience_required ?? row.experience_years ?? 0} yrs</Typography></TableCell>
                    <TableCell>
                      <Box sx={{ maxWidth: 260 }}>
                        <ChipList items={(row.skills ?? []).slice(0, 3)} color="secondary" max={3} />
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="View details">
                        <IconButton size="small" onClick={() => navigate(`/jobs/${row.id}`)}><VisibilityRoundedIcon fontSize="small" /></IconButton>
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
    </Box>
  );
}
