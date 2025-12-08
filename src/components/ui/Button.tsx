interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseStyles =
    'px-7 py-3.5 border-none rounded-xl text-base font-semibold cursor-pointer transition-all duration-200';

  const variantStyles = {
    primary: `bg-mcd-red text-white ${
      disabled
        ? 'bg-gray-300 cursor-not-allowed'
        : 'hover:bg-mcd-red-dark hover:-translate-y-0.5 hover:shadow-lg hover:shadow-mcd-red/30'
    }`,
    secondary: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
