import fs from "fs";
import path from "path";

const basePath = path.resolve(__dirname, "../../lib/domains");
console.log(basePath);
function main() {
  const args = process.argv.slice(2);
  if (args.length !== 2) {
    console.error('Usage: node [this script] [domain] "[domain description]" ');
    process.exit(1);
  }

  const [domain, description] = args;

  if (!/^[a-zA-Z.]*$/.test(domain)) {
    console.error(
      "Domain must be in the form of (xxx.)* [means only letters followed by dots]"
    );
    process.exit(1);
  }

  const dirs = domain.split(".").reverse();
  const [fileName] = dirs.splice(-1, 1);

  const targetPath = path.resolve(basePath, ...dirs);

  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  const fullFilePath = path.resolve(targetPath, `${fileName}.txt`);
  console.log("Creating new file: ", fullFilePath);
  fs.writeFileSync(fullFilePath, description);
}

main();
