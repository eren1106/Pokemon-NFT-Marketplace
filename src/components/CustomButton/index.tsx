import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';

interface ICustomButtonProps {
  text: string,
  onClick(): void,
  loading?: boolean,
  padding?: string,
  width?: number,
  height?: number,
  backgroundColor?: string,
  color?: string,
  hoverBackgroundColor?: string,
  borderRadius?: number,
  fontSize?: string,
  fontWeight?: string,
}

// when condition is true, first element will show up, second will not visible and etc.
// can also be use to show and hide an element according to the condition, the second element will not be used
const CustomButton: React.FunctionComponent<ICustomButtonProps> = ({
  text,
  onClick,
  loading,
  padding,
  width,
  height,
  backgroundColor,
  color,
  borderRadius,
  fontSize,
  fontWeight,
}) => {
  const style = {
    padding: padding || '12px 15px',
    width: width ? `${width}px` : 'fit-content',
    height: height ? `${height}px` : 'auto',
    color: color || 'white',
    backgroundColor: backgroundColor || 'var(--orange)',
    transition: 'all 0.3s ease-in-out',
    cursor: 'pointer',
    borderRadius: borderRadius ? `${borderRadius}px` : '10px',
    fontSize: fontSize || '18px',
    fontWeight: fontWeight || 'bold',
  }
  const hoverStyle = {
    ...style,
    backgroundColor: backgroundColor || 'var(--hover-orange)',
  }
  const [buttonStyle, setButtonStyle] = useState(style);
  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      onMouseOver={() => setButtonStyle(hoverStyle)}
      onMouseOut={() => setButtonStyle(style)}
    >
      {loading ? <CircularProgress size={25} thickness={6} /> : text}
    </button>
  );
};

export default CustomButton;
