'use strict';
const Hero = require("../Classes/hero.js");
//let Heroes = require('../json/Heroes.json');
const HeroesFull = require('../json/heroesfull.json');
const Error = require("./util.js");
const PossibleHeroStats = ["as", "atkrange", "aoe", "atk", "hp", "def"];

module.exports = function(textsplit, msg) {
    textsplit.shift();
    //console.log("textsplit: "+textsplit);
    let requiredHeroes = calcHeroStats(msg, textsplit);
    if(requiredHeroes !== false && requiredHeroes !== "wronghero") {
        for (let hero of requiredHeroes) {
            //console.log("MSG SEND");
            if(hero.aoe1 === undefined) {
                if(hero.aoe2 === undefined) {
                    msg.channel.send(`${hero.emoji}` + " <:atk:789195528814592010>`" + numberWithCommas(hero.atk)
                        + "` <:hp:789195530546839572>`" + numberWithCommas(hero.hp)
                        + "` <:def:789195530176954371>`" + numberWithCommas(hero.def)
                        + "` 🚀`" + hero.as
                        + "` 🏹`" + hero.atkrange + "`");
                } else {
                    msg.channel.send(`${hero.emoji}` + " <:atk:789195528814592010>`" + numberWithCommas(hero.atk)
                        + "` <:hp:789195530546839572>`" + numberWithCommas(hero.hp)
                        + "` <:def:789195530176954371>`" + numberWithCommas(hero.def)
                        + "` 🚀`" + hero.as
                        + "` 🏹`" + hero.atkrange
                        + "` <:aoe2:809903562498768927>`" + hero.aoe2 + "`");
                }
            } else if(hero.aoe2 === undefined) {
                msg.channel.send(`${hero.emoji}` + " <:atk:789195528814592010>`" + numberWithCommas(hero.atk)
                    + "` <:hp:789195530546839572>`" + numberWithCommas(hero.hp)
                    + "` <:def:789195530176954371>`" + numberWithCommas(hero.def)
                    + "` 🚀`" + hero.as
                    + "` 🏹`" + hero.atkrange
                    + "` <:aoe1:809903944481767425>`" + hero.aoe1 + "`");
            } else {
                msg.channel.send(`${hero.emoji}` + " <:atk:789195528814592010>`" + numberWithCommas(hero.atk)
                    + "` <:hp:789195530546839572>`" + numberWithCommas(hero.hp)
                    + "` <:def:789195530176954371>`" + numberWithCommas(hero.def)
                    + "` 🚀`" + hero.as
                    + "` 🏹`" + hero.atkrange
                    + "` <:aoe1:809903944481767425>`" + hero.aoe1
                    + "` <:aoe2:809903562498768927>`" + hero.aoe2 + "`");
            }
        }
    } else {
        if(requiredHeroes === "wronghero") {
            msg.channel.send(Error.wrongHero);
            return false;

        } else {
            console.log("Wrong argument");
            msg.channel.send(Error.wrongCommand);
            return false;
        }
    }
}

