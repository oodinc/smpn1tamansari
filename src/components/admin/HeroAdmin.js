import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";

const HeroAdmin = () => {
  const [hero, setHero] = useState(null);
  const [newWelcomeMessage, setNewWelcomeMessage] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true); // Mulai loading
    fetch("https://smpn1tamansari-api.vercel.app/api/hero")
      .then((response) => response.json())
      .then((data) => setHero(data))
      .finally(() => setIsLoading(false)); // Hentikan loading
  }, []);

  const handleUpdateHero = () => {
    const formData = new FormData();
    formData.append("welcomeMessage", newWelcomeMessage);
    formData.append("description", newDescription);
    if (newImage) formData.append("image", newImage); // Attach the new image if exists
  
    fetch(`https://smpn1tamansari-api.vercel.app/api/hero/${hero.id}`, {
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

  if (isLoading) {
    return <LoadingSpinner />; // Tampilkan spinner saat loading
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">
          Admin - Edit Bagian Hero
        </h2>

        {hero && (
          <div className="mb-8">
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
                  src={hero.image}
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
