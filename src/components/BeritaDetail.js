import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get the dynamic route parameter
import { AiOutlineCalendar } from "react-icons/ai";

const BeritaDetail = () => {
  const { id } = useParams(); // Get the news ID from URL
  const [beritaDetail, setBeritaDetail] = useState(null);

  // Fetch berita detail based on ID
  useEffect(() => {
    const fetchBeritaDetail = () => {
      fetch(`http://localhost:5000/api/news/${id}`)
        .then((response) => response.json())
        .then((data) => setBeritaDetail(data))
        .catch((error) => {
          console.error("Error fetching berita detail:", error);
        });
    };

    fetchBeritaDetail();
  }, [id]); // Rerun effect when the ID changes

  if (!beritaDetail) return <div>Loading...</div>;

  const imageUrl = `http://localhost:5000${beritaDetail.image}`;
  const publishedDate = new Date(beritaDetail.publishedAt).toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Title Section */}
          <div className="text-gray-800 p-4">
            <h1 className="text-3xl font-bold">{beritaDetail.title}</h1>
          </div>

          {/* Image Section */}
          <div className="relative overflow-hidden">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={beritaDetail.title}
                className="object-cover w-full h-[500px] transition-transform duration-300 hover:scale-105"
              />
            )}
          </div>

          {/* Content Section */}
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <AiOutlineCalendar className="text-blue-500" />
                <span>{publishedDate}</span>
              </div>
            </div>

            <div
              className="text-lg text-gray-800 leading-relaxed quill-description"
              dangerouslySetInnerHTML={{ __html: beritaDetail.description }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeritaDetail;
