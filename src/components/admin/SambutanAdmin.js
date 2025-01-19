import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";

const SambutanAdmin = () => {
  const [headmasterMessage, setHeadmasterMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newHeadmasterName, setNewHeadmasterName] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://smpn1tamansari-api.vercel.app/api/headmaster-message")
      .then((response) => response.json())
      .then((data) => {
        setHeadmasterMessage(data);
        setNewMessage(data.message || "");
        setNewDescription(data.description || "");
        setNewHeadmasterName(data.headmasterName || "");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleUpdateHeadmasterMessage = (e) => {
    e.preventDefault();
    if (headmasterMessage && headmasterMessage.id) {
      const formData = new FormData();
      formData.append("message", newMessage);
      formData.append("description", newDescription);
      formData.append("headmasterName", newHeadmasterName);
      if (newImage) formData.append("image", newImage);

      fetch(
        `https://smpn1tamansari-api.vercel.app/api/headmaster-message/${headmasterMessage.id}`,
        {
          method: "PUT",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setHeadmasterMessage(data);
          setNewMessage("");
          setNewDescription("");
          setNewHeadmasterName("");
          setNewImage(null);
        })
        .catch((error) =>
          console.error("Error updating headmaster message:", error)
        );
    }
  };

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  if (isLoading) {
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
          Admin - Kelola Pengumuman Sekolah
        </h2>

        {headmasterMessage && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800">
              Update Sambutan Kepala Sekolah
            </h3>
            <form
              onSubmit={handleUpdateHeadmasterMessage}
              className="space-y-4"
            >
              <textarea
                placeholder="Sambutan"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                rows="4"
                required
              />
              <textarea
                placeholder="Deskripsi"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                rows="4"
                required
              />
              <input
                type="text"
                placeholder="Nama Kepala Sekolah"
                value={newHeadmasterName}
                onChange={(e) => setNewHeadmasterName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md"
              >
                Update Sambutan
              </button>
            </form>
          </div>
        )}

        {headmasterMessage && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Current Sambutan Kepala Sekolah
            </h3>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-3xl font-bold">
                {headmasterMessage.message}
              </h4>
              <p className="mt-4 text-xl">{headmasterMessage.description}</p>
              <p className="mt-2 text-lg font-medium">
                {headmasterMessage.headmasterName}
              </p>
              {headmasterMessage.image && (
                <img
                  src={headmasterMessage.image}
                  alt="Kepala Sekolah"
                  className="mt-4 w-64 h-64 object-cover"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SambutanAdmin;
