import React, { useEffect, useState } from "react";
import ajaxCall from "../helpers/ajaxCall";
import { useParams } from "react-router-dom";

const CowDetail = () => {
  const { cowId } = useParams();

  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const [cowsData, setCowsData] = useState([]);
  const [selectedCow, setSelectedCow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (url, setData) => {
    try {
      setIsLoading(true);
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${loginInfo?.accessToken?.access}`,
          },
          method: "GET",
        },
        8000
      );
      if (response?.status === 200) {
        const data = response?.data;
        setData(data.results);

        // Find the specific cow based on cowId
        const found = data.results.find((cow) => cow.id === parseInt(cowId));
        setSelectedCow(found);
      } else {
        setError("Failed to fetch cow data");
        console.error("Fetch error:", response);
      }
    } catch (error) {
      setError("Network error occurred");
      console.error("Network error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(`cow_management/cows/`, setCowsData);
  }, [cowId]);

  // Render card for a specific detail
  const DetailCard = ({ title, value }) => (
    <div className="bg-sky-50 shadow-md rounded-lg p-4 m-2 w-full md:w-[calc(25%-1rem)] min-h-[150px] flex flex-col justify-between">
      <h3 className="text-primary-600 font-semibold text-lg">{title}</h3>
      <p className="text-neutral-800 text-2xl font-bold">{value || "N/A"}</p>
    </div>
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-error-500 text-2xl">{error}</div>
      </div>
    );
  }

  // No cow found state
  if (!selectedCow) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-error-500 text-2xl">No cow found with this ID</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-display font-bold text-primary-700 mb-8 text-center">
        Cow Details
      </h1>

      {/* First Row of Details */}
      <div className="flex flex-wrap justify-center mb-6">
        <DetailCard title="Name" value={selectedCow.name} />
        <DetailCard title="Breed" value={selectedCow.breed} />
        <DetailCard title="Gender" value={selectedCow.gender} />
        <DetailCard title="Status" value={selectedCow.status} />
      </div>

      {/* Second Row of Details */}
      <div className="flex flex-wrap justify-center mb-6">
        <DetailCard title="Tag Number" value={selectedCow.tag_number} />
        <DetailCard title="Color" value={selectedCow.color} />
        <DetailCard
          title="Weight"
          value={`${selectedCow.weight || "N/A"} kg`}
        />
        <DetailCard title="Acquisition" value={selectedCow.acquisition_type} />
      </div>

      {/* Third Row of Details */}
      <div className="flex flex-wrap justify-center">
        <DetailCard title="Date of Birth" value={selectedCow.date_of_birth} />
        <DetailCard
          title="Entered Gaushala"
          value={selectedCow.date_entered_gaushala}
        />
        <DetailCard
          title="Pregnancy Count"
          value={selectedCow.pregnancy_count}
        />
        <DetailCard
          title="Vaccination Count"
          value={selectedCow.vaccination_count}
        />
      </div>
    </div>
  );
};

export default CowDetail;
