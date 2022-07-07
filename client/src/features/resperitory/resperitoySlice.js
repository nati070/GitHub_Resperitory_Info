import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const utils = require("../../utils/searchUtil");
export const getResperitory = createAsyncThunk(
  "resperitory/getResperitory",
  async (respeitory_name) => {
    return await utils.getDataResp(respeitory_name);
  }
);

const resperitorySlice = createSlice({
    name : "resperitory",
    initialState: {
        resperitory_data: {},
        status: null
    },
    extraReducers : {
        [getResperitory.pending] : (state,action) => {
            state.status = "loading"
        },
        [getResperitory.fulfilled] : (state,action) =>{
            state.status = "success"
            state.resperitory_data = action.payload
        },
        [getResperitory.rejected] : (state,action) =>{
            state.status = "failed"
        }

    }
})
export default resperitorySlice.reducer;