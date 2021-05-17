import Realm from "realm";
class History extends Realm.Object {}

History.schema = {

    name: "History",
    bsonType: "object",
    primaryKey: "_id",
    required: ["_id", "key","readDate","selected"],
    properties: {
      _id:  "objectId" ,
      key:  "string" ,
      readDate: "date",
      selected: "bool"
      }

};
  


  export default History