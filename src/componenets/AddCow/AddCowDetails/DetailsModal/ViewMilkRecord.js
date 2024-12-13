import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ViewMilkRecord = ({ onClose, data }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-neutral-700">
            Milk Production Record
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
                  <th className="border-b pb-3 px-4 text-lg">Date</th>
                  <th className="border-b pb-3 px-4 text-lg">Milk Quantity</th>
                  <th className="border-b pb-3 px-4 text-lg">Milking Time</th>
                  <th className="border-b pb-3 px-4 text-lg">Fat Content</th>
                  <th className="border-b pb-3 px-4 text-lg">
                    Price Per Liter
                  </th>
                  <th className="border-b pb-3 px-4 text-lg">Total Price</th>
                  <th className="border-b pb-3 px-4 text-lg">Notes</th>
                </tr>
              </thead>
              <tbody>
                {data.map((record, index) => (
                  <tr key={index}>
                    <td className="py-3 px-4 border-b">
                      {record.date
                        ? new Date(record.date).toLocaleDateString("en-GB")
                        : "Not Available"}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {record.amount ? record.amount : "-"}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {record.milking_time}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {record.fat_content ? record.fat_content : "-"}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {record.price_per_liter ? record.price_per_liter : "-"}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {record.total_price ? record.total_price : "-"}
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
              No milk production data available for this cow.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMilkRecord;
