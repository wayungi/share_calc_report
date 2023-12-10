const { describe, expect, test, jest, beforeAll, afterAll, beforeEach } = require('@jest/globals')
const { ensureDir, writeFile, remove } = require('fs-extra')
const fs = require('fs')
const readline = require('readline')
const { getFilesInFolder, readSharedCalcFileLineByLine } = require('../util/fileOperations')

jest.mock('fs')
jest.mock('readline')

describe('Test reading files in folder', () => {
  let tempFolder
  let tempFolder2

  beforeAll(async () => {
    tempFolder = './tempTestFolder'
    tempFolder2 = './tempTestFolder2'
    await ensureDir(tempFolder)
    await ensureDir(tempFolder2)
    await writeFile(`${tempFolder}/file1.txt`, 'Content of file 1')
    await writeFile(`${tempFolder}/file2.txt`, 'Content of file 2')
  })

  afterAll(async () => {
    await remove(tempFolder)
    await remove(tempFolder2)
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

describe('readSharedCalcFileLineByLine', () => {
  const mockCreateReadStream = jest.spyOn(fs, 'createReadStream')
  const mockCreateInterface = jest.spyOn(readline, 'createInterface')

  beforeEach(() => {
    mockCreateReadStream.mockClear()
    mockCreateInterface.mockClear()
  })

  //   test('it should process the file content correctly', async () => {
  //     // Arrange
  //     const mockStream = { pipe: jest.fn() }
  //     mockCreateReadStream.mockReturnValueOnce(mockStream)

  //     // Mock readline interface with an iterator for test lines
  //     const mockReadlineIterator = jest.fn()
  //     mockCreateInterface.mockImplementationOnce(() => ({
  //       [Symbol.asyncIterator]: () => mockReadlineIterator
  //     }))

  //     // Mock lines in the file
  //     const lines = [
  //       'Page: 1',
  //       'PLUS_1_REGEX line',
  //       'DRAW_NUMBER_REGEX line',
  //       'SAVE_PAGE_REGEX line',
  //       'Page: 2',
  //       'PLUS_2_REGEX line',
  //       'DRAW_NUMBER_REGEX line',
  //       'SAVE_PAGE_REGEX line'
  //     ]
  //     mockReadlineIterator.mockReturnValueOnce({
  //       next: jest.fn().mockImplementationOnce(() => ({ value: lines.shift(), done: false }))
  //     })

  //     // Act
  //     const result = await readSharedCalcFileLineByLine('mockFilePath')

//     // Assert
//     expect(result).toEqual({
//       drawNumber: 'mock DRAW_NUMBER',
//       pages: [
//         {
//           productType: 'mock PLUS_1_REGEX',
//           gameRecords: []
//         },
//         {
//           productType: 'mock PLUS_2_REGEX',
//           gameRecords: []
//         }
//       ]
//     })
//   })
})
