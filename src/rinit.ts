import fs from 'fs';

export function emptyDirSync(path: string) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(file => {
      const curPath = `${path}/${file}`;
      const isDirectory = fs.lstatSync(curPath).isDirectory();
      isDirectory ? emptyDirSync(curPath) : fs.unlinkSync(curPath);
    });
    fs.rmdirSync(path);
  }
}

export function rinit() {
  emptyDirSync('node_modules');
  console.log('Empty node_modules', '=>', 'done');
}
