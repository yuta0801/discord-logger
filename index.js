require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
const MongoClient = require('mongodb').MongoClient
let db

MongoClient.connect('mongodb://localhost', (err, database) => {
  if (err) throw err
  db = database.db('discord')
  client.login(process.env.TOKEN)
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('raw', data => {
  if (data.op !== 0) return
  db.collection(data.t).insertOne(data.d, err => {
    if (err) console.log(err, typeof data.d, data.d)
  })
})

process.on('unhandledRejection', console.log)
