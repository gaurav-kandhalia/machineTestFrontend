import React from "react";
import Button from "./form/Button";
import { useNavigate } from "react-router-dom";
import UploadFile from "./AddFile";
import DistributeItems from "./DistributeItems";

const  Dashboard=()=> {
  const navigate = useNavigate();

  const goToCreateAgent = () => {
    navigate("/createAgent");
  };

  const goToDistributedList = () => {
    navigate("/distributed-items");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Dashboard</h1>

     
      <UploadFile />

     
      <DistributeItems />

      {/* Actions */}
      <div className="mt-6 flex gap-4">
        <Button onClick={goToCreateAgent} children={"Create Agent"} />
        <Button onClick={goToDistributedList} children={"Distributed List"} />
      </div>
    </div>
  );
}

export default Dashboard;
