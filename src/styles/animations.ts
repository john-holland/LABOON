// Animation keyframe definitions (used in CSS)
export const animationKeyframes = {
  colorFlow: `
    @keyframes colorFlow {
      0% {
        color: #FFFFFF;
        text-shadow: 2px 2px 4px #000000;
      }
      100% {
        color: #FFD700;
        text-shadow: 2px 2px 4px #000000;
      }
    }
  `,
  slideIn: `
    @keyframes slideIn {
      0% {
        transform: translateY(100%);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `,
  fadeIn: `
    @keyframes fadeIn {
      0% {
        opacity: 0;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0);
      }
      100% {
        opacity: 1;
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
      }
    }
  `
};

// SVG path definitions for special effects
export const svgPaths = {
  impact: {
    path: 'M0,0 L100,0 L100,100 L0,100 Z',
    viewBox: '0 0 100 100',
  },
  slash: {
    path: 'M0,0 L100,100 M0,100 L100,0',
    viewBox: '0 0 100 100',
  },
  spiral: {
    path: 'M50,50 m-45,0 a45,45 0 1,0 90,0 a45,45 0 1,0 -90,0',
    viewBox: '0 0 100 100',
  },
};

// Animation presets
export const animationPresets = {
  gomuGomu: {
    keyframes: 'colorFlow',
    duration: '0.5s',
    timing: 'ease-in-out',
    iterationCount: 1,
  },
  santoryu: {
    keyframes: 'slideIn',
    duration: '0.3s',
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    iterationCount: 1,
  },
  diableJambe: {
    keyframes: 'fadeIn',
    duration: '0.4s',
    timing: 'ease-out',
    iterationCount: 1,
  },
};

// CSS classes for animations
export const animationClasses = {
  gomuGomu: 'animate-gomu-gomu',
  santoryu: 'animate-santoryu',
  diableJambe: 'animate-diable-jambe',
};

// Utility functions for animation generation
export const generateAnimation = (
  type: keyof typeof animationPresets,
  customDuration?: string
) => {
  const preset = animationPresets[type];
  return {
    animationName: preset.keyframes,
    animationDuration: customDuration || preset.duration,
    animationTimingFunction: preset.timing,
    animationIterationCount: preset.iterationCount,
  };
};

export const generateSVGAnimation = (
  pathType: keyof typeof svgPaths,
  duration: string = '1s'
) => {
  const path = svgPaths[pathType];
  return {
    path: path.path,
    viewBox: path.viewBox,
    animation: `path-animation ${duration} ease-in-out infinite`,
  };
}; 
