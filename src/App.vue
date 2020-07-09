<template>
  <div id="app">
    <div class="container">
      <h1 class="mb-5">Weather Service Archive</h1>
      <div class="row justify-content-center">
        <div class="col-lg-2">
          <button 
              class="btn w-100 mb-4" 
              :class="[ isTemperatureShown ? 'btn-primary' : 'btn-light' ]"
              @click="setIsTemperatureShown(true)"
          >
              Temperature    
          </button>

          <button 
              class="btn w-100 mb-4" 
              :class="[ !isTemperatureShown ? 'btn-primary' : 'btn-light' ]"
              @click="setIsTemperatureShown(false)"
          >
              Precipitation    
          </button>
        </div>
        <div class="col-lg-6">
          <div class="row mb-4">
            <div class="col">
              <basic-select
                :options="options"
                :selectedOption="startYearItem"
                @select="setStartYearItem"
                placeholder="Select start year">
              </basic-select>
            </div>
            <div class="col">
              <basic-select 
                :options="options"
                :selectedOption="endYearItem"
                @select="setEndYearItem"
                placeholder="Select end year">
              </basic-select>
            </div>
          </div>
          <Chart 
            :data="chartData"
            :type="chartType"
            :title="isTemperatureShown ? 'Temperature' : 'Precipitation'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex';
import { BasicSelect } from 'vue-search-select';
import { getYears } from './services/utiles';
import Chart from './components/Chart';

export default {
  name: 'App',
  components: {
    BasicSelect,
    Chart
  },
  data() {
    return {
      years: getYears(1880, 2006)
    }
  },
  mounted() {
    this.fetchTemperatureData();
    this.fetchPrecipitationData();
  },
  computed: {
    options() {
      return this.years.map((y) => ({ value: y, text: `${y}` }))
    },

    ...mapGetters({
      chartData: 'chartData',
      chartType: 'chartType',
      isTemperatureShown: 'isTemperatureShown',
      startYearItem: 'startYearItem',
      endYearItem: 'endYearItem'
    })
  },
  methods: {
    ...mapActions({
      setStartYearItem: 'setStartYearItem',
      setEndYearItem: 'setEndYearItem',
      fetchTemperatureData: 'fetchTemperatureData',
      fetchPrecipitationData: 'fetchPrecipitationData',
      setIsTemperatureShown: 'setIsTemperatureShown'
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
