import crypto from 'crypto'
import fs from 'fs'
 
function generateRandomString(length) {
  return crypto.randomBytes(length).toString('hex');
}
 
const secretKey = generateRandomString(32);
 
try {
    fs.writeFileSync('.env', `\nSECRET_KEY="${secretKey}"\n`, { flag: 'a' });
    console.log("String generated:", secretKey);
} catch (error) {
    console.error('Error writing file:', error);
}