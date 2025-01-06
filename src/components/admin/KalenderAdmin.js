import React, { useEffect, useState } from "react";
import axios from "axios";

const KalenderAdmin = () => {
  const [kalender, setKalender] = useState({ title: "", file: "" });
  const [formData, setFormData] = useState({ title: "", file: "" });

  useEffect(() => {
    fetchKalender();
  }, []);

  const fetchKalender = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/kalender");
      console.log("Kalender berhasil diambil:", response.data);
      setKalender(response.data || { title: "", file: "" });
      setFormData({ title: response.data?.title || "", file: "" });
    } catch (error) {
      console.error("Kesalahan mengambil kalender:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleUpdateKalender = async () => {
    const form = new FormData();
    form.append("title", formData.title);
    if (formData.file) {
      form.append("file", formData.file);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/admin/kalender",
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Kalender berhasil diperbarui:", response.data);
      fetchKalender();

      // Tambahkan pemberitahuan menggunakan alert
      alert("Kalender berhasil diperbarui!");
    } catch (error) {
      console.error("Kesalahan memperbarui kalender:", error);
      alert("Terjadi kesalahan saat memperbarui kalender.");
    }
  };

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
      <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">
        Admin - Kalender Pendidikan
      </h2>

      {/* Formulir Buat atau Perbarui Kalender */}
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
          name="file"
          onChange={handleFileChange}
          className="p-3 border border-gray-300 rounded-md mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleUpdateKalender}
          className="px-6 py-3 bg-blue-600 text-white rounded-md transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Perbarui Kalender Pendidikan
        </button>
      </div>

      {/* Menampilkan Detail Kalender dalam Tabel */}
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-sm">
        <table className="min-w-full table-auto text-gray-700">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-4 text-left font-medium text-gray-600">
                Judul
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">
                File
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-6 py-4">{kalender.title}</td>
              <td className="px-6 py-4">
                {kalender.file ? (
                  <a
                    href={`http://localhost:5000${kalender.file}`}
                    download
                    className="text-blue-600"
                  >
                    Unduh PDF
                  </a>
                ) : (
                  "Tidak ada file tersedia"
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KalenderAdmin;
