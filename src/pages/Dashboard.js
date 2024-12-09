import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChartBarIcon,
  BeakerIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  ArrowTrendingUpIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';
import AddCowModal from '../componenets/AddCowModal';


const DashboardContent = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({
    totalCows: 0,
    milkProduction: 0,
    activeMedicalCases: 0,
    healthyCows: 0,
    pregnantCows: 0,
    upcomingVaccinations: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch dashboard statistics
  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch cows data
      const cowsResponse = await fetch('https://gocrm.one/gaushala/api/cow_management/cows/', {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      const cowsData = await cowsResponse.json();

      // Fetch milk production data
      const milkResponse = await fetch('https://gocrm.one/gaushala/api/cow_management/milk-productions/', {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      const milkData = await milkResponse.json();

      // Fetch medical records
      const medicalResponse = await fetch('https://gocrm.one/gaushala/api/cow_management/medical-records/', {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      const medicalData = await medicalResponse.json();

      // Calculate statistics
      const stats = {
        totalCows: cowsData.count || 0,
        milkProduction: milkData.results?.reduce((total, record) => total + Number(record.quantity), 0) || 0,
        activeMedicalCases: medicalData.results?.filter(record => record.status === 'active').length || 0,
        healthyCows: cowsData.results?.filter(cow => cow.status === 'healthy').length || 0,
        pregnantCows: cowsData.results?.filter(cow => cow.is_pregnant).length || 0,
        upcomingVaccinations: cowsData.results?.filter(cow => cow.next_vaccination_due).length || 0
      };

      setDashboardStats(stats);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
      setLoading(false);
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
        <div className="bg-error-50 text-error-500 p-4 rounded-lg">
          {error}
        </div>
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
        <p className="mt-2 text-neutral-600">
          Overview of your gaushala's current status and activities.
        </p>
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
              <p className="text-sm font-medium text-neutral-600">Milk Production</p>
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
              <p className="text-sm font-medium text-neutral-600">Medical Cases</p>
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
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
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
          // if you have a fetchCows function to refresh the list
      />
      {/* Add the modal component */}
     
            <button 
              onClick={() => navigate('/dashboard/milk-production/add')}
              className="p-4 bg-primary-50 rounded-lg text-primary-600 hover:bg-primary-100 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowTrendingUpIcon className="w-5 h-5" />
              Record Milk Production
            </button>
            <button 
              onClick={() => navigate('/dashboard/vaccinations')}
              className="p-4 bg-primary-50 rounded-lg text-primary-600 hover:bg-primary-100 transition-colors flex items-center justify-center gap-2"
            >
              <CalendarDaysIcon className="w-5 h-5" />
              Schedule Vaccination
            </button>
            <button 
              onClick={() => navigate('/dashboard/medical-records/add')}
              className="p-4 bg-primary-50 rounded-lg text-primary-600 hover:bg-primary-100 transition-colors flex items-center justify-center gap-2"
            >
              <ClipboardDocumentListIcon className="w-5 h-5" />
              Medical Checkup
            </button>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4">Status Overview</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
              <span className="text-neutral-600">Pregnant Cows</span>
              <span className="font-semibold text-primary-600">{dashboardStats.pregnantCows}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
              <span className="text-neutral-600">Upcoming Vaccinations</span>
              <span className="font-semibold text-primary-600">{dashboardStats.upcomingVaccinations}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
              <span className="text-neutral-600">Healthy Cows</span>
              <span className="font-semibold text-primary-600">{dashboardStats.healthyCows}</span>
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
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default DashboardContent;