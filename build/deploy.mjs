import { resolve } from 'node:path';
import ghPages from 'gh-pages';

const environment = process.argv[2];

if (!['staging', 'production'].includes(environment)) {
  throw new Error('Expected deployment environment: staging or production');
}

// Cached HTML and open tabs can still reference assets from earlier builds.
// Replace other files normally so removed pages and data do not remain public.
ghPages.publish(resolve(`dist-${environment}`), {
  branch: `deployed-${environment}`,
  remove: ['**/*', '!assets/**'],
}, (error) => {
  if (error) {
    console.error(error);
    process.exitCode = 1;
  }
});
