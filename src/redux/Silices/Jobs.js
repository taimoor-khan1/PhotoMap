import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "../../constants";
import utils from "../../utils";
import JobServices from "../services/Job.servies";
const initialState = {
  RecentJobsData: null,
  AppliedJobsData: null,
  BestJobsData: null,
};

export const RecentJobs = createAsyncThunk(
  CONSTANTS.API_CALLS.RECENT_JOBS,
  async (dunnydata, thunk) => {
    try {
      const response = await JobServices.RecentJobs();
      thunk.dispatch(JobSlice.actions.saveRecentJobData(response.data));
      return response.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  }
);
export const BestJobs = createAsyncThunk(
  CONSTANTS.API_CALLS.BEST_JOBS,
  async (dunnydata, thunk) => {
    try {
      const response = await JobServices.BestJobs();
      thunk.dispatch(JobSlice.actions.SaveBestJobData(response.data));
      return response.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  }
);
export const AppliedJob = createAsyncThunk(
  CONSTANTS.API_CALLS.APPLIED_JOB_LIST,
  async (dunnydata, thunk) => {
    try {
      const response = await JobServices.AppliedJobs();
      thunk.dispatch(JobSlice.actions.AppliedJobData(response.data));
      return response.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  }
);
const JobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    saveRecentJobData: (state, action) => {
      state.RecentJobsData = action.payload;
    },
    AppliedJobData: (state, action) => {
      state.AppliedJobsData = action.payload;
    },
    SaveBestJobData: (state, action) => {
      state.BestJobsData = action.payload;
    },
  },
});

export const { saveRecentJobData } = JobSlice.actions;
export default JobSlice.reducer;
