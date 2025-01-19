import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";

const StaffAdmin = () => {
  const [staff, setStaff] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [newStaffName, setNewStaffName] = useState("");
  const [newStaffRole, setNewStaffRole] = useState("");
  const [newStaffImage, setNewStaffImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch staff and teachers from backend
  useEffect(() => {
    setIsLoading(true);
    fetch("https://smpn1tamansari-api.vercel.app/api/staffandteachers")
      .then((response) => response.json())
      .then((data) => setStaff(data))
      .finally(() => setIsLoading(false));
  }, []);

  // Handle create staff
  const handleAddStaff = () => {
    const formData = new FormData();
    formData.append("name", newStaffName);
    formData.append("role", newStaffRole);
    if (newStaffImage) formData.append("image", newStaffImage);

    fetch("https://smpn1tamansari-api.vercel.app/api/staffandteachers", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setStaff([...staff, data]);
        setNewStaffName("");
        setNewStaffRole("");
        setNewStaffImage(null);
      });
  };

  // Handle delete staff
  const handleDeleteStaff = (id) => {
    fetch(`https://smpn1tamansari-api.vercel.app/api/staffandteachers/${id}`, {
      method: "DELETE",
    }).then(() => {
      setStaff(staff.filter((item) => item.id !== id));
    });
  };

  // Handle update staff
  const handleUpdateStaff = () => {
    const formData = new FormData();
    formData.append("name", selectedStaff.name);
    formData.append("role", selectedStaff.role);
    if (selectedStaff.image) formData.append("image", selectedStaff.image);

    fetch(`https://smpn1tamansari-api.vercel.app/api/staffandteachers/${selectedStaff.id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setStaff(staff.map((item) => (item.id === data.id ? data : item)));
        closeModal();
      });
  };

  const openModal = (item) => {
    setSelectedStaff(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStaff(null);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">
          Admin - Kelola Staff
        </h2>

        {/* Add new staff form */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">
            Tambah Staff
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddStaff();
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Nama"
              value={newStaffName}
              onChange={(e) => setNewStaffName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              placeholder="Peran"
              value={newStaffRole}
              onChange={(e) => setNewStaffRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <input
              type="file"
              onChange={(e) => setNewStaffImage(e.target.files[0])}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-md"
            >
              Tambah Staff
            </button>
          </form>
        </div>

        {/* Staff Table */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Daftar Staff
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-800">Nama</th>
                <th className="px-4 py-2 text-left text-gray-800">Peran</th>
                <th className="px-4 py-2 text-gray-800">Gambar</th>
                <th className="px-4 py-2 text-gray-800">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((person) => (
                <tr key={person.id} className="border-t">
                  <td className="px-4 py-2">{person.name}</td>
                  <td className="px-4 py-2">{person.role}</td>
                  <td className="px-4 py-2">
                    {person.image && (
                      <img
                        src={person.image}
                        alt={person.name}
                        className="w-20 h-20 object-cover"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => openModal(person)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteStaff(person.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for editing staff */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Edit Staff</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateStaff();
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  value={selectedStaff.name}
                  onChange={(e) =>
                    setSelectedStaff({
                      ...selectedStaff,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="text"
                  value={selectedStaff.role}
                  onChange={(e) =>
                    setSelectedStaff({
                      ...selectedStaff,
                      role: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="file"
                  onChange={(e) =>
                    setSelectedStaff({
                      ...selectedStaff,
                      image: e.target.files[0],
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffAdmin;
