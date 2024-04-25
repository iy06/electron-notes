import { DeleteNoteButton, NewNoteButton } from '@/components'
import { ComponentProps, ReactElement } from 'react'

export const ActionButtonsRow = ({ ...props }: ComponentProps<'div'>): ReactElement => {
  return (
    <div {...props}>
      <NewNoteButton />
      <DeleteNoteButton />
    </div>
  )
}
