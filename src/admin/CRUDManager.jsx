// CrudManager.jsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Modal from "./Modal";

// ✅ Use API base from environment
const API_BASE = process.env.REACT_APP_API_BASE;

export default function CrudManager({
  endpoint,
  readOnly,
  single,
  headers,
  FormComponent,
}) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const timeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const showMessage = (text, type = "success", duration = 3000) => {
    setMessage({ text, type });
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => setMessage({ text: "", type: "" }),
      duration
    );
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}${endpoint}`, { headers });
      const itemsData = single ? [data || {}] : data || [];
      setItems(itemsData);
    } catch {
      setItems([]);
      showMessage("Failed to fetch data", "error");
    } finally {
      setLoading(false);
    }
  }, [endpoint, headers, single]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async (formData) => {
    try {
      if (single) {
        await axios.put(`${API_BASE}${endpoint}`, formData, { headers });
      } else if (editing?._id) {
        await axios.put(`${API_BASE}${endpoint}/${editing._id}`, formData, {
          headers,
        });
      } else {
        await axios.post(`${API_BASE}${endpoint}`, formData, { headers });
      }

      setEditing(null);
      fetchData();
      showMessage("Saved successfully!", "success");
    } catch {
      showMessage("Failed to save data", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      await axios.delete(`${API_BASE}${endpoint}/${id}`, { headers });
      fetchData();
      showMessage("Deleted successfully!", "success");
    } catch {
      showMessage("Failed to delete data", "error");
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="space-y-4">
      {message.text && (
        <div
          className={`p-3 rounded-xl font-medium ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {message.text}
        </div>
      )}

      {!single && (
        <button
          onClick={() => setEditing({})}
          className="mb-4 px-6 py-2 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition shadow"
        >
          + Add New
        </button>
      )}

      {/* Dashboard cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 flex flex-col justify-between max-h-96 overflow-hidden"
          >
            <DashboardCard item={item} />
            {!readOnly && (
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setEditing(item)}
                  className="px-4 py-1 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 transition shadow"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-4 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition shadow"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal for add/edit */}
      {editing && FormComponent && (
        <Modal isOpen={!!editing} onClose={() => setEditing(null)}>
          <div className="flex flex-col flex-1">
            <FormComponent
              data={editing}
              onSave={handleSave}
              onCancel={() => setEditing(null)}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

// Dashboard card with scrollable content and truncation
function DashboardCard({ item }) {
  return (
    <div className="space-y-3 overflow-hidden flex-1">
      {Object.entries(item)
        .filter(
          ([key]) => !["_id", "__v", "createdAt", "updatedAt"].includes(key)
        )
        .map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <span className="text-gray-500 dark:text-gray-400 text-sm truncate">
              {key}
            </span>
            {Array.isArray(value) ? (
              <div className="flex flex-wrap gap-1 mt-1 max-h-20 overflow-y-auto">
                {value.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200 px-2 py-0.5 rounded-full text-xs truncate"
                    title={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : key.toLowerCase().includes("proficiency") ? (
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${value}%` }}
                ></div>
              </div>
            ) : (
              <span
                className="text-gray-800 dark:text-gray-200 mt-1 truncate break-words max-h-20 overflow-hidden"
                title={
                  typeof value === "object" ? JSON.stringify(value) : value
                }
              >
                {typeof value === "object" ? JSON.stringify(value) : value}
              </span>
            )}
          </div>
        ))}
    </div>
  );
}
