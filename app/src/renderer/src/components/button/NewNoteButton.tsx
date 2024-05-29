import { ActionButton, ActionButtonProps } from '@/components'
import { ReactElement } from 'react'
import { LuFileSignature } from 'react-icons/lu'
import { createEmptyNoteAtom } from '@renderer/store'
import { useSetAtom } from 'jotai'

export const NewNoteButton = ({ ...props }: ActionButtonProps): ReactElement => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)
  const handleCreation = async () => {
    await createEmptyNote()
  }

  return (
    <ActionButton onClick={handleCreation} {...props}>
      <LuFileSignature className="w-4 h4 text-zinc-300" />
    </ActionButton>
  )
}
