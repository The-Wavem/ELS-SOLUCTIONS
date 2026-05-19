import React from 'react';
import { Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const mockChartData = [
  { name: 'Jan', access: 4000 },
  { name: 'Feb', access: 3000 },
  { name: 'Mar', access: 2000 },
  { name: 'Apr', access: 2780 },
  { name: 'May', access: 1890 },
  { name: 'Jun', access: 2390 },
  { name: 'Jul', access: 3490 },
];

export function AccessChart() {
  const categories = mockChartData.map((item) => item.name);
  const values = mockChartData.map((item) => item.access);

  return (
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
  );
}