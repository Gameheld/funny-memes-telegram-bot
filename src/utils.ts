import * as fs from 'fs/promises'
import { Command } from './types.js'

export const fetchCommands = async (): Promise<Command[]> => {
  const dirList: string[] = await fs.readdir('./img')

  const commandList: Command[] = dirList.map((f) => ({
    fileName: f,
    name: f.split('.')[0].replaceAll('_', ''),
    info: capitalize(f.split('.')[0].replaceAll('_', ' '))
  } as Command))
    .filter((c) => c.fileName.match(/\.jpg|\.jpeg|\.png/) != null)

  return commandList
}

export const capitalize = (s: string): string => {
  const substringsCapitalized: string[] = s.split(' ').map((str) => str.charAt(0).toUpperCase() + str.slice(1))

  return substringsCapitalized.join(' ')
}
