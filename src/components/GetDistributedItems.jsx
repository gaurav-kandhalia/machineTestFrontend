import React, { useEffect, useState } from "react";
import { distributedList } from "../services/adminApi"
import { useNavigate } from "react-router-dom";
const GetDistributedItems=()=> {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // default items per page
  const navigate = useNavigate();

  const fetchItems = async (page) => {
    try {
      const { data } = await distributedList(page, limit); // ✅ use service
      setItems(data.data.items);
      setTotalPages(Math.ceil(data.data.total / limit));
    } catch (err) {
      console.error("Error fetching items", err);
    }
  };

  useEffect(() => {
    fetchItems(page);
  }, [page]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Distributed Items</h2>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Back to Dashboard
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Item</th>
            <th className="p-2 border">Notes</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Agent</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td className="p-2 border">{item.firstName}</td>
              <td className="p-2 border">{item.notes}</td>
              <td className="p-2 border">{item.phoneNumber}</td>
              <td className="p-2 border">
                {item.agentId?.name} ({item.agentId?.email})
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded mx-1"
        >
          {"<"}
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded mx-1 ${
              page === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded mx-1"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default GetDistributedItems;
