import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL || ''
const key = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const isConfigured = !!(url && key && url.startsWith('https://') && !url.includes('xxxxxxxxxxxx'))

// createClient throws if url is empty — use placeholder when not configured
export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  key || 'placeholder-key'
)
