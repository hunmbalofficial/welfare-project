import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus } from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { formatDate } from '../../utils/formatDate';

const appSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  program: z.string().min(1, 'Select a program'),
  notes: z.string().optional(),
});

const programs = ['Health', 'Education', 'Food Aid', 'Shelter'];

const pendingApps = [
  { id: 1, name: 'Fatima Ahmed', program: 'Health', date: '2026-05-20', urgent: true },
  { id: 2, name: 'Muhammad Ali', program: 'Education', date: '2026-05-19' },
  { id: 3, name: 'Sana Malik', program: 'Shelter', date: '2026-05-18', urgent: true },
  { id: 4, name: 'Bilal Hussain', program: 'Food Aid', date: '2026-05-17' },
];

const reviewApps = [
  { id: 5, name: 'Ayesha Khan', program: 'Education', date: '2026-05-16' },
  { id: 6, name: 'Hassan Raza', program: 'Health', date: '2026-05-15' },
  { id: 7, name: 'Zainab Bibi', program: 'Food Aid', date: '2026-05-14' },
];

const approvedApps = [
  { id: 8, name: 'Omar Farooq', program: 'Shelter', date: '2026-05-13' },
  { id: 9, name: 'Hira Shah', program: 'Health', date: '2026-05-12' },
  { id: 10, name: 'Tariq Mehmood', program: 'Education', date: '2026-05-11' },
  { id: 11, name: 'Sadia Khan', program: 'Food Aid', date: '2026-05-10' },
];

const rejectedApps = [
  { id: 12, name: 'Ahmed Nawaz', program: 'Shelter', date: '2026-05-09' },
  { id: 13, name: 'Noor Fatima', program: 'Health', date: '2026-05-08' },
  { id: 14, name: 'Usman Ghani', program: 'Education', date: '2026-05-07' },
];

const columns = [
  { title: 'Pending', data: pendingApps, color: 'bg-amber-100 text-amber-700' },
  { title: 'Review', data: reviewApps, color: 'bg-blue-100 text-blue-700' },
  { title: 'Approved', data: approvedApps, color: 'bg-green-100 text-green-700' },
  { title: 'Rejected', data: rejectedApps, color: 'bg-red-100 text-red-700' },
];

function ApplicationsPage() {
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(appSchema),
  });

  const onSubmit = () => {
    setShowModal(false);
    reset();
  };

  return (
    <>
      <Helmet>
        <title>Applications - WelfareOrg Admin</title>
      </Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-primary-800">Applications</h1>
            <p className="text-gray-500">Track and manage applications</p>
          </div>
          <Button icon={Plus} onClick={() => setShowModal(true)}>New Application</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((col) => (
            <div key={col.title} className="bg-primary-50 rounded-xl p-4 min-h-[400px]">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-display text-base font-semibold text-primary-800">{col.title}</h3>
                <Badge variant="neutral" size="sm">{col.data.length}</Badge>
              </div>
              <div className="space-y-3">
                {col.data.map((app) => (
                  <div key={app.id} className="bg-white rounded-lg p-4 border border-primary-100">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-medium text-primary-800 text-sm">{app.name}</h4>
                      {app.urgent && (
                        <Badge variant="danger" size="sm">Urgent</Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{app.program}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(app.date)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Modal isOpen={showModal} onClose={() => { setShowModal(false); reset(); }} title="New Application">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label="Applicant Name" placeholder="Enter name" error={errors.name?.message} {...register('name')} />
            <Input label="Program" type="select" error={errors.program?.message} {...register('program')}>
              <option value="">Select program</option>
              {programs.map((p) => <option key={p} value={p}>{p}</option>)}
            </Input>
            <Input label="Notes" type="textarea" placeholder="Additional notes..." {...register('notes')} />
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="ghost" onClick={() => { setShowModal(false); reset(); }}>Cancel</Button>
              <Button type="submit">Submit Application</Button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default ApplicationsPage;
