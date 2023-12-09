const { describe, expect, test } = require('@jest/globals')
const { getProductName, getGameRecord, resultType, getNumber } = require('../util/dataExtraction')
const { DRAW_NUMBER_REGEX, ROLLOVER_NUMBER_REGEX, GAME_RECORD } = require('../util/patterns')

describe('Get draw number', () => {
  const line1 = 'Calculated share values for draw          2188'
  const line2 = 'Calculated share values for draw          18'
  const line3 = 'Winning set  Regular           Guaranteed Jackpot =  NO         Rollover number     45'
  const line4 = 'Winning set  Regular           Guaranteed Jackpot =  NO         Rollover number     102'

  test('It will return 2188 as the draw number', () => {
    expect(getNumber(DRAW_NUMBER_REGEX, line1)).toBe('2188')
  })

  test('It will return null for draw number ', () => {
    expect(getNumber(DRAW_NUMBER_REGEX, line3)).toBe(null)
  })

  test('It will return 18 as the draw number', () => {
    expect(getNumber(DRAW_NUMBER_REGEX, line2)).toBe('18')
  })

  test('It will return 45 as the rollover number', () => {
    expect(getNumber(ROLLOVER_NUMBER_REGEX, line3)).toBe('45')
  })

  test('It will return null for rollover number number', () => {
    expect(getNumber(ROLLOVER_NUMBER_REGEX, line2)).toBe(null)
  })

  test('It will return 102 as the rollover number', () => {
    expect(getNumber(ROLLOVER_NUMBER_REGEX, line4)).toBe('102')
  })
})

describe('Get Product name from file path', () => {
  const filepath1 = '/home/wayungi/Desktop/scripts/share_calc_report/share_calc_reports/improved_share_calc_report_p008_c07993_english.rep'
  const filepath2 = '/home/wayungi/Desktop/scripts/share_calc_report/share_calc_reports/improved_share_calc_report_p012_c07996_english.rep'
  const filepath3 = '/home/wayungi/Desktop/scripts/share_calc_report/share_calc_reports/improved_share_calc_report_p013_c07993_english.rep'
  const filepath4 = '/home/wayungi/Desktop/scripts/share_calc_report/share_calc_reports/improved_share_calc_report_p014_c07993_english.rep'
  const filepath5 = '/home/wayungi/Desktop/scripts/share_calc_report/share_calc_reports/improved_share_calc_report_p015_c07993_english.rep'

  test('p008: It will return LOTTO as the product name', () => {
    expect(getProductName(filepath1)).toBe('LOTTO')
  })

  test('p014: It will return null as the product name', () => {
    expect(getProductName(filepath4)).toBe(null)
  })

  test('p012: It will return POWERBALL as the product name', () => {
    expect(getProductName(filepath2)).toBe('POWERBALL')
  })

  test('p015: It will return null as the product name', () => {
    expect(getProductName(filepath5)).toBe(null)
  })

  test('p013: It will return DAILYLOTTO as the product name', () => {
    expect(getProductName(filepath3)).toBe('DAILYLOTTO')
  })
})

describe('Get game records', () => {
  const line1 = '1           0.00               0            0.00'
  const line2 = 'lorem ipsum dollor iter text 200 400 500'
  const line3 = '10      38,103.90               2       76,207.80'
  const line4 = '200 400 500 iter text legar'
  const line5 = '98       2,819.90              47      132,535.30'

  test('It will return ["1", "0.00", "0", "0.00"] as the game record', () => {
    expect(getGameRecord(GAME_RECORD, line1)).toStrictEqual(['1', '0.00', '0', '0.00'])
  })

  test('It will return null as the game record', () => {
    expect(getGameRecord(GAME_RECORD, line2)).toBe(null)
  })

  test('It will return ["10", "38,103.90", "2", "76,207.80"] as the game record', () => {
    expect(getGameRecord(GAME_RECORD, line3)).toStrictEqual(['10', '38,103.90', '2', '76,207.80'])
  })

  test('It will return null as the game record', () => {
    expect(getGameRecord(GAME_RECORD, line4)).toBe(null)
  })

  test('It will return ["98", "2,819.90", "47", "132,535.30"] as the game reocrd', () => {
    expect(getGameRecord(GAME_RECORD, line5)).toStrictEqual(['98', '2,819.90', '47', '132,535.30'])
  })
})
