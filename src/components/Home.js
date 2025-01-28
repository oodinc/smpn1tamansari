import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";
import { FaBullhorn } from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner";

const Home = () => {
  const navigate = useNavigate();

  const [hero, setHero] = useState([]);
  const [news, setNews] = useState([]);
  const [pengumuman, setPengumuman] = useState([]);
  const [extracurriculars, setExtracurriculars] = useState([]);
  const [kalender, setKalender] = useState([]);
  const [alumni, setAlumni] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPengumuman, setSelectedPengumuman] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  
  const handleNavigation = (path, section) => {
    navigate(path); // Pindah ke halaman yang dimaksud
    setTimeout(() => {
      const element = document.querySelector(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100); // Tambahkan jeda untuk memastikan halaman dimuat
  };

  useEffect(() => {
    Promise.all([
      fetch("https://smpn1tamansari-api.vercel.app/api/hero").then((res) => res.json()),
      fetch("https://smpn1tamansari-api.vercel.app/api/news").then((res) => res.json()),
      fetch("https://smpn1tamansari-api.vercel.app/api/announcements").then((res) => res.json()),
      fetch("https://smpn1tamansari-api.vercel.app/api/extracurriculars").then((res) => res.json()),
      fetch("https://smpn1tamansari-api.vercel.app/api/kalender").then((res) => res.json()),
      fetch("https://smpn1tamansari-api.vercel.app/api/alumni").then((res) => res.json()),
    ])
      .then(([heroData, newsData, pengumumanData, extracurricularsData, kalenderData, alumniData]) => {
        setHero(heroData);
        setNews(newsData);
        setPengumuman(pengumumanData);
        setExtracurriculars(extracurricularsData);
        setKalender(kalenderData);
        setAlumni(alumniData);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.substring(0, length) + "...";
    }
    return text;
  };

  const openModal = (item) => {
    setSelectedPengumuman(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPengumuman(null);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-100 flex justify-center items-center z-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div id="home" className="relative bg-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center h-screen">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-gray-800 text-center md:text-left md:w-1/2 p-4"
          >
            <p className="text-6xl font-extrabold tracking-tight">
              Selamat Datang di {hero.welcomeMessage}
            </p>
            <p className="mt-6 text-2xl font-light">{hero.description}</p>
            <button
              onClick={() => handleNavigation("/profil", "#sambbutan")}
              className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition duration-300"
            >
              Profil Kami
            </button>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="md:w-1/2 flex justify-center"
          >
            <img
              src={hero.image}
              alt="SMPN 1 Tamansari"
              className="rounded-lg shadow-lg w-2/3 md:w-3/4 hover:shadow-xl hover:scale-105 transition duration-300"
            />
          </motion.div>
        </div>
      </div>

      {/* Berita dan Pengumuman Terbaru Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto p-4">
          <section className="my-16">
            <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
              Berita dan Pengumuman Terbaru
            </h2>

            {/* News Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {news
                .sort(
                  (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
                )
                .slice(0, 3)
                .map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Gambar */}
                    <div className="w-full h-56 bg-gray-200">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    {/* Konten */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {truncateText(item.title, 80)}
                      </h3>
                      <p className="text-gray-500 text-sm mb-4">
                        {new Date(item.publishedAt).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                      <div className="mt-auto text-right">
                        <Link
                          to={`/berita/${item.id}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          Selengkapnya →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Pengumuman Sekolah Section */}
            <div className="my-16">
              <h3 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                Pengumuman Sekolah
              </h3>
              <Swiper
                modules={[Navigation]}
                spaceBetween={30}
                slidesPerView={pengumuman.length === 1 ? 1 : 3}
                centeredSlides={pengumuman.length === 1}
                navigation
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: pengumuman.length === 1 ? 1 : 2 },
                  1024: { slidesPerView: pengumuman.length === 1 ? 1 : 3 },
                }}
              >
                {pengumuman
                  .sort(
                    (a, b) =>
                      new Date(b.publishedDate) - new Date(a.publishedDate)
                  )
                  .map((item, index) => (
                    <SwiperSlide key={index} className="mb-6">
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 h-48"
                      >
                        <div className="flex items-center mb-4">
                          <FaBullhorn className="text-blue-600 text-3xl mr-4" />
                          <div className="flex-1">
                            <h3 className="font-semibold text-xl text-gray-800">
                              {truncateText(item.title, 20)}
                            </h3>
                            <p className="text-gray-500 text-sm">
                              {new Date(item.publishedDate).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700 text-base mb-4 flex-grow">
                          {truncateText(item.description, 75)}
                        </p>
                        {/* Positioned button at the bottom-right */}
                        <button
                          onClick={() => openModal(item)}
                          className="absolute bottom-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-all"
                        >
                          Lihat
                        </button>
                      </motion.div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </section>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedPengumuman && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <div className="bg-white p-8 rounded-lg w-1/2 relative">
              {/* Tombol Close di Kiri Atas */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-5 text-gray-600 text-3xl font-semibold hover:text-gray-900 transition-all"
              >
                &times;
              </button>

              <h3 className="font-semibold text-3xl text-gray-800 mb-4">
                {selectedPengumuman.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                {new Date(selectedPengumuman.publishedDate).toLocaleDateString(
                  "id-ID",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </p>

              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: selectedPengumuman.description,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Ekstrakurikuler Section */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto p-4">
          <section className="my-16">
            <h2 className="text-4xl font-semibold text-center mb-10 text-gray-800">
              Ekstrakurikuler
            </h2>

            <div className="relative">
              {/* Overlay Gradient */}
              <div className="absolute top-0 left-0 w-60 h-full bg-gradient-to-r from-gray-100 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-60 h-full bg-gradient-to-l from-gray-100 to-transparent z-10 pointer-events-none"></div>

              {/* Swiper Slider */}
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={30}
                slidesPerView={1} // Menampilkan sebagian slide samping
                centeredSlides={true} // Memusatkan slide aktif
                loop={true} // Properti untuk membuat slider terhubung terus
                autoplay={{
                  delay: 2500, // Waktu delay antara setiap slide dalam milidetik (3000 ms = 3 detik)
                  disableOnInteraction: false, // Menjaga autoplay meski ada interaksi pengguna
                }}
                breakpoints={{
                  640: { slidesPerView: 1 }, // Pada resolusi kecil, tetap peek view
                  768: { slidesPerView: 1.5 }, // Menampilkan 2+ sebagian slide
                  1024: { slidesPerView: 2.5 }, // Menampilkan 3+ sebagian slide
                }}
                navigation
              >
                {extracurriculars.map((ekstra, index) => (
                  <SwiperSlide key={index} className="mb-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition duration-300"
                    >
                      <div className="relative w-full h-48 mb-4">
                        <img
                          src={ekstra.image}
                          alt={ekstra.name}
                          className="object-cover w-full h-full rounded-lg"
                        />
                      </div>
                      <h3 className="font-bold text-2xl text-center">
                        {ekstra.name}
                      </h3>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
        </div>
      </div>

      {/* Kalender Pendidikan Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto p-4">
          <section className="my-16">
            <h2 className="text-4xl font-semibold text-center mb-10 text-gray-800">
              Kalender Pendidikan
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="bg-white p-4 rounded-lg shadow-lg"
            >
              <p className="text-xl">
                Kalender pendidikan untuk tahun ajaran {kalender[0]?.title}:
              </p>
              {/* PDF Viewer */}
              <div className="flex justify-center items-center">
                {kalender[0]?.file ? (
                  <div className="mt-6">
                    <a
                      href={kalender[0]?.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-center hover:text-blue-800"
                    >
                      Lihat Kalender
                    </a>
                  </div>
                ) : (
                  <p>Loading PDF...</p>
                )}
              </div>
            </motion.div>
          </section>
        </div>
      </div>

      {/* Alumni Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
            Alumni Kami
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {alumni.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
