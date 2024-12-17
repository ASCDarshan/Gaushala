import React, { useState } from "react";
import ajaxCall from "../../../helpers/ajaxCall";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const AddPregnancyRecord = ({ isOpen, onClose, onSubmitSuccess }) => {
  const { cowId } = useParams();
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const initialData = {
    cow_id: cowId,
    start_date: "",
    expected_calving_date: "",
    end_date: "",
    result: "",
    notes: "",
    veterinarian: loginInfo.accessToken.user_id,
  };

  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      if (name === "start_date" && value) {
        const startDate = new Date(value);
        const expectedCalvingDate = new Date(startDate);
        expectedCalvingDate.setDate(expectedCalvingDate.getDate() + 280);
        updatedData.expected_calving_date = expectedCalvingDate
          .toISOString()
          .split("T")[0];
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await ajaxCall(
        `cow_management/pregnancy-records/`,
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
        toast.success("Pregnancy record added successfully.");
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
        <h2 className="text-xl font-bold mb-4">Add Pregnancy Record</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected Calving Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="expected_calving_date"
                value={formData.expected_calving_date}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Result <span className="text-red-500">*</span>
              </label>
              <select
                name="result"
                onChange={handleChange}
                value={formData.result}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
              >
                <option value="">Select Result</option>
                <option value="successful">Successful</option>
                <option value="miscarriage">Miscarriage</option>
                <option value="abortion">Abortion</option>
                <option value="stillbirth">Stillbirth</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <input
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
              />
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
              {loading ? "Loading..." : "Save"}{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPregnancyRecord;
