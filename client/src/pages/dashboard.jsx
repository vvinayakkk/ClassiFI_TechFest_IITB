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

  const [analytics] = useState({
    jobCategories: {
      "Software Development": 45,
      "Project Management": 23,
      "HR": 15,
      "Data Science": 12,
      "Design": 5
    },
    weeklyUploads: [156, 142, 176, 189, 201, 188, 234],
    accuracy: {
      weekly: 98.5,
      improvement: 2.3
    }
  });

  const [settings] = useState({
    classifications: [
      { name: "Software Development", enabled: true },
      { name: "Project Management", enabled: true },
      { name: "HR", enabled: true },
      { name: "Data Science", enabled: true },
      { name: "Design", enabled: false }
    ],
    notifications: {
      email: true,
      push: true,
      weekly_report: true
    }
  });

  const handleUploadClick = () => {
    // Simulate file upload dialog
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-lg px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
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
            <button className="p-2 rounded-full hover:bg-gray-100">
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
              <div className="text-2xl font-bold">{analytics.accuracy.weekly}%</div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-green-500">↑ {analytics.accuracy.improvement}%</span>
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
    
                {/* Quick Settings */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Quick Settings</CardTitle>
                    <CardDescription>Frequently used configurations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {settings.classifications.slice(0, 3).map((classification, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{classification.name}</span>
                          <button
                            className={`
                              relative inline-flex h-6 w-11 items-center rounded-full
                              transition-colors focus:outline-none
                              ${classification.enabled ? 'bg-blue-600' : 'bg-gray-200'}
                            `}
                          >
                            <span
                              className={`
                                inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                ${classification.enabled ? 'translate-x-6' : 'translate-x-1'}
                              `}
                            />
                          </button>
                        </div>
                      ))}
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-2">
                        View All Settings →
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
    
            {/* Analytics Preview */}
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics Overview</CardTitle>
                  <CardDescription>Resume classification trends and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Job Categories Distribution */}
                    <div className="space-y-4">
                      <h3 className="font-medium">Job Categories Distribution</h3>
                      {Object.entries(analytics.jobCategories).map(([category, percentage]) => (
                        <div key={category} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{category}</span>
                            <span className="font-medium">{percentage}%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
    
                    {/* Weekly Upload Trend */}
                    <div>
                      <h3 className="font-medium mb-4">Weekly Upload Trend</h3>
                      <div className="h-64 flex items-end space-x-2">
                        {analytics.weeklyUploads.map((count, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div 
                              className="w-full bg-blue-500 hover:bg-blue-600 transition-colors rounded-t"
                              style={{ height: `${(count / Math.max(...analytics.weeklyUploads)) * 100}%` }}
                            />
                            <span className="text-xs text-gray-500 mt-2">Week {index + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      );
    };
    
    export default Dashboard;