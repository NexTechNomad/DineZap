import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

const HowItWorksSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const steps = [
    {
      title: "Scan the Table QR",
      description:
        "Open your phone's camera and point it at the QRCode sticker on your table. No app download needed, just scan and go!",
      image: "/how-it-works/rafiki.png",
    },
    {
      title: "Build Your Order",
      description:
        'View the full menu with photos and descriptions. Adjust your meal with special requests like "no onions" or "extra spicy"',
      image: "/how-it-works/pana.png",
    },
    {
      title: "Pay Instantly",
      description:
        "Securely pay with your preferred payment method, like paystack or bank transfer. Get instant confirmation and relax while your order is prepared!",
      image: "/how-it-works/cuate.png",
    },
  ];

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

    // Create floating spheres for background animation
    const createSphere = (size: number, position: [number, number, number]) => {
      const geometry = new THREE.SphereGeometry(size, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: 0x6d28d9,
        transparent: true,
        opacity: 0.2,
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(...position);
      return sphere;
    };

    // Add multiple spheres
    const spheres = [
      createSphere(0.8, [-3, 2, -6]),
      createSphere(0.6, [3, -1, -4]),
      createSphere(0.4, [0, 1, -5]),
      createSphere(0.3, [-2, -2, -3]),
    ];
    spheres.forEach((sphere) => scene.add(sphere));

    // Position camera
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate spheres
      spheres.forEach((sphere, i) => {
        sphere.rotation.x += 0.003 * (i + 1);
        sphere.rotation.y += 0.005 * (i + 1);
        sphere.position.y += Math.sin(Date.now() * 0.001 + i) * 0.001;
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
    <section
      id="how-to-use"
      className="py-20 bg-white relative overflow-hidden"
    >
      <div ref={containerRef} className="absolute inset-0 -z-10" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 flex flex-col items-center gap-4"
        >
          <div className="w-32 h-0.5 bg-main-darkPurple/70"></div>
          <h2 className="text-4xl font-medium tracking-[0.2rem]">
            HOW IT WORKS
          </h2>
          <div className="w-32 h-0.5 bg-main-darkPurple/70"></div>
          <p className="text-2xl text-purple-700 font-light tracking-[0.1rem]">
            SEAMLESS DINING IN JUST 3 SIMPLE STEPS.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center"
            >
              <motion.div
                className="mb-8"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-auto max-h-[170px] mx-auto object-contain"
                  loading="lazy"
                />
              </motion.div>

              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
