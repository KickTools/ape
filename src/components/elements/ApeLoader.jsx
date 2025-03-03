import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Icons from "@/assets/icons";

const BananaProjectile = ({ delay, startPosition }) => {
  const controls = useAnimation();
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false); // Track mount status

  // Set mounted flag after component mounts
  useEffect(() => {
    setMounted(true); // Runs after first render
    return () => setMounted(false); // Cleanup on unmount
  }, []);

  // Physics-based projectile motion with short arc
  useEffect(() => {
    let startTime;
    let animationFrameId;

    const initialVelocity = { x: 10, y: -200 };
    const gravity = 4.5;
    const maxDistance = 200;
    const duration = 1000;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Wait for delay
      if (elapsed < delay) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      if (!isAnimating) setIsAnimating(true);

      const animTime = elapsed - delay;

      if (animTime > duration) {
        startTime = timestamp;
        setIsAnimating(false);
      } else {
        const progress = Math.min(animTime / duration, 1);
        const x = startPosition.x + maxDistance * progress;
        const t = progress * 1.5;
        const verticalPosition = initialVelocity.y * t + 0.5 * gravity * 60 * t * t;
        const y = startPosition.y + verticalPosition;
        const rotation = 120 * progress;
        const opacity = progress > 0.7 ? 1 - ((progress - 0.7) / 0.3) : 1;

        // Only set controls if mounted
        if (mounted) {
          controls.set({
            x,
            y,
            rotate: rotation,
            opacity: opacity > 0 ? opacity : 0
          });
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [controls, delay, startPosition, mounted]); // Add mounted to dependencies

  return (
    <motion.div
      className="absolute"
      initial={{ x: startPosition.x, y: startPosition.y, opacity: 0 }}
      animate={controls}
    >
      <Icons.Banana size="2xl" className="text-yellow-500" />
    </motion.div>
  );
};

const ApeLoader = () => {
  const startPosition = { x: 40, y: -20 };

  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      {/* Ape Icon */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
      >
        <Icons.Ape size="7xl" className="text-apeRed scale-x-[-1]" />
      </motion.div>

      {/* Physics-based Banana Animation */}
      {[0, 700, 1400].map((delay, i) => (
        <BananaProjectile
          key={i}
          delay={delay}
          startPosition={startPosition}
        />
      ))}
    </div>
  );
};

export default ApeLoader;