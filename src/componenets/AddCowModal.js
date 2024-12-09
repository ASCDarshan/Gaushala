import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const STEPS = [
  {
    id: 1,
    title: 'Basic Details',
    description: 'Enter basic information about the cow'
  },
  {
    id: 2,
    title: 'Location',
    description: 'Specify where the cow is housed'
  },
  {
    id: 3,
    title: 'Health',
    description: 'Add health and medical details'
  },
  {
    id: 4,
    title: 'Additional Info',
    description: 'Add any additional information'
  }
];

const AddCowModal = ({ isOpen, onClose, fetchCows }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    tag_number: '',
    rfid_tag: '',
    registration_number: '',
    gender: 'F',
    date_of_birth: '',
    breed: '',
    color: '',
    weight: '',
    acquisition_type: 'donated',
    purchase_date: '',
    purchase_price: '',
    date_entered_gaushala: '',
    status: 'healthy',
    notes: '',
    shed_number: '',
    block_number: '',
    pasture_area: '',
    last_vaccination_date: '',
    next_vaccination_due: '',
    last_medical_checkup: '',
    medical_notes: '',
    is_pregnant: false,
    last_breeding_date: '',
    breeding_notes: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {STEPS.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center
                  ${currentStep === step.id 
                    ? 'border-blue-500 bg-blue-50 text-blue-500' 
                    : currentStep > step.id
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-gray-300 text-gray-300'
                  }`}
              >
                {currentStep > step.id ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </div>
              <span className={`mt-2 text-xs font-medium ${
                currentStep >= step.id ? 'text-blue-500' : 'text-gray-400'
              }`}>
                {step.title}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-4 ${
                currentStep > step.id ? 'bg-blue-500' : 'bg-gray-300'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <h2 className="text-xl font-bold text-gray-900">{STEPS[currentStep - 1].title}</h2>
        <p className="mt-1 text-sm text-gray-500">{STEPS[currentStep - 1].description}</p>
      </div>
    </div>
  );

  const renderBasicDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          Name<span className="text-red-500">*</span>
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
          Gender<span className="text-red-500">*</span>
        </label>
        <select
          name="gender"
          required
          value={formData.gender}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition duration-150"
        >
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

      {/* Add more basic fields as needed */}
    </div>
  );

  const renderLocationDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Location fields */}
    </div>
  );

  const renderHealthDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Health fields */}
    </div>
  );

  const renderAdditionalDetails = () => (
    <div className="grid grid-cols-1 gap-6">
      {/* Additional fields */}
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
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
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
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
                  onClick={currentStep === STEPS.length ? undefined : handleNext}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {currentStep === STEPS.length ? 'Submit' : 'Next Step'}
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