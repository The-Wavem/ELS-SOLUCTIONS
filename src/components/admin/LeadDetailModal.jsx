import React from 'react';
import { motion } from 'framer-motion';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const flagMap = {
  'Brasil': '🇧🇷',
  'Emirados Árabes Unidos': '🇦🇪',
  'China': '🇨🇳',
  'Estados Unidos': '🇺🇸',
  'Arábia Saudita': '🇸🇦',
  'Catar': '🇶🇦',
  'Índia': '🇮🇳',
  'Singapura': '🇸🇬',
  'Japão': '🇯🇵',
  'Alemanha': '🇩🇪',
  'Reino Unido': '🇬🇧',
};

function formatLeadDate(value) {
  if (!value) {
    return 'Sem data';
  }

  if (typeof value === 'string' && value.includes('/')) {
    return value;
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return String(value);
  }

  return parsedDate.toLocaleString('pt-BR');
}

function isPersonalOrGenericEmail(email = '', isPersonalEmail = false) {
  const normalizedEmail = String(email).toLowerCase();

  return (
    isPersonalEmail ||
    normalizedEmail.includes('gmail') ||
    normalizedEmail.includes('hotmail') ||
    normalizedEmail.includes('yahoo') ||
    normalizedEmail.includes('outlook')
  );
}

export function LeadDetailModal({ open, onClose, lead }) {
  if (!lead) {
    return null;
  }

  const name = lead.name || lead.nomeCompleto || 'Contato sem nome';
  const role = lead.role || lead.cargoTitulo || 'Sem cargo';
  const company = lead.company || lead.empresa || '—';
  const country = lead.country || lead.paisOrigem || '—';
  const displayFlag = lead.flag || flagMap[lead.country] || '🌐';
  const email = lead.email || lead.emailCorporativo || '';
  const phone = lead.phone || '—';
  const riskIsWarning = isPersonalOrGenericEmail(email, Boolean(lead.isPersonalEmail));
  const mailtoHref = email ? `mailto:${email}` : undefined;

  const dataVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
        },
        paper: {
          sx: {
            bgcolor: 'background.paper',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: 3,
            boxShadow: '0 24px 80px rgba(0, 0, 0, 0.55)',
            overflow: 'hidden',
          },
        },
      }}
    >
      <DialogTitle sx={{ py: 2.5, pr: 7 }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
          <Box>
            <Typography variant="h5" component="h2" sx={{ fontFamily: 'serif', color: 'text.primary', lineHeight: 1.1 }}>
              {name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
              {role}
            </Typography>
          </Box>

          <IconButton aria-label="Fechar detalhes do lead" onClick={onClose} sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

      <DialogContent sx={{ py: 3 }}>
        <Stack spacing={2.5}>
          <Alert severity={riskIsWarning ? 'warning' : 'success'} variant="outlined" sx={{ borderRadius: 2 }}>
            {riskIsWarning
              ? 'Atenção: Este lead utilizou um e-mail pessoal ou genérico. Verifique a autenticidade da empresa.'
              : 'E-mail Corporativo Autenticado.'}
          </Alert>

          <motion.div variants={dataVariants} initial="hidden" animate="visible">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <motion.div variants={itemVariants}>
                  <Paper variant="outlined" sx={{ p: 2, height: '100%', bgcolor: 'background.default', borderColor: 'rgba(255,255,255,0.08)' }}>
                    <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1 }}>
                      <BusinessIcon fontSize="small" sx={{ color: 'primary.main' }} />
                      <Typography variant="overline" sx={{ color: 'primary.main' }}>
                        Empresa
                      </Typography>
                    </Stack>
                    <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
                      {company}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>

              <Grid item xs={12} sm={6}>
                <motion.div variants={itemVariants}>
                  <Paper variant="outlined" sx={{ p: 2, height: '100%', bgcolor: 'background.default', borderColor: 'rgba(255,255,255,0.08)' }}>
                    <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1 }}>
                      <PublicIcon fontSize="small" sx={{ color: 'primary.main' }} />
                      <Typography variant="overline" sx={{ color: 'primary.main' }}>
                        País
                      </Typography>
                    </Stack>
                    <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
                      <Typography component="span" sx={{ fontSize: 24, lineHeight: 1, mr: 0.75 }}>
                        {displayFlag}
                      </Typography>
                      {country}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>

              <Grid item xs={12} sm={6}>
                <motion.div variants={itemVariants}>
                  <Paper variant="outlined" sx={{ p: 2, height: '100%', bgcolor: 'background.default', borderColor: 'rgba(255,255,255,0.08)' }}>
                    <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1 }}>
                      <EmailIcon fontSize="small" sx={{ color: 'primary.main' }} />
                      <Typography variant="overline" sx={{ color: 'primary.main' }}>
                        E-mail
                      </Typography>
                    </Stack>
                    <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600, wordBreak: 'break-word' }}>
                      {email || '—'}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>

              <Grid item xs={12} sm={6}>
                <motion.div variants={itemVariants}>
                  <Paper variant="outlined" sx={{ p: 2, height: '100%', bgcolor: 'background.default', borderColor: 'rgba(255,255,255,0.08)' }}>
                    <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1 }}>
                      <PhoneIcon fontSize="small" sx={{ color: 'primary.main' }} />
                      <Typography variant="overline" sx={{ color: 'primary.main' }}>
                        Telefone
                      </Typography>
                    </Stack>
                    <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
                      {phone}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>

              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <Paper variant="outlined" sx={{ p: 2, height: '100%', bgcolor: 'background.default', borderColor: 'rgba(255,255,255,0.08)' }}>
                    <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1 }}>
                      <CalendarMonthIcon fontSize="small" sx={{ color: 'primary.main' }} />
                      <Typography variant="overline" sx={{ color: 'primary.main' }}>
                        Data do Contato
                      </Typography>
                    </Stack>
                    <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
                      {formatLeadDate(lead.dataAtual || lead.createdAt || lead.date)}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>

            <motion.div variants={itemVariants}>
              <Paper variant="outlined" sx={{ p: 2, mt: 2, bgcolor: 'background.default', borderColor: 'rgba(255,255,255,0.08)' }}>
                <Typography variant="overline" sx={{ color: 'primary.main', display: 'block', mb: 1 }}>
                  Demanda do Cliente
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', whiteSpace: 'pre-line' }}>
                  {lead.message || lead.mensagem || lead.demand || 'Sem demanda registrada.'}
                </Typography>
              </Paper>
            </motion.div>
          </motion.div>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2.5, gap: 1, flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          color="primary"
          href={mailtoHref}
          component={mailtoHref ? 'a' : 'button'}
          disabled={!mailtoHref}
          startIcon={<EmailIcon />}
        >
          Responder por E-mail
        </Button>

        <Button variant="text" onClick={onClose}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}