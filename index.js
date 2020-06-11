var crypto = require('crypto')

var adv = 'F0 41 42 17 7B 30 1F E5 30 38 A4 9A 0C 5A 2F DA';

var key = Buffer.from('E153E5A7FB3349599A5B6DFECC19410D', 'hex');
var encrypted=Buffer.from(adv.replace(/ /g, ''),'hex')

decipher = crypto.createDecipheriv("aes-128-ecb", key, '')
decipher.setAutoPadding(false)
result = decipher.update(encrypted).toString('hex');
result += decipher.final().toString('hex');

var tmp = result.substring(0, 12);
var mac = tmp.match(/.{1,2}/g).reverse().join("");

console.log("result\t: " + result);
console.log("mac\t: " + mac);
console.log("temp\t: " + result.substring(14, 18));
console.log("hum\t: " + result.substring(18, 22));
