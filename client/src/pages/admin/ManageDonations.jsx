import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { DollarSign, TrendingUp, Users, Award, Trash2, RefreshCw, Search, CheckSquare, Square, Download } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Loader from '../../components/ui/Loader';
import { getDonations, deleteDonation } from '../../services/donationService';
import { formatDate } from '../../utils/formatDate';

const PAYMENT_BADGES = {
  jazzcash: { label: 'JazzCash', variant: 'warning' },
  easypaisa: { label: 'EasyPaisa', variant: 'success' },
  bank: { label: 'Bank Transfer', variant: 'info' },
};

const ITEMS_PER_PAGE = 10;

function ManageDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [deleteModal, setDeleteModal] = useState(null);
  const [bulkDeleteModal, setBulkDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const fetchDonations = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getDonations();
      setDonations(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load donations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDonations(); }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return donations;
    const q = search.toLowerCase();
    return donations.filter(
      (d) =>
        d.donorName?.toLowerCase().includes(q) ||
        d.donorEmail?.toLowerCase().includes(q) ||
        d.paymentMethod?.toLowerCase().includes(q)
    );
  }, [donations, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  useEffect(() => { setPage(1); }, [search]);

  const allSelected = filtered.length > 0 && selected.size === filtered.length;
  const someSelected = selected.size > 0 && !allSelected;

  const toggleAll = () => {
    if (allSelected) { setSelected(new Set()); return; }
    setSelected(new Set(filtered.map((d) => d._id)));
  };

  const toggleOne = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const handleSingleDelete = async () => {
    if (!deleteModal) return;
    setDeleting(true);
    try {
      await deleteDonation(deleteModal._id);
      setDonations((prev) => prev.filter((d) => d._id !== deleteModal._id));
      setSelected((prev) => { const n = new Set(prev); n.delete(deleteModal._id); return n; });
      setDeleteModal(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete donation');
    } finally {
      setDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    setDeleting(true);
    try {
      await Promise.all([...selected].map((id) => deleteDonation(id)));
      setDonations((prev) => prev.filter((d) => !selected.has(d._id)));
      setSelected(new Set());
      setBulkDeleteModal(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete donations');
    } finally {
      setDeleting(false);
    }
  };

  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);
  const thisMonth = donations.filter(
    (d) => new Date(d.createdAt).getMonth() === new Date().getMonth() &&
          new Date(d.createdAt).getFullYear() === new Date().getFullYear()
  );
  const thisMonthTotal = thisMonth.reduce((sum, d) => sum + d.amount, 0);
  const avgDonation = donations.length ? Math.round(totalAmount / donations.length) : 0;
  const topDonor = donations.length
    ? donations.reduce((max, d) => (d.amount > max.amount ? d : max), donations[0])
    : null;

  const summaryCards = [
    { label: 'Total Donations', value: `Rs. ${totalAmount.toLocaleString()}`, icon: DollarSign, change: `${donations.length} donations` },
    { label: 'This Month', value: `Rs. ${thisMonthTotal.toLocaleString()}`, icon: TrendingUp, change: `${thisMonth.length} this month` },
    { label: 'Average Donation', value: `Rs. ${avgDonation.toLocaleString()}`, icon: Users, change: '' },
    { label: 'Top Donor', value: topDonor?.donorName || 'N/A', icon: Award, change: topDonor ? `Rs. ${topDonor.amount.toLocaleString()}` : '' },
  ];

  if (loading) return <Loader text="Loading donations..." />;

  return (
    <>
      <Helmet><title>Donations - WelfareOrg Admin</title></Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-primary-800">Donations</h1>
            <p className="text-gray-500">View and manage donation records</p>
          </div>
          <Button variant="ghost" size="sm" onClick={fetchDonations} icon={RefreshCw}>Refresh</Button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm border border-red-200">{error}</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map((s) => (
            <Card key={s.label} className="relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary-400" />
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display text-xl font-bold text-primary-800">{s.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                  {s.change && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 mt-2">
                      <TrendingUp className="h-3 w-3" /> {s.change}
                    </span>
                  )}
                </div>
                <div className="rounded-full bg-primary-50 p-3">
                  <s.icon className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card padding={false}>
          <div className="p-4 border-b border-primary-100 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              {selected.size > 0 && (
                <span className="text-sm text-primary-700 font-medium bg-primary-50 px-3 py-1.5 rounded-lg">
                  {selected.size} selected
                </span>
              )}
              {selected.size > 0 && (
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => setBulkDeleteModal(true)}
                  icon={Trash2}
                >
                  Delete All
                </Button>
              )}
            </div>
            <div className="relative max-w-xs w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search donor name, email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-primary-200 bg-white pl-9 pr-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-primary-100 bg-primary-50/50">
                  <th className="px-4 py-3 w-10">
                    <button onClick={toggleAll} className="text-primary-600 hover:text-primary-800 transition-colors">
                      {allSelected ? <CheckSquare className="w-4 h-4" /> : someSelected ? (
                        <span className="relative"><Square className="w-4 h-4" /><span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">-</span></span>
                      ) : <Square className="w-4 h-4" />}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-700">Donor Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-700">Amount</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-700">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-700">Payment Method</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-50">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                      {search ? 'No donations match your search' : 'No donations yet'}
                    </td>
                  </tr>
                ) : (
                  paginated.map((d) => {
                    const isSelected = selected.has(d._id);
                    const badge = PAYMENT_BADGES[d.paymentMethod] || { label: d.paymentMethod, variant: 'info' };
                    return (
                      <tr key={d._id} className={`transition-colors ${isSelected ? 'bg-primary-50/50' : 'hover:bg-gray-50'}`}>
                        <td className="px-4 py-3">
                          <button onClick={() => toggleOne(d._id)} className="text-gray-400 hover:text-primary-600 transition-colors">
                            {isSelected ? <CheckSquare className="w-4 h-4 text-primary-600" /> : <Square className="w-4 h-4" />}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-700 shrink-0">
                              {d.donorName?.charAt(0)?.toUpperCase() || '?'}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{d.donorName}</p>
                              <p className="text-xs text-gray-400">{d.donorEmail}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-primary-600 font-semibold">
                          Rs. {d.amount.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{formatDate(d.createdAt)}</td>
                        <td className="px-4 py-3">
                          <Badge variant={badge.variant}>{badge.label}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setDeleteModal(d)}
                            className="rounded-full p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Donation"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="px-4 py-3 border-t border-primary-100 flex items-center justify-between">
              <p className="text-xs text-gray-400">
                Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
              </p>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                      p === page ? 'bg-primary-600 text-white' : 'text-gray-500 hover:bg-primary-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      <Modal open={!!deleteModal} onClose={() => setDeleteModal(null)} title="Delete Donation">
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{deleteModal?.donorName}'s</strong> donation of{' '}
          <strong>Rs. {deleteModal?.amount?.toLocaleString()}</strong>?
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={() => setDeleteModal(null)}>Cancel</Button>
          <Button variant="danger" onClick={handleSingleDelete} loading={deleting}>Delete</Button>
        </div>
      </Modal>

      <Modal open={bulkDeleteModal} onClose={() => setBulkDeleteModal(false)} title="Delete Selected Donations">
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{selected.size} donation{selected.size > 1 ? 's' : ''}</strong>?
          This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={() => setBulkDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleBulkDelete} loading={deleting}>Delete {selected.size}</Button>
        </div>
      </Modal>
    </>
  );
}

export default ManageDonations;
