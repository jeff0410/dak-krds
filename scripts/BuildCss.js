const fs = require('fs');
const path = require('path');

const resolveImports = (cssContent, basePath) => {
  const importRegex = /@import\s+["'](.+?)["'];/g;
  let resolvedCss = cssContent;
  
  const imports = [...cssContent.matchAll(importRegex)];
  
  for (const [fullMatch, importPath] of imports) {
    const fullPath = path.join(basePath, importPath);
    
    if (fs.existsSync(fullPath)) {
      const importedContent = fs.readFileSync(fullPath, 'utf8');
      const importedBasePath = path.dirname(fullPath);
      const resolvedImport = resolveImports(importedContent, importedBasePath);
      resolvedCss = resolvedCss.replace(fullMatch, resolvedImport);
    }
  }
  
  return resolvedCss;
};

const srcCssPath = path.join(__dirname, '../src/styles/index.css');
const distCssPath = path.join(__dirname, '../dist/styles.css');

const srcCss = fs.readFileSync(srcCssPath, 'utf8');
const srcBasePath = path.dirname(srcCssPath);

const bundledCss = resolveImports(srcCss, srcBasePath);

fs.writeFileSync(distCssPath, bundledCss);

console.log('CSS bundled successfully to dist/styles.css');
