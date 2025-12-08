import type { Question } from '../types/quiz';

export const quizQuestions: Question[] = [
  {
    question: 'When should a corrective action be documented on the Food Safety Daily Checklist?',
    options: [
      'Only when a serious issue occurs',
      'When any reading or check is out of the correct range',
      'At the end of each shift',
      'Only when requested by management',
    ],
    correct: 1,
    explanation:
      'According to the Food Safety Rationale, if any reading or check is out of the correct range, corrective actions must be captured in BrandMate. It is imperative that any discrepancy from the expected range is correctly documented and that the action taken is recorded.',
  },
  {
    question: 'What is the acceptable temperature range for refrigerated products?',
    options: ['0°C to 5°C', '1°C to 5°C', '2°C to 6°C', '1°C to 4°C'],
    correct: 1,
    explanation:
      'All refrigerated products must be maintained between 1°C to 5°C. This temperature range is critical for food safety and must be verified during delivery acceptance and daily checks.',
  },
  {
    question: 'What is the minimum internal temperature for cooked eggs?',
    options: ['69°C', '71°C', '74°C', '77°C'],
    correct: 1,
    explanation:
      'Internal temperatures of all cooked eggs must be at or above 71°C to meet the Food Safety Standard. Additionally, egg yolks should be slightly gelled and not runny to meet the Quality Standard.',
  },
  {
    question: 'How often should clean cloth buckets be changed?',
    options: [
      'Every 2 hours',
      'Every 4 hours (with lid) or 2 hours (without lid)',
      'Every 6 hours',
      'Once per shift',
    ],
    correct: 1,
    explanation:
      'Clean cloth buckets must be changed a minimum of every 4 hours (with a 4 hour secondary timer) or 2 hours without a lid, or whenever the water is no longer clean.',
  },
  {
    question: 'What color gloves must be worn when handling raw shell eggs?',
    options: ['Clear gloves', 'Blue gloves', 'Black gloves', 'No gloves required'],
    correct: 1,
    explanation:
      'Blue gloves must be worn when handling raw shell eggs, raw beef patties, raw sausage patties, raw uncoated chicken fillets, and yellow tweezers. This prevents cross-contamination from raw to cooked products.',
  },
  {
    question: 'What is the pyrometer calibration temperature range?',
    options: ['0°C ± 2°C', '0°C ± 1°C', '1°C ± 1°C', '2°C ± 1°C'],
    correct: 1,
    explanation:
      'When calibrating the pyrometer in ice water, the temperature readout should be 0°C ± 1°C. If outside this range, troubleshoot by adding extra ice or changing the probe.',
  },
  {
    question: 'What is the maximum run size for 10:1 beef patties?',
    options: ['4 patties', '6 patties', '8 patties', '10 patties'],
    correct: 1,
    explanation:
      'When testing 10:1 beef, the food safety run size MUST be 6 patties. Never cook more than a full run of 6 patties for 10:1 meat.',
  },
  {
    question: 'What is the minimum internal temperature for Grilled Chicken fillets?',
    options: ['69°C', '71°C', '74°C', '77°C'],
    correct: 2,
    explanation:
      'Internal temperatures of all Grilled Chicken Fillets must be at or above 74°C. The minimum cook time is 365 seconds for all run sizes.',
  },
  {
    question: 'Where should the ice scoop be kept when not in use?',
    options: [
      'Inside the ice bin',
      'In a designated clean, dry location outside the ice bin',
      'On top of the ice machine',
      'In sanitizer solution',
    ],
    correct: 1,
    explanation:
      'The ice scoop should never be stored inside the ice bin. It must be kept in a designated clean, dry location to prevent contamination.',
  },
  {
    question: 'What is the acceptable freezer air temperature?',
    options: ['At or below -12°C', 'At or below -15°C', 'At or below -18°C', 'At or below -20°C'],
    correct: 2,
    explanation:
      'Freezer air temperature must be at or below -18°C. If temperature is above -18°C, troubleshoot to find the cause and take corrective action.',
  },
  {
    question:
      'Is it acceptable to turn off the walk-in fridge and freezer while accepting a delivery?',
    options: [
      'Yes, to save energy',
      'Yes, if delivery is quick',
      'No, never turn off refrigeration during deliveries',
      'Only for frozen deliveries',
    ],
    correct: 2,
    explanation:
      'Never turn the freezer off when accepting deliveries. Refrigeration units must remain on to maintain proper food safety temperatures.',
  },
  {
    question:
      'Who is required to remove and test 10:1 beef patties during food safety checks?',
    options: [
      'Any crew member',
      'A trained Manager/Shift Manager',
      'The Restaurant Manager only',
      'The delivery driver',
    ],
    correct: 1,
    explanation:
      'Only Managers/Shift Managers who are fully trained and verified on Leadership Transitions can perform food safety checks. One person must remove the patties so the Manager can measure internal temperatures immediately.',
  },
  {
    question: 'What tool must be used to break the yolk of raw eggs?',
    options: ['White Hutzler Spatula', 'Yellow Tweezers', 'Metal spatula', 'Any clean utensil'],
    correct: 1,
    explanation:
      'Yellow Tweezers must be used for raw shell eggs, including breaking yolks. This prevents cross-contamination. White Hutzler Spatula is used only for cooked eggs.',
  },
  {
    question: 'How often must platen integrity stickers above the grill be updated?',
    options: [
      'Once per week',
      'Once per day',
      'During food safety completion',
      'When requested by management',
    ],
    correct: 2,
    explanation:
      'Platen integrity stickers must be updated during food safety completion to identify which products have been verified and can be cooked on each platen.',
  },
  {
    question: 'What is the quality standard temperature range for 10:1 and 4:1 beef?',
    options: ['69°C - 74°C', '69°C - 77.9°C', '71°C - 77°C', '74°C - 80°C'],
    correct: 1,
    explanation:
      'For beef products, the quality standard requires 3 out of 4 temperatures to be between 69.0°C and 77.9°C, with all temperatures at or above 69°C for food safety.',
  },
  {
    question: 'How often must Daily Food Safety be completed?',
    options: ['Once per week', 'Every 24 hours', 'Twice per day', 'Every shift'],
    correct: 1,
    explanation:
      'Daily Food Safety must be completed a minimum of once every 24 hours. All platens and fried products must be verified within this 24-hour period.',
  },
  {
    question: 'What is the minimum internal temperature for Spicy Thigh Chicken Patties?',
    options: ['71°C', '74°C', '84°C', '90°C'],
    correct: 2,
    explanation:
      'Spicy Chicken Thigh Patties must reach a minimum internal temperature of 84°C. Four patties must be tested with the lowest temperature meeting this standard.',
  },
  {
    question: "If you're feeling sick with just a sore throat, should you go to work?",
    options: [
      "Yes, it's just a minor illness",
      'No, stay home to prevent spreading illness',
      'Yes, but wear a mask',
      'Only if the restaurant is short-staffed',
    ],
    correct: 1,
    explanation:
      'Crew members should not work if they are sick, even with minor symptoms like a sore throat. This prevents the spread of illness and maintains food safety standards.',
  },
  {
    question:
      'What department should you contact if you require assistance during a council health inspection visit?',
    options: [
      'Human Resources',
      'Customer Service Department',
      'Operations Department',
      'Workplace Safety',
    ],
    correct: 1,
    explanation:
      'If you require assistance during a health department visit, contact the Customer Service Department. You can also review the Restaurant Council Guide on McD Connect.',
  },
  {
    question: 'Can you wash mop heads and cloths in the same washing machine load?',
    options: [
      'Yes, if using hot water',
      "Yes, if they're both dirty",
      'No, never wash mop heads and cloths together',
      'Only in emergencies',
    ],
    correct: 2,
    explanation:
      'Never wash cloths and mop heads in the same washing machine load. Always wash and store separately. Mop heads must be washed separately from all cloths.',
  },
];
