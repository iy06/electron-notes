import {
  RootLayout,
  SideBar,
  Content,
  DraggableTopBar,
  FloatingNoteTitle,
  MarkdownEditor,
  ActionButtonsRow,
  NotePreviewList
} from '@/components'
import { ReactElement, useRef } from 'react'

const App = (): ReactElement => {
  const contentContainerRef = useRef<HTMLDivElement>(null)
  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }
  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <SideBar className="p-2">
          <ActionButtonsRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
        </SideBar>
        <Content ref={contentContainerRef} className="border-l bg-zinc-900/50 border-l-white/20">
          <FloatingNoteTitle className="pt-2" />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
