import { HiUsers, HiFolder, HiHeart, HiMail } from 'react-icons/hi';

const DashboardCards = ({ stats }) => {
  const cards = [
    { label: 'Total Projects', value: stats?.projects || 0, icon: HiFolder, color: 'bg-blue-500' },
    { label: 'Total Donations', value: stats?.donations || 0, icon: HiHeart, color: 'bg-red-500' },
    { label: 'Gallery Images', value: stats?.gallery || 0, icon: HiUsers, color: 'bg-green-500' },
    { label: 'New Messages', value: stats?.messages || 0, icon: HiMail, color: 'bg-yellow-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4">
          <div className={`${card.color} p-4 rounded-lg`}>
            <card.icon className="text-white text-xl" />
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">{card.value}</div>
            <div className="text-gray-500 text-sm">{card.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
