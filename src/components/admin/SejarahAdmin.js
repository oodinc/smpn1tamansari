import React, { useState, useEffect, useRef } from "react";
import LoadingSpinner from "../LoadingSpinner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const SejarahAdmin = () => {
  const [sejarah, setSejarah] = useState(null);
  const [newText, setNewText] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const quillRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://smpn1tamansari-api.vercel.app/api/sejarah")
      .then((response) => response.json())
      .then((data) => {
        setSejarah(data);
        setNewText(data.text || "");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleUpdateSejarah = () => {
    setIsUpdating(true);
    const formData = new FormData();
    formData.append("text", newText);
    if (newImage) formData.append("image", newImage);

    fetch(`https://smpn1tamansari-api.vercel.app/api/sejarah/${sejarah.id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setSejarah(data);
        setNewText("");
        setNewImage(null);
      })
      .finally(() => setIsUpdating(false));
  };

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleTextChange = (value) => {
    setNewText(value);
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
          Admin - Edit Sejarah
        </h2>

        {sejarah && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800">
              Update Seksi Sejarah
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateSejarah();
              }}
              className="space-y-4"
            >
              <label className="block text-gray-600">Teks Sejarah</label>
              <div>
                <ReactQuill
                  ref={quillRef}
                  value={newText}
                  onChange={handleTextChange}
                  theme="snow"
                  placeholder="Masukkan Teks Sejarah"
                />
              </div>

              <label className="block text-gray-600">Gambar Sejarah</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md"
              >
                Perbarui Sejarah
              </button>
            </form>
          </div>
        )}

        {sejarah && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Bagian Sejarah Saat Ini
            </h3>
            <div className="bg-white p-6 rounded-lg shadow-md">
              {sejarah.image && (
                <img
                  src={sejarah.image}
                  alt="Sejarah"
                  className="mt-4 w-64 h-64 object-cover"
                />
              )}
              <div
                className="text-lg text-gray-800 leading-relaxed quill-description"
                dangerouslySetInnerHTML={{ __html: sejarah.text }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SejarahAdmin;
