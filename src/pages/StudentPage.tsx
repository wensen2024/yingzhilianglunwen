import { useState } from 'react';
import { useData } from '../store/DataContext';
import Modal from '../components/Modal';
import SearchBar from '../components/SearchBar';
import { Edit, Trash2 } from 'lucide-react';
import type { Student } from '../types';

export default function StudentPage() {
  const { currentUser, students, addStudent, updateStudent, deleteStudent, majors, classes, getMajorName, getClassName } = useData();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [form, setForm] = useState({ student_no: '', name: '', gender: '男', id_card: '', phone: '', enroll_time: '', major_id: 0, class_id: 0 });

  const isAdmin = currentUser?.role === 'admin';

  const filtered = students.filter(s =>
    s.name.includes(search) || s.student_no.includes(search) || getMajorName(s.major_id).includes(search)
  );

  const openAdd = () => {
    setEditing(null);
    setForm({ student_no: '', name: '', gender: '男', id_card: '', phone: '', enroll_time: '', major_id: majors[0]?.id || 0, class_id: classes[0]?.id || 0 });
    setModalOpen(true);
  };

  const openEdit = (s: Student) => {
    setEditing(s);
    setForm({ student_no: s.student_no, name: s.name, gender: s.gender, id_card: s.id_card, phone: s.phone, enroll_time: s.enroll_time, major_id: s.major_id, class_id: s.class_id });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.student_no || !form.name) return;
    if (editing) {
      updateStudent({ ...editing, ...form });
    } else {
      addStudent(form);
    }
    setModalOpen(false);
  };

  const filteredClasses = classes.filter(c => c.major_id === form.major_id);

  return (
    <div>
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="搜索学号、姓名、专业..."
        onAdd={isAdmin ? openAdd : undefined}
        addLabel="新增学生"
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 text-left font-medium">学号</th>
                <th className="px-4 py-3 text-left font-medium">姓名</th>
                <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">性别</th>
                <th className="px-4 py-3 text-left font-medium hidden md:table-cell">手机号</th>
                <th className="px-4 py-3 text-left font-medium">专业</th>
                <th className="px-4 py-3 text-left font-medium hidden lg:table-cell">班级</th>
                <th className="px-4 py-3 text-left font-medium hidden lg:table-cell">入学时间</th>
                {isAdmin && <th className="px-4 py-3 text-center font-medium">操作</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-blue-600">{s.student_no}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{s.name}</td>
                  <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{s.gender}</td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{s.phone || '-'}</td>
                  <td className="px-4 py-3 text-gray-600">{getMajorName(s.major_id)}</td>
                  <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">{getClassName(s.class_id)}</td>
                  <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">{s.enroll_time || '-'}</td>
                  {isAdmin && (
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => { if (confirm('确定删除该学生？')) deleteStudent(s.id); }} className="p-1.5 rounded-lg hover:bg-red-100 text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-gray-400">暂无数据</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-xs text-gray-400 border-t border-gray-100">
          共 {filtered.length} 条记录
        </div>
      </div>

      <Modal open={modalOpen} title={editing ? '编辑学生' : '新增学生'} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="学号" required>
              <input value={form.student_no} onChange={e => setForm({ ...form, student_no: e.target.value })} className="form-input" />
            </FormField>
            <FormField label="姓名" required>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="form-input" />
            </FormField>
            <FormField label="性别">
              <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} className="form-input">
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </FormField>
            <FormField label="手机号">
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="form-input" />
            </FormField>
            <FormField label="身份证号">
              <input value={form.id_card} onChange={e => setForm({ ...form, id_card: e.target.value })} className="form-input" />
            </FormField>
            <FormField label="入学时间">
              <input type="date" value={form.enroll_time} onChange={e => setForm({ ...form, enroll_time: e.target.value })} className="form-input" />
            </FormField>
            <FormField label="专业">
              <select value={form.major_id} onChange={e => setForm({ ...form, major_id: Number(e.target.value), class_id: 0 })} className="form-input">
                <option value={0}>请选择</option>
                {majors.map(m => <option key={m.id} value={m.id}>{m.major_name}</option>)}
              </select>
            </FormField>
            <FormField label="班级">
              <select value={form.class_id} onChange={e => setForm({ ...form, class_id: Number(e.target.value) })} className="form-input">
                <option value={0}>请选择</option>
                {filteredClasses.map(c => <option key={c.id} value={c.id}>{c.class_name}</option>)}
              </select>
            </FormField>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">取消</button>
            <button type="submit" className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors">保存</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
