import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const FIELD_NAMES = {
  CURRENT_PARTICIPANTS: 'current_participants',
  MAX_PARTICIPANTS: 'max_participants',
  PASSCODE: 'passcode',
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
    if (formData.get(FIELD_NAMES.PASSCODE) !== process.env.API_KEY) {
      redirect('/')
    }

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
    <div className='flex flex-col items-center justify-center min-h-screen p-8'>
      <form
        action={updateEventParticipants}
        autoComplete='off'
        className='p-6 rounded-lg shadow-md bg-white'
      >
        <h1 className='text-xl font-bold'>{event?.name ?? ''}</h1>
        <div className='mt-6'>
          <label
            htmlFor={FIELD_NAMES.CURRENT_PARTICIPANTS}
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            Current participants
          </label>
          <input
            name={FIELD_NAMES.CURRENT_PARTICIPANTS}
            type='number'
            placeholder='Number of current participants'
            defaultValue={event?.current_participants ?? 0}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mt-4'>
          <label
            htmlFor={FIELD_NAMES.MAX_PARTICIPANTS}
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            Maximum participants
          </label>
          <input
            name={FIELD_NAMES.MAX_PARTICIPANTS}
            type='number'
            placeholder='Maximum number of participants'
            defaultValue={event?.max_participants ?? 0}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mt-4'>
          <label
            htmlFor={FIELD_NAMES.PASSCODE}
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            Passcode
          </label>
          <input
            name={FIELD_NAMES.PASSCODE}
            type='text'
            placeholder='Passcode'
            defaultValue={event?.passcode ?? ''}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>
        <button
          type='submit'
          className='mt-8 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Update
        </button>
      </form>
    </div>
  )
}
