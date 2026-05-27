import { HiTrash } from 'react-icons/hi';
import { formatDate } from '../../utils/formatDate';

const DonationTable = ({ donations, onDelete }) => {
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this donation?')) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Donor</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Email</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Amount</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Method</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Transaction ID</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {donations.map((donation) => (
              <tr key={donation._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{donation.donorName}</td>
                <td className="px-6 py-4 text-gray-600">{donation.donorEmail}</td>
                <td className="px-6 py-4 font-semibold text-primary-600">${donation.amount?.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium capitalize">
                    {donation.paymentMethod}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">{donation.transactionId || '-'}</td>
                <td className="px-6 py-4 text-gray-500 text-sm">{formatDate(donation.createdAt)}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(donation._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <HiTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {donations.length === 0 && (
        <div className="text-center py-12 text-gray-500">No donations yet</div>
      )}
    </div>
  );
};

export default DonationTable;
