import { twMerge } from 'tailwind-merge';

export const Card = ({ children, className }) => {
  return (
    <div className={twMerge("bg-white rounded-xl shadow-lg border border-gray-100 p-6 transition-all hover:shadow-xl", className)}>
      {children}
    </div>
  );
};

export const CardHeader = ({ title, subtitle }) => (
  <div className="mb-6">
    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
    {subtitle && <p className="text-sm text-gray-500 font-medium mt-1">{subtitle}</p>}
  </div>
);