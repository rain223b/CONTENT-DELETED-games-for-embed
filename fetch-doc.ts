import fs from 'fs';

async function fetchDoc() {
  try {
    const res = await fetch("https://docs.google.com/document/d/1G8nigMVhqT5IyiidAKtARytDWbg4Orgws-z-dXEsDn4/export?format=txt");
    const text = await res.text();
    fs.writeFileSync('doc.txt', text);
    console.log("Success! File saved to doc.txt. First 100 chars: ", text.substring(0, 100));
  } catch (e) {
    console.error(e);
  }
}

fetchDoc();
