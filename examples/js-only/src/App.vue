<template>
  <div id="app">
    <h1>{{ titleWithCaps }}</h1>
    <button @click="decrementAction">-2 (action)</button>
    counter: {{ count }}
    <button @click="incrementMutation">+2 (mutation)</button>
    <p>
      counter (x10): {{ countX10 }}
    </p>
  </div>
</template>

<script>
  import Vue from 'vue';
  import AppStoreHelper from '@/store/AppStoreHelper';

  export default Vue.extend({
    name: 'app',
    computed: {
      // access state through the helper (though you can still use 'mapState' if you choose and still get typings)
      count() { return AppStoreHelper.CounterStore.count; },
      // getters
      titleWithCaps() { return AppStoreHelper.getTitleWithCaps(); },
      countX10() { return AppStoreHelper.CounterStore.getCountX10(); },
    },
    methods: {
      // convenience method that handles the module path and type-safes the mutation payload
      incrementMutation() { AppStoreHelper.CounterStore.commitIncrement(2); },
      decrementAction() { AppStoreHelper.CounterStore.dispatchDecrement(2); },
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
