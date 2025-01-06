import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineCalendar,
  AiOutlineEdit,
} from "react-icons/ai";

const BeritaDetail = () => {
  const { id } = useParams();
  const [beritaDetail, setBeritaDetail] = useState(null);

  useEffect(() => {
    const fetchBeritaDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/admin/berita/${id}`
        );
        setBeritaDetail(response.data);
      } catch (error) {
        console.error("Error fetching berita detail:", error);
      }
    };

    fetchBeritaDetail();
  }, [id]);

  if (!beritaDetail) return <div>Loading...</div>;

  const imageUrl = `http://localhost:5000${beritaDetail.image}`;
  const publishedDate = new Date(beritaDetail.publishedAt).toLocaleString();
  const modifiedDate = beritaDetail.updatedAt
    ? new Date(beritaDetail.updatedAt).toLocaleString()
    : "-";

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
                <AiOutlineUser className="text-blue-500" />
                <span>{beritaDetail.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <AiOutlineCalendar className="text-blue-500" />
                <span>{publishedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <AiOutlineEdit className="text-blue-500" />
                <span>{modifiedDate}</span>
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
