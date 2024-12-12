import React, { useState } from "react";
import ajaxCall from "../../../helpers/ajaxCall";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const AddVaccinationRecord = ({ isOpen, onClose }) => {
  const { cowId } = useParams();
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const initialData = {
    cow_id: cowId,
    vaccine_name: "",
    vaccination_date: "",
    administered_by: "",
    notes: "",
  };

  const [formData, setFormData] = useState(initialData);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ajaxCall(
        `cow_management/vaccinations/`,
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
        toast.success("Vaccination record added successfully.");
        setFormData(initialData);
        onClose();
      } else {
        toast.error("Some problem occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Some problem occurred. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-1/2">
        <h2 className="text-xl font-bold mb-4">Add Vaccination Record</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vaccine Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="vaccine_name"
                value={formData.vaccine_name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vaccination Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="vaccination_date"
                value={formData.vaccination_date}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Addministered By <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="administered_by"
                value={formData.administered_by}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
              />
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
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVaccinationRecord;
