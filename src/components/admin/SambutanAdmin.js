import React, { useState, useEffect } from "react";
import axios from "axios";

const SambutanAdmin = () => {
  const [sambutan, setSambutan] = useState({
    message: "",
    description: "",
    image: "",
    headmasterName: "",
  });

  const [formData, setFormData] = useState({
    message: "",
    description: "",
    image: null,
    headmasterName: "",
  });

  useEffect(() => {
    const fetchSambutan = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/sambutan"
        );
        setSambutan(response.data.sambutan); // Data sambutan untuk preview
        setFormData({
          message: response.data.sambutan.message,
          description: response.data.sambutan.description,
          image: null,
          headmasterName: response.data.sambutan.headmasterName,
        });
      } catch (error) {
        console.error("Error mengambil sambutan:", error);
      }
    };

    fetchSambutan();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleUpdate = async () => {
    try {
      const form = new FormData();
      form.append("message", formData.message);
      form.append("description", formData.description);
      form.append("headmasterName", formData.headmasterName);
      if (formData.image) {
        form.append("image", formData.image);
      }

      await axios.put("http://localhost:5000/admin/sambutan", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Sambutan berhasil diperbarui!");
      window.location.reload(); // Refresh untuk mengambil data yang diperbarui
    } catch (error) {
      console.error("Kesalahan memperbarui sambutan:", error);
      alert("Kesalahan memperbarui sambutan.");
    }
  };

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
      <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">
        Admin - Edit Sambutan Kepala Sekolah
      </h2>

      {/* Formulir Edit */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-2xl font-medium text-gray-700 mb-4">
          Edit Sambutan
        </h3>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Pesan
          </label>
          <input
            type="text"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Masukkan pesan"
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Deskripsi
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Masukkan deskripsi"
            rows="4"
            className="w-full p-2 border rounded-lg"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Nama Kepala Sekolah
          </label>
          <input
            type="text"
            name="headmasterName"
            value={formData.headmasterName}
            onChange={handleInputChange}
            placeholder="Masukkan nama kepala sekolah"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Gambar</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Perbarui Sambutan
        </button>
      </div>

      {/* Menampilkan Informasi Sambutan dalam Tabel */}
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-sm mt-8">
        <table className="min-w-full table-auto text-gray-700">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-4 text-left font-medium text-gray-600">
                Kolom
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">
                Nilai
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-6 py-4">Pesan</td>
              <td className="px-6 py-4">{sambutan.message}</td>
            </tr>
            <tr className="border-t">
              <td className="px-6 py-4">Deskripsi</td>
              <td className="px-6 py-4">{sambutan.description}</td>
            </tr>
            <tr className="border-t">
              <td className="px-6 py-4">Nama Kepala Sekolah</td>
              <td className="px-6 py-4">{sambutan.headmasterName}</td>
            </tr>
            <tr className="border-t">
              <td className="px-6 py-4">Gambar</td>
              <td className="px-6 py-4">
                {sambutan.image && (
                  <img
                    src={sambutan.image}
                    alt="Sambutan"
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SambutanAdmin;
