import React, { useEffect, useMemo, useState } from 'react';
import { Box, Card, CardContent, LinearProgress, Stack, Typography } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';

const fallbackRegions = [
  { country: 'Brasil', value: 86 },
  { country: 'Emirados Árabes Unidos', value: 74 },
  { country: 'Estados Unidos', value: 62 },
  { country: 'China', value: 58 },
  { country: 'Reino Unido', value: 41 },
];

export function GlobalAccessMap() {
  const [accessData, setAccessData] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('elc_analytics_accesses');

      if (!stored) {
        setAccessData(fallbackRegions);
        return;
      }

      const parsed = JSON.parse(stored);

      if (!Array.isArray(parsed)) {
        setAccessData(fallbackRegions);
        return;
      }

      const counts = parsed.reduce((acc, curr) => {
        const key = curr?.country;

        if (key) {
          acc[key] = (acc[key] || 0) + 1;
        }

        return acc;
      }, {});

      const entries = Object.entries(counts)
        .map(([country, value]) => ({ country, value }))
        .sort((left, right) => right.value - left.value)
        .slice(0, 5);

      setAccessData(entries.length > 0 ? entries : fallbackRegions);
    } catch {
      setAccessData(fallbackRegions);
    }
  }, []);

  const maxValue = useMemo(() => Math.max(...accessData.map((item) => item.value), 1), [accessData]);

  return (
    <Card
      sx={{
        height: '100%',
        bgcolor: 'background.paper',
        border: '1px solid rgba(212,175,55,0.1)',
        boxShadow: 'none',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <CardContent sx={{ p: 3, height: '100%' }}>
        <Stack spacing={3} sx={{ height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(212,175,55,0.1)',
                color: 'primary.main',
              }}
            >
              <PublicIcon sx={{ fontSize: 20 }} />
            </Box>

            <Box>
              <Typography variant="h6" component="h3" sx={{ fontFamily: 'serif', color: 'text.primary' }}>
                Presença global
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Acessos distribuídos por mercado estratégico.
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              position: 'relative',
              minHeight: 220,
              borderRadius: 2,
              border: '1px solid rgba(212,175,55,0.08)',
              bgcolor: '#060606',
              backgroundImage:
                'radial-gradient(circle at 20% 20%, rgba(212,175,55,0.12), transparent 22%), radial-gradient(circle at 80% 30%, rgba(212,175,55,0.08), transparent 18%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
              p: 2,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                opacity: 0.18,
                backgroundImage:
                  'linear-gradient(rgba(212,175,55,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.14) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                pointerEvents: 'none',
              }}
            />

            <Stack spacing={1.75} sx={{ position: 'relative', zIndex: 1 }}>
              {accessData.map((item) => {
                const percentage = Math.max(8, Math.round((item.value / maxValue) * 100));

                return (
                  <Box key={item.country}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.75 }}>
                      <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                        {item.country}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 700 }}>
                        {item.value}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={percentage}
                      sx={{
                        height: 8,
                        borderRadius: 999,
                        bgcolor: 'rgba(255,255,255,0.06)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 999,
                          backgroundImage: 'linear-gradient(90deg, #D4AF37 0%, #B8860B 100%)',
                        },
                      }}
                    />
                  </Box>
                );
              })}
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}