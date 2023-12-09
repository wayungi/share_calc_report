const DRAW_NUMBER_REGEX = /Calculated share values for draw\s+\d+/
const ROLLOVER_NUMBER_REGEX = /Rollover number\s+\d+/
const GAME_RECORD = /\d+\s+\d{1,3}(,\d{3})*(\.\d{2})\s+\d+\s+\d{1,3}(,\d{3})*(\.\d{2})/ /* gameStatRegex */
const PAGE_REGEX = /Page:\s{1}\d+/ /* create new page when this regex is matched */
const SAVE_PAGE_REGEX = /Total/ /* Save the page when this regex is matched && isPageCreationRequired === true */
const PLUS_1_REGEX = /Regular Plus 1/ /* LOTTO PLUS 1 */
const PLUS_2_REGEX = /Regular Plus 2/ /* LOTTO PLU 2 */
const PLUS_REGEX = /Regular Plus/ /* POWERBALL PLUS */

module.exports = {
  DRAW_NUMBER_REGEX,
  ROLLOVER_NUMBER_REGEX,
  GAME_RECORD,
  PAGE_REGEX,
  SAVE_PAGE_REGEX,
  PLUS_1_REGEX,
  PLUS_2_REGEX,
  PLUS_REGEX
}
