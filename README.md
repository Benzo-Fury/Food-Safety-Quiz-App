# McDonald's Food Safety Quiz

A web-based training tool designed to help McDonald's managers and shift leaders practise and reinforce their food safety knowledge. The quiz covers critical topics from the Food Safety Rationale document used in the Leadership Transition Course.

## Purpose

Food safety is essential in restaurant operations. This quiz helps managers:

- Test their knowledge of food safety procedures and standards
- Practise answering questions in a low-pressure environment before official assessments
- Review explanations for each answer to reinforce learning
- Track their readiness with a pass/fail score (80% required to pass)

## How It Works

1. **Random Question Selection**: Each quiz session randomly selects 20 questions from the question bank, ensuring variety across multiple attempts
2. **Shuffled Answers**: Answer options are randomised each time to prevent pattern memorisation
3. **Immediate Feedback**: After selecting an answer, users see whether they were correct along with a detailed explanation
4. **Progress Tracking**: A progress bar shows how far through the quiz the user is
5. **Results Summary**: At the end, users see their score and whether they passed or need more practice

## Topics Covered

- Temperature control for refrigerated and frozen products
- Cooking temperatures for various menu items (eggs, beef, chicken)
- Personal hygiene and illness policies
- Equipment calibration and maintenance
- Cross-contamination prevention
- Daily food safety procedures
- Health inspection protocols

## Admin Dashboard

Authorised administrators can manage the question bank through a secure dashboard:

- Add new questions
- Edit existing questions and answers
- Remove outdated questions
- All changes are reflected immediately in the quiz

## Technical Details

Built with:
- React + TypeScript
- Tailwind CSS
- Supabase (database and authentication)
- Vite (build tool)

Deployed as a static site to GitHub Pages with automatic deployments on push to main.
