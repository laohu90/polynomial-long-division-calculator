import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathViewProps {
  latex: string;
  inline?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ latex, inline = false, className = '' }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(latex, containerRef.current, {
          displayMode: !inline,
          throwOnError: false,
          output: 'html',
        });
      } catch (e) {
        if (containerRef.current) {
          containerRef.current.textContent = latex;
        }
      }
    }
  }, [latex, inline]);

  const Component = inline ? 'span' : 'div';

  return (
    <Component
      ref={containerRef as any}
      className={`math-render ${inline ? 'inline-block' : 'my-2 overflow-x-auto py-1 text-center'} ${className}`}
    >
      {latex}
    </Component>
  );
};
