import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../../data');

export const dbFetch = async (collection) => {
    try {
        const filePath = path.join(DATA_DIR, `${collection}.json`);
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // Create file if it doesn't exist
            await fs.writeFile(path.join(DATA_DIR, `${collection}.json`), JSON.stringify([]));
            return [];
        }
        throw error;
    }
};

export const dbSave = async (collection, data) => {
    const filePath = path.join(DATA_DIR, `${collection}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

export const initializeData = async () => {
    // Check if data directory exists
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR);
    }
}
