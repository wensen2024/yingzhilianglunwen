export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
  real_name: string;
}

export interface Student {
  id: number;
  student_no: string;
  name: string;
  gender: string;
  id_card: string;
  phone: string;
  enroll_time: string;
  major_id: number;
  class_id: number;
}

export interface Teacher {
  id: number;
  teacher_no: string;
  name: string;
  gender: string;
  phone: string;
  remark: string;
}

export interface Major {
  id: number;
  major_name: string;
  department: string;
  remark: string;
}

export interface ClassInfo {
  id: number;
  class_name: string;
  major_id: number;
  remark: string;
}

export interface Course {
  id: number;
  course_name: string;
  course_type: string;
  credit: number;
  remark: string;
}

export interface Grade {
  id: number;
  student_id: number;
  course_id: number;
  teacher_id: number;
  score: number;
  term: string;
}

export interface CourseSelection {
  id: number;
  student_id: number;
  course_id: number;
  select_time: string;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  publisher: string;
  publish_time: string;
}
