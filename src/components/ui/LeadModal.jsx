import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Autocomplete,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const initialFormState = {
  nomeCompleto: '',
  cargoTitulo: '',
  emailCorporativo: '',
  empresa: '',
  paisOrigem: null,
  mensagem: '',
};

const blockedDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com'];

const countries = [
  { code: 'BR', label: 'Brasil' },
  { code: 'AE', label: 'Emirados Árabes Unidos' },
  { code: 'CN', label: 'China' },
  { code: 'US', label: 'Estados Unidos' },
  { code: 'SA', label: 'Arábia Saudita' },
  { code: 'QA', label: 'Catar' },
  { code: 'SG', label: 'Singapura' },
  { code: 'IN', label: 'Índia' },
  { code: 'JP', label: 'Japão' },
  { code: 'KR', label: 'Coreia do Sul' },
  { code: 'DE', label: 'Alemanha' },
  { code: 'GB', label: 'Reino Unido' },
  { code: 'FR', label: 'França' },
  { code: 'CH', label: 'Suíça' },
  { code: 'NL', label: 'Países Baixos' },
  { code: 'ES', label: 'Espanha' },
  { code: 'IT', label: 'Itália' },
  { code: 'AR', label: 'Argentina' },
  { code: 'CL', label: 'Chile' },
  { code: 'MX', label: 'México' },
];

const corporateEmailErrorMessage = 'Por favor, utilize um e-mail corporativo. Provedores públicos não são aceitos para negociações B2B.';

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
    paisOrigem: formData.paisOrigem?.label ?? '',
  };
}

export function LeadModal({ open, onClose }) {
  const [formData, setFormData] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [allowPersonalEmail, setAllowPersonalEmail] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  const emailValue = formData.emailCorporativo.trim().toLowerCase();
  const isValidEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  const emailDomain = isValidEmailFormat ? emailValue.split('@')[1] : '';
  const isBlockedEmail = isValidEmailFormat && !allowPersonalEmail && blockedDomains.includes(emailDomain);
  const isSubmitDisabled = isLoading || !isValidEmailFormat || (!allowPersonalEmail && isBlockedEmail);
  const isEmailInvalid = Boolean(emailValue) && (!isValidEmailFormat || isBlockedEmail);
  const emailHelperText = !emailValue
    ? ' '
    : !isValidEmailFormat
      ? 'Digite um e-mail válido.'
      : isBlockedEmail
        ? corporateEmailErrorMessage
        : ' ';

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleCountryChange = (_, value) => {
    setFormData((current) => ({
      ...current,
      paisOrigem: value,
    }));
  };

  const handlePersonalEmailToggle = (event) => {
    setAllowPersonalEmail(event.target.checked);
  };

  const handleSubmit = () => {
    if (isLoading || isSuccess || !isValidEmailFormat || isBlockedEmail) {
      return;
    }

    setIsLoading(true);

    timerRef.current = setTimeout(() => {
      const shouldStoreLead = honeypot.trim().length === 0 && !isBlockedEmail;

      if (shouldStoreLead) {
        const lead = {
          ...buildLeadPayload(formData),
          isPersonalEmail: allowPersonalEmail,
        };

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
      }

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
    setHoneypot('');
    setAllowPersonalEmail(false);

    onClose();
  };

  return (
    <Dialog
      open={Boolean(open)}
      onClose={handleClose}
      scroll="paper"
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
            maxHeight: { xs: 'calc(100vh - 24px)', sm: 'calc(100vh - 48px)' },
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 24px 80px rgba(0, 0, 0, 0.55)',
            overflow: 'hidden',
          },
        },
      }}
    >
      {!isSuccess ? (
        <Box
          component="form"
          onSubmit={(event) => { event.preventDefault(); handleSubmit(); }}
          sx={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1 }}
        >
          <input
            type="text"
            name="website_url_catch"
            style={{ display: 'none' }}
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />

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

          <DialogContent sx={{ pt: 1, pb: 2.5, flex: 1, minHeight: 0, overflowY: 'auto' }}>
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
                name="cargoTitulo"
                label="Cargo / Título"
                value={formData.cargoTitulo}
                onChange={handleFieldChange}
                variant="outlined"
                fullWidth
                placeholder="Ex: CEO, Diretor de Compras"
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
                error={isEmailInvalid}
                helperText={emailHelperText}
                sx={fieldSx}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={allowPersonalEmail}
                    onChange={handlePersonalEmailToggle}
                    size="small"
                    sx={{
                      color: 'primary.main',
                      '&.Mui-checked': {
                        color: 'primary.main',
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Não possuo e-mail corporativo (Usar e-mail pessoal)
                  </Typography>
                }
                sx={{ alignItems: 'flex-start', mt: -0.5, mx: 0 }}
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

              <Autocomplete
                options={countries}
                value={formData.paisOrigem}
                onChange={handleCountryChange}
                getOptionLabel={(option) => option?.label ?? ''}
                isOptionEqualToValue={(option, value) => option.code === value?.code}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="País de Origem"
                    variant="outlined"
                    required
                    fullWidth
                    sx={fieldSx}
                  />
                )}
              />

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
              disabled={isSubmitDisabled}
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
              {isLoading ? 'Enviando...' : 'Enviar Solicitação B2B'}
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