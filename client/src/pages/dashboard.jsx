import React, { useState } from 'react';
import { Upload, User, FileText, PieChart, Settings, Bell, Search, ChevronRight, BarChart, Users, Briefcase } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedUpload, setSelectedUpload] = useState(null);

  const [notifications] = useState([
    { id: 1, message: "New classification result available", time: "2 min ago", type: "success" },
    { id: 2, message: "Resume processed successfully", time: "1 hour ago", type: "info" },
    { id: 3, message: "System update scheduled", time: "2 hours ago", type: "warning" },
    { id: 4, message: "New feature: Batch processing", time: "1 day ago", type: "info" },
  ]);

  const [recentUploads] = useState([
    { 
      id: 1, 
      name: "senior_developer_resume.pdf", 
      status: "Classified as: Java Developer", 
      time: "Just now",
      confidence: 98.2,
      skills: ["Java", "Spring Boot", "Microservices"]
    },
    { 
      id: 2, 
      name: "project_manager_cv.pdf", 
      status: "Classified as: Project Manager", 
      time: "5 min ago",
      confidence: 95.7,
      skills: ["Agile", "Scrum", "Team Leadership"]
    },
    { 
      id: 3, 
      name: "hr_specialist_resume.pdf", 
      status: "Classified as: HR Specialist", 
      time: "1 hour ago",
      confidence: 97.1,
      skills: ["Recruitment", "Employee Relations", "HR Policy"]
    },
  ]);

  const handleUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e) => {
      if (e.target.files?.[0]) {
        alert('Resume upload initiated! (This is a demo)');
      }
    };
    input.click();
  };

  const handleUploadSelect = (upload) => {
    setSelectedUpload(selectedUpload?.id === upload.id ? null : upload);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'classifications':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Classifications</CardTitle>
              <CardDescription>View and manage resume classifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Available Classifications</h3>
                <div className="grid gap-4">
                  {["Software Development", "Project Management", "HR", "Data Science", "Design"].map((category) => (
                    <div key={category} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span>{category}</span>
                      <span className="text-blue-600 cursor-pointer hover:underline">View Details</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      
      case 'analytics':
        return (
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
      
      case 'settings':
        return (
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
      
      default:
        return (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Uploads</CardTitle>
                  <Upload className="h-4 w-4 text-gray-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-green-500">↑ 12%</span>
                    <span className="text-xs text-gray-500">from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-gray-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">892</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-green-500">↑ 8%</span>
                    <span className="text-xs text-gray-500">from last week</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Job Categories</CardTitle>
                  <Briefcase className="h-4 w-4 text-gray-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-blue-500">+2</span>
                    <span className="text-xs text-gray-500">new categories</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
                  <PieChart className="h-4 w-4 text-gray-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98.5%</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-green-500">↑ 2.3%</span>
                    <span className="text-xs text-gray-500">improvement</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Uploads and Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Uploads */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Uploads</CardTitle>
                    <CardDescription>Latest resumes processed by the system</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentUploads.map(upload => (
                        <div 
                          key={upload.id} 
                          className={`
                            flex items-center justify-between p-4 rounded-lg cursor-pointer
                            transition-all duration-200
                            ${selectedUpload?.id === upload.id ? 'bg-blue-50 ring-2 ring-blue-500' : 'bg-gray-50 hover:bg-gray-100'}
                          `}
                          onClick={() => handleUploadSelect(upload)}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">{upload.name}</p>
                              <p className="text-sm text-gray-500">{upload.status}</p>
                              {selectedUpload?.id === upload.id && (
                                <div className="mt-2 space-y-1">
                                  <p className="text-sm"><span className="font-medium">Confidence:</span> {upload.confidence}%</p>
                                  <p className="text-sm"><span className="font-medium">Key Skills:</span> {upload.skills.join(", ")}</p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">{upload.time}</span>
                            <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${selectedUpload?.id === upload.id ? 'rotate-90' : ''}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Notifications */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>System Updates</CardTitle>
                    <CardDescription>Latest notifications and alerts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200"
                        >
                          <div className={`h-2 w-2 rounded-full ${
                            notification.type === 'success' ? 'bg-green-500' :
                            notification.type === 'warning' ? 'bg-yellow-500' :
                            'bg-blue-500'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{notification.message}</p>
                            <p className="text-xs text-gray-500">{notification.time}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-lg px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text cursor-pointer"
              onClick={() => setActiveTab('dashboard')}
            >
              ResumeAI
            </h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search resumes..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 bg-gray-50"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                className="p-2 rounded-full hover:bg-gray-100 relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 z-50">
                  <h3 className="font-semibold mb-2">Notifications</h3>
                  <div className="space-y-2">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                      >
                        <p className="text-sm font-medium">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button 
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
            <button className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1 hover:bg-gray-200">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium">Admin</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={handleUploadClick}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-3 text-white"
            >
              <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
                <Upload className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium">Upload Resume</span>
            </button>
            <button 
              onClick={() => setActiveTab('classifications')}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-3 hover:bg-gray-50"
            >
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <span className="font-medium">Classifications</span>
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-3 hover:bg-gray-50"
            >
              <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <BarChart className="h-5 w-5 text-purple-600" />
              </div>
              <span className="font-medium">Analytics</span>
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-3 hover:bg-gray-50"
            >
              <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Settings className="h-5 w-5 text-orange-600" />
              </div>
              <span className="font-medium">Settings</span>
            </button>
          </div>
        </div>

        {/* Dynamic Content Based on Active Tab */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;