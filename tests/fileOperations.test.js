const { describe, expect, test } = require('@jest/globals');
const {
  getDrawNumber,
  getRollOverNumber,
  getGameStats,
  getNextDrawRollOver,
  getProductName
} = require('../util/dataExtraction')

describe('Get draw number', () => {
  const drawNumberRegex = /Calculated share values for draw\s+\d+/
  const line1 = 'Calculated share values for draw          2188'
  const line2 = 'Calculated share values for draw          18'
  const line3 = 'Calculated share values for draw          80'

  test('It will return 2188 as the draw number', () => {
    expect(getDrawNumber(drawNumberRegex.exec(line1))).toBe('2188')
  })

  test('It will return 18 as the draw number', () => {
    expect(getDrawNumber(drawNumberRegex.exec(line2))).toBe('18')
  })

  test('It will return 80 as the draw number', () => {
    expect(getDrawNumber(drawNumberRegex.exec(line3))).toBe('80')
  })
})
