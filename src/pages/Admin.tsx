import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { 
  FaUsers, FaEnvelope, FaBuilding, FaRoute, FaChartLine, 
  FaHome, FaAddressBook, FaCodeBranch, FaCalendarAlt, 
  FaSignOutAlt, FaCog 
} from "react-icons/fa";

interface Contact {
  _id: string;
  name: string;
  subject: string;
  createdAt: string;
}

interface Branch {
  _id: string;
  name: string;
  district: string;
  manager: string;
}

interface Root {
  _id: string;
  name: string;
  district: string;
  managerName: string;
}

interface DashboardStats {
  contactCount: number;
  branchCount: number;
  rootCount: number;
  recentContacts: Contact[];
  recentBranches: Branch[];
  recentRoots: Root[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // fallback

const Admin = () => {
  const location = useLocation();
  const [stats, setStats] = useState<DashboardStats>({
    contactCount: 0,
    branchCount: 0,
    rootCount: 0,
    recentContacts: [],
    recentBranches: [],
    recentRoots: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [contactsRes, branchesRes, rootsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/ContactMessages`),
          axios.get(`${API_BASE_URL}/branches`),
          axios.get(`${API_BASE_URL}/roots`)
        ]);

        setStats({
          contactCount: contactsRes.data.length,
          branchCount: branchesRes.data.length,
          rootCount: rootsRes.data.length,
          recentContacts: contactsRes.data.slice(0, 5),
          recentBranches: branchesRes.data.slice(0, 5),
          recentRoots: rootsRes.data.slice(0, 5)
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-72 bg-gray-900 text-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Logo and Title */}
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-center">Admin Panel</h2>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-2">
            {[
              { to: "/Admin/admin", icon: <FaHome />, label: "Dashboard" },
              { to: "/Admin/admincontactus", icon: <FaAddressBook />, label: "Contact Us Request" },
              { to: "/Admin/adminbranch", icon: <FaCodeBranch />, label: "Branch Management" },
              { to: "/Admin/adminroot", icon: <FaRoute />, label: "Route Management" },
              { to: "/Admin/adminevent", icon: <FaCalendarAlt />, label: "Event Management" },
              { to: "/Admin/adminsettings", icon: <FaCog />, label: "Settings" },
            ].map(({ to, icon, label }) => (
              <Link 
                key={to}
                to={to}
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                  location.pathname === to 
                    ? "bg-blue-600 text-white" 
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="mr-3">{icon}</span>
                {label}
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-700">
            <Link 
              to="/Admin/logout" 
              className="flex items-center px-4 py-3 rounded-lg text-red-400 hover:bg-red-900 hover:text-white transition-all"
            >
              <FaSignOutAlt className="mr-3" />
              Logout
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-72 flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard title="Contact Requests" count={stats.contactCount} icon={<FaEnvelope className="text-4xl" />} link="/Admin/admincontactus" color="blue" />
              <StatCard title="Total Branches" count={stats.branchCount} icon={<FaBuilding className="text-4xl" />} link="/Admin/adminbranch" color="green" />
              <StatCard title="Total Routes" count={stats.rootCount} icon={<FaRoute className="text-4xl" />} link="/Admin/adminroot" color="purple" />
            </div>

            {/* Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <RecentList title="Recent Contact Requests" icon={<FaEnvelope />} items={stats.recentContacts.map(item => ({
                key: item._id,
                title: item.name,
                subtitle: item.subject,
                meta: new Date(item.createdAt).toLocaleDateString()
              }))} />

              <RecentList title="Recent Branches" icon={<FaBuilding />} items={stats.recentBranches.map(item => ({
                key: item._id,
                title: item.name,
                subtitle: item.district,
                meta: item.manager
              }))} />

              <RecentList title="Recent Routes" icon={<FaRoute />} items={stats.recentRoots.map(item => ({
                key: item._id,
                title: item.name,
                subtitle: item.district,
                meta: item.managerName
              }))} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, count, icon, link, color }: { title: string; count: number; icon: React.ReactNode; link: string; color: string }) => (
  <div className={`bg-gradient-to-r from-${color}-500 to-${color}-700 text-white shadow-lg rounded-xl p-6`}>
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-3xl font-bold">{count}</p>
      </div>
      {icon}
    </div>
    <div className="mt-4">
      <Link to={link} className="text-sm hover:underline">
        View All →
      </Link>
    </div>
  </div>
);

const RecentList = ({ title, icon, items }: { title: string; icon: React.ReactNode; items: { key: string; title: string; subtitle: string; meta: string }[] }) => (
  <div className="bg-white shadow-lg rounded-xl p-6">
    <h3 className="text-lg font-semibold mb-4 flex items-center">
      <span className="mr-2">{icon}</span> {title}
    </h3>
    <div className="space-y-4">
      {items.map(item => (
        <div key={item.key} className="border-b pb-2">
          <p className="font-medium">{item.title}</p>
          <p className="text-sm text-gray-600">{item.subtitle}</p>
          <p className="text-xs text-gray-500">{item.meta}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Admin;
