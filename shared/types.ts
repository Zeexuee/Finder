import { UserRole, TransactionItemType, TransactionStatus, AIPromptType } from "./enums";

// User
export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  createdAt: Date;
}

// Thesis Title
export interface ThesisTitle {
  id: string;
  title: string;
  fieldOfStudy: string;
  keywords: string[];
  method: string;
  abstractSummary: string;
  embedding?: number[];
  createdAt: Date;
}

// Reference
export interface Reference {
  id: string;
  title: string;
  authors: string;
  year: number;
  source: string;
  doi?: string;
  fieldOfStudy: string;
}

// Thesis Reference (Join table)
export interface ThesisReference {
  thesisId: string;
  referenceId: string;
}

// Dataset
export interface Dataset {
  id: string;
  name: string;
  description: string;
  fieldOfStudy: string;
  fileUrl: string;
  price: number;
  isPaid: boolean;
  createdAt: Date;
}

// Transaction
export interface Transaction {
  id: string;
  userId: string;
  itemType: TransactionItemType;
  itemId: string;
  amount: number;
  status: TransactionStatus;
  midtransOrderId?: string;
  createdAt: Date;
}

// AI Log
export interface AILog {
  id: string;
  userId?: string;
  promptType: AIPromptType;
  input: string;
  output: string;
  createdAt: Date;
}

// API Response
export interface APIResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Search Result
export interface SearchResult {
  theses: ThesisTitle[];
  total: number;
  suggestedMethod?: string;
  suggestedMethodReason?: string;
}

// Title Generation Result
export interface TitleGenerationResult {
  titles: string[];
  methodology: string;
  explanation: string;
}

// Outline Generation Result
export interface OutlineGenerationResult {
  outline: {
    backgroundIntroduction: string;
    problemStatement: string;
    researchObjectives: string;
    expectedBenefits: string;
  };
}
