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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      aid_applications: {
        Row: {
          aid_type: string
          chsi_code: string | null
          created_at: string
          full_name: string
          id: string
          proof_path: string
          region: string
          review_note: string | null
          reviewed_at: string | null
          school: string
          status: string
          user_id: string
        }
        Insert: {
          aid_type: string
          chsi_code?: string | null
          created_at?: string
          full_name: string
          id?: string
          proof_path: string
          region: string
          review_note?: string | null
          reviewed_at?: string | null
          school: string
          status?: string
          user_id: string
        }
        Update: {
          aid_type?: string
          chsi_code?: string | null
          created_at?: string
          full_name?: string
          id?: string
          proof_path?: string
          region?: string
          review_note?: string | null
          reviewed_at?: string | null
          school?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      apple_notification_events: {
        Row: {
          notification_type: string
          notification_uuid: string
          original_transaction_id: string | null
          processed: boolean
          received_at: string
          subtype: string | null
        }
        Insert: {
          notification_type: string
          notification_uuid: string
          original_transaction_id?: string | null
          processed?: boolean
          received_at?: string
          subtype?: string | null
        }
        Update: {
          notification_type?: string
          notification_uuid?: string
          original_transaction_id?: string | null
          processed?: boolean
          received_at?: string
          subtype?: string | null
        }
        Relationships: []
      }
      learning_progress: {
        Row: {
          completed_at: string
          id: string
          item_key: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          id?: string
          item_key: string
          user_id: string
        }
        Update: {
          completed_at?: string
          id?: string
          item_key?: string
          user_id?: string
        }
        Relationships: []
      }
      membership_periods: {
        Row: {
          created_at: string
          environment: string
          id: string
          original_transaction_id: string
          period_end: string
          period_start: string
          revoked: boolean
          user_id: string
        }
        Insert: {
          created_at?: string
          environment?: string
          id?: string
          original_transaction_id: string
          period_end: string
          period_start: string
          revoked?: boolean
          user_id: string
        }
        Update: {
          created_at?: string
          environment?: string
          id?: string
          original_transaction_id?: string
          period_end?: string
          period_start?: string
          revoked?: boolean
          user_id?: string
        }
        Relationships: []
      }
      partner_codes: {
        Row: {
          code: string
          created_at: string
          days: number
          expires_at: string | null
          id: string
          org_name: string
          used_at: string | null
          used_by: string | null
        }
        Insert: {
          code: string
          created_at?: string
          days?: number
          expires_at?: string | null
          id?: string
          org_name: string
          used_at?: string | null
          used_by?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          days?: number
          expires_at?: string | null
          id?: string
          org_name?: string
          used_at?: string | null
          used_by?: string | null
        }
        Relationships: []
      }
      practice_records: {
        Row: {
          created_at: string
          heard: string
          id: string
          main_issue: string | null
          score: number
          target: string
          user_id: string
        }
        Insert: {
          created_at?: string
          heard?: string
          id?: string
          main_issue?: string | null
          score?: number
          target: string
          user_id: string
        }
        Update: {
          created_at?: string
          heard?: string
          id?: string
          main_issue?: string | null
          score?: number
          target?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
        }
        Relationships: []
      }
      referral_codes: {
        Row: {
          code: string
          created_at: string
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string
          user_id?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string
          invitee_id: string
          inviter_id: string
          rewarded_at: string | null
        }
        Insert: {
          created_at?: string
          invitee_id: string
          inviter_id: string
          rewarded_at?: string | null
        }
        Update: {
          created_at?: string
          invitee_id?: string
          inviter_id?: string
          rewarded_at?: string | null
        }
        Relationships: []
      }
      reward_grants: {
        Row: {
          billing_applied_at: string | null
          billing_note: string | null
          created_at: string
          ends_at: string
          id: string
          kind: string
          period_key: string
          starts_at: string
          user_id: string
        }
        Insert: {
          billing_applied_at?: string | null
          billing_note?: string | null
          created_at?: string
          ends_at: string
          id?: string
          kind: string
          period_key: string
          starts_at?: string
          user_id: string
        }
        Update: {
          billing_applied_at?: string | null
          billing_note?: string | null
          created_at?: string
          ends_at?: string
          id?: string
          kind?: string
          period_key?: string
          starts_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reward_point_events: {
        Row: {
          created_at: string
          id: string
          period_key: string
          points: number
          reason: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          period_key: string
          points: number
          reason: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          period_key?: string
          points?: number
          reason?: string
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          environment: string
          id: string
          last_event_at: string | null
          paddle_customer_id: string
          paddle_subscription_id: string
          price_id: string
          product_id: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          environment?: string
          id?: string
          last_event_at?: string | null
          paddle_customer_id: string
          paddle_subscription_id: string
          price_id: string
          product_id: string
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          environment?: string
          id?: string
          last_event_at?: string | null
          paddle_customer_id?: string
          paddle_subscription_id?: string
          price_id?: string
          product_id?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vocab_reviews: {
        Row: {
          box: number
          due_day: number
          updated_at: string
          user_id: string
          word: string
        }
        Insert: {
          box?: number
          due_day: number
          updated_at?: string
          user_id: string
          word: string
        }
        Update: {
          box?: number
          due_day?: number
          updated_at?: string
          user_id?: string
          word?: string
        }
        Relationships: []
      }
      zz_probe: {
        Row: {
          id: number
        }
        Insert: {
          id: number
        }
        Update: {
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_slot_open: { Args: never; Returns: boolean }
      apply_referral_code: { Args: { _code: string }; Returns: string }
      checkin_day_count: {
        Args: { _from: string; _to: string; _uid: string }
        Returns: number
      }
      checkin_days: {
        Args: { _from: string; _to: string }
        Returns: {
          day: string
        }[]
      }
      claim_first_admin: { Args: never; Returns: boolean }
      claim_reward_days: { Args: never; Returns: Json }
      claim_rewards: { Args: never; Returns: string }
      defer_point_grants: { Args: { _uid: string }; Returns: undefined }
      grant_reward_days: {
        Args: { _days: number; _key: string; _kind: string; _uid: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      latest_coverage_segment: {
        Args: { _uid: string }
        Returns: {
          seg_end: string
          seg_start: string
        }[]
      }
      my_referral_info: { Args: never; Returns: Json }
      redeem_partner_code: { Args: { _code: string }; Returns: string }
      redeem_points: { Args: { _days: number }; Returns: Json }
      reward_points_balance: { Args: never; Returns: number }
    }
    Enums: {
      app_role: "admin" | "user"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["admin", "user"],
    },
  },
} as const
