import React, { useEffect, useState } from "react";
import axios from "axios";

const GaleriAdmin = () => {
  const [galeri, setGaleri] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    image: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchGaleri();
  }, []);

  const fetchGaleri = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/galeri");
      setGaleri(response.data);
    } catch (error) {
      console.error("Error fetching galeri:", error);
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
      form.append("title", formData.title);
      if (formData.image) {
        form.append("image", formData.image);
      }

      await axios.post("http://localhost:5000/admin/galeri", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchGaleri();
      setFormData({ title: "", image: null });
    } catch (error) {
      console.error("Error creating galeri:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const form = new FormData();
      form.append("title", formData.title);
      if (formData.image) {
        form.append("image", formData.image);
      }

      await axios.put(`http://localhost:5000/admin/galeri/${currentId}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchGaleri();
      setFormData({ title: "", image: null });
      setEditMode(false);
      setCurrentId(null);
    } catch (error) {
      console.error("Error updating galeri:", error);
    }
  };

  const handleEdit = (galeri) => {
    setEditMode(true);
    setCurrentId(galeri._id);
    setFormData({ title: galeri.title, image: null });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/galeri/${id}`);
      fetchGaleri();
    } catch (error) {
      console.error("Error deleting galeri:", error);
    }
  };

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
      <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">
        Admin - Kelola Galeri
      </h2>

      {/* Formulir Buat atau Perbarui Galeri */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Judul"
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
          {editMode ? "Perbarui Galeri" : "Buat Galeri"}
        </button>
      </div>

      {/* Menampilkan Daftar Galeri dalam Bentuk Tabel */}
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-sm">
        <table className="min-w-full table-auto text-gray-700">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-4 text-left font-medium text-gray-600">Judul</th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">Gambar</th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {galeri.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(item)}
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

export default GaleriAdmin;
