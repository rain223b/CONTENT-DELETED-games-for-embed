import fs from 'fs';

const lines = fs.readFileSync('doc.txt', 'utf8').split('\n');
const games = [];

for (const line of lines) {
  const match = line.match(/^(.+?):\s*(cl[a-zA-Z0-9_\-\.\$]+\.html)\s*$/i);
  if (match) {
    const name = match[1].trim();
    const filename = match[2].trim();
    if (name.toLowerCase() !== 'html') {
      games.push({ name, filename });
    }
  }
}

fs.writeFileSync('src/games.json', JSON.stringify(games, null, 2));
console.log(`Extracted ${games.length} games.`);
