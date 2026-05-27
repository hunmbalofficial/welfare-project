import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { MessageCircle, Plus, Star, Pencil, Trash2, CheckCircle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../../services/testimonialService';

const defaultForm = { name: '', role: '', quote: '', rating: 5 };

function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getTestimonials();
      setTestimonials(res.data);
    } catch {
      showToast('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const openCreate = () => {
    setEditing(null);
    setForm(defaultForm);
    setShowModal(true);
  };

  const openEdit = (t) => {
    setEditing(t);
    setForm({ name: t.name, role: t.role, quote: t.quote, rating: t.rating });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.quote || !form.role) { showToast('Please fill all required fields'); return; }
    setSaving(true);
    try {
      if (editing) {
        await updateTestimonial(editing._id, form);
        showToast('Testimonial updated');
      } else {
        await createTestimonial(form);
        showToast('Testimonial created');
      }
      setShowModal(false);
      fetch();
    } catch {
      showToast('Failed to save testimonial');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteTestimonial(deleteId);
      setTestimonials((prev) => prev.filter((t) => t._id !== deleteId));
      setDeleteId(null);
      showToast('Testimonial deleted');
    } catch {
      showToast('Failed to delete testimonial');
    }
  };

  return (
    <>
      <Helmet><title>Testimonials - WelfareOrg Admin</title></Helmet>

      {toast && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-5 py-3 rounded-lg shadow-lg text-sm font-medium">
          <CheckCircle className="w-4 h-4" /> {toast}
        </div>
      )}

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-primary-800">Testimonials</h1>
            <p className="text-gray-500">Manage what people say on the homepage</p>
          </div>
          <Button onClick={openCreate} icon={Plus}>Add Testimonial</Button>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-12">Loading...</div>
        ) : testimonials.length === 0 ? (
          <Card><div className="text-center text-gray-400 py-8">No testimonials yet. Click "Add Testimonial" to create one.</div></Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t._id} className="relative">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic mb-4 line-clamp-3">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-primary-800 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg hover:bg-primary-50 text-gray-400 hover:text-primary-600 transition-colors"><Pencil size={16} /></button>
                    <button onClick={() => setDeleteId(t._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Testimonial' : 'Add Testimonial'}>
        <div className="space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Fatima Ahmed" />
          <Input label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="e.g. Beneficiary" />
          <Input label="Quote" type="textarea" value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} placeholder="What they said..." />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((r) => (
                <button key={r} onClick={() => setForm({ ...form, rating: r })} type="button">
                  <Star size={24} className={r <= form.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={handleSave} loading={saving}>{editing ? 'Update' : 'Create'}</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Testimonial">
        <p className="text-gray-600 mb-6">Are you sure you want to delete this testimonial?</p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Delete</Button>
        </div>
      </Modal>
    </>
  );
}

export default ManageTestimonials;
