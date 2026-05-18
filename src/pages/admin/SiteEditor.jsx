import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  Fab,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { useLanguage } from '../../i18n/LanguageContext';

const productCards = [
  {
    key: 'Soy',
    image: 'https://terramagna.com.br/wp-content/uploads/2022/10/Grao-soja-onde-e-produzida-maos-agricultor.jpg',
    name: 'Soy',
  },
  {
    key: 'Coffee',
    image: 'https://th.bing.com/th/id/R.6418043ac1f0db9fcaa67103e2fad5c9',
    name: 'Coffee',
  },
  {
    key: 'Corn',
    image: 'https://blog4.mfrural.com.br/wp-content/uploads/2020/11/milho-plantio.jpg',
    name: 'Corn',
  },
];

export function SiteEditor() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);

    window.setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      bgcolor: 'background.paper',
    },
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, pb: { xs: 14, sm: 16 }, position: 'relative' }}>
      <Box component="header" sx={{ mb: { xs: 3, sm: 4 } }}>
        <Typography variant="h4" component="h1" sx={{ fontFamily: 'serif', color: 'text.primary', mb: 1 }}>
          {t('admin.editor.title')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('admin.editor.subtitle')}
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          border: '1px solid rgba(212,175,55,0.1)',
          borderRadius: 2,
          overflow: 'hidden',
          mb: 4,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          textColor="primary"
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            px: 2,
          }}
        >
          <Tab label={t('admin.editor.tab.home')} />
          <Tab label={t('admin.editor.tab.about')} />
          <Tab label={t('admin.editor.tab.products')} />
        </Tabs>
      </Paper>

      <Box sx={{ maxWidth: 960, display: 'grid', gap: 3 }}>
        {activeTab === 0 && (
          <Paper elevation={0} sx={{ p: { xs: 2, sm: 4 }, bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
            <Typography variant="h6" component="h2" sx={{ fontFamily: 'serif', mb: 3 }}>
              {t('admin.editor.home.title')}
            </Typography>
            <Box sx={{ display: 'grid', gap: 3 }}>
              <TextField
                label={t('admin.editor.home.hero')}
                variant="outlined"
                fullWidth
                defaultValue="A Excelência em Agro Exportação"
                sx={textFieldSx}
              />
              <TextField
                label={t('admin.editor.home.subtitle')}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                defaultValue="Conectando as origens sul-americanas aos hubs mais exigentes do Oriente Médio e Ásia, com qualidade insuperável e logística de ponta."
                sx={textFieldSx}
              />
              <TextField
                label={t('admin.editor.home.video')}
                variant="outlined"
                fullWidth
                defaultValue="/src/assets/background.mp4"
                sx={textFieldSx}
              />
            </Box>
          </Paper>
        )}

        {activeTab === 1 && (
          <Paper elevation={0} sx={{ p: { xs: 2, sm: 4 }, bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
            <Typography variant="h6" component="h2" sx={{ fontFamily: 'serif', mb: 3 }}>
              {t('admin.editor.about.title')}
            </Typography>
            <Box sx={{ display: 'grid', gap: 3 }}>
              <TextField
                label={t('admin.editor.about.bio')}
                variant="outlined"
                fullWidth
                multiline
                rows={6}
                defaultValue="A ELC Solutions nasceu da visão de transformar a cadeia de suprimentos global, garantindo que os melhores grãos cheguem aos destinos mais exigentes com eficiência e segurança."
                sx={textFieldSx}
              />
              <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
                <TextField
                  label={t('admin.editor.about.mission')}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  defaultValue="Fornecer excelência em cada etapa do processo logístico, do campo ao cliente final."
                  sx={textFieldSx}
                />
                <TextField
                  label={t('admin.editor.about.vision')}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  defaultValue="Ser a principal referência em agronegócio e logística integrada no cenário global."
                  sx={textFieldSx}
                />
              </Box>
            </Box>
          </Paper>
        )}

        {activeTab === 2 && (
          <Box sx={{ display: 'grid', gap: 3 }}>
            <Typography variant="h6" component="h2" sx={{ fontFamily: 'serif' }}>
              {t('admin.editor.products.title')}
            </Typography>

            {productCards.map((product) => (
              <Paper
                key={product.key}
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 3 },
                  bgcolor: 'background.paper',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 2,
                  display: 'grid',
                  gap: 3,
                  gridTemplateColumns: { xs: '1fr', md: '220px 1fr' },
                  alignItems: 'start',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    height: { xs: 200, md: 160 },
                    borderRadius: 2,
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.08)',
                    bgcolor: 'background.default',
                  }}
                >
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'rgba(0,0,0,0.45)',
                    }}
                  >
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: '#fff', fontWeight: 700 }}>
                      <InsertPhotoIcon fontSize="small" />
                      {t('admin.editor.products.change')}
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ display: 'grid', gap: 3 }}>
                  <TextField
                    label={t('admin.editor.products.name')}
                    variant="outlined"
                    fullWidth
                    defaultValue={product.key}
                    sx={textFieldSx}
                  />
                  <TextField
                    label={t('admin.editor.products.desc')}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    defaultValue="Premium quality product sourced from certified farms."
                    sx={textFieldSx}
                  />
                  <TextField
                    label={t('admin.editor.products.image')}
                    variant="outlined"
                    fullWidth
                    placeholder="https://..."
                    sx={textFieldSx}
                  />
                </Box>
              </Paper>
            ))}
          </Box>
        )}
      </Box>

      <Fab
        variant="extended"
        color="primary"
        onClick={handleSave}
        disabled={isSaving}
        sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1300, px: 3 }}
      >
        {isSaving ? (
          <>
            <CircularProgress size={24} color="inherit" sx={{ mr: 1.5 }} />
            {t('admin.editor.saving')}
          </>
        ) : (
          <>
            <SaveIcon sx={{ mr: 1 }} />
            {t('admin.editor.save')}
          </>
        )}
      </Fab>
    </Box>
  );
}