import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { JsonClient } from '../../Config'
import sortBy from 'lodash/sortBy';

const initialState = {
    data: [],
    dates: [],
    times: [],
    status: 'idle',
    error: ''
}

export const fetchSchedules = createAsyncThunk('schedule/fetchSchedules', async () => {
    const response = await JsonClient.get('schedules/list/')
    return response.data
})

export const fetchDates = createAsyncThunk('schedule/fetchDates', async () => {
    const response = await JsonClient.get('schedules/list/dates/')
    console.log('dates',response.data[0])
    return response.data
})

export const fetchTimes = createAsyncThunk('schedule/fetchTimes', async () => {
    const response = await JsonClient.get('schedules/list/times/')
    return response.data
})

export const schedulesSlice = createSlice({
    name: 'schedules',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchSchedules.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchSchedules.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            // Add any fetched posts to the array
            state.data = action.payload
        },
        [fetchSchedules.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [fetchDates.fulfilled]: (state, action) => {
           
            // Add any fetched posts to the array
            state.dates = action.payload
        },
        [fetchTimes.fulfilled]: (state, action) => {
           
            // Add any fetched posts to the array
            state.times = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { push_item } = schedulesSlice.actions
export default schedulesSlice.reducer
