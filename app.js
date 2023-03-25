const { rejects } = require('assert');
const fs = require('fs');

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Membuat folder data jika tidak ada
const dirPath = './data'
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
}

// Membuat file contact JSON jika belum ada
const dataPath = './data/contacts.json'
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8')
}

const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, reject) => {
        rl.question(pertanyaan, (setPertanyaan) => {
            resolve(setPertanyaan)
        })
    })
}

const main = async () => {
    const nama = await tulisPertanyaan('Masukkan nama anda : ')
    const email = await tulisPertanyaan('Masukkan email anda: ')
    const noHp = await tulisPertanyaan('Masukkan nomor hp anda: ')

    const contact = {
        nama,
        email,
        noHp
    }
    // Baca FIle
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    // Convert ke JSON
    const contacts = JSON.parse(file)

    // Memasukkan data ke dalam JSON
    contacts.push(contact)

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2));

    console.log('Terimakasih sudah input data!');
    rl.close();
}

main()