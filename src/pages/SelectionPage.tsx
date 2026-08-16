import { useState } from 'react';
import { useData } from '../store/DataContext';
import SearchBar from '../components/SearchBar';
import { Trash2, CheckCircle, BookOpen } from 'lucide-react';

export default function SelectionPage() {
  const { currentUser, selections, addSelection, deleteSelection, courses, getStudentName, getCourseName, getStudentByUserId } = useData();
  const [search, setSearch] = useState('');

  const isStudent = currentUser?.role === 'student';

  const student = isStudent && currentUser ? getStudentByUserId(currentUser.id) : null;

  let displaySelections = selections;
  if (isStudent && student) {
    displaySelections = selections.filter(s => s.student_id === student.id);
  }

  const filtered = displaySelections.filter(s =>
    getStudentName(s.student_id).includes(search) || getCourseName(s.course_id).includes(search)
  );

  // Available courses for student selection
  const selectedCourseIds = student ? selections.filter(s => s.student_id === student.id).map(s => s.course_id) : [];
  const availableCourses = courses.filter(c => c.course_type === '选修' && !selectedCourseIds.includes(c.id));

  const handleSelect = (courseId: number) => {
    if (!student) return;
    addSelection({
      student_id: student.id,
      course_id: courseId,
      select_time: new Date().toISOString().replace('T', ' ').substring(0, 19),
    });
  };

  return (
    <div className="space-y-6">
      {/* Student course selection panel */}
      {isStudent && student && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" /> 可选课程
          </h3>
          {availableCourses.length === 0 ? (
            <p className="text-gray-400 text-center py-6">暂无可选课程</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {availableCourses.map(c => (
                <div key={c.id} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">{c.course_name}</h4>
                      <p className="text-sm text-gray-500 mt-1">学分：{c.credit} | {c.course_type}</p>
                      {c.remark && <p className="text-xs text-gray-400 mt-1">{c.remark}</p>}
                    </div>
                    <button
                      onClick={() => handleSelect(c.id)}
                      className="ml-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg transition-colors flex items-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      选课
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Selection records */}
      <div>
        <SearchBar value={search} onChange={setSearch} placeholder="搜索学生、课程..." />
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  {!isStudent && <th className="px-4 py-3 text-left font-medium">学生</th>}
                  <th className="px-4 py-3 text-left font-medium">课程</th>
                  <th className="px-4 py-3 text-left font-medium">学分</th>
                  <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">选课时间</th>
                  <th className="px-4 py-3 text-center font-medium">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(s => {
                  const course = courses.find(c => c.id === s.course_id);
                  return (
                    <tr key={s.id} className="hover:bg-blue-50/50 transition-colors">
                      {!isStudent && <td className="px-4 py-3 font-medium text-gray-800">{getStudentName(s.student_id)}</td>}
                      <td className="px-4 py-3 text-gray-700">{getCourseName(s.course_id)}</td>
                      <td className="px-4 py-3 text-gray-600">{course?.credit || '-'}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs hidden sm:table-cell">{s.select_time}</td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => { if (confirm('确定取消选课？')) deleteSelection(s.id); }} className="p-1.5 rounded-lg hover:bg-red-100 text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && <tr><td colSpan={5} className="px-4 py-12 text-center text-gray-400">暂无选课记录</td></tr>}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-xs text-gray-400 border-t border-gray-100">共 {filtered.length} 条记录</div>
        </div>
      </div>
    </div>
  );
}
