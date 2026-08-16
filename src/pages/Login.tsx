import { useState } from 'react';
import { useData } from '../store/DataContext';
import type { UserRole } from '../types';
import { GraduationCap, User, Lock, ShieldCheck } from 'lucide-react';

export default function Login() {
  const { login } = useData();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('admin');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('请输入用户名和密码');
      triggerShake();
      return;
    }
    const ok = login(username, password, role);
    if (!ok) {
      setError('用户名、密码或角色不匹配');
      triggerShake();
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const roleOptions: { value: UserRole; label: string; desc: string }[] = [
    { value: 'admin', label: '管理员', desc: 'admin / 123456' },
    { value: 'teacher', label: '教师', desc: 'teacher1 / 123456' },
    { value: 'student', label: '学生', desc: 'student1 / 123456' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      <div className={`relative w-full max-w-md ${shake ? 'animate-shake' : ''}`}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 border border-white/20">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">学生学籍管理信息系统</h1>
          <p className="text-blue-200 text-sm">Student Status Management Information System</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">用户登录</h2>

          {/* Role Selector */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {roleOptions.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { setRole(opt.value); setError(''); }}
                className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  role === opt.value
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={e => { setUsername(e.target.value); setError(''); }}
                placeholder="请输入用户名"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                placeholder="请输入密码"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 px-4 py-2.5 rounded-xl">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-lg shadow-blue-600/30 hover:shadow-blue-700/40 transition-all duration-200 active:scale-[0.98]"
            >
              登 录
            </button>
          </form>

          {/* Test account hints */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center mb-2">测试账号</p>
            <div className="grid grid-cols-3 gap-2">
              {roleOptions.map(opt => (
                <div key={opt.value} className="text-center">
                  <span className="text-xs text-gray-500 block">{opt.label}</span>
                  <span className="text-xs text-blue-600 font-mono">{opt.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-blue-300/60 text-xs mt-6">
          基于B/S模式的学生学籍管理信息系统 © 2025
        </p>
      </div>
    </div>
  );
}
