/**
 * Bible Verse Fetcher for Kread
 * Dynamically pulls from sermons.bo-bob.org/bible Flask endpoint
 * Avoids repetition by tracking fetched verses
 */

class BibleFetcher {
  constructor(apiBaseUrl = KREAD_CONFIG?.bibleApiUrl || 'https://sermons.bo-bob.org') {
    this.apiBaseUrl = apiBaseUrl;
    this.fetchedVerses = new Set();
    this.retries = 0;
    this.maxRetries = KREAD_CONFIG?.maxRetries || 3;
    this.bibleBooks = [
      // OT
      'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
      'Joshua', 'Judges', 'Ruth', '1Samuel', '2Samuel',
      '1Kings', '2Kings', '1Chronicles', '2Chronicles',
      'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalm', 'Proverbs',
      'Ecclesiastes', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel',
      'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah',
      'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah',
      'Haggai', 'Zechariah', 'Malachi',
      // NT
      'Matthew', 'Mark', 'Luke', 'John',
      'Acts', 'Romans', '1Corinthians', '2Corinthians',
      'Galatians', 'Ephesians', 'Philippians', 'Colossians',
      '1Thessalonians', '2Thessalonians', '1Timothy', '2Timothy',
      'Titus', 'Philemon', 'Hebrews', 'James',
      '1Peter', '2Peter', '1John', '2John', '3John', 'Jude',
      'Revelation'
    ];
  }

  /**
   * Get a random book from the Bible
   */
  getRandomBook() {
    return this.bibleBooks[Math.floor(Math.random() * this.bibleBooks.length)];
  }

  /**
   * Get a random chapter number (1-based, varies by book)
   * For simplicity, use 1-30 range (most books have fewer than 30 chapters)
   */
  getRandomChapter() {
    return Math.floor(Math.random() * 30) + 1;
  }

  /**
   * Fetch a single verse from the Bible API
   * Returns: [Korean text, reference hint, English translation]
   */
  async fetchVerse() {
    try {
      const book = this.getRandomBook();
      const chapter = this.getRandomChapter();
      const endpoint = `${this.apiBaseUrl}/bible/${book}/${chapter}`;

      if (KREAD_CONFIG?.debugLogging) {
        console.log(`Fetching: ${endpoint}`);
      }

      const response = await fetch(endpoint);
      if (!response.ok) {
        console.warn(`Failed to fetch ${book} ${chapter}: ${response.status}`);
        return null;
      }

      const data = await response.json();

      // Handle various possible response formats
      let verses = data.verses || data.chapters || data.text || [];
      if (!Array.isArray(verses)) {
        verses = Object.values(data).filter(v => Array.isArray(v))[0] || [];
      }

      if (verses.length === 0) {
        return null;
      }

      const randomVerse = verses[Math.floor(Math.random() * verses.length)];
      
      // Handle different verse object formats
      const verseNum = randomVerse.v || randomVerse.verse || randomVerse.num || '?';
      const koreanText = randomVerse.text_ko || randomVerse.ko || randomVerse.korean || randomVerse.text || '';
      const englishText = randomVerse.text_en || randomVerse.en || randomVerse.english || '';

      if (!koreanText) {
        return null;
      }

      const verseRef = `${book} ${chapter}:${verseNum}`;

      // Skip if already fetched
      if (this.fetchedVerses.has(verseRef)) {
        this.retries++;
        if (this.retries < this.maxRetries) {
          return this.fetchVerse();
        }
        return null;
      }

      this.fetchedVerses.add(verseRef);
      this.retries = 0;

      if (KREAD_CONFIG?.debugLogging) {
        console.log(`Fetched: ${verseRef}`);
      }

      // Return in Kread format: [korean, romanization hint, meaning]
      return [koreanText, `(${verseRef})`, englishText];
    } catch (error) {
      console.error('Bible fetch error:', error);
      return null;
    }
  }

  /**
   * Fetch multiple verses for a level
   * @param {number} count - How many verses to fetch
   */
  async fetchVerses(count = 5) {
    const verses = [];
    for (let i = 0; i < count; i++) {
      const verse = await this.fetchVerse();
      if (verse) verses.push(verse);
    }
    return verses;
  }

  /**
   * Clear the fetched tracking (reset for new session)
   */
  clearCache() {
    this.fetchedVerses.clear();
  }
}

// Create global instance
const bibleFetcher = new BibleFetcher();
