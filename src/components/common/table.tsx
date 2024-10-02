import React, { ReactNode } from "react";

// Define Column type with a generic type parameter T
type Column<T> = {
  title: string;
  dataIndex: keyof T; // Ensure dataIndex is a key of T
  key: string;
};

type Props<T> = {
  columns: Column<T>[];
  data: T[];
};

// Helper function to safely render cell content
const renderCellContent = (value: unknown): ReactNode => {
  if (typeof value === "string" || typeof value === "number") {
    return value; // Directly render strings and numbers
  }

  // Convert other types (e.g., objects) to strings or handle differently
  return JSON.stringify(value);
};

const Table = <T,>({ columns, data }: Props<T>) => {
  return (
    <table className="w-full text-left border-collapse">
      <thead className="bg-gray-100 border-b-2 border-gray-200">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className="py-2 px-4 text-sm font-semibold text-gray-600"
            >
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            key={index}
            className={`hover:bg-gray-50 ${
              index % 2 ? "bg-gray-50" : "bg-white"
            }`}
          >
            {columns.map((column) => (
              <td key={column.key} className="py-3 px-4 text-sm text-gray-700">
                {/* Safely render cell content */}
                {renderCellContent(item[column.dataIndex])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
