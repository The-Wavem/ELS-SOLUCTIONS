import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

export default function AnimatedSection({ children, sx = {}, id }) {
  return (
    <Box
      component={motion.section}
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      sx={sx}
    >
      {children}
    </Box>
  );
}