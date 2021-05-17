import realmInstance from "../RealmInstance";
import Realm from "realm"

const type="History"

export function deleteAll() {

    realmInstance.write(() => {
      
        realmInstance.delete(realmInstance.objects(type));
    });
}

export function deleteOne( id) {
    var result = getOne(type, id);
    if (result) {
        realmInstance.write(() => {
            realmInstance.delete(result);
        })
    }
    return result
}

export function getAll() {
    return realmInstance.objects(type);
}

export function getOne( id) {
    var result = realmInstance.objects(type).filtered("_id == $0", id)
    return result.length == 1 ? result[0] : undefined;
}

export function createOne( data) {
    var result = undefined;
    realmInstance.write(() => {
        result = realmInstance.create(type, { _id: new Realm.BSON.ObjectID(), ...data });
    })
    return result;
}

export function updateOne(type, data) {
    var result = undefined;
    realmInstance.write(() => {
        result = realmInstance.create(
            type,
            data,
            "modified"
        );
    })
    return result;
}

