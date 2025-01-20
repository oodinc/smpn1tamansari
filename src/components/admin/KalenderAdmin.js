import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";

const KalenderAdmin = () => {
  const [kalender, setKalender] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newFile, setNewFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false); // Untuk status loading saat update

  useEffect(() => {
    setIsLoading(true); // Mulai loading saat pengambilan data
    fetch("https://smpn1tamansari-api.vercel.app/api/kalender")
      .then((response) => response.json())
      .then((data) => {
        setKalender(data[0]);
        setNewTitle(data[0]?.title || "");
      })
      .finally(() => setIsLoading(false)); // Berhenti loading setelah data diterima
  }, []);

  const handleUpdateKalender = () => {
    const formData = new FormData();
    formData.append("title", newTitle);
    if (newFile) formData.append("file", newFile);

    setIsUpdating(true); // Mulai loading saat mengupdate

    fetch(`https://smpn1tamansari-api.vercel.app/api/kalender/${kalender.id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setKalender(data);
        setNewTitle("");
        setNewFile(null);
      })
      .finally(() => setIsUpdating(false)); // Berhenti loading setelah mengupdate
  };

  const handleFileChange = (e) => {
    setNewFile(e.target.files[0]);
  };

  if (isLoading || isUpdating) {
    return (
      <div className="fixed inset-0 bg-gray-100 flex justify-center items-center z-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">
          Admin - Kalender Pendidikan
        </h2>

        {kalender && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800">
              Perbarui Kalender Pendidikan
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateKalender();
              }}
              className="space-y-4"
            >
              <label className="block text-gray-700 font-medium">
                Judul Kalender Pendidikan
              </label>
              <input
                type="text"
                placeholder="Judul"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <label className="block text-gray-700 font-medium">
                Unggah File Kalender Baru
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md"
              >
                Perbarui Kalender
              </button>
            </form>
          </div>
        )}

        {kalender && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Kalender Pendidikan Saat Ini
            </h3>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-3xl font-bold">{kalender.title}</h4>
              {kalender.file && (
                <div className="mt-4">
                  <a
                    href={kalender.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Lihat Kalender
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KalenderAdmin;
