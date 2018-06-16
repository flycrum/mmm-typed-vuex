# mmm-typed-vuex (beta 3)
Vuex and TypeScript living in harmony with one another.

We're talking:
* no more string references in your Vue components
* no more guess work as to the structure of your store
* typed state values, mutation / action payloads, and more!
* simplify even further by getting rid of mapState, mapActions, mapMutations, and mapGetters (optional)
* dispatch actions, get state, etc from anywhere in your code via a single-line command!
* it's easier than ever to dispatch events from other modules

## Installation

```bash
$ yarn add mmm-typed-vuex
```

```bash
$ npm install --save mmm-typed-vuex
```

### Why?

I could not be more sick of brittle string references! 
You know, those annoying set of characters that you copy and paste throughout your code.
Yeah, we all know we shouldn't do it, but Vuex makes it especially tempting.
Be honest, have you ever done something like this?

```typescript
// App.vue
computed: {
  ...mapState({
    title: 'title',
    count(state) { return state.CounterStore.count; }
  }),
  ...mapGetters('CounterStore', ['countX10'])
},
methods: {
  ...mapMutations('CounterStore', {
    incrementMutation(commit): void { commit('increment', 3); }
  }),
  ...mapActions({
    decrementAction(dispatch): void { dispatch('CounterStore/decrement', 3); }
  })
}
```

If so, you now have:
* static string references to a potentially complex and ever-changing store structure
* blind references to state properties
* very brittle code

Disgusting. Definitely not very 'mmm' ;) 

What if one of your property or mutuation names change? What if you move, rename, or delete a module? 
Yep, you're going to have to find and update all those narly string references each time you make a change.
Good luck if you're playing around with a substantial codebase.

Adding insult to injury, you sure as heck aren't getting typed state, mutation payloads, etc. Ouch!

### Solution

Let the store, alone, define and strictly enforce the following (through typings):
* module and nested module namespaces / paths
* state property names and types
* available mutations, actions, and getters
* mutuation and action payload types
* getter return types

Enough talk, let me instead show you one possible alternative to the aforementioned string hell:

```typescript
// App.vue
computed: {
  // state
  count(): number { return RootStore.state.CounterStore.count; },
  // getters
  countX10(): number { return RootStore.getters.CounterStore.getCountX10(); }
},
methods: {
  // convenience method that handles the module path and type-safes the mutation payload
  incrementMutation(): void { RootStore.mutations.CounterStore.commitIncrement(2); },
  decrementAction(): void { RootStore.actions.CounterStore.dispatchDecrement(2); }
}
```

Much better! It may appear a little verbose, but it's all typed and your editor's intelli-sense should be able to do all the heavy lifting. Oh...and no more string references!!

### Okay, but what is mmm-typed-vuex really?

Honestly, it's not much...which was my main objective. We're talking about roughly 10-20 lines of real code...but there is a dash of magic in there.
It's just enough to determine module paths internally (so you don't have to) and make a module's helper methods more accessible.

And now, for the measly sum of __$0__, all that magic can be yours ;)

### Vuex definition examples:

A quick note, this library attempts to be largely unopinionated and avoids recreating or changing any Vuex logic. 
This leaves the details of the store implementation and how your Vue component consumes it up to you.
The following is simply my best stab at a simple store definition. Chances are, you'll find a better way to leverage this simple library is you so choose :)

```typescript
// CounterStore.module.ts
export default class CounterStoreModule extends StoreModule {
  public static readonly COMMIT_INCREMENT: string = 'commitIncrement';
  public static readonly COMMIT_DECREMENT: string = 'commitDecrement';
  public static readonly DISPATCH_DECREMENT: string = 'dispatchDecrement';
  public static readonly GET_COUNTX10: string = 'getCountX10';

  // state property typings (these are not used to set or get values...only for typings)
  public count: number;

  // typed mutations commits, actions dispatches, and getter accessors
  public commitIncrement(payload: number) { return this.commit(CounterStoreModule.COMMIT_INCREMENT, payload); }
  public dispatchDecrement(payload: number) { return this.dispatch(CounterStoreModule.DISPATCH_DECREMENT, payload); }
  public getCountX10(): number { return this.get(CounterStoreModule.GET_COUNTX10); }

  constructor(parentModule: StoreModule) {
    super('CounterStore', parentModule);

    this.setOptions(
      // this should be familiar...it's exactly what you've already been doing (no magic here)
      {
        namespaced: true,
        state: {
          count: 0,
        },
        mutations: {
          [CounterStoreModule.COMMIT_DECREMENT](state: CounterStoreModule, payload: number) {
            state.count -= payload;
          },
          [CounterStoreModule.COMMIT_INCREMENT](state: CounterStoreModule, payload: number) {
            state.count += payload;
          },
        },
        actions: {
          [CounterStoreModule.DISPATCH_DECREMENT](context: ActionContext<CounterStoreModule, RootStore>, payload: number) {
            context.commit(CounterStoreModule.COMMIT_DECREMENT, payload);
            // dispatch to another module (it's so easy now!)
            RootStore.actions.dispatchChange('-');
          },
        },
        getters: {
          [CounterStoreModule.GET_COUNTX10]: (state: CounterStoreModule, getters: any): number => {
            return state.count * 10;
          },
        },
      },
    );
  }
}
```

### Additional Notes

* Those class properties (e.g. ```public title: string;```) found within RootStore.module.ts are *not* -- in any way -- used to get or set state values (only for typings)
* For reasons I won't go into here, ```public CounterStore: CounterStoreModule = new CounterStoreModule(this);``` is an exception to what I mentioned above
* Methods for mutations, actions, and getters simply type-safe payloads and auto-magically determine module paths

### Available Examples

1. A baseline, no typings example that showcases the brittleness of the string-heavy approach: [modules-example-no-typings](https://github.com/crummm/mmm-typed-vuex/tree/master/examples/modules-example-no-typings)
2. A slightly more complex, two-level deep 'module' example: [modules-example](https://github.com/crummm/mmm-typed-vuex/tree/master/examples/modules-example)
3. A simple, one-level deep 'root' state example: [root-example](https://github.com/crummm/mmm-typed-vuex/tree/master/examples/root-example)

### Potential negatives

There's more boilerplate. It sucks, but that's just the reality of it right now.

### Rebuttal

On the flip-side, however, is the fact that once you write a vuex module, the rest of the app
can effortlessly use it. No more banging your head against the wall trying to figure out
the store structure or dealing with the fallout from refactoring all the string references scrattered throught your code. 
Is it worth the extra setup? 
That's for you to decide. For me, the answer is a resounding, "YES!". 
Once I'm done writing a store and am back to building out components and services, the last thing I want to do is to needlessly wrestle with the store.

### Other ideas

This is surely not the best way this can be done, but it's at least a step in the right direction, I feel.

If you have ideas on how to improve upon this effort or want to contribute in any way, I'd definitely enjoy hearing from you! Two people's ideas are better than one.

### Version 3 Notes
* Accessing state through 'RootScope' has been simplified and actions, mutations, and getters for a similar format for consistency
* Defining module namespaces and parent modules is now done through the super constructor 

### Version 2 Notes

* The module helpers are no longer being stored in the store (hooray!)
* You no longer have to use mapState, mapActions, mapMutations, and mapGetters (of course, you can if you still want to)
* The method 'getModulePath' now caches the paths it caculates to avoid redundant processing on each request

### Conclusion

That's it folks! Enjoy the Vue :)
