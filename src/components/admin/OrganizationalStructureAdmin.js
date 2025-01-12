import React, { useState, useEffect } from "react";

const OrganizationalStructureAdmin = () => {
  const [structure, setStructure] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStructure, setSelectedStructure] = useState(null);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newImage, setNewImage] = useState(null);

  const roles = [
    "Kepala Sekolah",
    "Wakasek 1",
    "Wakasek 2",
    "Koor. TAS",
    "Ketua Komite",
    "Urusan Humas",
    "Urusan Kesiswaan",
    "Urusan Kurikulum",
    "Urusan Sarpras",
  ];

  // Fetch structure data from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/strukturOrganisasi")
      .then((response) => response.json())
      .then((data) => setStructure(data));
  }, []);

  // Handle create structure
  const handleCreateStructure = () => {
    const formData = new FormData();
    formData.append("name", newName);
    formData.append("role", newRole);
    if (newImage) formData.append("image", newImage);

    fetch("http://localhost:5000/api/strukturOrganisasi", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setStructure([...structure, data]);
        setNewName("");
        setNewRole("");
        setNewImage(null);
      });
  };

  // Handle update structure
  const handleUpdateStructure = () => {
    const formData = new FormData();
    formData.append("name", selectedStructure.name);
    formData.append("role", selectedStructure.role);
    if (selectedStructure.image)
      formData.append("image", selectedStructure.image);

    fetch(
      `http://localhost:5000/api/strukturOrganisasi/${selectedStructure.id}`,
      {
        method: "PUT",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setStructure(
          structure.map((item) => (item.id === data.id ? data : item))
        );
        closeModal();
      });
  };

  // Handle delete structure
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/strukturOrganisasi/${id}`, {
      method: "DELETE",
    }).then(() => {
      setStructure(structure.filter((item) => item.id !== id));
    });
  };

  const openModal = (item) => {
    setSelectedStructure(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStructure(null);
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">
          Admin - Kelola Struktur Organisasi
        </h2>

        {/* Add new structure form */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">
            Tambah Struktur
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateStructure();
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Nama"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            >
              <option value="">Pilih Peran</option>
              {roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <input
              type="file"
              onChange={(e) => setNewImage(e.target.files[0])}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md"
            >
              Tambah Struktur
            </button>
          </form>
        </div>

        {/* Structure Table */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Daftar Struktur
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-800">Nama</th>
                <th className="px-4 py-2 text-left text-gray-800">Peran</th>
                <th className="px-4 py-2 text-left text-gray-800">Gambar</th>
                <th className="px-4 py-2 text-gray-800">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {structure.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.role}</td>
                  <td className="px-4 py-2">
                    {item.image && (
                      <img
                        src={`http://localhost:5000${item.image}`}
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

        {/* Modal for editing structure */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Edit Struktur</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateStructure();
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  value={selectedStructure.name}
                  onChange={(e) =>
                    setSelectedStructure({
                      ...selectedStructure,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
                <select
                  value={selectedStructure.role}
                  onChange={(e) =>
                    setSelectedStructure({
                      ...selectedStructure,
                      role: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-md"
                >
                  <option value="">Pilih Peran</option>
                  {roles.map((role, index) => (
                    <option key={index} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <input
                  type="file"
                  onChange={(e) =>
                    setSelectedStructure({
                      ...selectedStructure,
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

export default OrganizationalStructureAdmin;
