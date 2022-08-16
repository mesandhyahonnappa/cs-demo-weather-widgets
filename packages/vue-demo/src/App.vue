<template>
  <csdemo-temperature temperature="273.15" scale="C" @csdemo-change="onTemperatureChange"></csdemo-temperature>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CsdemoTemperature } from '@ionic-enterprise/cs-demo-weather-widgets-vue';
// import type { CsdemoTemperatureCustomEvent } from '@ionic-enterprise/cs-demo-weather-widgets/dist/types/components';
// import type { TemperatureChangeEventDetail } from '@ionic-enterprise/cs-demo-weather-widgets/dist/types/components/csdemo-temperature/csdemo-temperature-interface';

export default defineComponent({
  name: 'App',
  components: {
    CsdemoTemperature,
  },
  data() {},
  methods: {
    onTemperatureChange: (event: any) => {
      console.log(`New Temperature => ${event.detail.value}`);
    },
  },
});
</script>
