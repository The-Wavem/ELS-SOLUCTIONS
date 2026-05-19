import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@pages/public/Home.jsx";
import { Dashboard } from "@pages/admin/Dashboard.jsx";
import { SiteEditor } from "@pages/admin/SiteEditor.jsx";
import { Leads } from "@pages/admin/Leads.jsx";
import { AdminLayout } from "@components/layout/AdminLayout.jsx";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="editor" element={<SiteEditor />} />
        <Route path="leads" element={<Leads />} />
      </Route>
    </Routes>
  );
}
