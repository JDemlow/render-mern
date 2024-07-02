import React from "react";
import { useParams } from "react-router-dom";

const BuildingDetail = () => {
  const { id } = useParams();
  return <div>Building Detail for ID: {id}</div>;
};

export default BuildingDetail;
