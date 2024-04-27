import { twMerge } from 'tailwind-merge'
import { ReactElement, ComponentProps } from 'react'

export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>): ReactElement => {
  const title = 'Note Title'

  return (
    <div className={twMerge('flex justify-center', className)} {...props}>
      <span className="text-gray-400">{title}</span>
    </div>
  )
}
