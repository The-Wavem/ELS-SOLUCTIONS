import React from 'react';
import { Box, Button, Divider, Modal, Paper, Stack, Typography } from '@mui/material';

export function LeadModal({ isOpen, onClose }) {
  return (
    <Modal open={Boolean(isOpen)} onClose={onClose} aria-labelledby="lead-modal-title">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          px: 2,
          py: 4,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: 'min(720px, 100%)',
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            p: { xs: 3, md: 4 },
          }}
        >
          <Stack spacing={3}>
            <Box>
              <Typography variant="overline" component="p" sx={{ color: 'primary.main' }}>
                Contacto direto
              </Typography>
              <Typography id="lead-modal-title" variant="h2" component="h2" sx={{ mt: 1 }}>
                Apresentação da mesa de commodities
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary', lineHeight: 1.8 }}>
                Este canal é apenas para contacto direto em commodities globais, com foco em soja, milho e fluxos estratégicos adjacentes.
              </Typography>
            </Box>

            <Divider sx={{ borderColor: 'divider' }} />

            <Stack spacing={2}>
              <Box>
                <Typography variant="body1" component="p" sx={{ fontWeight: 700 }}>
                  O que discutimos
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.75, color: 'text.secondary', lineHeight: 1.75 }}>
                  Apresentação de contrapartes, alinhamento de corredores, perfil de volume e timing para negociação internacional.
                </Typography>
              </Box>

              <Box>
                <Typography variant="body1" component="p" sx={{ fontWeight: 700 }}>
                  O que não fazemos
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.75, color: 'text.secondary', lineHeight: 1.75 }}>
                  Sem catálogo de serviços, sem prospecção genérica e sem proposta de consultoria sem relação direta.
                </Typography>
              </Box>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="flex-end">
              <Button
                onClick={onClose}
                variant="outlined"
                sx={{ borderColor: 'divider', color: 'text.primary' }}
              >
                Fechar
              </Button>
              <Button onClick={onClose} variant="contained">
                Continuar
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Modal>
  );
}