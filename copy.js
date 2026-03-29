import fs from 'fs';
import path from 'path';

try {
  fs.copyFileSync(
    '/Users/gyaneshvar/learning/aigyanidea/aigyanfaviconnobg.png',
    '/Users/gyaneshvar/learning/aigyanidea/aigyan/public/favicon.png'
  );
  console.log('Favicon copied');

  fs.copyFileSync(
    '/Users/gyaneshvar/learning/aigyanidea/aigyannobg.png',
    '/Users/gyaneshvar/learning/aigyanidea/aigyan/public/logo.png'
  );
  console.log('Logo copied');
} catch (e) {
  console.error(e);
}
