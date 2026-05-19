import React, { useEffect, useMemo, useState } from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import { scaleLinear } from 'd3-scale';
import PublicIcon from '@mui/icons-material/Public';
import 'react-tooltip/dist/react-tooltip.css';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const fallbackAccesses = [
  { country: 'Brasil', value: 86 },
  { country: 'Emirados Árabes Unidos', value: 74 },
  { country: 'Estados Unidos', value: 62 },
  { country: 'China', value: 58 },
  { country: 'Reino Unido', value: 41 },
];

export function GlobalAccessMap() {
  const [accessData, setAccessData] = useState([]);
  const [tooltipData, setTooltipData] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('elc_analytics_accesses');

      if (!stored) {
        setAccessData(fallbackAccesses);
        return;
      }

      const parsed = JSON.parse(stored);

      if (!Array.isArray(parsed)) {
        setAccessData(fallbackAccesses);
        return;
      }

      const counts = parsed.reduce((acc, curr) => {
        const key = curr?.country;

        if (key) {
          acc[key] = (acc[key] || 0) + 1;
        }

        return acc;
      }, {});

      const entries = Object.entries(counts)
        .map(([country, value]) => ({ country, value }))
        .sort((left, right) => right.value - left.value)
        .slice(0, 5);

      setAccessData(entries.length > 0 ? entries : fallbackAccesses);
    } catch (error) {
      console.error('Failed to load access data', error);
      setAccessData(fallbackAccesses);
    }
  }, []);

  const maxAccesses = useMemo(() => {
    const values = accessData.map((item) => item.value);
    return Math.max(1, ...values);
  }, [accessData]);

  const colorScale = useMemo(() => {
    return scaleLinear().domain([1, maxAccesses]).range(['#4A3B12', '#D4AF37']);
  }, [maxAccesses]);

  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        bgcolor: 'background.paper',
        border: '1px solid rgba(212,175,55,0.1)',
        boxShadow: 'none',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Stack spacing={3} sx={{ p: 3, height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(212,175,55,0.1)',
              color: 'primary.main',
              flexShrink: 0,
            }}
          >
            <PublicIcon sx={{ fontSize: 20 }} />
          </Box>

          <Box>
            <Typography variant="h6" component="h3" sx={{ fontFamily: 'serif', color: 'text.primary' }}>
              Presença global
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Acessos distribuídos por mercado estratégico.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            position: 'relative',
            minHeight: 280,
            borderRadius: 2,
            border: '1px solid rgba(212,175,55,0.08)',
            bgcolor: '#1A1A1A',
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(212,175,55,0.12), transparent 22%), radial-gradient(circle at 80% 30%, rgba(212,175,55,0.08), transparent 18%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
            p: 1.5,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: 0.18,
              backgroundImage:
                'linear-gradient(rgba(212,175,55,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.14) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              pointerEvents: 'none',
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 120 }}
              style={{ width: '100%', height: '100%' }}
            >
              <ZoomableGroup center={[0, 20]} maxZoom={1}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const countryName = geo.properties.name;
                      const accesses = accessData.find((item) => item.country === countryName)?.value || 0;
                      const fillColor = accesses > 0 ? colorScale(accesses) : '#1A1A1A';

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          data-tooltip-id="global-map-tooltip"
                          data-tooltip-content={`${countryName} · ${accesses}`}
                          onMouseEnter={() => setTooltipData({ name: countryName, accesses })}
                          onMouseLeave={() => setTooltipData(null)}
                          style={{
                            default: {
                              fill: fillColor,
                              stroke: '#050505',
                              strokeWidth: 0.5,
                              outline: 'none',
                              transition: 'all 250ms',
                            },
                            hover: {
                              fill: '#FFF5D1',
                              stroke: '#050505',
                              strokeWidth: 0.5,
                              outline: 'none',
                              transition: 'all 250ms',
                              cursor: 'pointer',
                            },
                            pressed: {
                              fill: '#FFF5D1',
                              stroke: '#050505',
                              strokeWidth: 0.5,
                              outline: 'none',
                            },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          </Box>
        </Box>

        {accessData.length > 0 ? (
          <Box
            sx={{
              alignSelf: 'flex-start',
              bgcolor: '#0A0A0A',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: 2,
              px: 2,
              py: 1.5,
              boxShadow: '0 12px 36px rgba(0,0,0,0.35)',
            }}
          >
            <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
              Volume de acessos
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mt: 1 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Menor
              </Typography>
              <Box
                sx={{
                  width: 96,
                  height: 10,
                  borderRadius: 999,
                  background: 'linear-gradient(90deg, #4A3B12 0%, #D4AF37 100%)',
                }}
              />
              <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 700 }}>
                Maior
              </Typography>
            </Box>
          </Box>
        ) : null}
      </Stack>

      <Tooltip
        id="global-map-tooltip"
        isOpen={tooltipData !== null}
        place="top"
        opacity={1}
        border="1px solid rgba(212,175,55,0.2)"
        style={{
          backgroundColor: '#0A0A0A',
          borderRadius: '8px',
          padding: '8px 12px',
          color: '#F5F5F5',
          zIndex: 1000,
        }}
      >
        {tooltipData ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25, alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 700 }}>
              {tooltipData.name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600 }}>
              Acessos Únicos: {tooltipData.accesses}
            </Typography>
          </Box>
        ) : null}
      </Tooltip>
    </Paper>
  );
}