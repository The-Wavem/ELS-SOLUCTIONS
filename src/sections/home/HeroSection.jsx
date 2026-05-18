import React from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { useLanguage } from '@/i18n/LanguageContext';

const backgroundVideo = '/backgroundHome.mp4';
const backgroundPoster = '/document/image.png';

export default function HeroSection({ onOpenContact }) {
  const { t } = useLanguage();

  return (
    <AnimatedSection
      sx={{
        position: 'relative',
        minHeight: { xs: '88vh', md: '92vh' },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'background.default',
      }}
    >
      <Box
        component="video"
        autoPlay
        loop
        muted
        playsInline
        poster={backgroundPoster}
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.5,
          filter: 'contrast(1.15) saturate(0.8)',
          zIndex: 0,
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.86) 48%, rgba(5,5,5,0.22) 100%)',
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(5,5,5,0.38) 0%, rgba(5,5,5,0.12) 46%, rgba(5,5,5,0.92) 100%)',
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          right: { xs: -160, md: -120 },
          top: { xs: 80, md: 40 },
          width: { xs: 360, md: 620 },
          height: { xs: 360, md: 620 },
          borderRadius: '50%',
          border: '1px solid',
          borderColor: 'rgba(212,175,55,0.12)',
          zIndex: 1,
          pointerEvents: 'none',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: { xs: 18, md: 26 },
            borderRadius: '50%',
            border: '1px solid',
            borderColor: 'rgba(212,175,55,0.16)',
          },
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: { xs: 12, md: 16 } }}>
        <Box component={motion.div} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: 'easeOut' }} sx={{ maxWidth: { xs: '100%', md: '62%' } }}>
          <Typography variant="overline" component="p" sx={{ display: 'block', mb: 2, color: 'primary.main' }}>
            Institucional premium de commodities
          </Typography>

          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '3rem', sm: '4.5rem', md: '5.8rem', lg: '6.8rem' },
              lineHeight: 0.92,
              letterSpacing: '-0.04em',
              maxWidth: '11ch',
              textShadow: '0 16px 48px rgba(0, 0, 0, 0.35)',
            }}
          >
            {t('hero.title')}{' '}
            <Typography component="span" variant="inherit" sx={{ color: 'primary.main' }}>
              {t('hero.highlight')}
            </Typography>
          </Typography>

          <Typography variant="body1" sx={{ mt: 3, maxWidth: 620, color: 'text.secondary', fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8 }}>
            {t('hero.subtitle')}
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ mt: 5 }}>
            <Button
              onClick={onOpenContact}
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 4,
                py: 1.6,
                minWidth: 220,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': { bgcolor: 'primary.light' },
              }}
            >
              <Typography variant="button" component="span">
                Contacto executivo
              </Typography>
            </Button>

            <Button
              onClick={onOpenContact}
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.6,
                minWidth: 220,
                borderColor: 'rgba(245, 245, 245, 0.2)',
                color: 'text.primary',
                '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(212, 175, 55, 0.06)' },
              }}
            >
              <Typography variant="button" component="span">
                Perfil da empresa
              </Typography>
            </Button>
          </Stack>
        </Box>
      </Container>
    </AnimatedSection>
  );
}