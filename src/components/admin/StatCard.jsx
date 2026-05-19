import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

export function StatCard({ title, value, icon, highlighted = false }) {
  return (
    <Card
      sx={{
        bgcolor: 'background.paper',
        border: highlighted ? '1px solid rgba(212,175,55,0.22)' : '1px solid rgba(212,175,55,0.1)',
        boxShadow: highlighted ? '0 0 15px rgba(212,175,55,0.05)' : 'none',
        borderRadius: 2,
        height: '100%',
      }}
    >
      <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
        <Box>
          <Typography
            variant="body2"
            sx={{ color: highlighted ? 'primary.main' : 'text.secondary', mb: 0.5 }}
          >
            {title}
          </Typography>
          <Typography variant="h3" sx={{ color: 'text.primary', fontWeight: 700 }}>
            {value}
          </Typography>
        </Box>

        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: highlighted ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.05)',
            color: 'primary.main',
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
}