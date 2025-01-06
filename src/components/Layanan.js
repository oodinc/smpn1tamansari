import React, {useEffect, useState} from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Layanan = () => {
  const [extracurriculars, setExtracurriculars] = useState([]);
  const [galeri, setGaleri] = useState([]);
  const [sarana, setSarana] = useState([]);

  useEffect(() => {
    const fetchExtracurriculars = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/ekstrakurikuler"
        );
        setExtracurriculars(response.data);
      } catch (error) {
        console.error("Error fetching extracurriculars:", error);
      }
    };

    const fetchGaleri = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/galeri");
        setGaleri(response.data); // Update state with fetched galeri data
      } catch (error) {
        console.error("Error fetching galeri:", error);
      }
    };

    const fetchSarana = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/sarana");
        setSarana(response.data);
      } catch (error) {
        console.error("Error fetching sarana:", error);
      }
    };

    fetchExtracurriculars();
    fetchGaleri();
    fetchSarana();
  });
  return (
    <div>
      {/* Ekstrakurikuler Section */}
      <div id="ekstrakulikuler" className="bg-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <section className="mb-16">
            <h2 className="text-4xl font-semibold text-center mb-10 text-gray-800">
              Ekstrakurikuler
            </h2>
            <p className="text-lg text-center text-gray-700">
              SMPN 1 Tamansari menyediakan berbagai ekstrakurikuler yang bertujuan untuk mengembangkan minat dan bakat siswa. Beberapa ekstrakurikuler yang tersedia antara lain:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {extracurriculars.map((ekstra, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition duration-300"
                >
                  <div className="relative w-full h-48 mb-4">
                    <img
                      src={ekstra.image}
                      alt={ekstra.name}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                  <h3 className="font-bold text-2xl text-center">{ekstra.name}</h3>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Galeri Section */}
      <div id="galeri" className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <section className="mb-16">
            <h2 className="text-4xl font-semibold text-center mb-10 text-gray-800">
              Galeri
            </h2>
            <p className="text-lg text-center text-gray-700 mb-8">
              Berikut adalah beberapa foto kegiatan di SMPN 1 Tamansari yang memperlihatkan suasana dan kegiatan di sekolah kami.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {galeri.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="relative group bg-white p-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition duration-300"
                >
                  <div className="relative w-full h-48 mb-4">
                    <img
                      src={item.image}
                      alt={`Galeri ${index + 1}`}
                      className="object-cover w-full h-full rounded-lg"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>

                    {/* Text on hover */}
                    <div className="absolute bottom-4 left-4 text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span>{item.title}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Sarana Prasarana Section */}
      <div id="sarana" className="bg-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <section className="mb-16">
            <h2 className="text-4xl font-semibold text-center mb-10 text-gray-800">
              Sarana dan Prasarana
            </h2>
            <p className="text-lg text-center text-gray-700">
              SMPN 1 Tamansari memiliki berbagai sarana dan prasarana yang mendukung proses belajar mengajar.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {sarana.map((sarana, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition duration-300"
                >
                  <div className="relative w-full h-48 mb-4">
                    <img
                      src={sarana.image}
                      alt={sarana.name}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                  <h3 className="font-bold text-2xl text-center">{sarana.name}</h3>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Layanan;
