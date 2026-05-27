import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search, Plus, Pencil, Trash2, CheckSquare, Square, RefreshCw, User } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { formatDate } from '../../utils/formatDate';

const beneficiarySchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  cnic: z.string().min(13, 'CNIC must be 13 digits').max(15),
  phone: z.string().min(10, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email'),
  address: z.string().min(5, 'Enter a valid address'),
  program: z.string().min(1, 'Select a program'),
  notes: z.string().optional(),
});

const initialData = [
  { id: 1, name: 'Fatima Ahmed', cnic: '42201-1234567-1', phone: '0300-1111111', email: 'fatima@email.com', address: 'Street 1, Lahore', program: 'Health', status: 'Active', date: '2026-01-15', notes: '' },
  { id: 2, name: 'Muhammad Ali', cnic: '42201-2345678-2', phone: '0300-2222222', email: 'mali@email.com', address: 'Street 2, Karachi', program: 'Education', status: 'Active', date: '2026-02-10', notes: '' },
  { id: 3, name: 'Ayesha Khan', cnic: '42201-3456789-3', phone: '0300-3333333', email: 'ayesha@email.com', address: 'Street 3, Islamabad', program: 'Food Aid', status: 'Pending', date: '2026-03-05', notes: '' },
  { id: 4, name: 'Hassan Raza', cnic: '42201-4567890-4', phone: '0300-4444444', email: 'hassan@email.com', address: 'Street 4, Peshawar', program: 'Health', status: 'Inactive', date: '2026-01-20', notes: '' },
  { id: 5, name: 'Zainab Bibi', cnic: '42201-5678901-5', phone: '0300-5555555', email: 'zainab@email.com', address: 'Street 5, Quetta', program: 'Education', status: 'Active', date: '2026-04-12', notes: '' },
  { id: 6, name: 'Omar Farooq', cnic: '42201-6789012-6', phone: '0300-6666666', email: 'omar@email.com', address: 'Street 6, Lahore', program: 'Shelter', status: 'Pending', date: '2026-04-28', notes: '' },
  { id: 7, name: 'Sana Malik', cnic: '42201-7890123-7', phone: '0300-7777777', email: 'sana@email.com', address: 'Street 7, Karachi', program: 'Health', status: 'Active', date: '2026-05-01', notes: '' },
  { id: 8, name: 'Bilal Hussain', cnic: '42201-8901234-8', phone: '0300-8888888', email: 'bilal@email.com', address: 'Street 8, Islamabad', program: 'Education', status: 'Inactive', date: '2026-03-18', notes: '' },
  { id: 9, name: 'Hira Shah', cnic: '42201-9012345-9', phone: '0300-9999999', email: 'hira@email.com', address: 'Street 9, Peshawar', program: 'Food Aid', status: 'Active', date: '2026-05-10', notes: '' },
  { id: 10, name: 'Tariq Mehmood', cnic: '42201-0123456-0', phone: '0300-0000000', email: 'tariq@email.com', address: 'Street 10, Quetta', program: 'Shelter', status: 'Pending', date: '2026-05-14', notes: '' },
  { id: 11, name: 'Nadia Jamil', cnic: '42201-1122334-5', phone: '0300-1212121', email: 'nadia@email.com', address: 'Street 11, Lahore', program: 'Health', status: 'Active', date: '2026-06-01', notes: '' },
  { id: 12, name: 'Kamran Akmal', cnic: '42201-2233445-6', phone: '0300-2323232', email: 'kamran@email.com', address: 'Street 12, Karachi', program: 'Education', status: 'Pending', date: '2026-06-05', notes: '' },
];

const statusVariant = { Active: 'success', Pending: 'warning', Inactive: 'danger' };
const programs = ['Health', 'Education', 'Food Aid', 'Shelter'];
const ITEMS_PER_PAGE = 5;

