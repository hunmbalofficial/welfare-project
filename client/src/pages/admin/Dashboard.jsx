import { Helmet } from 'react-helmet-async';
import {
  Users,
  FolderOpen,
  DollarSign,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Plus,
  FileText,
  Megaphone,
  BarChart3,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const metrics = [
  { label: 'Total Beneficiaries', value: '2,847', change: '+12%', up: true, icon: Users },
  { label: 'Active Programs', value: '18', change: '+3', up: true, icon: FolderOpen },
  { label: 'Donations This Month', value: 'Rs. 4.2L', change: '+8%', up: true, icon: DollarSign },
  { label: 'Pending Cases', value: '23', change: '-5%', up: false, icon: AlertCircle },
];

const barData = [
  { month: 'Jan', applications: 40 },
  { month: 'Feb', applications: 55 },
  { month: 'Mar', applications: 48 },
  { month: 'Apr', applications: 62 },
  { month: 'May', applications: 58 },
  { month: 'Jun', applications: 72 },
];

const lineData = [
  { month: 'Jan', amount: 40000 },
  { month: 'Feb', amount: 55000 },
  { month: 'Mar', amount: 48000 },
  { month: 'Apr', amount: 62000 },
  { month: 'May', amount: 58000 },
  { month: 'Jun', amount: 72000 },
];

const recentApps = [
  { id: 1, name: 'Fatima Ahmed', program: 'Health', date: '2026-05-20', status: 'Approved' },
  { id: 2, name: 'Muhammad Ali', program: 'Education', date: '2026-05-19', status: 'Pending' },
  { id: 3, name: 'Ayesha Khan', program: 'Food Aid', date: '2026-05-18', status: 'Review' },
  { id: 4, name: 'Hassan Raza', program: 'Health', date: '2026-05-17', status: 'Approved' },
  { id: 5, name: 'Zainab Bibi', program: 'Education', date: '2026-05-16', status: 'Pending' },
];

const statusVariant = { Approved: 'success', Pending: 'warning', Review: 'info' };

const quickActions = [
  { label: 'Add Beneficiary', icon: Users },
  { label: 'New Program', icon: FolderOpen },
  { label: 'Send Announcement', icon: Megaphone },
  { label: 'Generate Report', icon: BarChart3 },
];

function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Dashboard - WelfareOrg Admin</title>
      </Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary-800">Dashboard</h1>
          <p className="text-gray-500">Welcome to the admin panel</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <Card key={m.label} className="relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary-400" />
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display text-3xl font-bold text-primary-800">{m.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{m.label}</p>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium mt-2 ${
                      m.up ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {m.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {m.change}
                  </span>
                </div>
                <div className="rounded-full bg-primary-50 p-3">
                  <m.icon className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-display text-lg font-semibold text-primary-800 mb-4">Applications</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="applications" fill="#3B6D11" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <h3 className="font-display text-lg font-semibold text-primary-800 mb-4">Donation Trend</h3>
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
            <h3 className="font-display text-lg font-semibold text-primary-800 mb-4">Recent Applications</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-primary-100 text-left">
                    <th className="pb-3 font-semibold text-primary-700">Name</th>
                    <th className="pb-3 font-semibold text-primary-700">Program</th>
                    <th className="pb-3 font-semibold text-primary-700">Date</th>
                    <th className="pb-3 font-semibold text-primary-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary-50">
                  {recentApps.map((app) => (
                    <tr key={app.id} className="hover:bg-primary-50/30 transition-colors">
                      <td className="py-3 text-gray-700">{app.name}</td>
                      <td className="py-3 text-gray-700">{app.program}</td>
                      <td className="py-3 text-gray-500">{app.date}</td>
                      <td className="py-3">
                        <Badge variant={statusVariant[app.status]}>{app.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Card>
            <h3 className="font-display text-lg font-semibold text-primary-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((a) => (
                <Button key={a.label} variant="secondary" className="w-full justify-start" icon={a.icon}>
                  {a.label}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
