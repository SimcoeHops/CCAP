import { useQuery } from '@tanstack/react-query';
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useState, useMemo } from 'react';
import { AgendaItem } from '../types';
import { fetchAgendaItems } from '../api/agenda';
import { PDFDownloadButton } from './PDFGenerator';

const columnHelper = createColumnHelper<AgendaItem>();

export const AgendaTable = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [showDifferingVotes, setShowDifferingVotes] = useState(false);

  // Fetch agenda items using React Query
  const { data: agendaItems, isLoading, error } = useQuery({
    queryKey: ['agendaItems'],
    queryFn: fetchAgendaItems,
  });

  // Filter data based on showDifferingVotes state
  const filteredData = useMemo(() => {
    if (!agendaItems) return [];
    if (!showDifferingVotes) return agendaItems;

    return agendaItems.filter((item) => {
      const votes = item.Votes?.map((vote) => vote.VoteValueName) || [];
      const uniqueVotes = new Set(votes);
      return uniqueVotes.size > 1;
    });
  }, [agendaItems, showDifferingVotes]);

  // Define table columns
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'select',
        header: () => (
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-gray-300"
              checked={selectedItems.length === filteredData.length}
              onChange={(e) =>
                setSelectedItems(
                  e.target.checked
                    ? filteredData.map((item) => item.EventItemId)
                    : []
                )
              }
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-gray-300"
              checked={selectedItems.includes(row.original.EventItemId)}
              onChange={(e) => {
                const id = row.original.EventItemId;
                setSelectedItems((prev) =>
                  e.target.checked
                    ? [...prev, id]
                    : prev.filter((item) => item !== id)
                );
              }}
            />
          </div>
        ),
      }),
      columnHelper.accessor('EventItemAgendaNumber', {
        header: 'Item #',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('EventItemTitle', {
        header: 'Agenda Text',
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        id: 'backup',
        header: 'Backup',
        cell: ({ row }) => {
          const attachments = row.original.Attachments;
          return attachments?.length > 0 ? (
            <a
              href={attachments[0].MatterAttachmentHyperlink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Backup
            </a>
          ) : null;
        },
      }),
      columnHelper.display({
        id: 'votes',
        header: 'Votes',
        cell: ({ row }) => (
          <div className="space-y-1">
            {row.original.Votes?.map((vote, idx) => (
              <div
                key={idx}
                className={`text-sm ${
                  vote.VoteValueName === 'Aye' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {vote.VotePersonName}: {vote.VoteValueName}
              </div>
            ))}
          </div>
        ),
      }),
      columnHelper.display({
        id: 'outcome',
        header: 'Outcome',
        cell: ({ row }) => {
          const history = row.original.MatterHistory?.[0];
          return history ? (
            <div className="text-sm">
              {history.MatterHistoryPassedFlagName || history.MatterHistoryActionName}
            </div>
          ) : null;
        },
      }),
    ],
    [selectedItems, filteredData]
  );

  // React Table instance
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-red-600 p-4">
        Error loading agenda items. Please try again later.
      </div>
    );
  }

  // Render the table
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search all columns..."
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showDifferingVotes}
              onChange={(e) => setShowDifferingVotes(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300"
            />
            <span>Show Only Differing Votes</span>
          </label>
        </div>

        {selectedItems.length > 0 && (
          <PDFDownloadButton
            selectedItems={filteredData.filter((item) =>
              selectedItems.includes(item.EventItemId)
            )}
            meetingDate="January 23, 2025" // Replace with dynamic date
          />
        )}
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-normal text-sm text-gray-900"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};