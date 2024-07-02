import React, { useState, useEffect } from "react";

function BuildingsList() {
  const [buildings, setBuildings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [buildingsPerPage] = useState(10); // Number of buildings per page

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/buildings/?page=${currentPage}&limit=${buildingsPerPage}`
        );
        const data = await response.json();
        setBuildings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBuildings();
  }, [currentPage, buildingsPerPage]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex flex-col items-center pt-8">
      <h2 className="text-2xl font-bold mb-4">Buildings List</h2>
      {Array.isArray(buildings) ? (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {buildings.map((building) => (
            <li
              key={building._id}
              className="bg-white shadow-md rounded-lg p-6 mb-4"
            >
              <div className="font-bold text-xl mb-2">
                Building ID: {building.buildingId}
              </div>
              <p className="text-gray-700 text-base">
                Street Address: {building.streetAddress}
              </p>
              <p className="text-gray-700 text-base">
                Building Size: {building.buildingSize || "No size information"}
              </p>
              <p className="text-gray-700 text-base">
                Property Use 1st: {building.propertyUse1st || "N/A"}
              </p>
              <p className="text-gray-700 text-base">
                Property Use 2nd: {building.propertyUse2nd || "N/A"}
              </p>
              <p className="text-gray-700 text-base">
                Property Use 3rd: {building.propertyUse3rd || "N/A"}
              </p>
              <p className="text-gray-700 text-base">
                Benchmarking Status: {building.benchmarkingStatus || "N/A"}
              </p>
              <p className="text-gray-700 text-base">
                Current Site EUI: {building.currentSiteEUI || "N/A"}
              </p>
              <p className="text-gray-700 text-base">
                Baseline 2019 EUI: {building.baseline2019EUI || "N/A"}
              </p>
              <p className="text-gray-700 text-base">
                1st Target 2025 EUI: {building.firstTarget2025EUI || "N/A"}
              </p>
              <p className="text-gray-700 text-base">
                2nd Target 2027 EUI: {building.secondTarget2027EUI || "N/A"}
              </p>
              <p className="text-gray-700 text-base">
                Final Target 2030 EUI: {building.finalTarget2030EUI || "N/A"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
      <div>
        <button
          className="mr-2 border-2 p-2"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <button className="border-2 p-2" onClick={nextPage}>
          Next Page
        </button>
      </div>
    </div>
  );
}

export default BuildingsList;
