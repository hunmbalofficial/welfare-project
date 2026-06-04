import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { formatDate } from '../../utils/formatDate';

const staffSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.string().min(1, 'Select a role'),
});

const initialStaff = [
  { id: 1, name: 'Admin User', email: 'admin@welfareorg.org', role: 'Admin', status: 'Active', lastLogin: '2026-05-20' },
  { id: 2, name: 'Sarah Ahmed', email: 'sarah@welfareorg.org', role: 'Manager', status: 'Active', lastLogin: '2026-05-19' },
  { id: 3, name: 'Ali Raza', email: 'ali@welfareorg.org', role: 'Editor', status: 'Active', lastLogin: '2026-05-18' },
  { id: 4, name: 'Fatima Noor', email: 'fatima@welfareorg.org', role: 'Editor', status: 'Inactive', lastLogin: '2026-04-30' },
  { id: 5, name: 'Usman Khan', email: 'usman@welfareorg.org', role: 'Manager', status: 'Active', lastLogin: '2026-05-17' },
];

function StaffManagementPage() {
  const [staff, setStaff] = useState(initialStaff);
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(staffSchema),
  });

  const onSubmit = (data) => {
    setStaff([...staff, { id: Date.now(), ...data, status: 'Active', lastLogin: '-' }]);
    setShowModal(false);
    reset();
  };

  const handleDelete = (id) => {
    setStaff(staff.filter((s) => s.id !== id));
  };

  return (
    <>
      <Helmet>
        <title>Staff Management - WelfareOrg Admin</title>
      </Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-primary-800">Staff Management</h1>
            <p className="text-gray-500">Manage administrators and editors</p>
          </div>
          <Button icon={Plus} onClick={() => setShowModal(true)}>Add Staff</Button>
        </div>

        <Card padding={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-primary-100 bg-primary-50/50">
                  <th className="px-4 py-3 text-left font-semibold text-primary-700">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-700">Email</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-700">Role</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-700">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-700">Last Login</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-50">
                {staff.map((s) => (
                  <tr key={s.id} className="hover:bg-primary-50/30 transition-colors">
                    <td className="px-4 py-3 text-gray-700 font-medium">{s.name}</td>
                    <td className="px-4 py-3 text-gray-600">{s.email}</td>
                    <td className="px-4 py-3"><Badge variant={s.role === 'Admin' ? 'danger' : s.role === 'Manager' ? 'warning' : 'info'}>{s.role}</Badge></td>
                    <td className="px-4 py-3"><Badge variant={s.status === 'Active' ? 'success' : 'neutral'}>{s.status}</Badge></td>
                    <td className="px-4 py-3 text-gray-500">{s.lastLogin === '-' ? '-' : formatDate(s.lastLogin)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="rounded-full p-1.5 text-primary-600 hover:bg-primary-50 transition-colors"><Pencil className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete(s.id)} className="rounded-full p-1.5 text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Modal isOpen={showModal} onClose={() => { setShowModal(false); reset(); }} title="Add Staff Member">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label="Full Name" placeholder="Enter name" error={errors.name?.message} {...register('name')} />
            <Input label="Email" type="email" placeholder="email@example.com" error={errors.email?.message} {...register('email')} />
            <Input label="Password" type="password" placeholder="Minimum 6 characters" error={errors.password?.message} {...register('password')} />
            <Input label="Role" type="select" error={errors.role?.message} {...register('role')}>
              <option value="">Select role</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Editor">Editor</option>
            </Input>
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="ghost" onClick={() => { setShowModal(false); reset(); }}>Cancel</Button>
              <Button type="submit">Add Staff</Button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default StaffManagementPage;
