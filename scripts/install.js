const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env');
const requiredVars = [
  'ACCESS_TOKEN=your_access_token_here'
];

let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

requiredVars.forEach((line) => {
  const key = line.split('=')[0];
  const regex = new RegExp(`^${key}=.*$`, 'm');
  if (!regex.test(envContent)) {
    envContent += (envContent.endsWith('\n') || envContent === '' ? '' : '\n') + line + '\n';
  }
});

fs.writeFileSync(envPath, envContent.trim() + '\n', 'utf8');
console.log('.env file created/updated with required keys.');