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

const newsSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  category: z.string().min(1, 'Select a category'),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  status: z.string().min(1, 'Select status'),
});

const categories = ['Health', 'Education', 'Community', 'Events', 'Fundraising'];

const initialNews = [
  { id: 1, title: 'New Health Camp Opened in Rural Area', category: 'Health', date: '2026-05-20', status: 'Published' },
  { id: 2, title: 'Education Scholarship Program Announced', category: 'Education', date: '2026-05-18', status: 'Published' },
  { id: 3, title: 'Fundraising Dinner Next Month', category: 'Events', date: '2026-05-15', status: 'Draft' },
  { id: 4, title: 'Community Clean-Up Drive Success', category: 'Community', date: '2026-05-12', status: 'Published' },
  { id: 5, title: 'Vocational Training Graduation Ceremony', category: 'Education', date: '2026-05-10', status: 'Draft' },
];

function ManageNews() {
  const [news, setNews] = useState(initialNews);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(newsSchema),
  });

  const openAdd = () => {
    setEditItem(null);
    reset({ status: 'Draft' });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    reset(item);
    setShowModal(true);
  };

  const onSubmit = (data) => {
    if (editItem) {
      setNews(news.map((n) => (n.id === editItem.id ? { ...n, ...data } : n)));
    } else {
      setNews([...news, { id: Date.now(), ...data, date: new Date().toISOString().split('T')[0] }]);
    }
    setShowModal(false);
    setEditItem(null);
    reset();
  };

  const handleDelete = (id) => {
    setNews(news.filter((n) => n.id !== id));
  };

  return (
    <>
      <Helmet>
        <title>News - WelfareOrg Admin</title>
      </Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-primary-800">News & Updates</h1>
            <p className="text-gray-500">Create and manage news posts</p>
          </div>
          <Button icon={Plus} onClick={openAdd}>Add News</Button>
        </div>

        <Card padding={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-primary-100 bg-primary-50/50">
                  <th className="px-4 py-3 text-left font-semibold text-primary-700">Title</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-700">Category</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-700">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-700">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-50">
                {news.map((item) => (
                  <tr key={item.id} className="hover:bg-primary-50/30 transition-colors">
                    <td className="px-4 py-3 text-gray-700 font-medium">{item.title}</td>
                    <td className="px-4 py-3"><Badge variant="info">{item.category}</Badge></td>
                    <td className="px-4 py-3 text-gray-500">{formatDate(item.date)}</td>
                    <td className="px-4 py-3">
                      <Badge variant={item.status === 'Published' ? 'success' : 'warning'}>{item.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(item)} className="rounded-full p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"><Pencil className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete(item.id)} className="rounded-full p-1.5 text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {news.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-12 text-center text-gray-500">No news items yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <Modal isOpen={showModal} onClose={() => { setShowModal(false); setEditItem(null); reset(); }} title={editItem ? 'Edit News' : 'Add News'} size="lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label="Title" placeholder="Enter news title" error={errors.title?.message} {...register('title')} />
            <Input label="Category" type="select" error={errors.category?.message} {...register('category')}>
              <option value="">Select category</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </Input>
            <Input label="Content" type="textarea" placeholder="Write news content..." error={errors.content?.message} {...register('content')} />
            <Input label="Status" type="select" error={errors.status?.message} {...register('status')}>
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </Input>
            <div className="flex items-center justify-between pt-2">
              <div className="text-sm text-gray-400">Image upload will be available soon</div>
              <div className="flex gap-3">
                <Button type="button" variant="ghost" onClick={() => { setShowModal(false); setEditItem(null); reset(); }}>Cancel</Button>
                <Button type="submit">{editItem ? 'Update' : 'Create'}</Button>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default ManageNews;
