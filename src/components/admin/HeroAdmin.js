import React, { useState, useEffect } from "react";
import axios from "axios";

const HeroAdmin = () => {
  const [hero, setHero] = useState({
    welcomeMessage: "",
    description: "",
    image: "",
  });
  const [formData, setFormData] = useState({
    welcomeMessage: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/hero");
        setHero(response.data.hero); // Menetapkan data hero awal
        setFormData(response.data.hero); // Menetapkan data form awal
      } catch (error) {
        console.error("Kesalahan mengambil data hero:", error);
      }
    };
    fetchHero();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleUpdate = async () => {
    try {
      const form = new FormData();
      form.append("welcomeMessage", formData.welcomeMessage);
      form.append("description", formData.description);
      if (formData.image) {
        form.append("image", formData.image);
      }

      await axios.put("http://localhost:5000/admin/hero", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setHero(formData); // Memperbarui status hero setelah pengiriman
      alert("Bagian Hero berhasil diperbarui!");
    } catch (error) {
      console.error("Kesalahan memperbarui bagian hero:", error);
    }
  };

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
      <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">
        Admin - Edit Bagian Hero
      </h2>
      {/* Formulir Edit Hero */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Edit Bagian Hero</h3>
        <input
          type="text"
          name="welcomeMessage"
          value={formData.welcomeMessage}
          onChange={handleInputChange}
          placeholder="Pesan Selamat Datang"
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
          onChange={handleFileChange}
          className="p-3 border border-gray-300 rounded-md mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleUpdate}
          className="px-6 py-3 bg-blue-600 text-white rounded-md transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Perbarui Bagian Hero
        </button>
      </div>

      {/* Tabel Bagian Hero */}
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-sm mt-8">
        <table className="min-w-full table-auto text-gray-700">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-4 text-left font-medium text-gray-600">
                Pesan Selamat Datang
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">
                Deskripsi
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">
                Gambar
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-6 py-4">{hero.welcomeMessage}</td>
              <td className="px-6 py-4">{hero.description}</td>
              <td className="px-6 py-4">
                {hero.image && (
                  <img
                    src={hero.image}
                    alt="Hero"
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

export default HeroAdmin;
