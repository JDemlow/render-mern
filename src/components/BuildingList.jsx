import React, { useState, useEffect } from "react";

function BuildingsList() {
  const [buildings, setBuildings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [buildingsPerPage] = useState(10); // Number of buildings per page
  const [expandedAddresses, setExpandedAddresses] = useState({});

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

  const toggleAddress = (id) => {
    setExpandedAddresses((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-center">Buildings List</h1>
      {Array.isArray(buildings) ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {buildings.map((building) => (
            <div
              key={building._id}
              className="relative bg-white shadow-md rounded-xl"
            >
              <div className="p-4">
                <div className="mb-6">
                  <div className="my-2 text-gray-600">
                    Building ID: {building.buildingId}
                  </div>
                  <h3
                    className="text-xl font-bold cursor-pointer"
                    onClick={() => toggleAddress(building._id)}
                  >
                    Street Address:{" "}
                    <span>
                      {expandedAddresses[building._id]
                        ? building.streetAddress
                        : `${building.streetAddress.slice(0, 12)}`}
                      {!expandedAddresses[building._id] &&
                        building.streetAddress.length > 12 && (
                          <span className="text-gray-400">...</span>
                        )}
                    </span>
                  </h3>
                </div>
                <div className="mb-5">
                  Building Size:{" "}
                  {building.buildingSize || "No size information"}
                </div>
                <div className="mb-5">
                  Property Use 1st: {building.propertyUse1st || "N/A"}
                </div>
                <div className="mb-5">
                  Property Use 2nd: {building.propertyUse2nd || "N/A"}
                </div>
                <div className="mb-5">
                  Property Use 3rd: {building.propertyUse3rd || "N/A"}
                </div>
                <div className="mb-5">
                  Benchmarking Status: {building.benchmarkingStatus || "N/A"}
                </div>
                <div className="mb-5">
                  Current Site EUI: {building.currentSiteEUI || "N/A"}
                </div>
                <div className="mb-5">
                  Baseline 2019 EUI: {building.baseline2019EUI || "N/A"}
                </div>
                <div className="mb-5">
                  1st Target 2025 EUI: {building.firstTarget2025EUI || "N/A"}
                </div>
                <div className="mb-5">
                  2nd Target 2027 EUI: {building.secondTarget2027EUI || "N/A"}
                </div>
                <div className="mb-5">
                  Final Target 2030 EUI: {building.finalTarget2030EUI || "N/A"}
                </div>
                <div className="flex justify-left">
                  <button className="px-6 py-3 mt-4 text-lg text-white rounded-lg bg-emerald-500 hover:bg-emerald-600">
                    Show Building
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="flex flex-col items-center justify-center pt-2">
        <div className="flex flex-col items-center justify-center space-y-2 place-items-center">
          <div>
            <button
              onClick={nextPage}
              className="px-6 py-3 mt-4 text-lg text-white rounded-lg bg-emerald-500 hover:bg-emerald-600"
            >
              Show More Buildings
            </button>
          </div>
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="p-3 mt-4 text-lg text-white rounded-lg md:px-6 md:py-3 md:mt-4 bg-emerald-500 hover:bg-emerald-600"
            >
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuildingsList;
