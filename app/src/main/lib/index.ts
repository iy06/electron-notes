import { appDirectoryName, fileEncoding, welecomeNoteFileName } from '@shared/constants'
import { ensureDir, readdir, stat, readFile, writeFile, remove } from 'fs-extra'
import { homedir } from 'os'
import { GetNotes, ReadNote, WriteNote, CreateNote, DeleteNote } from '@shared/types'
import { NoteInfo } from '@shared/models'
import { dialog } from 'electron'
import { isEmpty } from 'lodash'
import path from 'path'
import welcomeNoteFile from '../../../resources/WelcomeNote.md?asset'

export const getRootDir = (): string => {
  return `${homedir()}/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))
  if (isEmpty(notes)) {
    console.info('No notes found, creating a welecome note')
    const content = await readFile(welcomeNoteFile, { encoding: fileEncoding })
    // WelcomeNoteの作成
    await writeFile(`${rootDir}/${welecomeNoteFileName}`, content, { encoding: fileEncoding })
    notes.push(welecomeNoteFileName)
  }
  return Promise.all(notes.map(getNoteInfoFromFileName))
}

export const getNoteInfoFromFileName = async (fileName: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${fileName}`)
  return {
    title: fileName.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNote = async (fileName: string) => {
  const rootDir = getRootDir()
  return readFile(`${rootDir}/${fileName}.md`, { encoding: fileEncoding })
}

export const writeNote: WriteNote = async (fileName, content) => {
  const rootDir = getRootDir()
  console.info(`writing note ${fileName}`)
  return writeFile(`${rootDir}/${fileName}.md`, content, { encoding: fileEncoding })
}

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)
  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New note',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })
  if (canceled || !filePath) {
    console.info('Note creation canceled')
    return false
  }
  const { name: fileName, dir: parentDir } = path.parse(filePath)
  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation failed',
      message: `All notes must be saved under ${rootDir}.
      Avoid using other directories!`
    })
    return false
  }
  console.info(`Creating note: ${filePath}`)
  await writeFile(filePath, '')
  return fileName
}

export const deleteNote: DeleteNote = async (fileName) => {
  const rootDir = getRootDir()
  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete note',
    message: `Are you sure you want to delete ${fileName}?`,
    buttons: ['Delete', 'Cancel'],
    defaultId: 1,
    cancelId: 1
  })
  if (response === 1) {
    console.info('Note deletion canceled')
    return false
  }
  console.info(`Deleting note: ${fileName}`)
  await remove(`${rootDir}/${fileName}.md`)
  return true
}
