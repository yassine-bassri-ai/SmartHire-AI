import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Typography, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import type { Prediction } from '@/utils/types';
import ScoreBadge, { scoreColor } from '@/components/common/ScoreBadge';

interface PredictionTableProps {
  predictions: Prediction[];
  showRank?: boolean;
}

export default function PredictionTable({ predictions, showRank = true }: PredictionTableProps) {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            {showRank && <TableCell>Rank</TableCell>}
            <TableCell>Job Title</TableCell>
            <TableCell>Probability</TableCell>
            <TableCell>Match</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {predictions.map((p, idx) => {
const score = Math.round(p.score ?? p.probability * 100);
            const rank = p.rank ?? idx + 1;
            return (
              <TableRow
                key={`${p.job_id}-${idx}`}
                component={motion.tr}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                hover
              >
                {showRank && (
                  <TableCell>
                    <Chip
                      label={`#${rank}`}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        bgcolor: rank === 1 ? 'rgba(245,158,11,0.14)' : 'action.hover',
                        color: rank === 1 ? 'accent.main' : 'text.primary',
                      }}
                    />
                  </TableCell>
                )}
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{p.job_title}</Typography>
                  {p.company && (
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{p.company}</Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: scoreColor(score) }}>
                    {(p.probability * 100).toFixed(1)}%
                  </Typography>
                </TableCell>
                <TableCell sx={{ minWidth: 120 }}>
                  <LinearProgress
                    variant="determinate"
                    value={score}
                    sx={{ height: 6, borderRadius: 999, '& .MuiLinearProgress-bar': { bgcolor: scoreColor(score) } }}
                  />
                </TableCell>
                <TableCell align="right">
                  <ScoreBadge score={score} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
