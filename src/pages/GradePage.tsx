import { useState } from 'react';
import { useData } from '../store/DataContext';
import Modal from '../components/Modal';
import SearchBar from '../components/SearchBar';
import { Edit, Trash2 } from 'lucide-react';
import type { Grade } from '../types';

export default function GradePage() {
  const { currentUser, grades, addGrade, updateGrade, deleteGrade, students, courses, teachers, getStudentName, getCourseName, getTeacherName, getStudentByUserId, getTeacherByUserId } = useData();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Grade | null>(null);
  const [form, setForm] = useState({ student_id: 0, course_id: 0, teacher_id: 0, score: 0, term: '' });

  const isAdmin = currentUser?.role === 'admin';
  const isTeacher = currentUser?.role === 'teacher';
  const isStudent = currentUser?.role === 'student';

  let displayGrades = grades;

  if (isStudent && currentUser) {
    const stu = getStudentByUserId(currentUser.id);
    if (stu) displayGrades = grades.filter(g => g.student_id === stu.id);
    else displayGrades = [];
  }

  if (isTeacher && currentUser) {
    const tea = getTeacherByUserId(currentUser.id);
    if (tea) displayGrades = grades.filter(g => g.teacher_id === tea.id);
    else displayGrades = [];
  }

  const filtered = displayGrades.filter(g =>
    getStudentName(g.student_id).includes(search) || getCourseName(g.course_id).includes(search) || g.term.includes(search)
  );

  const canAdd = isAdmin || isTeacher;

  const openAdd = () => {
    setEditing(null);
    const teacherUser = isTeacher && currentUser ? getTeacherByUserId(currentUser.id) : null;
    setForm({ student_id: students[0]?.id || 0, course_id: courses[0]?.id || 0, teacher_id: teacherUser?.id || teachers[0]?.id || 0, score: 0, term: '' });
    setModalOpen(true);
  };

  const openEdit = (g: Grade) => {
    setEditing(g);
    setForm({ student_id: g.student_id, course_id: g.course_id, teacher_id: g.teacher_id, score: g.score, term: g.term });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.student_id || !form.course_id || !form.term) return;
    if (editing) updateGrade({ ...editing, ...form });
    else addGrade(form);
    setModalOpen(false);
  };

  const scoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 60) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div>
      <SearchBar value={search} onChange={setSearch} placeholder="搜索学生、课程、学期..." onAdd={canAdd ? openAdd : undefined} addLabel="录入成绩" />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 text-left font-medium">学生</th>
                <th className="px-4 py-3 text-left font-medium">课程</th>
                <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">教师</th>
                <th className="px-4 py-3 text-center font-medium">成绩</th>
                <th className="px-4 py-3 text-left font-medium hidden md:table-cell">学期</th>
                {canAdd && <th className="px-4 py-3 text-center font-medium">操作</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(g => (
                <tr key={g.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800">{getStudentName(g.student_id)}</td>
                  <td className="px-4 py-3 text-gray-600">{getCourseName(g.course_id)}</td>
                  <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{getTeacherName(g.teacher_id)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${scoreColor(g.score)}`}>
                      {g.score}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">{g.term}</td>
                  {canAdd && (
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => openEdit(g)} className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600"><Edit className="w-4 h-4" /></button>
                        {isAdmin && <button onClick={() => { if (confirm('确定删除？')) deleteGrade(g.id); }} className="p-1.5 rounded-lg hover:bg-red-100 text-red-500"><Trash2 className="w-4 h-4" /></button>}
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

      <Modal open={modalOpen} title={editing ? '编辑成绩' : '录入成绩'} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">学生 <span className="text-red-500">*</span></label>
              <select value={form.student_id} onChange={e => setForm({ ...form, student_id: Number(e.target.value) })} className="form-input">
                <option value={0}>请选择</option>
                {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.student_no})</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">课程 <span className="text-red-500">*</span></label>
              <select value={form.course_id} onChange={e => setForm({ ...form, course_id: Number(e.target.value) })} className="form-input">
                <option value={0}>请选择</option>
                {courses.map(c => <option key={c.id} value={c.id}>{c.course_name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">教师</label>
              <select value={form.teacher_id} onChange={e => setForm({ ...form, teacher_id: Number(e.target.value) })} className="form-input" disabled={isTeacher}>
                <option value={0}>请选择</option>
                {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">成绩 <span className="text-red-500">*</span></label>
              <input type="number" step="0.1" min="0" max="100" value={form.score} onChange={e => setForm({ ...form, score: Number(e.target.value) })} className="form-input" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">学期 <span className="text-red-500">*</span></label>
            <select value={form.term} onChange={e => setForm({ ...form, term: e.target.value })} className="form-input">
              <option value="">请选择</option>
              <option value="2021-2022学年第一学期">2021-2022学年第一学期</option>
              <option value="2021-2022学年第二学期">2021-2022学年第二学期</option>
              <option value="2022-2023学年第一学期">2022-2023学年第一学期</option>
              <option value="2022-2023学年第二学期">2022-2023学年第二学期</option>
              <option value="2023-2024学年第一学期">2023-2024学年第一学期</option>
              <option value="2023-2024学年第二学期">2023-2024学年第二学期</option>
              <option value="2024-2025学年第一学期">2024-2025学年第一学期</option>
              <option value="2024-2025学年第二学期">2024-2025学年第二学期</option>
            </select>
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
