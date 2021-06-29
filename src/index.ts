import path from "path";
import walk from "walkdir";

function main() {
  const domains = getAllDomains(path.resolve(__dirname, "../lib/domains"));
  console.log(JSON.stringify(domains, null, 2));
}

function getAllDomains(rootDir: string): { [key: string]: boolean } {
  const domains: { [key: string]: boolean } = {};
  walk.sync(rootDir, (path) => {
    if (isDomainFile(path)) {
      const domain = parseSingleDomain(path);
      domains[domain] = true;
    }
  });
  return domains;
}
function parseSingleDomain(path: string): string {
  // src/assets/.../domains/il/co/example.txt => example.co.il
  const trimmedPath = path.replace(/\.txt$/, "");
  const relativePath = trimmedPath.replace(/^.*domains\//, "");
  return relativePath.split("/").reverse().join(".");
}

function isDomainFile(path: string) {
  return path.endsWith(".txt");
}

main();
