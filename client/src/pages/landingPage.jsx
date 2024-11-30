import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Upload, FileText, BriefcaseIcon, Code, Calculator } from 'lucide-react';

const LandingPage = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Three.js background animation setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

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
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  const handleGetStarted = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      {/* Three.js container */}
      <div ref={mountRef} className="absolute inset-0" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-6 py-24">
          <nav className="flex justify-between items-center mb-16">
            <div className="text-white text-2xl font-bold">ResumeAI</div>
            <div className="flex gap-6">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                Features
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                About
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                Contact
              </motion.a>
            </div>
          </nav>

          <div className="text-center mt-24">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Smart Resume Classification
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
            >
              Upload your resume and let AI instantly classify your professional profile. Get matched with the perfect career path.
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors duration-300"
            >
              Get Started
            </motion.button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gray-800 bg-opacity-50 p-6 rounded-lg"
            >
              <Upload className="w-12 h-12 text-indigo-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Easy Upload</h3>
              <p className="text-gray-400">Simply drag and drop your resume or click to upload</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gray-800 bg-opacity-50 p-6 rounded-lg"
            >
              <FileText className="w-12 h-12 text-indigo-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Smart Analysis</h3>
              <p className="text-gray-400">Advanced AI analyzes your skills and experience</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-gray-800 bg-opacity-50 p-6 rounded-lg"
            >
              <BriefcaseIcon className="w-12 h-12 text-indigo-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Career Match</h3>
              <p className="text-gray-400">Get matched with your ideal career path</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;