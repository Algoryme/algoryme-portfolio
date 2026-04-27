'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { getStoredAdminEmail, clearAdminAuth } from '@/lib/auth';
import '@/styles/admin-layout.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // If on login page, allow access regardless
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    const adminEmail = getStoredAdminEmail();

    // If not on login page and no admin email, redirect to login
    if (!adminEmail) {
      router.push('/admin/login');
      return;
    }

    // Admin email exists, set it and stop loading
    setEmail(adminEmail);
    setLoading(false);
  }, [router, isLoginPage]);

  if (isLoginPage) {
    return children;
  }

  const handleLogout = () => {
    clearAdminAuth();
    router.push('/admin/login');
  };

  if (loading) {
    return <div className="adminLoading">Loading...</div>;
  }

  return (
    <div className="adminLayout">
      {/* Mobile Hamburger Button */}
      <button
        className="adminHamburger"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Sidebar */}
      <aside className={`adminSidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="adminSidebarHeader">
          <h1 className="adminLogo">Algoryme</h1>
          <p className="adminLogoSubtitle">Admin Panel</p>
        </div>

        <nav className="adminNav">
          <Link
            href="/admin/dashboard"
            className={`adminNavItem ${pathname === '/admin/dashboard' ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            📊 Dashboard
          </Link>
          <Link
            href="/admin/projects"
            className={`adminNavItem ${pathname === '/admin/projects' ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            🎨 Projects
          </Link>
          <Link
            href="/admin/contacts"
            className={`adminNavItem ${pathname === '/admin/contacts' ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            📧 Messages
          </Link>
        </nav>

        <div className="adminSidebarFooter">
          <p className="adminUserEmail">👤 {email}</p>
          <button onClick={handleLogout} className="adminLogoutButton">
            Logout
          </button>
        </div>
      </aside>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="adminSidebarOverlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="adminMain">
        {children}
      </main>
    </div>
  );
}
