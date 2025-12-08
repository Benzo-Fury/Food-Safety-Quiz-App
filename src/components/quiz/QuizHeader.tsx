interface QuizHeaderProps {
  title: string;
  subtitle: string;
}

export function QuizHeader({ title, subtitle }: QuizHeaderProps) {
  return (
    <div className="bg-mcd-red text-white p-7 text-center">
      <h1 className="text-2xl md:text-3xl mb-2.5">{title}</h1>
      <p className="opacity-90 text-sm">{subtitle}</p>
    </div>
  );
}
