import Realm from "realm";
class Selected extends Realm.Object {}

Selected.schema = {

    name: "Selected",
    bsonType: "object",
    primaryKey: "_id",
    required: ["_id"],
    properties: {
      _id:  "objectId" ,
        history: "History?"
      }

};
  


  export default Selected