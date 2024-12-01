import { Upload, FileText, BarChart, Settings } from 'lucide-react';

const QuickActions = ({ setActiveTab, handleUploadClick }) => {
  return (
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
  );
};

export default QuickActions;