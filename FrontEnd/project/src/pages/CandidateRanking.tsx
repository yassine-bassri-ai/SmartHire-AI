import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";

import { useResumes } from "@/hooks/useResume";
import { getCandidateRanking } from "@/services/predictionService";

interface RankingItem {
  rank: number;
  resume_id: number;
  job_id: number;
  job_title: string;
  prediction: number;
  probability: number;
  score: number;
}

export default function CandidateRanking() {

  const {
    data: resumes = [],
    isLoading: loadingResumes
  } = useResumes();

  const [selectedResume, setSelectedResume] =
    useState<number | "">("");

  const [ranking, setRanking] =
    useState<RankingItem[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleRanking = async () => {

    if (!selectedResume) {
      setError("Veuillez sélectionner un candidat.");
      return;
    }

    try {

      setLoading(true);
      setError("");

      const data = await getCandidateRanking(
        Number(selectedResume)
      );

      setRanking(data.ranking);

    } catch (err) {

      console.error(err);

      setError(
        "Impossible de récupérer le classement."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <Box sx={{ p: 4 }}>

      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        Candidate Ranking
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Find the best job matches for a candidate.
      </Typography>

      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
        }}
      >

        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >

          <FormControl
            sx={{ minWidth: 300 }}
          >

            <InputLabel>
              Select Candidate
            </InputLabel>

            <Select
              value={selectedResume}
              label="Select Candidate"
              onChange={(event) =>
                setSelectedResume(
                  event.target.value as number
                )
              }
            >

              {loadingResumes ? (

                <MenuItem disabled>
                  Loading...
                </MenuItem>

              ) : (

                resumes.map((resume: any) => (

                  <MenuItem
                    key={resume.id}
                    value={resume.id}
                  >
                    {resume.filename ||
                      resume.resume_name ||
                      `Resume #${resume.id}`}
                  </MenuItem>

                ))

              )}

            </Select>

          </FormControl>

          <Button
            variant="contained"
            onClick={handleRanking}
            disabled={
              loading ||
              !selectedResume
            }
          >
            {loading
              ? "Ranking..."
              : "Run Ranking"}
          </Button>

        </Box>

      </Paper>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 5,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {!loading && ranking.length > 0 && (

        <Paper
          sx={{
            borderRadius: 3,
            overflow: "hidden",
          }}
        >

          <Table>

            <TableHead>

              <TableRow>

                <TableCell>
                  <strong>Rank</strong>
                </TableCell>

                <TableCell>
                  <strong>Job</strong>
                </TableCell>

                <TableCell>
                  <strong>Score</strong>
                </TableCell>

                <TableCell>
                  <strong>Probability</strong>
                </TableCell>

                <TableCell>
                  <strong>Status</strong>
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {ranking.map((item) => (

                <TableRow
                  key={`${item.job_id}-${item.rank}`}
                  hover
                >

                  <TableCell>
                    #{item.rank}
                  </TableCell>

                  <TableCell>
                    <Typography
                      fontWeight={600}
                    >
                      {item.job_title}
                    </Typography>
                  </TableCell>

                  <TableCell>

                    <Typography
                      fontWeight="bold"
                      color={
                        item.score >= 85
                          ? "success.main"
                          : item.score >= 70
                          ? "warning.main"
                          : "error.main"
                      }
                    >
                      {item.score}%
                    </Typography>

                  </TableCell>

                  <TableCell>
                    {(
                      item.probability * 100
                    ).toFixed(2)}
                    %
                  </TableCell>

                  <TableCell>

                    <Chip
                      label={
                        item.prediction === 1
                          ? "Best Match"
                          : "Not Match"
                      }
                      color={
                        item.prediction === 1
                          ? "success"
                          : "error"
                      }
                      size="small"
                    />

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </Paper>

      )}

      {!loading &&
        ranking.length === 0 &&
        selectedResume && (
          <Alert severity="info">
            Aucun résultat de ranking disponible
            pour ce candidat.
          </Alert>
        )}

    </Box>
  );
}