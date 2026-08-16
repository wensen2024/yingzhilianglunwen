import { useData } from '../store/DataContext';
import { User, BookOpen, Building2, Layers, Phone, CreditCard, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, getStudentByUserId, getMajorName, getClassName } = useData();

  if (!currentUser) return null;

  const student = getStudentByUserId(currentUser.id);

  if (!student) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <p className="text-gray-400">未找到学生信息</p>
      </div>
    );
  }

  const fields = [
    { icon: <User className="w-5 h-5" />, label: '学号', value: student.student_no },
    { icon: <User className="w-5 h-5" />, label: '姓名', value: student.name },
    { icon: <User className="w-5 h-5" />, label: '性别', value: student.gender },
    { icon: <CreditCard className="w-5 h-5" />, label: '身份证号', value: student.id_card || '-' },
    { icon: <Phone className="w-5 h-5" />, label: '手机号码', value: student.phone || '-' },
    { icon: <Calendar className="w-5 h-5" />, label: '入学时间', value: student.enroll_time || '-' },
    { icon: <Building2 className="w-5 h-5" />, label: '专业', value: getMajorName(student.major_id) },
    { icon: <Layers className="w-5 h-5" />, label: '班级', value: getClassName(student.class_id) },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white text-center mb-6">
        <div className="w-20 h-20 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-3xl font-bold">{student.name[0]}</span>
        </div>
        <h2 className="text-xl font-bold">{student.name}</h2>
        <p className="text-blue-100">{student.student_no}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" /> 个人基本信息
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((f, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                {f.icon}
              </div>
              <div>
                <p className="text-xs text-gray-400">{f.label}</p>
                <p className="text-sm font-medium text-gray-700">{f.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
