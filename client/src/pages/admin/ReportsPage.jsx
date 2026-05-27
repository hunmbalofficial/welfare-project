import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Download, BarChart3 } from 'lucide-react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const donationTrend = [
  { month: 'Jan', amount: 40000 }, { month: 'Feb', amount: 55000 },
  { month: 'Mar', amount: 48000 }, { month: 'Apr', amount: 62000 },
  { month: 'May', amount: 58000 }, { month: 'Jun', amount: 72000 },
];

const programDist = [
  { name: 'Health', value: 35 }, { name: 'Education', value: 25 },
  { name: 'Food Aid', value: 20 }, { name: 'Shelter', value: 15 }, { name: 'Other', value: 5 },
];

const genderData = [
  { name: 'Male', count: 1240 }, { name: 'Female', count: 1560 }, { name: 'Other', count: 47 },
];

const appsOverTime = [
  { month: 'Jan', apps: 30 }, { month: 'Feb', apps: 45 },
  { month: 'Mar', apps: 38 }, { month: 'Apr', apps: 52 },
  { month: 'May', apps: 48 }, { month: 'Jun', apps: 62 },
];

const COLORS = ['#3B6D11', '#7ab82a', '#97C459', '#C0DD97', '#EAF3DE'];

function ReportsPage() {
  const [dateFrom, setDateFrom] = useState('2026-01-01');
  const [dateTo, setDateTo] = useState('2026-06-30');

  return (
    <>
      <Helmet>
        <title>Reports - WelfareOrg Admin</title>
      </Helmet>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-primary-800">Reports</h1>
            <p className="text-gray-500">Generate and export reports</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" icon={FileText}>PDF</Button>
            <Button variant="secondary" icon={Download}>CSV</Button>
            <Button variant="secondary" icon={BarChart3}>Excel</Button>
          </div>
        </div>

        <Card>
          <div className="flex flex-col sm:flex-row items-end gap-4">
            <Input
              label="From Date"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
            <Input
              label="To Date"
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
            <Button className="sm:mb-0.5">Generate</Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-display text-lg font-semibold text-primary-800 mb-4">Monthly Donation Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={donationTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#3B6D11" strokeWidth={2} dot={{ fill: '#3B6D11' }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <h3 className="font-display text-lg font-semibold text-primary-800 mb-4">Program-wise Distribution</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={programDist} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {programDist.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <h3 className="font-display text-lg font-semibold text-primary-800 mb-4">Gender Breakdown</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={genderData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#3B6D11" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <h3 className="font-display text-lg font-semibold text-primary-800 mb-4">Applications Over Time</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={appsOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="apps" stroke="#3B6D11" fill="#C0DD97" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </>
  );
}

export default ReportsPage;
