import { useState } from 'react';
import { useData } from '../store/DataContext';
import Modal from '../components/Modal';
import SearchBar from '../components/SearchBar';
import { Edit, Trash2 } from 'lucide-react';
import type { ClassInfo } from '../types';

export default function ClassPage() {
  const { classes, addClass, updateClass, deleteClass, majors, getMajorName } = useData();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ClassInfo | null>(null);
  const [form, setForm] = useState({ class_name: '', major_id: 0, remark: '' });

  const filtered = classes.filter(c => c.class_name.includes(search) || getMajorName(c.major_id).includes(search));

  const openAdd = () => { setEditing(null); setForm({ class_name: '', major_id: majors[0]?.id || 0, remark: '' }); setModalOpen(true); };
  const openEdit = (c: ClassInfo) => { setEditing(c); setForm({ class_name: c.class_name, major_id: c.major_id, remark: c.remark }); setModalOpen(true); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.class_name) return;
    if (editing) updateClass({ ...editing, ...form });
    else addClass(form);
    setModalOpen(false);
  };

  return (
    <div>
      <SearchBar value={search} onChange={setSearch} placeholder="搜索班级名称、专业..." onAdd={openAdd} addLabel="新增班级" />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 text-left font-medium">编号</th>
                <th className="px-4 py-3 text-left font-medium">班级名称</th>
                <th className="px-4 py-3 text-left font-medium">所属专业</th>
                <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">备注</th>
                <th className="px-4 py-3 text-center font-medium">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-4 py-3 text-gray-500">{c.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{c.class_name}</td>
                  <td className="px-4 py-3 text-gray-600">{getMajorName(c.major_id)}</td>
                  <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{c.remark || '-'}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => { if (confirm('确定删除？')) deleteClass(c.id); }} className="p-1.5 rounded-lg hover:bg-red-100 text-red-500"><Trash2 className="w-4 h-4" /></button>
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

      <Modal open={modalOpen} title={editing ? '编辑班级' : '新增班级'} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">班级名称 <span className="text-red-500">*</span></label>
            <input value={form.class_name} onChange={e => setForm({ ...form, class_name: e.target.value })} className="form-input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">所属专业</label>
            <select value={form.major_id} onChange={e => setForm({ ...form, major_id: Number(e.target.value) })} className="form-input">
              <option value={0}>请选择</option>
              {majors.map(m => <option key={m.id} value={m.id}>{m.major_name}</option>)}
            </select>
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
