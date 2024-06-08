import React, { useEffect } from 'react';
import { Div } from "linguin-shared/components/RnTwComponents";
import { Platform } from 'react-native';

interface EqualizerIconWebProps {
  isAnimated: boolean;
  onClick: () => void;
}

export default function EqualizerIconWeb(props: EqualizerIconWebProps) {
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
    width: 3,
    height: props.isAnimated ? 15 : `${(30 + (delay * 50)) / 2}px`, // Assign different heights when not animated
    backgroundColor: '#0891b2',
    margin: '0 1px',
    animation: props.isAnimated ? 'equalize 0.6s infinite alternate' : 'none',
    animationDelay: props.isAnimated ? `${delay}s` : '0s',
  });

  return (
    <Div style={{ display: 'flex', alignItems: 'center' }} onClick={props.onClick}>
      <Div style={barStyle(0)}></Div>
      <Div style={barStyle(0.2)}></Div>
      <Div style={barStyle(0.4)}></Div>
    </Div>
  );
};
