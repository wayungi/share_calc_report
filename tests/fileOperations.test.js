const { describe, expect, test } = require('@jest/globals')
const {
  getDrawNumber,
  getRollOverNumber,
  getGameStats,
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

describe('Get Product name from file path', () => {
  const filepath1 = '/home/wayungi/Desktop/scripts/share_calc_report/share_calc_reports/improved_share_calc_report_p008_c07993_english.rep'
  const filepath2 = '/home/wayungi/Desktop/scripts/share_calc_report/share_calc_reports/improved_share_calc_report_p012_c07996_english.rep'
  const filepath3 = '/home/wayungi/Desktop/scripts/share_calc_report/share_calc_reports/improved_share_calc_report_p013_c07993_english.rep'

  test('It will return LOTTO as the product name', () => {
    expect(getProductName(filepath1)).toBe('LOTTO')
  })

  test('It will return POWERBALL as the product name', () => {
    expect(getProductName(filepath2)).toBe('POWERBALL')
  })

  test('It will return DAILYLOTTO as the product name', () => {
    expect(getProductName(filepath3)).toBe('DAILYLOTTO')
  })
})

describe('Get Rollover Number', () => {
  const rollOverNumberRegex = /Rollover number\s+\d+/
  const line1 = 'Winning set  Regular           Guaranteed Jackpot =  NO         Rollover number     04'
  const line2 = 'Winning set  Regular           Guaranteed Jackpot =  NO         Rollover number     45'
  const line3 = 'Winning set  Regular           Guaranteed Jackpot =  NO         Rollover number     102'

  test('It will return 04 as the Rollover number', () => {
    expect(getRollOverNumber(rollOverNumberRegex.exec(line1))).toBe('04')
  })

  test('It will return 45 as the Rollover number', () => {
    expect(getRollOverNumber(rollOverNumberRegex.exec(line2))).toBe('45')
  })

  test('It will return 102 as the Rollover number', () => {
    expect(getRollOverNumber(rollOverNumberRegex.exec(line3))).toBe('102')
  })
})

describe('Get game get statistics', () => {
  const gameStatsRegex = /\d+\s+\d{1,3}(,\d{3})*(\.\d{2})\s+\d+\s+\d{1,3}(,\d{3})*(\.\d{2})/
  const line1 = '1           0.00               0            0.00'
  const line2 = '10      38,103.90               2       76,207.80'
  const line3 = '98       2,819.90              47      132,535.30'

  test('It will return 04 as the Rollover number', () => {
    expect(getGameStats(gameStatsRegex.exec(line1))).toStrictEqual(['1', '0.00', '0', '0.00'])
  })

  test('It will return 45 as the Rollover number', () => {
    expect(getGameStats(gameStatsRegex.exec(line2))).toStrictEqual(['10', '38,103.90', '2', '76,207.80'])
  })

  test('It will return 102 as the Rollover number', () => {
    expect(getGameStats(gameStatsRegex.exec(line3))).toStrictEqual(['98', '2,819.90', '47', '132,535.30'])
  })
})
