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
import { ReactElement } from 'react'

const App = (): ReactElement => {
  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <SideBar className="p-2">
          <ActionButtonsRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1" />
        </SideBar>
        <Content className="border-l bg-zinc-900/50 border-l-white/20">
          <FloatingNoteTitle className="pt-2" />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
