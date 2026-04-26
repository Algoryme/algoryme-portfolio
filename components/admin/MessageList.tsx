'use client';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface MessageListProps {
  messages: Message[];
  onToggleRead: (id: string, currentStatus: boolean) => void;
  onDelete: (id: string) => void;
}

export default function MessageList({ messages, onToggleRead, onDelete }: MessageListProps) {
  if (messages.length === 0) {
    return <div className="adminEmpty">No messages yet.</div>;
  }

  return (
    <div className="adminMessagesList">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`adminMessageCard ${message.is_read ? 'read' : 'unread'}`}
        >
          <div className="adminMessageHeader">
            <div>
              <h3 className="adminMessageName">{message.name}</h3>
              <p className="adminMessageEmail">{message.email}</p>
            </div>
            <div className="adminMessageTime">
              {new Date(message.created_at).toLocaleString()}
            </div>
          </div>

          <div className="adminMessageBody">
            <p>{message.message}</p>
          </div>

          <div className="adminMessageFooter">
            <span className={`adminMessageBadge ${message.is_read ? 'read' : 'unread'}`}>
              {message.is_read ? '✓ Read' : '◯ Unread'}
            </span>

            <div className="adminMessageActions">
              <button
                onClick={() => onToggleRead(message.id, message.is_read)}
                className="adminActionButton"
              >
                {message.is_read ? 'Mark Unread' : 'Mark Read'}
              </button>
              <button
                onClick={() => onDelete(message.id)}
                className="adminActionButton delete"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
