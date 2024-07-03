import React from "react";
import { Link } from "react-router-dom";

const HomeCards = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto">
        <div className="grid w-5/6 gap-8 mx-auto md:grid-cols-2">
          <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-black">
              For Residents
            </h2>
            <p className="mb-4 text-gray-700">
              Browse our list and edit your building
            </p>
            <Link to="/all-buildings">
              <button className="px-4 py-2 text-white bg-black rounded hover:bg-slate-700">
                View All Buildings
              </button>
            </Link>
          </div>
          <div className="p-6 bg-blue-100 rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-black">
              For Administrators
            </h2>
            <p className="mb-4 text-gray-700">Log in to view your profile</p>
            <button className="px-4 py-2 text-white rounded bg-emerald-500 hover:bg-emerald-700">
              Log In
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCards;
