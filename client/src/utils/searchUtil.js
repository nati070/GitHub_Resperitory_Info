const axios = require("axios");

const SERVER_URL_API = "http://localhost:8000/api";

exports.isValidResperitoy = (resperitory) => {
  const regex = /([A-Z | 0-9]+\/[A-Z | 0-9]+)\w/i;
  return regex.test(resperitory) ? true : false;
};

exports.getDataResp = async (respeitory_name) => {
  try {
    const path = SERVER_URL_API + "/get-statistic-resp";
    const json_respeitory = await axios.post(path,{respeitory_name});
    return json_respeitory.data;
  } catch (e) {
    console.error(e);
    return Promise.reject({ err: "problem to fetch data from server" });
  }
};
