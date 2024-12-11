import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import ajaxCall from "../helpers/ajaxCall";

const STEPS = [
  {
    id: 1,
    title: "Basic Details",
    description: "Enter basic information about the cow",
  },
  {
    id: 2,
    title: "Location",
    description: "Specify where the cow is housed",
  },
  {
    id: 3,
    title: "Health",
    description: "Add health and medical details",
  },
  {
    id: 4,
    title: "Additional Info",
    description: "Add any additional information",
  },
];

const AddCowModal = ({ isOpen, onClose, fetchCows }) => {
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const [currentStep, setCurrentStep] = useState(1);
  const [parentageData, setParentageData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    tag_number: "",
    gender: "",
    breed: "",
    color: "",
    date_of_birth: "",
    rfid_tag: "",
    weight: "",

    registration_number: "",
    purchase_date: "",
    purchase_price: "",
    mother: null,
    father: null,
    acquisition_type: "",
    pasture_area: "",
    shed_number: "",

    status: "",
    notes: "",
    last_vaccination_date: "",
    next_vaccination_due: "",
    last_medical_checkup: "",
    medical_notes: "",

    date_entered_gaushala: "",
    block_number: "",
    last_breeding_date: "",
    is_pregnant: false,
    breeding_notes: "",
    image: null,
  });

  const fetchparentageData = async (url, setData) => {
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${loginInfo?.accessToken?.access}`,
          },
          method: "GET",
        },
        8000
      );
      if (response?.status === 200) {
        setData(response?.data?.results || []);
        return response.data;
      } else {
        console.error("Fetch error:", response);
        return null;
      }
    } catch (error) {
      console.error("Network error:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchparentageData("cow_management/cows/", setParentageData);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files : type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataSend = new FormData();

    formDataSend.append("name", formData.name);
    formDataSend.append("tag_number", formData.tag_number);
    formDataSend.append("gender", formData.gender);
    formDataSend.append("breed", formData.breed);
    formDataSend.append("color", formData.color);
    formDataSend.append("date_of_birth", formData.date_of_birth);
    formDataSend.append("rfid_tag", formData.rfid_tag);
    formDataSend.append("weight", formData.weight);
    formDataSend.append("registration_number", formData.registration_number);
    formDataSend.append("purchase_date", formData.purchase_date);
    formDataSend.append("purchase_price", formData.purchase_price);
    formDataSend.append("mother", formData.mother);
    formDataSend.append("father", formData.father);
    formDataSend.append("acquisition_type", formData.acquisition_type);
    formDataSend.append("pasture_area", formData.pasture_area);
    formDataSend.append("shed_number", formData.shed_number);
    formDataSend.append("status", formData.status);
    formDataSend.append("notes", formData.notes);
    formDataSend.append(
      "last_vaccination_date",
      formData.last_vaccination_date
    );
    formDataSend.append("next_vaccination_due", formData.next_vaccination_due);
    formDataSend.append("last_medical_checkup", formData.last_medical_checkup);
    formDataSend.append("medical_notes", formData.medical_notes);
    formDataSend.append(
      "date_entered_gaushala",
      formData.date_entered_gaushala
    );
    formDataSend.append("block_number", formData.block_number);
    formDataSend.append("last_breeding_date", formData.last_breeding_date);
    formDataSend.append("is_pregnant", formData.is_pregnant);
    formDataSend.append("breeding_notes", formData.breeding_notes);
    formDataSend.append("image", formData.image);

    try {
      const response = await ajaxCall(
        "cow_management/cows/",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${loginInfo?.accessToken?.access}`,
          },
          method: "POST",
          body: formDataSend,
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        toast.success("Post Created Successfully");
      } else if (response?.status === 400) {
        const errorMessage = await response.json();
        toast.error(errorMessage?.detail || "Please Add Content");
      } else {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Some Problem Occurred. Please try again.");
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {STEPS.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center
                  ${
                    currentStep === step.id
                      ? "border-blue-500 bg-blue-50 text-blue-500"
                      : currentStep > step.id
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-gray-300 text-gray-300"
                  }`}
              >
                {currentStep > step.id ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  currentStep >= step.id ? "text-blue-500" : "text-gray-400"
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={`flex-1 h-px mx-4 ${
                  currentStep > step.id ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-xl font-bold text-gray-900">
          {STEPS[currentStep - 1].title}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {STEPS[currentStep - 1].description}
        </p>
      </div>
    </div>
  );

  const renderBasicDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
          placeholder="Enter cow's name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tag Number<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="tag_number"
          required
          value={formData.tag_number}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
          placeholder="Enter tag number"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gender<span className="text-red-500">*</span>
        </label>
        <select
          name="gender"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
        >
          <option value="">select gender</option>
          <option value="F">Female</option>
          <option value="M">Male</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Breed
        </label>
        <input
          type="text"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
          placeholder="Enter breed"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
          placeholder="Enter Date of Birth"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Color <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
          placeholder="Enter color"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          RFID Tag <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="rfid_tag"
          value={formData.rfid_tag}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Weight <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
        />
      </div>
    </div>
  );

  const renderLocationDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Registration Number
        </label>
        <input
          type="text"
          name="registration_number"
          required
          value={formData.registration_number}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
          placeholder="Enter Registration Number"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Purchase Date
        </label>
        <input
          type="date"
          name="purchase_date"
          value={formData.purchase_date}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Purchase Price
        </label>
        <input
          type="number"
          name="purchase_price"
          value={formData.purchase_price}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
          placeholder="Enter Purchase Price"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Acquisition Type <span className="text-red-500">*</span>
        </label>
        <select
          name="acquisition_type"
          required
          value={formData.acquisition_type}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
        >
          <option value="">select acquisition type</option>
          <option value="bought">Bought</option>
          <option value="donated">Donated</option>
          <option value="born_in_gaushala">Born in Gaushala</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mother
        </label>
        <select
          name="mother"
          value={formData.mother}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
        >
          {parentageData.map((cow) => (
            <option key={cow.id} value={cow.id}>
              {cow.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Father
        </label>
        <select
          name="father"
          value={formData.father}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
        >
          {parentageData.map((cow) => (
            <option key={cow.id} value={cow.id}>
              {cow.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pasture Area
        </label>
        <input
          type="text"
          name="pasture_area"
          value={formData.pasture_area}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Shed Number
        </label>
        <input
          type="text"
          name="shed_number"
          value={formData.shed_number}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
        />
      </div>
    </div>
  );

  const renderHealthDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status <span className="text-red-500">*</span>
        </label>
        <select
          name="status"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
        >
          <option value="">select status</option>
          <option value="healthy">Healthy</option>
          <option value="sick">Sick</option>
          <option value="pragnant">Pregnant</option>
          <option value="lacatating">Lactating</option>
          <option value="dry">Dry</option>
          <option value="sold">Sold</option>
          <option value="deceased">Deceased</option>
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Last Vaccination Date
        </label>
        <input
          type="date"
          name="last_vaccination_date"
          value={formData.last_vaccination_date}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Next Vaccination Date
        </label>
        <input
          type="date"
          name="next_vaccination_due"
          value={formData.next_vaccination_due}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Last medical checkup
        </label>
        <input
          type="date"
          name="last_medical_checkup"
          value={formData.last_medical_checkup}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Medical Notes
        </label>
        <input
          type="text"
          name="medical_notes"
          value={formData.medical_notes}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
        />
      </div>
    </div>
  );

  const renderAdditionalDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date Entered Gaushala
        </label>
        <input
          type="date"
          name="date_entered_gaushala"
          value={formData.date_entered_gaushala}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Block Number
        </label>
        <input
          type="number"
          name="block_number"
          value={formData.block_number}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Last Breeding Date
        </label>
        <input
          type="date"
          name="last_breeding_date"
          value={formData.last_breeding_date}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Breeding Notes
        </label>
        <input
          type="text"
          name="breeding_notes"
          value={formData.breeding_notes}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pregnant
        </label>
        <input
          type="checkbox"
          name="is_pregnant"
          checked={formData.is_pregnant}
          onChange={(e) =>
            handleChange({
              target: { name: e.target.name, value: e.target.checked },
            })
          }
          className="rounded border-gray-300 text-blue-500 focus:ring-blue-500 transition duration-150"
        />
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderBasicDetails();
      case 2:
        return renderLocationDetails();
      case 3:
        return renderHealthDetails();
      case 4:
        return renderAdditionalDetails();
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-start overflow-y-auto z-50">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl m-4 p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Form content */}
        <div className="mt-4">
          {renderStepIndicator()}

          <form className="mt-8 space-y-6">
            {renderStepContent()}

            {/* Navigation buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg text-sm font-medium ${
                  currentStep === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Previous Step
              </button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  Step {currentStep} of {STEPS.length}
                </span>
                <button
                  type="button"
                  onClick={
                    currentStep === STEPS.length ? handleSubmit : handleNext
                  }
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {currentStep === STEPS.length ? "Submit" : "Next Step"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCowModal;
