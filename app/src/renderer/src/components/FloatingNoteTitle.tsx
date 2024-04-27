import { twMerge } from 'tailwind-merge'
import { ReactElement, ComponentProps } from 'react'
import { useAtomValue } from 'jotai'
import { selectedNoteAtom } from '@renderer/store'

export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>): ReactElement => {
  const selectedNote = useAtomValue(selectedNoteAtom)

  if (!selectedNote) return null

  return (
    <div className={twMerge('flex justify-center', className)} {...props}>
      <span className="text-gray-400">{selectedNote.title}</span>
    </div>
  )
}