function calcHeroStats(msg, textsplit) {
    let heroes = [];
    let Heroindex = 0;
    let Runenindex = 0;
    let Teambuffs = false;
    let runen = false;
    let hp = 0;
    let atk = 0;
    let def = 0;
    let atkrange = 0;
    let as = 0;
    let aoe = 0;
    let stars = 0;
    let awaken = 0;

    for (let j = 0; j < textsplit.length; j++) {
        if(isNaN(textsplit[j]) === true) {
            if(checkHero(textsplit[j]) === true) {
                heroes.push(textsplit[j])
            }
        } else if(checkPossibleHeroStats(PossibleHeroStats, textsplit,j) === true) {
            //console.log("stars "+textsplit[j]);
            //console.log("awaken "+textsplit[j+1]);
            if(textsplit[j] > 0 && textsplit[j] < 8 && textsplit[j+1] > 0 && textsplit[j+1] < 8 && textsplit[j].match(/^[0-9]+$/) != null && textsplit[j+1].match(/^[0-9]+$/) != null) {
                stars = textsplit[j];
                awaken = textsplit[j+1];
                Heroindex = j;
                //console.log("stars "+stars+ " awaken "+awaken);
                break;
            } else {
                //console.log("ret true")
                return false;
            }
        } else {
            return false;
        }
    }

    for (let i = Heroindex; i < textsplit.length; i++) {
        if(isNaN(textsplit[i]) === true) {
            if (textsplit[i] == "Runen" || textsplit[i] == "runen") {
                Runenindex = i;
                runen = true;
            } else if (textsplit[i].toLowerCase() == "hp") {
                hp = parseInt(textsplit[i + 1]);
                //console.log("HP: " + textsplit[i+1]);
            } else if (textsplit[i].toLowerCase() == "atk") {
                atk = parseInt(textsplit[i + 1]);
                //console.log("ATK: " + textsplit[i + 1]);
            } else if (textsplit[i].toLowerCase() == "def") {
                def = parseInt(textsplit[i + 1]);
                //console.log("Def: " + textsplit[i + 1]);
            } else if (textsplit[i].toLowerCase() == "atkrange") {
                atkrange = parseInt(textsplit[i + 1]);
                //console.log("Atkrange: " + textsplit[i + 1]);
            } else if (textsplit[i].toLowerCase() == "as") {
                as = parseInt(textsplit[i + 1]);
                //console.log("as: " + textsplit[i + 1]);
            } else if (textsplit[i].toLowerCase() == "aoe") {
                aoe = parseInt(textsplit[i + 1]);
                //console.log("aoe: " + textsplit[i + 1]);
            } else {
                //console.log("FALSE " + textsplit[i + 1]);
                return false;
            }
        }
    }
    return calcherorunenstats(heroes,stars,awaken,hp,atk,def, atkrange, as, aoe);
}

function calcherorunenstats(requiredHeroes, stars, awaken, hp, atk, def, atkrange, as, aoe) {
    if(requiredHeroes.length < 1) {
        return Error.wrongHero;
    } else {
        let newheroes = [];
        for(let reqhero of requiredHeroes) {
            for(let hero of HeroesFull) {
                if(reqhero.toLowerCase() == hero.Name.toLowerCase()) {
                    let runenhp = Math.floor(calcbasestats(hero.Hp, stars, awaken)*calcrunepercent(hp));
                    //console.log("Runenhp: "+runenhp);
                    let runenatk = Math.floor(calcbasestats(hero.Atk, stars, awaken)*calcrunepercent(atk));
                    //console.log("Runenatk: "+runenatk);
                    let runendef = Math.floor(calcbasestats(hero.Def, stars, awaken)*calcrunepercent(def));
                    //console.log("Runendef: "+runendef);
                    let runenatkrange = Math.floor(hero.AtkRange*calcrunepercent(atkrange));
                    let runenas1 = hero.Aps*calcrunepercent(as);
                    let runenas = runenas1.toFixed(2);
                    let runenaoe1 = undefined;
                    let runenaoe2 = undefined;
                    if(hero.Aoe1 !== undefined)
                    {
                        runenaoe1 = Math.floor(hero.Aoe1*calcrunepercent(aoe));
                    }
                    if(hero.Aoe2 !== undefined)
                    {
                        runenaoe2 = Math.floor(hero.Aoe2*calcrunepercent(aoe));
                    }
                    //console.log("TEST333 "+Math.floor(calcbasestats(hero.Aoe, stars, awaken)*calcrunepercent(aoe)));
                    let newhero = new Hero(hero.Name, hero.Emoji,runenhp,runenatk,runendef, runenatkrange, runenas, runenaoe1, runenaoe2, hero.MoveSpeed);
                    newheroes.push(newhero);
                }
            }
        }
        return newheroes;
    }
}

function calcbasestats(value, stars, awaken) {
    let calcvalue = value;
    for(let i = 1; i < stars; i++) {
        calcvalue *= 2;
    }
    for(let i = 1; i <= awaken; i++) {
        calcvalue *= 1.5;
    }
    return calcvalue;
}

function checkHero(name) {
    for(let hero of HeroesFull) {
        if(hero.Name.toLowerCase() === name.toLowerCase()) {
            return true;
        }
    }
    return false;
}

function checkNumber(value) {
    if(isNaN(value) === true) {
        return false;
    }
}

function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calcrunepercent(value) {
    let number = (value /100)+1;
    //console.log("Number "+number);
    return number;
}

function checkPossibleHeroStats(Stats, textsplit, j) {
    for(let stat of Stats) {
        if(stat.toLowerCase() === textsplit[j-1].toLowerCase()) {
            return false;
        }
    }
    return true;
}
