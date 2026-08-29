import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.join(rootDir, 'assets');
const targetDir = path.join(rootDir, 'public', 'assets');

if (fs.existsSync(sourceDir)) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const files = fs.readdirSync(sourceDir);
  files.forEach((file) => {
    const srcPath = path.join(sourceDir, file);
    const destPath = path.join(targetDir, file);
    if (fs.statSync(srcPath).isFile()) {
      fs.copyFileSync(srcPath, destPath);

      // Handle space in filename like "srgi front.png" -> "srgi-front.png" & "srgi_front.png"
      if (file.includes(' ')) {
        const cleanNameUnderscore = file.replace(/ /g, '_');
        const cleanNameHyphen = file.replace(/ /g, '-');
        fs.copyFileSync(srcPath, path.join(targetDir, cleanNameUnderscore));
        fs.copyFileSync(srcPath, path.join(targetDir, cleanNameHyphen));
      }
    }
  });

  console.log('Successfully synced root assets to public/assets directory for deployment!');
}
