import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";

const GaleriAdmin = () => {
  const [galeri, setGaleri] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGaleri, setSelectedGaleri] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newImage, setNewImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch gallery items from backend
  useEffect(() => {
    setIsLoading(true); // Mulai loading
    fetch("https://smpn1tamansari-api.vercel.app/api/galeri")
      .then((response) => response.json())
      .then((data) => setGaleri(data))
      .finally(() => setIsLoading(false));
  }, []);

  // Handle create gallery
  const handleCreateGaleri = () => {
    const formData = new FormData();
    formData.append("title", newTitle);
    if (newImage) formData.append("image", newImage);

    fetch("https://smpn1tamansari-api.vercel.app/api/galeri", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setGaleri([...galeri, data]);
        setNewTitle("");
        setNewImage(null);
      });
  };

  // Handle update gallery
  const handleUpdateGaleri = () => {
    const formData = new FormData();
    formData.append("title", selectedGaleri.title);
    if (selectedGaleri.image) formData.append("image", selectedGaleri.image);

    fetch(`https://smpn1tamansari-api.vercel.app/api/galeri/${selectedGaleri.id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setGaleri(galeri.map((item) => (item.id === data.id ? data : item)));
        closeModal();
      });
  };

  // Handle delete gallery
  const handleDelete = (id) => {
    fetch(`https://smpn1tamansari-api.vercel.app/api/galeri/${id}`, {
      method: "DELETE",
    }).then(() => {
      setGaleri(galeri.filter((item) => item.id !== id));
    });
  };

  const openModal = (item) => {
    setSelectedGaleri(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGaleri(null);
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
        <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">
          Admin - Kelola Galeri
        </h2>

        {/* Add new gallery form */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">
            Tambah Galeri
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateGaleri();
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Judul Galeri"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <input
              type="file"
              onChange={(e) => setNewImage(e.target.files[0])}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md"
            >
              Tambah Galeri
            </button>
          </form>
        </div>

        {/* Galeri Table */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Daftar Galeri
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-800">Judul</th>
                <th className="px-4 py-2 text-left text-gray-800">Gambar</th>
                <th className="px-4 py-2 text-gray-800">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {galeri.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2">{item.title}</td>
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
                    <button
                      onClick={() => openModal(item)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md mr-2"
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

        {/* Modal for editing gallery */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Edit Galeri</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateGaleri();
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  value={selectedGaleri.title}
                  onChange={(e) =>
                    setSelectedGaleri({
                      ...selectedGaleri,
                      title: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="file"
                  onChange={(e) =>
                    setSelectedGaleri({
                      ...selectedGaleri,
                      image: e.target.files[0],
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 rounded-md"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GaleriAdmin;
