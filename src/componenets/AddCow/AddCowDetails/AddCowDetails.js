import React, { useState } from "react";
import {
  ClipboardDocumentListIcon,
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";
import AddMilkModal from "./DetailsModal/AddMilkModal";
import AddMedicalRecord from "./DetailsModal/AddMedicalRecord";
import AddPregnancyRecord from "./DetailsModal/AddPregnancyRecord";
import AddVaccinationRecord from "./DetailsModal/AddVaccinationRecord";
import { useParams } from "react-router-dom";

const AddCowDetails = () => {
  const { cowId } = useParams();
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
        <div className="flex flex-col lg:flex-row justify-between items-start mt-2">
          <h1 className="text-2xl font-display font-semibold text-neutral-800 align-middle">
            Add Cow Details for : {cowId}
          </h1>
          <div className="flex flex-wrap gap-5 align-middle">
            <button
              onClick={() => setActiveModal("milk")}
              className="p-4 bg-primary-50 rounded-lg text-primary-600 hover:bg-primary-100 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowTrendingUpIcon className="w-5 h-5" />
              Add Milk Record
            </button>

            <AddMilkModal
              isOpen={activeModal === "milk"}
              onClose={closeModal}
            />

            <button
              onClick={() => setActiveModal("medical")}
              className="p-4 bg-primary-50 rounded-lg text-primary-600 hover:bg-primary-100 transition-colors flex items-center justify-center gap-2"
            >
              <CalendarDaysIcon className="w-5 h-5" />
              Add Medical Record
            </button>

            <AddMedicalRecord
              isOpen={activeModal === "medical"}
              onClose={closeModal}
            />

            <button
              onClick={() => setActiveModal("pregnancy")}
              className="p-4 bg-primary-50 rounded-lg text-primary-600 hover:bg-primary-100 transition-colors flex items-center justify-center gap-2"
            >
              <ClipboardDocumentListIcon className="w-5 h-5" />
              Add Pregnancy Record
            </button>

            <AddPregnancyRecord
              isOpen={activeModal === "pregnancy"}
              onClose={closeModal}
            />

            <button
              onClick={() => setActiveModal("vaccination")}
              className="p-4 bg-primary-50 rounded-lg text-primary-600 hover:bg-primary-100 transition-colors flex items-center justify-center gap-2"
            >
              <ChartBarIcon className="w-5 h-5" />
              Add Vaccination Record
            </button>

            <AddVaccinationRecord
              isOpen={activeModal === "vaccination"}
              onClose={closeModal}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Cows */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">
                Milk Record
              </p>
              <p className="mt-2 text-3xl font-bold text-primary-600">{2}</p>
            </div>
            <div className="bg-primary-50 p-3 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-primary-500" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <p className="text-sm text-neutral-600">Healthy: {2}</p>
          </div>
        </div>

        {/* Today's Milk Production */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">
                Vaccination Record
              </p>
              <p className="mt-2 text-3xl font-bold text-primary-600">{2} L</p>
            </div>
            <div className="bg-primary-50 p-3 rounded-lg">
              <ArrowTrendingUpIcon className="w-6 h-6 text-primary-500" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <p className="text-sm text-neutral-600">Healthy: {2}</p>
          </div>
        </div>

        {/* Active Medical Cases */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">
                Pregnancy Record
              </p>
              <p className="mt-2 text-3xl font-bold text-primary-600">{2}</p>
            </div>
            <div className="bg-primary-50 p-3 rounded-lg">
              <BeakerIcon className="w-6 h-6 text-primary-500" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <p className="text-sm text-neutral-600">Healthy: {2}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">
                Medical Record
              </p>
              <p className="mt-2 text-3xl font-bold text-primary-600">{2}</p>
            </div>
            <div className="bg-primary-50 p-3 rounded-lg">
              <BeakerIcon className="w-6 h-6 text-primary-500" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <p className="text-sm text-neutral-600">Healthy: {2}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCowDetails;
