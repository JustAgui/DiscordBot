'use strict';
const { Users } = require('../Database/dbtoken');
const Error = require("./util.js");

Reflect.defineProperty(Users, 'add', {
    /* eslint-disable-next-line func-name-matching */
    value: async function add(user,id, amount) {

        if (user) {
            user.balance = Number(amount);
            return user.save();
        }
        const newUser = await Users.create({ user_id: id, balance: amount });
        return newUser;
    },
});

module.exports = async function(textsplit, msg) {
    textsplit.shift();
    console.log("TOKEN "+textsplit);
    if(textsplit.length == 0) {
        const user = await Users.findOne({where: {user_id: msg.author.id}}).catch(err => console.error(err));
        msg.channel.send("Du hast `" + user.balance + "` <:token:504263171977117706>");
    }
    else if(textsplit.length == 1 && textsplit[0].match(/^[0-9]+$/) != null) {
        if(textsplit[0].length > 4) {
            msg.channel.send("Number too high. Please enter your current token value.");
            return;
        }

        const user = await Users.findOne({ where: { user_id: msg.author.id } }).catch(err => console.error(err));
        Users.add(user, msg.author.id, textsplit[0]).catch(err => console.error(err));
        msg.channel.send("<:token:504263171977117706> `"+textsplit[0]+"`");

    } else {
        msg.channel.send(Error.wrongCommand);
        return false;
    }
}
