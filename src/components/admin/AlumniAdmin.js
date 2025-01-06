import React, { useEffect, useState } from "react";
import axios from "axios";

const AlumniAdmin = () => {
  const [alumni, setAlumni] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/alumni");
      setAlumni(response.data);
    } catch (error) {
      console.error("Kesalahan mengambil data alumni:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreate = async () => {
    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('description', formData.description);
      if (formData.image) {
        form.append('image', formData.image);
      }
  
      await axios.post('http://localhost:5000/admin/alumni', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchAlumni();
      setFormData({ title: "", description: "", image: "" });
    } catch (error) {
      console.error("Kesalahan membuat data alumni:", error);
    }
  };

  const handleUpdate = async () => {
    if (!currentId) return;
    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('description', formData.description);
      if (formData.image) {
        form.append('image', formData.image);
      }
  
      await axios.put(`http://localhost:5000/admin/alumni/${currentId}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchAlumni();
      setFormData({ title: "", description: "", image: "" });
      setEditMode(false);
      setCurrentId(null);
    } catch (error) {
      console.error("Kesalahan memperbarui data alumni:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/alumni/${id}`);
      fetchAlumni();
    } catch (error) {
      console.error("Kesalahan menghapus data alumni:", error);
    }
  };

  const handleEdit = (id, title, description, image) => {
    setFormData({ title, description, image });
    setEditMode(true);
    setCurrentId(id);
  };

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
      <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">
        Admin - Kelola Alumni
      </h2>

      {/* Formulir Buat atau Perbarui Alumni */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Judul"
          className="p-3 border border-gray-300 rounded-md mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Deskripsi"
          className="p-3 border border-gray-300 rounded-md mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          name="image"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
          className="p-3 border border-gray-300 rounded-md mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={editMode ? handleUpdate : handleCreate}
          className="px-6 py-3 bg-blue-600 text-white rounded-md transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {editMode ? "Perbarui Alumni" : "Buat Alumni"}
        </button>
      </div>

      {/* Menampilkan Daftar Alumni dalam Bentuk Tabel */}
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-sm">
        <table className="min-w-full table-auto text-gray-700">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-4 text-left font-medium text-gray-600">Judul</th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">Deskripsi</th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">Gambar</th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {alumni.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4">{item.description}</td>
                <td className="px-6 py-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      handleEdit(item._id, item.title, item.description, item.image)
                    }
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md mr-2 transition-all duration-300 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md transition-all duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
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
  );
};

export default AlumniAdmin;
