import fs from 'fs';

const games = JSON.parse(fs.readFileSync('src/games.json', 'utf8'));
const query = /(geometry|drive mad|retro bowl|smash|fnaf|among|baldi|bitlife|subway|cookie|run 3|slope|basket|mario|sonic|pokemon|doom|minecraft)/i;

const matches = games.filter(g => g.name.match(query)).slice(0, 100);
console.log(JSON.stringify(matches.map(g => g.name), null, 2));
