import { useState } from 'react';
import { useData } from '../store/DataContext';
import Modal from '../components/Modal';
import SearchBar from '../components/SearchBar';
import { Edit, Trash2, Eye } from 'lucide-react';
import type { Announcement } from '../types';

export default function AnnouncementPage() {
  const { currentUser, announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useData();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [viewing, setViewing] = useState<Announcement | null>(null);
  const [form, setForm] = useState({ title: '', content: '', publisher: '', publish_time: '' });

  const isAdmin = currentUser?.role === 'admin';
  const filtered = announcements.filter(a => a.title.includes(search) || a.content.includes(search));

  const openAdd = () => {
    setEditing(null);
    setForm({ title: '', content: '', publisher: currentUser?.real_name || '', publish_time: new Date().toISOString().replace('T', ' ').substring(0, 19) });
    setModalOpen(true);
  };

  const openEdit = (a: Announcement) => {
    setEditing(a);
    setForm({ title: a.title, content: a.content, publisher: a.publisher, publish_time: a.publish_time });
    setModalOpen(true);
  };

  const openView = (a: Announcement) => {
    setViewing(a);
    setViewModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) return;
    if (editing) updateAnnouncement({ ...editing, ...form });
    else addAnnouncement(form);
    setModalOpen(false);
  };

  return (
    <div>
      <SearchBar value={search} onChange={setSearch} placeholder="搜索公告标题、内容..." onAdd={isAdmin ? openAdd : undefined} addLabel="发布公告" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(a => (
          <div key={a.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">{a.title}</h4>
            <p className="text-sm text-gray-500 line-clamp-3 mb-4">{a.content}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">{a.publisher}</p>
                <p className="text-xs text-gray-400">{a.publish_time}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openView(a)} className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600"><Eye className="w-4 h-4" /></button>
                {isAdmin && (
                  <>
                    <button onClick={() => openEdit(a)} className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => { if (confirm('确定删除？')) deleteAnnouncement(a.id); }} className="p-1.5 rounded-lg hover:bg-red-100 text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400">暂无公告</div>
        )}
      </div>

      {/* View Modal */}
      <Modal open={viewModal} title="公告详情" onClose={() => setViewModal(false)} width="max-w-2xl">
        {viewing && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">{viewing.title}</h3>
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
              <span>发布人：{viewing.publisher}</span>
              <span>发布时间：{viewing.publish_time}</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-gray-700 whitespace-pre-line leading-relaxed">
              {viewing.content}
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal open={modalOpen} title={editing ? '编辑公告' : '发布公告'} onClose={() => setModalOpen(false)} width="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">公告标题 <span className="text-red-500">*</span></label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="form-input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">公告内容 <span className="text-red-500">*</span></label>
            <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="form-input" rows={8} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl">取消</button>
            <button type="submit" className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-xl">发布</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
