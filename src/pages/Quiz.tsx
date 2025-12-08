import { Link } from 'react-router-dom';
import { ProgressBar, LoadingSpinner, ErrorMessage } from '../components/ui';
import { QuizHeader, StartScreen, QuestionCard, Results } from '../components/quiz';
import { useQuestions } from '../hooks/useQuestions';
import { useQuiz } from '../hooks/useQuiz';

const PASSING_PERCENTAGE = 80;

function QuizContent({ questions }: { questions: ReturnType<typeof useQuestions>['questions'] }) {
  const {
    state,
    currentQuestionData,
    startQuiz,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    restartQuiz,
  } = useQuiz(questions);

  return (
    <>
      {state.isStarted && !state.isFinished && (
        <ProgressBar current={state.currentQuestion} total={state.questions.length} />
      )}

      <div className="p-10 px-7">
        {!state.isStarted && (
          <StartScreen
            totalQuestions={state.questions.length}
            passingScore={`${PASSING_PERCENTAGE}%`}
            onStart={startQuiz}
          />
        )}

        {state.isStarted && !state.isFinished && (
          <QuestionCard
            question={currentQuestionData}
            questionNumber={state.currentQuestion + 1}
            userAnswer={state.userAnswers[state.currentQuestion]}
            onSelectAnswer={selectAnswer}
            onNext={nextQuestion}
            onPrevious={previousQuestion}
            showPrevious={state.currentQuestion > 0}
            isLastQuestion={state.currentQuestion === state.questions.length - 1}
          />
        )}

        {state.isFinished && (
          <Results
            score={state.score}
            totalQuestions={state.questions.length}
            passingPercentage={PASSING_PERCENTAGE}
            onRestart={restartQuiz}
          />
        )}
      </div>
    </>
  );
}

export function Quiz() {
  const { questions, isLoading, error } = useQuestions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-mcd-yellow to-mcd-red p-5 flex justify-center items-center font-sans relative">
      <Link
        to="/admin"
        className="absolute top-4 right-4 text-white/70 text-sm font-medium hover:text-white transition-colors duration-200 group"
      >
        Admin
        <span className="block h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
      </Link>
      <div className="bg-white rounded-2xl shadow-2xl max-w-[800px] w-full overflow-hidden">
        <QuizHeader title="McDonald's Food Safety Quiz" subtitle="Leadership Transition Course" />

        {isLoading && (
          <div className="p-10 px-7">
            <LoadingSpinner message="Loading questions..." />
          </div>
        )}

        {error && (
          <div className="p-10 px-7">
            <ErrorMessage message={error} onRetry={() => window.location.reload()} />
          </div>
        )}

        {!isLoading && !error && questions.length > 0 && <QuizContent questions={questions} />}

        {!isLoading && !error && questions.length === 0 && (
          <div className="p-10 px-7">
            <ErrorMessage message="No questions available" />
          </div>
        )}
      </div>
    </div>
  );
}
