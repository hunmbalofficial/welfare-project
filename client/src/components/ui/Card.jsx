function Card({ children, className = '', hover = false, padding = true }) {
  return (
    <div
      className={`
        bg-white rounded-xl border border-primary-100 shadow-sm
        ${padding ? 'p-6' : ''}
        ${hover ? 'card-hover transition-shadow duration-200 hover:shadow-md' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;
