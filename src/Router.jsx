import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@pages/public/Home.jsx";
import { Dashboard } from "@pages/admin/Dashboard.jsx";
import { SiteEditor } from "@pages/admin/SiteEditor.jsx";
import { Leads } from "@pages/admin/Leads.jsx";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/editor" element={<SiteEditor />} />
      <Route path="/admin/leads" element={<Leads />} />
    </Routes>
  );
}
