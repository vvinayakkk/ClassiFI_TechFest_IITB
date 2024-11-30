import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerDescription, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerTrigger 
} from "@/components/ui/drawer";
import { Info , Upload, User, FileText, PieChart, Settings, Bell, Search, ChevronRight, BarChart, Users, Briefcase } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const classificationData = [
    { category: "BUSINESS-DEVELOPMENT", count: 120, icon: "💼" },
    { category: "INFORMATION-TECHNOLOGY", count: 120, icon: "💻" },
    { category: "CHEF", count: 118, icon: "👨‍🍳" },
    { category: "ACCOUNTANT", count: 118, icon: "📊" },
    { category: "ENGINEERING", count: 118, icon: "🔧" },
    { category: "ADVOCATE", count: 118, icon: "⚖️" },
    { category: "FINANCE", count: 118, icon: "💰" },
    { category: "FITNESS", count: 117, icon: "💪" },
    { category: "AVIATION", count: 117, icon: "✈️" },
    { category: "SALES", count: 116, icon: "🤝" },
    { category: "CONSULTANT", count: 115, icon: "📈" },
    { category: "BANKING", count: 115, icon: "🏦" },
    { category: "HEALTHCARE", count: 115, icon: "🩺" },
    { category: "CONSTRUCTION", count: 112, icon: "🏗️" },
    { category: "PUBLIC-RELATIONS", count: 111, icon: "📣" },
    { category: "HR", count: 110, icon: "👥" },
    { category: "DESIGNER", count: 107, icon: "🎨" },
    { category: "ARTS", count: 103, icon: "🎭" },
    { category: "TEACHER", count: 102, icon: "📚" },
    { category: "APPAREL", count: 97, icon: "👗" },
    { category: "DIGITAL-MEDIA", count: 96, icon: "📱" },
    { category: "AGRICULTURE", count: 63, icon: "🌾" },
    { category: "AUTOMOBILE", count: 36, icon: "🚗" },
    { category: "BPO", count: 22, icon: "🖥️" }
  ];

  const getCategoryDetails = (category) => {
    // Mock data for demonstration
    const detailData = {
      "BUSINESS-DEVELOPMENT": {
        totalPDFs: 120,
        averageConfidence: 95.5,
        topSkills: ["Strategic Planning", "Business Analysis", "Negotiation"],
        averageExperience: "7-10 years",
        description:
          "Business Development professionals focus on growth strategies, market expansion, and creating new business opportunities.",
        keyResponsibilities: [
          "Identify new business opportunities",
          "Develop and manage strategic partnerships",
          "Create and implement business growth strategies",
        ],
      },
      "INFORMATION-TECHNOLOGY": {
        totalPDFs: 120,
        averageConfidence: 97.2,
        topSkills: ["Software Development", "Cloud Computing", "Cybersecurity"],
        averageExperience: "5-8 years",
        description:
          "IT professionals design, develop, and maintain computer systems, software, and networks.",
        keyResponsibilities: [
          "Develop and maintain software applications",
          "Manage IT infrastructure",
          "Ensure cybersecurity and data protection",
        ],
      },
      "CHEF": {
        totalPDFs: 118,
        averageConfidence: 92.4,
        topSkills: ["Culinary Arts", "Menu Planning", "Food Safety"],
        averageExperience: "3-5 years",
        description:
          "Chefs are culinary professionals responsible for preparing, cooking, and presenting meals to high standards.",
        keyResponsibilities: [
          "Prepare and cook food according to recipes",
          "Manage kitchen staff and operations",
          "Ensure compliance with food safety standards",
        ],
      },
      "ACCOUNTANT": {
        totalPDFs: 118,
        averageConfidence: 96.1,
        topSkills: ["Financial Reporting", "Taxation", "Budgeting"],
        averageExperience: "5-7 years",
        description:
          "Accountants are responsible for preparing and analyzing financial records, ensuring compliance with regulations.",
        keyResponsibilities: [
          "Prepare and examine financial records",
          "Ensure accuracy and compliance with laws",
          "Provide financial advice to clients or management",
        ],
      },
      "ENGINEERING": {
        totalPDFs: 118,
        averageConfidence: 94.7,
        topSkills: ["Problem-Solving", "Technical Design", "Project Management"],
        averageExperience: "4-6 years",
        description:
          "Engineers apply science and mathematics to solve technical problems and design innovative solutions.",
        keyResponsibilities: [
          "Design and develop technical solutions",
          "Test and evaluate systems or products",
          "Collaborate with cross-functional teams",
        ],
      },
      "ADVOCATE": {
        totalPDFs: 118,
        averageConfidence: 93.3,
        topSkills: ["Legal Research", "Litigation", "Client Advocacy"],
        averageExperience: "6-8 years",
        description:
          "Advocates provide legal representation and advice to clients, ensuring their rights are protected.",
        keyResponsibilities: [
          "Represent clients in legal proceedings",
          "Draft legal documents and contracts",
          "Conduct legal research and analysis",
        ],
      },
      "FINANCE": {
        totalPDFs: 118,
        averageConfidence: 95.8,
        topSkills: ["Financial Analysis", "Investment Management", "Risk Assessment"],
        averageExperience: "5-8 years",
        description:
          "Finance professionals manage financial resources, plan investments, and assess financial risks.",
        keyResponsibilities: [
          "Develop financial strategies and plans",
          "Analyze and interpret financial data",
          "Advise on investment opportunities",
        ],
      },
      "FITNESS": {
        totalPDFs: 117,
        averageConfidence: 91.9,
        topSkills: ["Personal Training", "Nutrition Planning", "Motivational Skills"],
        averageExperience: "3-5 years",
        description:
          "Fitness professionals help clients achieve their health and wellness goals through personalized training and guidance.",
        keyResponsibilities: [
          "Create personalized fitness plans",
          "Provide guidance on exercise techniques",
          "Motivate clients to achieve fitness goals",
        ],
      },
      "AVIATION": {
        totalPDFs: 117,
        averageConfidence: 94.5,
        topSkills: ["Flight Operations", "Aircraft Maintenance", "Safety Procedures"],
        averageExperience: "5-8 years",
        description:
          "Aviation professionals ensure the safe and efficient operation of aircraft and related services.",
        keyResponsibilities: [
          "Operate and navigate aircraft",
          "Perform maintenance and inspections",
          "Ensure compliance with aviation safety regulations",
        ],
      },
      "SALES": {
        totalPDFs: 116,
        averageConfidence: 93.2,
        topSkills: ["Client Relationship", "Negotiation", "Lead Generation"],
        averageExperience: "2-4 years",
        description:
          "Sales professionals identify customer needs, promote products or services, and close deals.",
        keyResponsibilities: [
          "Generate and follow up on leads",
          "Negotiate contracts and agreements",
          "Achieve sales targets and goals",
        ],
      },
      "CONSULTANT": {
        totalPDFs: 115,
        averageConfidence: 94.6,
        topSkills: ["Problem-Solving", "Data Analysis", "Client Communication"],
        averageExperience: "5-7 years",
        description:
          "Consultants provide expert advice to help organizations solve problems and achieve goals.",
        keyResponsibilities: [
          "Analyze client needs and challenges",
          "Develop and propose solutions",
          "Support implementation and change management",
        ],
      },
      "BANKING": {
        totalPDFs: 115,
        averageConfidence: 96.0,
        topSkills: ["Financial Services", "Risk Management", "Customer Relations"],
        averageExperience: "6-8 years",
        description:
          "Banking professionals manage financial transactions, customer relationships, and risk assessments.",
        keyResponsibilities: [
          "Assist customers with financial services",
          "Analyze credit and loan applications",
          "Ensure regulatory compliance",
        ],
      },
      "HEALTHCARE": {
        totalPDFs: 115,
        averageConfidence: 96.5,
        topSkills: ["Patient Care", "Medical Knowledge", "Attention to Detail"],
        averageExperience: "4-6 years",
        description:
          "Healthcare professionals provide medical care and support to patients, ensuring their well-being and recovery.",
        keyResponsibilities: [
          "Diagnose and treat illnesses",
          "Provide patient education and support",
          "Maintain medical records and reports",
        ],
      },
      "CONSTRUCTION": {
        totalPDFs: 112,
        averageConfidence: 92.8,
        topSkills: ["Blueprint Reading", "Project Management", "Safety Compliance"],
        averageExperience: "5-7 years",
        description:
          "Construction professionals build and manage infrastructure projects, ensuring quality and safety.",
        keyResponsibilities: [
          "Plan and oversee construction projects",
          "Ensure compliance with safety standards",
          "Manage teams and resources efficiently",
        ],
      },
      "PUBLIC-RELATIONS": {
        totalPDFs: 111,
        averageConfidence: 91.7,
        topSkills: ["Media Relations", "Crisis Management", "Content Creation"],
        averageExperience: "3-5 years",
        description:
          "Public Relations professionals maintain and promote a positive image for organizations and individuals.",
        keyResponsibilities: [
          "Develop and execute PR campaigns",
          "Manage media relations and communication",
          "Monitor public perception and feedback",
        ],
      },
      "HR": {
        totalPDFs: 110,
        averageConfidence: 94.1,
        topSkills: ["Recruitment", "Employee Engagement", "Conflict Resolution"],
        averageExperience: "4-6 years",
        description:
          "Human Resources professionals manage employee relations, recruitment, and organizational development.",
        keyResponsibilities: [
          "Recruit and onboard employees",
          "Develop HR policies and strategies",
          "Handle employee grievances and conflicts",
        ],
      },
      "DESIGNER": {
        totalPDFs: 107,
        averageConfidence: 93.8,
        topSkills: ["Graphic Design", "Creative Thinking", "User Experience"],
        averageExperience: "3-5 years",
        description:
          "Designers create visual concepts and designs to communicate ideas effectively.",
        keyResponsibilities: [
          "Develop visual designs and layouts",
          "Collaborate with clients and teams",
          "Ensure consistency in branding",
        ],
      },
      "ARTS": {
        totalPDFs: 103,
        averageConfidence: 90.5,
        topSkills: ["Artistic Skills", "Creativity", "Self-Expression"],
        averageExperience: "2-4 years",
        description:
          "Artists express creativity through various mediums such as painting, sculpture, or performance.",
        keyResponsibilities: [
          "Create original artworks",
          "Showcase art through exhibitions or performances",
          "Collaborate on creative projects",
        ],
      },
      "TEACHER": {
        totalPDFs: 102,
        averageConfidence: 92.7,
        topSkills: ["Instructional Design", "Classroom Management", "Subject Knowledge"],
        averageExperience: "5-7 years",
        description:
          "Teachers educate and inspire students, preparing them for personal and professional growth.",
        keyResponsibilities: [
          "Develop and deliver lesson plans",
          "Assess and monitor student progress",
          "Engage students in interactive learning",
        ],
      },
      "APPAREL": {
        totalPDFs: 97,
        averageConfidence: 89.3,
        topSkills: ["Fashion Design", "Trend Analysis", "Product Development"],
        averageExperience: "3-5 years",
        description:
          "Apparel professionals design and produce clothing and accessories that align with market trends.",
        keyResponsibilities: [
          "Design and develop clothing lines",
          "Analyze fashion trends and markets",
          "Manage production and quality control",
        ],
      },
      "DIGITAL-MEDIA": {
  totalPDFs: 96,
  averageConfidence: 93.8,
  topSkills: ["Content Creation", "Social Media Management", "Analytics"],
  averageExperience: "3-5 years",
  description:
    "Digital Media professionals create, manage, and optimize content across various online platforms to engage audiences and drive brand growth.",
  keyResponsibilities: [
    "Develop engaging digital content",
    "Manage social media channels and campaigns",
    "Analyze performance metrics and optimize strategies",
  ],
},

"AGRICULTURE": {
  totalPDFs: 63,
  averageConfidence: 90.5,
  topSkills: ["Crop Management", "Soil Science", "Sustainable Farming"],
  averageExperience: "4-6 years",
  description:
    "Agriculture professionals specialize in crop production, livestock management, and sustainable farming practices to enhance productivity.",
  keyResponsibilities: [
    "Monitor and manage crop and soil health",
    "Implement sustainable farming practices",
    "Optimize agricultural techniques for higher yield",
  ],
},

"AUTOMOBILE": {
  totalPDFs: 36,
  averageConfidence: 91.7,
  topSkills: ["Vehicle Maintenance", "Mechanical Engineering", "Diagnostics"],
  averageExperience: "5-7 years",
  description:
    "Automobile professionals ensure the design, maintenance, and efficient operation of vehicles, contributing to the automotive industry's growth.",
  keyResponsibilities: [
    "Diagnose and repair vehicle issues",
    "Design and test automotive systems",
    "Ensure compliance with safety standards",
  ],
},

"BPO": {
  totalPDFs: 22,
  averageConfidence: 89.2,
  topSkills: ["Customer Support", "Process Optimization", "Communication"],
  averageExperience: "2-4 years",
  description:
    "BPO (Business Process Outsourcing) professionals handle outsourced tasks like customer service, technical support, and back-office operations.",
  keyResponsibilities: [
    "Provide customer service and support",
    "Optimize business processes for efficiency",
    "Handle client inquiries and resolve issues",
  ],
},

    };
    

    return detailData[category] || {
      totalPDFs: 0,
      averageConfidence: 0,
      topSkills: [],
      averageExperience: "N/A",
      description: "No detailed information available.",
      keyResponsibilities: []
    };
  };

  const renderClassifications = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Classifications</CardTitle>
          <CardDescription>View resume classification categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classificationData.map((item) => (
              <Drawer key={item.category}>
                <div 
                  className="bg-white border rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-medium">{item.category}</p>
                      <p className="text-sm text-gray-500">{item.count} PDFs trained</p>
                    </div>
                  </div>
                  <DrawerTrigger asChild>
                    <button 
                      className="text-blue-600 hover:bg-blue-50 p-2 rounded-full"
                    >
                      <Info className="h-5 w-5" />
                    </button>
                  </DrawerTrigger>
                </div>
                <DrawerContent>
                  {(() => {
                    const details = getCategoryDetails(item.category);
                    return (
                      <>
                        <DrawerHeader>
                          <DrawerTitle>{item.category} Classification</DrawerTitle>
                          <DrawerDescription>
                            Detailed insights into {item.category} resume classification
                          </DrawerDescription>
                        </DrawerHeader>
                        <div className="grid md:grid-cols-2 gap-6 p-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-4">Training Metrics</h3>
                            <div className="space-y-4">
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-600">Total PDFs Analyzed</p>
                                <p className="text-2xl font-bold text-blue-600">{details.totalPDFs}</p>
                              </div>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-600">Average Classification Confidence</p>
                                <p className="text-2xl font-bold text-green-600">{details.averageConfidence}%</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-4">Category Insights</h3>
                            <div className="space-y-4">
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-600">Top Skills</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {details.topSkills.map(skill => (
                                    <Badge key={skill} variant="secondary">{skill}</Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-600">Average Professional Experience</p>
                                <p className="text-xl font-bold">{details.averageExperience}</p>
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-2">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h3 className="text-lg font-semibold mb-2">Category Description</h3>
                              <p>{details.description}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg mt-4">
                              <h3 className="text-lg font-semibold mb-2">Key Responsibilities</h3>
                              <ul className="list-disc list-inside">
                                {details.keyResponsibilities.map((resp, index) => (
                                  <li key={index} className="text-sm">{resp}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <DrawerFooter>
                          <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </>
                    );
                  })()}
                </DrawerContent>
              </Drawer>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };  
  
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
        return renderClassifications();
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