import fs from 'fs';
const data = JSON.parse(fs.readFileSync('src/games.json', 'utf8'));

const manualIcons: Record<string, string> = {
  "Geometry Dash Lite": "https://static.wikia.nocookie.net/b213ondiscord/images/a/a6/Geometrydash.png/revision/latest?cb=20200721125515",
  "Geometry Dash Scratch": "https://static.wikia.nocookie.net/b213ondiscord/images/a/a6/Geometrydash.png/revision/latest?cb=20200721125515",
  "Drive Mad": "https://drivemadgame.cc/generate.php?path=/uploads/games/main/img_68c3e328e0294.jpg&width=375&height=375",
  "Retro Bowl": "https://play-lh.googleusercontent.com/1-K7j08qXjGItI2e4vP5Hw2zNXXY1EaQ93F2-p03Q2zF2vKxM1OQqR5Y4yY_gU3S4w=w240-h480-rw",
  "Among Us": "https://play-lh.googleusercontent.com/8ddL1kuoNZA5SQWDtcb-YWepKVBvudEDIdXWM-2P7H-MQQ7K-xP2bS8QzE_gHlM_-w=w240-h480-rw"
};

for (const game of data) {
  if (manualIcons[game.name]) {
    game.image = manualIcons[game.name];
  }
}

fs.writeFileSync('src/games.json', JSON.stringify(data, null, 2));
