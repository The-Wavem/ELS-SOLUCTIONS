import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { LeadModal as ContactModal } from '@/components/ui/LeadModal';
import HeroSection from '@/sections/home/HeroSection';
import FeaturesSection from '@/sections/home/FeaturesSection';
import StatsSection from '@/sections/home/StatsSection';
import CtaSection from '@/sections/home/CtaSection';

export default function Home() {
  const outletContext = useOutletContext() || {};
  const openLeadModal = outletContext.openLeadModal;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenLeadModal = () => {
    if (typeof openLeadModal === 'function') {
      openLeadModal();
      return;
    }

    setIsModalOpen(true);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
      <HeroSection onOpenContact={handleOpenLeadModal} />
      <FeaturesSection />
      <StatsSection />
      <CtaSection onOpenContact={handleOpenLeadModal} />

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Box>
  );
}