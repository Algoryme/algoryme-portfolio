'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import '../../styles/admin-dashboard.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    totalMessages: 0,
    unreadMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch projects stats
        const { count: totalProjects } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true });

        const { count: activeProjects } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active');

        // Fetch messages stats
        const { count: totalMessages } = await supabase
          .from('contact_messages')
          .select('*', { count: 'exact', head: true });

        const { count: unreadMessages } = await supabase
          .from('contact_messages')
          .select('*', { count: 'exact', head: true })
          .eq('is_read', false);

        setStats({
          totalProjects: totalProjects || 0,
          activeProjects: activeProjects || 0,
          totalMessages: totalMessages || 0,
          unreadMessages: unreadMessages || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="adminDashboard">
      <div className="adminDashboardHeader">
        <h1>Dashboard</h1>
        <p>Welcome to your admin panel</p>
      </div>

      {loading ? (
        <div className="adminLoading">Loading stats...</div>
      ) : (
        <div className="adminStatsGrid">
          <div className="adminStatCard">
            <div className="adminStatIcon">🎨</div>
            <div className="adminStatContent">
              <h3>Total Projects</h3>
              <p className="adminStatValue">{stats.totalProjects}</p>
            </div>
          </div>

          <div className="adminStatCard">
            <div className="adminStatIcon">✅</div>
            <div className="adminStatContent">
              <h3>Active Projects</h3>
              <p className="adminStatValue">{stats.activeProjects}</p>
            </div>
          </div>

          <div className="adminStatCard">
            <div className="adminStatIcon">📧</div>
            <div className="adminStatContent">
              <h3>Total Messages</h3>
              <p className="adminStatValue">{stats.totalMessages}</p>
            </div>
          </div>

          <div className="adminStatCard adminStatCardHighlight">
            <div className="adminStatIcon">🔔</div>
            <div className="adminStatContent">
              <h3>Unread Messages</h3>
              <p className="adminStatValue">{stats.unreadMessages}</p>
            </div>
          </div>
        </div>
      )}

      <div className="adminQuickLinks">
        <h2>Quick Links</h2>
        <div className="adminQuickLinksGrid">
          <a href="/admin/projects" className="adminQuickLink">
            Manage Projects →
          </a>
          <a href="/admin/contacts" className="adminQuickLink">
            View Messages →
          </a>
        </div>
      </div>
    </div>
  );
}
