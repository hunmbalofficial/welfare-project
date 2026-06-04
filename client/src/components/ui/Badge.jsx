const variantStyles = {
  success: 'bg-primary-100 text-primary-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-primary-100 text-primary-700',
  neutral: 'bg-gray-100 text-gray-700',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

function Badge({ children, variant = 'neutral', size = 'md' }) {
  return (
    <span
      className={`
        inline-flex items-center rounded-full font-medium
        ${variantStyles[variant]}
        ${sizeStyles[size]}
      `}
    >
      {children}
    </span>
  );
}

export default Badge;
