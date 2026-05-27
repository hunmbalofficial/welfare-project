import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Pencil, Trash2, Megaphone } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { formatDate } from '../../utils/formatDate';

const announcementSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  priority: z.string().min(1, 'Select priority'),
});

const initialAnnouncements = [
  { id: 1, title: 'Office Holiday on May 25', content: 'The office will remain closed on May 25th in observance of the national holiday. All operations will resume on May 26th.', date: '2026-05-20', priority: 'High' },
  { id: 2, title: 'New Health Campaign Launch', content: 'We are launching a new health awareness campaign next month. All team members are requested to prepare the necessary materials.', date: '2026-05-18', priority: 'Normal' },
  { id: 3, title: 'Staff Meeting Rescheduled', content: 'The monthly staff meeting has been rescheduled to Thursday at 10:00 AM. Please update your calendars accordingly.', date: '2026-05-15', priority: 'Low' },
  { id: 4, title: 'Fundraising Target Achieved', content: 'Congratulations to the entire team! We have achieved our Q2 fundraising target ahead of schedule. Great work everyone!', date: '2026-05-12', priority: 'Normal' },
];

const priorityVariant = { High: 'danger', Normal: 'info', Low: 'neutral' };

function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(announcementSchema),
  });

  const openAdd = () => {
    setEditItem(null);
    reset({ priority: 'Normal' });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    reset(item);
    setShowModal(true);
  };

  const onSubmit = (data) => {
    if (editItem) {
      setAnnouncements(announcements.map((a) => (a.id === editItem.id ? { ...a, ...data } : a)));
    } else {
      setAnnouncements([...announcements, { id: Date.now(), ...data, date: new Date().toISOString().split('T')[0] }]);
    }
    setShowModal(false);
    setEditItem(null);
    reset();
  };

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  return (
    <>
      <Helmet>
        <title>Announcements - WelfareOrg Admin</title>
      </Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-primary-800">Announcements</h1>
            <p className="text-gray-500">Manage internal announcements</p>
          </div>
          <Button icon={Plus} onClick={openAdd}>New Announcement</Button>
        </div>

        <div className="space-y-4">
          {announcements.map((a) => (
            <Card key={a.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <Megaphone className="h-5 w-5 text-primary-600" />
                    <h3 className="font-display text-lg font-bold text-primary-800">{a.title}</h3>
                    <Badge variant={priorityVariant[a.priority]} size="sm">{a.priority}</Badge>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{formatDate(a.date)}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{a.content}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => openEdit(a)} className="rounded-full p-2 text-blue-600 hover:bg-blue-50 transition-colors"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => handleDelete(a.id)} className="rounded-full p-2 text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </Card>
          ))}
          {announcements.length === 0 && (
            <Card>
              <p className="text-center text-gray-500 py-8">No announcements yet</p>
            </Card>
          )}
        </div>

        <Modal isOpen={showModal} onClose={() => { setShowModal(false); setEditItem(null); reset(); }} title={editItem ? 'Edit Announcement' : 'New Announcement'} size="lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label="Title" placeholder="Enter announcement title" error={errors.title?.message} {...register('title')} />
            <Input label="Content" type="textarea" placeholder="Write announcement content..." error={errors.content?.message} {...register('content')} />
            <Input label="Priority" type="select" error={errors.priority?.message} {...register('priority')}>
              <option value="High">High</option>
              <option value="Normal">Normal</option>
              <option value="Low">Low</option>
            </Input>
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="ghost" onClick={() => { setShowModal(false); setEditItem(null); reset(); }}>Cancel</Button>
              <Button type="submit">{editItem ? 'Update' : 'Publish'}</Button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default AnnouncementsPage;
