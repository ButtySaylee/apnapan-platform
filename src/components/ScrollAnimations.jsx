import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Hook to detect when an element comes into view
 */
export function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        // Optional: stop observing after first trigger
        if (options.triggerOnce) {
          observer.unobserve(entry.target);
        }
      }
    }, {
      threshold: options.threshold || 0.2,
      rootMargin: options.rootMargin || '0px',
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isInView];
}

/**
 * Drop animation - elements fall from above with fade-in
 */
export function DropAnimation({ 
  children, 
  delay = 0, 
  duration = 0.8,
  distance = 40,
  ...props 
}) {
  const [ref, isInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -distance }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -distance }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Slide animation - elements slide in from sides
 */
export function SlideAnimation({
  children,
  direction = 'left', // 'left' or 'right'
  delay = 0,
  duration = 0.8,
  distance = 50,
  ...props
}) {
  const [ref, isInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const directionMap = {
    left: { initial: { x: -distance, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    right: { initial: { x: distance, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  };

  return (
    <motion.div
      ref={ref}
      initial={directionMap[direction].initial}
      animate={isInView ? directionMap[direction].animate : directionMap[direction].initial}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scale animation - elements grow from small to normal
 */
export function ScaleAnimation({
  children,
  delay = 0,
  duration = 0.6,
  scale = 0.8,
  ...props
}) {
  const [ref, isInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Rotate animation - elements rotate in while fading
 */
export function RotateAnimation({
  children,
  delay = 0,
  duration = 0.8,
  angle = -15,
  ...props
}) {
  const [ref, isInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotate: angle, y: -20 }}
      animate={isInView ? { opacity: 1, rotate: 0, y: 0 } : { opacity: 0, rotate: angle, y: -20 }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger animation - multiple children appear sequentially
 */
export function StaggerAnimation({
  children,
  delay = 0,
  staggerDelay = 0.1,
  direction = 'up', // 'up', 'down', 'left', 'right'
  distance = 40,
  ...props
}) {
  const [ref, isInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const directionMap = {
    up: { initial: { y: distance, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    down: { initial: { y: -distance, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    left: { initial: { x: distance, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    right: { initial: { x: -distance, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: directionMap[direction].initial,
    visible: directionMap[direction].animate,
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      {...props}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

/**
 * Fade animation - simple fade in/out
 */
export function FadeAnimation({
  children,
  delay = 0,
  duration = 0.6,
  ...props
}) {
  const [ref, isInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration,
        delay,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Blur animation - elements blur out then come into focus
 */
export function BlurAnimation({
  children,
  delay = 0,
  duration = 0.8,
  blurAmount = 10,
  ...props
}) {
  const [ref, isInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: `blur(${blurAmount}px)` }}
      animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: `blur(${blurAmount}px)` }}
      transition={{
        duration,
        delay,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Hover Scale animation component - scales up on hover
 */
export function HoverScaleContainer({ children, scale = 1.05, ...props }) {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parallax scroll effect
 */
export function ParallaxContainer({ children, offset = 50 }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      style={{
        y: scrollY * offset * 0.5,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Number counter animation - counts up from 0
 */
export function CounterAnimation({
  from = 0,
  to = 100,
  duration = 2,
  delay = 0,
  suffix = '',
  prefix = '',
}) {
  const [ref, isInView] = useInView({ triggerOnce: true });
  const nodeRef = useRef(null);

  useEffect(() => {
    if (!isInView || !nodeRef.current) return;

    let animationFrameId;
    const startTime = performance.now();
    const startDelay = delay * 1000;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;

      if (elapsed < startDelay) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min((elapsed - startDelay) / (duration * 1000), 1);
      const current = Math.floor(from + (to - from) * progress);

      if (nodeRef.current) {
        nodeRef.current.textContent = `${prefix}${current}${suffix}`;
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, from, to, duration, delay, suffix, prefix]);

  return <span ref={ref}>{`${prefix}${from}${suffix}`}</span>;
}

export default {
  DropAnimation,
  SlideAnimation,
  ScaleAnimation,
  RotateAnimation,
  StaggerAnimation,
  FadeAnimation,
  BlurAnimation,
  HoverScaleContainer,
  ParallaxContainer,
  CounterAnimation,
  useInView,
};
