const fs = require('fs');
const chalk = require('chalk')
const validator = require('validator')
// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

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

// const tulisPertanyaan = (pertanyaan) => {
//     return new Promise((resolve, reject) => {
//         rl.question(pertanyaan, (setPertanyaan) => {
//             resolve(setPertanyaan)
//         })
//     })
// }

const loadContact = () => {
    // Baca FIle
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    
    // Convert ke JSON
    const contacts = JSON.parse(file)

    return contacts
}

const simpanContact = (nama, email, noHp ) => {
    const contact = {
        nama,
        email,
        noHp
    }

    // Membaca file
    const contacts = loadContact()

    // Cek Duplikat
    const duplikat = contacts.find((contact) => contact.nama === nama)
    if(duplikat) {
        console.log(chalk.red.inverse.bold('Contact sudah terdaftar, gunakan nama lain!'));
        return false
    }

    // Cek email
    if(email){
        if(!validator.isEmail(email)){
            console.log(chalk.red.inverse.bold('Email tidak valid!'));
            return false
        }
    }

    // Cek nomor hp
    if(!validator.isMobilePhone(noHp, 'id-ID')){
        console.log(chalk.red.inverse.bold('Nomor HP tidak valid!'));
        return false
    }


    // Memasukkan data ke dalam JSON
    contacts.push(contact)

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2));

    console.log(chalk.green.inverse('Terimakasih sudah input data!'));
    // rl.close();
}

// Menampilkan list contact
const listContact = () => {
    const contacts = loadContact()

    console.log(chalk.green.inverse('Daftar Contact:'));

    contacts.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.nama} - ${contact.noHp}`);
    })
}

// Menampilkan detail contact dari nama
const detailContact = (nama) => {
    const contacts = loadContact()

    const findeDetail = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())

    if(!findeDetail){
        console.log(chalk.red.inverse(`Maaf ${nama} Tidak ditemukan!`));
        return false
    } 
    
    console.log(chalk.green.inverse(`Selamat, data ${nama} berhasil ditemukan!`));
    console.log(`Nama: ${findeDetail.nama}`)
    if (findeDetail.email) {
        console.log(`Email: ${findeDetail.email}`)
    }
    console.log(`noHp: ${findeDetail.noHp}`)
}

// Menghapus contact dari nama
const deleteContact = (nama) => {
    const contacts = loadContact()
    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase())

    if(contacts.length === newContacts.length){
        console.log(chalk.red.inverse(`Maaf ${nama} Tidak ditemukan!`));
        return false
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts, null, 2));

    console.log(chalk.green.inverse(`Data ${nama} Berhasil Dihapus!`));
}


module.exports = { simpanContact, listContact, detailContact, deleteContact }