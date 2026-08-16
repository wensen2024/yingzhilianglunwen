import { useState } from 'react';
import { useData } from '../store/DataContext';
import Modal from '../components/Modal';
import SearchBar from '../components/SearchBar';
import { Edit, Trash2, ShieldCheck } from 'lucide-react';
import type { User, UserRole } from '../types';

export default function UserPage() {
  const { users, addUser, updateUser, deleteUser } = useData();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [form, setForm] = useState({ username: '', password: '', role: 'student' as UserRole, real_name: '' });

  const filtered = users.filter(u => u.username.includes(search) || u.real_name.includes(search) || u.role.includes(search));

  const openAdd = () => {
    setEditing(null);
    setForm({ username: '', password: '123456', role: 'student', real_name: '' });
    setModalOpen(true);
  };

  const openEdit = (u: User) => {
    setEditing(u);
    setForm({ username: u.username, password: u.password, role: u.role, real_name: u.real_name });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username || !form.password || !form.real_name) return;
    if (editing) updateUser({ ...editing, ...form });
    else addUser(form);
    setModalOpen(false);
  };

  const roleBadge = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700';
      case 'teacher': return 'bg-green-100 text-green-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  const roleLabel = (role: string) => {
    switch (role) {
      case 'admin': return '管理员';
      case 'teacher': return '教师';
      default: return '学生';
    }
  };

  return (
    <div>
      <SearchBar value={search} onChange={setSearch} placeholder="搜索用户名、姓名、角色..." onAdd={openAdd} addLabel="新增用户" />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 text-left font-medium">用户名</th>
                <th className="px-4 py-3 text-left font-medium">真实姓名</th>
                <th className="px-4 py-3 text-left font-medium">角色</th>
                <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">密码</th>
                <th className="px-4 py-3 text-center font-medium">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-gray-400" />
                    {u.username}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{u.real_name}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${roleBadge(u.role)}`}>
                      {roleLabel(u.role)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 font-mono text-xs hidden sm:table-cell">{'•'.repeat(u.password.length)}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openEdit(u)} className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => { if (confirm('确定删除？')) deleteUser(u.id); }} className="p-1.5 rounded-lg hover:bg-red-100 text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={5} className="px-4 py-12 text-center text-gray-400">暂无数据</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-xs text-gray-400 border-t border-gray-100">共 {filtered.length} 条记录</div>
      </div>

      <Modal open={modalOpen} title={editing ? '编辑用户' : '新增用户'} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">用户名 <span className="text-red-500">*</span></label>
              <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} className="form-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">密码 <span className="text-red-500">*</span></label>
              <input type="text" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="form-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">真实姓名 <span className="text-red-500">*</span></label>
              <input value={form.real_name} onChange={e => setForm({ ...form, real_name: e.target.value })} className="form-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">角色</label>
              <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value as UserRole })} className="form-input">
                <option value="admin">管理员</option>
                <option value="teacher">教师</option>
                <option value="student">学生</option>
              </select>
            </div>
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
