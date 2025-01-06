import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InfoSekolahAdmin = () => {
  const [infoSekolah, setInfoSekolah] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchInfoSekolah();
  }, []);

  const fetchInfoSekolah = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/pengumuman');
      setInfoSekolah(response.data);
    } catch (error) {
      console.error('Error fetching info sekolah:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:5000/admin/pengumuman', formData);
      fetchInfoSekolah();
      setFormData({ title: '', description: '' });
    } catch (error) {
      console.error('Error creating info sekolah:', error);
    }
  };

  const handleUpdate = async () => {
    if (!currentId) return;
    try {
      await axios.put(`http://localhost:5000/admin/pengumuman/${currentId}`, formData);
      fetchInfoSekolah();
      setFormData({ title: '', description: '' });
      setEditMode(false);
      setCurrentId(null);
    } catch (error) {
      console.error('Error updating info sekolah:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/pengumuman/${id}`);
      fetchInfoSekolah();
    } catch (error) {
      console.error('Error deleting info sekolah:', error);
    }
  };

  const handleEdit = (id, title, description) => {
    setFormData({ title, description });
    setEditMode(true);
    setCurrentId(id);
  };

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
      <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">Admin - Kelola Pengumuman Sekolah</h2>

      {/* Formulir untuk Membuat atau Memperbarui Info Sekolah */}
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
        <button
          onClick={editMode ? handleUpdate : handleCreate}
          className="px-6 py-3 bg-blue-600 text-white rounded-md transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {editMode ? 'Perbarui Info Sekolah' : 'Buat Info Sekolah'}
        </button>
      </div>

      {/* Menampilkan Daftar Info Sekolah sebagai Tabel */}
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-sm">
        <table className="min-w-full table-auto text-gray-700">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-4 text-left font-medium text-gray-600">Judul</th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">Deskripsi</th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">Tanggal Publikasi</th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {infoSekolah.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4">{item.description}</td>
                <td className="px-6 py-4">{new Date(item.publishedDate).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(item._id, item.title, item.description)}
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

export default InfoSekolahAdmin;