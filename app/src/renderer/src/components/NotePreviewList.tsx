import { noteMock } from '@/store/mocks'
import { ComponentProps, ReactElement } from 'react'
import { NotePreview } from './NotePreview'
import { twMerge } from 'tailwind-merge'

export const NotePreviewList = ({ className, ...props }: ComponentProps<'ul'>): ReactElement => {
  if (noteMock.length === 0) {
    return (
      <ul className={twMerge('text-center pt-4', className)}>
        <span>No Notes!</span>
      </ul>
    )
  }

  return (
    <ul className={className} {...props}>
      {noteMock.map((note) => (
        <NotePreview key={note.title + note.lastEditTime} {...note} />
      ))}
    </ul>
  )
}
