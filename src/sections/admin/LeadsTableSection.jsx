import React, { useEffect, useMemo, useState } from 'react';
import { Box, Card, CardContent, Chip, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import { useLanguage } from '../../i18n/LanguageContext';
import { LeadTableRow } from '../../components/admin/LeadTableRow.jsx';

const demoLeads = [
  {
    id: 1,
    dataAtual: '18/05/2026 09:30',
    nomeCompleto: 'Ahmed Al-Fayed',
    cargoTitulo: 'Procurement Director',
    emailCorporativo: 'ahmed@desertfoods.ae',
    empresa: 'Desert Foods Trading',
    paisOrigem: 'Emirados Árabes Unidos',
    status: 'Novo',
    isPersonalEmail: false,
  },
  {
    id: 2,
    dataAtual: '18/05/2026 11:12',
    nomeCompleto: 'Chen Wei',
    cargoTitulo: 'Head of Sourcing',
    emailCorporativo: 'chen.wei@sinograin.cn',
    empresa: 'SinoGrain Holdings',
    paisOrigem: 'China',
    status: 'Em tratativa',
    isPersonalEmail: false,
  },
  {
    id: 3,
    dataAtual: '17/05/2026 16:48',
    nomeCompleto: 'Carlos Mendes',
    cargoTitulo: 'Comercial Externo',
    emailCorporativo: 'carlos.mendes@brfoods.com.br',
    empresa: 'BR Foods Global',
    paisOrigem: 'Brasil',
    status: 'Fechado',
    isPersonalEmail: true,
  },
];

export function LeadsTableSection() {
  const { t } = useLanguage();
  const [leads, setLeads] = useState(demoLeads);

  useEffect(() => {
    try {
      const rawLeads = window.localStorage.getItem('elc_leads');

      if (!rawLeads) {
        return;
      }

      const parsedLeads = JSON.parse(rawLeads);

      if (!Array.isArray(parsedLeads)) {
        return;
      }

      const normalizedLeads = parsedLeads.map((lead, index) => ({
        id: lead.id ?? `stored-${index}`,
        dataAtual: lead.dataAtual || lead.createdAt || new Date().toLocaleString('pt-BR'),
        nomeCompleto: lead.nomeCompleto || lead.nome || 'Contato sem nome',
        cargoTitulo: lead.cargoTitulo || lead.cargo || '',
        emailCorporativo: lead.emailCorporativo || lead.email || '',
        empresa: lead.empresa || '',
        paisOrigem: lead.paisOrigem || '',
        status: lead.status || 'Novo',
        isPersonalEmail: Boolean(lead.isPersonalEmail),
      }));

      setLeads([...normalizedLeads, ...demoLeads]);
    } catch (error) {
      console.error('Falha ao carregar leads locais', error);
    }
  }, []);

  const totalLeads = useMemo(() => leads.length, [leads]);

  return (
    <Box sx={{ p: 0, maxWidth: '100%' }}>
      <Box component="header" sx={{ mb: { xs: 3, sm: 4 } }}>
        <Typography variant="h4" component="h1" sx={{ fontFamily: 'serif', color: 'text.primary', mb: 1 }}>
          {t('admin.leads.title')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('admin.leads.subtitle')}
        </Typography>
      </Box>

      <Card sx={{ bgcolor: 'background.paper', border: '1px solid rgba(212,175,55,0.1)', boxShadow: 'none', borderRadius: 2 }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ px: 3, py: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
            <Box>
              <Typography variant="h6" component="h2" sx={{ fontFamily: 'serif', color: 'text.primary' }}>
                {t('admin.leads.title')}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                {totalLeads} {t('admin.leads.total')}
              </Typography>
            </Box>

            <Chip
              icon={<PublicIcon />}
              label={t('admin.leads.legend.personalEmail')}
              variant="outlined"
              sx={{ borderColor: 'rgba(212,175,55,0.25)', color: 'text.secondary' }}
            />
          </Box>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

          <TableContainer component={Paper} sx={{ bgcolor: 'background.paper', boxShadow: 'none' }}>
            <Table sx={{ minWidth: 980 }} aria-label="tabela de leads">
              <TableHead>
                <TableRow sx={{ bgcolor: 'rgba(5,5,5,0.45)' }}>
                  <TableCell sx={{ color: 'text.secondary', borderBottomColor: 'rgba(255,255,255,0.06)' }}>{t('admin.leads.col.date')}</TableCell>
                  <TableCell sx={{ color: 'text.secondary', borderBottomColor: 'rgba(255,255,255,0.06)' }}>{t('admin.leads.col.contact')}</TableCell>
                  <TableCell sx={{ color: 'text.secondary', borderBottomColor: 'rgba(255,255,255,0.06)' }}>{t('admin.leads.col.company')}</TableCell>
                  <TableCell sx={{ color: 'text.secondary', borderBottomColor: 'rgba(255,255,255,0.06)' }}>{t('admin.leads.col.country')}</TableCell>
                  <TableCell sx={{ color: 'text.secondary', borderBottomColor: 'rgba(255,255,255,0.06)' }}>{t('admin.leads.col.status')}</TableCell>
                  <TableCell align="right" sx={{ color: 'text.secondary', borderBottomColor: 'rgba(255,255,255,0.06)' }}>{t('admin.leads.col.actions')}</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {leads.map((lead) => (
                  <LeadTableRow key={lead.id} lead={lead} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}