import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className, title }) => {
  return (
    <div className={`glass-card rounded-2xl p-4 ${className}`}>
      {title && <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">{title}</h3>}
      {children}
    </div>
  );
};

export default GlassCard;
