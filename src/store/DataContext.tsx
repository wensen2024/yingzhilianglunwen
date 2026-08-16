import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User, Student, Teacher, Major, ClassInfo, Course, Grade, CourseSelection, Announcement, UserRole } from '../types';
import {
  initialUsers, initialStudents, initialTeachers, initialMajors,
  initialClasses, initialCourses, initialGrades, initialSelections, initialAnnouncements
} from '../data/mockData';

interface AuthUser {
  id: number;
  username: string;
  role: UserRole;
  real_name: string;
}

interface DataContextType {
  // Auth
  currentUser: AuthUser | null;
  login: (username: string, password: string, role: UserRole) => boolean;
  logout: () => void;

  // Users
  users: User[];
  addUser: (u: Omit<User, 'id'>) => void;
  updateUser: (u: User) => void;
  deleteUser: (id: number) => void;

  // Students
  students: Student[];
  addStudent: (s: Omit<Student, 'id'>) => void;
  updateStudent: (s: Student) => void;
  deleteStudent: (id: number) => void;

  // Teachers
  teachers: Teacher[];
  addTeacher: (t: Omit<Teacher, 'id'>) => void;
  updateTeacher: (t: Teacher) => void;
  deleteTeacher: (id: number) => void;

  // Majors
  majors: Major[];
  addMajor: (m: Omit<Major, 'id'>) => void;
  updateMajor: (m: Major) => void;
  deleteMajor: (id: number) => void;

  // Classes
  classes: ClassInfo[];
  addClass: (c: Omit<ClassInfo, 'id'>) => void;
  updateClass: (c: ClassInfo) => void;
  deleteClass: (id: number) => void;

  // Courses
  courses: Course[];
  addCourse: (c: Omit<Course, 'id'>) => void;
  updateCourse: (c: Course) => void;
  deleteCourse: (id: number) => void;

  // Grades
  grades: Grade[];
  addGrade: (g: Omit<Grade, 'id'>) => void;
  updateGrade: (g: Grade) => void;
  deleteGrade: (id: number) => void;

  // Selections
  selections: CourseSelection[];
  addSelection: (s: Omit<CourseSelection, 'id'>) => void;
  deleteSelection: (id: number) => void;

  // Announcements
  announcements: Announcement[];
  addAnnouncement: (a: Omit<Announcement, 'id'>) => void;
  updateAnnouncement: (a: Announcement) => void;
  deleteAnnouncement: (id: number) => void;

  // Helpers
  getMajorName: (id: number) => string;
  getClassName: (id: number) => string;
  getCourseName: (id: number) => string;
  getStudentName: (id: number) => string;
  getTeacherName: (id: number) => string;
  getStudentByUserId: (userId: number) => Student | undefined;
  getTeacherByUserId: (userId: number) => Teacher | undefined;
}

const DataContext = createContext<DataContextType | null>(null);

