import fs from 'fs';

const games = JSON.parse(fs.readFileSync('src/games.json', 'utf8'));

const popularImages: Record<string, string> = {
  "Geometry Dash Lite": "https://static.wikia.nocookie.net/b213ondiscord/images/a/a6/Geometrydash.png/revision/latest?cb=20200721125515",
  "Drive Mad": "https://drivemadgame.cc/generate.php?path=/uploads/games/main/img_68c3e328e0294.jpg&width=375&height=375",
  "Retro Bowl": "https://play-lh.googleusercontent.com/HIfDk_PXYK12l27oI01O_CqBItFiyxR7q658y2M3nL75k-xYtMIf0q4h76K0UaHqH5I=w128-h128-rw",
  "Run 3": "https://play-lh.googleusercontent.com/A9A2Q-R0K2zQyG7-LzBttG1h4I_8_L7O71B1Uf47iN9u1qVv5Z3sU10Dq4K3c1y0X5Y=w128-h128-rw",
  "Slope": "https://play-lh.googleusercontent.com/uR2_S1YfTclm-A0xT12H1A5I8a_0A9NqB-dO7O4H5PzKzM8yX4kY9H7rD5B4c6h3H8M=w128-h128-rw",
  "Among Us": "https://play-lh.googleusercontent.com/8ZNL4-B-hX2H1I8hZ2M0P3X8h5_N_-_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_g=w128-h128-rw",
  "Bitlife": "https://play-lh.googleusercontent.com/GzB1yN8bK6v8I9O_d8F-f-mQ7g5u9H2G_G_G_G_G_G_G_G_G_G_G_G_G_G_G_G_G_G=w128-h128-rw",
  "Cookie Clicker": "https://play-lh.googleusercontent.com/Z7O_g-oZ9l4z7_8_Z_Z_Z_Z_Z_Z_Z_Z_Z_Z_Z_Z_Z_Z_Z_Z_Z_Z_Z_Z_Z_Z_Z=w128-h128-rw",
  "FNAF": "https://play-lh.googleusercontent.com/urP_7qX6Z_G_G_G_G_G_G_G_G_G_G_G_G_G_G_G_G_G_G_G_G_G_G_G_G_G=w128-h128-rw",
  "Subway Surfers: London": "https://play-lh.googleusercontent.com/s6_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_=w128-h128-rw",
  "Baldi’s Basics": "https://play-lh.googleusercontent.com/-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_=w128-h128-rw",
  "Super Mario 64 (webgl)": "https://upload.wikimedia.org/wikipedia/en/6/6a/Super_Mario_64_box_cover.jpg",
  "Super Mario Bros": "https://upload.wikimedia.org/wikipedia/en/0/03/Super_Mario_Bros._box.png",
  "Sonic 1 Mobile": "https://upload.wikimedia.org/wikipedia/en/1/1c/Sonic_the_Hedgehog_1_box_art.jpg",
  "Minecraft Pocket Edition": "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png",
  "Smash Karts": "https://play-lh.googleusercontent.com/L-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_=w128-h128-rw",
  "Basket Bros": "https://play-lh.googleusercontent.com/Z_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_=w128-h128-rw",
  "Basket Random": "https://play-lh.googleusercontent.com/C_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_=w128-h128-rw",
  "Solar Smash": "https://play-lh.googleusercontent.com/H-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_=w128-h128-rw",
  "Doom Emscripten": "https://upload.wikimedia.org/wikipedia/en/5/57/Doom_cover_art.jpg"
};

const defaultImages: string[] = [
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=128&h=128&fit=crop",
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=128&h=128&fit=crop",
  "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=128&h=128&fit=crop",
  "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=128&h=128&fit=crop",
  "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=128&h=128&fit=crop"
];

// Instead of guessing Google Play logo URLs which will 404, we'll use placeholder generic images for some,
// and exact URLs for the specified ones and wikimedia ones.

