import React from 'react';

/**
 * A central Canvas component acting as an empty workspace.
 * Controls the overall max-width, height constraints, and positioning
 * for any content section placed within it, creating a unified layout.
 */
export const Canvas = ({ children, visible = true, className = '' }) => {
  return (
    <div 
      style={{ display: visible ? 'flex' : 'none' }}
      className={`w-full max-w-full h-full min-h-[600px] flex-col ${className}`}
    >
      {children}
    </div>
  );
};

export const CanvasRow = ({ children, className = '' }) => (
  <div className={`flex flex-1 min-h-0 flex-row gap-6 w-full max-md:flex-col ${className}`}>
    {children}
  </div>
);

export const CanvasSidebar = ({ children, className = '' }) => (
  <div className={`flex flex-col flex-none min-h-0 gap-4 w-[260px] max-md:w-full h-full overflow-y-auto custom-scrollbar pr-2 pb-2 ${className}`}>
    {children}
  </div>
);

export const CanvasColumn = ({ children, className = '', scrollable = false }) => (
  <div className={`flex flex-col flex-1 min-w-0 min-h-0 gap-6 w-full max-md:w-full ${scrollable ? 'overflow-y-auto custom-scrollbar pr-2 pb-2' : ''} ${className}`}>
    {children}
  </div>
);
