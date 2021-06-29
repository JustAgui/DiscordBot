module.exports = class Hero {
    constructor(name, emoji, hp, atk, def, atkrange, as, aoe1, aoe2, movespeed) {
        this._name = name;
        this._emoji = emoji;
        this._hp = hp;
        this._atk = atk;
        this._def = def;
        this._atkrange = atkrange;
        this._as = as;
        this._aoe1 = aoe1;
        this._aoe2 = aoe2;
        this._movespeed = movespeed;
    }


    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get emoji() {
        return this._emoji;
    }

    set emoji(value) {
        this._emoji = value;
    }

    get hp() {
        return this._hp;
    }

    set hp(value) {
        this._hp = value;
    }

    get atk() {
        return this._atk;
    }

    set atk(value) {
        this._atk = value;
    }

    get def() {
        return this._def;
    }

    set def(value) {
        this._def = value;
    }

    get movespeed() {
        return this._movespeed;
    }

    set movespeed(value) {
        this._movespeed = value;
    }

    get atkrange() {
        return this._atkrange;
    }

    set atkrange(value) {
        this._atkrange = value;
    }

    get as() {
        return this._as;
    }

    set as(value) {
        this._as = value;
    }

    get aoe1() {
        return this._aoe1;
    }

    set aoe1(value) {
        this._aoe1 = value;
    }

    get aoe2() {
        return this._aoe2;
    }

    set aoe2(value) {
        this._aoe2 = value;
    }
}
