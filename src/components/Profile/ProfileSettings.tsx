import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { User, Settings, Mail, Phone, Shield, Upload, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';

interface ProfileForm {
  name: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
}

interface KYCForm {
  identityDocument: FileList;
  faceVerification: FileList;
}

const ProfileSettings: React.FC = () => {
  const { t } = useTranslation();
  const { user, updateProfile, submitKYC, verifyEmail } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'kyc' | 'security'>('profile');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [identityPreview, setIdentityPreview] = useState<string>('');
  const [facePreview, setFacePreview] = useState<string>('');

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm<ProfileForm>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
      location: user?.location || '',
    }
  });

  const {
    register: registerKYC,
    handleSubmit: handleKYCSubmit,
    formState: { errors: kycErrors },
  } = useForm<KYCForm>();

  const onProfileSubmit = async (data: ProfileForm) => {
    setIsSubmitting(true);
    try {
      updateProfile(data);
      // Show success message
    } catch (error) {
      console.error('Profile update error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onKYCSubmit = async (data: KYCForm) => {
    setIsSubmitting(true);
    try {
      // In a real app, you would upload files to a storage service
      const identityDocument = identityPreview || 'mock-identity-document-url';
      const faceVerification = facePreview || 'mock-face-verification-url';
      
      submitKYC({
        identityDocument,
        faceVerification,
      });
      
      // Show success message
    } catch (error) {
      console.error('KYC submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (file: File, type: 'identity' | 'face') => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'identity') {
        setIdentityPreview(reader.result as string);
      } else {
        setFacePreview(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleEmailVerification = () => {
    if (user) {
      verifyEmail(user.id);
      // In a real app, this would send a verification email
      alert('Verification email sent! (Simulated)');
    }
  };

  const getKYCStatusIcon = () => {
    switch (user?.kyc?.status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getKYCStatusText = () => {
    switch (user?.kyc?.status) {
      case 'approved':
        return 'Verified Artist';
      case 'rejected':
        return 'Verification Failed';
      case 'pending':
        return 'Under Review';
      default:
        return 'Not Verified';
    }
  };

  const getKYCStatusColor = () => {
    switch (user?.kyc?.status) {
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

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
            <div className="flex items-center space-x-4">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-16 w-16 rounded-full object-cover ring-4 ring-white/20" />
              ) : (
                <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-purple-100">{user.email}</span>
                  {user.role === 'artist' && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getKYCStatusColor()}`}>
                      {getKYCStatusIcon()}
                      <span className="ml-1">{getKYCStatusText()}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-8">
              {[
                { id: 'profile', label: 'Profile', icon: User },
                ...(user.role === 'artist' ? [{ id: 'kyc' as const, label: 'Verification', icon: Shield }] : []),
                { id: 'security' as const, label: 'Security', icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-8">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Information</h2>
                <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        {...registerProfile('name', { required: 'Name is required' })}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      />
                      {profileErrors.name && (
                        <p className="mt-1 text-sm text-red-600">{profileErrors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        {...registerProfile('email', { required: 'Email is required' })}
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      />
                      {profileErrors.email && (
                        <p className="mt-1 text-sm text-red-600">{profileErrors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        {...registerProfile('phone')}
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Location
                      </label>
                      <input
                        {...registerProfile('location')}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bio
                    </label>
                    <textarea
                      {...registerProfile('bio')}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </motion.div>
            )}

            {activeTab === 'kyc' && user.role === 'artist' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Artist Verification</h2>
                  <div className="flex items-center space-x-2">
                    {getKYCStatusIcon()}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getKYCStatusColor()}`}>
                      {getKYCStatusText()}
                    </span>
                  </div>
                </div>

                {user.kyc?.status === 'rejected' && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-red-800 dark:text-red-200">
                      <XCircle className="h-5 w-5" />
                      <span className="font-medium">Verification Rejected</span>
                    </div>
                    <p className="text-red-700 dark:text-red-300 mt-2">
                      {user.kyc.rejectionReason || 'Please resubmit your documents with better quality.'}
                    </p>
                  </div>
                )}

                {user.kyc?.status === 'approved' && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-green-800 dark:text-green-200">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Verification Approved</span>
                    </div>
                    <p className="text-green-700 dark:text-green-300 mt-2">
                      Your artist account has been verified. You can now sell your artworks on awArt.ma.
                    </p>
                  </div>
                )}

                {(!user.kyc || user.kyc.status === 'not_submitted' || user.kyc.status === 'rejected') && (
                  <form onSubmit={handleKYCSubmit(onKYCSubmit)} className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <h3 className="font-medium text-blue-900 dark:text-blue-200 mb-2">Required Documents</h3>
                      <ul className="text-blue-800 dark:text-blue-300 text-sm space-y-1">
                        <li>• Valid government-issued ID (passport, national ID, or driver's license)</li>
                        <li>• Clear photo of yourself holding the ID document</li>
                        <li>• Documents must be clear and all text must be readable</li>
                      </ul>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Identity Document
                      </label>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 hover:border-purple-400 transition-colors">
                        {identityPreview ? (
                          <div className="relative">
                            <img src={identityPreview} alt="Identity Document" className="w-full h-48 object-cover rounded-lg" />
                            <button
                              type="button"
                              onClick={() => setIdentityPreview('')}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <label className="cursor-pointer">
                              <span className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                                Upload Identity Document
                              </span>
                              <input
                                {...registerKYC('identityDocument', { required: 'Identity document is required' })}
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFileUpload(file, 'identity');
                                }}
                                className="hidden"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                      {kycErrors.identityDocument && (
                        <p className="mt-1 text-sm text-red-600">{kycErrors.identityDocument.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Face Verification
                      </label>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 hover:border-purple-400 transition-colors">
                        {facePreview ? (
                          <div className="relative">
                            <img src={facePreview} alt="Face Verification" className="w-full h-48 object-cover rounded-lg" />
                            <button
                              type="button"
                              onClick={() => setFacePreview('')}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <label className="cursor-pointer">
                              <span className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                                Upload Face Verification
                              </span>
                              <input
                                {...registerKYC('faceVerification', { required: 'Face verification is required' })}
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFileUpload(file, 'face');
                                }}
                                className="hidden"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                      {kycErrors.faceVerification && (
                        <p className="mt-1 text-sm text-red-600">{kycErrors.faceVerification.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
                    </button>
                  </form>
                )}
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Security Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Email Verification</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {user.emailVerified ? (
                        <span className="flex items-center text-green-600 dark:text-green-400">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Verified
                        </span>
                      ) : (
                        <button
                          onClick={handleEmailVerification}
                          className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors"
                        >
                          Verify Email
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Phone Verification</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {user.phone || 'No phone number added'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {user.phoneVerified ? (
                        <span className="flex items-center text-green-600 dark:text-green-400">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Verified
                        </span>
                      ) : (
                        <span className="text-gray-500 text-sm">Coming Soon</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileSettings;