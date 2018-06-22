# mmm-typed-vuex (beta 4)
Vuex and TypeScript living in harmony with one another.

We're talking:
* no more string references in your Vue components (those suck)
* no more guess work as to the structure of your store (thank goodness)
* typed state values, mutation / action payloads, and getters (it's about time)
* built-in init action for modules (why doesn't this exist by default?)
* simplify components even further by getting rid of mapState, mapActions, mapMutations, and mapGetters (optional)
* dispatch actions, get state, etc from anywhere in your code via a single-line command (easy-peasy like)

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

Let the store, alone, define and strictly enforce its data through typings.

Enough talk, let me instead show you one possible alternative to the aforementioned string hell:

```typescript
// App.vue
computed: {
  // access state through the helper (though you can still use 'mapState' if you choose and still get typings)
  title(): string { return AppStoreHelper.title; },
  count(): number { return AppStoreHelper.CounterStore.count; },
  // getters
  countX10(): number { return AppStoreHelper.CounterStore.getCountX10(); }
},
methods: {
  // convenience method that type-safes the mutation and payload
  increment(): void { AppStoreHelper.CounterStore.commitIncrement(2); },
  // convenience method that type-safes the action and payload
  decrement(): void { AppStoreHelper.CounterStore.dispatchDecrement(2); }
}
```

Much better! It may appear a little verbose, but it's all typed and your editor's intelli-sense should be able to do all the heavy lifting. Oh...and no more string references!!

### Okay, but what is mmm-typed-vuex really?

Honestly, it's not much...which was my main objective. We're talking about roughly 10-20 lines of real code...but there is a dash of magic in there.
It's just enough to avoid dealing with module paths, make a module's helper methods more accessible, and provide an init action.

And now, for the measly sum of __$0__, all that magic can be yours ;)

### Vuex definition examples:

A quick note, this library attempts to be largely unopinionated and avoid recreating Vuex logic. 
This leaves the details of the store implementation and how your Vue component consumes it up to you. There's a few example provided show-casing different implementations.
The following is just one example. Chances are, you'll find a better way to leverage this simple library...is you so choose :)

```typescript
// CounterStore.module.ts
export default class CounterStore extends StoreModule {
  // state property typings
  public state: CounterStore;
  public get count(): number { return this.state.count; }
  public set count(value: number) { value = value; }

  // mutations commits, actions dispatches, and getter accessors
  public getCountX10(): number { return this.get('getCountX10'); }
  public commitDecrement(payload: number) { return this.commit('commitDecrement', payload); }
  public commitIncrement(payload: number) { return this.commit('commitIncrement', payload); }
  public dispatchDecrement(payload: number) { return this.dispatch('dispatchDecrement', payload); }

  constructor() {
    super();

    this.setOptions(
      // this should be familiar...it's what you've already been doing except for (optionally) typing the state object
      {
        namespaced: true,
        state: {
          count: 0,
        } as CounterStore, // optional typing
        getters: {
          getCountX10: (state: CounterStore): number => {
            return state.count * 10;
          },
        },
        mutations: {
          commitDecrement(state: CounterStore, payload: number) {
            state.count -= payload;
          },
          commitIncrement(state: CounterStore, payload: number) {
            state.count += payload;
          },
        },
        actions: {
          dispatchDecrement: (context: ActionContext<CounterStore, AppStore>, payload: number) => {
            this.commitDecrement(payload);
            // dispatch to another module, in this case the root AppStore (wow is this easy!!!)
            AppStoreHelper.dispatchChangeTitle('My New Title');
          },
        },
      },
    );
  }
}
```

### Additional Notes

* Those class properties (e.g. ```public title: string;```) found within AppStoreHelper.ts are *not* -- in any way -- used to set state values (they're there only for typings)
* Methods for mutations, actions, and getters simply type-safe payloads and simplify module paths

### Available Examples

1. A baseline, no typings example that showcases the brittleness of the typical string-heavy approach: [baseline-no-typings](https://github.com/crummm/mmm-typed-vuex/tree/master/examples/baseline-no-typings)
2. A two-level deep 'module' example with concise, flattened module typing definitions: [modules-flat-definitions](https://github.com/crummm/mmm-typed-vuex/tree/master/examples/modules-flat-definitions)
3. An object-defined approach to typings that more clearly separates state, actions, mutations, getters and modules: [modules-object-definitions](https://github.com/crummm/mmm-typed-vuex/tree/master/examples/modules-object-definitions)
4. An ES6 JavaScript example (no TypeScript): [js-only](https://github.com/crummm/mmm-typed-vuex/tree/master/examples/js-only)

### Potential negatives

Dynamic registration of modules can't leverage the provide init action...yet. It's coming!

There's more boilerplate. It sucks, but that's just the reality of it right now.

### Rebuttal

On the flip-side, is the fact that once you write a typed vuex module, the rest of the app can effortlessly use it. 
No more banging your head against the wall trying to figure out the store structure 
or dealing with the fallout from refactoring all the string references scrattered throught your code. 
Is it worth the extra setup? That's for you to decide. For me, the answer is a resounding, "YES!". 
Once I'm done writing a store and am back to building out components and services, the last thing I want to do is to needlessly wrestle with the store.
Plus, having the ability to leverage the init action is amazing!

### Other ideas

This is surely not the best way this can be done, but it's at least a step in the right direction, I feel.

If you have ideas on how to improve upon this effort or want to contribute in any way, I'd definitely enjoy hearing from you! Two people's ideas are better than one.

### Version 4 Notes
* Store modules are now set to the 'options' property and the root store and its modules must pass this property in during registration
* No more 'AppStore.init' in the store.ts
* The AppStoreHelper is new and makes calls more concise and removes an additional property lookup each call
* No more recursive lookups for module mutations and actions
* Init action is now available out of the box


### Version 3 Notes
* Accessing state through 'RootScope' has been simplified and actions, mutations, and getters follow a similar format for consistency
* Defining module namespaces and parent modules is now done through the super constructor 

### Version 2 Notes

* The module helpers are no longer being stored in the store (hooray!)
* You no longer have to use mapState, mapActions, mapMutations, and mapGetters (of course, you can if you still want to)
* The method 'getModulePath' now caches the paths it caculates to avoid redundant processing on each request

### Conclusion

That's it folks! Enjoy the Vue :)
