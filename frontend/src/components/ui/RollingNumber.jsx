import React, { useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useInView, motion } from 'framer-motion';

/**
 * RollingNumber component for smooth, minimalistic numerical animations.
 * @param {string|number} value - The target number (can include suffixes like 'k+')
 * @param {string} className - Additional CSS classes
 */
const RollingNumber = ({ value, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Parse the numerical value and suffix
  const stringValue = String(value);
  const numberPart = parseFloat(stringValue.replace(/[^0-9.]/g, '')) || 0;
  const suffix = stringValue.replace(/[0-9.]/g, '');
  const prefix = stringValue.startsWith('$') ? '$' : '';
  const cleanSuffix = stringValue.startsWith('$') ? suffix.replace('$', '') : suffix;

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numberPart);
    }
  }, [isInView, numberPart, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.floor(latest).toLocaleString()}${cleanSuffix}`;
      }
    });
  }, [springValue, prefix, cleanSuffix]);

  return (
    <span 
      ref={ref} 
      className={className}
    >
      {prefix}0{cleanSuffix}
    </span>
  );
};

export default RollingNumber;
