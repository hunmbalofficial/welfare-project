const sizeStyles = {
  sm: 'h-6 w-6 border-2',
  md: 'h-10 w-10 border-3',
  lg: 'h-14 w-14 border-4',
};

function Loader({ size = 'md', fullScreen = false, text }) {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`
          ${sizeStyles[size]}
          animate-spin rounded-full border-primary-100 border-t-primary-600
        `}
      />
      {text && (
        <p className="text-sm font-medium text-primary-600">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
        {spinner}
      </div>
    );
  }

  return spinner;
}

export default Loader;
