import realmInstance from "../RealmInstance";
import Realm from "realm"

const type="History"
const selectedType = "Selected"

export function getJSON(object){
    return JSON.parse(JSON.stringify(object))
}

export function deleteAll() {

    realmInstance.write(() => {
        realmInstance.delete(realmInstance.objects(selectedType));
        realmInstance.delete(realmInstance.objects(type));
    });
}

export function deleteOne( id) {
    var result = getOne(type, id,false);
    var savedResult=getJSON(result)
    if (result) {
        realmInstance.write(() => {
            realmInstance.delete(result);
        })        
    }
    var selectedTypeInstance=undefined
    var selectedTypes=realmInstance.objects(selectedType)

    if(selectedTypes.length==1){
        selectedTypeInstance= getJSON(selectedTypes[0])
    }

    return {history:savedResult,selected:getJSON(selectedTypeInstance)}
}

export function getAll() {
    var selectedTypeInstance=undefined
    var selectedTypes=realmInstance.objects(selectedType)
    if(selectedTypes.length==1){
        selectedTypeInstance= getJSON(selectedTypes[0])
    }
    return {history: getJSON(realmInstance.objects(type)), selected: selectedTypeInstance};
}

export function getOne(type, id,json=true) {
   
    if(typeof(id)!=="string"){
        id= String(id)
    }
   

    var result = realmInstance.objectForPrimaryKey( type, new Realm.BSON.ObjectId(id))   
    if(json){
        return result  ? getJSON(result) : undefined;
    }else{
        return result ? result : undefined;
    }
    
}

export function createOne( data) {
    var result = undefined;
    var selectedTypeInstance = undefined;
    var selected = data.selected
    delete data.selected
    realmInstance.write(() => {
        result = realmInstance.create(type, { _id: new Realm.BSON.ObjectId(), ...data });
    })
    if(selected){
        selectedTypeInstance=createOrUpdateSelected(result)
    }

    return {history:getJSON(result),selected:getJSON(selectedTypeInstance)}
}

export function updateOne( data) {
    var data = {...data,_id:new Realm.BSON.ObjectId(data._id)}
    var result = undefined;
    var selectedTypeInstance = undefined;
    var selected = data.selected
    delete data.selected
    realmInstance.write(() => {
        result = realmInstance.create(
            type,
            data,
            "modified"
        );
    })
    if(selected){
        selectedTypeInstance=createOrUpdateSelected(result)
    }

    return {history:getJSON(result),selected:getJSON(selectedTypeInstance)}
}



export function createOrUpdateSelected(historyObject){
    var selectedTypeInstance= undefined
    var selectedTypes=realmInstance.objects(selectedType)
    if(selectedTypes.length==0){
        realmInstance.write(() => {
            selectedTypeInstance = realmInstance.create(selectedType, { _id: new Realm.BSON.ObjectID(), history: historyObject });
        })
    }else{
        realmInstance.write(() => {
            selectedTypeInstance = realmInstance.create(selectedType, { _id: selectedTypes[0]._id, history: historyObject },"modified");
        })
        
    }

    return selectedTypeInstance

}
