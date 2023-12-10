const { describe, expect, test, beforeAll, afterAll } = require('@jest/globals')
const fs = require('fs-extra')
const { getFilesInFolder, readSharedCalcFileLineByLine } = require('../util/fileOperations')

describe('Test reading files in folder', () => {
  let tempFolder
  let tempFolder2

  beforeAll(async () => {
    tempFolder = './tempTestFolder'
    tempFolder2 = './tempTestFolder2'
    await fs.ensureDir(tempFolder)
    await fs.ensureDir(tempFolder2)
    await fs.writeFile(`${tempFolder}/file1.txt`, 'Content of file 1')
    await fs.writeFile(`${tempFolder}/file2.txt`, 'Content of file 2')
  })

  afterAll(async () => {
    await fs.remove(tempFolder)
  })

  test('It should return null when the folder does not exist', () => {
    const nonExistentFolder = './nonExistentFolder'
    const result = getFilesInFolder(nonExistentFolder)
    expect(getFilesInFolder(result)).toBe(null)
  })

  test('it should read files from a folder and return an array of file paths', async () => {
    const folderPath = tempFolder
    const result = await getFilesInFolder(folderPath)
    expect(result).toHaveLength(2)
    expect(result[0]).toBe('tempTestFolder/file1.txt')
    expect(result[1]).toBe('tempTestFolder/file2.txt')
    expect(result).toStrictEqual(['tempTestFolder/file1.txt', 'tempTestFolder/file2.txt'])
  })

  test('it should return an empty array when the folder does not have files ', () => {
    expect(getFilesInFolder(tempFolder2)).toStrictEqual([])
    expect(getFilesInFolder(tempFolder2)).toHaveLength(0)
  })
})
