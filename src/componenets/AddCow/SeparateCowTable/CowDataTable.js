import React, { useEffect, useState } from "react";
import ajaxCall from "../../helpers/ajaxCall";
import { AgGridReact } from "ag-grid-react";
import { useParams } from "react-router-dom";

const CowDataTable = () => {
  const { cowId } = useParams();
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const [rowData, setRowData] = useState([]);

  const columnDefs = [
    {
      field: "name",
      headerName: "Name",
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "tag_number",
      headerName: "Tag Number",
      sortable: true,
      filter: true,
      width: 140,
    },
    {
      field: "rfid_tag",
      headerName: "RFID Tag",
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "gender",
      headerName: "Gender",
      sortable: true,
      filter: true,
      width: 100,
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
      field: "shed_number",
      headerName: "Shed",
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "acquisition_type",
      headerName: "Acquisition Type",
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "block_number",
      headerName: "Block Number",
      sortable: true,
      filter: true,
      width: 130,
    },
    {
      field: "breeding_notes",
      headerName: "Breeding notes",
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "date_entered_gaushala",
      headerName: "Date entered gaushala",
      sortable: true,
      filter: true,
      width: 130,
    },
    {
      field: "father",
      headerName: "Father",
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "mother",
      headerName: "Mother",
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "pasture_area",
      headerName: "Pasture Area",
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "medical_notes",
      headerName: "Medical notes",
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "notes",
      headerName: "Notes",
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "pasture_area",
      headerName: "Postal Area",
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "purchase_date",
      headerName: "Purchase Date",
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "purchase_price",
      headerName: "Purchase Price",
      sortable: true,
      filter: true,
      width: 120,
    },
  ];

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
    fetchData(`cow/${cowId}/`, setRowData);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow ">
      <div
        className="ag-theme-alpine w-full"
        style={{ height: "calc(100vh - 200vh)", minHeight: "300px" }}
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
          pagination={false}
          suppressPaginationPanel={true}
          overlayLoadingTemplate={
            '<span class="ag-overlay-loading-center">Loading...</span>'
          }
          overlayNoRowsTemplate={
            '<span class="ag-overlay-no-rows-center">No cows found</span>'
          }
        />
      </div>
    </div>
  );
};

export default CowDataTable;
