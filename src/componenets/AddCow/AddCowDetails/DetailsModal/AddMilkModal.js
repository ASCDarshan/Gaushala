import React, { useState } from "react";
import ajaxCall from "../../../helpers/ajaxCall";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const AddMilkModal = ({ isOpen, onClose, onSubmitSuccess }) => {
  const { cowId } = useParams();
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

  const getCurrentMilkingTime = () => {
    const currentHour = new Date().getHours();
    return currentHour >= 4 && currentHour < 12 ? "morning" : "evening";
  };

  const initialData = {
    cow_id: cowId,
    date: new Date().toISOString().split("T")[0],
    shed_number: "",
    amount: "",
    milking_time: getCurrentMilkingTime(),
    fat_content: "4",
    notes: "",
    price_per_liter: "",
    total_price: "",
    collected_by: loginInfo.accessToken.user_id,
  };

  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await ajaxCall(
        `cow_management/milk-productions/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginInfo?.accessToken?.access}`,
          },
          body: JSON.stringify(formData),
        },
        8000
      );

      if ([200, 201].includes(response.status)) {
        toast.success("Milk record added successfully.");
        onSubmitSuccess();
        setFormData(initialData);
        onClose();
      } else {
        toast.error("Some problem occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Some problem occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-1/2">
        <h2 className="text-xl font-bold mb-4">Add Milk Record</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Milk Quantity (liters)
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Milking Time
              </label>
              <select
                name="milking_time"
                value={formData.milking_time}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
              >
                <option value="morning">Morning</option>
                <option value="evening">Evening</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fat Content (%)
              </label>
              <input
                type="number"
                name="fat_content"
                value={formData.fat_content}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-md"
              disabled={loading}
            >
              {loading ? "Loading..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMilkModal;
