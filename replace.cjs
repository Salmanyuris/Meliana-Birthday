const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Protect Finda Meliana Putri
  content = content.replace(/Finda Meliana Putri/g, '___FULLNAME___');
  content = content.replace(/FINDA MELIANA PUTRI/g, '___FULLNAME_UPPER___');

  // Replace Sahabat -> Teman
  content = content.replace(/Sahabatku/g, 'Temanku');
  content = content.replace(/sahabatku/g, 'temanku');
  content = content.replace(/Sahabatnya/g, 'Temannya');
  content = content.replace(/sahabatnya/g, 'temannya');
  content = content.replace(/Sahabat/g, 'Teman');
  content = content.replace(/sahabat/g, 'teman');
  content = content.replace(/Persahabatan/g, 'Pertemanan');
  content = content.replace(/persahabatan/g, 'pertemanan');

  // Replace Finda -> Meli
  content = content.replace(/Finda's/g, "Meli's");
  content = content.replace(/Finda(?=[^a-zA-Z])/g, 'Meli'); // Replace Finda not followed by letter (avoids FindaQuiz)
  
  content = content.replace(/FINDA-HAPPY/g, 'MELI-HAPPY');
  content = content.replace(/DESSERT-DAY-FINDA/g, 'DESSERT-DAY-MELI');

  // Restore Finda Meliana Putri
  content = content.replace(/___FULLNAME___/g, 'Finda Meliana Putri');
  content = content.replace(/___FULLNAME_UPPER___/g, 'FINDA MELIANA PUTRI');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated: ' + file);
  }
});
