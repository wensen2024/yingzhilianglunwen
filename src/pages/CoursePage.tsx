import { useState } from 'react';
import { useData } from '../store/DataContext';
import Modal from '../components/Modal';
import SearchBar from '../components/SearchBar';
import { Edit, Trash2 } from 'lucide-react';
import type { Course } from '../types';

export default function CoursePage() {
  const { currentUser, courses, addCourse, updateCourse, deleteCourse } = useData();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Course | null>(null);
  const [form, setForm] = useState({ course_name: '', course_type: '必修', credit: 3.0, remark: '' });

  const isAdmin = currentUser?.role === 'admin';
  const filtered = courses.filter(c => c.course_name.includes(search) || c.course_type.includes(search));

  const openAdd = () => { setEditing(null); setForm({ course_name: '', course_type: '必修', credit: 3.0, remark: '' }); setModalOpen(true); };
  const openEdit = (c: Course) => { setEditing(c); setForm({ course_name: c.course_name, course_type: c.course_type, credit: c.credit, remark: c.remark }); setModalOpen(true); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.course_name) return;
    if (editing) updateCourse({ ...editing, ...form });
    else addCourse(form);
    setModalOpen(false);
  };

  return (
    <div>
      <SearchBar value={search} onChange={setSearch} placeholder="搜索课程名称、类型..." onAdd={isAdmin ? openAdd : undefined} addLabel="新增课程" />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 text-left font-medium">编号</th>
                <th className="px-4 py-3 text-left font-medium">课程名称</th>
                <th className="px-4 py-3 text-left font-medium">课程类型</th>
                <th className="px-4 py-3 text-left font-medium">学分</th>
                <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">备注</th>
                {isAdmin && <th className="px-4 py-3 text-center font-medium">操作</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-4 py-3 text-gray-500">{c.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{c.course_name}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${c.course_type === '必修' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                      {c.course_type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{c.credit}</td>
                  <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{c.remark || '-'}</td>
                  {isAdmin && (
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => { if (confirm('确定删除？')) deleteCourse(c.id); }} className="p-1.5 rounded-lg hover:bg-red-100 text-red-500"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-400">暂无数据</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-xs text-gray-400 border-t border-gray-100">共 {filtered.length} 条记录</div>
      </div>

      <Modal open={modalOpen} title={editing ? '编辑课程' : '新增课程'} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">课程名称 <span className="text-red-500">*</span></label>
              <input value={form.course_name} onChange={e => setForm({ ...form, course_name: e.target.value })} className="form-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">课程类型</label>
              <select value={form.course_type} onChange={e => setForm({ ...form, course_type: e.target.value })} className="form-input">
                <option value="必修">必修</option>
                <option value="选修">选修</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">学分</label>
              <input type="number" step="0.5" min="0" value={form.credit} onChange={e => setForm({ ...form, credit: Number(e.target.value) })} className="form-input" />
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
