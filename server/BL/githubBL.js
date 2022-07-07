const githubDal = require("../dals/githubDal");

// return the organztion name , resperitory name , stars , number of issues , total contibuter , total number of additions and deletions pushed to repository  , list top 5 contributors name and they commit activity
exports.getGithubData = async (respeitory_name) => {
  try {
    const dataRepositoryInfo = await githubDal.getRepositoryInfo(respeitory_name);

    // get total number of additions and deletions pushed to repository #//
    const ADDITION_INDEX = 1;
    const DELETION_INDEX = 2;
    const additionsAndDeletionData =
      await githubDal.getAdditionAndDeletionPushedResp(respeitory_name);
    const LAST_INDEX_DATA = additionsAndDeletionData.length - 2;
    const additionsAndDeletionRecentWeek =
      additionsAndDeletionData[LAST_INDEX_DATA]; //get last week data
  
    // if the respertitory is new 
    const totalAdditionsAndDeletionRecentWeek = (additionsAndDeletionRecentWeek) ? 
      (additionsAndDeletionRecentWeek[ADDITION_INDEX] +
      additionsAndDeletionRecentWeek[DELETION_INDEX])  : 0 ;
      

    // list of all contributors
    const listAllContributorsCommitData =
      await githubDal.getListContributorCommitActivity(respeitory_name);
    // get list 5 contributors name and they commit activity
    const fiveContributorsData = (listAllContributorsCommitData.length != 0) ? listAllContributorsCommitData
      .slice(0, 5)
      .map((ele) => {
        const weeks = ele["weeks"];
        const recentWeek = weeks[weeks.length - 2];
        let name = ele["author"]["login"]
        if(ele["author"]["name"]){
          name = ele["author"]["name"]
        }
        return {
          avatar: ele["author"]["avatar_url"],
          name: name,
          added: recentWeek["a"],
          removed: recentWeek["d"],
        };
      }) : [];
     
    // return json with all the relevant data

    //check if organization exist
    let  organztionName = "None"
    if(dataRepositoryInfo["organization"]){
      organztionName = dataRepositoryInfo["organization"]["login"]
    }

    return {
      organztion_name: organztionName,
      respeitory_name: dataRepositoryInfo["full_name"],
      stars: dataRepositoryInfo["stargazers_count"],
      issues: dataRepositoryInfo["open_issues"],
      number_of_subscribers: dataRepositoryInfo["subscribers_count"],
      total_contributors: listAllContributorsCommitData.length,
      total_additions_and_deletion_recent_week:
        totalAdditionsAndDeletionRecentWeek,
      five_contributors_data: fiveContributorsData,
    };
  } catch (e) {
    console.error(e)
    console.error("getGithubData(), problem with the business layer data");
    return Promise.reject("error to get all statistic for a given Github repository ")
  }
};
