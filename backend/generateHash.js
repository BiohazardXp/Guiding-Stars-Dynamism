const bcrypt = require('bcryptjs');

const password = 'admin123'; // Change this
const hash = bcrypt.hashSync(password, 10);

console.log('Password:', password);
console.log('Hash:', hash);
console.log('\nUse this SQL:');
console.log(`INSERT INTO users (email, password_hash, role, first_name, last_name, created_at, updated_at) 
VALUES ('admin@guidingstars.com', '${hash}', 'admin', 'Admin', 'User', NOW(), NOW());`);