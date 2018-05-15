<template>
  <div id="app">
    <h1>Title: {{ title }}</h1>
    <button @click="decrementAction">-2 (action)</button>
    counter: {{ count }}
    <button @click="incrementMutation">+2 (mutation)</button>
    <p>
      counter (x10): {{ countX10Increment }}
    </p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
  import RootStoreModule from '@/store/RootStore.module';

  export default Vue.extend({
    name: 'app',
    computed: {
      ...mapState({
        title(state: RootStoreModule) { return state.title; },
        count(state: RootStoreModule) { return state.CounterStore.count; },
      }),
      countX10Increment(): number { return this.$store.state.CounterStore.module.getCountX10(this); },
    },
    methods: {
      ...mapMutations({
        incrementMutation(commit, payload): void {
          // @ts-ignore
          const state: RootStoreModule = this.$store.state;
          // convenience method that handles the module path and type-safes the mutation payload
          // @ts-ignore
          commit(...state.CounterStore.module.commitIncrement(2));
        },
      }),
      ...mapActions({
        decrementAction(dispatch, payload): void {
          // @ts-ignore
          const state: RootStoreModule = this.$store.state;
          // @ts-ignore
          dispatch(...state.CounterStore.module.dispatchDecrement(2));
        },
      }),
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
