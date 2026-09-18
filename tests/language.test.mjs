import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { japanesePage } from '../scripts/japanese.mjs';
import { preferredLanguage, messages, resultSummary } from '../public/locale.js';

test('explicit language beats saved preference; saved preference beats browser language', () => {
  assert.equal(preferredLanguage('en', 'ja', ['ja-JP']), 'en');
  assert.equal(preferredLanguage(null, 'en', ['ja-JP']), 'en');
  assert.equal(preferredLanguage(null, null, ['ja-JP', 'en-US']), 'ja');
  assert.equal(preferredLanguage(null, null, ['fr-FR']), 'en');
});
test('Japanese page has translated content, metadata and accessible labels', async () => {
  const html = japanesePage(await readFile(new URL('../public/index.html', import.meta.url), 'utf8'));
  assert.match(html, /<html lang="ja">/);
  assert.match(html, /日本語の名前には、/);
  assert.match(html, /フィルタをリセット/);
  assert.match(html, /aria-label="メインナビゲーション"/);
  assert.match(html, /https:\/\/moodle-gojuon.jethachan.net\/ja\//);
  assert.doesNotMatch(html, /Try the kana index|Not recorded|Get the latest release|Fictional course roster/);
});
test('demo status and empty states are localized', () => {
  assert.match(resultSummary('ja', 2, 16, ['姓：か']), /16 人中 2 人/);
  assert.match(resultSummary('en', 2, 16, []), /2 of 16 participants/);
  assert.equal(messages.ja.all, 'すべて');
  assert.equal(messages.ja.student, '学生');
  assert.ok(messages.ja.empty.includes('該当'));
});
