import React, { useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import AddCowModal from "../componenets/AddCow/AddCowModal";

const CowManagement = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCows, setTotalCows] = useState(0);
  const [pageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Complete column definitions with all fields
  const columnDefs = [
    {
      field: "tag_number",
      headerName: "Tag Number",
      sortable: true,
      filter: true,
      pinned: "left",
      width: 120,
      cellClass: "font-medium",
    },
    {
      field: "name",
      headerName: "Name",
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "registration_number",
      headerName: "Registration No.",
      sortable: true,
      filter: true,
      width: 140,
    },
    {
      field: "status",
      headerName: "Status",
      sortable: true,
      filter: true,
      width: 120,
      cellRenderer: (params) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            params.value === "healthy"
              ? "bg-green-100 text-green-800"
              : params.value === "sick"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {params.value?.charAt(0).toUpperCase() + params.value?.slice(1)}
        </span>
      ),
    },
    {
      field: "gender",
      headerName: "Gender",
      sortable: true,
      filter: true,
      width: 100,
      valueFormatter: (params) => (params.value === "F" ? "Female" : "Male"),
    },
    {
      field: "breed",
      headerName: "Breed",
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "color",
      headerName: "Color",
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      field: "weight",
      headerName: "Weight (kg)",
      sortable: true,
      filter: true,
      width: 120,
      valueFormatter: (params) => (params.value ? `${params.value} kg` : ""),
    },
    {
      field: "date_of_birth",
      headerName: "Date of Birth",
      sortable: true,
      filter: true,
      width: 130,
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "",
    },
    {
      field: "acquisition_type",
      headerName: "Acquisition",
      sortable: true,
      filter: true,
      width: 120,
      valueFormatter: (params) =>
        params.value?.charAt(0).toUpperCase() + params.value?.slice(1),
    },
    {
      field: "purchase_date",
      headerName: "Purchase Date",
      sortable: true,
      filter: true,
      width: 130,
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "",
    },
    {
      field: "date_entered_gaushala",
      headerName: "Entry Date",
      sortable: true,
      filter: true,
      width: 130,
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "",
    },
    {
      field: "shed_number",
      headerName: "Shed",
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      field: "block_number",
      headerName: "Block",
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      field: "vaccination_count",
      headerName: "Vaccinations",
      sortable: true,
      width: 120,
      type: "numericColumn",
    },
    {
      field: "medical_record_count",
      headerName: "Medical Records",
      sortable: true,
      width: 140,
      type: "numericColumn",
    },
    {
      field: "pregnancy_count",
      headerName: "Pregnancies",
      sortable: true,
      width: 120,
      type: "numericColumn",
    },
    {
      headerName: "Actions",
      pinned: "right",
      sortable: false,
      filter: false,
      width: 120,
      cellRenderer: (params) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(params.data)}
            className="px-3 py-1 text-xs bg-cornflower text-white rounded hover:bg-cornflower-dark"
          >
            Edit
          </button>
          <button
            onClick={() => handleView(params.data)}
            className="px-3 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            View
          </button>
        </div>
      ),
    },
  ];

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const fetchCows = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      let url = `https://gocrm.one/gaushala/api/cow_management/cows/?page=${currentPage}&page_size=${pageSize}`;
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cows");
      }

      const data = await response.json();
      setRowData(data.results);
      setTotalCows(data.count);
    } catch (err) {
      console.error("Error fetching cows:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, searchQuery]);

  useEffect(() => {
    fetchCows();
  }, [fetchCows]);

  const handleEdit = (cow) => {
    console.log("Edit cow:", cow);
  };

  const handleView = (cow) => {
    console.log("View cow:", cow);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
    fetchCows();
  };

  const totalPages = Math.ceil(totalCows / pageSize);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Cow Management</h2>
          <p className="mt-1 text-sm text-gray-600">Total Cows: {totalCows}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cows..."
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cornflower focus:border-cornflower"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-cornflower text-white rounded-lg hover:bg-cornflower-dark"
            >
              Search
            </button>
          </form>

          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-cornflower text-white rounded-lg hover:bg-cornflower-dark"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add New Cow
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              onClick={() => fetchCows()}
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div
          className="ag-theme-alpine w-full"
          style={{ height: "calc(100vh - 300px)", minHeight: "500px" }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{
              resizable: true,
              sortable: true,
              filter: true,
              floatingFilter: true,
            }}
            enableCellTextSelection={true}
            animateRows={true}
            rowSelection="multiple"
            pagination={false} // We're handling pagination manually
            suppressPaginationPanel={true}
            loadingOverlayComponent={() => (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cornflower"></div>
              </div>
            )}
            loadingOverlayComponentParams={{
              loadingMessage: "Loading cows...",
            }}
            overlayLoadingTemplate={
              '<span class="ag-overlay-loading-center">Loading...</span>'
            }
            overlayNoRowsTemplate={
              '<span class="ag-overlay-no-rows-center">No cows found</span>'
            }
          />
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Showing {(currentPage - 1) * pageSize + 1} to{" "}
              {Math.min(currentPage * pageSize, totalCows)} of {totalCows} cows
            </span>
            <div className="flex items-center gap-2">
              <button
                className="px-4 py-2 text-sm bg-gray-100 rounded-lg disabled:opacity-50 hover:bg-gray-200"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-4 py-2 text-sm bg-gray-100 rounded-lg disabled:opacity-50 hover:bg-gray-200"
                disabled={currentPage >= totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddCowModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        fetchCows={fetchCows}
      />
    </div>
  );
};

export default CowManagement;
