import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";

const EkstrakurikulerAdmin = () => {
  const [extracurriculars, setExtracurriculars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExtracurricular, setSelectedExtracurricular] = useState(null);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false); 
  const [isUpdating, setIsUpdating] = useState(false); 
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch extracurriculars from backend
  useEffect(() => {
    setIsLoading(true); // Mulai loading
    fetch("https://smpn1tamansari-api.vercel.app/api/extracurriculars")
      .then((response) => response.json())
      .then((data) => setExtracurriculars(data))
      .finally(() => setIsLoading(false)); 
  }, []);

  // Handle create extracurricular
  const handleCreateExtracurricular = () => {
    setIsCreating(true); // Start creating loading
    const formData = new FormData();
    formData.append("name", newName);
    formData.append("description", newDescription);
    if (newImage) formData.append("image", newImage);

    fetch("https://smpn1tamansari-api.vercel.app/api/extracurriculars", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setExtracurriculars([...extracurriculars, data]);
        setNewName("");
        setNewDescription("");
        setNewImage(null);
      })
      .finally(() => setIsCreating(false)); // End creating loading
  };

  // Handle update extracurricular
  const handleUpdateExtracurricular = () => {
    setIsUpdating(true); // Start updating loading
    const formData = new FormData();
    formData.append("name", selectedExtracurricular.name);
    formData.append("description", selectedExtracurricular.description);
    if (selectedExtracurricular.image)
      formData.append("image", selectedExtracurricular.image);

    fetch(
      `https://smpn1tamansari-api.vercel.app/api/extracurriculars/${selectedExtracurricular.id}`,
      {
        method: "PUT",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setExtracurriculars(
          extracurriculars.map((item) => (item.id === data.id ? data : item))
        );
        closeModal();
      })
      .finally(() => setIsUpdating(false)); // End updating loading
  };

  // Handle delete extracurricular
  const handleDelete = (id) => {
    setIsDeleting(true); // Start deleting loading
    fetch(`https://smpn1tamansari-api.vercel.app/api/extracurriculars/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setExtracurriculars(extracurriculars.filter((item) => item.id !== id));
      })
      .finally(() => setIsDeleting(false)); // End deleting loading
  };

  const openModal = (item) => {
    setSelectedExtracurricular(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExtracurricular(null);
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
          Admin - Kelola Ekstrakurikuler
        </h2>

        {/* Add new extracurricular form */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">
            Tambah Ekstrakurikuler
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateExtracurricular();
            }}
            className="space-y-4"
          >
            <label className="block text-gray-700">Nama Ekstrakurikuler</label>
            <input
              type="text"
              placeholder="Masukkan Nama Ekstrakurikuler"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <label className="block text-gray-700">Deskripsi Ekstrakurikuler</label>
            <textarea
              placeholder="Masukkan Deskripsi Ekstrakurikuler"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              rows="4"
            />
            <label className="block text-gray-700">Gambar Ekstrakurikuler</label>
            <input
              type="file"
              onChange={(e) => setNewImage(e.target.files[0])}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md"
            >
              Tambah Ekstrakurikuler
            </button>
          </form>
        </div>

        {/* Extracurriculars Table */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Daftar Ekstrakurikuler
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-800">Nama</th>
                <th className="px-4 py-2 text-left text-gray-800">Deskripsi</th>
                <th className="px-4 py-2 text-left text-gray-800">Gambar</th>
                <th className="px-4 py-2 text-gray-800">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {extracurriculars.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.description}</td>
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

        {/* Modal for editing extracurricular */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">
                Edit Ekstrakurikuler
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateExtracurricular();
                }}
                className="space-y-4"
              >
                <label className="block text-gray-700">Nama Ekstrakurikuler</label>
                <input
                  type="text"
                  value={selectedExtracurricular.name}
                  onChange={(e) =>
                    setSelectedExtracurricular({
                      ...selectedExtracurricular,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
                <label className="block text-gray-700">Deskripsi Ekstrakurikuler</label>
                <textarea
                  value={selectedExtracurricular.description}
                  onChange={(e) =>
                    setSelectedExtracurricular({
                      ...selectedExtracurricular,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows="4"
                />
                <label className="block text-gray-700">Gambar Ekstrakurikuler</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setSelectedExtracurricular({
                      ...selectedExtracurricular,
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

export default EkstrakurikulerAdmin;
