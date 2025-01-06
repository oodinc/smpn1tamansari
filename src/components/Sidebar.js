import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaUsers,
  FaBook,
  FaSitemap,
  FaInfoCircle,
  FaSchool,
  FaChalkboardTeacher,
  FaFutbol,
  FaImages,
  FaWarehouse,
  FaBullhorn,
  FaEnvelope,
} from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";

const Sidebar = () => {
  const location = useLocation(); // Mengambil lokasi path saat ini

  // Fungsi untuk menambahkan kelas aktif ke link yang sesuai
  const getLinkClass = (path) => {
    return location.pathname.startsWith(path)
      ? "flex items-center py-2 px-4 rounded-lg bg-gray-500 text-white" // Active state with gray background
      : "flex items-center py-2 px-4 rounded-lg hover:bg-gray-400 text-gray-800 hover:text-white transition-all";
  };

  return (
    <div className="w-64 bg-gray-100 text-gray-700 min-h-screen p-6">
      <ul>
        {/* Beranda Links */}
        <li>
          <Link to="/admin-hero" className={getLinkClass("/admin-hero")}>
            <FaHome className="mr-3" /> Hero Section
          </Link>
        </li>
        <li>
          <Link
            to="/admin-kalender"
            className={getLinkClass("/admin-kalender")}
          >
            <FaCalendarAlt className="mr-3" /> Kalender
          </Link>
        </li>
        <li>
          <Link to="/admin-alumni" className={getLinkClass("/admin-alumni")}>
            <FaUsers className="mr-3" /> Alumni
          </Link>
        </li>

        <hr className="my-4 border-gray-300" />

        {/* Profil Links */}
        <li>
          <Link
            to="/admin-sambutan"
            className={getLinkClass("/admin-sambutan")}
          >
            <IoIosPerson className="mr-3" /> Sambutan
          </Link>
        </li>
        <li>
          <Link to="/admin-sejarah" className={getLinkClass("/admin-sejarah")}>
            <FaBook className="mr-3" /> Sejarah
          </Link>
        </li>
        <li>
          <Link
            to="/admin-visimisi"
            className={getLinkClass("/admin-visimisi")}
          >
            <FaInfoCircle className="mr-3" /> Visi & Misi
          </Link>
        </li>
        <li>
          <Link to="/admin-info" className={getLinkClass("/admin-info")}>
            <FaSchool className="mr-3" /> Info Sekolah
          </Link>
        </li>
        <li>
          <Link
            to="/admin-struktur"
            className={getLinkClass("/admin-struktur")}
          >
            <FaSitemap className="mr-3" /> Struktur
          </Link>
        </li>
        <li>
          <Link to="/admin-staff" className={getLinkClass("/admin-staff")}>
            <FaChalkboardTeacher className="mr-3" /> Staff
          </Link>
        </li>

        <hr className="my-4 border-gray-300" />

        {/* Layanan Links */}
        <li>
          <Link to="/admin-ekskul" className={getLinkClass("/admin-ekskul")}>
            <FaFutbol className="mr-3" /> Ekstrakurikuler
          </Link>
        </li>
        <li>
          <Link to="/admin-galeri" className={getLinkClass("/admin-galeri")}>
            <FaImages className="mr-3" /> Galeri
          </Link>
        </li>
        <li>
          <Link to="/admin-sarana" className={getLinkClass("/admin-sarana")}>
            <FaWarehouse className="mr-3" /> Sarana Prasarana
          </Link>
        </li>

        <hr className="my-4 border-gray-300" />

        {/* Berita Links */}
        <li>
          <Link to="/admin-berita" className={getLinkClass("/admin-berita")}>
            <FaBook className="mr-3" /> Berita
          </Link>
        </li>
        <li>
          <Link
            to="/admin-pengumuman"
            className={getLinkClass("/admin-pengumuman")}
          >
            <FaBullhorn className="mr-3" /> Pengumuman
          </Link>
        </li>

        <hr className="my-4 border-gray-300" />

        <li>
          <Link to="/admin-kontak" className={getLinkClass("/admin-kontak")}>
            <FaEnvelope className="mr-3" /> Kontak
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
