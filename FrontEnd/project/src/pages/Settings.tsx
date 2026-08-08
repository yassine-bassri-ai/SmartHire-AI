import { Box, Grid2 as Grid, Card, CardContent, Typography, Switch, FormControlLabel, Divider, Button, Stack, RadioGroup, Radio, FormControl, FormLabel, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import PageHeader, { CardWrapper, CardTitle } from '@/components/PageHeader';
import { useThemeMode } from '@/context/ThemeContext';
import toast from 'react-hot-toast';

const themeColors = [
  { name: 'Ocean Blue', value: '#2563EB' },
  { name: 'Teal', value: '#14B8A6' },
  { name: 'Amber', value: '#F59E0B' },
  { name: 'Emerald', value: '#16A34A' },
  { name: 'Crimson', value: '#DC2626' },
  { name: 'Sky', value: '#0EA5E9' },
];

export default function Settings() {
  const { mode, setMode } = useThemeMode();
  const theme = useTheme();

  return (
    <Box>
      <PageHeader title="Settings" subtitle="Customize your SmartHire AI experience" icon={<SettingsRoundedIcon />} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CardWrapper>
            <CardTitle title="Appearance" />
            <CardContent sx={{ pt: 1 }}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                <DarkModeRoundedIcon color="primary" />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Dark Mode</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>Toggle between light and dark themes</Typography>
                </Box>
                <Switch
                  checked={mode === 'dark'}
                  onChange={(e) => setMode(e.target.checked ? 'dark' : 'light')}
                />
              </Stack>
              <Divider sx={{ my: 1.5 }} />
              <FormControl>
                <FormLabel sx={{ fontSize: '0.85rem', fontWeight: 600, mb: 1 }}>Theme Color</FormLabel>
                <RadioGroup defaultValue="#2563EB" row>
                  {themeColors.map((c) => (
                    <Box key={c.value} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 1.5 }}>
                      <Box
                        component="label"
                        sx={{
                          width: 40, height: 40, borderRadius: '50%',
                          bgcolor: c.value, cursor: 'pointer',
                          border: '3px solid', borderColor: 'transparent',
                          transition: 'all 0.2s',
                          '&:hover': { transform: 'scale(1.1)' },
                        }}
                      >
                        <Radio value={c.value} sx={{ opacity: 0, width: 40, height: 40 }} onChange={() => toast.success(`Theme color set to ${c.name}`)} />
                      </Box>
                      <Typography variant="caption" sx={{ mt: 0.5 }}>{c.name}</Typography>
                    </Box>
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
          </CardWrapper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CardWrapper>
            <CardTitle title="Language & Region" />
            <CardContent sx={{ pt: 1 }}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                <LanguageRoundedIcon color="secondary" />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Interface Language</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>Choose your preferred language</Typography>
                </Box>
              </Stack>
              <RadioGroup defaultValue="en">
                <Stack spacing={0.5}>
                  <FormControlLabel value="en" control={<Radio size="small" />} label="English" />
                  <FormControlLabel value="es" control={<Radio size="small" />} label="Español" />
                  <FormControlLabel value="fr" control={<Radio size="small" />} label="Français" />
                  <FormControlLabel value="de" control={<Radio size="small" />} label="Deutsch" />
                </Stack>
              </RadioGroup>
            </CardContent>
          </CardWrapper>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <CardWrapper>
            <CardTitle title="Notifications" />
            <CardContent sx={{ pt: 1 }}>
              <Stack spacing={1}>
                {['Email notifications for new predictions', 'Push notifications for candidate matches', 'Weekly recruitment summary report'].map((label) => (
                  <FormControlLabel key={label} control={<Switch defaultChecked />} label={label} />
                ))}
              </Stack>
              <Box sx={{ mt: 2.5, display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
                <Button variant="outlined" color="inherit" onClick={() => toast('Changes discarded')}>Cancel</Button>
                <Button variant="contained" onClick={() => toast.success('Settings saved successfully!')}>Save Changes</Button>
              </Box>
            </CardContent>
          </CardWrapper>
        </Grid>
      </Grid>
    </Box>
  );
}
