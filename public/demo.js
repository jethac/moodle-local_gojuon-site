import { rows, filterParticipants } from './filter.js';
import { messages, resultSummary } from './locale.js';

const language = document.documentElement.lang === 'ja' ? 'ja' : 'en';
const copy = messages[language];

const people = [
  ['青木 葵', 'Aoki Aoi', 'あおき', 'あおい'],
  ['伊藤 蓮', 'Itō Ren', 'イトウ', 'レン'],
  ['加藤 愛', 'Katō Ai', 'かとう', 'あい'],
  ['木村 美咲', 'Kimura Misaki', 'きむら', 'みさき'],
  ['後藤 陽菜', 'Gotō Hina', 'ゴトウ', 'ヒナ'],
  ['佐藤 結衣', 'Satō Yui', 'さとう', 'ゆい'],
  ['鈴木 健太', 'Suzuki Kenta', 'ｽｽﾞｷ', 'ｹﾝﾀ'],
  ['高橋 陸', 'Takahashi Riku', 'たかはし', 'りく'],
  ['中村 花', 'Nakamura Hana', 'なかむら', 'はな'],
  ['林 蒼', 'Hayashi Ao', 'はやし', 'あお'],
  ['松本 凛', 'Matsumoto Rin', 'まつもと', 'りん'],
  ['山田 優', 'Yamada Yū', 'やまだ', 'ゆう'],
  ['李 明', 'Ri Mei', 'り', 'めい'],
  ['渡辺 咲', 'Watanabe Saki', 'わたなべ', 'さき'],
  ['Alex Smith', 'Alex Smith', 'Smith', 'Alex'],
  ['田中 春', 'Tanaka Haru', '', 'はる'],
].map(([name, roman, surnameReading, givenReading]) => ({ name, roman, surnameReading, givenReading }));

const state = { surname: 'all', given: 'all' };
const labels = { all: copy.all, other: copy.other, ...Object.fromEntries(rows.map(([key, label]) => [key, label])) };
for (const letter of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') labels[`l${letter.toLowerCase()}`] = letter;
const body = document.querySelector('#participants');

function render() {
  document.querySelectorAll('[data-axis]').forEach(button => {
    button.setAttribute('aria-pressed', String(state[button.dataset.axis] === button.dataset.key));
  });
  const filtered = filterParticipants(people, state.surname, state.given);
  body.replaceChildren();
  for (const person of filtered) {
    const tr = document.createElement('tr');
    const cell = document.createElement('td');
    const personBlock = document.createElement('div');
    personBlock.className = 'person';
    const avatar = document.createElement('span');
    avatar.className = 'avatar';
    avatar.setAttribute('aria-hidden', 'true');
    avatar.textContent = [...person.name][0];
    const name = document.createElement('div');
    const display = document.createElement('span');
    display.lang = person.surnameReading === 'Smith' ? 'en' : 'ja';
    display.textContent = person.name;
    const roman = document.createElement('small');
    roman.textContent = person.roman;
    name.append(display, roman);
    personBlock.append(avatar, name);
    cell.append(personBlock);
    tr.append(cell);
    for (const reading of [person.surnameReading, person.givenReading]) {
      const td = document.createElement('td');
      td.textContent = reading || copy.missing;
      if (!reading) td.className = 'missing';
      else td.lang = /^[A-Za-z]/.test(reading) ? 'en' : 'ja';
      tr.append(td);
    }
    const role = document.createElement('td');
    const badge = document.createElement('span');
    badge.className = 'role';
    badge.textContent = copy.student;
    role.append(badge);
    tr.append(role);
    body.append(tr);
  }
  if (!filtered.length) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 4;
    cell.className = 'empty';
    cell.textContent = copy.empty;
    row.append(cell);
    body.append(row);
  }
  const active = [];
  if (state.surname !== 'all') active.push(`${copy.surname}: ${labels[state.surname]}`);
  if (state.given !== 'all') active.push(`${copy.given}: ${labels[state.given]}`);
  document.querySelector('#result-count').textContent = resultSummary(language, filtered.length, people.length, active);
}

for (const axis of ['surname', 'given']) {
  const options = [['all', copy.all], ...rows.map(([key, label]) => [key, label]), ['other', '他']];
  const latin = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(letter => [`l${letter.toLowerCase()}`, letter]);
  for (const [container, entries] of [[`${axis}-filters`, options], [`${axis}-latin`, latin]]) {
    for (const [key, label] of entries) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'chip';
      button.dataset.axis = axis;
      button.dataset.key = key;
      button.setAttribute('aria-label', `${axis === 'surname' ? copy.surname : copy.given}: ${key === 'other' ? copy.otherLabel : label}`);
      const text = document.createElement('span');
      if (key === 'other' || rows.some(([row]) => row === key)) text.lang = 'ja';
      text.textContent = label;
      button.append(text);
      button.addEventListener('click', () => { state[axis] = key; render(); });
      document.getElementById(container).append(button);
    }
  }
}
document.querySelector('#reset').addEventListener('click', () => { state.surname = 'all'; state.given = 'all'; render(); });
render();
