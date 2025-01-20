import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";

const AlumniAdmin = () => {
  const [alumni, setAlumni] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  
  // Fetch alumni from backend
  useEffect(() => {
    setIsLoading(true); 
    fetch("https://smpn1tamansari-api.vercel.app/api/alumni")
      .then((response) => response.json())
      .then((data) => setAlumni(data))
      .finally(() => setIsLoading(false)); 
  }, []);

  // Handle update alumni
  const handleUpdateAlumni = () => {
    const formData = new FormData();
    formData.append("title", selectedAlumni.title);
    formData.append("description", selectedAlumni.description);
    if (selectedAlumni.image) formData.append("image", selectedAlumni.image);

    setIsUpdating(true); // Start the loading spinner for update
    fetch(`https://smpn1tamansari-api.vercel.app/api/alumni/${selectedAlumni.id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setAlumni(alumni.map((item) => (item.id === data.id ? data : item)));
        closeModal();
      })
      .finally(() => setIsUpdating(false)); // Stop the loading spinner for update
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleDelete = (id) => {
    setIsDeleting(true); // Start the loading spinner for delete
    fetch(`https://smpn1tamansari-api.vercel.app/api/alumni/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setAlumni(alumni.filter((item) => item.id !== id));
      })
      .finally(() => setIsDeleting(false)); // Stop the loading spinner for delete
  };

  // Handle open modal
  const openModal = (item) => {
    setSelectedAlumni(item);
    setIsModalOpen(true);
  };

  // Handle close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAlumni(null);
  };

  // Handle create alumni
  const handleCreateAlumni = () => {
    const formData = new FormData();
    formData.append("title", newTitle);
    formData.append("description", newDescription);
    if (newImage) formData.append("image", newImage);

    setIsCreating(true); // Start the loading spinner for create
    fetch("https://smpn1tamansari-api.vercel.app/api/alumni", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setAlumni([...alumni, data]);
        setNewTitle("");
        setNewDescription("");
        setNewImage(null);
      })
      .finally(() => setIsCreating(false)); // Stop the loading spinner for create
  };

  if (isLoading || isUpdating || isDeleting || isCreating) {
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
          Admin - Kelola Alumni
        </h2>

        {/* Add new alumni form */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">
            Tambah Alumni
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateAlumni();
            }}
            className="space-y-4"
          >
            <label className="block text-gray-600">Nama Alumni</label>
            <input
              type="text"
              placeholder="Nama Alumni"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <label className="block text-gray-600">Deskripsi Alumni</label>
            <textarea
              placeholder="Deskripsi Alumni"
              value={newDescription}
              onChange={handleDescriptionChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              rows="4"
            />
            <label className="block text-gray-600">Gambar Alumni</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md"
            >
              Tambah Alumni
            </button>
          </form>
        </div>

        {/* Alumni Table */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Daftar Alumni
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">Nama</th>
                <th className="px-4 py-2 text-left text-gray-600">Deskripsi</th>
                <th className="px-4 py-2 text-left text-gray-600">Gambar</th>
                <th className="px-4 py-2 text-left text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {alumni.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => openModal(item)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-1/3">
              <h3 className="text-2xl font-semibold mb-4">Edit Alumni</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateAlumni();
                }}
                className="space-y-4"
              >
                <label className="block text-gray-600">Nama Alumni</label>
                <input
                  type="text"
                  value={selectedAlumni.title}
                  onChange={(e) =>
                    setSelectedAlumni({
                      ...selectedAlumni,
                      title: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
                <label className="block text-gray-600">Deskripsi Alumni</label>
                <textarea
                  value={selectedAlumni.description}
                  onChange={(e) =>
                    setSelectedAlumni({
                      ...selectedAlumni,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows="4"
                />
                <label className="block text-gray-600">Gambar Alumni</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setSelectedAlumni({
                      ...selectedAlumni,
                      image: e.target.files[0],
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={closeModal}
                    className="px-6 py-2 bg-gray-400 text-white rounded-md"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md"
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

export default AlumniAdmin;
