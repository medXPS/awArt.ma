import React from 'react';
import { useAuthStore } from '../stores/authStore';
import CustomerDashboard from '../components/Dashboard/CustomerDashboard';
import ArtistDashboard from '../components/Dashboard/ArtistDashboard';
import AdminDashboard from '../components/Dashboard/AdminDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="text-gray-600 mt-2">Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  switch (user.role) {
    case 'customer':
      return <CustomerDashboard />;
    case 'artist':
      return <ArtistDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Invalid Role</h2>
            <p className="text-gray-600 mt-2">Your account role is not recognized.</p>
          </div>
        </div>
      );
  }
};

export default Dashboard;