import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path, section) => {
    navigate(path); // Pindah ke halaman yang dimaksud
    setTimeout(() => {
      const element = document.querySelector(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100); // Tambahkan jeda untuk memastikan halaman dimuat
  };

  const isAdminPage = location.pathname.startsWith("/admin");
  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) return null;
  return (
    <nav className="bg-gray-100 text-gray-800 shadow-md sticky top-0 z-50">
      {/* Sticky Navbar */}
      <div className={isAdminPage ? "mx-auto px-4 py-4" : "max-w-7xl mx-auto px-4 py-4"}>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link
              to={isAdminPage ? "/admin" : "/"} // Jika di halaman admin, link akan menjadi /admin-hero
              className={`flex items-center hover:text-blue-400 transition duration-300 ${
                location.pathname.startsWith("/admin")
                  ? "text-blue-400"
                  : "text-gray-700"
              }`}
            >
              {/* Logo */}
              <img
                src="/assets/image/logo.png"
                alt="School Logo"
                className="h-12 w-auto"
              />

              <div>
                {isAdminPage ? (
                  // Menampilkan "Admin Dashboard" jika berada di halaman admin
                  <div className="text-2xl font-bold text-gray-700 tracking-wide">
                    Admin Dashboard
                  </div>
                ) : (
                  // Menampilkan nama sekolah jika bukan halaman admin
                  <>
                    <div className="text-2xl font-bold text-gray-700 tracking-wide">
                      SMP NEGERI 1 TAMANSARI
                    </div>
                    <div className="text-[12px] text-gray-700 tracking-wide">
                      Karangkendal, Tamansari,  Boyolali, Jawa Tengah
                    </div>
                  </>
                )}
              </div>
            </Link>
          </div>

          {/* Hanya tampilkan menu items jika bukan halaman admin */}
          {/* Menu Items */}
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
                  <FaCaretDown className="ml-2" />
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
                  </button>{" "}
                </div>
              </div>

              {/* Layanan Dropdown */}
              <div className="relative group">
                <button className="flex items-center text-lg font-medium hover:text-blue-400 transition duration-300">
                  Layanan
                  <FaCaretDown className="ml-2" />
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
                  <FaCaretDown className="ml-2" />
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
    </nav>
  );
};

export default Navbar;
