import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChartBarIcon,
  BeakerIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import AddCowModal from "../componenets/AddCow/AddCowModal";
import ajaxCall from "../componenets/helpers/ajaxCall";
import CowManagement from "../componenets/AddCow/CowManagement";

const DashboardContent = () => {
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [cowsData, setCowsData] = useState([]);
  const [milkProductionData, setMilkProductionData] = useState([]);
  const [medicalData, setmedicalRecordsData] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalCows: 0,
    milkProduction: 0,
    activeMedicalCases: 0,
    healthyCows: 0,
    pregnantCows: 0,
    upcomingVaccinations: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async (url, setData) => {
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
        setData(response?.data || []);
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

  const fetchDashboardStats = async () => {
    try {
      const cowsDataResponse = await fetchData(
        "cow_management/cows/",
        setCowsData
      );
      const milkProductionResponse = await fetchData(
        "cow_management/milk-productions/",
        setMilkProductionData
      );
      const medicalRecordsResponse = await fetchData(
        "cow_management/medical-records/",
        setmedicalRecordsData
      );

      if (cowsData && milkProductionData && medicalData) {
        const stats = {
          totalCows: cowsDataResponse.count || 0,
          milkProduction:
            milkProductionResponse?.results?.reduce(
              (total, record) => total + Number(record.amount),
              0
            ) || 0,
          activeMedicalCases:
            medicalRecordsResponse?.results?.filter(
              (record) => record.status === "active"
            ).length || 0,
          healthyCows:
            cowsDataResponse?.results?.filter((cow) => cow.status === "healthy")
              .length || 0,
          pregnantCows:
            cowsDataResponse?.results?.filter((cow) => cow.is_pregnant)
              .length || 0,
          upcomingVaccinations:
            cowsDataResponse?.results?.filter((cow) => cow.next_vaccination_due)
              .length || 0,
        };

        setDashboardStats(stats);
        setLoading(false);
      } else {
        setError("Failed to fetch dashboard data");
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setError("An error occurred while refreshing data");
    }
  };

  useEffect(() => {
    fetchDashboardStats();
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchDashboardStats, 300000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="bg-error-50 text-error-500 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
        <h1 className="text-2xl font-display font-semibold text-neutral-800">
          Welcome to Gaushala Management System
        </h1>
        <div className="flex flex-col lg:flex-row justify-between items-start mt-2">
          <p className="text-neutral-600 mb-4 lg:mb-0">
            Overview of your gaushala's current status and activities.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="p-4 bg-primary-50 rounded-lg text-primary-600 hover:bg-primary-100 transition-colors flex items-center justify-center gap-2"
            >
              <PlusCircleIcon className="w-5 h-5" />
              Add New Cow
            </button>

            {/* Add the modal component */}
            <AddCowModal
              isOpen={isAddModalOpen}
              onClose={() => setIsAddModalOpen(false)}
            />

            <button
              onClick={() => navigate("/dashboard/milk-production/add")}
              className="p-4 bg-primary-50 rounded-lg text-primary-600 hover:bg-primary-100 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowTrendingUpIcon className="w-5 h-5" />
              Record Milk Production
            </button>
            <button
              onClick={() => navigate("/dashboard/vaccinations")}
              className="p-4 bg-primary-50 rounded-lg text-primary-600 hover:bg-primary-100 transition-colors flex items-center justify-center gap-2"
            >
              <CalendarDaysIcon className="w-5 h-5" />
              Schedule Vaccination
            </button>
            <button
              onClick={() => navigate("/dashboard/medical-records/add")}
              className="p-4 bg-primary-50 rounded-lg text-primary-600 hover:bg-primary-100 transition-colors flex items-center justify-center gap-2"
            >
              <ClipboardDocumentListIcon className="w-5 h-5" />
              Medical Checkup
            </button>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Cows */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Cows</p>
              <p className="mt-2 text-3xl font-bold text-primary-600">
                {dashboardStats.totalCows}
              </p>
            </div>
            <div className="bg-primary-50 p-3 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-primary-500" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-neutral-600">
              Healthy: {dashboardStats.healthyCows}
            </p>
          </div>
        </div>

        {/* Today's Milk Production */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">
                Milk Production
              </p>
              <p className="mt-2 text-3xl font-bold text-primary-600">
                {dashboardStats.milkProduction} L
              </p>
            </div>
            <div className="bg-primary-50 p-3 rounded-lg">
              <ArrowTrendingUpIcon className="w-6 h-6 text-primary-500" />
            </div>
          </div>
          <div className="mt-4 text-sm text-neutral-600">
            Today's total production
          </div>
        </div>

        {/* Active Medical Cases */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">
                Medical Cases
              </p>
              <p className="mt-2 text-3xl font-bold text-primary-600">
                {dashboardStats.activeMedicalCases}
              </p>
            </div>
            <div className="bg-primary-50 p-3 rounded-lg">
              <BeakerIcon className="w-6 h-6 text-primary-500" />
            </div>
          </div>
          <div className="mt-4 text-sm text-neutral-600">
            Active cases requiring attention
          </div>
        </div>
      </div>

      {/* Additional Stats & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Additional Stats */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4">
            Status Overview
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
              <span className="text-neutral-600">Pregnant Cows</span>
              <span className="font-semibold text-primary-600">
                {dashboardStats.pregnantCows}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
              <span className="text-neutral-600">Upcoming Vaccinations</span>
              <span className="font-semibold text-primary-600">
                {dashboardStats.upcomingVaccinations}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
              <span className="text-neutral-600">Healthy Cows</span>
              <span className="font-semibold text-primary-600">
                {dashboardStats.healthyCows}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="flex justify-end">
        <button
          onClick={fetchDashboardStats}
          className="text-neutral-600 hover:text-primary-600 text-sm flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh Data
        </button>
      </div>

      <CowManagement />
    </div>
  );
};

export default DashboardContent;
