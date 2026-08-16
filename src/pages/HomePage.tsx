import { useData } from '../store/DataContext';
import { Users, UserCheck, BookOpen, Building2, Layers, ClipboardList, CheckSquare, Megaphone, TrendingUp, Award } from 'lucide-react';

export default function HomePage() {
  const { currentUser, students, teachers, majors, classes, courses, grades, selections, announcements, getStudentByUserId, getTeacherByUserId, getMajorName, getClassName, getCourseName } = useData();

  if (!currentUser) return null;

  const statsCards = [
    { label: '学生总数', value: students.length, icon: <Users className="w-6 h-6" />, color: 'from-blue-500 to-blue-600' },
    { label: '教师总数', value: teachers.length, icon: <UserCheck className="w-6 h-6" />, color: 'from-green-500 to-green-600' },
    { label: '专业数量', value: majors.length, icon: <Building2 className="w-6 h-6" />, color: 'from-purple-500 to-purple-600' },
    { label: '班级数量', value: classes.length, icon: <Layers className="w-6 h-6" />, color: 'from-orange-500 to-orange-600' },
    { label: '课程数量', value: courses.length, icon: <BookOpen className="w-6 h-6" />, color: 'from-pink-500 to-pink-600' },
    { label: '成绩记录', value: grades.length, icon: <ClipboardList className="w-6 h-6" />, color: 'from-teal-500 to-teal-600' },
    { label: '选课记录', value: selections.length, icon: <CheckSquare className="w-6 h-6" />, color: 'from-indigo-500 to-indigo-600' },
    { label: '公告数量', value: announcements.length, icon: <Megaphone className="w-6 h-6" />, color: 'from-red-500 to-red-600' },
  ];

  // Calculate average score
  const avgScore = grades.length > 0 ? (grades.reduce((sum, g) => sum + g.score, 0) / grades.length).toFixed(1) : '0';

  // For student view
  if (currentUser.role === 'student') {
    const student = getStudentByUserId(currentUser.id);
    const myGrades = student ? grades.filter(g => g.student_id === student.id) : [];
    const mySelections = student ? selections.filter(s => s.student_id === student.id) : [];
    const myAvg = myGrades.length > 0 ? (myGrades.reduce((sum, g) => sum + g.score, 0) / myGrades.length).toFixed(1) : '-';

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-1">欢迎回来，{currentUser.real_name}！</h2>
          <p className="text-blue-100">学籍管理信息系统 — 学生端</p>
        </div>

        {student && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" /> 个人信息概览
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InfoItem label="学号" value={student.student_no} />
              <InfoItem label="姓名" value={student.name} />
              <InfoItem label="专业" value={getMajorName(student.major_id)} />
              <InfoItem label="班级" value={getClassName(student.class_id)} />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard icon={<ClipboardList className="w-6 h-6" />} label="已修课程" value={String(myGrades.length)} color="from-blue-500 to-blue-600" />
          <StatCard icon={<Award className="w-6 h-6" />} label="平均成绩" value={myAvg} color="from-green-500 to-green-600" />
          <StatCard icon={<CheckSquare className="w-6 h-6" />} label="已选课程" value={String(mySelections.length)} color="from-purple-500 to-purple-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">最近成绩</h3>
            {myGrades.length === 0 ? (
              <p className="text-gray-400 text-center py-8">暂无成绩记录</p>
            ) : (
              <div className="space-y-3">
                {myGrades.slice(-5).reverse().map(g => (
                  <div key={g.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-700">{getCourseName(g.course_id)}</p>
                      <p className="text-xs text-gray-400">{g.term}</p>
                    </div>
                    <span className={`text-lg font-bold ${g.score >= 90 ? 'text-green-600' : g.score >= 60 ? 'text-blue-600' : 'text-red-500'}`}>
                      {g.score}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">最新公告</h3>
            {announcements.length === 0 ? (
              <p className="text-gray-400 text-center py-8">暂无公告</p>
            ) : (
              <div className="space-y-3">
                {announcements.slice(-3).reverse().map(a => (
                  <div key={a.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">{a.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{a.publish_time}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // For teacher view
  if (currentUser.role === 'teacher') {
    const teacher = getTeacherByUserId(currentUser.id);
    const myGrades = teacher ? grades.filter(g => g.teacher_id === teacher.id) : [];

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-1">欢迎回来，{currentUser.real_name}！</h2>
          <p className="text-green-100">学籍管理信息系统 — 教师端</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <StatCard icon={<Users className="w-6 h-6" />} label="学生总数" value={String(students.length)} color="from-blue-500 to-blue-600" />
          <StatCard icon={<BookOpen className="w-6 h-6" />} label="课程总数" value={String(courses.length)} color="from-purple-500 to-purple-600" />
          <StatCard icon={<ClipboardList className="w-6 h-6" />} label="录入成绩" value={String(myGrades.length)} color="from-green-500 to-green-600" />
          <StatCard icon={<Megaphone className="w-6 h-6" />} label="公告数量" value={String(announcements.length)} color="from-orange-500 to-orange-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">最近录入成绩</h3>
            {myGrades.length === 0 ? (
              <p className="text-gray-400 text-center py-8">暂无成绩记录</p>
            ) : (
              <div className="space-y-3">
                {myGrades.slice(-5).reverse().map(g => (
                  <div key={g.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-700">{getCourseName(g.course_id)}</p>
                      <p className="text-xs text-gray-400">学生：{students.find(s => s.id === g.student_id)?.name || '-'}</p>
                    </div>
                    <span className={`text-lg font-bold ${g.score >= 90 ? 'text-green-600' : g.score >= 60 ? 'text-blue-600' : 'text-red-500'}`}>
                      {g.score}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">最新公告</h3>
            {announcements.length === 0 ? (
              <p className="text-gray-400 text-center py-8">暂无公告</p>
            ) : (
              <div className="space-y-3">
                {announcements.slice(-3).reverse().map(a => (
                  <div key={a.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">{a.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{a.publish_time}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Admin view
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-1">欢迎回来，{currentUser.real_name}！</h2>
        <p className="text-blue-100">学籍管理信息系统 — 管理员控制台</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statsCards.map((card, i) => (
          <StatCard key={i} icon={card.icon} label={card.label} value={String(card.value)} color={card.color} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" /> 数据概览
          </h3>
          <div className="space-y-4">
            <DataBar label="必修课程" value={courses.filter(c => c.course_type === '必修').length} max={courses.length} color="bg-blue-500" />
            <DataBar label="选修课程" value={courses.filter(c => c.course_type === '选修').length} max={courses.length} color="bg-purple-500" />
            <DataBar label="男生人数" value={students.filter(s => s.gender === '男').length} max={students.length} color="bg-green-500" />
            <DataBar label="女生人数" value={students.filter(s => s.gender === '女').length} max={students.length} color="bg-pink-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-green-600" /> 成绩统计
          </h3>
          <div className="text-center mb-4">
            <span className="text-4xl font-bold text-blue-600">{avgScore}</span>
            <p className="text-sm text-gray-400 mt-1">全校平均分</p>
          </div>
          <div className="space-y-3">
            <ScoreStat label="优秀 (≥90)" count={grades.filter(g => g.score >= 90).length} total={grades.length} color="text-green-600" />
            <ScoreStat label="良好 (80-89)" count={grades.filter(g => g.score >= 80 && g.score < 90).length} total={grades.length} color="text-blue-600" />
            <ScoreStat label="及格 (60-79)" count={grades.filter(g => g.score >= 60 && g.score < 80).length} total={grades.length} color="text-orange-500" />
            <ScoreStat label="不及格 (<60)" count={grades.filter(g => g.score < 60).length} total={grades.length} color="text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-red-500" /> 最新公告
          </h3>
          {announcements.length === 0 ? (
            <p className="text-gray-400 text-center py-8">暂无公告</p>
          ) : (
            <div className="space-y-3">
              {announcements.slice(-4).reverse().map(a => (
                <div key={a.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 line-clamp-1">{a.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{a.publish_time}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className="text-xs text-gray-400">{label}</p>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-700">{value}</p>
    </div>
  );
}

function DataBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="text-gray-500 font-medium">{value}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div className={`${color} h-2 rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function ScoreStat({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  const pct = total > 0 ? ((count / total) * 100).toFixed(0) : '0';
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`text-sm font-bold ${color}`}>{count}</span>
        <span className="text-xs text-gray-400">({pct}%)</span>
      </div>
    </div>
  );
}
