import type { SupabaseClient } from '@supabase/supabase-js';
export function removeNewAccount(client: SupabaseClient, userId: string): Promise<boolean>;
