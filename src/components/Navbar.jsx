import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaCaretDown, FaCaretUp, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState({
    profil: false,
    layanan: false,
    berita: false,
  });

  const handleNavigation = (path, section) => {
    setIsSidebarOpen(false);
    navigate(path);
    setTimeout(() => {
      const element = document.querySelector(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const isAdminPage = location.pathname.startsWith("/admin");
  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) return null;

  return (
    <nav className="bg-gray-100 text-gray-800 shadow-md sticky top-0 z-50">
      <div
        className={
          isAdminPage ? "mx-auto px-4 py-4" : "max-w-7xl mx-auto px-4 py-4"
        }
      >
        <div className="flex justify-between items-center">
          <Link
            to={isAdminPage ? "/admin" : "/"}
            className={`flex items-center hover:text-blue-400 transition duration-300 ${
              location.pathname.startsWith("/admin")
                ? "text-blue-400"
                : "text-gray-700"
            }`}
          >
            <img
              src="/assets/image/logo.png"
              alt="School Logo"
              className="h-12 w-auto"
            />
            <div>
              {isAdminPage ? (
                <div className="text-2xl font-bold text-gray-700 tracking-wide">
                  Admin Dashboard
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold text-gray-700 tracking-wide">
                    SMP NEGERI 1 TAMANSARI
                  </div>
                  <div className="text-[12px] text-gray-700 tracking-wide">
                    Jl. Merbabu No.13 Klaten, Jawa Tengah 57423
                  </div>
                </>
              )}
            </div>
          </Link>

          {/* Tombol untuk membuka sidebar di layar kecil */}
          {!isAdminPage && (
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden text-2xl text-gray-700 hover:text-blue-400 transition duration-300"
            >
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          )}

          {/* Menu Items untuk layar besar */}
          {!isAdminPage && (
            <div className="hidden md:flex space-x-8">
              <div className="group">
                <button
                  onClick={() => handleNavigation("/", "#home")}
                  className="block text-lg font-medium hover:text-blue-400 transition duration-300"
                >
                  Beranda
                </button>
              </div>

              {/* Profil Dropdown */}
              <div className="relative group">
                <button className="flex items-center text-lg font-medium hover:text-blue-400 transition duration-300">
                  Profil
                  {isDropdownOpen.profil ? (
                    <FaCaretUp />
                  ) : (
                    <FaCaretDown />
                  )}
                </button>
                <div className="absolute left-0 hidden space-y-2 bg-gray-100 text-gray-700 group-hover:block w-56 p-4 rounded-lg shadow-xl transition duration-300">
                  <button
                    onClick={() => handleNavigation("/profil", "#sambutan")}
                    className="block w-full text-left text-lg font-medium hover:text-blue-400 transition duration-300"
                  >
                    Sambutan
                  </button>
                  <button
                    onClick={() => handleNavigation("/profil", "#sejarah")}
                    className="block w-full text-left text-lg font-medium hover:text-blue-400 transition duration-300"
                  >
                    Sejarah
                  </button>
                  <button
                    onClick={() => handleNavigation("/profil", "#visi-misi")}
                    className="block w-full text-left text-lg font-medium hover:text-blue-400 transition duration-300"
                  >
                    Visi Misi
                  </button>
                  <button
                    onClick={() => handleNavigation("/profil", "#informasi")}
                    className="block w-full text-left text-lg font-medium hover:text-blue-400 transition duration-300"
                  >
                    Informasi Sekolah
                  </button>
                  <button
                    onClick={() => handleNavigation("/profil", "#struktur")}
                    className="block w-full text-left text-lg font-medium hover:text-blue-400 transition duration-300"
                  >
                    Struktur Organisasi
                  </button>
                  <button
                    onClick={() => handleNavigation("/profil", "#staff-guru")}
                    className="block w-full text-left text-lg font-medium hover:text-blue-400 transition duration-300"
                  >
                    Staff & Guru
                  </button>
                </div>
              </div>

              {/* Layanan Dropdown */}
              <div className="relative group">
                <button className="flex items-center text-lg font-medium hover:text-blue-400 transition duration-300">
                  Layanan
                  {isDropdownOpen.layanan ? (
                    <FaCaretUp />
                  ) : (
                    <FaCaretDown />
                  )}
                </button>
                <div className="absolute left-0 hidden space-y-2 bg-gray-100 text-gray-700 group-hover:block w-56 p-4 rounded-lg shadow-xl transition duration-300">
                  <button
                    onClick={() =>
                      handleNavigation("/layanan", "#ekstrakulikuler")
                    }
                    className="block w-full text-left text-lg font-medium hover:text-blue-400 transition duration-300"
                  >
                    Ekstrakurikuler
                  </button>
                  <button
                    onClick={() => handleNavigation("/layanan", "#galeri")}
                    className="block w-full text-left text-lg font-medium hover:text-blue-400 transition duration-300"
                  >
                    Galeri
                  </button>
                  <button
                    onClick={() => handleNavigation("/layanan", "#sarana")}
                    className="block w-full text-left text-lg font-medium hover:text-blue-400 transition duration-300"
                  >
                    Sarana Prasarana
                  </button>
                </div>
              </div>

              {/* Berita Dropdown */}
              <div className="relative group">
                <button className="flex items-center text-lg font-medium hover:text-blue-400 transition duration-300">
                  Berita
                  {isDropdownOpen.berita ? (
                    <FaCaretUp />
                  ) : (
                    <FaCaretDown />
                  )}
                </button>
                <div className="absolute left-0 hidden space-y-2 bg-gray-100 text-gray-700 group-hover:block w-56 p-4 rounded-lg shadow-xl transition duration-300">
                  <button
                    onClick={() => handleNavigation("/berita", "#berita")}
                    className="block w-full text-left text-lg font-medium hover:text-blue-400 transition duration-300"
                  >
                    Berita Terbaru
                  </button>
                  <button
                    onClick={() => handleNavigation("/berita", "#info")}
                    className="block w-full text-left text-lg font-medium hover:text-blue-400 transition duration-300"
                  >
                    Pengumuman
                  </button>
                </div>
              </div>

              <div className="group">
                <button
                  onClick={() => handleNavigation("/kontak", "#kontak")}
                  className="block text-lg font-medium hover:text-blue-400 transition duration-300"
                >
                  Kontak
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className={`md:hidden bg-gradient-to-b from-blue-500 to-blue-700 text-white w-[70%] max-w-sm h-screen fixed top-0 left-0 z-40 flex flex-col p-6 shadow-xl overflow-y-auto transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center">
          <img
            src="/assets/image/logo.png"
            alt="School Logo"
            className="h-12 w-auto"
          />
          <div className="text-left">
            <div className="text-lg font-bold tracking-wide">
              SMP NEGERI 1 TAMANSARI
            </div>
            <div className="text-[9px] tracking-wide">
              Karangkendal, Tamansari, Boyolali, Jawa Tengah 57331
            </div>
          </div>
        </div>
        {/* Menu Items */}
        <div className="mt-6">
          {/* Beranda */}
          <button
            onClick={() => handleNavigation("/", "#home")}
            className="flex items-center text-lg font-medium mb-4 hover:text-gray-200 transition duration-300"
          >
            Beranda
          </button>

          {/* Profil */}
          <div className="mb-4">
            <button
              onClick={() =>
                setIsDropdownOpen((prev) => ({ ...prev, profil: !prev.profil }))
              }
              className="flex justify-between items-center text-lg font-medium w-full hover:text-gray-200 transition duration-300"
            >
              Profil
              {isDropdownOpen.profil ? (
                <FaCaretUp />
              ) : (
                <FaCaretDown />
              )}
            </button>
            {isDropdownOpen.profil && (
              <div className="ml-6 mt-2 space-y-2">
                <button
                  onClick={() => handleNavigation("/profil", "#sambutan")}
                  className="block text-lg font-medium hover:text-gray-200 transition duration-300"
                >
                  Sambutan
                </button>
                <button
                  onClick={() => handleNavigation("/profil", "#sejarah")}
                  className="block text-lg font-medium hover:text-gray-200 transition duration-300"
                >
                  Sejarah
                </button>
                <button
                  onClick={() => handleNavigation("/profil", "#visi-misi")}
                  className="block text-lg font-medium hover:text-gray-200 transition duration-300"
                >
                  Visi Misi
                </button>
                <button
                  onClick={() => handleNavigation("/profil", "#informasi")}
                  className="block text-lg font-medium hover:text-gray-200 transition duration-300"
                >
                  Informasi Sekolah
                </button>
                <button
                  onClick={() => handleNavigation("/profil", "#struktur")}
                  className="block text-lg font-medium hover:text-gray-200 transition duration-300"
                >
                  Struktur Organisasi
                </button>
                <button
                  onClick={() => handleNavigation("/profil", "#staff-guru")}
                  className="block text-lg font-medium hover:text-gray-200 transition duration-300"
                >
                  Staff & Guru
                </button>
              </div>
            )}
          </div>

          {/* Layanan */}
          <div className="mb-4">
            <button
              onClick={() =>
                setIsDropdownOpen((prev) => ({
                  ...prev,
                  layanan: !prev.layanan,
                }))
              }
              className="flex justify-between items-center text-lg font-medium w-full hover:text-gray-200 transition duration-300"
            >
              Layanan
              {isDropdownOpen.layanan ? (
                <FaCaretUp />
              ) : (
                <FaCaretDown />
              )}
            </button>
            {isDropdownOpen.layanan && (
              <div className="ml-6 mt-2 space-y-2">
                <button
                  onClick={() =>
                    handleNavigation("/layanan", "#ekstrakulikuler")
                  }
                  className="block text-lg font-medium hover:text-gray-200 transition duration-300"
                >
                  Ekstrakurikuler
                </button>
                <button
                  onClick={() => handleNavigation("/layanan", "#galeri")}
                  className="block text-lg font-medium hover:text-gray-200 transition duration-300"
                >
                  Galeri
                </button>
                <button
                  onClick={() => handleNavigation("/layanan", "#sarana")}
                  className="block text-lg font-medium hover:text-gray-200 transition duration-300"
                >
                  Sarana Prasarana
                </button>
              </div>
            )}
          </div>

          {/* Berita */}
          <div className="mb-4">
            <button
              onClick={() =>
                setIsDropdownOpen((prev) => ({
                  ...prev,
                  berita: !prev.berita,
                }))
              }
              className="flex justify-between items-center text-lg font-medium w-full hover:text-gray-200 transition duration-300"
            >
              Berita
              {isDropdownOpen.berita ? (
                <FaCaretUp />
              ) : (
                <FaCaretDown />
              )}
            </button>
            {isDropdownOpen.berita && (
              <div className="ml-6 mt-2 space-y-2">
                <button
                  onClick={() => handleNavigation("/berita", "#berita")}
                  className="block text-lg font-medium hover:text-gray-200 transition duration-300"
                >
                  Berita Terbaru
                </button>
                <button
                  onClick={() => handleNavigation("/berita", "#info")}
                  className="block text-lg font-medium hover:text-gray-200 transition duration-300"
                >
                  Pengumuman
                </button>
              </div>
            )}
          </div>

          {/* Kontak */}
          <button
            onClick={() => handleNavigation("/kontak", "#kontak")}
            className="flex items-center text-lg font-medium font-medium mb-4 hover:text-gray-200 transition duration-300"
          >
            Kontak
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
