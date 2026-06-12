/**
 * Kread Configuration
 * Customize Bible API endpoint and app settings
 */

const KREAD_CONFIG = {
  // Bible API endpoint - update if your site is on a different domain or port
  bibleApiUrl: 'https://sermons.bo-bob.org',

  // Set to true to log fetched verses for debugging
  debugLogging: false,

  // Maximum retries when fetching fails
  maxRetries: 3,

  // Daily routine recommendations
  dailyRoutine: {
    syllables: '2 minutes — pure speed, say each one within 1 second',
    words: '5 minutes — read aloud, then verify with audio',
    sentences: '5 minutes — aim for one smooth pass with no restarts',
    passages: 'Finish with one Wall of Text — click-track word by word. Slow is fine; finishing is the win.'
  }
};
