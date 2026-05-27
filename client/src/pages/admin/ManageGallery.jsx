import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus, Trash2, Search, CheckSquare, Square, RefreshCw, Image, Upload } from 'lucide-react';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Loader from '../../components/ui/Loader';
import * as galleryService from '../../services/galleryService';

const ITEMS_PER_PAGE = 12;

function ManageGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(new Set());
  const [page, setPage] = useState(1);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showBulkDelete, setShowBulkDelete] = useState(false);
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchGallery = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await galleryService.getGallery();
      setImages(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGallery(); }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return images;
    const q = search.toLowerCase();
    return images.filter((img) => img.caption?.toLowerCase().includes(q));
  }, [images, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const allSelected = filtered.length > 0 && selected.size === filtered.length;
  const someSelected = selected.size > 0 && !allSelected;
  const toggleAll = () => {
    if (allSelected) { setSelected(new Set()); return; }
    setSelected(new Set(filtered.map((img) => img._id)));
  };
  const toggleOne = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) { showToast('Please select an image', 'error'); return; }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      if (caption.trim()) fd.append('caption', caption);
      await galleryService.uploadImage(fd);
      showToast('Image uploaded successfully');
      setShowUploadModal(false);
      setCaption('');
      setFile(null);
      fetchGallery();
    } catch (err) {
      showToast(err.response?.data?.message || 'Upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await galleryService.deleteImage(deleteTarget._id);
      showToast('Image deleted');
      setDeleteTarget(null);
      setSelected((prev) => { const n = new Set(prev); n.delete(deleteTarget._id); return n; });
      fetchGallery();
    } catch {
      showToast('Failed to delete', 'error');
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all([...selected].map((id) => galleryService.deleteImage(id)));
      showToast(`${selected.size} image${selected.size > 1 ? 's' : ''} deleted`);
      setSelected(new Set());
      setShowBulkDelete(false);
      fetchGallery();
    } catch {
      showToast('Failed to delete some images', 'error');
    }
  };

  return (
    <>
      <Helmet><title>Gallery - WelfareOrg Admin</title></Helmet>

      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-lg shadow-lg text-sm font-medium border ${
          toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          {toast.text}
        </div>
      )}

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-primary-800">Gallery</h1>
            <p className="text-gray-500">Upload and manage gallery images</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" icon={RefreshCw} onClick={fetchGallery} disabled={loading}>Refresh</Button>
            <Button icon={Plus} onClick={() => { setCaption(''); setFile(null); setShowUploadModal(true); }}>Upload Image</Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search by caption..." value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full rounded-lg border border-primary-200 bg-white pl-9 pr-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-400" />
            </div>
          </div>
          {selected.size > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-primary-700 font-medium bg-primary-50 px-3 py-1.5 rounded-lg">{selected.size} selected</span>
              <Button size="sm" variant="danger" onClick={() => setShowBulkDelete(true)} icon={Trash2}>Delete All</Button>
            </div>
          )}
        </div>

        {loading && <div className="flex justify-center py-16"><Loader size="lg" text="Loading gallery..." /></div>}

        {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm border border-red-200">{error}</div>}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-16">
            <Image size={48} className="mx-auto text-primary-300 mb-4" />
            <p className="text-gray-500">{search ? 'No images match your search' : 'No images yet. Click "Upload Image" to add one.'}</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {paginated.map((img) => {
                const isSelected = selected.has(img._id);
                return (
                  <div key={img._id} className={`relative group rounded-xl overflow-hidden bg-white border-2 transition-all duration-200 ${
                    isSelected ? 'border-primary-500 shadow-md' : 'border-primary-100 hover:shadow-md'
                  }`}>
                    <button onClick={() => toggleOne(img._id)} className={`absolute top-2 left-2 z-10 p-1 rounded-md transition-colors ${
                      isSelected ? 'bg-primary-600 text-white' : 'bg-white/80 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-primary-600'
                    }`}>
                      {isSelected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                    </button>
                    <button onClick={() => setDeleteTarget(img)} className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-50 transition-opacity" title="Delete">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="aspect-square overflow-hidden bg-primary-50">
                      {img.image ? (
                        <img src={`http://localhost:5000${img.image}`} alt={img.caption || 'Gallery'} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                          <Image className="h-10 w-10 text-primary-300" />
                        </div>
                      )}
                    </div>
                    {img.caption && (
                      <div className="p-2.5 border-t border-primary-100">
                        <p className="text-xs text-gray-600 truncate">{img.caption}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {totalPages > 1 && (
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
          </>
        )}
      </div>

      <Modal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} title="Upload Image">
        <form onSubmit={handleUpload} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-primary-700">Image</label>
            <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              file ? 'border-primary-400 bg-primary-50' : 'border-primary-200 hover:border-primary-300'
            }`}>
              {file ? (
                <div className="space-y-2">
                  <Upload className="h-8 w-8 text-primary-500 mx-auto" />
                  <p className="text-sm font-medium text-primary-700">{file.name}</p>
                  <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  <button type="button" onClick={() => setFile(null)} className="text-xs text-red-500 hover:underline">Remove</button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Image className="h-10 w-10 text-primary-300 mx-auto" />
                  <p className="text-sm text-gray-500">Click to select or drag and drop</p>
                  <p className="text-xs text-gray-400">PNG, JPG, WebP up to 5MB</p>
                  <label className="inline-block mt-2 px-5 py-2 rounded-full bg-primary-600 text-white text-sm font-medium cursor-pointer hover:bg-primary-700 transition-colors">
                    Choose File
                    <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="sr-only" />
                  </label>
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-primary-700">Caption (Optional)</label>
            <input type="text" placeholder="Enter image caption" value={caption} onChange={(e) => setCaption(e.target.value)}
              className="w-full rounded-lg border border-primary-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400" />
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-primary-100">
            <Button type="button" variant="ghost" onClick={() => setShowUploadModal(false)}>Cancel</Button>
            <Button type="submit" loading={uploading} icon={Upload}>Upload</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Image" size="sm">
        <p className="text-gray-600 mb-6">Are you sure you want to delete this image? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>

      <Modal isOpen={showBulkDelete} onClose={() => setShowBulkDelete(false)} title="Delete Selected" size="sm">
        <p className="text-gray-600 mb-6">Are you sure you want to delete <strong>{selected.size} image{selected.size > 1 ? 's' : ''}</strong>? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setShowBulkDelete(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleBulkDelete}>Delete {selected.size}</Button>
        </div>
      </Modal>
    </>
  );
}

export default ManageGallery;
