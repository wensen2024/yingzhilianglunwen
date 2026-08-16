import { useState } from 'react';
import { useData } from '../store/DataContext';
import Modal from '../components/Modal';
import SearchBar from '../components/SearchBar';
import { Edit, Trash2 } from 'lucide-react';
import type { Major } from '../types';

export default function MajorPage() {
  const { majors, addMajor, updateMajor, deleteMajor } = useData();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Major | null>(null);
  const [form, setForm] = useState({ major_name: '', department: '', remark: '' });

  const filtered = majors.filter(m => m.major_name.includes(search) || m.department.includes(search));

  const openAdd = () => { setEditing(null); setForm({ major_name: '', department: '', remark: '' }); setModalOpen(true); };
  const openEdit = (m: Major) => { setEditing(m); setForm({ major_name: m.major_name, department: m.department, remark: m.remark }); setModalOpen(true); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.major_name) return;
    if (editing) updateMajor({ ...editing, ...form });
    else addMajor(form);
    setModalOpen(false);
  };

  return (
    <div>
      <SearchBar value={search} onChange={setSearch} placeholder="搜索专业名称、院系..." onAdd={openAdd} addLabel="新增专业" />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 text-left font-medium">编号</th>
                <th className="px-4 py-3 text-left font-medium">专业名称</th>
                <th className="px-4 py-3 text-left font-medium">所属院系</th>
                <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">备注</th>
                <th className="px-4 py-3 text-center font-medium">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(m => (
                <tr key={m.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-4 py-3 text-gray-500">{m.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{m.major_name}</td>
                  <td className="px-4 py-3 text-gray-600">{m.department || '-'}</td>
                  <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{m.remark || '-'}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openEdit(m)} className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => { if (confirm('确定删除？')) deleteMajor(m.id); }} className="p-1.5 rounded-lg hover:bg-red-100 text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={5} className="px-4 py-12 text-center text-gray-400">暂无数据</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-xs text-gray-400 border-t border-gray-100">共 {filtered.length} 条记录</div>
      </div>

      <Modal open={modalOpen} title={editing ? '编辑专业' : '新增专业'} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">专业名称 <span className="text-red-500">*</span></label>
            <input value={form.major_name} onChange={e => setForm({ ...form, major_name: e.target.value })} className="form-input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">所属院系</label>
            <input value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} className="form-input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
            <textarea value={form.remark} onChange={e => setForm({ ...form, remark: e.target.value })} className="form-input" rows={2} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl">取消</button>
            <button type="submit" className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-xl">保存</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
