interface OptionProps {
  text: string;
  onClick: () => void;
  state: 'default' | 'selected' | 'correct' | 'incorrect';
  disabled?: boolean;
}

export function Option({ text, onClick, state, disabled = false }: OptionProps) {
  const stateStyles = {
    default: 'bg-gray-50 border-gray-200 hover:bg-white hover:border-mcd-yellow hover:translate-x-1',
    selected: 'bg-amber-50 border-mcd-yellow',
    correct: 'bg-green-50 border-green-500',
    incorrect: 'bg-red-50 border-red-500',
  };

  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`border-2 rounded-xl p-4 px-5 flex items-center gap-3 transition-all duration-200 ${
        disabled ? 'cursor-default' : 'cursor-pointer'
      } ${stateStyles[state]}`}
    >
      <div
        className={`w-5 h-5 border-2 rounded-full shrink-0 relative ${
          state === 'correct'
            ? 'border-green-500'
            : state === 'incorrect'
            ? 'border-red-500'
            : 'border-gray-400'
        }`}
      >
        {(state === 'selected' || state === 'correct' || state === 'incorrect') && (
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ${
              state === 'correct'
                ? 'bg-green-500'
                : state === 'incorrect'
                ? 'bg-red-500'
                : 'bg-mcd-red'
            }`}
          />
        )}
      </div>
      <div className="flex-1 text-gray-800 text-base">{text}</div>
    </div>
  );
}
