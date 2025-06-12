import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

export default function HeroSection() {
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

    // Create floating spheres
    const createSphere = (
      radius: number,
      position: [number, number, number]
    ) => {
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: 0x6d28d9,
        transparent: true,
        opacity: 0.3,
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(...position);
      return sphere;
    };

    // Add multiple spheres
    const spheres = [
      createSphere(1, [-2, 0, -5]),
      createSphere(0.5, [2, 1, -3]),
      createSphere(0.7, [0, -1, -4]),
    ];
    spheres.forEach((sphere) => scene.add(sphere));

    // Position camera
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate spheres
      spheres.forEach((sphere, i) => {
        sphere.rotation.x += 0.01 * (i + 1);
        sphere.rotation.y += 0.01 * (i + 1);
        sphere.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
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
    <section className="mt-16 md:mt-20 relative min-h-[90vh] w-full overflow-hidden bg-white px-4 py-8 md:py-12 md:px-8 lg:px-12">
      <div ref={containerRef} className="absolute inset-0 -z-10" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-2">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-4 md:gap-6 text-center lg:text-left"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-main-darkPurple"
          >
            Scan. Order. Pay.
            <br />
            Done.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg text-muted-foreground text-main-slateGray max-w-2xl mx-auto lg:mx-0"
          >
            Revolutionize dining with contactless table service. Let customers
            scan a QR code, browse your menu, place orders, and pay—all from
            their phones. No downloads. No waiting.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <Button
              size="lg"
              className="bg-main-darkPurple hover:bg-main-darkPurple/70 text-sm md:text-base"
            >
              Try a Live Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-none hover:bg-white text-sm md:text-base"
            >
              How It Works
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-2 h-4 w-4 md:h-5 md:w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </Button>
          </motion.div>
          {/* Customer Review */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-4 flex items-center gap-3 justify-center lg:justify-start"
          >
            <div className="flex -space-x-2">
              <motion.img
                whileHover={{ scale: 1.1 }}
                className="h-6 w-6 md:h-8 md:w-8 rounded-full ring-2 ring-background"
                src="/avatars/avatar-1.jpg"
                loading="lazy"
                alt="Customer 1"
              />
              <motion.img
                whileHover={{ scale: 1.1 }}
                className="h-6 w-6 md:h-8 md:w-8 rounded-full ring-2 ring-background"
                src="/avatars/avatar-2.jpg"
                loading="lazy"
                alt="Customer 2"
              />
              <motion.img
                whileHover={{ scale: 1.1 }}
                className="h-6 w-6 md:h-8 md:w-8 rounded-full ring-2 ring-background"
                src="/avatars/avatar-3.jpg"
                loading="lazy"
                alt="Customer 3"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-medium text-sm md:text-base">
                Customer Review
              </span>
              <div className="flex items-center gap-1">
                <span className="text-xs md:text-sm text-muted-foreground">
                  4.8
                </span>
                <motion.svg
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-3 w-3 md:h-4 md:w-4 text-yellow-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </motion.svg>
                <span className="text-xs md:text-sm text-muted-foreground">
                  (1.2k reviews)
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Content - Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-square w-full max-w-lg mx-auto lg:max-w-2xl justify-self-center lg:justify-self-end"
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-full"
          >
            <img
              src="/assets/hero-img.png"
              loading="lazy"
              alt="Happy customer enjoying pizza with various food items"
              className="h-full w-full object-contain"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Support Logos */}
      {/* Support Logos */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mx-auto mt-12 md:mt-16 max-w-7xl"
      >
        <p className="mb-6 md:mb-8 text-center text-sm md:text-base font-medium uppercase text-muted-foreground text-main-slateGray">
          Trusted By Leading Brands
        </p>
        <div className="relative overflow-hidden w-full">
          <motion.div
            className="flex items-center gap-8 md:gap-12 grayscale py-6 md:py-8 px-4"
            animate={{
              x: ["-50%", "0%"],
            }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                repeatType: "mirror",
              },
            }}
          >
            {/* Double the logos for seamless loop */}
            {[...Array(2)].map((_, set) => (
              <div
                key={set}
                className="flex items-center gap-8 md:gap-12 shrink-0"
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.img
                    key={`${set}-${i}`}
                    whileHover={{ scale: 1.1, filter: "grayscale(0)" }}
                    src={`/partners/partner-${i}.png`}
                    loading="lazy"
                    alt={`Partner ${i} Logo`}
                    className="h-6 w-20 md:h-8 md:w-24 lg:h-12 lg:w-32 object-contain transition-all duration-300"
                  />
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
