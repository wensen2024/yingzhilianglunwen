import { useState } from 'react';
import { DataProvider, useData } from './store/DataContext';
import Login from './pages/Login';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import StudentPage from './pages/StudentPage';
import TeacherPage from './pages/TeacherPage';
import MajorPage from './pages/MajorPage';
import ClassPage from './pages/ClassPage';
import CoursePage from './pages/CoursePage';
import GradePage from './pages/GradePage';
import SelectionPage from './pages/SelectionPage';
import AnnouncementPage from './pages/AnnouncementPage';
import UserPage from './pages/UserPage';
import ProfilePage from './pages/ProfilePage';

function AppContent() {
  const { currentUser } = useData();
  const [currentPage, setCurrentPage] = useState('home');

  if (!currentUser) {
    return <Login />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'students': return <StudentPage />;
      case 'teachers': return <TeacherPage />;
      case 'majors': return <MajorPage />;
      case 'classes': return <ClassPage />;
      case 'courses': return <CoursePage />;
      case 'grades': return <GradePage />;
      case 'selections': return <SelectionPage />;
      case 'announcements': return <AnnouncementPage />;
      case 'users': return <UserPage />;
      case 'profile': return <ProfilePage />;
      default: return <HomePage />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
