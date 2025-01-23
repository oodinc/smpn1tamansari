import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";

const GaleriAdmin = () => {
  const [galeri, setGaleri] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGaleri, setSelectedGaleri] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newImage, setNewImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [editTitleError, setEditTitleError] = useState("");

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
    setIsCreating(true); // Mulai membuat galeri
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
      })
      .finally(() => setIsCreating(false)); // Selesai membuat galeri
  };

  // Handle update gallery
  const handleUpdateGaleri = () => {
    setIsUpdating(true); // Mulai memperbarui galeri
    const formData = new FormData();
    formData.append("title", selectedGaleri.title);
    if (selectedGaleri.image) formData.append("image", selectedGaleri.image);

    fetch(
      `https://smpn1tamansari-api.vercel.app/api/galeri/${selectedGaleri.id}`,
      {
        method: "PUT",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setGaleri(galeri.map((item) => (item.id === data.id ? data : item)));
        closeModal();
      })
      .finally(() => setIsUpdating(false)); // Selesai memperbarui galeri
  };

  // Handle delete gallery
  const handleDelete = (id) => {
    setIsDeleting(true); // Mulai menghapus galeri
    fetch(`https://smpn1tamansari-api.vercel.app/api/galeri/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setGaleri(galeri.filter((item) => item.id !== id));
      })
      .finally(() => setIsDeleting(false)); // Selesai menghapus galeri
  };

  const openModal = (item) => {
    setSelectedGaleri(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGaleri(null);
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (value.length > 30) {
      setTitleError("Judul maksimal 30 karakter");
    } else {
      setTitleError(""); // Clear error when within limit
    }
    setNewTitle(value);
  };

  const handleEditTitleChange = (e) => {
    const value = e.target.value;
    if (value.length > 30) {
      setEditTitleError("Judul maksimal 30 karakter");
    } else {
      setEditTitleError(""); // Clear error when within limit
    }
    setSelectedGaleri({
      ...selectedGaleri,
      title: value,
    });
  };

  if (isLoading || isCreating || isUpdating || isDeleting) {
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
            {/* Keterangan Nama */}
            <label className="block text-gray-700">Nama Galeri</label>
            <input
              type="text"
              placeholder="Judul Galeri"
              value={newTitle}
              onChange={handleTitleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            {titleError && <p className="text-red-500 text-sm">{titleError}</p>}
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
                <label className="block text-gray-700">Nama Galeri</label>
                <input
                  type="text"
                  value={selectedGaleri.title}
                  onChange={handleEditTitleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
                {editTitleError && (
                  <p className="text-red-500 text-sm">{editTitleError}</p>
                )}
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
