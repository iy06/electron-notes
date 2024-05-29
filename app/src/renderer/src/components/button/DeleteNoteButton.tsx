import { ActionButton, ActionButtonProps } from '@/components'
import { ReactElement } from 'react'
import { FaRegTrashCan } from 'react-icons/fa6'
import { useSetAtom } from 'jotai'
import { deleteNoteAtom } from '@renderer/store'

export const DeleteNoteButton = ({ ...props }: ActionButtonProps): ReactElement => {
  const deleteNote = useSetAtom(deleteNoteAtom)
  const handleDelete = async () => {
    await deleteNote()
  }

  return (
    <ActionButton onClick={handleDelete} {...props}>
      <FaRegTrashCan className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
