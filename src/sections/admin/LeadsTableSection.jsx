import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  Tab,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PublicIcon from '@mui/icons-material/Public';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useLanguage } from '../../i18n/LanguageContext';
import { LeadTableRow } from '../../components/admin/LeadTableRow.jsx';
import { LeadDetailModal } from '../../components/admin/LeadDetailModal.jsx';

const demoLeads = [
  {
    id: 1,
    dataAtual: '18/05/2026 09:30',
    date: '18/05/2026 09:30',
    name: 'Ahmed Al-Fayed',
    nomeCompleto: 'Ahmed Al-Fayed',
    role: 'Procurement Director',
    cargoTitulo: 'Procurement Director',
    email: 'ahmed@desertfoods.ae',
    emailCorporativo: 'ahmed@desertfoods.ae',
    company: 'Desert Foods Trading',
    empresa: 'Desert Foods Trading',
    country: 'Emirados Árabes Unidos',
    paisOrigem: 'Emirados Árabes Unidos',
    status: 'Novo',
    isPersonalEmail: false,
  },
  {
    id: 2,
    dataAtual: '18/05/2026 11:12',
    date: '18/05/2026 11:12',
    name: 'Chen Wei',
    nomeCompleto: 'Chen Wei',
    role: 'Head of Sourcing',
    cargoTitulo: 'Head of Sourcing',
    email: 'chen.wei@sinograin.cn',
    emailCorporativo: 'chen.wei@sinograin.cn',
    company: 'SinoGrain Holdings',
    empresa: 'SinoGrain Holdings',
    country: 'China',
    paisOrigem: 'China',
    status: 'Em tratativa',
    isPersonalEmail: false,
  },
  {
    id: 3,
    dataAtual: '17/05/2026 16:48',
    date: '17/05/2026 16:48',
    name: 'Carlos Mendes',
    nomeCompleto: 'Carlos Mendes',
    role: 'Comercial Externo',
    cargoTitulo: 'Comercial Externo',
    email: 'carlos.mendes@brfoods.com.br',
    emailCorporativo: 'carlos.mendes@brfoods.com.br',
    company: 'BR Foods Global',
    empresa: 'BR Foods Global',
    country: 'Brasil',
    paisOrigem: 'Brasil',
    status: 'Fechado',
    isPersonalEmail: true,
  },
];

function normalizeLead(lead, index) {
  const fallbackDate = lead.date || lead.dataAtual || lead.createdAt || new Date().toISOString();

  return {
    id: lead.id ?? `stored-${index}`,
    date: fallbackDate,
    dataAtual: lead.dataAtual || fallbackDate,
    name: lead.name || lead.nomeCompleto || 'Contato sem nome',
    nomeCompleto: lead.nomeCompleto || lead.name || 'Contato sem nome',
    role: lead.role || lead.cargoTitulo || '',
    cargoTitulo: lead.cargoTitulo || lead.role || '',
    email: lead.email || lead.emailCorporativo || '',
    emailCorporativo: lead.emailCorporativo || lead.email || '',
    company: lead.company || lead.empresa || '',
    empresa: lead.empresa || lead.company || '',
    country: lead.country || lead.paisOrigem || '',
    paisOrigem: lead.paisOrigem || lead.country || '',
    status: lead.status || 'Novo',
    isPersonalEmail: Boolean(lead.isPersonalEmail),
    message: lead.message || lead.mensagem || lead.demand || '',
  };
}

function parseLeadDate(value) {
  if (!value) {
    return null;
  }

  if (dayjs.isDayjs(value)) {
    return value;
  }

  if (value instanceof Date) {
    const parsed = dayjs(value);
    return parsed.isValid() ? parsed : null;
  }

  if (typeof value === 'string') {
    const directParse = dayjs(value);

    if (directParse.isValid()) {
      return directParse;
    }

    const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{2}):(\d{2}))?$/);

    if (match) {
      const [, day, month, year, hours = '00', minutes = '00'] = match;
      const parsed = dayjs(new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes)));
      return parsed.isValid() ? parsed : null;
    }
  }

  const fallback = dayjs(new Date(value));
  return fallback.isValid() ? fallback : null;
}

