import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

function SortIcon({ sortKey, columnKey, sortDirection }) {
  if (sortKey !== columnKey) {
    return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
  }
  return sortDirection === 'asc' ? (
    <ArrowUp className="h-4 w-4 text-primary-600" />
  ) : (
    <ArrowDown className="h-4 w-4 text-primary-600" />
  );
}

function SkeletonRows({ columns }) {
  return Array.from({ length: 5 }, (_, i) => (
    <tr key={i} className="animate-pulse">
      {columns.map((col) => (
        <td key={col.key} className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </td>
      ))}
    </tr>
  ));
}

function Table({ columns, data, onSort, sortKey, sortDirection, loading = false }) {
  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg border border-primary-100">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-primary-100 bg-primary-50/50">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 text-left font-semibold text-primary-700 ${
                  col.sortable ? 'cursor-pointer select-none hover:bg-primary-100/50' : ''
                }`}
                onClick={() => col.sortable && onSort && onSort(col.key)}
              >
                <div className="flex items-center gap-1.5">
                  {col.label}
                  {col.sortable && (
                    <SortIcon
                      sortKey={sortKey}
                      columnKey={col.key}
                      sortDirection={sortDirection}
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-primary-50">
          {loading ? (
            <SkeletonRows columns={columns} />
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-12 text-center text-gray-500"
              >
                No data found
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={row.id ?? i} className="hover:bg-primary-50/30 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-gray-700">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
