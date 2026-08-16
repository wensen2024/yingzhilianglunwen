import { useState } from 'react';
import { useData } from '../store/DataContext';
import Modal from '../components/Modal';
import SearchBar from '../components/SearchBar';
import { Edit, Trash2 } from 'lucide-react';
import type { Teacher } from '../types';

export default function TeacherPage() {
  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useData();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Teacher | null>(null);
  const [form, setForm] = useState({ teacher_no: '', name: '', gender: '男', phone: '', remark: '' });

  const filtered = teachers.filter(t => t.name.includes(search) || t.teacher_no.includes(search));

  const openAdd = () => {
    setEditing(null);
    setForm({ teacher_no: '', name: '', gender: '男', phone: '', remark: '' });
    setModalOpen(true);
  };

  const openEdit = (t: Teacher) => {
    setEditing(t);
    setForm({ teacher_no: t.teacher_no, name: t.name, gender: t.gender, phone: t.phone, remark: t.remark });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.teacher_no || !form.name) return;
    if (editing) updateTeacher({ ...editing, ...form });
    else addTeacher(form);
    setModalOpen(false);
  };

  return (
    <div>
      <SearchBar value={search} onChange={setSearch} placeholder="搜索工号、姓名..." onAdd={openAdd} addLabel="新增教师" />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 text-left font-medium">工号</th>
                <th className="px-4 py-3 text-left font-medium">姓名</th>
                <th className="px-4 py-3 text-left font-medium">性别</th>
                <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">手机号</th>
                <th className="px-4 py-3 text-left font-medium hidden md:table-cell">备注</th>
                <th className="px-4 py-3 text-center font-medium">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-blue-600">{t.teacher_no}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{t.name}</td>
                  <td className="px-4 py-3 text-gray-600">{t.gender}</td>
                  <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{t.phone || '-'}</td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{t.remark || '-'}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => { if (confirm('确定删除？')) deleteTeacher(t.id); }} className="p-1.5 rounded-lg hover:bg-red-100 text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-400">暂无数据</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-xs text-gray-400 border-t border-gray-100">共 {filtered.length} 条记录</div>
      </div>

      <Modal open={modalOpen} title={editing ? '编辑教师' : '新增教师'} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">工号 <span className="text-red-500">*</span></label>
              <input value={form.teacher_no} onChange={e => setForm({ ...form, teacher_no: e.target.value })} className="form-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">姓名 <span className="text-red-500">*</span></label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="form-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">性别</label>
              <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} className="form-input">
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">手机号</label>
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="form-input" />
            </div>
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
