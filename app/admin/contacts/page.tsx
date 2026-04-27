'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { MessageList } from '@/components/admin';
import '@/styles/admin-contacts.css';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminContacts() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter === 'unread') {
        query = query.eq('is_read', false);
      } else if (filter === 'read') {
        query = query.eq('is_read', true);
      }

      const { data, error } = await query;
      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    // This is safe - fetchMessages is memoized with useCallback
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMessages();
  }, [fetchMessages]);

  const handleToggleRead = async (id: string, currentStatus: boolean) => {
    try {
      console.log('Toggling read status for message:', id, 'Current status:', currentStatus);

      const { data, error } = await supabase
        .from('contact_messages')
        .update({ is_read: !currentStatus })
        .eq('id', id);

      console.log('Update response - Data:', data, 'Error:', error);

      if (error) {
        console.error('Supabase update error:', error);
        alert('Failed to update message: ' + error.message);
        return;
      }

      console.log('Message status updated successfully, refetching...');

      // Refetch all messages with current filter
      setLoading(true);
      const { data: refreshedData, error: refreshError } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (refreshError) {
        console.error('Refresh error:', refreshError);
        setLoading(false);
        return;
      }

      console.log('Refreshed data:', refreshedData);

      // Filter the data based on current filter
      let filteredData = refreshedData || [];
      if (filter === 'unread') {
        filteredData = filteredData.filter(msg => !msg.is_read);
      } else if (filter === 'read') {
        filteredData = filteredData.filter(msg => msg.is_read);
      }

      console.log('Filtered data after update:', filteredData);
      setMessages(filteredData);
      setLoading(false);
    } catch (error) {
      console.error('Error updating message:', error);
      alert('Failed to update message status.');
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message');
    }
  };

  const handleExportCSV = () => {
    if (messages.length === 0) {
      alert('No messages to export');
      return;
    }

    const headers = ['Name', 'Email', 'Message', 'Status', 'Date'];
    const rows = messages.map((msg) => [
      msg.name,
      msg.email,
      `"${msg.message.replace(/"/g, '""')}"`,
      msg.is_read ? 'Read' : 'Unread',
      new Date(msg.created_at).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `messages-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="adminContacts">
      <div className="adminContactsHeader">
        <div>
          <h1>Contact Messages</h1>
          <p>View and manage all contact form submissions</p>
        </div>
        <button onClick={handleExportCSV} className="adminExportButton">
          📥 Export as CSV
        </button>
      </div>

      <div className="adminFilterButtons">
        <button
          className={`adminFilterButton ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Messages ({messages.length})
        </button>
        <button
          className={`adminFilterButton ${filter === 'unread' ? 'active' : ''}`}
          onClick={() => setFilter('unread')}
        >
          Unread
        </button>
        <button
          className={`adminFilterButton ${filter === 'read' ? 'active' : ''}`}
          onClick={() => setFilter('read')}
        >
          Read
        </button>
      </div>

      {loading ? (
        <div className="adminLoading">Loading messages...</div>
      ) : (
        <MessageList
          messages={messages}
          onToggleRead={handleToggleRead}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
