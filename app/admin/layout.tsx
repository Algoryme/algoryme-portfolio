'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { getStoredAdminEmail, clearAdminAuth } from '@/lib/auth';
import '../styles/admin-layout.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminEmail = getStoredAdminEmail();
    if (!adminEmail) {
      router.push('/admin/login');
      return;
    }
    // This is safe - we only set email on initial load or path change
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEmail(adminEmail);
    setLoading(false);
  }, [router, pathname]);

  const handleLogout = () => {
    clearAdminAuth();
    router.push('/admin/login');
  };

  if (loading) {
    return <div className="adminLoading">Loading...</div>;
  }

  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return children;
  }

  return (
    <div className="adminLayout">
      {/* Sidebar */}
      <aside className="adminSidebar">
        <div className="adminSidebarHeader">
          <h1 className="adminLogo">Algoryme</h1>
          <p className="adminLogoSubtitle">Admin Panel</p>
        </div>

        <nav className="adminNav">
          <Link
            href="/admin/dashboard"
            className={`adminNavItem ${pathname === '/admin/dashboard' ? 'active' : ''}`}
          >
            📊 Dashboard
          </Link>
          <Link
            href="/admin/projects"
            className={`adminNavItem ${pathname === '/admin/projects' ? 'active' : ''}`}
          >
            🎨 Projects
          </Link>
          <Link
            href="/admin/contacts"
            className={`adminNavItem ${pathname === '/admin/contacts' ? 'active' : ''}`}
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

      {/* Main Content */}
      <main className="adminMain">
        {children}
      </main>
    </div>
  );
}
