import React, { useState } from 'react';
import {
  UsersIcon,
  BriefcaseIcon,
  DollarSignIcon,
  TrendingUpIcon,
  SearchIcon,
  FilterIcon,
  MoreVerticalIcon,
  ShieldCheckIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  LayoutDashboardIcon,
  FileTextIcon,
  SettingsIcon,
  LogOutIcon,
  PlusIcon,
  StarIcon,
  XIcon
} from 'lucide-react';
import { Provider, Booking, Category, CUSTOMERS } from '../data/mockData';

interface AdminDashboardProps {
  user: any;
  providers: Provider[];
  bookings: Booking[];
  categories: Category[];
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onAddCategory: (category: Category) => void;
  onShowToast: (msg: string) => void;
}

export function AdminDashboard({
  user,
  providers,
  bookings,
  categories,
  onNavigate,
  onLogout,
  onAddCategory,
  onShowToast
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'users' | 'providers' | 'transactions' | 'content' | 'settings'
  >('overview');

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  const stats = {
    totalUsers: 12450,
    activeProviders: providers.length * 45,
    totalBookings: 15890,
    revenue: 4500000
  };

  const filteredProviders = providers.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    onAddCategory({
      id: `c_${Date.now()}`,
      name: newCatName,
      icon: 'ZapIcon',
      providerCount: 15
    });
    onShowToast(`New category "${newCatName}" added!`);
    setIsAddCategoryOpen(false);
    setNewCatName('');
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)] flex flex-col md:flex-row animate-fade-in">
      {/* Admin Sidebar */}
      <div className="w-full md:w-64 bg-primary-dark text-white flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShieldCheckIcon className="h-6 w-6 text-secondary" /> Admin Portal
          </h2>
          <p className="text-xs text-gray-400 mt-1">CloudServe Sri Lanka</p>
        </div>

        <nav className="flex-1 py-4">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboardIcon },
            { id: 'users', label: 'Customers Management', icon: UsersIcon },
            { id: 'providers', label: 'Service Providers', icon: BriefcaseIcon },
            { id: 'transactions', label: 'Transactions & Fees', icon: DollarSignIcon },
            { id: 'content', label: 'Categories Management', icon: FileTextIcon },
            { id: 'settings', label: 'Platform Settings', icon: SettingsIcon }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-6 py-3.5 text-xs font-semibold transition-colors border-l-4 ${
                  activeTab === item.id
                    ? 'border-secondary bg-white/10 text-white'
                    : 'border-transparent text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" /> {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="h-9 w-9 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-xs">
              A
            </div>
            <div>
              <p className="text-xs font-bold text-white">Super Admin</p>
              <p className="text-[10px] text-gray-400">admin@cloudserve.lk</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-400 hover:bg-white/5 rounded-xl transition-colors"
          >
            <LogOutIcon className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8">
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-extrabold text-gray-900">Platform Analytics</h1>
              <div className="flex items-center gap-2 text-xs text-gray-600 bg-white px-3 py-1.5 rounded-xl border border-gray-200">
                <span className="h-2 w-2 rounded-full bg-success"></span> All Sri Lankan Servers Operational
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <UsersIcon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold text-success flex items-center gap-1 bg-green-50 px-2 py-1 rounded-md">
                    <TrendingUpIcon className="h-3 w-3" /> 12%
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-semibold mb-1">Total Customers</p>
                <h3 className="text-3xl font-extrabold text-gray-900">{stats.totalUsers.toLocaleString()}</h3>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                    <BriefcaseIcon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold text-success flex items-center gap-1 bg-green-50 px-2 py-1 rounded-md">
                    <TrendingUpIcon className="h-3 w-3" /> 8%
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-semibold mb-1">Active Providers</p>
                <h3 className="text-3xl font-extrabold text-gray-900">{providers.length}</h3>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                    <CheckCircleIcon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold text-success flex items-center gap-1 bg-green-50 px-2 py-1 rounded-md">
                    <TrendingUpIcon className="h-3 w-3" /> 24%
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-semibold mb-1">Total Bookings</p>
                <h3 className="text-3xl font-extrabold text-gray-900">{bookings.length + 1580}</h3>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-green-50 text-success rounded-xl flex items-center justify-center">
                    <DollarSignIcon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold text-success flex items-center gap-1 bg-green-50 px-2 py-1 rounded-md">
                    <TrendingUpIcon className="h-3 w-3" /> 18%
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-semibold mb-1">Platform Revenue (LKR)</p>
                <h3 className="text-3xl font-extrabold text-gray-900">Rs. {(stats.revenue / 100000).toFixed(1)}M</h3>
              </div>
            </div>

            {/* Action Items */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 text-sm mb-4">Pending Admin Verifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-gray-900 text-xs">12 Pending NIC Verifications</h4>
                    <p className="text-[11px] text-gray-600">New providers waiting for identity check in Kandy & Galle.</p>
                  </div>
                  <button onClick={() => onShowToast('Approved 12 pending providers!')} className="btn btn-primary text-xs py-1.5 px-3">
                    Approve All
                  </button>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-gray-900 text-xs">Customer Disputes (0 Pending)</h4>
                    <p className="text-[11px] text-gray-600">All recent complaints resolved with refund simulation.</p>
                  </div>
                  <button onClick={() => onShowToast('Dispute logs clean.')} className="btn btn-outline text-xs py-1.5 px-3">
                    Logs
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'providers' && (
          <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Provider Directory & Verification</h1>
              <div className="relative flex-1 md:w-64">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or category..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-300 text-xs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Provider</th>
                      <th className="px-6 py-3 font-semibold">Category & City</th>
                      <th className="px-6 py-3 font-semibold">Rating</th>
                      <th className="px-6 py-3 font-semibold">Completed Jobs</th>
                      <th className="px-6 py-3 font-semibold">Status</th>
                      <th className="px-6 py-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProviders.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={p.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                            <div>
                              <p className="font-bold text-gray-900">{p.name}</p>
                              <p className="text-[10px] text-gray-400">{p.phone || '+94 77 123 4567'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-gray-900">{p.category}</p>
                          <p className="text-[10px] text-gray-500">{p.city}</p>
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-1">
                          <StarIcon className="h-3.5 w-3.5 text-accent fill-current" /> {p.rating}
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900">{p.completedJobs}</td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800">
                            Verified Active
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => onShowToast(`Provider ${p.name} updated.`)} className="btn btn-outline text-[10px] py-1 px-2">
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Manage Service Categories</h1>
              <button onClick={() => setIsAddCategoryOpen(true)} className="btn btn-primary flex items-center gap-2 text-xs py-2 px-4">
                <PlusIcon className="h-4 w-4" /> Add Category
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{cat.name}</h3>
                    <p className="text-xs text-gray-500">{cat.providerCount} Active Professionals</p>
                  </div>
                  <span className="bg-blue-50 text-secondary text-xs font-bold px-2.5 py-1 rounded-lg">Active</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Category Modal */}
      {isAddCategoryOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full relative">
            <button onClick={() => setIsAddCategoryOpen(false)} className="absolute top-4 right-4 text-gray-400"><XIcon className="h-5 w-5" /></button>
            <h3 className="font-bold text-gray-900 text-base mb-4">Add New Category</h3>
            <form onSubmit={handleAddCategorySubmit} className="space-y-4">
              <div>
                <label className="label">Category Name</label>
                <input type="text" required value={newCatName} onChange={(e) => setNewCatName(e.target.value)} className="input-field" placeholder="E.g., Solar Technicians" />
              </div>
              <button type="submit" className="btn btn-primary w-full py-2.5 text-xs font-bold">Save Category</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}