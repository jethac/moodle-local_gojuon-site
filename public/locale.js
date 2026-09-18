export function preferredLanguage(explicit, saved, languages = []) {
  if (['en', 'ja'].includes(explicit)) return explicit;
  if (['en', 'ja'].includes(saved)) return saved;
  return languages[0]?.toLowerCase().startsWith('ja') ? 'ja' : 'en';
}
export const messages = {
  en: { all: 'All', other: 'Other', surname: 'Surname', given: 'Given name', missing: 'Not recorded', student: 'Student', otherLabel: 'Other or missing reading', empty: 'No sample participants match this combination. Try another row or reset the filters.', allNames: 'All names' },
  ja: { all: 'すべて', other: '他', surname: '姓', given: '名', missing: '未登録', student: '学生', otherLabel: 'その他・読み方未登録', empty: 'この条件に該当する参加者はいません。別の行を選ぶか、フィルタをリセットしてください。', allNames: 'すべての名前' },
};
export function resultSummary(language, count, total, active) {
  const prefix = language === 'ja' ? `${total} 人中 ${count} 人を表示` : `${count} of ${total} participants`;
  return `${prefix} · ${active.length ? active.join(' + ') : messages[language].allNames}`;
}
