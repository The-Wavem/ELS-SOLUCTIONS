import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Container, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SecurityIcon from '@mui/icons-material/Security';
import PublicIcon from '@mui/icons-material/Public';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { LeadModal as ContactModal } from '@/components/ui/LeadModal';

const backgroundVideo = '/backgroundHome.mp4';
const backgroundPoster = '/document/image.png';

const sectionReveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: 'easeOut', delay },
  }),
};

export default function Home() {
  const { t } = useLanguage();
  const outletContext = useOutletContext() || {};
  const openLeadModal = outletContext.openLeadModal;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenLeadModal = () => {
    if (typeof openLeadModal === 'function') {
      openLeadModal();
      return;
    }

    setIsModalOpen(true);
  };

  const differentiators = [
    {
      icon: SecurityIcon,
      label: 'Confiança',
      title: t('diff.trust'),
      description: t('diff.trust.desc'),
    },
    {
      icon: PublicIcon,
      label: 'Global',
      title: t('diff.global'),
      description: t('diff.global.desc'),
    },
    {
      icon: WorkspacePremiumIcon,
      label: 'Premium',
      title: t('diff.quality'),
      description: t('diff.quality.desc'),
    },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
      <Box
        component={motion.section}
        initial="hidden"
        animate="visible"
        variants={sectionReveal}
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
          <Box
            component={motion.div}
            variants={sectionReveal}
            sx={{ maxWidth: { xs: '100%', md: '62%' } }}
          >
            <Typography
              variant="overline"
              component="p"
              sx={{ display: 'block', mb: 2, color: 'primary.main' }}
            >
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

            <Typography
              variant="body1"
              sx={{
                mt: 3,
                maxWidth: 620,
                color: 'text.secondary',
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.8,
              }}
            >
              {t('hero.subtitle')}
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ mt: 5 }}>
              <Button
                onClick={handleOpenLeadModal}
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 4,
                  py: 1.6,
                  minWidth: 220,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                }}
              >
                <Typography variant="button" component="span">
                  Contacto executivo
                </Typography>
              </Button>

              <Button
                onClick={handleOpenLeadModal}
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.6,
                  minWidth: 220,
                  borderColor: 'rgba(245, 245, 245, 0.2)',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'rgba(212, 175, 55, 0.06)',
                  },
                }}
              >
                <Typography variant="button" component="span">
                  Perfil da empresa
                </Typography>
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ bgcolor: 'background.default', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
              gap: 3,
            }}
          >
            {differentiators.map((item, index) => {
              const Icon = item.icon;

              return (
                <Box
                  key={item.label}
                  component={motion.div}
                  custom={0.12 * index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={cardReveal}
                >
                  <Card
                    sx={{
                      height: '100%',
                      minHeight: 220,
                      bgcolor: 'background.paper',
                      borderLeft: 1,
                      borderColor: index === 0 ? 'primary.main' : 'divider',
                      boxShadow: 'none',
                      transition: 'transform 180ms ease, border-color 180ms ease, background-color 180ms ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        borderColor: 'primary.main',
                        bgcolor: 'rgba(10,10,10,0.96)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3, height: '100%' }}>
                      <Stack spacing={2} sx={{ height: '100%' }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 2,
                            bgcolor: 'rgba(212,175,55,0.08)',
                            color: 'primary.main',
                          }}
                        >
                          <Icon fontSize="small" />
                        </Box>

                        <Box>
                          <Typography variant="overline" component="p" sx={{ color: 'primary.main' }}>
                            {item.label}
                          </Typography>
                          <Typography variant="body1" component="h3" sx={{ mt: 1, fontWeight: 600 }}>
                            {item.title}
                          </Typography>
                        </Box>

                        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.75 }}>
                          {item.description}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Box>
              );
            })}

            <Box component={motion.div} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={cardReveal}>
              <Card
                sx={{
                  height: '100%',
                  minHeight: 220,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  boxShadow: 'none',
                }}
              >
                <CardContent sx={{ p: 3, height: '100%' }}>
                  <Stack spacing={2} sx={{ height: '100%', justifyContent: 'space-between' }}>
                    <Typography variant="h2" component="div" sx={{ lineHeight: 1, fontSize: { xs: '3rem', md: '3.6rem' } }}>
                      15+
                    </Typography>

                    <Box>
                      <Typography variant="overline" component="p" sx={{ color: 'inherit', opacity: 0.9 }}>
                        Corredores globais
                      </Typography>
                      <Typography variant="body1" component="p" sx={{ mt: 1, fontWeight: 700 }}>
                        Contacto focado em soja, milho e outros fluxos estratégicos de commodities.
                      </Typography>
                    </Box>

                    <Typography variant="body2" component="p" sx={{ lineHeight: 1.7, opacity: 0.92 }}>
                      Comunicação estruturada para alinhamento comercial direto nos principais mercados.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box
        component="section"
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
          <Box
            component={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={sectionReveal}
            sx={{ maxWidth: 860, mx: 'auto', textAlign: 'center' }}
          >
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
                '&:hover': {
                  bgcolor: 'grey.200',
                },
              }}
            >
              <Typography variant="button" component="span">
                {t('cta.button')}
              </Typography>
            </Button>
          </Box>
        </Container>
      </Box>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Box>
  );
}