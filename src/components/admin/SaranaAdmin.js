import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";

const SaranaAdmin = () => {
  const [sarana, setSarana] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSarana, setSelectedSarana] = useState(null);
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch sarana from backend
  useEffect(() => {
    setIsLoading(true); 
    fetch("https://smpn1tamansari-api.vercel.app/api/sarana")
      .then((response) => response.json())
      .then((data) => setSarana(data))
      .finally(() => setIsLoading(false));
  }, []);

  // Handle create sarana
  const handleCreateSarana = () => {
    setIsCreating(true); // Set creating state to true
    const formData = new FormData();
    formData.append("name", newName);
    if (newImage) formData.append("image", newImage);

    fetch("https://smpn1tamansari-api.vercel.app/api/sarana", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setSarana([...sarana, data]);
        setNewName("");
        setNewImage(null);
      })
      .finally(() => setIsCreating(false)); // Set creating state to false after operation
  };

  // Handle update sarana
  const handleUpdateSarana = () => {
    setIsUpdating(true); // Set updating state to true
    const formData = new FormData();
    formData.append("name", selectedSarana.name);
    if (selectedSarana.image) formData.append("image", selectedSarana.image);

    fetch(`https://smpn1tamansari-api.vercel.app/api/sarana/${selectedSarana.id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setSarana(sarana.map((item) => (item.id === data.id ? data : item)));
        closeModal();
      })
      .finally(() => setIsUpdating(false)); // Set updating state to false after operation
  };

  // Handle delete sarana
  const handleDelete = (id) => {
    setIsDeleting(true); // Set deleting state to true
    fetch(`https://smpn1tamansari-api.vercel.app/api/sarana/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setSarana(sarana.filter((item) => item.id !== id));
      })
      .finally(() => setIsDeleting(false)); // Set deleting state to false after operation
  };

  const openModal = (item) => {
    setSelectedSarana(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSarana(null);
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
          Admin - Kelola Sarana
        </h2>

        {/* Add new sarana form */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">
            Tambah Sarana
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateSarana();
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Nama Sarana"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
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
              Tambah Sarana
            </button>
          </form>
        </div>

        {/* Sarana Table */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Daftar Sarana
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-800">Nama</th>
                <th className="px-4 py-2 text-left text-gray-800">Gambar</th>
                <th className="px-4 py-2 text-gray-800">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {sarana.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
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

        {/* Modal for editing sarana */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Edit Sarana</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateSarana();
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  value={selectedSarana.name}
                  onChange={(e) =>
                    setSelectedSarana({
                      ...selectedSarana,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="file"
                  onChange={(e) =>
                    setSelectedSarana({
                      ...selectedSarana,
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

export default SaranaAdmin;
