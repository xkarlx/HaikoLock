import { createOne, deleteAll, deleteOne, getAll, updateOne,getOne } from "../../database/dataBasehandler/HistoryHandler"


export function deleteCompleteHistory(){

    return (dispatch) => {
        deleteAll()
        dispatch({type:"DELETE_COMPLETE_HISTORY"})
    }
    
}

export function setHistoryAsSelected(id){
    var historyJSON = getOne("History",id,true);
    return (dispatch) =>{
        
        var result =updateOne({...historyJSON,selected:true}) 
       
        dispatch({type:"UPDATE_HISTORY",payload:result})
    }

}

export function deleteHistory(id){
    return (dispatch) => {
        var result =deleteOne(id)
        dispatch({type:"DELETE_HISTORY",payload: result })
    }
} 

export function getHistory(){
    return (dispatch) => {
        var result=getAll()
        dispatch({type:"SET_HISTORY",payload:result})
    }
    
}


export function createHistory(data){
    return (dispatch) => {
        var result=createOne(data)
        dispatch({type:"ADD_HISTORY",payload:result})
    }
}

export function updateHistory(data){   
    return (dispatch) => {
        var result=updateOne(data)
        dispatch({type:"UPDATE_HISTORY",payload:result})
    }
}