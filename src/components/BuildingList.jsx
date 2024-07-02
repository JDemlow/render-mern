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
                {building.buildingId}
              </div>
              <p className="text-gray-700 text-base">
                {building.streetAddress}
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
