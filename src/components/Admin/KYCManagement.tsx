import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, XCircle, Clock, Eye, User, Calendar, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';
import { mockUsers } from '../../data/mockData';

const KYCManagement: React.FC = () => {
  const { t } = useTranslation();
  const { updateKYCStatus } = useAuthStore();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  // Get all artists with KYC data
  const artistsWithKYC = mockUsers.filter(user => user.role === 'artist' && user.kyc);

  const handleApprove = (userId: string) => {
    updateKYCStatus(userId, 'approved');
    setSelectedUser(null);
  };

  const handleReject = (userId: string) => {
    if (rejectionReason.trim()) {
      updateKYCStatus(userId, 'rejected', rejectionReason);
      setShowRejectModal(false);
      setRejectionReason('');
      setSelectedUser(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">KYC Management</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4 text-yellow-500" />
            <span>{artistsWithKYC.filter(u => u.kyc?.status === 'pending').length} Pending</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>{artistsWithKYC.filter(u => u.kyc?.status === 'approved').length} Approved</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KYC List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Artist Verifications</h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {artistsWithKYC.map((artist) => (
              <motion.div
                key={artist.id}
                whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                className="p-4 cursor-pointer"
                onClick={() => setSelectedUser(artist)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {artist.avatar ? (
                      <img src={artist.avatar} alt={artist.name} className="h-10 w-10 rounded-full object-cover" />
                    ) : (
                      <div className="h-10 w-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{artist.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{artist.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(artist.kyc?.status || 'not_submitted')}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(artist.kyc?.status || 'not_submitted')}`}>
                      {artist.kyc?.status || 'Not Submitted'}
                    </span>
                  </div>
                </div>
                {artist.kyc?.submittedAt && (
                  <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="h-3 w-3 mr-1" />
                    Submitted: {new Date(artist.kyc.submittedAt).toLocaleDateString()}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* KYC Details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          {selectedUser ? (
            <div>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Verification Details</h3>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedUser.kyc?.status)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedUser.kyc?.status)}`}>
                      {selectedUser.kyc?.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Artist Info */}
                <div className="flex items-center space-x-4">
                  {selectedUser.avatar ? (
                    <img src={selectedUser.avatar} alt={selectedUser.name} className="h-16 w-16 rounded-full object-cover" />
                  ) : (
                    <div className="h-16 w-16 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-gray-500" />
                    </div>
                  )}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{selectedUser.name}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{selectedUser.email}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{selectedUser.location}</p>
                  </div>
                </div>

                {/* Documents */}
                <div className="space-y-4">
                  <h5 className="font-medium text-gray-900 dark:text-white">Submitted Documents</h5>
                  
                  {selectedUser.kyc?.identityDocument && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Identity Document</p>
                      <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-2">
                        <img 
                          src={selectedUser.kyc.identityDocument} 
                          alt="Identity Document" 
                          className="w-full h-48 object-cover rounded"
                        />
                      </div>
                    </div>
                  )}

                  {selectedUser.kyc?.faceVerification && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Face Verification</p>
                      <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-2">
                        <img 
                          src={selectedUser.kyc.faceVerification} 
                          alt="Face Verification" 
                          className="w-full h-48 object-cover rounded"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Submission Info */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Submitted</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {selectedUser.kyc?.submittedAt ? new Date(selectedUser.kyc.submittedAt).toLocaleString() : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Status</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedUser.kyc?.status}</p>
                    </div>
                  </div>
                </div>

                {/* Rejection Reason */}
                {selectedUser.kyc?.status === 'rejected' && selectedUser.kyc?.rejectionReason && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">Rejection Reason</p>
                    <p className="text-red-700 dark:text-red-300">{selectedUser.kyc.rejectionReason}</p>
                  </div>
                )}

                {/* Actions */}
                {selectedUser.kyc?.status === 'pending' && (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleApprove(selectedUser.id)}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => setShowRejectModal(true)}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <XCircle className="h-4 w-4" />
                      <span>Reject</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center">
              <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">Select an artist to view verification details</p>
            </div>
          )}
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Reject Verification</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Please provide a reason for rejecting this verification:
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
              rows={4}
              placeholder="Enter rejection reason..."
            />
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReject(selectedUser.id)}
                disabled={!rejectionReason.trim()}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KYCManagement;