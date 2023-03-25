const { demandOption } = require("yargs");
const yargs = require("yargs");
const { simpanContact, listContact, detailContact, deleteContact } = require("./contacts");

// const contacts = require('./contacts')
// const { tulisPertanyaan, simpanContact } = require('./contacts')

// const main = async () => {
//     const nama = await tulisPertanyaan('Masukkan nama anda : ')
//     const email = await tulisPertanyaan('Masukkan email anda: ')
//     const noHp = await tulisPertanyaan('Masukkan nomor hp anda: ')

//     simpanContact(nama, email, noHp)
// }

// main()

// console.log(yargs.argv);

yargs.command({
    command: 'add',
    describe: 'Menambahkan contact baru',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string'
        },
        noHP: {
            describe: 'Nomor handphone', demandOption: true,
            type: 'string'
        }
    }, handler(argv) {
        simpanContact(argv.nama, argv.email, argv.noHP)
    }
}).demandCommand();

// Menampilkan daftar semua nama & no hp contact
yargs.command({
    command: 'list',
    describe: 'Menampilkan semua nama & no HP contact',
    handler() {
        listContact();
    }
})

// Menampilkan detail contact
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail dari sebuah contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        detailContact(argv.nama)
    }
})

// Mengahpus contact berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus sebuah contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        deleteContact(argv.nama)
    }
})

yargs.parse();
