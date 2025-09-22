import React, { useState } from "react";
import axios from "axios";
import { useFile } from "../contexts/fileContext";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "../services/adminApi";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { setFilePath } = useFile();
  const navigate = useNavigate();


  const validateFile = (file) => {
    const allowedTypes = [
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (!allowedTypes.includes(file.type)) {
      return "Only CSV, XLSX, XLS formats are allowed.";
    }
    if (file.size > 5 * 1024 * 1024) {
      return "File size should not exceed 5 MB.";
    }
    return null;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    processFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    processFile(droppedFile);
  };

  const processFile = (selectedFile) => {
    if (selectedFile) {
      const validationError = validateFile(selectedFile);
      if (validationError) {
        setError(validationError);
        setFile(null);
      } else {
        setError(null);
        setFile(selectedFile);
      }
    }
  };

  const handleUpload = async () => {
    console.log("file...............",file)
    if (!file) {
      setError("Please select a file.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await uploadFile(formData);
      setSuccess(data.message);
      setFilePath(data.data.file); 
    } catch (err) {
      setError(err.response?.data?.message || "File upload failed");
    }
  };

  return (
    <div className="p-6 border rounded shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-3 text-center">Upload File</h2>

      {/* Drag & Drop Area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-400 rounded-md p-6 text-center cursor-pointer hover:border-blue-500"
        onClick={() => document.getElementById("fileInput").click()}
      >
        {file ? (
          <p className="text-green-600 font-medium">{file.name}</p>
        ) : (
          <p className="text-gray-500">
            Drag & drop file here, or <span className="text-blue-600">browse</span>
          </p>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        id="fileInput"
        type="file"
        onChange={handleFileChange}
        accept=".csv,.xlsx,.xls"
        className="hidden"
      />

      <p className="text-sm text-gray-600 mt-2">
        Only CSV, XLSX, XLS formats supported. Max size: 5 MB
      </p>

      {/* Error & Success messages */}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Upload
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gray-600 text-white px-4 py-2 rounded w-full"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default UploadFile;

