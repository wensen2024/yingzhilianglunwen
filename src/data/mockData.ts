import type { User, Student, Teacher, Major, ClassInfo, Course, Grade, CourseSelection, Announcement } from '../types';

export const initialUsers: User[] = [
  { id: 1, username: 'admin', password: '123456', role: 'admin', real_name: '系统管理员' },
  { id: 2, username: 'teacher1', password: '123456', role: 'teacher', real_name: '张教授' },
  { id: 3, username: 'teacher2', password: '123456', role: 'teacher', real_name: '李老师' },
  { id: 4, username: 'student1', password: '123456', role: 'student', real_name: '王明' },
  { id: 5, username: 'student2', password: '123456', role: 'student', real_name: '刘芳' },
  { id: 6, username: 'teacher3', password: '123456', role: 'teacher', real_name: '赵讲师' },
  { id: 7, username: 'student3', password: '123456', role: 'student', real_name: '陈晨' },
  { id: 8, username: 'student4', password: '123456', role: 'student', real_name: '杨帆' },
];

export const initialMajors: Major[] = [
  { id: 1, major_name: '计算机科学与技术', department: '信息工程学院', remark: '省级重点专业' },
  { id: 2, major_name: '软件工程', department: '信息工程学院', remark: '' },
  { id: 3, major_name: '电子信息工程', department: '电子工程学院', remark: '' },
  { id: 4, major_name: '数学与应用数学', department: '理学院', remark: '' },
  { id: 5, major_name: '工商管理', department: '管理学院', remark: '' },
];

export const initialClasses: ClassInfo[] = [
  { id: 1, class_name: '计科2101班', major_id: 1, remark: '' },
  { id: 2, class_name: '计科2102班', major_id: 1, remark: '' },
  { id: 3, class_name: '软工2101班', major_id: 2, remark: '' },
  { id: 4, class_name: '电信2101班', major_id: 3, remark: '' },
  { id: 5, class_name: '数学2101班', major_id: 4, remark: '' },
  { id: 6, class_name: '工管2101班', major_id: 5, remark: '' },
];

export const initialStudents: Student[] = [
  { id: 1, student_no: '20210101', name: '王明', gender: '男', id_card: '110101200301011234', phone: '13800138001', enroll_time: '2021-09-01', major_id: 1, class_id: 1 },
  { id: 2, student_no: '20210102', name: '刘芳', gender: '女', id_card: '110101200302021235', phone: '13800138002', enroll_time: '2021-09-01', major_id: 1, class_id: 1 },
  { id: 3, student_no: '20210103', name: '陈晨', gender: '男', id_card: '110101200303031236', phone: '13800138003', enroll_time: '2021-09-01', major_id: 2, class_id: 3 },
  { id: 4, student_no: '20210104', name: '杨帆', gender: '男', id_card: '110101200304041237', phone: '13800138004', enroll_time: '2021-09-01', major_id: 1, class_id: 2 },
  { id: 5, student_no: '20210201', name: '赵雪', gender: '女', id_card: '110101200305051238', phone: '13800138005', enroll_time: '2021-09-01', major_id: 3, class_id: 4 },
  { id: 6, student_no: '20210301', name: '孙磊', gender: '男', id_card: '110101200306061239', phone: '13800138006', enroll_time: '2021-09-01', major_id: 4, class_id: 5 },
  { id: 7, student_no: '20210401', name: '周婷', gender: '女', id_card: '110101200307071240', phone: '13800138007', enroll_time: '2021-09-01', major_id: 5, class_id: 6 },
  { id: 8, student_no: '20210105', name: '吴强', gender: '男', id_card: '110101200308081241', phone: '13800138008', enroll_time: '2021-09-01', major_id: 2, class_id: 3 },
];

export const initialTeachers: Teacher[] = [
  { id: 1, teacher_no: 'T001', name: '张教授', gender: '男', phone: '13900139001', remark: '教授，硕士生导师' },
  { id: 2, teacher_no: 'T002', name: '李老师', gender: '女', phone: '13900139002', remark: '副教授' },
  { id: 3, teacher_no: 'T003', name: '赵讲师', gender: '男', phone: '13900139003', remark: '讲师' },
];

