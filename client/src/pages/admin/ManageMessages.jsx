import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Trash2, Reply, User, Calendar } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { formatDate } from '../../utils/formatDate';

const initialMessages = [
  { id: 1, name: 'Fatima Ahmed', email: 'fatima@example.com', subject: 'Donation Inquiry', message: 'I would like to know more about the donation process and how I can contribute monthly to the education program. Please provide details about the bank transfer method.', date: '2026-05-20', read: false },
  { id: 2, name: 'Muhammad Ali', email: 'mali@example.com', subject: 'Volunteer Application', message: 'I am interested in volunteering for the health camp initiative. I am a medical professional with 5 years of experience and can dedicate weekends for this cause.', date: '2026-05-19', read: true },
  { id: 3, name: 'Ayesha Khan', email: 'ayesha@example.com', subject: 'Sponsorship Request', message: 'I run a small school in a rural area and would like to apply for the Education Sponsorship program. We have 45 students who need support.', date: '2026-05-18', read: false },
  { id: 4, name: 'Hassan Raza', email: 'hassan@example.com', subject: 'Feedback', message: 'I wanted to thank the team for the wonderful support during the flood relief drive. Your efforts made a real difference in our community.', date: '2026-05-16', read: true },
  { id: 5, name: 'Zainab Bibi', email: 'zainab@example.com', subject: 'Partnership Proposal', message: 'Our NGO would like to partner with WelfareOrg for the upcoming health awareness campaign. We can provide medical supplies and volunteer doctors.', date: '2026-05-14', read: false },
  { id: 6, name: 'Omar Farooq', email: 'omar@example.com', subject: 'General Inquiry', message: 'Could you please share the annual report for the last fiscal year? I am interested in understanding the impact of your programs.', date: '2026-05-12', read: true },
];

function ManageMessages() {
  const [messages, setMessages] = useState(initialMessages);
  const [selected, setSelected] = useState(null);

  const handleSelect = (msg) => {
    setSelected(msg);
    if (!msg.read) {
      setMessages(messages.map((m) => (m.id === msg.id ? { ...m, read: true } : m)));
    }
  };

  const handleDelete = (id) => {
    setMessages(messages.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  return (
    <>
      <Helmet>
        <title>Messages - WelfareOrg Admin</title>
      </Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary-800">Messages</h1>
          <p className="text-gray-500">View and manage contact messages</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded-xl border border-primary-100 overflow-hidden shadow-sm">
            <div className="divide-y divide-primary-50 max-h-[600px] overflow-y-auto">
              {messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => handleSelect(msg)}
                  className={`w-full text-left p-4 hover:bg-primary-50/50 transition-colors ${
                    selected?.id === msg.id ? 'bg-primary-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="bg-primary-100 rounded-full p-2">
                        <User className="h-5 w-5 text-primary-600" />
                      </div>
                      {!msg.read && (
                        <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-primary-600 border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-primary-800 text-sm truncate">{msg.name}</p>
                        <span className="text-xs text-gray-400 flex-shrink-0">{formatDate(msg.date)}</span>
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
                    onClick={() => handleDelete(selected.id)}
                    className="rounded-full p-2 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <Calendar className="h-4 w-4" />
                  {formatDate(selected.date)}
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
                  <Button icon={Reply}>Reply</Button>
                  <Button variant="danger" icon={Trash2} onClick={() => handleDelete(selected.id)}>Delete</Button>
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
      </div>
    </>
  );
}

export default ManageMessages;
