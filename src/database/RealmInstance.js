

import Realm from "realm";
import History from "./schema/HistorySchema"
import Selected from "./schema/SelectedSchema";


let realmInstance = new Realm({schema: [History.schema,Selected.schema], schemaVersion: 1});

export default realmInstance
