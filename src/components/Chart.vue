<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    data: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'linear'
    }
  },
  mounted() {
    
  },
  watch: {
    data: function (newData) {
      this.renderChart(
        {
          datasets: [
            {
              label: this.title,
              data: newData,
              backgroundColor: "transparent",
              borderColor: "rgba(1, 116, 188, 0.50)",
              pointBackgroundColor: "rgba(171, 71, 188, 1)"
            }
          ]
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: this.title
          },
          legend: {
            display: false
          },
          scales: {
              xAxes: [{
                  type: this.type,
                  distribution: 'series',
                  ticks: {
                    // maxTicksLimit: 12
                    precision: 0
                  }
              }]
          }
        }
      );
    }
  }
};
</script>