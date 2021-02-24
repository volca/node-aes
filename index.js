var crypto = require('crypto')


var adv = [50, 160, 82, 251, 38, 27, 97, 227, 180, 220, 124, 103, 254, 125, 218, 13];
var encrypted = Buffer.from(adv);

encrypted = Buffer.from('DC2CFA80A8D7B569DEAB18D3BDBA1128', 'hex');

//var adv = '2D D6 FC 46 62 AA 6E 7D 0A 57 FE 85 93 F8 DE 2D';
//var encrypted=Buffer.from(adv.replace(/ /g, ''),'hex')
var key = Buffer.from('E153E5A7FB3349599A5B6DFECC19410D', 'hex');

decipher = crypto.createDecipheriv("aes-128-ecb", key, '')
decipher.setAutoPadding(false)
result = decipher.update(encrypted).toString('hex');
result += decipher.final().toString('hex');
decryptedHex = result.toUpperCase();

var tmp = result.substring(0, 12);
var mac = tmp.match(/.{1,2}/g).reverse().join("");

let toShort = number => {
    const int16 = new Int16Array(1)
    int16[0] = number
    return int16[0]
};

let tempStr = result.substring(14, 18);
let temp = parseInt(tempStr.match(/.{1,2}/g).reverse().join(""), 16);

console.log("result\t: " + result);
console.log("mac\t: " + mac);
console.log("temp\t: " + tempStr + "\tparsed\t: " + toShort(temp) / 8);
console.log("hum\t: " + result.substring(18, 22));

// encrypt data
var newDecrypted = Buffer.from(decryptedHex,'hex');
cipher = crypto.createCipheriv("aes-128-ecb", key, '')
cipher.setAutoPadding(false)
result = cipher.update(newDecrypted).toString('hex');
result += cipher.final().toString('hex');
console.log("enc\t: " + result);