export function LeadsTableSection() {
  const { t } = useLanguage();
  const [leads, setLeads] = useState(() => demoLeads.map((lead, index) => normalizeLead(lead, index)));
  const [filter, setFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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

      const normalizedLeads = parsedLeads.map((lead, index) => normalizeLead(lead, index));

      setLeads([...normalizedLeads, ...demoLeads]);
    } catch (error) {
      console.error('Falha ao carregar leads locais', error);
    }
  }, []);

  useEffect(() => {
    setPage(0);
  }, [filter, searchQuery, selectedCountry, startDate, endDate]);

  const totalLeads = useMemo(() => leads.length, [leads]);
  const availableCountries = useMemo(() => {
    return Array.from(new Set(leads.map((lead) => lead.country || lead.paisOrigem).filter(Boolean))).sort((firstCountry, secondCountry) =>
      firstCountry.localeCompare(secondCountry, 'pt-BR')
    );
  }, [leads]);

  const filteredLeads = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return leads.filter((lead) => {
      const matchesTabFilter =
        filter === 'all' ||
        (filter === 'qualified' && !lead.isPersonalEmail) ||
        (filter === 'suspicious' && Boolean(lead.isPersonalEmail));

      if (!matchesTabFilter) {
        return false;
      }

      if (normalizedQuery) {
        const haystack = [lead.name, lead.company, lead.email, lead.role]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        if (!haystack.includes(normalizedQuery)) {
          return false;
        }
      }

      if (selectedCountry && selectedCountry !== 'all') {
        const leadCountry = lead.country || lead.paisOrigem || '';
        if (leadCountry !== selectedCountry) {
          return false;
        }
      }

      if (startDate || endDate) {
        const leadDate = parseLeadDate(lead.date || lead.dataAtual || lead.createdAt);

        if (!leadDate) {
          return false;
        }

        if (startDate) {
          const inclusiveStart = leadDate.isSame(startDate, 'day') || leadDate.isAfter(startDate, 'day');
          if (!inclusiveStart) {
            return false;
          }
        }

        if (endDate) {
          const inclusiveEnd = leadDate.isSame(endDate, 'day') || leadDate.isBefore(endDate, 'day');
          if (!inclusiveEnd) {
            return false;
          }
        }
      }

      return true;
    });
  }, [filter, leads, searchQuery, selectedCountry, startDate, endDate]);

  const paginatedLeads = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredLeads.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredLeads, page, rowsPerPage]);

  const handleChangePage = (_, nextPage) => {
    setPage(nextPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCountry('');
    setStartDate(null);
    setEndDate(null);
    setPage(0);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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

            <Box sx={{ px: 3, pt: 2, pb: 1 }}>
              <Tabs
                value={filter}
                onChange={(_, newValue) => setFilter(newValue)}
                textColor="primary"
                indicatorColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  minHeight: 44,
                  '& .MuiTab-root': {
                    minHeight: 44,
                    textTransform: 'none',
                    fontWeight: 700,
                  },
                }}
              >
                <Tab value="all" label="Todos os Contatos" />
                <Tab value="qualified" label="Empresas Qualificadas" />
                <Tab
                  value="suspicious"
                  icon={<WarningAmberIcon fontSize="small" />}
                  iconPosition="start"
                  label="Análise de Risco"
                />
              </Tabs>
            </Box>

            <Box
              sx={{
                p: 2,
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                alignItems: 'center',
                bgcolor: 'background.paper',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <TextField
                size="small"
                fullWidth
                placeholder="Buscar nome, empresa, cargo..."
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setPage(0);
                }}
                sx={{ minWidth: { xs: '100%', md: 280 }, flex: '1 1 280px' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />

              <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 220 }, flex: '0 1 220px' }}>
                <InputLabel id="country-filter-label">País</InputLabel>
                <Select
                  labelId="country-filter-label"
                  label="País"
                  value={selectedCountry}
                    displayEmpty
                    renderValue={(selected) => selected || 'Todos os Países'}
                  onChange={(event) => {
                    setSelectedCountry(event.target.value);
                    setPage(0);
                  }}
                >
                  <MenuItem value="">
                    <em>Todos os Países</em>
                  </MenuItem>
                  {availableCountries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <DatePicker
                label="Início"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                  setPage(0);
                }}
                slotProps={{
                  textField: {
                    size: 'small',
                    sx: { minWidth: { xs: '100%', sm: 170 }, flex: '0 1 170px' },
                  },
                }}
              />

              <DatePicker
                label="Fim"
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                  setPage(0);
                }}
                slotProps={{
                  textField: {
                    size: 'small',
                    sx: { minWidth: { xs: '100%', sm: 170 }, flex: '0 1 170px' },
                  },
                }}
              />

              <Button
                variant="text"
                onClick={handleClearFilters}
                sx={{ whiteSpace: 'nowrap', ml: 'auto' }}
              >
                Limpar Filtros
              </Button>
            </Box>

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
                  {paginatedLeads.length > 0 ? (
                    paginatedLeads.map((lead) => (
                      <LeadTableRow
                        key={lead.id}
                        lead={lead}
                        onClick={() => setSelectedLead(lead)}
                      />
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 5, color: 'text.secondary' }}>
                        Nenhum lead encontrado com os filtros aplicados.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={filteredLeads.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              labelRowsPerPage="Linhas por página:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`}
              sx={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            />
          </CardContent>
        </Card>

        <LeadDetailModal
          open={Boolean(selectedLead)}
          onClose={() => setSelectedLead(null)}
          lead={selectedLead}
        />
      </Box>
    </LocalizationProvider>
  );
}