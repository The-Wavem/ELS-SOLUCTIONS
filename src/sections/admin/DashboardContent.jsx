import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Card, CardContent, Paper, Stack, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useLanguage } from '../../i18n/LanguageContext';
import { GlobalAccessMap } from '../../components/ui/GlobalAccessMap';
import { AccessChart } from '../../components/admin/AccessChart.jsx';
import { StatCard } from '../../components/admin/StatCard.jsx';

const datePickerSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: 'background.paper',
    '& fieldset': {
      borderColor: 'rgba(212,175,55,0.18)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(212,175,55,0.45)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'primary.main',
    },
  },
};

export function DashboardContent() {
  const { t } = useLanguage();
  const [startDate, setStartDate] = useState(dayjs().subtract(30, 'day'));
  const [endDate, setEndDate] = useState(dayjs());
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

  const handleDatePreset = (days) => {
    const today = dayjs();

    if (days === 0) {
      setStartDate(today);
      setEndDate(today);
      return;
    }

    setStartDate(today.subtract(days, 'day'));
    setEndDate(today);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 0, maxWidth: '100%' }}>
        <Paper
          elevation={0}
          sx={{
            bgcolor: 'background.paper',
            border: '1px solid rgba(212,175,55,0.1)',
            boxShadow: 'none',
            borderRadius: 2,
            p: { xs: 2, sm: 3 },
            mb: { xs: 3, sm: 4 },
          }}
        >
          <Stack
            direction={{ xs: 'column', lg: 'row' }}
            spacing={2}
            alignItems={{ xs: 'stretch', lg: 'center' }}
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontFamily: 'serif', color: 'text.primary', mb: 1 }}>
                Visão Geral do Sistema
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {t('admin.dash.subtitle')}
              </Typography>
            </Box>

            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
              <ButtonGroup variant="outlined" color="primary">
                <Button onClick={() => handleDatePreset(0)}>Hoje</Button>
                <Button onClick={() => handleDatePreset(7)}>7 Dias</Button>
                <Button onClick={() => handleDatePreset(30)}>30 Dias</Button>
              </ButtonGroup>

              <DatePicker
                label="Data Inicial"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                format="DD/MM/YYYY"
                sx={datePickerSx}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true,
                  },
                }}
              />

              <DatePicker
                label="Data Final"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                format="DD/MM/YYYY"
                sx={datePickerSx}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true,
                  },
                }}
              />
            </Stack>
          </Stack>
        </Paper>

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
            gridTemplateColumns: { xs: '1fr' },
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
        </Box>

        <Box sx={{ mt: 3 }}>
          <GlobalAccessMap />
        </Box>
      </Box>
    </LocalizationProvider>
  );
}