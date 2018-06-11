<template>
  <div id="app">
    <button @click="decrementAction">-1 (action)</button>
    counter: {{ count }}
    <button @click="incrementMutation">+1 (mutation)</button>
    <p>
      counter (x10): {{ countX10Increment }}
    </p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapState } from 'vuex';
  import RootStoreModule from '@/store/RootStore.module';

  export default Vue.extend({
    name: 'app',
    computed: {
      ...mapState({
        count(state: RootStoreModule): number { return state.count; },
      }),
      countX10Increment(): number { return RootStoreModule.helpers.getCountX10(); },
    },
    methods: {
      incrementMutation(): void {
        // convenience method that handles the module path and type-safes the mutation payload
        RootStoreModule.helpers.commitIncrement(2);
      },
      decrementAction(): void {
        RootStoreModule.helpers.dispatchDecrement(2);
      },
    },
  });
</script>

<style>
  .app {
    margin-top: 30px;
  }
  button {
    background-color: dodgerblue;
    border: none;
    border-radius: 5px;
    color: white;
    margin: 4px;
    padding: 8px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }
</style>
