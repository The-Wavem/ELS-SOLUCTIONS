import React from 'react';
import { Avatar, Box, Chip, IconButton, Stack, TableCell, TableRow, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BadgeIcon from '@mui/icons-material/Badge';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useLanguage } from '../../i18n/LanguageContext';

const countryFlags = {
  'Brasil': '🇧🇷',
  'Emirados Árabes Unidos': '🇦🇪',
  'China': '🇨🇳',
  'Estados Unidos': '🇺🇸',
  'Arábia Saudita': '🇸🇦',
  'Catar': '🇶🇦',
  'Singapura': '🇸🇬',
  'Índia': '🇮🇳',
  'Japão': '🇯🇵',
  'Coreia do Sul': '🇰🇷',
  'Alemanha': '🇩🇪',
  'Reino Unido': '🇬🇧',
  'França': '🇫🇷',
  'Suíça': '🇨🇭',
  'Países Baixos': '🇳🇱',
  'Espanha': '🇪🇸',
  'Itália': '🇮🇹',
  'Argentina': '🇦🇷',
  'Chile': '🇨🇱',
  'México': '🇲🇽',
};

function getStatusChipProps(status, t) {
  switch (status) {
    case 'Novo':
    case 'New':
      return { label: t('admin.leads.status.new'), color: 'warning' };
    case 'Em tratativa':
    case 'Em Tratativa':
    case 'In progress':
      return { label: t('admin.leads.status.progress'), color: 'info' };
    case 'Fechado':
    case 'Closed':
      return { label: t('admin.leads.status.closed'), color: 'success' };
    default:
      return { label: t('admin.leads.status.unknown'), variant: 'outlined' };
  }
}

export function LeadTableRow({ lead, onClick }) {
  const { t } = useLanguage();
  const name = lead.nomeCompleto || lead.name || 'Contato sem nome';
  const email = lead.emailCorporativo || lead.email || '';
  const company = lead.empresa || lead.company || '—';
  const country = lead.paisOrigem || lead.country || '—';
  const countryFlag = countryFlags[country] || lead.flag || '🏳️';
  const title = lead.cargoTitulo || lead.role || '';

  return (
    <TableRow
      hover
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        '&:last-child td, &:last-child th': { border: 0 },
        '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' },
      }}
    >
      <TableCell sx={{ color: 'text.secondary', borderBottomColor: 'rgba(255,255,255,0.06)', whiteSpace: 'nowrap' }}>
        {lead.dataAtual || new Date().toLocaleString('pt-BR')}
      </TableCell>

      <TableCell sx={{ borderBottomColor: 'rgba(255,255,255,0.06)' }}>
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
          <Avatar sx={{ width: 40, height: 40, bgcolor: 'rgba(212,175,55,0.12)', color: 'primary.main' }}>
            {name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 700 }}>
              {name}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 0.5 }}>
              {title ? (
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, color: 'text.secondary' }}>
                  <BadgeIcon sx={{ fontSize: 14 }} />
                  <Typography variant="caption" sx={{ color: 'inherit' }}>{title}</Typography>
                </Box>
              ) : null}
              {email ? (
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, color: 'text.secondary' }}>
                  <EmailIcon sx={{ fontSize: 14 }} />
                  {lead.isPersonalEmail ? (
                    <WarningAmberIcon sx={{ color: 'warning.main', fontSize: 16 }} />
                  ) : null}
                  <Typography variant="caption" sx={{ color: 'inherit' }}>{email}</Typography>
                </Box>
              ) : null}
            </Box>
          </Box>
        </Stack>
      </TableCell>

      <TableCell sx={{ borderBottomColor: 'rgba(255,255,255,0.06)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BusinessIcon sx={{ fontSize: 18, color: 'primary.main', opacity: 0.9 }} />
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
            {company}
          </Typography>
        </Box>
      </TableCell>

      <TableCell sx={{ borderBottomColor: 'rgba(255,255,255,0.06)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography component="span" sx={{ fontSize: 18 }}>
            {countryFlag}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {country}
          </Typography>
        </Box>
      </TableCell>

      <TableCell sx={{ borderBottomColor: 'rgba(255,255,255,0.06)' }}>
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          <Chip {...getStatusChipProps(lead.status, t)} size="small" sx={{ fontWeight: 700 }} />
          {lead.isPersonalEmail ? (
            <Chip
              label={t('admin.leads.col.exception')}
              size="small"
              variant="outlined"
              sx={{ borderColor: 'rgba(255,255,255,0.16)', color: 'text.secondary' }}
            />
          ) : null}
        </Stack>
      </TableCell>

      <TableCell align="right" sx={{ borderBottomColor: 'rgba(255,255,255,0.06)' }}>
        <IconButton aria-label="Abrir ações do lead" size="small" sx={{ color: 'text.secondary' }}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}