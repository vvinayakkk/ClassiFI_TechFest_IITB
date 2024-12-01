import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Upload, FileText, BriefcaseIcon } from 'lucide-react';

const LandingPage = () => {
  const mountRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Three.js background animation setup
    const currentMount = mountRef.current; // Store ref value
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    currentMount.appendChild(renderer.domElement);

    // Create animated particles
    const geometry = new THREE.BufferGeometry();
    const particles = 2000;
    const positions = new Float32Array(particles * 3);

    for (let i = 0; i < particles * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      size: 0.02,
      color: '#4F46E5'
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      points.rotation.x += 0.001;
      points.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      currentMount.removeChild(renderer.domElement); // Use stored ref value
    };
  }, []);

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Three.js container */}
      <div ref={mountRef} className="absolute inset-0 opacity-50" />

      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <nav className="flex flex-col sm:flex-row justify-between items-center mb-12 md:mb-16">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-4 sm:mb-0">
              ResumeAI
            </div>
            <div className="flex gap-8">
              {['Features', 'About', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  whileHover={{ scale: 1.05 }}
                  className="text-gray-300 hover:text-white cursor-pointer text-sm md:text-base font-medium transition-colors duration-200"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </nav>

          <div className="text-center max-w-4xl mx-auto mt-16 md:mt-24 px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Smart Resume Classification
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed"
            >
              Upload your resume and let AI instantly classify your professional profile.
              Get matched with the perfect career path.
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-24 px-4">
            {[
              {
                icon: <Upload className="w-12 h-12 text-blue-400" />,
                title: "Easy Upload",
                description: "Simply drag and drop your resume or click to upload"
              },
              {
                icon: <FileText className="w-12 h-12 text-indigo-400" />,
                title: "Smart Analysis",
                description: "Advanced AI analyzes your skills and experience"
              },
              {
                icon: <BriefcaseIcon className="w-12 h-12 text-purple-400" />,
                title: "Career Match",
                description: "Get matched with your ideal career path"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl hover:bg-gray-800/60 transition-all duration-300 border border-gray-700/50"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;