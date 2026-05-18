import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { useLanguage } from '../../i18n/LanguageContext';

const textFieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: 'background.paper',
  },
};

export function EditorAboutForm() {
  const { t } = useLanguage();

  return (
    <Box sx={{ display: 'grid', gap: 3 }}>
      <Typography variant="h6" component="h2" sx={{ fontFamily: 'serif', mb: 1 }}>
        {t('admin.editor.about.title')}
      </Typography>

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
  );
}