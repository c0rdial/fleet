<template>
  <DefaultPage>
    <CardDashboard :dashboard-data="dashboardData" />
    <div class="md:flex justify-between items-start flex-col lg:flex-row">
      <div class="py-4 shadow-lg w-full pr-1 mb-4 bg-gradient-dark-gray rounded-2xl lg:mr-8">
        <div>
          <apexchart type="bar" :options="options" :series="series"></apexchart>
        </div>
      </div>

      <div class="py-4 w-full shadow-lg mt-10 lg:mt-0 pr-1 mb-4 bg-gradient-dark-gray rounded-2xl">
        <div>
          <apexchart
            type="pie"
            width="380"
            :options="pieChartOptions"
            :series="pieSeries"
          ></apexchart>
        </div>
      </div>
    </div>
  </DefaultPage>
</template>
<script>
import { computed, defineComponent, onMounted, ref } from 'vue'
import components from '@/partials'

import { UserIcon, CurrencyDollarIcon, CalendarIcon, CubeIcon } from '@heroicons/vue/outline'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    DefaultPage: components.DefaultPage,
    UserIcon,
    CardDashboard: components.CardDashboard
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const dashboardData = [
      {
        id: 1,
        label: 'Vehicles',
        value: 80,
        icon: UserIcon
      },
      {
        id: 3,
        label: 'Earnings',
        value: 40,
        icon: CurrencyDollarIcon
      },
      {
        id: 4,
        label: 'Maintenance',
        value: 40,
        icon: CalendarIcon
      },
      {
        id: 2,
        label: 'Drivers',
        value: 120,
        icon: CubeIcon
      }
    ]

    const options = {
      chart: {
        id: 'vuechart-example'
      },
      title: {
        text: 'Vehicle Earnings',
        align: 'left'
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ]
      }
    }
    const series = [
      {
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 150, 200, 250]
      }
    ]

    // Pie Chart
    const pieSeries = [44, 55, 13, 43, 22]
    const pieChartOptions = {
      chart: {
        width: 380,
        type: 'pie'
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      title: {
        text: 'Simple Pie Chart'
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    }

    return { options, series, pieChartOptions, pieSeries, dashboardData }
  }
})
</script>
<style lang=""></style>
