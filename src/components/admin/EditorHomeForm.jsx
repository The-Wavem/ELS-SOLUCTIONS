import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { useLanguage } from '../../i18n/LanguageContext';

const textFieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: 'background.paper',
  },
};

export function EditorHomeForm() {
  const { t } = useLanguage();

  return (
    <Box sx={{ display: 'grid', gap: 3 }}>
      <Typography variant="h6" component="h2" sx={{ fontFamily: 'serif', mb: 1 }}>
        {t('admin.editor.home.title')}
      </Typography>

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
  );
}