import React from 'react';
import { Box, Card, CardContent, Container, Stack, Typography } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import PublicIcon from '@mui/icons-material/Public';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { useLanguage } from '@/i18n/LanguageContext';

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut', delay } }),
};

export default function FeaturesSection() {
  const { t } = useLanguage();

  const features = [
    { icon: SecurityIcon, label: 'Confiança', title: t('diff.trust'), description: t('diff.trust.desc') },
    { icon: PublicIcon, label: 'Global', title: t('diff.global'), description: t('diff.global.desc') },
    { icon: WorkspacePremiumIcon, label: 'Premium', title: t('diff.quality'), description: t('diff.quality.desc') },
  ];

  return (
    <AnimatedSection sx={{ bgcolor: 'background.default', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
            gap: 3,
          }}
        >
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <Box
                key={item.label}
                component={motion.div}
                custom={0.12 * index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={reveal}
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
                      <Box sx={{ width: 48, height: 48, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2, bgcolor: 'rgba(212,175,55,0.08)', color: 'primary.main' }}>
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

          <Box component={motion.div} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={reveal}>
            <Card sx={{ height: '100%', minHeight: 220, bgcolor: 'primary.main', color: 'primary.contrastText', boxShadow: 'none' }}>
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
    </AnimatedSection>
  );
}