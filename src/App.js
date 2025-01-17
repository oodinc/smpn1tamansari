import React from 'react';
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom'; 

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/kontak" element={<Kontak />} />

        <Route path="/berita/:id" element={<BeritaDetail />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Navigate to="/admin-hero" />} /> 

        <Route path="/admin-hero" element={<PrivateRoute><AdminLayout><HeroAdmin /></AdminLayout></PrivateRoute>} />
        <Route path="/admin-berita" element={<PrivateRoute><AdminLayout><BeritaAdmin /></AdminLayout></PrivateRoute>} />
        <Route path="/admin-ekskul" element={<PrivateRoute><AdminLayout><EkstrakurikulerAdmin /></AdminLayout></PrivateRoute>} />
        <Route path="/admin-kalender" element={<PrivateRoute><AdminLayout><KalenderAdmin /></AdminLayout></PrivateRoute>} />
        <Route path="/admin-alumni" element={<PrivateRoute><AdminLayout><AlumniAdmin /></AdminLayout></PrivateRoute>} />
        <Route path="/admin-sambutan" element={<PrivateRoute><AdminLayout><SambutanAdmin /></AdminLayout></PrivateRoute>} />
        <Route path="/admin-sejarah" element={<PrivateRoute><AdminLayout><SejarahAdmin /></AdminLayout></PrivateRoute>} />
        <Route path="/admin-visimisi" element={<PrivateRoute><AdminLayout><VisiMisiAdmin /></AdminLayout></PrivateRoute>} />
        <Route path="/admin-info" element={<PrivateRoute><AdminLayout><SchoolInfoAdmin /></AdminLayout></PrivateRoute>} />
        <Route path="/admin-struktur" element={<PrivateRoute><AdminLayout><StrukturOrganisasi /></AdminLayout></PrivateRoute>} />
        <Route path="/admin-staff" element={<PrivateRoute><AdminLayout><StaffAdmin /></AdminLayout></PrivateRoute>} />
        <Route path="/admin-galeri" element={<PrivateRoute><AdminLayout><GaleriAdmin /></AdminLayout></PrivateRoute>} />
        <Route path="/admin-sarana" element={<PrivateRoute><AdminLayout><SaranaAdmin /></AdminLayout></PrivateRoute>} />
        <Route path="/admin-pengumuman" element={<PrivateRoute><AdminLayout><PengumumanAdmin /></AdminLayout></PrivateRoute>} />
        <Route path="/admin-kontak" element={<PrivateRoute><AdminLayout><ContactAdmin /></AdminLayout></PrivateRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
