import React, { useState } from "react";
import { useFile } from "../contexts/fileContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { distributeItems } from "../services/adminApi";

const DistributeItems=()=> {
  const { filePath } = useFile();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  if (!filePath) return null; // only show if file uploaded

  const handleDistribute = async () => {
    try {
const { data } = await distributeItems(filePath);
      setMessage(data.message);
      navigate("/distributed-items");
    } catch (err) {
      setMessage(err.response?.data?.message || "Distribution failed");
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleDistribute}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Distribute Items
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}

export default DistributeItems;
