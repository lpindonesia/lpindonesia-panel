import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const FIELD_NAMES = {
  CURRENT_PARTICIPANTS: 'current_participants',
  MAX_PARTICIPANTS: 'max_participants',
}

export default async function Home() {
  const supabase = await createClient()
  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', 1)
    .single()

  async function updateEventParticipants(formData: FormData) {
    'use server'
    const supabase = await createClient()

    const rawFormData = {
      current_participants: Number(
        formData.get(FIELD_NAMES.CURRENT_PARTICIPANTS)
      ),
      max_participants: Number(formData.get(FIELD_NAMES.MAX_PARTICIPANTS)),
    }

    await supabase.from('events').update(rawFormData).eq('id', 1)

    redirect('/')
  }

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <form action={updateEventParticipants}>
        <label htmlFor={FIELD_NAMES.CURRENT_PARTICIPANTS}>
          Current participants
        </label>
        <input
          name={FIELD_NAMES.CURRENT_PARTICIPANTS}
          type='number'
          placeholder='Number of current participants'
          defaultValue={event?.current_participants ?? 0}
        />
        <label htmlFor={FIELD_NAMES.MAX_PARTICIPANTS}>
          Maximum participants
        </label>
        <input
          name={FIELD_NAMES.MAX_PARTICIPANTS}
          type='number'
          placeholder='Maximum number of participants'
          defaultValue={event?.max_participants ?? 0}
        />
        <button type='submit'>Update</button>
      </form>
    </div>
  )
}
