import React from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import AnimatedSection from '@/components/ui/AnimatedSection';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

export default function StatsSection() {
  const stats = [
    { value: 15, suffix: '+', label: 'Anos de confiança' },
    { value: 3, suffix: '', label: 'Mercados ativos' },
    { value: 24, suffix: 'h', label: 'Janela de resposta' },
  ];

  return (
    <AnimatedSection sx={{ bgcolor: 'background.default', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {stats.map((stat) => (
            <Box
              key={stat.label}
              sx={{
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                p: 3,
                borderRadius: 2,
              }}
            >
              <Stack spacing={1.5}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {stat.label}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Box>
      </Container>
    </AnimatedSection>
  );
}