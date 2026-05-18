import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Card, CardContent, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PublicIcon from '@mui/icons-material/Public';
import { useLanguage } from '../../i18n/LanguageContext';
import { GlobalAccessMap } from '../../components/ui/GlobalAccessMap';

const mockChartData = [
  { name: 'Jan', access: 4000 },
  { name: 'Feb', access: 3000 },
  { name: 'Mar', access: 2000 },
  { name: 'Apr', access: 2780 },
  { name: 'May', access: 1890 },
  { name: 'Jun', access: 2390 },
  { name: 'Jul', access: 3490 },
];

const cardSx = {
  bgcolor: 'background.paper',
  border: '1px solid rgba(212,175,55,0.1)',
  boxShadow: 'none',
  borderRadius: 2,
  height: '100%',
};

export function Dashboard() {
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

  const categories = mockChartData.map((item) => item.name);
  const values = mockChartData.map((item) => item.access);

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: '100%' }}>
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
        <Box>
          <Card sx={cardSx}>
            <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                  {t('admin.dash.totalAccesses')}
                </Typography>
                <Typography variant="h3" sx={{ color: 'text.primary', fontWeight: 700 }}>
                  {stats.totalAccesses.toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(255,255,255,0.05)', color: 'primary.main' }}>
                <VisibilityIcon sx={{ fontSize: 24 }} />
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Card sx={cardSx}>
            <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                  {t('admin.dash.uniqueVisitors')}
                </Typography>
                <Typography variant="h3" sx={{ color: 'text.primary', fontWeight: 700 }}>
                  {stats.uniqueVisitors.toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(255,255,255,0.05)', color: 'primary.main' }}>
                <PeopleIcon sx={{ fontSize: 24 }} />
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Card sx={{ ...cardSx, border: '1px solid rgba(212,175,55,0.2)', boxShadow: '0 0 15px rgba(212,175,55,0.05)' }}>
            <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="body2" sx={{ color: 'primary.main', mb: 0.5 }}>
                  {t('admin.dash.newLeads')}
                </Typography>
                <Typography variant="h3" sx={{ color: 'text.primary', fontWeight: 700 }}>
                  {stats.newLeads}
                </Typography>
              </Box>
              <Box sx={{ width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(212,175,55,0.1)', color: 'primary.main' }}>
                <AssessmentIcon sx={{ fontSize: 24 }} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 2fr) minmax(0, 1fr)' },
        }}
      >
        <Box>
          <Card sx={cardSx}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" component="h3" sx={{ fontFamily: 'serif', color: 'text.primary', mb: 3 }}>
                {t('admin.dash.traffic')}
              </Typography>
              <Box sx={{ width: '100%', height: { xs: 280, sm: 420 } }}>
                <BarChart
                  xAxis={[{ scaleType: 'band', data: categories }]}
                  series={[{ data: values, color: '#D4AF37' }]}
                  height={420}
                  grid={{ horizontal: true, vertical: false }}
                  slotProps={{ legend: { hidden: true } }}
                  sx={{
                    '& .MuiBarElement-root': { fill: '#D4AF37' },
                    '& .MuiChartsAxis-tickLabel': { fill: '#A0AAB4' },
                    '& .MuiChartsAxis-line, & .MuiChartsAxis-tick': { stroke: 'rgba(255,255,255,0.15)' },
                    '& .MuiChartsGrid-line': { stroke: 'rgba(255,255,255,0.08)' },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Box sx={{ height: '100%' }}>
            <GlobalAccessMap />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}