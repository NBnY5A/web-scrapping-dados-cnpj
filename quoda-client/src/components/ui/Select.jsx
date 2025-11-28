import { twMerge } from 'tailwind-merge';

export const Select = ({ options = [], value, onChange, placeholder = 'Selecione...', className, ...props }) => {
  const baseStyle = "px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";

  return (
    <select 
      value={value} 
      onChange={onChange}
      className={twMerge(baseStyle, className)} 
      {...props}
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};