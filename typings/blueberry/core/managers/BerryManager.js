export class BerryManager {
    static get berries() {
        return BerryManager._berries;
    }
    static setBerries(berries) {
        BerryManager._berries = berries;
    }
    static addBerry(berry) {
        BerryManager._berries.push(berry);
    }
    static removeBerry(berry) {
        var idx = BerryManager._berries.indexOf(berry);
        if (idx > -1) {
            BerryManager._berries.splice(idx, 1);
        }
    }
}
BerryManager._berries = [];
