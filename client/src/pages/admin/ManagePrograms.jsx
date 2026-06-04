import { useState, useEffect, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus, Pencil, Trash2, ImageOff, RefreshCw, Search, CheckSquare, Square, FolderOpen, DollarSign, Activity, ListChecks } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Loader from '../../components/ui/Loader';
import * as projectService from '../../services/projectService';
import { API_ORIGIN } from '../../utils/constants';

const statusVariant = { active: 'success', completed: 'info', upcoming: 'warning', onhold: 'danger' };
const statusOptions = ['active', 'completed', 'upcoming', 'onhold'];
const emptyForm = { title: '', description: '', targetAmount: '', collectedAmount: '', category: '', status: 'active' };
const ITEMS_PER_PAGE = 6;

function ManagePrograms() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selected, setSelected] = useState(new Set());
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (text, type = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchProjects = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const res = await projectService.getProjects();
      setProjects(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setImageFile(null); setShowModal(true); };

  const openEdit = (p) => {
    setEditing(p);
    setForm({ title: p.title, description: p.description || '', targetAmount: p.targetAmount || '', collectedAmount: p.collectedAmount || '', category: p.category || '', status: p.status || 'active' });
    setImageFile(null);
    setShowModal(true);
  };

  const handleField = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { showToast('Please enter a project title', 'error'); return; }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('description', form.description);
      fd.append('targetAmount', form.targetAmount);
      fd.append('collectedAmount', form.collectedAmount);
      fd.append('category', form.category);
      fd.append('status', form.status);
      if (imageFile) fd.append('image', imageFile);

      if (editing) {
        await projectService.updateProject(editing._id, fd);
        showToast('Project updated successfully');
      } else {
        await projectService.createProject(fd);
        showToast('Project created successfully');
      }
      setShowModal(false);
      fetchProjects();
    } catch (err) {
      showToast(err.response?.data?.message || 'Something went wrong', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await projectService.deleteProject(deleteTarget._id);
      showToast('Project deleted successfully');
      setShowDeleteModal(false);
      setDeleteTarget(null);
      setSelected((prev) => { const n = new Set(prev); n.delete(deleteTarget._id); return n; });
      fetchProjects();
    } catch (err) {
      showToast('Failed to delete', 'error');
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all([...selected].map((id) => projectService.deleteProject(id)));
      showToast(`${selected.size} project${selected.size > 1 ? 's' : ''} deleted`);
      setSelected(new Set());
      setShowBulkDeleteModal(false);
      fetchProjects();
    } catch {
      showToast('Failed to delete some projects', 'error');
    }
  };

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (statusFilter !== 'All' && p.status !== statusFilter.toLowerCase()) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [projects, statusFilter, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const allSelected = filtered.length > 0 && selected.size === filtered.length;
  const someSelected = selected.size > 0 && !allSelected;
  const toggleAll = () => {
    if (allSelected) { setSelected(new Set()); return; }
    setSelected(new Set(filtered.map((p) => p._id)));
  };
  const toggleOne = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const totalTarget = projects.reduce((s, p) => s + (p.targetAmount || 0), 0);
  const totalCollected = projects.reduce((s, p) => s + (p.collectedAmount || 0), 0);
  const activeCount = projects.filter((p) => p.status === 'active').length;

  return (
    <>
      <Helmet><title>Programs - WelfareOrg Admin</title></Helmet>
      <div className="space-y-6">
        {toast && (
          <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-lg shadow-lg text-sm font-medium border ${
            toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            {toast.text}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-primary-800">Programs</h1>
            <p className="text-gray-500">Manage welfare programs and projects</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" icon={RefreshCw} onClick={fetchProjects} disabled={loading}>Refresh</Button>
            <Button icon={Plus} onClick={openCreate}>Add Program</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary-400" />
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display text-xl font-bold text-primary-800">{projects.length}</p>
                <p className="text-sm text-gray-500 mt-1">Total Programs</p>
              </div>
              <div className="rounded-full bg-primary-50 p-3"><FolderOpen className="h-5 w-5 text-primary-600" /></div>
            </div>
          </Card>
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-green-400" />
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display text-xl font-bold text-primary-800">{activeCount}</p>
                <p className="text-sm text-gray-500 mt-1">Active Programs</p>
              </div>
              <div className="rounded-full bg-green-50 p-3"><Activity className="h-5 w-5 text-green-600" /></div>
            </div>
          </Card>
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary-500" />
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display text-xl font-bold text-primary-800">Rs. {totalCollected.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">Of Rs. {totalTarget.toLocaleString()} Raised</p>
              </div>
              <div className="rounded-full bg-primary-50 p-3"><DollarSign className="h-5 w-5 text-primary-600" /></div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search programs..." value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full rounded-lg border border-primary-200 bg-white pl-9 pr-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-400" />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {['All', 'Active', 'Completed', 'Upcoming', 'Onhold'].map((s) => (
              <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  statusFilter === s ? 'bg-primary-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-primary-200 hover:bg-primary-50'
                }`}>{s}</button>
            ))}
          </div>
        </div>

        {loading && <div className="flex justify-center py-8"><Loader size="lg" text="Loading projects..." /></div>}
        {error && <div className="text-center py-8 text-red-600 font-medium">{error}</div>}

        {!loading && !error && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {selected.size > 0 && (
                <span className="text-sm text-primary-700 font-medium bg-primary-50 px-3 py-1.5 rounded-lg">{selected.size} selected</span>
              )}
              {selected.size > 0 && (
                <Button size="sm" variant="danger" onClick={() => setShowBulkDeleteModal(true)} icon={Trash2}>Delete All</Button>
              )}
            </div>
            <p className="text-xs text-gray-400">{filtered.length} program{filtered.length !== 1 ? 's' : ''}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-16">
            <ImageOff size={48} className="mx-auto text-primary-300 mb-4" />
            <p className="text-gray-500">{search || statusFilter !== 'All' ? 'No matching programs found' : 'No projects yet. Click "Add Program" to create one.'}</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((p) => {
              const isSelected = selected.has(p._id);
              const progress = p.targetAmount > 0 ? Math.round((p.collectedAmount || 0) / p.targetAmount * 100) : 0;
              return (
                <div key={p._id} className={`rounded-xl bg-white border-2 transition-all duration-200 overflow-hidden ${
                  isSelected ? 'border-primary-400 shadow-md' : 'border-primary-100 shadow-sm hover:shadow-md'
                }`}>
                  <div className="relative">
                    {p.image ? (
                      <img src={p.image.startsWith('http') ? p.image : `${API_ORIGIN}${p.image}`} alt={p.title} className="w-full h-40 object-cover" />
                    ) : (
                      <div className="w-full h-40 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                        <ImageOff size={36} className="text-primary-300" />
                      </div>
                    )}
                    <button onClick={() => toggleOne(p._id)} className={`absolute top-3 left-3 p-1 rounded-md transition-colors ${
                      isSelected ? 'bg-primary-600 text-white' : 'bg-white/90 text-gray-400 hover:text-primary-600'
                    }`}>
                      {isSelected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                    </button>
                    <div className="absolute top-3 right-3">
                      <Badge variant={statusVariant[p.status] || 'neutral'} size="sm">{p.status}</Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-primary-800 mb-2 line-clamp-1">{p.title}</h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[2.5rem]">{p.description}</p>
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-primary-600 font-medium">Rs. {(p.collectedAmount || 0).toLocaleString()}</span>
                        <span className="text-gray-400">of Rs. {(p.targetAmount || 0).toLocaleString()}</span>
                      </div>
                      <div className="w-full h-2 bg-primary-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(progress, 100)}%` }} />
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1">{progress}% funded</p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-primary-100">
                      <span className="text-xs text-gray-400 bg-primary-50 px-2.5 py-1 rounded-full">{p.category || 'General'}</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(p)} className="rounded-full p-1.5 text-primary-600 hover:bg-primary-50 transition-colors" title="Edit">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => { setDeleteTarget(p); setShowDeleteModal(true); }} className="rounded-full p-1.5 text-red-500 hover:bg-red-50 transition-colors" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && !error && totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">
              Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                    p === page ? 'bg-primary-600 text-white shadow-sm' : 'text-gray-500 hover:bg-primary-50'
                  }`}>{p}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Program' : 'Add Program'} size="lg">
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input label="Project Title" placeholder="Enter project title" value={form.title} onChange={handleField('title')} />
            </div>
            <div className="md:col-span-2">
              <Input label="Description" type="textarea" placeholder="Describe the project..." value={form.description} onChange={handleField('description')} />
            </div>
            <Input label="Target Amount (Rs.)" placeholder="e.g. 500000" value={form.targetAmount} onChange={handleField('targetAmount')} />
            <Input label="Collected Amount (Rs.)" placeholder="e.g. 250000" value={form.collectedAmount} onChange={handleField('collectedAmount')} />
            <Input label="Category" placeholder="e.g. Health, Education" value={form.category} onChange={handleField('category')} />
            <Input label="Status" type="select" value={form.status} onChange={handleField('status')}>
              {statusOptions.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </Input>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-primary-700 mb-1">Project Image</label>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
              {editing?.image && !imageFile && <p className="text-xs text-gray-400 mt-1">Current image kept if no new file selected</p>}
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-primary-100">
            <p className="text-xs text-gray-400">All fields except image are required</p>
            <div className="flex items-center gap-3">
              <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button type="submit" loading={saving}>{editing ? 'Update' : 'Create'} Program</Button>
            </div>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Program" size="sm">
        <p className="text-gray-600 mb-6">Are you sure you want to delete <strong>{deleteTarget?.title}</strong>? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>

      <Modal isOpen={showBulkDeleteModal} onClose={() => setShowBulkDeleteModal(false)} title="Delete Selected" size="sm">
        <p className="text-gray-600 mb-6">Are you sure you want to delete <strong>{selected.size} project{selected.size > 1 ? 's' : ''}</strong>? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setShowBulkDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleBulkDelete}>Delete {selected.size}</Button>
        </div>
      </Modal>
    </>
  );
}

export default ManagePrograms;
