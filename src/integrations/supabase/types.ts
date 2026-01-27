export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          subject?: string
        }
        Relationships: []
      }
      field_companies: {
        Row: {
          company_name: string
          created_at: string
          field_id: string
          id: string
          jobs_available: number
          logo_url: string | null
        }
        Insert: {
          company_name: string
          created_at?: string
          field_id: string
          id?: string
          jobs_available?: number
          logo_url?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string
          field_id?: string
          id?: string
          jobs_available?: number
          logo_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "field_companies_field_id_fkey"
            columns: ["field_id"]
            isOneToOne: false
            referencedRelation: "fields"
            referencedColumns: ["id"]
          },
        ]
      }
      field_sectors: {
        Row: {
          created_at: string
          field_id: string
          growth_rate: number | null
          id: string
          job_count: number
          sector_name: string
        }
        Insert: {
          created_at?: string
          field_id: string
          growth_rate?: number | null
          id?: string
          job_count?: number
          sector_name: string
        }
        Update: {
          created_at?: string
          field_id?: string
          growth_rate?: number | null
          id?: string
          job_count?: number
          sector_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "field_sectors_field_id_fkey"
            columns: ["field_id"]
            isOneToOne: false
            referencedRelation: "fields"
            referencedColumns: ["id"]
          },
        ]
      }
      field_skills: {
        Row: {
          created_at: string
          field_id: string
          id: string
          importance_level: number
          skill_name: string
        }
        Insert: {
          created_at?: string
          field_id: string
          id?: string
          importance_level?: number
          skill_name: string
        }
        Update: {
          created_at?: string
          field_id?: string
          id?: string
          importance_level?: number
          skill_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "field_skills_field_id_fkey"
            columns: ["field_id"]
            isOneToOne: false
            referencedRelation: "fields"
            referencedColumns: ["id"]
          },
        ]
      }
      fields: {
        Row: {
          avg_salary_entry: number | null
          avg_salary_senior: number | null
          category: Database["public"]["Enums"]["field_category"]
          competition_level: number
          created_at: string
          current_jobs: number
          description: string
          growth_trend: Database["public"]["Enums"]["growth_trend"]
          icon: string | null
          id: string
          name: string
          preparation_duration: string | null
          projected_jobs_5y: number
          total_students: number
          updated_at: string
        }
        Insert: {
          avg_salary_entry?: number | null
          avg_salary_senior?: number | null
          category: Database["public"]["Enums"]["field_category"]
          competition_level?: number
          created_at?: string
          current_jobs?: number
          description: string
          growth_trend?: Database["public"]["Enums"]["growth_trend"]
          icon?: string | null
          id?: string
          name: string
          preparation_duration?: string | null
          projected_jobs_5y?: number
          total_students?: number
          updated_at?: string
        }
        Update: {
          avg_salary_entry?: number | null
          avg_salary_senior?: number | null
          category?: Database["public"]["Enums"]["field_category"]
          competition_level?: number
          created_at?: string
          current_jobs?: number
          description?: string
          growth_trend?: Database["public"]["Enums"]["growth_trend"]
          icon?: string | null
          id?: string
          name?: string
          preparation_duration?: string | null
          projected_jobs_5y?: number
          total_students?: number
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      field_category:
        | "engineering"
        | "medical"
        | "business"
        | "arts"
        | "science"
        | "law"
        | "design"
        | "education"
        | "agriculture"
        | "other"
      growth_trend: "rapidly_growing" | "growing" | "stable" | "declining"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      field_category: [
        "engineering",
        "medical",
        "business",
        "arts",
        "science",
        "law",
        "design",
        "education",
        "agriculture",
        "other",
      ],
      growth_trend: ["rapidly_growing", "growing", "stable", "declining"],
    },
  },
} as const
