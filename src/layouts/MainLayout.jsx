import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/navbar/Navbar';
import Footer from '../components/layout/footer/Footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
