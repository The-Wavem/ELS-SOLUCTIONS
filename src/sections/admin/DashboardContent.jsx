import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useLanguage } from '../../i18n/LanguageContext';
import { GlobalAccessMap } from '../../components/ui/GlobalAccessMap';
import { AccessChart } from '../../components/admin/AccessChart.jsx';
import { StatCard } from '../../components/admin/StatCard.jsx';

export function DashboardContent() {
  const { t } = useLanguage();
  const [stats, setStats] = useState({
    totalAccesses: 12458,
    uniqueVisitors: 8432,
    newLeads: 24,
  });

  useEffect(() => {
    const hasConsent = localStorage.getItem('user_consent_token');

    if (!hasConsent) {
      setStats((prev) => ({
        ...prev,
        totalAccesses: prev.totalAccesses + 1,
      }));
      return;
    }

    setStats((prev) => ({
      ...prev,
      totalAccesses: prev.totalAccesses + 1,
      uniqueVisitors: prev.uniqueVisitors + 1,
    }));
  }, []);

  return (
    <Box sx={{ p: 0, maxWidth: '100%' }}>
      <Box component="header" sx={{ mb: { xs: 3, sm: 4 } }}>
        <Typography variant="h4" component="h1" sx={{ fontFamily: 'serif', color: 'text.primary', mb: 1 }}>
          {t('admin.dash.title')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('admin.dash.subtitle')}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          mb: { xs: 3, sm: 4 },
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
        }}
      >
        <StatCard
          title={t('admin.dash.totalAccesses')}
          value={stats.totalAccesses.toLocaleString()}
          icon={<VisibilityIcon sx={{ fontSize: 24 }} />}
        />

        <StatCard
          title={t('admin.dash.uniqueVisitors')}
          value={stats.uniqueVisitors.toLocaleString()}
          icon={<PeopleIcon sx={{ fontSize: 24 }} />}
        />

        <StatCard
          title={t('admin.dash.newLeads')}
          value={stats.newLeads}
          icon={<AssessmentIcon sx={{ fontSize: 24 }} />}
          highlighted
        />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 2fr) minmax(0, 1fr)' },
        }}
      >
        <Card sx={{ bgcolor: 'background.paper', border: '1px solid rgba(212,175,55,0.1)', boxShadow: 'none', borderRadius: 2, height: '100%' }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="h6" component="h3" sx={{ fontFamily: 'serif', color: 'text.primary', mb: 3 }}>
              {t('admin.dash.traffic')}
            </Typography>
            <AccessChart />
          </CardContent>
        </Card>

        <Box sx={{ height: '100%' }}>
          <GlobalAccessMap />
        </Box>
      </Box>
    </Box>
  );
}