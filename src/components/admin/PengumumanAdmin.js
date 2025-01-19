import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import LoadingSpinner from "../LoadingSpinner";

const PengumumanAdmin = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPublishedDate, setNewPublishedDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch announcements from backend
  useEffect(() => {
    setIsLoading(true);
    fetch("https://smpn1tamansari-api.vercel.app/api/announcements")
      .then((response) => response.json())
      .then((data) => setAnnouncements(data))
      .finally(() => setIsLoading(false));
  }, []);

  // Handle update pengumuman
  const handleUpdatePengumuman = () => {
    const updatedAnnouncement = {
      title: selectedAnnouncement.title,
      description: selectedAnnouncement.description,
      publishedDate: selectedAnnouncement.publishedDate,
    };

    fetch(
      `https://smpn1tamansari-api.vercel.app/api/announcements/${selectedAnnouncement.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAnnouncement),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setAnnouncements(
          announcements.map((item) => (item.id === data.id ? data : item))
        );
        closeModal();
      })
      .catch((error) => {
        console.error("Error updating announcement:", error);
      });
  };

  // Handle delete pengumuman
  const handleDelete = (id) => {
    fetch(`https://smpn1tamansari-api.vercel.app/api/announcements/${id}`, {
      method: "DELETE",
    }).then(() => {
      setAnnouncements(announcements.filter((item) => item.id !== id));
    });
  };

  // Handle open modal
  const openModal = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsModalOpen(true);
  };

  // Handle close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAnnouncement(null);
  };

  // Handle create pengumuman
  const handleCreatePengumuman = () => {
    fetch("https://smpn1tamansari-api.vercel.app/api/announcements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
        publishedDate: newPublishedDate, // Already in YYYY-MM-DD
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAnnouncements([...announcements, data]);
        setNewTitle("");
        setNewDescription("");
        setNewPublishedDate("");
      })
      .catch((error) => console.error("Error creating announcement:", error));
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

        {/* Add new pengumuman form */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">
            Tambah Pengumuman
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreatePengumuman();
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Judul Pengumuman"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <textarea
              placeholder="Deskripsi Pengumuman"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              rows="4"
            />
            <input
              type="date"
              value={newPublishedDate}
              onChange={(e) => setNewPublishedDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md"
            >
              Tambah Pengumuman
            </button>
          </form>
        </div>

        {/* Pengumuman Table */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Daftar Pengumuman
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">Judul</th>
                <th className="px-4 py-2 text-left text-gray-600">Deskripsi</th>
                <th className="px-4 py-2 text-left text-gray-600">Tanggal</th>
                <th className="px-4 py-2 text-left text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((announcement) => (
                <tr
                  key={announcement.id}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="px-4 py-2">{announcement.title}</td>
                  <td className="px-4 py-2">{announcement.description}</td>
                  <td className="px-4 py-2">
                    {new Date(announcement.publishedDate).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => openModal(announcement)}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-md"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(announcement.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Edit */}
      {isModalOpen && selectedAnnouncement && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div
            className="bg-white p-8 rounded-lg w-1/2 relative"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-5 text-gray-600 text-3xl font-semibold hover:text-gray-900 transition-all"
            >
              &times;
            </button>

            <h3 className="text-3xl font-semibold text-gray-800 mb-4">
              Edit Pengumuman
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdatePengumuman();
              }}
            >
              <input
                type="text"
                placeholder="Judul Pengumuman"
                value={selectedAnnouncement.title}
                onChange={(e) =>
                  setSelectedAnnouncement({
                    ...selectedAnnouncement,
                    title: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <textarea
                value={selectedAnnouncement.description}
                onChange={(e) =>
                  setSelectedAnnouncement({
                    ...selectedAnnouncement,
                    description: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-md"
                rows="4"
              />
              <input
                type="date"
                value={selectedAnnouncement.publishedDate.split("T")[0]}
                onChange={(e) =>
                  setSelectedAnnouncement({
                    ...selectedAnnouncement,
                    publishedDate: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md"
              >
                Simpan Perubahan
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PengumumanAdmin;
