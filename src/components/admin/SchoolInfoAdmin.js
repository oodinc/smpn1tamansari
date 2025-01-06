import React, { useState, useEffect } from "react";
import axios from "axios";

const InfoSekolahAdmin = () => {
  const [formData, setFormData] = useState({
    akreditasi: "",
    jumlahGuru: "",
    tenagaPendidikan: "",
    jumlahSiswa: "",
    namaSekolah: "",
    nspn: "",
    jenjangPendidikan: "",
    statusSekolah: "",
    alamat: "",
    rtRw: "",
    kodePos: "",
    kecamatan: "",
    kabKota: "",
    provinsi: "",
    negara: "",
    posisiGeografis: "",
  });

  useEffect(() => {
    const fetchInfoSekolah = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/info");
        setFormData(response.data.schoolInfo);
      } catch (error) {
        console.error("Kesalahan mengambil Informasi Sekolah:", error);
      }
    };

    fetchInfoSekolah();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put("http://localhost:5000/admin/info", formData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Informasi Sekolah berhasil diperbarui!");
    } catch (error) {
      console.error("Kesalahan memperbarui Informasi Sekolah:", error);
      alert("Gagal memperbarui Informasi Sekolah.");
    }
  };

  // Daftar kunci untuk ditampilkan dalam formulir
  const visibleFields = [
    "akreditasi",
    "jumlahGuru",
    "tenagaPendidikan",
    "jumlahSiswa",
    "namaSekolah",
    "nspn",
    "jenjangPendidikan",
    "statusSekolah",
    "alamat",
    "rtRw",
    "kodePos",
    "kecamatan",
    "kabKota",
    "provinsi",
    "negara",
    "posisiGeografis",
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Edit Informasi Sekolah</h2>
      <form onSubmit={handleSubmit}>
        {/* Tabel untuk menampilkan kolom formulir */}
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-sm">
          <table className="min-w-full table-auto text-gray-700">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-4 text-left font-medium text-gray-600">Kolom</th>
                <th className="px-6 py-4 text-left font-medium text-gray-600">Nilai</th>
              </tr>
            </thead>
            <tbody>
              {visibleFields.map((key) => (
                <tr key={key} className="border-t">
                  <td className="px-6 py-4 text-gray-600">{key}</td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`Masukkan ${key}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="submit"
          className="mt-4 bg-green-500 text-white px-6 py-3 rounded-md transition-all duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default InfoSekolahAdmin;
