import { useState } from 'react';
import { Navbar } from '@/components/dashboard/Navbar';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { RecentUploads } from '@/components/dashboard/RecentUploads';
import { NOTIFICATIONS, RECENT_UPLOADS, PROCESSING_RESULTS } from '@/constants/dashboardData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ResumeProcessingLoader from '@/components/ResumeProcessingLoader ';
import { Notifications } from '@/components/dashboard/Notifications';
import Classifications from '@/components/dashboard/Classifications';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingResults, setProcessingResults] = useState(PROCESSING_RESULTS);
  const [recentUploads, setRecentUploads] = useState(RECENT_UPLOADS);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedUpload, setSelectedUpload] = useState(null);

  const handleUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = async (e) => {
      if (e.target.files?.[0]) {
        setIsProcessing(true);
        try {
          await new Promise(resolve => setTimeout(resolve, 5000));
          setRecentUploads(prev => [
            {
              id: Date.now(),
              name: e.target.files[0].name,
              status: `Classified as: ${processingResults.finalClassification}`,
              time: "Just now",
              confidence: processingResults.overallConfidence,
              skills: processingResults.model4.skills
            },
            ...prev
          ]);
        } catch (error) {
          console.error("Processing error", error);
        } finally {
          setIsProcessing(false);
        }
      }
    };
    input.click();
  };

  const handleUploadSelect = (upload) => {
    setSelectedUpload(selectedUpload?.id === upload.id ? null : upload);
  };

  const renderAnalytics = () => (
    <Card>
      <CardHeader>
        <CardTitle>Analytics Dashboard</CardTitle>
        <CardDescription>Detailed metrics and insights</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Classification Accuracy</h3>
              <div className="text-3xl font-bold text-blue-600">98.5%</div>
              <p className="text-sm text-gray-500">Last 7 days</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Total Processed</h3>
              <div className="text-3xl font-bold text-blue-600">1,234</div>
              <p className="text-sm text-gray-500">This month</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
        <CardDescription>Configure your preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Notification Preferences</h3>
            <div className="space-y-2">
              {['Email Notifications', 'Push Notifications', 'Weekly Reports'].map((setting) => (
                <div key={setting} className="flex items-center justify-between p-2">
                  <span>{setting}</span>
                  <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                    <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'classifications':
        return <Classifications />;
      case 'analytics':
        return renderAnalytics();
      case 'settings':
        return renderSettings();
      default:
        return (
          <>
            <StatsGrid />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RecentUploads 
                  uploads={recentUploads}
                  selectedUpload={selectedUpload}
                  onUploadSelect={handleUploadSelect}
                />
              </div>
              <div>
                <Notifications notifications={NOTIFICATIONS} />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ResumeProcessingLoader isLoading={isProcessing} modelResults={processingResults} />
      <Navbar setActiveTab={setActiveTab} />
      
      <div className="p-6 max-w-7xl mx-auto">
        <QuickActions setActiveTab={setActiveTab} handleUploadClick={handleUploadClick} />
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;