import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import LoadingSpinner from "../LoadingSpinner";

const BeritaAdmin = () => {
  const [news, setNews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newPublishedAt, setNewPublishedAt] = useState("");
  const quillRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);

  // Fetch berita from backend
  useEffect(() => {
    setIsLoading(true); 
    fetch("https://smpn1tamansari-api.vercel.app/api/news")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNews(data);
      })
      .finally(() => setIsLoading(false)); 
  }, []);

  // Handle update berita
  const handleUpdateBerita = () => {
    const formData = new FormData();
    formData.append("title", selectedNews.title);
    formData.append("description", selectedNews.description);
    formData.append("publishedAt", selectedNews.publishedAt);
    if (selectedNews.image) formData.append("image", selectedNews.image);

    fetch(`https://smpn1tamansari-api.vercel.app/api/news/${selectedNews.id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setNews(news.map((item) => (item.id === data.id ? data : item)));
        closeModal();
      });
  };

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  // Handle delete berita
  const handleDelete = (id) => {
    fetch(`https://smpn1tamansari-api.vercel.app/api/news/${id}`, {
      method: "DELETE",
    }).then(() => {
      setNews(news.filter((item) => item.id !== id));
    });
  };

  // Handle open modal
  const openModal = (item) => {
    setSelectedNews(item);
    setIsModalOpen(true);
  };

  // Handle close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  const handleDescriptionChange = (value) => {
    setNewDescription(value);
  };

  // Handle create berita
  const handleCreateBerita = () => {
    const formData = new FormData();
    formData.append("title", newTitle);
    formData.append("description", newDescription);
    formData.append("publishedAt", newPublishedAt);
    if (newImage) formData.append("image", newImage);

    fetch("https://smpn1tamansari-api.vercel.app/api/news", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setNews([...news, data]);
        setNewTitle("");
        setNewDescription("");
        setNewImage(null);
        setNewPublishedAt("");
      });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">
          Admin - Kelola Berita
        </h2>

        {/* Add new berita form */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">
            Tambah Berita
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateBerita();
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Judul Berita"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />

            <div>
              <ReactQuill
                ref={quillRef}
                value={newDescription}
                onChange={handleDescriptionChange}
                theme="snow"
                placeholder="Deskripsi Berita"
              />
            </div>

            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
              type="date"
              value={newPublishedAt}
              onChange={(e) => setNewPublishedAt(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md"
            >
              Tambah Berita
            </button>
          </form>
        </div>

        {/* Berita Table */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Daftar Berita
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">Judul</th>
                <th className="px-4 py-2 text-left text-gray-600">Deskripsi</th>
                <th className="px-4 py-2 text-left text-gray-600">Gambar</th>
                <th className="px-4 py-2 text-left text-gray-600">Tanggal</th>
                <th className="px-4 py-2 text-left text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {news.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">
                    <div
                      className="text-lg text-gray-800 leading-relaxed quill-description"
                      dangerouslySetInnerHTML={{ __html: item.description }} // Rendering the HTML content
                    />
                  </td>
                  <td className="px-4 py-2">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(item.publishedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => openModal(item)}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Edit */}
      {isModalOpen && selectedNews && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div
            className="bg-white p-8 rounded-lg w-1/2 relative"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-5 text-gray-600 text-3xl font-semibold hover:text-gray-900 transition-all"
            >
              &times;
            </button>

            <h3 className="text-3xl font-semibold text-gray-800 mb-4">
              Edit Berita
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateBerita();
              }}
            >
              <input
                type="text"
                placeholder="Judul Berita"
                value={selectedNews.title}
                onChange={(e) =>
                  setSelectedNews({ ...selectedNews, title: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              {/* Use ReactQuill for description in modal */}
              <ReactQuill
                value={selectedNews.description}
                onChange={(value) =>
                  setSelectedNews({ ...selectedNews, description: value })
                }
                className="w-full border border-gray-300 rounded-md"
                theme="snow"
                placeholder="Deskripsi Berita"
              />
              <input
                type="file"
                onChange={(e) =>
                  setSelectedNews({ ...selectedNews, image: e.target.files[0] })
                }
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="date"
                value={selectedNews.publishedAt.split("T")[0]}
                onChange={(e) =>
                  setSelectedNews({
                    ...selectedNews,
                    publishedAt: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md"
              >
                Simpan Perubahan
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeritaAdmin;
