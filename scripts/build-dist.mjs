import { copyFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(fileURLToPath(new URL('../', import.meta.url)));
const distDirectory = join(projectRoot, 'dist');

const publishedFiles = [
  'index.html',
  'robots.txt',
  'sitemap.xml',
  'src/style.css',
  'src/icons.js',
  'src/script.js',
  'assets/computador-768.webp',
  'assets/computador-1536.webp',
  'assets/og-image.png',
  'assets/fonts/inter-latin-variable.woff2',
  'assets/icons/angular.svg',
  'assets/icons/angularjs.svg',
  'assets/icons/bootstrap.svg',
  'assets/icons/cicd.svg',
  'assets/icons/css3.svg',
  'assets/icons/cubo.svg',
  'assets/icons/docker.svg',
  'assets/icons/express.svg',
  'assets/icons/git.svg',
  'assets/icons/github.svg',
  'assets/icons/googlegemini.svg',
  'assets/icons/html5.svg',
  'assets/icons/java.svg',
  'assets/icons/javascript.svg',
  'assets/icons/jquery.svg',
  'assets/icons/mysql.svg',
  'assets/icons/nestjs.svg',
  'assets/icons/nodejs.svg',
  'assets/icons/nosql.svg',
  'assets/icons/oracle.svg',
  'assets/icons/postgresql.svg',
  'assets/icons/react.svg',
  'assets/icons/redis.svg',
  'assets/icons/springai.svg',
  'assets/icons/springboot.svg',
  'assets/icons/springsecurity.svg',
  'assets/icons/sql.svg',
  'assets/icons/tailwindcss.svg',
  'assets/icons/twilio.svg',
  'assets/icons/typescript.svg'
];

rmSync(distDirectory, { recursive: true, force: true });

for (const file of publishedFiles) {
  const source = join(projectRoot, file);
  if (!existsSync(source)) throw new Error(`Arquivo necessário não encontrado: ${file}`);

  const destination = join(distDirectory, file);
  mkdirSync(dirname(destination), { recursive: true });
  copyFileSync(source, destination);
}

console.log(`Build estático gerado em ${relative(projectRoot, distDirectory)}/ com ${publishedFiles.length} arquivos.`);
