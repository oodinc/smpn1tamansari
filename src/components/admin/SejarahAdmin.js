import React, { useState, useEffect } from "react";
import axios from "axios";

const SejarahAdmin = () => {
  const [formData, setFormData] = useState({
    text: "",
    image: null,
  });
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchSejarah = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/sejarah");
        setFormData({ text: response.data.sejarah.text, image: null });
        setPreview(response.data.sejarah.image);
      } catch (error) {
        console.error("Error mengambil sejarah:", error);
      }
    };

    fetchSejarah();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("text", formData.text);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await axios.put("http://localhost:5000/admin/sejarah", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Sejarah berhasil diperbarui!");
    } catch (error) {
      console.error("Kesalahan memperbarui sejarah:", error);
      alert("Gagal memperbarui sejarah.");
    }
  };

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
      <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">
        Admin - Edit Sejarah
      </h2>

      {/* Formulir Edit */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-2xl font-medium text-gray-700 mb-4">
          Edit Sejarah
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Teks Sejarah
            </label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              rows="4"
              className="w-full p-2 border rounded-lg"
              placeholder="Masukkan teks sejarah"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Foto Sejarah
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Simpan Sejarah
          </button>
        </form>
      </div>

      {/* Menampilkan Informasi Sejarah dalam Tabel */}
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
              <td className="px-6 py-4">Teks Sejarah</td>
              <td className="px-6 py-4">{formData.text}</td>
            </tr>
            <tr className="border-t">
              <td className="px-6 py-4">Foto Sejarah</td>
              <td className="px-6 py-4">
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
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

export default SejarahAdmin;
