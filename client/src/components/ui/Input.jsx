function Input({ label, error, type = 'text', icon: Icon, children, ...rest }) {
  const inputStyles = `
    w-full rounded-lg border border-primary-200 bg-white px-4 py-3 text-sm
    text-gray-900 placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400
    disabled:bg-gray-50 disabled:text-gray-500
    ${Icon ? 'pl-10' : ''}
    ${error ? 'border-red-500 focus:ring-red-400 focus:border-red-400' : ''}
  `;

  const renderInput = () => {
    if (type === 'textarea') {
      return <textarea className={inputStyles} rows={4} {...rest} />;
    }
    if (type === 'select') {
      return (
        <select className={inputStyles} {...rest}>
          {children}
        </select>
      );
    }
    return <input type={type} className={inputStyles} {...rest} />;
  };

  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-primary-700">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        {renderInput()}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default Input;
