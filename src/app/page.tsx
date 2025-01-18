import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

const FIELD_NAMES = {
  CURRENT_PARTICIPANTS: 'current_participants',
  MAX_PARTICIPANTS: 'max_participants',
}

export default function Home() {
  async function updateEvent(formData: FormData) {
    'use server'

    const rawFormData = {
      max_participants: Number(formData.get(FIELD_NAMES.CURRENT_PARTICIPANTS)),
      current_participants: Number(formData.get(FIELD_NAMES.MAX_PARTICIPANTS)),
      id: 1,
    }
  }

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <form action={updateEvent} method='patch'>
        <input
          name={FIELD_NAMES.CURRENT_PARTICIPANTS}
          type='number'
          placeholder='Number of current participants'
        />
        <input
          name={FIELD_NAMES.MAX_PARTICIPANTS}
          type='number'
          placeholder='Maximum number of participants'
        />
        <button type='submit'>Update</button>
      </form>
    </div>
  )
}
