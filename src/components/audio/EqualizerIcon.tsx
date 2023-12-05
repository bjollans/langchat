import React, { useEffect } from 'react';

interface EqualizerIconProps {
  isAnimated: boolean;
  onClick: () => void;
}

export default function EqualizerIcon(props: EqualizerIconProps) {
  useEffect(() => {
    if (props.isAnimated) {
      // Define the keyframes as a string
      const keyframes = `
      @keyframes equalize {
        0%, 100% {
          transform: scaleY(1);
        }
        50% {
          transform: scaleY(2);
        }
      }`;

      // Create a style component for the animation
      const styleSheet = document.createElement("style");
      styleSheet.type = "text/css";
      styleSheet.innerText = keyframes;
      document.head.appendChild(styleSheet);

      // Cleanup the style tag on component unmount
      return () => {
        document.head.removeChild(styleSheet);
      };
    }
  }, [props.isAnimated]);

  // Styles for the equalizer bars
  const barStyle = (delay) => ({
    display: 'inline-block',
    width: '3px',
    height: props.isAnimated ? '15px' : `${(30 + (delay * 50))/2}px`, // Assign different heights when not animated
    backgroundColor: '#059669',
    margin: '0 1px',
    animation: props.isAnimated ? 'equalize 0.6s infinite alternate' : 'none',
    animationDelay: props.isAnimated ? `${delay}s` : '0s',
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center' }} onClick={props.onClick}>
      <div style={barStyle(0)}></div>
      <div style={barStyle(0.2)}></div>
      <div style={barStyle(0.4)}></div>
    </div>
  );
};
