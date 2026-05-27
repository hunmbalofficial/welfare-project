import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Trash2, Reply, User, Calendar } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { formatDate } from '../../utils/formatDate';
import { getMessages, deleteMessage } from '../../services/contactService';

function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getMessages();
      setMessages(res.data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const handleDelete = async (id) => {
    try {
      await deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch {
      // ignore
    }
  };

  return (
    <>
      <Helmet><title>Messages - WelfareOrg Admin</title></Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary-800">Messages</h1>
          <p className="text-gray-500">View and manage contact messages</p>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-12">Loading messages...</div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-white rounded-xl border border-primary-100 overflow-hidden shadow-sm">
              <div className="divide-y divide-primary-50 max-h-[600px] overflow-y-auto">
                {messages.map((msg) => (
                  <button
                    key={msg._id}
                    onClick={() => setSelected(msg)}
                    className={`w-full text-left p-4 hover:bg-primary-50/50 transition-colors ${
                      selected?._id === msg._id ? 'bg-primary-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="bg-primary-100 rounded-full p-2">
                          <User className="h-5 w-5 text-primary-600" />
                        </div>
                        <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-primary-600 border-2 border-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-primary-800 text-sm truncate">{msg.name}</p>
                          <span className="text-xs text-gray-400 flex-shrink-0">{formatDate(msg.createdAt)}</span>
                        </div>
                        <p className="text-xs text-gray-500 truncate">{msg.subject}</p>
                      </div>
                    </div>
                  </button>
                ))}
                {messages.length === 0 && (
                  <div className="text-center py-12 text-gray-500">No messages yet</div>
                )}
              </div>
            </div>

            <div className="lg:col-span-2">
              {selected ? (
                <Card>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary-100 rounded-full p-3">
                        <Mail className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-primary-800">{selected.name}</h3>
                        <p className="text-sm text-gray-500">{selected.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(selected._id)}
                      className="rounded-full p-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4" />
                    {formatDate(selected.createdAt)}
                  </div>

                  {selected.subject && (
                    <div className="mb-4">
                      <span className="font-semibold text-primary-700">Subject: </span>
                      <span className="text-gray-600">{selected.subject}</span>
                    </div>
                  )}

                  <div className="bg-primary-50/50 rounded-xl p-6 mb-6">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{selected.message}</p>
                  </div>

                  <div className="flex gap-3">
                    <a href={`mailto:${selected.email}`}>
                      <Button icon={Reply}>Reply</Button>
                    </a>
                    <Button variant="danger" icon={Trash2} onClick={() => handleDelete(selected._id)}>Delete</Button>
                  </div>
                </Card>
              ) : (
                <Card>
                  <div className="flex flex-col items-center justify-center py-12">
                    <Mail className="h-16 w-16 text-primary-200 mb-4" />
                    <p className="text-gray-500">Select a message to view its contents</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ManageMessages;
