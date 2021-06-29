'use strict';

module.exports = function(textsplit, msg) {
    msg.channel.send("__**Bot provides the following commands:**__ \n " +
        "**+calc** <hero> <stars> <awaken> <hp,def,atk or atkrange> <Number> -> *calculate Heroes* \n " +
        "**+rune** <primary> <star> <level> <secondarys> -> *calculate Runes* \n" +
        "**+token** <number> -> *update your tokens (BOL Member only)* \n"+
        "**+ranking** -> shows tokenranking (BOL Member only)* \n"+
        "**+raid** -> <boss> <Level> <Buff> <Notiz>(ohne Leerzeichen) -> *neuen Eintrag hinzufügen (BOL R4 only)* \n"+
        "**+raid** -> <boss> <Level> -> *Eintrag abfragen (BOL R4 only)* \n"+
        "**+angrygerman** -> *<daily> oder <ranking> -> *Daily oder Ranking* \n"+
        "**+dd** -> <boss> <lvl> <buff> <damagedone> (optional: <notice>)-> *inputs normdamage (BOL Member only)* \n"+
        "**+status** -> check Bot online Status*");
}
