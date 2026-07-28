const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, 'stitch_screens');
const pagesDir = path.join(__dirname, 'src', 'pages');

if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
}

const files = fs.readdirSync(screensDir).filter(f => f.endsWith('.html'));

const mappings = {
  '1_shopping_cart.html': 'ShoppingCart',
  '2_product_details.html': 'ProductDetails',
  '3_learning_center.html': 'LearningCenter',
  '4_category_browse.html': 'CategoryBrowse',
  '5_homepage.html': 'Homepage'
};

files.forEach(file => {
  const componentName = mappings[file];
  if (!componentName) return;

  const content = fs.readFileSync(path.join(screensDir, file), 'utf8');
  
  // Extract body
  let bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) return;
  
  let jsx = bodyMatch[1];
  
  // Convert class to className
  jsx = jsx.replace(/class=/g, 'className=');
  // Convert for to htmlFor
  jsx = jsx.replace(/for=/g, 'htmlFor=');
  // Convert style="..." to style={{}}
  jsx = jsx.replace(/style="([^"]+)"/g, (match, p1) => {
    const styleStr = p1.split(';').filter(Boolean).map(s => {
      const parts = s.split(':');
      if (parts.length < 2) return '';
      let key = parts[0].trim();
      let val = parts.slice(1).join(':').trim();
      
      // CamelCase the key
      key = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      return `${key}: "${val}"`;
    }).filter(Boolean).join(', ');
    return `style={{ ${styleStr} }}`;
  });
  
  // Close void tags
  jsx = jsx.replace(/<(img|input|br|hr)([^>]*?)(?<!\/)>/g, '<$1$2 />');
  
  // SVG attributes
  jsx = jsx.replace(/stroke-linecap/g, 'strokeLinecap');
  jsx = jsx.replace(/stroke-width/g, 'strokeWidth');
  jsx = jsx.replace(/stroke-linejoin/g, 'strokeLinejoin');
  jsx = jsx.replace(/fill-rule/g, 'fillRule');
  jsx = jsx.replace(/clip-rule/g, 'clipRule');
  jsx = jsx.replace(/xmlns:xlink/g, 'xmlnsXlink');
  jsx = jsx.replace(/xlink:href/g, 'xlinkHref');
  
  // Remove HTML comments
  jsx = jsx.replace(/<!--[\s\S]*?-->/g, '');
  
  // Remove script tags
  jsx = jsx.replace(/<script[\s\S]*?<\/script>/gi, '');

  const componentCode = `import React from 'react';

export default function ${componentName}() {
  return (
    <>
      ${jsx}
    </>
  );
}
`;

  fs.writeFileSync(path.join(pagesDir, `${componentName}.jsx`), componentCode);
  console.log(`Generated ${componentName}.jsx`);
});
