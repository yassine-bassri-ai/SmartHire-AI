import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  Divider,
  useTheme,
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { useThemeMode } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const theme = useTheme();
  const { mode, toggleMode } = useThemeMode();
  const navigate = useNavigate();
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        bgcolor: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.72)' : 'rgba(15,23,42,0.6)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: 'text.primary',
        zIndex: (t) => t.zIndex.drawer + 2,
      }}
    >
      <Toolbar sx={{ gap: 1.5, minHeight: '64px !important', px: { xs: 1.5, md: 3 } }}>
        <IconButton onClick={onMenuClick} sx={{ display: { md: 'none' } }}>
          <MenuRoundedIcon />
        </IconButton>

        {/* Mobile logo */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 32, height: 32, borderRadius: 2, background: 'linear-gradient(135deg,#2563EB,#14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AutoAwesomeRoundedIcon sx={{ color: '#fff', fontSize: 18 }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>SmartHire</Typography>
        </Box>

        {/* Search */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            position: 'relative',
            flex: 1,
            maxWidth: 460,
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            bgcolor: theme.palette.mode === 'light' ? 'rgba(15,23,42,0.04)' : 'rgba(255,255,255,0.06)',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 14,
            px: 1.5,
            py: 0.5,
            transition: 'all 0.2s',
            '&:focus-within': { borderColor: 'primary.main', boxShadow: '0 0 0 3px rgba(37,99,235,0.12)' },
          }}
        >
          <SearchRoundedIcon sx={{ color: 'text.secondary', fontSize: 20, mr: 1 }} />
          <InputBase
            placeholder="Search resumes, jobs, candidates…"
            sx={{ flex: 1, fontSize: '0.875rem' }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Box>

        <Box sx={{ flex: 1, display: { xs: 'block', sm: 'none' } }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Tooltip title="Toggle theme">
            <IconButton onClick={toggleMode} size="small">
              {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon sx={{ color: 'accent.main' }} />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)} size="small">
              <Badge color="error" variant="dot" overlap="circular">
                <NotificationsRoundedIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={notifAnchor}
            open={Boolean(notifAnchor)}
            onClose={() => setNotifAnchor(null)}
            slotProps={{ paper: { sx: { width: 320, borderRadius: 3, mt: 1 } } }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Notifications</Typography>
            </Box>
            <Divider />
            {['New resume uploaded', '3 new predictions ready', 'Job match score updated'].map((n) => (
              <MenuItem key={n} onClick={() => setNotifAnchor(null)} sx={{ py: 1.25 }}>
                <ListItemIcon><NotificationsRoundedIcon fontSize="small" color="primary" /></ListItemIcon>
                <ListItemText primary={n} primaryTypographyProps={{ fontSize: '0.85rem' }} />
              </MenuItem>
            ))}
          </Menu>

          <Tooltip title="Account">
            <IconButton onClick={(e) => setProfileAnchor(e.currentTarget)} sx={{ p: 0.5, ml: 0.5 }}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  background: 'linear-gradient(135deg,#2563EB,#14B8A6)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                }}
              >
                SH
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={profileAnchor}
            open={Boolean(profileAnchor)}
            onClose={() => setProfileAnchor(null)}
            slotProps={{ paper: { sx: { width: 240, borderRadius: 3, mt: 1 } } }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>SmartHire Admin</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>admin@smarthire.ai</Typography>
            </Box>
            <Divider />
            <MenuItem onClick={() => { setProfileAnchor(null); navigate('/settings'); }}>
              <ListItemIcon><PersonRoundedIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="Profile" primaryTypographyProps={{ fontSize: '0.85rem' }} />
            </MenuItem>
            <MenuItem onClick={() => { setProfileAnchor(null); navigate('/settings'); }}>
              <ListItemIcon><SettingsRoundedIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="Settings" primaryTypographyProps={{ fontSize: '0.85rem' }} />
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => setProfileAnchor(null)}>
              <ListItemIcon><LogoutRoundedIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: '0.85rem' }} />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
