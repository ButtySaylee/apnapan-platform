import React, { useRef, useEffect, useState, createContext, useContext } from 'react';

// ============================================================
// INTERSECTION OBSERVER CONTEXT
// ============================================================
const ScrollContext = createContext();

export function ScrollProvider({ children, threshold = 0.1 }) {
  const [visibleElements, setVisibleElements] = useState(new Set());

  const register = (id, ref) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(id));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  };

  return (
    <ScrollContext.Provider value={{ visibleElements, register }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollReveal(id) {
  const { visibleElements } = useContext(ScrollContext);
  return visibleElements.has(id);
}

// ============================================================
// SCROLL REVEAL COMPONENT
// ============================================================
export function ScrollReveal({
  children,
  className = '',
  animation = 'reveal-up',
  delay = 0,
  duration = 0.8,
  distance = 40,
  once = true,
  style = {},
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const getAnimationStyle = () => {
    if (!isVisible) {
      return {
        opacity: 0,
        transform: animation.includes('left')
          ? `translateX(-${distance}px)`
          : animation.includes('right')
          ? `translateX(${distance}px)`
          : animation.includes('scale')
          ? `scale(0.9)`
          : `translateY(${distance}px)`,
      };
    }
    return {
      opacity: 1,
      transform: 'translateY(0) translateX(0) scale(1)',
      transition: `all ${duration}s cubic-bezier(0.2, 0, 0, 1) ${delay}s`,
    };
  };

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? 'is-visible' : 'is-hidden'}`}
      style={{
        willChange: 'transform, opacity',
        ...getAnimationStyle(),
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

// ============================================================
// STAGGERED CHILDREN CONTAINER
// ============================================================
export function StaggerGroup({ children, className = '', staggerDelay = 0.1, baseDelay = 0, ...props }) {
  const childrenArray = React.Children.toArray(children);
  return (
    <div className={className} {...props}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className="stagger-item"
          style={{
            '--stagger-index': index,
            '--stagger-delay': `${baseDelay + index * staggerDelay}s`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}