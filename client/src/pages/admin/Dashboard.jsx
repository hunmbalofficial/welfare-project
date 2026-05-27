import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Package, HandCoins, Mail, Settings, TrendingUp, ArrowRight, MessageCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line,
} from 'recharts';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { getProjects } from '../../services/projectService';
import { getDonations } from '../../services/donationService';
import { getMessages } from '../../services/contactService';

const barData = [
  { month: 'Jan', donations: 40 }, { month: 'Feb', donations: 55 }, { month: 'Mar', donations: 48 },
  { month: 'Apr', donations: 62 }, { month: 'May', donations: 58 }, { month: 'Jun', donations: 72 },
];

const lineData = [
  { month: 'Jan', amount: 40000 }, { month: 'Feb', amount: 55000 }, { month: 'Mar', amount: 48000 },
  { month: 'Apr', amount: 62000 }, { month: 'May', amount: 58000 }, { month: 'Jun', amount: 72000 },
];

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [donations, setDonations] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getProjects().then((r) => setProjects(r.data)).catch(() => {});
    getDonations().then((r) => setDonations(r.data)).catch(() => {});
    getMessages().then((r) => setMessages(r.data)).catch(() => {});
  }, []);

  const totalDonations = donations.reduce((s, d) => s + (d.amount || 0), 0);
  const activePrograms = projects.filter((p) => p.status === 'active').length;
  const unreadMessages = messages.length;

  const stats = [
    {
      label: 'Active Programs', value: activePrograms, total: projects.length, icon: Package, color: 'from-emerald-500 to-emerald-600', link: '/admin/programs',
    },
    {
      label: 'Total Donations', value: `Rs. ${totalDonations.toLocaleString()}`, icon: HandCoins, color: 'from-primary-500 to-primary-600', link: '/admin/donations',
    },
    {
      label: 'Messages', value: unreadMessages, icon: Mail, color: 'from-violet-500 to-violet-600', link: '/admin/messages',
    },
    {
      label: 'Programs Created', value: projects.length, icon: TrendingUp, color: 'from-amber-500 to-amber-600', link: '/admin/programs',
    },
  ];

  return (
    <>
      <Helmet><title>Dashboard - WelfareOrg Admin</title></Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-primary-800">Dashboard</h1>
            <p className="text-gray-500">Overview of your welfare organization</p>
          </div>
          <Link to="/admin/settings">
            <Badge variant="info" className="cursor-pointer flex items-center gap-1 px-4 py-2">
              <Settings size={14} /> Settings
            </Badge>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s) => (
            <Link key={s.label} to={s.link} className="block group">
              <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-3xl font-bold text-primary-900">{s.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                  </div>
                  <div className={`rounded-xl bg-gradient-to-br ${s.color} p-3 shadow-lg`}>
                    <s.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs text-primary-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View details <ArrowRight size={12} />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold text-primary-800">Donations Overview</h3>
              <Badge variant="success">Monthly</Badge>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="donations" fill="#3B6D11" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold text-primary-800">Donation Trend</h3>
              <Badge variant="info">Revenue</Badge>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#3B6D11" strokeWidth={2} dot={{ fill: '#3B6D11' }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold text-primary-800">Recent Programs</h3>
              <Link to="/admin/programs" className="text-xs text-primary-600 font-medium hover:underline">View all</Link>
            </div>
            {projects.length === 0 ? (
              <div className="text-center text-gray-400 py-8 text-sm">No programs yet</div>
            ) : (
              <div className="space-y-3">
                {projects.slice(0, 5).map((p) => (
                  <div key={p._id} className="flex items-center justify-between p-3 rounded-lg bg-primary-50/50 hover:bg-primary-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center shrink-0 overflow-hidden">
                        {p.image ? <img src={p.image} alt="" className="w-full h-full object-cover" /> : <Package size={18} className="text-primary-600" />}
                      </div>
                      <div>
                        <p className="font-medium text-primary-800 text-sm">{p.title}</p>
                        <p className="text-xs text-gray-500">{p.category || 'General'}</p>
                      </div>
                    </div>
                    <Badge variant={p.status === 'active' ? 'success' : p.status === 'completed' ? 'info' : 'warning'}>{p.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold text-primary-800">Recent Messages</h3>
              <Link to="/admin/messages" className="text-xs text-primary-600 font-medium hover:underline">View all</Link>
            </div>
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 py-8 text-sm">No messages yet</div>
            ) : (
              <div className="space-y-3">
                {messages.slice(0, 4).map((m) => (
                  <div key={m._id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary-50/50 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                      <MessageCircle size={16} className="text-primary-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-primary-800 text-sm truncate">{m.name}</p>
                      <p className="text-xs text-gray-500 truncate">{m.subject || 'No subject'}</p>
                    </div>
                    <Clock size={14} className="text-gray-300 shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
