import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBullhorn } from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner";

const Berita = () => {
  const [news, setNews] = useState([]);
  const [pengumuman, setPengumuman] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    Promise.all([
      fetch("https://smpn1tamansari-api.vercel.app/api/news").then((res) => res.json()
      ),
      fetch("https://smpn1tamansari-api.vercel.app/api/announcements").then((res) => res.json()
      ),
    ])
      .then(([newsData, pengumumanData]) => {
        setNews(newsData);
        setPengumuman(pengumumanData);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPengumuman, setSelectedPengumuman] = useState(null);

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
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto p-4">
        <section id="berita" className="py-24">
          <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
            Berita Terbaru
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
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
                    {new Date(item.publishedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
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
        </section>

        {/* Pengumuman Sekolah Section */}
        <section id="info" className="py-24">
          <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
            Pengumuman Sekolah
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pengumuman.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)).map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 h-48 relative"
              >
                <div className="flex items-center mb-4">
                  <FaBullhorn className="text-blue-500 text-3xl mr-4" />
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
                <p className="text-gray-700 text-base">
                  {truncateText(item.description, 75)}
                </p>

                {/* Tombol Lihat di kanan bawah */}
                <button
                  onClick={() => openModal(item)}
                  className="absolute bottom-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-all"
                >
                  Lihat
                </button>
              </div>
            ))}
          </div>
        </section>
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
    </div>
  );
};

export default Berita;
