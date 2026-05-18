import React from 'react';
import { Typography } from '@mui/material';
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';

export default function AnimatedCounter({ value, suffix = '', prefix = '' }) {
  const ref = React.useRef(null);
  const motionValue = useMotionValue(0);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const rounded = useTransform(motionValue, (latest) => Math.round(latest).toLocaleString('pt-BR'));

  React.useEffect(() => {
    if (!isInView) {
      return undefined;
    }

    const controls = animate(motionValue, value, { duration: 1.6, ease: 'easeOut' });

    return () => controls.stop();
  }, [isInView, motionValue, value]);

  return (
    <Typography
      ref={ref}
      component={motion.span}
      variant="h2"
      sx={{
        fontFamily: 'serif',
        fontStyle: 'italic',
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: 0.5,
      }}
    >
      <motion.span>{prefix}</motion.span>
      <motion.span>{rounded}</motion.span>
      <motion.span>{suffix}</motion.span>
    </Typography>
  );
}