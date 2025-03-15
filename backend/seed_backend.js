import fs from 'fs';
import path from 'path';

const typesFile = path.join(process.cwd(), 'src/features/catalog/types.ts');
const content = fs.readFileSync(typesFile, 'utf-8');

// Use regex to extract MOCK_PRODUCTS array content
const match = content.match(/const MOCK_PRODUCTS: Product\[\] = (\[[\s\S]*?\]);/);
if (match) {
    let jsonStr = match[1];
    // Remove TS type markers if any (none expected in the raw array)
    // Actually the array is valid JS if we remove comments and trailing commas
    // but the easiest is to just use a regex to clean up common TS syntax in the object

    // Convert the string to a valid JSON (simplified)
    // In this case, the source looks very close to JSON except for keys without quotes and some trailing commas
    // Let's use a safer approach: evaluate it in a sandbox or just manually clean

    // Manual cleaning for this specific format:
    jsonStr = jsonStr
        .replace(/\/\/.*$/gm, '') // Remove comments
        .replace(/id:/g, '"id":')
        .replace(/name:/g, '"name":')
        .replace(/description:/g, '"description":')
        .replace(/price:/g, '"price":')
        .replace(/image:/g, '"image":')
        .replace(/category:/g, '"category":')
        .replace(/brand:/g, '"brand":')
        .replace(/stock:/g, '"stock":')
        .replace(/isLatest:/g, '"isLatest":')
        .replace(/,\s*\]/g, ']') // Trailing comma in array
        .replace(/,\s*\}/g, '}'); // Trailing comma in object

    try {
        const products = JSON.parse(jsonStr);
        fs.writeFileSync(path.join(process.cwd(), 'server/data/products.json'), JSON.stringify(products, null, 2));
        console.log(`Seeded ${products.length} products`);
    } catch (e) {
        console.error('Failed to parse products:', e.message);
    }
} else {
    console.error('Could not find MOCK_PRODUCTS in types.ts');
}