const finalPopular = [
  "Geometry Dash Lite", "Drive Mad", "Retro Bowl", "Run 3", "Slope",
  "Among Us", "Bitlife", "Cookie Clicker", "FNAF", "Subway Surfers: London",
  "Baldi’s Basics", "Super Mario 64 (webgl)", "Super Mario Bros", "Sonic 1 Mobile", "Minecraft Pocket Edition",
  "Smash Karts", "Basket Bros", "Basket Random", "Solar Smash", "Doom Emscripten",
  "FNAF 2", "FNAF 3", "Retro Bowl College", "Geometry Dash Subzero (HTML5)", "Basketball Stars",
  "Bouncy Basketball", "Slope 2 player", "Slope 3", "Minecraft Shooter", "Jelly Mario",
  "FNAF 4", "Geometry Dash World", "FNAF Sister Location", "2Doom", "Sonic CD",
  "Sonic Mania Plus", "Sonic Robo Blast 2", "Super Mario 63 Redux", "Cat Mario", "Basketball Legends",
  "1v1.lol", "2048", "Happy Wheels", "Flappy Bird", "Paper.io 2",
  "Hole.io", "Vex 4", "Vex 5", "Vex 6", "Vex 7"
];

const processedGames = games.map(g => {
  let isPop = false;
  let img = "";
  if (finalPopular.includes(g.name)) {
    isPop = true;
    img = popularImages[g.name] || `https://ui-avatars.com/api/?name=${encodeURIComponent(g.name)}&background=random&color=fff&size=128`;
  }
  // Hardcoded substitutions
  if (g.name === "Drive Mad") img = "https://drivemadgame.cc/generate.php?path=/uploads/games/main/img_68c3e328e0294.jpg&width=375&height=375";
  if (g.name === "Geometry Dash Lite" || g.name === "Geometry Dash Scratch") img = "https://static.wikia.nocookie.net/b213ondiscord/images/a/a6/Geometrydash.png/revision/latest?cb=20200721125515";
  if (g.name === "Super Mario 64 (webgl)") img = "https://upload.wikimedia.org/wikipedia/en/6/6a/Super_Mario_64_box_cover.jpg";
  if (g.name === "Minecraft Pocket Edition") img = "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png";
  if (g.name === "Doom Emscripten") img = "https://upload.wikimedia.org/wikipedia/en/5/57/Doom_cover_art.jpg";
  if (g.name === "1v1.lol") img = "https://play-lh.googleusercontent.com/d_n1H-u2rIt0y4oQ12nO_R5Qy_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_=w128-h128";
  if (g.name === "Cookie Clicker") img = "https://play-lh.googleusercontent.com/Z7O_g_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_=w128-h128";
  if (g.name === "Retro Bowl") img = "https://play-lh.googleusercontent.com/HIfDk_PXYK12l27oI01O_CqBItFiyxR7q658y2M3nL75k-xYtMIf0q4h76K0UaHqH5I=w128-h128";
  if (g.name === "Run 3") img = "https://play-lh.googleusercontent.com/A9A2Q-R0K2zQyG7-LzBttG1h4I_8_L7O71B1Uf47iN9u1qVv5Z3sU10Dq4K3c1y0X5Y=w128-h128";
  
  // if not manually assigned, use ui-avatars for popular ones
  if (isPop && (!img || img.startsWith("https://play-lh"))) {
     img = `https://ui-avatars.com/api/?name=${encodeURIComponent(g.name)}&background=random&color=fff&size=128`;
  }
  
  if (g.name.includes("Geometry Dash")) img = "https://static.wikia.nocookie.net/b213ondiscord/images/a/a6/Geometrydash.png/revision/latest?cb=20200721125515";

  return { ...g, popular: isPop, image: img || undefined };
});

fs.writeFileSync('src/games.json', JSON.stringify(processedGames, null, 2));
console.log("Updated games.json!");
