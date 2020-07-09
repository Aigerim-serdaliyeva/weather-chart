import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

const SET_TEMPERATURE_DATA = "SET_TEMPERATURE_DATA";
const SET_PRECIPITATION_DATA = "SET_PRECIPITATION_DATA";
const SET_START_YEAR = "SET_START_YEAR";
const SET_END_YEAR = "SET_END_YEAR";
const SET_IS_TEMPERATURE_SHOWN = "SET_IS_TEMPERATURE_SHOWN";


import { parseStringToDate, getYearAverageData, getMonthAverageData } from '../services/utiles';

export const store = new Vuex.Store({
    state: {
        temperatureData: [],
        precipitationData: [],
        startYear: 1880,
        endYear: 2006,
        isTemperatureShown: true
    },

    getters: {
        parsedData: ({ temperatureData, precipitationData, isTemperatureShown, startYear, endYear }) => {
            const data = isTemperatureShown ? temperatureData : precipitationData;
            return data.map(({t, v}) => ({ x: parseStringToDate(t), y: v }))
                .filter(({x}) => x.getFullYear() >= startYear && x.getFullYear() <= endYear);
        },

        chartData: (state, { parsedData, chartType }) => chartType === 'time' ? getMonthAverageData(parsedData) : getYearAverageData(parsedData),

        chartType: ({ startYear, endYear }) => endYear - startYear <= 4 ? 'time' : 'linear',

        startYearItem: ({ startYear }) => startYear ? {value: startYear, text: `${startYear}`} : undefined,

        endYearItem: ({ endYear }) => endYear ? {value: endYear, text: `${endYear}`} : undefined,

        isTemperatureShown: (state) => state.isTemperatureShown
    },

    mutations: {
        [SET_TEMPERATURE_DATA](state, data) {
            state.temperatureData = data
        },
        [SET_PRECIPITATION_DATA](state, data) {
            state.precipitationData = data
        },
        [SET_START_YEAR](state, year) {
            state.startYear = year
        },
        [SET_END_YEAR](state, year) {
            state.endYear = year
        },
        [SET_IS_TEMPERATURE_SHOWN](state, isTemperatureShown) {
            state.isTemperatureShown = isTemperatureShown
        }
    }, 

    actions: {
        async fetchTemperatureData({commit}) {
           const response = await axios.get('/json/temperature.json');
           commit(SET_TEMPERATURE_DATA, response.data);
        },

        async fetchPrecipitationData({commit}) {
            const response = await axios.get('/json/precipitation.json');
            commit(SET_PRECIPITATION_DATA, response.data)
        },

        setStartYearItem({commit}, yearItem) {
            commit(SET_START_YEAR, yearItem.value)
        },

        setEndYearItem({ commit, state: { startYear } }, yearItem) {
            commit(SET_END_YEAR, yearItem.value < startYear ? startYear : yearItem.value)
        },

        setIsTemperatureShown({commit}, isTemperatureShown) {
            commit(SET_IS_TEMPERATURE_SHOWN, isTemperatureShown)
        }
    }
})