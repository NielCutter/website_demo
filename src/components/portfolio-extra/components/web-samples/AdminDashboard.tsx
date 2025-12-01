import { TrendingUp, Users, ShoppingCart, DollarSign, MoreVertical } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const salesData = [
  { month: 'Jan', revenue: 4200, orders: 120 },
  { month: 'Feb', revenue: 5100, orders: 145 },
  { month: 'Mar', revenue: 4800, orders: 135 },
  { month: 'Apr', revenue: 6200, orders: 178 },
  { month: 'May', revenue: 7100, orders: 205 },
  { month: 'Jun', revenue: 8400, orders: 242 },
];

const topUsers = [
  { name: 'Alex Chen', email: 'alex@example.com', spent: '$12,450', orders: 28, status: 'active' },
  { name: 'Sarah Miller', email: 'sarah@example.com', spent: '$9,820', orders: 22, status: 'active' },
  { name: 'James Wilson', email: 'james@example.com', spent: '$8,340', orders: 19, status: 'active' },
  { name: 'Emma Davis', email: 'emma@example.com', spent: '$7,920', orders: 17, status: 'inactive' },
  { name: 'Michael Brown', email: 'michael@example.com', spent: '$6,580', orders: 15, status: 'active' },
];

export function AdminDashboard() {
  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h4 className="text-black mb-1">Dashboard Overview</h4>
          <p className="text-zinc-500">Welcome back, here's what's happening today</p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-lg">
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<DollarSign size={20} />}
          label="Total Revenue"
          value="$45,231"
          change="+20.1%"
          positive
        />
        <StatCard
          icon={<ShoppingCart size={20} />}
          label="Total Orders"
          value="1,245"
          change="+12.5%"
          positive
        />
        <StatCard
          icon={<Users size={20} />}
          label="Active Users"
          value="8,492"
          change="+8.2%"
          positive
        />
        <StatCard
          icon={<TrendingUp size={20} />}
          label="Conversion Rate"
          value="3.24%"
          change="+0.4%"
          positive
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="bg-zinc-50 rounded-lg p-6">
          <h5 className="text-black mb-4">Revenue Trend</h5>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
              <XAxis dataKey="month" stroke="#71717a" />
              <YAxis stroke="#71717a" />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#000" fill="#000" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Chart */}
        <div className="bg-zinc-50 rounded-lg p-6">
          <h5 className="text-black mb-4">Order Volume</h5>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
              <XAxis dataKey="month" stroke="#71717a" />
              <YAxis stroke="#71717a" />
              <Tooltip />
              <Bar dataKey="orders" fill="#000" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Users Table */}
      <div>
        <h5 className="text-black mb-4">Top Customers</h5>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="text-left py-3 px-4 text-zinc-700">Customer</th>
                <th className="text-left py-3 px-4 text-zinc-700">Email</th>
                <th className="text-left py-3 px-4 text-zinc-700">Total Spent</th>
                <th className="text-left py-3 px-4 text-zinc-700">Orders</th>
                <th className="text-left py-3 px-4 text-zinc-700">Status</th>
                <th className="text-left py-3 px-4 text-zinc-700"></th>
              </tr>
            </thead>
            <tbody>
              {topUsers.map((user, index) => (
                <tr key={index} className="border-b border-zinc-100 hover:bg-zinc-50">
                  <td className="py-3 px-4 text-black">{user.name}</td>
                  <td className="py-3 px-4 text-zinc-600">{user.email}</td>
                  <td className="py-3 px-4 text-black">{user.spent}</td>
                  <td className="py-3 px-4 text-zinc-600">{user.orders}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-zinc-100 text-zinc-600'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-zinc-400 hover:text-black">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, change, positive }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  positive: boolean;
}) {
  return (
    <div className="bg-zinc-50 rounded-lg p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 bg-black text-white rounded-lg">
          {icon}
        </div>
        <span className={positive ? 'text-green-600' : 'text-red-600'}>
          {change}
        </span>
      </div>
      <div className="text-zinc-600 mb-1">{label}</div>
      <div className="text-black">{value}</div>
    </div>
  );
}
