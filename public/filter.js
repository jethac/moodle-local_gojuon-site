// Leading-character buckets mirror local_gojuon/classes/kana.php.
// Do not trim or normalize the whole reading: the plugin matches stored prefixes.
export const rows = [
  ['a', 'あ', 'あぁいぃうぅゔえぇおぉアァイィウゥヴエェオォｱｧｲｨｳｩｴｪｵｫ'],
  ['ka', 'か', 'かがきぎくぐけげこごゕゖカガキギクグケゲコゴヵヶｶｷｸｹｺ'],
  ['sa', 'さ', 'さざしじすずせぜそぞサザシジスズセゼソゾｻｼｽｾｿ'],
  ['ta', 'た', 'ただちぢつっづてでとどタダチヂツッヅテデトドﾀﾁﾂｯﾃﾄ'],
  ['na', 'な', 'なにぬねのナニヌネノﾅﾆﾇﾈﾉ'],
  ['ha', 'は', 'はばぱひびぴふぶぷへべぺほぼぽハバパヒビピフブプヘベペホボポﾊﾋﾌﾍﾎ'],
  ['ma', 'ま', 'まみむめもマミムメモﾏﾐﾑﾒﾓ'],
  ['ya', 'や', 'やゃゆゅよょヤャユュヨョﾔｬﾕｭﾖｮ'],
  ['ra', 'ら', 'らりるれろラリルレロﾗﾘﾙﾚﾛ'],
  ['wa', 'わ', 'わゎゐゑをんワヮヰヱヲンﾜｦﾝ'],
];
export function rowFor(reading) {
  const first = [...(reading ?? '')][0];
  if (!first) return 'other';
  for (const [key, , characters] of rows) if (characters.includes(first)) return key;
  const latin = first.normalize('NFKC').toLowerCase();
  return /^[a-z]$/.test(latin) ? `l${latin}` : 'other';
}
export function filterParticipants(people, surname = 'all', given = 'all') {
  return people.filter(person => (surname === 'all' || rowFor(person.surnameReading) === surname)
    && (given === 'all' || rowFor(person.givenReading) === given));
}
