import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/sidebar/Sidebar';
import DashboardTopNav from '../components/layout/navbar/DashboardTopNav';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <DashboardTopNav />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
