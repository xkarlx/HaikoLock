

import Realm from "realm";
import History from "./schema/HistorySchema"


let realmInstance = new Realm({schema: [History.schema], schemaVersion: 1});

export default realmInstance
