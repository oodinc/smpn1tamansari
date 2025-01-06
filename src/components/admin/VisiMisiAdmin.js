import React, { useState, useEffect } from "react";
import axios from "axios";

const VisiMisiAdmin = () => {
  const [formData, setFormData] = useState({
    visi: "",
    misi: [""], // Default array kosong untuk misi
  });

  useEffect(() => {
    const fetchVisiMisi = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/visimisi");
        const { visi, misi } = response.data.visiMisi || {};
        setFormData({ visi: visi || "", misi: misi || [""] });
      } catch (error) {
        console.error("Kesalahan mengambil Visi & Misi:", error);
      }
    };

    fetchVisiMisi();
  }, []);

  const handleVisiChange = (e) => {
    setFormData((prev) => ({ ...prev, visi: e.target.value }));
  };

  const handleMisiChange = (index, value) => {
    const updatedMisi = [...formData.misi];
    updatedMisi[index] = value;
    setFormData((prev) => ({ ...prev, misi: updatedMisi }));
  };

  const handleAddMisi = () => {
    setFormData((prev) => ({ ...prev, misi: [...prev.misi, ""] }));
  };

  const handleRemoveMisi = (index) => {
    const updatedMisi = formData.misi.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, misi: updatedMisi }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put("http://localhost:5000/admin/visimisi", formData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Visi & Misi berhasil diperbarui!");
    } catch (error) {
      console.error("Kesalahan memperbarui Visi & Misi:", error);
      alert("Gagal memperbarui Visi & Misi.");
    }
  };

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
      <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">
        Admin - Kelola Visi & Misi
      </h2>

      {/* Formulir Visi */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <textarea
          value={formData.visi}
          onChange={handleVisiChange}
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Masukkan visi"
        ></textarea>
      </div>

      {/* Tabel Misi */}
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-sm">
        <table className="min-w-full table-auto text-gray-700">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-4 text-left font-medium text-gray-600">Misi</th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {formData.misi.map((misi, index) => (
              <tr key={index} className="border-t">
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={misi}
                    onChange={(e) => handleMisiChange(index, e.target.value)}
                    className="flex-grow p-2 border rounded-lg w-full"
                    placeholder={`Misi ${index + 1}`}
                  />
                </td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => handleRemoveMisi(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md transition-all duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4">
          <button
            type="button"
            onClick={handleAddMisi}
            className="px-4 py-2 bg-blue-600 text-white rounded-md transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Tambah Misi
          </button>
        </div>
      </div>

      {/* Tombol Submit */}
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-green-500 text-white rounded-md transition-all duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default VisiMisiAdmin;
