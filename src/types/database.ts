export interface Database {
  public: {
    Tables: {
      questions: {
        Row: {
          id: number;
          question: string;
          options: string[];
          correct: number;
          explanation: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          question: string;
          options: string[];
          correct: number;
          explanation: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          question?: string;
          options?: string[];
          correct?: number;
          explanation?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type QuestionRow = Database['public']['Tables']['questions']['Row'];
export type QuestionInsert = Database['public']['Tables']['questions']['Insert'];
export type QuestionUpdate = Database['public']['Tables']['questions']['Update'];
