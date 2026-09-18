import { preferredLanguage } from './locale.js';

const url = new URL(location.href);
const explicit = url.pathname.startsWith('/ja') ? 'ja' : url.searchParams.get('lang');
let saved;
try { saved = localStorage.getItem('gojuon-language'); } catch { /* Storage is optional. */ }
const language = preferredLanguage(explicit, saved, navigator.languages);
try { localStorage.setItem('gojuon-language', language); } catch { /* Links still work without storage. */ }
if (language === 'ja' && !url.pathname.startsWith('/ja')) {
  url.pathname = '/ja/';
  url.searchParams.delete('lang');
  location.replace(url.href);
}
document.querySelectorAll('[data-language]').forEach(link => {
  const target = new URL(link.href);
  target.hash = location.hash;
  link.href = target.href;
  link.addEventListener('click', () => {
    try { localStorage.setItem('gojuon-language', link.dataset.language); } catch { /* Optional. */ }
  });
});
