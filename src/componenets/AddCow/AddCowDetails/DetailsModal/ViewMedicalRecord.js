import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ViewMedicalRecord = ({ onClose, data }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-neutral-700">
            Medical Record
          </h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="mt-6 overflow-x-auto">
          {data.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b pb-3 px-4 text-lg">Diagnosis</th>
                  <th className="border-b pb-3 px-4 text-lg">Treatment</th>
                  <th className="border-b pb-3 px-4 text-lg">
                    Treatment Date{" "}
                  </th>
                  <th className="border-b pb-3 px-4 text-lg">Treated by </th>
                  <th className="border-b pb-3 px-4 text-lg">Notes </th>
                </tr>
              </thead>
              <tbody>
                {data.map((record, index) => (
                  <tr key={index}>
                    <td className="py-3 px-4 border-b">
                      {record.diagnosis ? record.diagnosis : "-"}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {record.treatment ? record.treatment : "-"}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {record.treatment_date}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {record.treated_by ? record.treated_by : "-"}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {record.notes ? record.notes : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No Medical Record available for this cow.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMedicalRecord;