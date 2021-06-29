module.exports = class Hero {
    constructor(name, stars, awaken, weapon) {
        this._name = name;
        this._stars = stars;
        this._awaken = awaken;
        this._weapon = weapon;
    }


    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get stars() {
        return this._stars;
    }

    set stars(value) {
        this._stars = value;
    }

    get awaken() {
        return this._awaken;
    }

    set awaken(value) {
        this._awaken = value;
    }

    get weapon() {
        return this._weapon;
    }

    set weapon(value) {
        this._weapon = value;
    }
}
