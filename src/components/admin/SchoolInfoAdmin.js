import React, { useState, useEffect } from "react";

const SchoolInfoAdmin = () => {
  const [schoolInfo, setSchoolInfo] = useState(null);
  const [newAkreditasi, setNewAkreditasi] = useState("");
  const [newJumlahGuru, setNewJumlahGuru] = useState("");
  const [newTenagaPendidikan, setNewTenagaPendidikan] = useState("");
  const [newJumlahSiswa, setNewJumlahSiswa] = useState("");
  const [newNamaSekolah, setNewNamaSekolah] = useState("");
  const [newNSPN, setNewNSPN] = useState("");
  const [newJenjangPendidikan, setNewJenjangPendidikan] = useState("");
  const [newStatusSekolah, setNewStatusSekolah] = useState("");
  const [newAlamat, setNewAlamat] = useState("");
  const [newRtRw, setNewRtRw] = useState("");
  const [newKodePos, setNewKodePos] = useState("");
  const [newKecamatan, setNewKecamatan] = useState("");
  const [newKabKota, setNewKabKota] = useState("");
  const [newProvinsi, setNewProvinsi] = useState("");
  const [newNegara, setNewNegara] = useState("");
  const [newPosisiGeografis, setNewPosisiGeografis] = useState("");

  useEffect(() => {
    fetch("https://smpn1tamansari-api.vercel.app/api/schoolinfo")
      .then((response) => response.json())
      .then((data) => {
        setSchoolInfo(data);
        setNewAkreditasi(data.akreditasi || "");
        setNewJumlahGuru(data.jumlahGuru || "");
        setNewTenagaPendidikan(data.tenagaPendidikan || "");
        setNewJumlahSiswa(data.jumlahSiswa || "");
        setNewNamaSekolah(data.namaSekolah || "");
        setNewNSPN(data.nspn || "");
        setNewJenjangPendidikan(data.jenjangPendidikan || "");
        setNewStatusSekolah(data.statusSekolah || "");
        setNewAlamat(data.alamat || "");
        setNewRtRw(data.rtRw || "");
        setNewKodePos(data.kodePos || "");
        setNewKecamatan(data.kecamatan || "");
        setNewKabKota(data.kabKota || "");
        setNewProvinsi(data.provinsi || "");
        setNewNegara(data.negara || "");
        setNewPosisiGeografis(data.posisiGeografis || "");
      });
  }, []);

  const handleUpdateSchoolInfo = () => {
    const updatedData = {
      akreditasi: newAkreditasi,
      jumlahGuru: newJumlahGuru ? parseInt(newJumlahGuru, 10) : 0,
      tenagaPendidikan: newTenagaPendidikan
        ? parseInt(newTenagaPendidikan, 10)
        : 0,
      jumlahSiswa: newJumlahSiswa ? parseInt(newJumlahSiswa, 10) : 0,
      namaSekolah: newNamaSekolah,
      nspn: newNSPN,
      jenjangPendidikan: newJenjangPendidikan,
      statusSekolah: newStatusSekolah,
      alamat: newAlamat,
      rtRw: newRtRw,
      kodePos: newKodePos,
      kecamatan: newKecamatan,
      kabKota: newKabKota,
      provinsi: newProvinsi,
      negara: newNegara,
      posisiGeografis: newPosisiGeografis,
    };

    fetch(`https://smpn1tamansari-api.vercel.app/api/schoolinfo/${schoolInfo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        setSchoolInfo(data);
        alert("School information updated successfully");
      });
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Admin - Kelola Informasi Sekolah</h2>

        {schoolInfo && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800">
              Update School Information
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateSchoolInfo();
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Akreditasi"
                value={newAkreditasi}
                onChange={(e) => setNewAkreditasi(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="number"
                placeholder="Jumlah Guru"
                value={newJumlahGuru}
                onChange={(e) => setNewJumlahGuru(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="number"
                placeholder="Tenaga Pendidikan"
                value={newTenagaPendidikan}
                onChange={(e) => setNewTenagaPendidikan(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="number"
                placeholder="Jumlah Siswa"
                value={newJumlahSiswa}
                onChange={(e) => setNewJumlahSiswa(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Nama Sekolah"
                value={newNamaSekolah}
                onChange={(e) => setNewNamaSekolah(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="NSPN"
                value={newNSPN}
                onChange={(e) => setNewNSPN(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Jenjang Pendidikan"
                value={newJenjangPendidikan}
                onChange={(e) => setNewJenjangPendidikan(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Status Sekolah"
                value={newStatusSekolah}
                onChange={(e) => setNewStatusSekolah(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Alamat"
                value={newAlamat}
                onChange={(e) => setNewAlamat(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="RT / RW"
                value={newRtRw}
                onChange={(e) => setNewRtRw(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Kode Pos"
                value={newKodePos}
                onChange={(e) => setNewKodePos(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Kecamatan"
                value={newKecamatan}
                onChange={(e) => setNewKecamatan(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Kab/Kota"
                value={newKabKota}
                onChange={(e) => setNewKabKota(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Provinsi"
                value={newProvinsi}
                onChange={(e) => setNewProvinsi(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Negara"
                value={newNegara}
                onChange={(e) => setNewNegara(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Posisi Geografis"
                value={newPosisiGeografis}
                onChange={(e) => setNewPosisiGeografis(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md"
              >
                Update School Info
              </button>
            </form>
          </div>
        )}

        {schoolInfo && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Current School Info
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="p-4 bg-white shadow rounded-md">
                <p className="text-gray-700">
                  Akreditasi: {schoolInfo.akreditasi}
                </p>
              </div>
              <div className="p-4 bg-white shadow rounded-md">
                <p className="text-gray-700">
                  Jumlah Guru: {schoolInfo.jumlahGuru}
                </p>
              </div>
              <div className="p-4 bg-white shadow rounded-md">
                <p className="text-gray-700">
                  Jumlah Siswa: {schoolInfo.jumlahSiswa}
                </p>
              </div>
              <div className="p-4 bg-white shadow rounded-md">
                <p className="text-gray-700">
                  Nama Sekolah: {schoolInfo.namaSekolah}
                </p>
              </div>
              <div className="p-4 bg-white shadow rounded-md">
                <p className="text-gray-700">NSPN: {schoolInfo.nspn}</p>
              </div>
              <div className="p-4 bg-white shadow rounded-md">
                <p className="text-gray-700">
                  Jenjang Pendidikan: {schoolInfo.jenjangPendidikan}
                </p>
              </div>
              <div className="p-4 bg-white shadow rounded-md">
                <p className="text-gray-700">
                  Status Sekolah: {schoolInfo.statusSekolah}
                </p>
              </div>
              <div className="p-4 bg-white shadow rounded-md">
                <p className="text-gray-700">Alamat: {schoolInfo.alamat}</p>
              </div>
              <div className="p-4 bg-white shadow rounded-md">
                <p className="text-gray-700">RT/RW: {schoolInfo.rtRw}</p>
              </div>
              <div className="p-4 bg-white shadow rounded-md">
                <p className="text-gray-700">Kode Pos: {schoolInfo.kodePos}</p>
              </div>
              <div className="p-4 bg-white shadow rounded-md">
                <p className="text-gray-700">
                  Kecamatan: {schoolInfo.kecamatan}
                </p>
              </div>
              <div className="p-4 bg-white shadow rounded-md">
                <p className="text-gray-700">Kab/Kota: {schoolInfo.kabKota}</p>
              </div>
              <div className="p-4 bg-white shadow rounded-md">
                <p className="text-gray-700">Provinsi: {schoolInfo.provinsi}</p>
              </div>
              <div className="p-4 bg-white shadow rounded-md">
                <p className="text-gray-700">Negara: {schoolInfo.negara}</p>
              </div>
              <div className="p-4 bg-white shadow rounded-md">
                <p className="text-gray-700">
                  Posisi Geografis: {schoolInfo.posisiGeografis}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolInfoAdmin;
