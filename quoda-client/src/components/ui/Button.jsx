import { twMerge } from 'tailwind-merge';

export const Button = ({ children, variant = 'contained', className, ...props }) => {
  const baseStyle = "px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-sm active:scale-95";
  
  const variants = {
    contained: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/30",
    outlined: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    text: "text-gray-600 hover:bg-gray-100 hover:text-gray-900 shadow-none"
  };

  return (
    <button className={twMerge(baseStyle, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};