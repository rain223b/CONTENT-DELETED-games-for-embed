import fs from 'fs';

const games = JSON.parse(fs.readFileSync('src/games.json', 'utf8'));

async function fetchIcon(name: string) {
  try {
    const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(name)}&entity=software&limit=1`);
    if (res.status === 403) return "RATE_LIMIT";
    const json = await res.json();
    if (json.results && json.results.length > 0) {
      return json.results[0].artworkUrl512 || json.results[0].artworkUrl100;
    }
  } catch(e) {
      // console.error("Error for", name);
  }
  return null;
}

async function run() {
    let promises = [];
    for (let i = 0; i < 20; i++) {
        promises.push(fetchIcon(games[i].name));
    }
    const res = await Promise.all(promises);
    console.log(res);
}
run();
