import { NavLink } from 'react-router-dom';

import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';

import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import PeopleIcon from '@mui/icons-material/People';

import { motion } from 'framer-motion';

interface SidebarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  onClose: () => void;
}

/*
|--------------------------------------------------------------------------
| Navigation items
|--------------------------------------------------------------------------
*/

const navItems = [
  {
    label: 'Dashboard',
    path: '/',
    icon: DashboardRoundedIcon,
  },
  {
    label: 'Upload Resume',
    path: '/upload-resume',
    icon: UploadFileRoundedIcon,
  },
  {
    label: 'Upload Job',
    path: '/upload-job',
    icon: WorkOutlineRoundedIcon,
  },
  {
    label: 'Predictions',
    path: '/predictions',
    icon: InsightsRoundedIcon,
  },
  {
    label: 'Candidate Ranking',
    path: '/candidate-ranking',
    icon: PersonSearchRoundedIcon,
  },
  {
    label: 'Candidates',
    path: '/candidates',
    icon: PeopleIcon,
  },
  {
    label: 'Jobs',
    path: '/jobs',
    icon: WorkOutlineRoundedIcon,
  },
  {
    label: 'Resumes',
    path: '/resumes',
    icon: ArticleRoundedIcon,
  },
  {
    label: 'Analytics',
    path: '/analytics',
    icon: BarChartRoundedIcon,
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: SettingsRoundedIcon,
  },
  {
    label: 'Landing Page',
    path: '/landing',
    icon: AutoAwesomeRoundedIcon,
  },
];

/*
|--------------------------------------------------------------------------
| Sidebar
|--------------------------------------------------------------------------
*/

export default function Sidebar({
  drawerWidth,
  mobileOpen,
  onClose,
}: SidebarProps) {
  const content = (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        width: drawerWidth,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',

        background:
          (theme) =>
            theme.palette.mode === 'light'
              ? 'linear-gradient(180deg,#FFFFFF 0%,#F8FAFC 100%)'
              : 'linear-gradient(180deg,#0F172A 0%,#0B1120 100%)',

        borderRight: (theme) =>
          `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* ---------------------------------------------------------------- */}
      {/* Logo */}
      {/* ---------------------------------------------------------------- */}

      <Box
        sx={{
          px: 2.5,
          py: 2.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 3,
            background:
              'linear-gradient(135deg,#2563EB,#14B8A6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow:
              '0 6px 16px -6px rgba(37,99,235,0.5)',
          }}
        >
          <AutoAwesomeRoundedIcon
            sx={{
              color: '#fff',
              fontSize: 22,
            }}
          />
        </Box>

        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              lineHeight: 1.1,
              fontSize: '1.05rem',
            }}
          >
            SmartHire
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              letterSpacing: '0.1em',
              fontWeight: 600,
            }}
          >
            AI PLATFORM
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mx: 2 }} />

      {/* ---------------------------------------------------------------- */}
      {/* Navigation */}
      {/* ---------------------------------------------------------------- */}

      <List
        sx={{
          flex: 1,
          py: 1.5,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={onClose}
              style={{
                textDecoration: 'none',
              }}
            >
              {({ isActive }) => (
                <ListItemButton
                  selected={isActive}
                  sx={{
                    mb: 0.3,

                    '&.Mui-selected': {
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? 'rgba(37,99,235,0.08)'
                          : 'rgba(37,99,235,0.18)',

                      '&:hover': {
                        backgroundColor: (theme) =>
                          theme.palette.mode === 'light'
                            ? 'rgba(37,99,235,0.12)'
                            : 'rgba(37,99,235,0.22)',
                      },
                    },

                    '&:hover': {
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? 'rgba(15,23,42,0.04)'
                          : 'rgba(255,255,255,0.04)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 38,
                      color: isActive
                        ? 'primary.main'
                        : 'text.secondary',
                      transition: 'color 0.2s',
                    }}
                  >
                    <Icon fontSize="small" />
                  </ListItemIcon>

                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive
                        ? 'primary.main'
                        : 'text.primary',
                    }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          );
        })}
      </List>

      <Divider sx={{ mx: 2 }} />

      {/* ---------------------------------------------------------------- */}
      {/* Pro Tip */}
      {/* ---------------------------------------------------------------- */}

      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            p: 1.75,
            borderRadius: 3,

            background:
              'linear-gradient(135deg,rgba(37,99,235,0.10),rgba(20,184,166,0.10))',

            border: (theme) =>
              `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              mb: 0.5,
            }}
          >
            Pro Tip
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
            }}
          >
            Upload a resume then run predictions to find
            the best job matches instantly.
          </Typography>

          <Chip
            label="v1.0"
            size="small"
            sx={{
              mt: 1,
              fontSize: '0.65rem',
              height: 20,
              bgcolor: 'primary.main',
              color: '#fff',
            }}
          />
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {/* ================================================================ */}
      {/* Desktop permanent drawer */}
      {/* ================================================================ */}

      <Box
        component="nav"
        sx={{
          width: {
            md: drawerWidth,
          },

          flexShrink: {
            md: 0,
          },

          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,

          display: {
            xs: 'none',
            md: 'block',
          },
        }}
      >
        {content}
      </Box>

      {/* ================================================================ */}
      {/* Mobile temporary drawer */}
      {/* ================================================================ */}

      <Box
        sx={{
          position: 'fixed',
          inset: 0,

          zIndex: (theme) =>
            theme.zIndex.drawer + 1,

          display: {
            xs: mobileOpen ? 'block' : 'none',
            md: 'none',
          },
        }}
      >
        {/* Overlay */}

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'rgba(15,23,42,0.5)',
          }}
          onClick={onClose}
        />

        {/* Drawer */}

        <Box
          component={motion.div}
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          {content}
        </Box>
      </Box>
    </>
  );
}