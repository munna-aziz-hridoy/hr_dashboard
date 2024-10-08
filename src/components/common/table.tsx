import React, { ReactNode } from "react";

// Define Column type with a generic type parameter T
type Column<T> = {
  title: string;
  dataIndex: keyof T; // Ensure dataIndex is a key of T
  key: string;
};

// Extend T to include an `id` property
type Props<T extends { id: string }> = {
  columns: Column<T>[];
  data: T[];
  action?: boolean;
  actionComponent?: (id: string) => ReactNode;
};

// Helper function to safely render cell content
const renderCellContent = (value: unknown): ReactNode => {
  if (typeof value === "string" || typeof value === "number") {
    return value; // Directly render strings and numbers
  }

  // Convert other types (e.g., objects) to strings or handle differently
  return JSON.stringify(value);
};

const Table = <T extends { id: string }>({
  columns,
  data,
  action = false,
  actionComponent,
}: Props<T>) => {
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
          {action && (
            <th className="py-2 px-4 text-sm font-semibold text-gray-600">
              Action
            </th>
          )}
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
            {action && actionComponent && (
              <td align="center" className="py-3 px-4 text-sm text-gray-700">
                {actionComponent(item.id)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
