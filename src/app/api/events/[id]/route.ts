import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request, params: { id: string }) {
  const id = params.id

  const supabase = await createClient()
  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', parseInt(id))
    .single()
  return NextResponse.json({ error: null, data: event })
}
