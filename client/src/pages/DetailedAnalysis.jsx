import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  GraduationCap, 
  Briefcase, 
  FolderGit2, 
  Trophy, 
  Cpu, 
  Loader2, 
  MapPin,
  Mail,
  Phone,
  Link
} from 'lucide-react';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const processingSteps = [
  "Extracting document text",
  "Parsing resume structure",
  "Identifying key information sections",
  "Analyzing professional experience",
  "Extracting skills and technologies",
  "Generating comprehensive report"
];

const DetailedAnalysis = () => {
  const { uploadId } = useParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState(null);
  const [skills, setSkills] = useState(null);

  useEffect(() => {
    const stepInterval = loading ? setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < processingSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          return prev;
        }
      });
    }, 1500) : null;

    return () => {
      if (stepInterval) clearInterval(stepInterval);
    };
  }, [loading]);

  useEffect(() => {
    const performAnalysis = async () => {
      try {
        const file = window.uploadedFiles?.get(Number(uploadId));
        if (!file) {
          throw new Error('File not found');
        }

        const formData = new FormData();
        formData.append('resume', file);

        const [analysisResponse, skillsResponse] = await Promise.all([
          fetch(`${SERVER_URL}/api/resume-analyze/`, {
            method: 'POST',
            body: formData
          }),
          fetch(`${SERVER_URL}/api/get-skills/`, {
            method: 'POST',
            body: formData
          })
        ]);

        if (!analysisResponse.ok || !skillsResponse.ok) {
          throw new Error('Analysis failed');
        }

        const [analysisData, skillsData] = await Promise.all([
          analysisResponse.json(),
          skillsResponse.json()
        ]);

        setAnalysis(analysisData);
        setSkills(skillsData.skills);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    performAnalysis();
  }, [uploadId]);

  const Section = ({ title, icon, children, className = "" }) => (
    <div className={`bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 mb-6 border border-gray-200/50 hover:shadow-3xl transition-all duration-300 ${className}`}>
      <div className="flex items-center mb-4 space-x-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-md">{icon}</div>
        <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">{title}</h2>
      </div>
      {children}
    </div>
  );

  const LoadingSpinner = () => (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="animate-pulse mb-8">
        <Loader2 className="w-24 h-24 text-blue-500 animate-spin" />
      </div>
      <div className="text-center max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 tracking-tight">Analyzing Resume</h2>
        <div className="text-xl text-gray-600 mb-6 min-h-[50px]">
          {processingSteps[loadingStep]}
        </div>
        <div className="flex justify-center space-x-2">
          {processingSteps.map((_, index) => (
            <div 
              key={index} 
              className={`h-2 rounded-full transition-all duration-300 ${
                index === loadingStep 
                  ? 'bg-blue-600 w-6' 
                  : 'bg-gray-300 w-2'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );

  const SkillTag = ({ skill }) => (
    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 m-1 hover:bg-blue-200 transition-colors shadow-sm">
      {skill}
    </span>
  );

  const ContactItem = ({ icon, children }) => (
    <div className="flex items-center space-x-3 text-gray-700">
      {icon}
      <span className="text-base">{children}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {loading && <LoadingSpinner />}
      
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 shadow-md">
            {error}
          </div>
        )}

        {analysis && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Section 
                title="Personal Information" 
                icon={<User className="w-6 h-6 text-blue-500" />}
                className="md:col-span-2"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ContactItem icon={<User className="w-5 h-5 text-gray-500" />}>
                    {analysis.personal_info.full_name}
                  </ContactItem>
                  <ContactItem icon={<Mail className="w-5 h-5 text-gray-500" />}>
                    {analysis.personal_info.email}
                  </ContactItem>
                  <ContactItem icon={<Phone className="w-5 h-5 text-gray-500" />}>
                    {analysis.personal_info.phone}
                  </ContactItem>
                  {analysis.personal_info.linkedin && (
                    <ContactItem icon={<Link className="w-5 h-5 text-gray-500" />}>
                      {analysis.personal_info.linkedin}
                    </ContactItem>
                  )}
                </div>
              </Section>

              {skills && skills.length > 0 && (
                <Section 
                  title="Skills" 
                  icon={<Cpu className="w-6 h-6 text-indigo-500" />}
                  className="md:col-span-2"
                >
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <SkillTag key={index} skill={skill} />
                    ))}
                  </div>
                </Section>
              )}

              <Section 
                title="Education" 
                icon={<GraduationCap className="w-6 h-6 text-green-500" />}
                className="md:col-span-2"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  {analysis.education.map((edu, index) => (
                    <div 
                      key={index} 
                      className="p-4 rounded-lg bg-gray-50/70 hover:bg-gray-100 transition-colors border border-gray-200/50 shadow-sm"
                    >
                      <h3 className="font-bold text-lg mb-1">{edu.institution}</h3>
                      <div className="text-gray-600">
                        {edu.degree} {edu.major ? `- ${edu.major}` : ''}
                        {edu.graduation_year && <span className="ml-2 text-sm">({edu.graduation_year})</span>}
                      </div>
                      {edu.honors && <div className="text-gray-600 mt-1 text-sm">Honors: {edu.honors}</div>}
                    </div>
                  ))}
                </div>
              </Section>

              <Section 
                title="Experience" 
                icon={<Briefcase className="w-6 h-6 text-purple-500" />} 
                className="md:col-span-2"
              >
                {analysis.experience.map((exp, index) => (
                  <div 
                    key={index} 
                    className="mb-6 last:mb-0 p-4 rounded-lg bg-gray-50/70 hover:bg-gray-100 transition-colors border border-gray-200/50 shadow-sm"
                  >
                    <h3 className="font-bold text-xl mb-1">{exp.position} at {exp.company}</h3>
                    <div className="text-gray-600 mb-2">
                      {exp.start_date} {exp.end_date ? `- ${exp.end_date}` : 'Present'}
                    </div>
                    <ul className="list-disc list-inside text-gray-700">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="mb-1">{resp}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Section>

              <Section 
                title="Projects" 
                icon={<FolderGit2 className="w-6 h-6 text-orange-500" />} 
                className="md:col-span-2"
              >
                {analysis.projects.map((project, index) => (
                  <div 
                    key={index} 
                    className="mb-6 last:mb-0 p-4 rounded-lg bg-gray-50/70 hover:bg-gray-100 transition-colors border border-gray-200/50 shadow-sm"
                  >
                    <h3 className="font-bold text-xl mb-1">{project.name}</h3>
                    <p className="text-gray-600 mb-2">{project.description}</p>
                    {project.technologies && (
                      <div className="mt-2">
                        <span className="font-semibold text-gray-700">Technologies: </span>
                        <span className="text-gray-600">
                          {project.technologies.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </Section>

              <Section 
                title="Achievements" 
                icon={<Trophy className="w-6 h-6 text-yellow-500" />} 
                className="md:col-span-2"
              >
                {analysis.achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className="mb-6 last:mb-0 p-4 rounded-lg bg-gray-50/70 hover:bg-gray-100 transition-colors border border-gray-200/50 shadow-sm"
                  >
                    <h3 className="font-bold text-xl mb-1">{achievement.title}</h3>
                    <p className="text-gray-600">{achievement.description}</p>
                    {achievement.date && (
                      <div className="text-gray-500 mt-1 text-sm">
                        {achievement.date}
                      </div>
                    )}
                  </div>
                ))}
              </Section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailedAnalysis;