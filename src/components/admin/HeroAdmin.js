import React, { useState, useEffect } from "react";

const HeroAdmin = () => {
  const [hero, setHero] = useState(null);
  const [newWelcomeMessage, setNewWelcomeMessage] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/hero")
      .then((response) => response.json())
      .then((data) => {
        setHero(data);
        setNewWelcomeMessage(data.welcomeMessage || "");
        setNewDescription(data.description || "");
      });
  }, []);

  const handleUpdateHero = () => {
    const formData = new FormData();
    formData.append("welcomeMessage", newWelcomeMessage);
    formData.append("description", newDescription);
    if (newImage) formData.append("image", newImage); // Attach the new image if exists
  
    fetch(`http://localhost:5000/api/hero/${hero.id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setHero(data); // Update the state with the new data
        setNewWelcomeMessage("");
        setNewDescription("");
        setNewImage(null); // Reset the form
      })
      .catch((error) => {
        console.error("Error updating hero:", error); // Log errors
      });
  };  

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">
          Admin - Edit Bagian Hero
        </h2>

        {hero && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800">
              Update Hero Section
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateHero();
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Welcome Message"
                value={newWelcomeMessage}
                onChange={(e) => setNewWelcomeMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <textarea
                placeholder="Description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                rows="4"
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
                Update Hero
              </button>
            </form>
          </div>
        )}

        {hero && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Current Hero Section
            </h3>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-3xl font-bold">{hero.welcomeMessage}</h4>
              <p className="mt-4 text-xl">{hero.description}</p>
              {hero.image && (
                <img
                  src={`http://localhost:5000${hero.image}`}
                  alt="Hero"
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

export default HeroAdmin;
