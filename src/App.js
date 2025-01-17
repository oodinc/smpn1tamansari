import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom'; 

import LoadingSpinner from './components/LoadingSpinner';

import Navbar from './components/Navbar'; 
import Home from './components/Home'; 
import Profil from './components/Profil'; 
import Layanan from './components/Layanan'; 
import Berita from './components/Berita';
import Kontak from './components/Kontak';

import AdminLayout from './components/admin/AdminLayout';

import HeroAdmin from "./components/admin/HeroAdmin";
import BeritaAdmin from "./components/admin/BeritaAdmin";
import EkstrakurikulerAdmin from "./components/admin/EkstrakurikulerAdmin";
import KalenderAdmin from './components/admin/KalenderAdmin';
import AlumniAdmin from "./components/admin/AlumniAdmin";

import BeritaDetail from './components/BeritaDetail';

import SambutanAdmin from './components/admin/SambutanAdmin';
import SejarahAdmin from './components/admin/SejarahAdmin';
import VisiMisiAdmin from './components/admin/VisiMisiAdmin';
import SchoolInfoAdmin from './components/admin/SchoolInfoAdmin';
import StrukturOrganisasi from './components/admin/OrganizationalStructureAdmin';
import StaffAdmin from './components/admin/StaffAdmin';

import GaleriAdmin from './components/admin/GaleriAdmin';
import SaranaAdmin from './components/admin/SaranaAdmin';

import PengumumanAdmin from './components/admin/PengumumanAdmin';
import ContactAdmin from './components/admin/ContactAdmin';

import PrivateRoute from './components/admin/PrivateRoute';
import Login from './components/admin/Login';

function App() {
  return (
    <BrowserRouter> 
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/kontak" element={<Kontak />} />

        <Route path="/berita/:id" element={<BeritaDetail />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Navigate to="/admin-hero" />} /> 

        <Route path="/admin-hero" element={<AdminLayout><HeroAdmin /></AdminLayout>} />
        <Route path="/admin-berita" element={<AdminLayout><BeritaAdmin /></AdminLayout>} />
        <Route path="/admin-ekskul" element={<AdminLayout><EkstrakurikulerAdmin /></AdminLayout>} />
        <Route path="/admin-kalender" element={<AdminLayout><KalenderAdmin /></AdminLayout>} />
        <Route path="/admin-alumni" element={<AdminLayout><AlumniAdmin /></AdminLayout>} />
        <Route path="/admin-sambutan" element={<AdminLayout><SambutanAdmin /></AdminLayout>} />
        <Route path="/admin-sejarah" element={<AdminLayout><SejarahAdmin /></AdminLayout>} />
        <Route path="/admin-visimisi" element={<AdminLayout><VisiMisiAdmin /></AdminLayout>} />
        <Route path="/admin-info" element={<AdminLayout><SchoolInfoAdmin /></AdminLayout>} />
        <Route path="/admin-struktur" element={<AdminLayout><StrukturOrganisasi /></AdminLayout>} />
        <Route path="/admin-staff" element={<AdminLayout><StaffAdmin /></AdminLayout>} />
        <Route path="/admin-galeri" element={<AdminLayout><GaleriAdmin /></AdminLayout>} />
        <Route path="/admin-sarana" element={<AdminLayout><SaranaAdmin /></AdminLayout>} />
        <Route path="/admin-pengumuman" element={<AdminLayout><PengumumanAdmin /></AdminLayout>} />
        <Route path="/admin-kontak" element={<AdminLayout><ContactAdmin /></AdminLayout>} />

      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
