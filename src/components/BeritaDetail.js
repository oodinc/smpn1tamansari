import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaBullhorn } from "react-icons/fa";

const BeritaDetail = () => {
  const { id } = useParams();
  const [beritaDetail, setBeritaDetail] = useState(null);
  const [otherNews, setOtherNews] = useState([]);
  const [pengumuman, setPengumuman] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPengumuman, setSelectedPengumuman] = useState(null);

  // Fetch berita detail
  useEffect(() => {
    const fetchBeritaDetail = () => {
      fetch(`https://smpn1tamansari-api.vercel.app/api/news/${id}`)
        .then((response) => response.json())
        .then((data) => setBeritaDetail(data))
        .catch((error) =>
          console.error("Error fetching berita detail:", error)
        );
    };

    fetchBeritaDetail();
  }, [id]);

  // Fetch other news
  useEffect(() => {
    const fetchOtherNews = () => {
      fetch("https://smpn1tamansari-api.vercel.app/api/news")
        .then((response) => response.json())
        .then((data) => setOtherNews(data));
    };

    fetchOtherNews();
  }, []);

  // Fetch pengumuman
  useEffect(() => {
    const fetchPengumuman = () => {
      fetch("https://smpn1tamansari-api.vercel.app/api/announcements")
        .then((response) => response.json())
        .then((data) => setPengumuman(data));
    };

    fetchPengumuman();
  }, []);

  if (!beritaDetail) return <div>Loading...</div>;

  const publishedDate = new Date(beritaDetail.publishedAt).toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  // Filter out the current news from other news list
  const filteredOtherNews = otherNews.filter(
    (news) => news.id !== parseInt(id)
  );

  // Function to shuffle array for random order
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

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

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Berita Detail */}
          <div className="col-span-2 bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Title Section */}
            <div className="text-gray-800 p-4">
              <h1 className="text-3xl font-bold">{beritaDetail.title}</h1>
            </div>

            {/* Image Section */}
            <div className="relative overflow-hidden">
              <img
                src={beritaDetail.image}
                alt={beritaDetail.title}
                className="object-cover w-full h-[500px] transition-transform duration-300 hover:scale-105"
              />
          </div>

            {/* Content Section */}
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <AiOutlineCalendar className="text-blue-500" />
                  <span>{publishedDate}</span>
                </div>
              </div>

              <div
                className="text-lg text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: beritaDetail.description }}
              />
            </div>
          </div>

          {/* Right Column: Daftar Berita & Pengumuman */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {/* Daftar Berita Lain */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Berita Lainnya
            </h2>
            <div className="grid grid-cols-1">
              {shuffleArray(filteredOtherNews) // Acak urutan berita
                .slice(0, 3) // Ambil hanya 3 berita
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col mb-4"
                  >
                    {/* Gambar */}
                    <div className="w-full h-36 bg-gray-200">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Konten */}
                    <div className="p-3 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {truncateText(item.title, 80)}
                      </h3>
                      <p className="text-gray-500 text-sm">
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

            {/* Pengumuman */}
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
              Pengumuman Sekolah
            </h2>
            <div className="space-y-4">
              {pengumuman
                .sort(
                  (a, b) =>
                    new Date(b.publishedDate) - new Date(a.publishedDate)
                ) // Urutkan berdasarkan tanggal publikasi (terbaru di atas)
                .slice(0, 3) // Ambil hanya 3 pengumuman terbaru
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 h-48 relative"
                  >
                    <div className="flex items-center mb-2">
                      <FaBullhorn className="text-blue-500 text-3xl mr-4" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-xl text-gray-800">
                          {truncateText(item.title, 35)}
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
                      {truncateText(item.description, 60)}
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
                      {new Date(
                        selectedPengumuman.publishedDate
                      ).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
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
        </div>
      </div>
    </div>
  );
};

export default BeritaDetail;
