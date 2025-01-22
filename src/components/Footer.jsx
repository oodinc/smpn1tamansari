import React from "react";
import { FaYoutube, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  // Check if the current page is the admin page
  const isAdminPage = location.pathname.startsWith("/admin");
  const isLoginPage = location.pathname === "/login";
  
  if (isAdminPage || isLoginPage) return null;
  
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Bagian Logo dan Alamat */}
        <div>
          <div className="flex items-center">
            <img
              src="/assets/image/logo.png"
              alt="SMP NEGERI 1 TAMANSARI"
              className="h-12 w-auto mr-3"
            />
            <p className="text-xl font-bold">SMPN 1 TAMANSARI SATU ATAP</p>
          </div>
          <p className="mt-4 text-sm flex items-center">
            <FaMapMarkerAlt className="mr-2" />
            Karangkendal, Tamansari, Boyolali, Jawa Tengah 57331
          </p>
          <p className="mt-2 text-sm flex items-center">
            <FaEnvelope className="mr-2" />
            satap.musuk@yahoo.co.id
          </p>
        </div>

        {/* Bagian Tautan Cepat */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Tautan Cepat</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="hover:text-gray-300 transition duration-300"
              >
                Beranda
              </a>
            </li>
            <li>
              <a
                href="/profil"
                className="hover:text-gray-300 transition duration-300"
              >
                Profil
              </a>
            </li>
            <li>
              <a
                href="/layanan"
                className="hover:text-gray-300 transition duration-300"
              >
                Layanan
              </a>
            </li>
            <li>
              <a
                href="/berita"
                className="hover:text-gray-300 transition duration-300"
              >
                Berita
              </a>
            </li>
            <li>
              <a
                href="/kontak"
                className="hover:text-gray-300 transition duration-300"
              >
                Kontak
              </a>
            </li>
          </ul>
        </div>

        {/* Bagian Media Sosial */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Ikuti Kami</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.youtube.com/@negsarijaya"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-gray-300 transition duration-300"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Garis Dekoratif dan Hak Cipta */}
      <div className="mt-8">
        <div className="border-t border-gray-500 pt-4">
          <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} SMP Negeri 1 Tamansari Satu Atap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
