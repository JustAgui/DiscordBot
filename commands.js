"use strict"
const Discord = require('discord.js');
const { Users } = require('./Database/dbtoken');
const calc = require("./Commands/calc.js");
const token = require("./Commands/token.js");
//const testsheets = require("./Commands/testsheets.js");
//const sheet = require("./test.js");
const rune = require("./Commands/rune.js");
const help = require("./Commands/help.js");
const raid = require("./Commands/raid.js");
const angrygermanupdate = require("./Commands/angrygermanupdate.js");
const angrygerman = require("./Commands/angrygerman.js");
const dd = require("./Commands/dd.js"); //dd = damagedealer

const Prefix = '+';
const BOLMemberID = "504401336058642443";
const BOLR4ID = "633662800195223552";
const Error = require("./Commands/util.js");
const currency = new Discord.Collection();
const spreadsheetID = "19MRQlGPUo66sHeDT4M1EhrkMfTdrJBg-hXxj_qXzEWk";

const commands = {
    calc, token, rune, help, raid, angrygermanupdate, angrygerman, dd
}
//<:angrygerman:816427180627460117
//<:angrygerman:631265089818984448>
module.exports = async function (msg) {
    if (msg.channel.type != 'text' || msg.author.bot) {
        return;
    } else {
        if(msg.content.includes("<:angrygerman:631265089818984448>")) {
            commands["angrygermanupdate"](msg, "message");
        }
    }

    if(msg.content.startsWith(Prefix)) {
        let text = msg.content.substr(msg.content.indexOf(Prefix)+1);
        let func = text.split(' ')[0];
        let textsplit = text.split(' ');
        console.log("before shift: "+textsplit);
        if(func === "calc") {
            commands[func](textsplit, msg);

        } else if(func === "token" || func === "Token" || func === "tokens") {
            if(msg.member.roles.cache.has(`${BOLMemberID}`)) {
                commands[func](textsplit, msg);
            } else {
                msg.channel.send(Error.nopermission);
            }

        } else if(func === "ranking") { //func.includes("ranking")
           if(msg.member.roles.cache.has(`${BOLMemberID}`)) {
                await updateRanking();

                await msg.channel.send(
                    currency.sort((a, b) => b.balance - a.balance)
                        //.filter(user => client.users.cache.has(user.user_id))
                        .first(100)
                        .map((user, position) => `${position + 1}.\t${user.balance} Tokens - ${getusername(user,msg)}`)
                        .join('\n'),
                    { code: true }
                );
                const user = await Users.findOne({ where: { user_id: msg.author.id } });
                let alltokens = await user.getSum();
                msg.channel.send("Summe: "+alltokens[0].total+" Tokens", { code: true });
            } else {
                msg.channel.send(Error.noPermission);
            }
        } else if(func === "status") {
            msg.channel.send("Hello 😉");
        } else if(func === "sheet") {
            commands[func](spreadsheetID);
        } else if(func === "rune") {
            commands[func](textsplit, msg);
        } else if(func === "raid") {
           if(msg.member.roles.cache.has(`${BOLR4ID}`)) {
                commands[func](textsplit, msg);
           } else {
                msg.channel.send(Error.noPermission);
           }
        }
        else if(func === "help") {
            commands[func](textsplit, msg);
        } else if(func === "angrygerman") {
            commands[func](textsplit, msg);
        } else if(func === "dd") {
            if(msg.member.roles.cache.has(`${BOLMemberID}`)) {
                commands[func](textsplit, msg);
            } else {
                msg.channel.send(Error.noPermission);
            }
        } else {
            msg.channel.send(Error.wrongcommand);
        }
    }
}

function getusername(user, msg) {

    try {
        return msg.guild.members.cache.get(`${user.user_id}`).user.username;
   } catch (error) {
        console.error(error);
    }
}

async function updateRanking(textsplit) {
    const storedBalances = await Users.findAll();
    storedBalances.forEach(b => currency.set(b.user_id, b));
}
