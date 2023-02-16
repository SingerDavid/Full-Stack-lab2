class Temp {
    constructor(id, first, last, email, note, date) {
        this.id = id;
        this.first = first;
        this.last = last;
        this.email = email;
        this.note = note;
        this.date = date;
    }
}

//default export - could do exports.Temp = etc...
module.exports = Temp