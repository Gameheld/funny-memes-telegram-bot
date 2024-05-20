import * as fs from 'fs/promises'

const capitalize = (s) => {
  const substringsCapitalized = s.split(' ').map((str) => str.charAt(0).toUpperCase() + str.slice(1))
  return substringsCapitalized.join(' ')
}

const dirList = (await fs.readdir('./img')).filter((d) => d.match(/\.jpg|\.jpeg|\.png/) != null)

const commandList = dirList.map((f) => f.split('.')[0].replaceAll('_', '') + ' - ' + capitalize(f.split('.')[0].replaceAll('_', ' ')))

await fs.writeFile('./commands.txt', commandList.join('\n'))
