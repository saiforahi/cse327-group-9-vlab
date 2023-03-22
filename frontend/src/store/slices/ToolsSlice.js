import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { JsonClient } from '../../Config'
import sortBy from 'lodash/sortBy';

const initialState = {
    processors: [],
    sensors: [],
    actuators: [],
    tool_types: [],
    widget_types: [],
}

export const fetchProcessors = createAsyncThunk('tools/fetchProcessors', async () => {
    const response = await JsonClient.get('tools/list/processor/')
    return response.data
})

export const fetchSensors = createAsyncThunk('tools/fetchSensors', async () => {
    const response = await JsonClient.get('tools/list/sensor/')
    return response.data
})

export const fetchActuators = createAsyncThunk('tools/fetchActuators', async () => {
    const response = await JsonClient.get('tools/list/actuator/')
    return response.data
})

export const toolsSlice = createSlice({
    name: 'tools',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchProcessors.fulfilled]: (state, action) => {
            // Add any fetched posts to the array
            state.processors = action.payload
        },
        [fetchSensors.fulfilled]: (state, action) => {
            // Add any fetched posts to the array
            state.sensors = action.payload
        },
        [fetchActuators.fulfilled]: (state, action) => {
            // Add any fetched posts to the array
            state.actuators = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { push_item } = toolsSlice.actions
export default toolsSlice.reducer
