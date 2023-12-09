export const DRAW_NUMBER_REGEX = /Calculated share values for draw\s+\d+/
export const ROLLOVER_NUMBER_REGEX = /Rollover number\s+\d+/
export const GAME_RECORD = /\d+\s+\d{1,3}(,\d{3})*(\.\d{2})\s+\d+\s+\d{1,3}(,\d{3})*(\.\d{2})/ /*gameStatRegex*/
export const PAGE_REGEX = /Page:\s{1}\d+/ /* create new page when this regex is matched */
export const SAVE_PAGE_REGEX = /Total/ /* Save the page when this regex is matched && isPageCreationRequired === true */
export const PLUS_1_REGEX = /Regular Plus 1/ /* LOTTO PLUS 1 */
export const PLUS_2_REGEX = /Regular Plus 2/ /* LOTTO PLU 2 */
export const PLUS_REGEX = /Regular Plus/ /* POWERBALL PLUS */
