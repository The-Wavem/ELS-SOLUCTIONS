import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const initialFormState = {
  nomeCompleto: '',
  emailCorporativo: '',
  empresa: '',
  paisOrigem: '',
  mensagem: '',
};

const countryOptions = ['Brasil', 'Emirados Árabes', 'China', 'EUA'];

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: 'background.default',
    color: 'text.primary',
    borderRadius: 2,
    '& fieldset': {
      borderColor: 'rgba(212, 175, 55, 0.18)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(212, 175, 55, 0.55)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'primary.main',
      borderWidth: 1.5,
    },
  },
  '& .MuiInputLabel-root': {
    color: 'text.secondary',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'primary.main',
  },
};

function buildLeadPayload(formData) {
  return {
    id: Date.now(),
    status: 'Novo',
    dataAtual: new Date().toLocaleString('pt-BR'),
    ...formData,
  };
}

export function LeadModal({ open, onClose }) {
  const [formData, setFormData] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (isLoading || isSuccess) {
      return;
    }

    setIsLoading(true);

    timerRef.current = setTimeout(() => {
      const lead = buildLeadPayload(formData);

      const storedLeads = (() => {
        try {
          const rawLeads = window.localStorage.getItem('elc_leads');
          const parsedLeads = rawLeads ? JSON.parse(rawLeads) : [];

          return Array.isArray(parsedLeads) ? parsedLeads : [];
        } catch {
          return [];
        }
      })();

      storedLeads.push(lead);
      window.localStorage.setItem('elc_leads', JSON.stringify(storedLeads));

      setIsLoading(false);
      setIsSuccess(true);
      timerRef.current = null;
    }, 1500);
  };

  const handleClose = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setFormData(initialFormState);
    setIsLoading(false);
    setIsSuccess(false);

    onClose();
  };

  return (
    <Dialog
      open={Boolean(open)}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: 'blur(14px)',
            backgroundColor: 'rgba(0, 0, 0, 0.55)',
          },
        },
        paper: {
          sx: {
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            boxShadow: '0 24px 80px rgba(0, 0, 0, 0.55)',
            overflow: 'hidden',
          },
        },
      }}
    >
      {!isSuccess ? (
        <Box component="form" onSubmit={(event) => { event.preventDefault(); handleSubmit(); }}>
          <DialogTitle
            id="lead-modal-title"
            sx={{
              position: 'relative',
              pr: 7,
              py: 3,
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              sx={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: 'text.primary' }}
            >
              Inicie uma Negociação
            </Typography>

            <IconButton
              aria-label="Fechar modal"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                color: 'text.secondary',
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ pt: 1, pb: 2.5 }}>
            <Stack spacing={2.25} sx={{ mt: 1 }}>
              <TextField
                name="nomeCompleto"
                label="Nome Completo"
                value={formData.nomeCompleto}
                onChange={handleFieldChange}
                variant="outlined"
                fullWidth
                required
                sx={fieldSx}
              />

              <TextField
                name="emailCorporativo"
                label="E-mail Corporativo"
                type="email"
                value={formData.emailCorporativo}
                onChange={handleFieldChange}
                variant="outlined"
                fullWidth
                required
                sx={fieldSx}
              />

              <TextField
                name="empresa"
                label="Empresa"
                value={formData.empresa}
                onChange={handleFieldChange}
                variant="outlined"
                fullWidth
                required
                sx={fieldSx}
              />

              <TextField
                name="paisOrigem"
                label="País de Origem"
                value={formData.paisOrigem}
                onChange={handleFieldChange}
                variant="outlined"
                fullWidth
                select
                required
                sx={fieldSx}
              >
                {countryOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                name="mensagem"
                label="Demanda/Mensagem"
                value={formData.mensagem}
                onChange={handleFieldChange}
                variant="outlined"
                fullWidth
                multiline
                minRows={4}
                required
                sx={fieldSx}
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3, pt: 0 }}>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{ borderColor: 'divider', color: 'text.primary' }}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                px: 3,
                minWidth: 220,
                '&:hover': {
                  bgcolor: 'primary.light',
                },
              }}
            >
              {isLoading ? 'Enviando...' : 'Enviar Solicitação'}
            </Button>
          </DialogActions>
        </Box>
      ) : (
        <Box sx={{ px: 4, py: 5, textAlign: 'center' }}>
          <Stack spacing={2.5} alignItems="center">
            <CheckCircleOutlineIcon sx={{ fontSize: 72, color: 'primary.main' }} />

            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontFamily: 'Cormorant Garamond, serif',
                fontStyle: 'italic',
                color: 'text.primary',
              }}
            >
              Solicitação Recebida com Sucesso
            </Typography>

            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 480, lineHeight: 1.8 }}>
              A sua solicitação foi registada com sucesso. A nossa equipa irá analisar os dados e entrar em contacto através do canal corporativo.
            </Typography>

            <Button
              onClick={handleClose}
              variant="contained"
              sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                px: 4,
                '&:hover': {
                  bgcolor: 'primary.light',
                },
              }}
            >
              Fechar Modal
            </Button>
          </Stack>
        </Box>
      )}
    </Dialog>
  );
}