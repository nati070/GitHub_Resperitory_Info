const axios = require('axios');
const URL_API = 'https://api.github.com/repos/'

// all the relavent API data of respeitory  
exports.getRepositoryInfo = async (respeitory_name)=>{
    try{
        const jsonData = await axios.get(URL_API + respeitory_name)
        return jsonData['data']
    }
    catch{
        console.error("getRepositoryInfo(), problem to fetch data respritory")
        return Promise.reject("error to get Resp info")
    }
}

//all the addition and deletion of resperitory
exports.getAdditionAndDeletionPushedResp = async (respeitory_name)=>{
    try{
        const statsURL = URL_API + respeitory_name + '/stats/code_frequency'
        const jsonData = await axios.get(statsURL)
        return jsonData['data']
    }
    catch{
        console.error("getAdditionAndDeletionPushedResp(), problem to fetch data statscode frequency")
        return Promise.reject("error to get addition and deletion of resperitory")
    }
} 

//get all contributors activitys
exports.getListContributorCommitActivity= async (respeitory_name)=>{ 
    try{
        const statsURL= URL_API + respeitory_name + '/stats/contributors'
        const jsonData = await axios.get(statsURL)
        return jsonData['data']
    }
    catch{
        console.error("getListContributorCommitActivity(), problem to fetch data stats contributors")
    }
}