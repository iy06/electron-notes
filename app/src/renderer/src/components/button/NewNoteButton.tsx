import { ActionButton, ActionButtonProps } from '@/components'
import { ReactElement } from 'react'
import { LuFileSignature } from 'react-icons/lu'

export const NewNoteButton = ({ ...props }: ActionButtonProps): ReactElement => {
  return (
    <ActionButton {...props}>
      <LuFileSignature className="w-4 h4 text-zinc-300" />
    </ActionButton>
  )
}
