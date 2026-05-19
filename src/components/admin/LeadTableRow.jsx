import React from 'react';
import { Avatar, Box, IconButton, Stack, TableCell, TableRow, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BadgeIcon from '@mui/icons-material/Badge';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { motion } from 'framer-motion';

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

export function LeadTableRow({ lead, onClick }) {
  const name = lead.nomeCompleto || lead.name || 'Contato sem nome';
  const email = lead.emailCorporativo || lead.email || '';
  const company = lead.empresa || lead.company || '—';
  const country = lead.paisOrigem || lead.country || '—';
  const displayFlag = lead.flag || flagMap[lead.country] || '🌐';
  const title = lead.cargoTitulo || lead.role || '';

  return (
    <TableRow
      component={motion.tr}
      hover
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
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
            {displayFlag}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {country}
          </Typography>
        </Box>
      </TableCell>

      <TableCell align="right" sx={{ borderBottomColor: 'rgba(255,255,255,0.06)' }}>
        <IconButton aria-label="Abrir ações do lead" size="small" sx={{ color: 'text.secondary' }}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}