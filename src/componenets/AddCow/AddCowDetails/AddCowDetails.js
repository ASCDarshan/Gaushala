import React, { useEffect, useState } from "react";
import {
  ClipboardDocumentListIcon,
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  BeakerIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import AddMilkModal from "./DetailsModal/AddMilkModal";
import AddMedicalRecord from "./DetailsModal/AddMedicalRecord";
import AddPregnancyRecord from "./DetailsModal/AddPregnancyRecord";
import AddVaccinationRecord from "./DetailsModal/AddVaccinationRecord";
import { useNavigate, useParams } from "react-router-dom";
import ViewMilkRecord from "./DetailsModal/ViewMilkRecord";
import CowDataTable from "../SeparateCowTable/CowDataTable";
import ViewVaccinationRecord from "./DetailsModal/ViewVaccinationRecord";
import ViewPregnancyRecord from "./DetailsModal/ViewPregnancyRecord";
import ViewMedicalRecord from "./DetailsModal/ViewMedicalRecord";
import ajaxCall from "../../helpers/ajaxCall";

const AddCowDetails = () => {
  const { cowId } = useParams();
  const navigate = useNavigate();
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const [activeModal, setActiveModal] = useState(null);

  const [isMilkModalOpen, setIsMilkModalOpen] = useState(false);
  const [isMedicalModalOpen, setIsMedicalModalOpen] = useState(false);
  const [isPregnancyModalOpen, setIsPregnancyModalOpen] = useState(false);
  const [isVaccinationModalOpen, setIsVaccinationModalOpen] = useState(false);
  const [cowName, setCowName] = useState([]);
  const [count, setCount] = useState(0);
  const closeModal = () => setActiveModal(null);

  const [data, setData] = useState({
    milkData: [],
    medicalData: [],
    pregnancyData: [],
    vaccinationData: [],
  });

  const refreshData = () => {
    setCount((prev) => prev + 1);
  };

  const fetchData = async (endpoint, key) => {
    try {
      const response = await ajaxCall(
        endpoint,
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
        const fetchedData = response?.data;
        setData((prevData) => ({
          ...prevData,
          [key]: fetchedData[key],
        }));
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
    fetchData(`milkproduction/${cowId}/`, "milk_productions");
    fetchData(`medicalrecord/${cowId}/`, "medical_records");
    fetchData(`pregnancyrecord/${cowId}/`, "pregnancy_records");
    fetchData(`vaccination/${cowId}/`, "vaccinations");
  }, [cowId, count]);

  const handleMilkopen = () => {
    setIsMilkModalOpen(true);
  };

  const handleMilkclose = () => {
    setIsMilkModalOpen(false);
  };

  const handleMedicalopen = () => {
    setIsMedicalModalOpen(true);
  };

  const handleMedicalclose = () => {
    setIsMedicalModalOpen(false);
  };

  const handlePregnancyopen = () => {
    setIsPregnancyModalOpen(true);
  };

  const handlePregnancyclose = () => {
    setIsPregnancyModalOpen(false);
  };

  const handleVaccinationopen = () => {
    setIsVaccinationModalOpen(true);
  };

  const handleVaccinationclose = () => {
    setIsVaccinationModalOpen(false);
  };

  const fetchCowName = async (url, setData) => {
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
        const data = Array.isArray(response?.data)
          ? response?.data
          : [response?.data];
        setData(data);
      } else {
        console.error("Fetch error:", response);
        setData([]);
      }
    } catch (error) {
      console.error("Network error:", error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchCowName(`cow/${cowId}/`, setCowName);
  }, [cowId]);

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="p-6 space-y-6">
      <button
        className="absolute top-6 left-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 flex items-center gap-2"
        onClick={handleBack}
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Go to Dashboard
      </button>

      <div className="h-4"></div>
      <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200 mt-16">
        <div className="flex flex-col lg:flex-row justify-between items-start mt-2">
          <h1 className="text-2xl font-display font-semibold text-neutral-800 align-middle mt-2">
            Add Cow Details For : {cowName[0]?.name}
          </h1>
          <div className="flex flex-wrap gap-5 align-middle mt-2">
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
              onSubmitSuccess={refreshData}
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
              onSubmitSuccess={refreshData}
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
              onSubmitSuccess={refreshData}
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
              onSubmitSuccess={refreshData}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">
                Milk Record
              </p>
              <p className="mt-2 text-3xl font-bold text-primary-600">
                {data?.milk_productions?.length}
              </p>
            </div>
            <div className="bg-primary-50 p-3 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-primary-500" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="px-2 py-1 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              onClick={handleMilkopen}
            >
              View Milk Record
            </button>
          </div>
          {isMilkModalOpen && (
            <ViewMilkRecord
              onClose={handleMilkclose}
              data={data.milk_productions}
            />
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">
                Vaccination Record
              </p>
              <p className="mt-2 text-3xl font-bold text-primary-600">
                {data?.vaccinations?.length}
              </p>
            </div>
            <div className="bg-primary-50 p-3 rounded-lg">
              <ArrowTrendingUpIcon className="w-6 h-6 text-primary-500" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="px-2 py-1 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              onClick={handleVaccinationopen}
            >
              View Vaccination Record
            </button>
          </div>
          {isVaccinationModalOpen && (
            <ViewVaccinationRecord
              onClose={handleVaccinationclose}
              data={data.vaccinations}
            />
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">
                Pregnancy Record
              </p>
              <p className="mt-2 text-3xl font-bold text-primary-600">
                {data?.pregnancy_records?.length}
              </p>
            </div>
            <div className="bg-primary-50 p-3 rounded-lg">
              <ClipboardDocumentListIcon className="w-6 h-6 text-primary-500" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="px-2 py-1 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              onClick={handlePregnancyopen}
            >
              View Pregnancy Record
            </button>
          </div>
          {isPregnancyModalOpen && (
            <ViewPregnancyRecord
              onClose={handlePregnancyclose}
              data={data.pregnancy_records}
            />
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">
                Medical Record
              </p>
              <p className="mt-2 text-3xl font-bold text-primary-600">
                {data?.medical_records?.length}
              </p>
            </div>
            <div className="bg-primary-50 p-3 rounded-lg">
              <BeakerIcon className="w-6 h-6 text-primary-500" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="px-2 py-1 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              onClick={handleMedicalopen}
            >
              View Medical Record
            </button>
          </div>
          {isMedicalModalOpen && (
            <ViewMedicalRecord
              onClose={handleMedicalclose}
              data={data.medical_records}
            />
          )}
        </div>
      </div>

      <CowDataTable />
    </div>
  );
};

export default AddCowDetails;
