import { useState } from 'react';
import { useData } from '../store/DataContext';
import {
  Home, Users, UserCheck, BookOpen, Building2, Layers, GraduationCap,
  ClipboardList, CheckSquare, Megaphone, Settings, LogOut, Menu, X, ChevronRight
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

interface NavItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  roles: string[];
}

const navItems: NavItem[] = [
  { key: 'home', label: '系统首页', icon: <Home className="w-5 h-5" />, roles: ['admin', 'teacher', 'student'] },
  { key: 'students', label: '学生管理', icon: <Users className="w-5 h-5" />, roles: ['admin', 'teacher'] },
  { key: 'teachers', label: '教师管理', icon: <UserCheck className="w-5 h-5" />, roles: ['admin'] },
  { key: 'majors', label: '专业管理', icon: <Building2 className="w-5 h-5" />, roles: ['admin'] },
  { key: 'classes', label: '班级管理', icon: <Layers className="w-5 h-5" />, roles: ['admin'] },
  { key: 'courses', label: '课程管理', icon: <BookOpen className="w-5 h-5" />, roles: ['admin', 'teacher'] },
  { key: 'grades', label: '成绩管理', icon: <ClipboardList className="w-5 h-5" />, roles: ['admin', 'teacher', 'student'] },
  { key: 'selections', label: '选课管理', icon: <CheckSquare className="w-5 h-5" />, roles: ['admin', 'student'] },
  { key: 'announcements', label: '公告管理', icon: <Megaphone className="w-5 h-5" />, roles: ['admin', 'teacher', 'student'] },
  { key: 'users', label: '用户管理', icon: <Settings className="w-5 h-5" />, roles: ['admin'] },
  { key: 'profile', label: '个人信息', icon: <GraduationCap className="w-5 h-5" />, roles: ['student'] },
];

export default function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const { currentUser, logout } = useData();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!currentUser) return null;

  const visibleItems = navItems.filter(item => item.roles.includes(currentUser.role));

  const roleLabel = currentUser.role === 'admin' ? '管理员' : currentUser.role === 'teacher' ? '教师' : '学生';
  const roleColor = currentUser.role === 'admin' ? 'bg-red-500' : currentUser.role === 'teacher' ? 'bg-green-500' : 'bg-blue-500';

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-white font-bold text-sm leading-tight">学生学籍管理</h1>
            <p className="text-blue-200/70 text-xs">信息系统 v1.0</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {visibleItems.map(item => (
          <button
            key={item.key}
            onClick={() => { onNavigate(item.key); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group ${
              currentPage === item.key
                ? 'bg-white/15 text-white shadow-lg'
                : 'text-blue-100/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span className={currentPage === item.key ? 'text-white' : 'text-blue-200/60 group-hover:text-white'}>{item.icon}</span>
            <span className="flex-1 text-left">{item.label}</span>
            {currentPage === item.key && <ChevronRight className="w-4 h-4 text-white/50" />}
          </button>
        ))}
      </nav>

      {/* User info */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {currentUser.real_name[0]}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white text-sm font-medium truncate">{currentUser.real_name}</p>
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs text-white ${roleColor}`}>{roleLabel}</span>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/10 text-blue-100/80 hover:bg-red-500/80 hover:text-white text-sm transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          退出登录
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-60 bg-gradient-to-b from-blue-900 to-indigo-900 fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-60 h-full bg-gradient-to-b from-blue-900 to-indigo-900 flex flex-col">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-lg font-semibold text-gray-800">
              {visibleItems.find(i => i.key === currentPage)?.label || '系统首页'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">欢迎您，{currentUser.real_name}</span>
            <span className={`px-2.5 py-1 rounded-full text-xs text-white ${roleColor}`}>{roleLabel}</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
