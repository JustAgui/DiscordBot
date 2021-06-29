'use strict';
const Discord = require('discord.js');
const { Users } = require('./Database/dbtoken');
const currency = new Discord.Collection();
const angrygerman = require("./Commands/angrygermanupdate.js");
require('dotenv').config();

const client = new Discord.Client({partials: ['MESSAGE', 'REACTION']});

client.on('ready', async() => {
    const storedBalances = await Users.findAll().catch(err => console.error(err));
    if(storedBalances) {
        storedBalances.forEach(b => currency.set(b.user_id, b));
        currency.forEach(b => client.users.fetch(b.user_id));
    }

    console.log(`Logged in as ${client.user.tag}!`);
});

const commands = require("./commands")

client.on('message', commands);

client.on('messageReactionAdd', (reaction, user) => {
    if(reaction.message.partial) {
        if(reaction.emoji.name === "angrygerman") {
            angrygerman(reaction.message, "reaction");
        }

    } else {
        if(reaction.emoji.name === "angrygerman") {
            angrygerman(reaction.message, "reaction");
        }
    }
});
/*
client.on('messageReactionRemove', (reaction, user) => {
    if(reaction.message.partial) {
        console.log("PARTIAL reaction removed")
    } else {
        console.log('a reaction has been removed');
    }
});*/

client.login(process.env.TESTTOKEN);
//client.login(process.env.BOLTOKEN);
