import test from 'node:test';
import assert from 'node:assert/strict';
import { rowFor, filterParticipants } from '../public/filter.js';

test('kana variants share their gojuon row', () => {
  for (const reading of ['かとう', 'ごとう', 'カトウ', 'ｺﾞﾄｳ', 'きむら']) assert.equal(rowFor(reading), 'ka');
  assert.equal(rowFor('ぱく'), 'ha');
  assert.equal(rowFor('ヴァン'), 'a');
  assert.equal(rowFor('ん'), 'wa');
});
test('Latin initials include lower case and full-width letters', () => {
  for (const reading of ['Smith', 'smith', 'Ｓｍｉｔｈ', 'ｓmith']) assert.equal(rowFor(reading), 'ls');
});
test('missing or unclassified leading readings remain in other', () => {
  for (const reading of ['', null, '山田', ' さとう', '123']) assert.equal(rowFor(reading), 'other');
});
test('surname and given name compose and reset independently', () => {
  const people = [
    { surnameReading: 'かとう', givenReading: 'あい' },
    { surnameReading: 'ごとう', givenReading: 'みき' },
    { surnameReading: 'さとう', givenReading: 'あい' },
    { surnameReading: '', givenReading: 'あい' },
  ];
  assert.equal(filterParticipants(people, 'ka', 'all').length, 2);
  assert.deepEqual(filterParticipants(people, 'ka', 'a'), [people[0]]);
  assert.equal(filterParticipants(people, 'all', 'a').length, 3);
  assert.deepEqual(filterParticipants(people, 'other', 'a'), [people[3]]);
  assert.equal(filterParticipants(people, 'all', 'all').length, 4);
  assert.equal(filterParticipants(people, 'wa', 'ha').length, 0);
});
