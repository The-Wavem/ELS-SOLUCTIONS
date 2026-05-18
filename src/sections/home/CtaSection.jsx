import React, { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { LeadModal } from '@/components/ui/LeadModal';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { useLanguage } from '@/i18n/LanguageContext';

export default function CtaSection() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AnimatedSection
      id="contact"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 12, md: 16 },
        bgcolor: 'background.default',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(180deg, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.92) 100%), url(/document/image.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.22,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ maxWidth: 860, mx: 'auto', textAlign: 'center' }}>
          <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '2.6rem', md: '4rem' } }}>
            {t('cta.title')}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mt: 3,
              color: 'text.secondary',
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.85,
              maxWidth: 680,
              mx: 'auto',
            }}
          >
            {t('cta.desc')}
          </Typography>

          <Button
            onClick={() => setIsModalOpen(true)}
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              mt: 5,
              px: 4,
              py: 1.75,
              bgcolor: 'text.primary',
              color: 'background.default',
              '&:hover': { bgcolor: 'grey.200' },
            }}
          >
            <Typography variant="button" component="span">
              {t('cta.button')}
            </Typography>
          </Button>
        </Box>
      </Container>

      <LeadModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </AnimatedSection>
  );
}