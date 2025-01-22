import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";

const Profile = () => {
  const [headmasterMessage, setHeadmasterMessage] = useState([]);
  const [sejarah, setSejarah] = useState([]);
  const [visiMisi, setVisiMisi] = useState({ visi: "", misi: [] });
  const [schoolInfo, setSchoolInfo] = useState(null);
  const [strukturOrganisasi, setStrukturOrganisasi] = useState([]);
  const [staffAndTeachers, setStaffAndTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(
        "https://smpn1tamansari-api.vercel.app/api/headmaster-message"
      ).then((res) => res.json()),
      fetch("https://smpn1tamansari-api.vercel.app/api/sejarah").then((res) =>
        res.json()
      ),
      fetch("https://smpn1tamansari-api.vercel.app/api/visi-misi").then((res) =>
        res.json()
      ),
      fetch("https://smpn1tamansari-api.vercel.app/api/schoolinfo").then(
        (res) => res.json()
      ),
      fetch(
        "https://smpn1tamansari-api.vercel.app/api/strukturOrganisasi"
      ).then((res) => res.json()),
      fetch("https://smpn1tamansari-api.vercel.app/api/staffandteachers").then(
        (res) => res.json()
      ),
    ])
      .then(
        ([
          headmasterData,
          sejarahData,
          visiMisiData,
          schoolInfoData,
          strukturData,
          staffData,
        ]) => {
          setHeadmasterMessage(headmasterData);
          setSejarah(sejarahData);
          setVisiMisi(visiMisiData);
          setSchoolInfo(schoolInfoData);
          setStrukturOrganisasi(strukturData);
          setStaffAndTeachers(staffData);
        }
      )
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-100 flex justify-center items-center z-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      {/* Sambutan Kepala Sekolah Section */}
      <div id="sambutan" className="bg-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <section>
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 tracking-wide">
              Sambutan Kepala Sekolah
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              {/* Teks Sambutan */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="bg-white p-10 rounded-xl shadow-2xl border border-gray-200"
              >
                <p className="text-lg leading-relaxed text-gray-700">
                  {headmasterMessage.message}
                </p>
                <div
                  className="text-lg leading-relaxed text-gray-700 leading-relaxed quill-description"
                  dangerouslySetInnerHTML={{
                    __html: headmasterMessage.description,
                  }}
                />
                <div className="mt-5 text-gray-500 text-sm">
                  <span>- Kepala Sekolah SMPN 1 Tamansari Satu Atap</span>
                </div>
              </motion.div>

              {/* Gambar Kepala Sekolah */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="flex justify-center"
              >
                <div className="relative group">
                  <img
                    src={headmasterMessage.image}
                    alt="Kepala Sekolah"
                    className="w-auto h-96 object-cover rounded-xl shadow-lg"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  {/* Nama Kepala Sekolah */}
                  <div className="absolute bottom-4 left-4 text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span>{headmasterMessage.headmasterName}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>

      {/* Sejarah Section */}
      <div id="sejarah" className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <section>
            <h2 className="text-4xl font-semibold text-center mb-12 text-gray-800">
              Sejarah
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="bg-white p-10 rounded-lg shadow-2xl border border-gray-200"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Ikon Sejarah */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="flex justify-center md:w-1/3"
                >
                  <div className="bg-gray-100 shadow-lg">
                    <img src={sejarah.image} alt="Sejarah" />
                  </div>
                </motion.div>

                {/* Teks Sejarah */}
                <div
                  className="text-lg text-gray-700 md:w-2/3 leading-relaxed quill-description"
                  dangerouslySetInnerHTML={{ __html: sejarah.text }}
                />
              </div>
            </motion.div>
          </section>
        </div>
      </div>

      {/* Visi Misi Section */}
      <div id="visi-misi" className="bg-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <section>
            <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">
              Visi & Misi
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-gray-800">Visi</h3>
              <p className="text-lg text-gray-700 mt-4">{visiMisi.visi}</p>
              <h3 className="text-2xl font-semibold text-gray-800 mt-8">
                Misi
              </h3>
              <ol className="list-decimal pl-6 text-lg text-gray-700 mt-4">
                {visiMisi.misi.map((item, index) => (
                  <li key={index} className="mb-2">
                    {item}
                  </li>
                ))}
              </ol>
            </motion.div>
          </section>
        </div>
      </div>

      {/* Informasi Sekolah Section */}
      <div id="informasi" className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          {schoolInfo ? (
            <section>
              <h2 className="text-4xl font-semibold text-center mb-12 text-gray-800">
                Informasi Sekolah
              </h2>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <h3 className="text-xl text-gray-800">Akreditasi</h3>
                    <p className="text-5xl font-bold text-gray-700">
                      {schoolInfo.akreditasi}
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl text-gray-800">Jumlah Guru</h3>
                    <p className="text-5xl font-bold text-gray-700">
                      {schoolInfo.jumlahGuru}
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl text-gray-800">Tenaga Pendidikan</h3>
                    <p className="text-5xl font-bold text-gray-700">
                      {schoolInfo.tenagaPendidikan}
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl text-gray-800">Jumlah Siswa</h3>
                    <p className="text-5xl font-bold text-gray-700">
                      {schoolInfo.jumlahSiswa}
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="mt-4 bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
                  Identitas Sekolah
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Side Right: School Info */}
                  <div className="text-lg text-gray-700 space-y-6 border-gray-300 pr-8">
                    <ul className="space-y-4">
                      <li className="border-b border-gray-200 pb-4">
                        <strong className="font-semibold text-gray-800">
                          Nama Sekolah:{" "}
                        </strong>
                        <span className="text-gray-600">
                          {schoolInfo.namaSekolah}
                        </span>
                      </li>
                      <li className="border-b border-gray-200 pb-4">
                        <strong className="font-semibold text-gray-800">
                          NSPN:{" "}
                        </strong>
                        <span className="text-gray-600">{schoolInfo.nspn}</span>
                      </li>
                      <li className="border-b border-gray-200 pb-4">
                        <strong className="font-semibold text-gray-800">
                          Jenjang Pendidikan:{" "}
                        </strong>
                        <span className="text-gray-600">
                          {schoolInfo.jenjangPendidikan}
                        </span>
                      </li>
                      <li className="border-b border-gray-200 pb-4">
                        <strong className="font-semibold text-gray-800">
                          Status Sekolah:{" "}
                        </strong>
                        <span className="text-gray-600">
                          {schoolInfo.statusSekolah}
                        </span>
                      </li>
                      <li className="border-b border-gray-200 pb-4">
                        <strong className="font-semibold text-gray-800">
                          Alamat:{" "}
                        </strong>
                        <span className="text-gray-600">
                          {schoolInfo.alamat}
                        </span>
                      </li>
                      <li>
                        <strong className="font-semibold text-gray-800">
                          RT / RW:{" "}
                        </strong>
                        <span className="text-gray-600">{schoolInfo.rtRw}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Side Left: Address Info */}
                  <div className="text-lg text-gray-700 space-y-6 pl-8">
                    <ul className="space-y-4">
                      <li className="border-b border-gray-200 pb-4">
                        <strong className="font-semibold text-gray-800">
                          Kode Pos:{" "}
                        </strong>
                        <span className="text-gray-600">
                          {schoolInfo.kodePos}
                        </span>
                      </li>
                      <li className="border-b border-gray-200 pb-4">
                        <strong className="font-semibold text-gray-800">
                          Kecamatan:{" "}
                        </strong>
                        <span className="text-gray-600">
                          {schoolInfo.kecamatan}
                        </span>
                      </li>
                      <li className="border-b border-gray-200 pb-4">
                        <strong className="font-semibold text-gray-800">
                          Kab/Kota:{" "}
                        </strong>
                        <span className="text-gray-600">
                          {schoolInfo.kabKota}
                        </span>
                      </li>
                      <li className="border-b border-gray-200 pb-4">
                        <strong className="font-semibold text-gray-800">
                          Provinsi:{" "}
                        </strong>
                        <span className="text-gray-600">
                          {schoolInfo.provinsi}
                        </span>
                      </li>
                      <li className="border-b border-gray-200 pb-4">
                        <strong className="font-semibold text-gray-800">
                          Negara:{" "}
                        </strong>
                        <span className="text-gray-600">
                          {schoolInfo.negara}
                        </span>
                      </li>
                      <li>
                        <strong className="font-semibold text-gray-800">
                          Posisi Geografis:{" "}
                        </strong>
                        <span className="text-gray-600">
                          {schoolInfo.posisiGeografis}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

      {/* Struktur Organisasi Section */}
      <div
        id="struktur"
        className="bg-gradient-to-r from-grey-50 to-grey-100 py-24"
      >
        <div className="max-w-7xl mx-auto px-4">
          <section>
            <h2 className="text-4xl font-bold text-center mb-12 text-grey-800">
              Struktur Organisasi
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="bg-white p-12 rounded-xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
            >
              {/* Diagram Hierarki */}
              <div className="flex flex-col items-center gap-10">
                {/* Kepala Sekolah */}
                {strukturOrganisasi
                  .filter((item) => item.role === "Kepala Sekolah")
                  .map((item) => (
                    <div key={item._id} className="text-center">
                      <div className="relative inline-block">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-28 h-28 rounded-full border-4 border-grey-400 object-cover shadow-lg hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-grey-800 mt-2">
                        {item.name}
                      </h3>
                      <p className="text-grey-600 text-lg">{item.role}</p>
                    </div>
                  ))}

                <div className="flex flex-wrap justify-center gap-12 md:gap-12">
                  {strukturOrganisasi
                    .filter((item) => item.role === "Koor. TAS")
                    .map((item) => (
                      <div key={item._id} className="text-center">
                        <div className="relative inline-block">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 rounded-full border-4 border-grey-400 object-cover shadow-lg hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-grey-800 mt-2">
                          {item.name}
                        </h3>
                        <p className="text-grey-600">{item.role}</p>
                      </div>
                    ))}

                  {strukturOrganisasi
                    .filter((item) => item.role === "Wakasek 1")
                    .map((item) => (
                      <div key={item._id} className="text-center">
                        <div className="relative inline-block">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 rounded-full border-4 border-grey-400 object-cover shadow-lg hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-grey-800 mt-2">
                          {item.name}
                        </h3>
                        <p className="text-grey-600">{item.role}</p>
                      </div>
                    ))}

                  {strukturOrganisasi
                    .filter((item) => item.role === "Wakasek 2")
                    .map((item) => (
                      <div key={item._id} className="text-center">
                        <div className="relative inline-block">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 rounded-full border-4 border-grey-400 object-cover shadow-lg hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-grey-800 mt-2">
                          {item.name}
                        </h3>
                        <p className="text-grey-600">{item.role}</p>
                      </div>
                    ))}

                  {strukturOrganisasi
                    .filter((item) => item.role === "Ketua Komite")
                    .map((item) => (
                      <div key={item._id} className="text-center">
                        <div className="relative inline-block">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 rounded-full border-4 border-grey-400 object-cover shadow-lg hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-grey-800 mt-2">
                          {item.name}
                        </h3>
                        <p className="text-grey-600">{item.role}</p>
                      </div>
                    ))}
                </div>

                <div className="flex flex-wrap justify-center gap-12 md:gap-12">
                  {strukturOrganisasi
                    .filter((item) => item.role === "Urusan Humas")
                    .map((item) => (
                      <div key={item._id} className="text-center">
                        <div className="relative inline-block">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 rounded-full border-4 border-grey-400 object-cover shadow-lg hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-grey-800 mt-2">
                          {item.name}
                        </h3>
                        <p className="text-grey-600">{item.role}</p>
                      </div>
                    ))}

                  {strukturOrganisasi
                    .filter((item) => item.role === "Urusan Kesiswaan")
                    .map((item) => (
                      <div key={item._id} className="text-center">
                        <div className="relative inline-block">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 rounded-full border-4 border-grey-400 object-cover shadow-lg hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-grey-800 mt-2">
                          {item.name}
                        </h3>
                        <p className="text-grey-600">{item.role}</p>
                      </div>
                    ))}

                  {strukturOrganisasi
                    .filter((item) => item.role === "Urusan Kurikulum")
                    .map((item) => (
                      <div key={item._id} className="text-center">
                        <div className="relative inline-block">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 rounded-full border-4 border-grey-400 object-cover shadow-lg hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-grey-800 mt-2">
                          {item.name}
                        </h3>
                        <p className="text-grey-600">{item.role}</p>
                      </div>
                    ))}

                  {strukturOrganisasi
                    .filter((item) => item.role === "Urusan Sarpras")
                    .map((item) => (
                      <div key={item._id} className="text-center">
                        <div className="relative inline-block">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 rounded-full border-4 border-grey-400 object-cover shadow-lg hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-grey-800 mt-2">
                          {item.name}
                        </h3>
                        <p className="text-grey-600">{item.role}</p>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </div>

      {/* Staff dan Guru Section */}
      <div id="staff-guru" className="bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">
          <section>
            <h2 className="text-4xl font-semibold text-center mb-10 text-gray-800">
              Staff dan Guru
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {staffAndTeachers.map((guru, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition duration-300"
                >
                  <div className="relative w-full h-48 mb-4">
                    <img
                      src={guru.image}
                      alt={guru.name}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-center text-gray-800">
                    {guru.name}
                  </h3>
                  <p className="text-center text-gray-600">{guru.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
