import React from 'react';
import { Box, Paper, TextField, Typography } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { useLanguage } from '../../i18n/LanguageContext';

const textFieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: 'background.paper',
  },
};

const products = [
  {
    key: 'Soy',
    image: 'https://terramagna.com.br/wp-content/uploads/2022/10/Grao-soja-onde-e-produzida-maos-agricultor.jpg',
    label: 'Soja',
  },
  {
    key: 'Corn',
    image: 'https://blog4.mfrural.com.br/wp-content/uploads/2020/11/milho-plantio.jpg',
    label: 'Milho',
  },
  {
    key: 'Coffee',
    image: 'https://th.bing.com/th/id/R.6418043ac1f0db9fcaa67103e2fad5c9',
    label: 'Café',
  },
  {
    key: 'Cocoa',
    image: 'https://images.unsplash.com/photo-1543158181-12781e2f91d8?auto=format&fit=crop&w=1200&q=80',
    label: 'Cacau',
  },
];

export function EditorProductsForm() {
  const { t } = useLanguage();

  return (
    <Box sx={{ display: 'grid', gap: 3 }}>
      <Typography variant="h6" component="h2" sx={{ fontFamily: 'serif', mb: 1 }}>
        {t('admin.editor.products.title')}
      </Typography>

      {products.map((product) => (
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
              alt={product.label}
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
              defaultValue={product.label}
              sx={textFieldSx}
            />
            <TextField
              label={t('admin.editor.products.desc')}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              defaultValue={`Produto premium: ${product.label} com origem certificada e padrão exportação.`}
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
  );
}