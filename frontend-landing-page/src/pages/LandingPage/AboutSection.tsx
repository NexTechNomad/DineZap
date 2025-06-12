import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    rendererRef.current = new THREE.WebGLRenderer({ alpha: true });

    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;

    // Set up renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point light
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create floating cubes instead of spheres for variety
    const createCube = (size: number, position: [number, number, number]) => {
      const geometry = new THREE.BoxGeometry(size, size, size);
      const material = new THREE.MeshPhongMaterial({
        color: 0x6d28d9,
        transparent: true,
        opacity: 0.2,
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(...position);
      return cube;
    };

    // Add multiple cubes
    const cubes = [
      createCube(1, [-3, 2, -6]),
      createCube(0.8, [3, -1, -4]),
      createCube(0.6, [0, 1, -5]),
      createCube(0.4, [-2, -2, -3]),
    ];
    cubes.forEach((cube) => scene.add(cube));

    // Position camera
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate cubes
      cubes.forEach((cube, i) => {
        cube.rotation.x += 0.005 * (i + 1);
        cube.rotation.y += 0.007 * (i + 1);
        cube.position.y += Math.sin(Date.now() * 0.001 + i) * 0.001;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 -z-10" />
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-start space-y-2"
            >
              <div className="w-32 h-0.5 bg-main-darkPurple/70"></div>
              <h3 className="text-lg font-medium tracking-wider text-gray-900 tracking-[0.1rem]">
                ABOUT US
              </h3>
              <div className="w-32 h-0.5 bg-main-darkPurple/70"></div>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-3xl md:text-4xl font-bold text-gray-900"
            >
              <span className="text-main-darkPurple">
                Built for modern dining.
              </span>{" "}
              <span className="text-main-darkPurple">
                Designed for efficiency.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-main-slateGray text-lg leading-relaxed"
            >
              DineZap is a web-based solution that empowers restaurants to offer
              fast, convenient, and contactless service. Our platform eliminates
              the need for printed menus, waitstaff order-taking, and manual
              payments, replacing them with a smart, mobile-first experience.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-main-slateGray text-lg leading-relaxed"
            >
              With no app downloads required, guests can simply scan a QRCode at
              their table to view the menu, place orders, and pay instantly.
              Behind the scenes, your staff receives real-time orders, reducing
              delays and boosting table turnover. Whether you run a cozy café or
              a high-volume restaurant, DineZap streamlines your operations and
              enhances every guest interaction.
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.img
              initial={{ y: 0 }}
              animate={{ y: [-10, 10, -10] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              src="/about/about.png"
              loading="lazy"
              alt="Modern restaurant interior"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
