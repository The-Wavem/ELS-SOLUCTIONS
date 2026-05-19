import React, { useMemo } from 'react';
import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

const adminRoutes = {
  '/admin': '/admin',
  '/admin/dashboard': '/admin',
  '/admin/editor': '/admin/editor',
  '/admin/leads': '/admin/leads',
};

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const activeTab = useMemo(() => {
    if (location.pathname.startsWith('/admin/editor')) {
      return '/admin/editor';
    }

    if (location.pathname.startsWith('/admin/leads')) {
      return '/admin/leads';
    }

    return '/admin';
  }, [location.pathname]);

  const handleTabChange = (_, nextValue) => {
    navigate(adminRoutes[nextValue] || '/admin');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <Paper
        elevation={0}
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          bgcolor: 'background.paper',
          backdropFilter: 'blur(14px)',
        }}
      >
        <Box
          sx={{
            px: { xs: 2, sm: 4 },
            py: 2,
            display: 'flex',
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Box>
            <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: '0.2em' }}>
              ELC ADMIN
            </Typography>
            <Typography variant="h6" sx={{ fontFamily: 'serif', color: 'text.primary', lineHeight: 1.1 }}>
              Portal Administrativo
            </Typography>
          </Box>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            sx={{ minHeight: 48, '& .MuiTab-root': { minHeight: 48, textTransform: 'none', fontWeight: 600 } }}
          >
            <Tab label={t('admin.nav.dashboard')} value="/admin" />
            <Tab label={t('admin.nav.editor')} value="/admin/editor" />
            <Tab label={t('admin.nav.leads')} value="/admin/leads" />
          </Tabs>
        </Box>
      </Paper>

      <Box component="main" sx={{ px: { xs: 2, sm: 4 }, py: { xs: 2, sm: 4 } }}>
        <Outlet />
      </Box>
    </Box>
  );
}