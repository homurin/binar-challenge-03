import { dirname } from "path";
import { fileURLToPath } from "url";
import { resolve } from "path";
const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

console.log("resolve()");
console.log(resolve());
console.log("__dirname");
console.log(__dirname);