export const initialCourses: Course[] = [
  { id: 1, course_name: '高等数学', course_type: '必修', credit: 4.0, remark: '' },
  { id: 2, course_name: '大学英语', course_type: '必修', credit: 3.0, remark: '' },
  { id: 3, course_name: '数据结构', course_type: '必修', credit: 3.5, remark: '核心课程' },
  { id: 4, course_name: '操作系统', course_type: '必修', credit: 3.0, remark: '' },
  { id: 5, course_name: '计算机网络', course_type: '必修', credit: 3.0, remark: '' },
  { id: 6, course_name: 'Java程序设计', course_type: '必修', credit: 3.5, remark: '' },
  { id: 7, course_name: '数据库原理', course_type: '必修', credit: 3.0, remark: '' },
  { id: 8, course_name: '人工智能导论', course_type: '选修', credit: 2.0, remark: '' },
  { id: 9, course_name: 'Web前端开发', course_type: '选修', credit: 2.5, remark: '' },
  { id: 10, course_name: '软件工程', course_type: '必修', credit: 3.0, remark: '' },
];

export const initialGrades: Grade[] = [
  { id: 1, student_id: 1, course_id: 1, teacher_id: 1, score: 92, term: '2021-2022学年第一学期' },
  { id: 2, student_id: 1, course_id: 2, teacher_id: 2, score: 85, term: '2021-2022学年第一学期' },
  { id: 3, student_id: 1, course_id: 3, teacher_id: 1, score: 88, term: '2021-2022学年第二学期' },
  { id: 4, student_id: 2, course_id: 1, teacher_id: 1, score: 78, term: '2021-2022学年第一学期' },
  { id: 5, student_id: 2, course_id: 2, teacher_id: 2, score: 91, term: '2021-2022学年第一学期' },
  { id: 6, student_id: 3, course_id: 3, teacher_id: 1, score: 95, term: '2021-2022学年第二学期' },
  { id: 7, student_id: 3, course_id: 6, teacher_id: 3, score: 87, term: '2021-2022学年第二学期' },
  { id: 8, student_id: 4, course_id: 1, teacher_id: 1, score: 73, term: '2021-2022学年第一学期' },
  { id: 9, student_id: 5, course_id: 4, teacher_id: 2, score: 80, term: '2021-2022学年第二学期' },
  { id: 10, student_id: 6, course_id: 1, teacher_id: 1, score: 96, term: '2021-2022学年第一学期' },
];

export const initialSelections: CourseSelection[] = [
  { id: 1, student_id: 1, course_id: 8, select_time: '2023-02-20 10:30:00' },
  { id: 2, student_id: 1, course_id: 9, select_time: '2023-02-20 10:35:00' },
  { id: 3, student_id: 2, course_id: 8, select_time: '2023-02-21 09:15:00' },
  { id: 4, student_id: 3, course_id: 9, select_time: '2023-02-21 14:20:00' },
  { id: 5, student_id: 4, course_id: 8, select_time: '2023-02-22 11:00:00' },
];

export const initialAnnouncements: Announcement[] = [
  { id: 1, title: '2024-2025学年第二学期选课通知', content: '各位同学：\n\n2024-2025学年第二学期选课工作即将开始，请同学们在规定时间内完成选课操作。\n\n选课时间：2025年2月15日-2月28日\n\n注意事项：\n1. 请仔细阅读课程说明后再进行选课\n2. 选课后如需退选，请在开学第一周内办理\n3. 如有疑问请联系教务处\n\n教务处\n2025年2月10日', publisher: '系统管理员', publish_time: '2025-02-10 09:00:00' },
  { id: 2, title: '关于开展2024年度学籍信息核查的通知', content: '全体同学：\n\n为确保学籍信息准确，现开展年度学籍信息核查工作，请同学们登录系统核实个人信息。\n\n如有信息错误，请及时联系辅导员进行更正。\n\n学生处\n2025年1月15日', publisher: '系统管理员', publish_time: '2025-01-15 14:30:00' },
  { id: 3, title: '期末考试安排通知', content: '各位师生：\n\n2024-2025学年第一学期期末考试将于2025年1月6日开始，请各位同学做好复习准备，注意诚信考试。\n\n具体考试时间和地点请查看教务系统。\n\n教务处\n2024年12月25日', publisher: '系统管理员', publish_time: '2024-12-25 10:00:00' },
];
