import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Running IntelliRank Preflight Check...');

// 1. Check Node Version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0], 10);

if (majorVersion < 16) {
    console.error('❌ Error: Node.js version 16 or higher is required.');
    console.error(`Current version: ${nodeVersion}`);
    process.exit(1);
}
console.log('✅ Node.js version is compatible.');

// 2. Check for node_modules
if (!fs.existsSync('node_modules')) {
    console.warn('⚠️ Warning: node_modules folder not found.');
    console.warn('Please run: npm install');
} else {
    console.log('✅ node_modules found.');
}

// 3. Check for Tailwind configuration
if (fs.existsSync('tailwind.config.js') || fs.existsSync('tailwind.config.cjs')) {
    console.log('✅ Tailwind CSS configuration detected.');
}

console.log('✨ Preflight complete. You are ready to run: npm run dev');
