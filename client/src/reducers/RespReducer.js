const axios = require('axios')
const utils = require('../utils/searchUtil')


const RespReducer =  async (state = {} , action) =>{
    switch(action.type){
        case "FETCH_RESP_DATA":
            const data_resp =  await utils.getDataResp()
            console.log(data_resp)
            return {...state , data_resp : 1}
        default:
            return state
    }
}

const thunkGetDataResp = (dispatch , getState) =>{


}  

export default RespReducer