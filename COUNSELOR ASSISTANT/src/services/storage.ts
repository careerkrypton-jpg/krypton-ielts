import { StudentProfile, UserTestAttempt } from '../types/ielts';

const PROFILE_KEY = 'krypton_ielts_student_profile';
const ATTEMPTS_KEY = 'krypton_ielts_test_attempts';
const HIGHLIGHTS_KEY = 'krypton_ielts_user_highlights';

export const DEFAULT_STUDENT: StudentProfile = {
  name: 'Vibe Coder',
  email: 'vibecoder@krypton.edu.np',
  candidateNumber: 'NP-KTM-084219',
  targetBand: 7.5,
  preferredCountry: 'UK',
  consultancyLocation: 'Putalisadak (Opposite to Shankar Dev Campus), Kathmandu, Nepal',
  primaryInstructor: {
    name: 'Kushal Adhikari',
    role: 'Head IELTS Instructor & Examiner Mentor',
    phone: '9706462842',
    email: 'kushaadhikari566@gmail.com',
  },
  secondaryInstructor: {
    name: 'Nirmal Thapa',
    role: 'Senior IELTS Speaking & Writing Specialist',
    phone: '01-5313111',
    email: 'nirmalthapa0458@gmail.com',
  },
  examDate: '2026-11-20',
};

export function getStoredProfile(): StudentProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return DEFAULT_STUDENT;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STUDENT, ...parsed };
  } catch {
    return DEFAULT_STUDENT;
  }
}

export function saveStoredProfile(profile: StudentProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile:', e);
  }
}

export function getStoredAttempts(): UserTestAttempt[] {
  try {
    const raw = localStorage.getItem(ATTEMPTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveTestAttempt(attempt: UserTestAttempt): void {
  try {
    const attempts = getStoredAttempts();
    const existingIndex = attempts.findIndex(a => a.id === attempt.id);
    if (existingIndex >= 0) {
      attempts[existingIndex] = attempt;
    } else {
      attempts.unshift(attempt);
    }
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
  } catch (e) {
    console.error('Failed to save test attempt:', e);
  }
}
