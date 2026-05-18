import React, { useState } from 'react';
import { Box, CircularProgress, Fab, Paper, Tab, Tabs } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useLanguage } from '../../i18n/LanguageContext';
import { EditorHomeForm } from '../../components/admin/EditorHomeForm.jsx';
import { EditorAboutForm } from '../../components/admin/EditorAboutForm.jsx';
import { EditorProductsForm } from '../../components/admin/EditorProductsForm.jsx';

export function EditorTabsSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);

    window.setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, pb: { xs: 14, sm: 16 }, position: 'relative' }}>
      <Paper
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          border: '1px solid rgba(212,175,55,0.1)',
          borderRadius: 2,
          overflow: 'hidden',
          mb: 4,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          textColor="primary"
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: '1px solid rgba(255,255,255,0.08)', px: 2 }}
        >
          <Tab label={t('admin.editor.tab.home')} />
          <Tab label={t('admin.editor.tab.about')} />
          <Tab label={t('admin.editor.tab.products')} />
        </Tabs>
      </Paper>

      <Box sx={{ maxWidth: 960, display: 'grid', gap: 3 }}>
        {activeTab === 0 ? <EditorHomeForm /> : null}
        {activeTab === 1 ? <EditorAboutForm /> : null}
        {activeTab === 2 ? <EditorProductsForm /> : null}
      </Box>

      <Fab
        variant="extended"
        color="primary"
        onClick={handleSave}
        disabled={isSaving}
        sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1300, px: 3 }}
      >
        {isSaving ? (
          <>
            <CircularProgress size={24} color="inherit" sx={{ mr: 1.5 }} />
            {t('admin.editor.saving')}
          </>
        ) : (
          <>
            <SaveIcon sx={{ mr: 1 }} />
            {t('admin.editor.save')}
          </>
        )}
      </Fab>
    </Box>
  );
}