let nextId = 100;
const genId = () => ++nextId;

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [majors, setMajors] = useState<Major[]>(initialMajors);
  const [classes, setClasses] = useState<ClassInfo[]>(initialClasses);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [grades, setGrades] = useState<Grade[]>(initialGrades);
  const [selections, setSelections] = useState<CourseSelection[]>(initialSelections);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);

  const login = useCallback((username: string, password: string, role: UserRole): boolean => {
    const user = users.find(u => u.username === username && u.password === password && u.role === role);
    if (user) {
      setCurrentUser({ id: user.id, username: user.username, role: user.role, real_name: user.real_name });
      return true;
    }
    return false;
  }, [users]);

  const logout = useCallback(() => setCurrentUser(null), []);

  // Users CRUD
  const addUser = useCallback((u: Omit<User, 'id'>) => setUsers(prev => [...prev, { ...u, id: genId() }]), []);
  const updateUser = useCallback((u: User) => setUsers(prev => prev.map(x => x.id === u.id ? u : x)), []);
  const deleteUser = useCallback((id: number) => setUsers(prev => prev.filter(x => x.id !== id)), []);

  // Students CRUD
  const addStudent = useCallback((s: Omit<Student, 'id'>) => setStudents(prev => [...prev, { ...s, id: genId() }]), []);
  const updateStudent = useCallback((s: Student) => setStudents(prev => prev.map(x => x.id === s.id ? s : x)), []);
  const deleteStudent = useCallback((id: number) => setStudents(prev => prev.filter(x => x.id !== id)), []);

  // Teachers CRUD
  const addTeacher = useCallback((t: Omit<Teacher, 'id'>) => setTeachers(prev => [...prev, { ...t, id: genId() }]), []);
  const updateTeacher = useCallback((t: Teacher) => setTeachers(prev => prev.map(x => x.id === t.id ? t : x)), []);
  const deleteTeacher = useCallback((id: number) => setTeachers(prev => prev.filter(x => x.id !== id)), []);

  // Majors CRUD
  const addMajor = useCallback((m: Omit<Major, 'id'>) => setMajors(prev => [...prev, { ...m, id: genId() }]), []);
  const updateMajor = useCallback((m: Major) => setMajors(prev => prev.map(x => x.id === m.id ? m : x)), []);
  const deleteMajor = useCallback((id: number) => setMajors(prev => prev.filter(x => x.id !== id)), []);

  // Classes CRUD
  const addClass = useCallback((c: Omit<ClassInfo, 'id'>) => setClasses(prev => [...prev, { ...c, id: genId() }]), []);
  const updateClass = useCallback((c: ClassInfo) => setClasses(prev => prev.map(x => x.id === c.id ? c : x)), []);
  const deleteClass = useCallback((id: number) => setClasses(prev => prev.filter(x => x.id !== id)), []);

  // Courses CRUD
  const addCourse = useCallback((c: Omit<Course, 'id'>) => setCourses(prev => [...prev, { ...c, id: genId() }]), []);
  const updateCourse = useCallback((c: Course) => setCourses(prev => prev.map(x => x.id === c.id ? c : x)), []);
  const deleteCourse = useCallback((id: number) => setCourses(prev => prev.filter(x => x.id !== id)), []);

  // Grades CRUD
  const addGrade = useCallback((g: Omit<Grade, 'id'>) => setGrades(prev => [...prev, { ...g, id: genId() }]), []);
  const updateGrade = useCallback((g: Grade) => setGrades(prev => prev.map(x => x.id === g.id ? g : x)), []);
  const deleteGrade = useCallback((id: number) => setGrades(prev => prev.filter(x => x.id !== id)), []);

  // Selections CRUD
  const addSelection = useCallback((s: Omit<CourseSelection, 'id'>) => setSelections(prev => [...prev, { ...s, id: genId() }]), []);
  const deleteSelection = useCallback((id: number) => setSelections(prev => prev.filter(x => x.id !== id)), []);

  // Announcements CRUD
  const addAnnouncement = useCallback((a: Omit<Announcement, 'id'>) => setAnnouncements(prev => [...prev, { ...a, id: genId() }]), []);
  const updateAnnouncement = useCallback((a: Announcement) => setAnnouncements(prev => prev.map(x => x.id === a.id ? a : x)), []);
  const deleteAnnouncement = useCallback((id: number) => setAnnouncements(prev => prev.filter(x => x.id !== id)), []);

  // Helpers
  const getMajorName = useCallback((id: number) => majors.find(m => m.id === id)?.major_name || '-', [majors]);
  const getClassName = useCallback((id: number) => classes.find(c => c.id === id)?.class_name || '-', [classes]);
  const getCourseName = useCallback((id: number) => courses.find(c => c.id === id)?.course_name || '-', [courses]);
  const getStudentName = useCallback((id: number) => students.find(s => s.id === id)?.name || '-', [students]);
  const getTeacherName = useCallback((id: number) => teachers.find(t => t.id === id)?.name || '-', [teachers]);

  const getStudentByUserId = useCallback((userId: number) => {
    const user = users.find(u => u.id === userId);
    if (!user) return undefined;
    return students.find(s => s.name === user.real_name);
  }, [users, students]);

  const getTeacherByUserId = useCallback((userId: number) => {
    const user = users.find(u => u.id === userId);
    if (!user) return undefined;
    return teachers.find(t => t.name === user.real_name);
  }, [users, teachers]);

  return (
    <DataContext.Provider value={{
      currentUser, login, logout,
      users, addUser, updateUser, deleteUser,
      students, addStudent, updateStudent, deleteStudent,
      teachers, addTeacher, updateTeacher, deleteTeacher,
      majors, addMajor, updateMajor, deleteMajor,
      classes, addClass, updateClass, deleteClass,
      courses, addCourse, updateCourse, deleteCourse,
      grades, addGrade, updateGrade, deleteGrade,
      selections, addSelection, deleteSelection,
      announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement,
      getMajorName, getClassName, getCourseName, getStudentName, getTeacherName,
      getStudentByUserId, getTeacherByUserId,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