function BeneficiariesPage() {
  const [beneficiaries, setBeneficiaries] = useState(initialData);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showBulkDelete, setShowBulkDelete] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(beneficiarySchema),
  });

  const filtered = useMemo(() => {
    return beneficiaries.filter((b) => {
      if (filter !== 'All' && b.status !== filter) return false;
      if (search && !b.name.toLowerCase().includes(search.toLowerCase()) && !b.cnic.includes(search)) return false;
      return true;
    });
  }, [beneficiaries, filter, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const allSelected = filtered.length > 0 && selected.size === filtered.length;
  const someSelected = selected.size > 0 && !allSelected;

  const toggleAll = () => {
    if (allSelected) { setSelected(new Set()); return; }
    setSelected(new Set(filtered.map((b) => b.id)));
  };
  const toggleOne = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const openAdd = () => {
    setEditing(null);
    reset({ name: '', cnic: '', phone: '', email: '', address: '', program: '', notes: '' });
    setShowModal(true);
  };

  const openEdit = (b) => {
    setEditing(b);
    setValue('name', b.name);
    setValue('cnic', b.cnic);
    setValue('phone', b.phone);
    setValue('email', b.email);
    setValue('address', b.address);
    setValue('program', b.program);
    setValue('notes', b.notes || '');
    setShowModal(true);
  };

  const handleSave = (data) => {
    if (editing) {
      setBeneficiaries((prev) => prev.map((b) => b.id === editing.id ? { ...b, ...data } : b));
      showToast('Beneficiary updated successfully');
    } else {
      const newId = Math.max(...beneficiaries.map((b) => b.id), 0) + 1;
      setBeneficiaries((prev) => [...prev, { id: newId, ...data, status: 'Active', date: new Date().toISOString().split('T')[0] }]);
      showToast('Beneficiary added successfully');
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setBeneficiaries((prev) => prev.filter((b) => b.id !== deleteTarget.id));
    setSelected((prev) => { const n = new Set(prev); n.delete(deleteTarget.id); return n; });
    setDeleteTarget(null);
    showToast('Beneficiary deleted');
  };

  const handleBulkDelete = () => {
    setBeneficiaries((prev) => prev.filter((b) => !selected.has(b.id)));
    setSelected(new Set());
    setShowBulkDelete(false);
    showToast(`${selected.size} beneficiary${selected.size > 1 ? 'ies' : 'y'} deleted`);
  };

  return (
    <>
      <Helmet><title>Beneficiaries - WelfareOrg Admin</title></Helmet>
      <div className="space-y-6">
        {toast && (
          <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-lg shadow-lg text-sm font-medium border ${
            toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            {toast.message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-primary-800">Beneficiaries</h1>
            <p className="text-gray-500">Manage registered beneficiaries</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" icon={RefreshCw} onClick={() => setPage(1)}>Refresh</Button>
            <Button icon={Plus} onClick={openAdd}>Add Beneficiary</Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or CNIC..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full rounded-lg border border-primary-200 bg-white pl-9 pr-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {['All', 'Active', 'Pending', 'Inactive'].map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setPage(1); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === f ? 'bg-primary-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-primary-200 hover:bg-primary-50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <Card padding={false}>
          <div className="px-4 py-3 border-b border-primary-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {selected.size > 0 && (
                <span className="text-sm text-primary-700 font-medium bg-primary-50 px-3 py-1.5 rounded-lg">
                  {selected.size} selected
                </span>
              )}
              {selected.size > 0 && (
                <Button size="sm" variant="danger" onClick={() => setShowBulkDelete(true)} icon={Trash2}>Delete All</Button>
              )}
            </div>
            <p className="text-xs text-gray-400">{filtered.length} record{filtered.length !== 1 ? 's' : ''}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-primary-100 bg-primary-50/50">
                  <th className="px-4 py-3 w-10">
                    <button onClick={toggleAll} className="text-primary-600 hover:text-primary-800 transition-colors">
                      {allSelected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-700">Beneficiary</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-700 hidden md:table-cell">CNIC</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-700">Program</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-700">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-700 hidden lg:table-cell">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-50">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                      {search ? 'No beneficiaries match your search' : 'No beneficiaries yet'}
                    </td>
                  </tr>
                ) : (
                  paginated.map((b) => {
                    const isSelected = selected.has(b.id);
                    return (
                      <tr key={b.id} className={`transition-colors ${isSelected ? 'bg-primary-50/50' : 'hover:bg-gray-50'}`}>
                        <td className="px-4 py-3">
                          <button onClick={() => toggleOne(b.id)} className="text-gray-400 hover:text-primary-600 transition-colors">
                            {isSelected ? <CheckSquare className="w-4 h-4 text-primary-600" /> : <Square className="w-4 h-4" />}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-sm font-bold text-primary-700 shrink-0">
                              {b.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{b.name}</p>
                              <p className="text-xs text-gray-400">{b.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-500 font-mono text-xs hidden md:table-cell">{b.cnic}</td>
                        <td className="px-4 py-3"><Badge variant="info">{b.program}</Badge></td>
                        <td className="px-4 py-3"><Badge variant={statusVariant[b.status]}>{b.status}</Badge></td>
                        <td className="px-4 py-3 text-gray-500 text-xs hidden lg:table-cell">{formatDate(b.date)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => openEdit(b)} className="rounded-full p-1.5 text-blue-600 hover:bg-blue-50 transition-colors" title="Edit">
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button onClick={() => setDeleteTarget(b)} className="rounded-full p-1.5 text-red-500 hover:bg-red-50 transition-colors" title="Delete">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
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
                      p === page ? 'bg-primary-600 text-white shadow-sm' : 'text-gray-500 hover:bg-primary-50'
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

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Beneficiary' : 'Add Beneficiary'} size="lg">
        <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name" placeholder="Enter full name" error={errors.name?.message} {...register('name')} />
            <Input label="CNIC" placeholder="42201-1234567-1" error={errors.cnic?.message} {...register('cnic')} />
            <Input label="Phone" placeholder="03XX-XXXXXXX" error={errors.phone?.message} {...register('phone')} />
            <Input label="Email" type="email" placeholder="email@example.com" error={errors.email?.message} {...register('email')} />
            <div className="md:col-span-2">
              <Input label="Address" placeholder="Enter address" error={errors.address?.message} {...register('address')} />
            </div>
            <Input label="Program" type="select" error={errors.program?.message} {...register('program')}>
              <option value="">Select program</option>
              {programs.map((p) => <option key={p} value={p}>{p}</option>)}
            </Input>
            <div className="md:col-span-2">
              <Input label="Notes" type="textarea" placeholder="Additional notes..." {...register('notes')} />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-primary-100">
            <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit">{editing ? 'Update' : 'Save'} Beneficiary</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Beneficiary" size="sm">
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{deleteTarget?.name}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>

      <Modal isOpen={showBulkDelete} onClose={() => setShowBulkDelete(false)} title="Delete Selected" size="sm">
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{selected.size} beneficiary{selected.size > 1 ? 'ies' : 'y'}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setShowBulkDelete(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleBulkDelete}>Delete {selected.size}</Button>
        </div>
      </Modal>
    </>
  );
}

export default BeneficiariesPage;
