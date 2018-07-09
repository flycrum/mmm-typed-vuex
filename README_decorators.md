# mmm-typed-vuex:  decorators

Decorators are a ridiculously awesome (albeit experimental) feature currently in stage 2 proposal 
for JavaScript and made possible (in the interim) via TypeScript. You can read more about them [here](http://www.typescriptlang.org/docs/handbook/decorators.html).

> Note: You do not need to use decorators with mmm-typed-vuex. They are completely optional and available only for your convenience.

### Contents

* [Using decorators and their options](#using)
* [Decorator gotchas](#gotchas)
* [Getter decorator](#getter)
* [Getter decorator options](#getter-options)
* [Root singleton getter decorator](#singleton)

### Using decorators and their options <a name="using"></a>

This library leverages decorators to reduce the boilerplate needed for you to type your Vuex store modules
along with providing some nice-to-have, otherwise unavailable features (like optional defaults for getters).

So, let's get started!

Through the mystical power of decorators, we can do this:

```typescript
// using decorators
@mmmState public count: number;
@mmmMutation() public commitDecrement(payload: number) { return; }
@mmmMutation() public commitIncrement(payload: number) { return; }
@mmmAction() public dispatchDecrement(payload: number) { return; }
@mmmGetter() public getCountX10(): number { return NaN; }
```

Instead of the longer and more redundant approach:

```typescript
// the classic, long-hand implementation
public state: CounterStore;
public get count(): number { return this.state.count; }
public set count(value: number) { value = value; }

// mutations commits, actions dispatches, and getter accessors
public getCountX10(): number { return this.get('getCountX10'); }
public commitDecrement(payload: number) { return this.commit('commitDecrement', payload); }
public commitIncrement(payload: number) { return this.commit('commitIncrement', payload); }
public dispatchDecrement(payload: number) { return this.dispatch('dispatchDecrement', payload); }
``` 

Even at first glance, you can tell there's far less boilerplate using decorators 
(as indicated by the @mmm... prefix). It's also far easier to read and less prone to copy and paste errors
than the classic, long-hand implementation (it's silly easy to not change the string version of the method 
name or to not reference the correct method).

### Decorator gotchas <a name="gotchas"></a>

So, the one real gotcha (other than decorators being experimental and susceptible to changes) is the
function body. You know, this part:

```typescript
{ return; }
```

It's a little funky, isn't it? Yeah, I thought so too but I have yet to find a better, 
cleaner way of doing it. Adding insult to injury, you'll get tslint errors unless you toggle a few
settings and make a few accommodations along the way. For example, for numbers you may need to return a __NaN__ value:

```typescript
@mmmGetter() public getCountX10(): number { return NaN; }
```

For me, it's totally worth it. Decorators make my code a lot easier to ready, setup, and ensure 
I didn't make stupid mistakes along the way. Plus, there are some nifty features that can be built using them.

#### Nifty features

I told you there'd be some nifty features and here's where I make good on my promise.

### Getter decorator <a name="getter"></a>

```typescript
@mmmGetter()
```

"Vuex allows us to define "getters" in the store. You can think of them as computed properties for stores." 
-[Vuex Getters](https://vuex.vuejs.org/guide/getters.html)

One of the lesser known Vuex features around getters is that they can actually take parameters. 
You can read about how they're implemented via method-style access [here](https://vuex.vuejs.org/guide/getters.html#method-style-access). In short,
they allow you to do some pretty cool things, and even though the results are not cached (not surprisingly), they can
still be computed. Getters do come with some gotchas, however.

First, your getter functions no longer look like this:

```typescript
doneTodosCount: (state) => {
  return 1;
}
```

Instead, they are wrapped in a secondary function as seen here:

```typescript
getTodoById: (state) => (id) => {
  return state.todos.find(todo => todo.id === id)
}
```

Notice the 2 arrow functions. This is what Vuex refers to as method-style access. A decorator for this looks like:

```typescript
@mmmGetter() public getTodoById(id: string): TodoItem { return undefined as any; }
```

Simple enough, right? 

One thing you might not suspect, however, is that you can not use optional or default params with getters.
If you try, it will break and your return value will look something like this:

```typescript
console.log('result: ', AppStoreHelper.getTodoById())
// result: function (id) { return state.todos.find(todo => todo.id === id); }
```

Sadly, if you don't pass in params, Vuex will fail to call the wrapped function and will
instead return the method-style acess function itself. Thinking about it, it really does make a lot of sense (with amazing simplicity comes some edge-case gotchas).
Luckily, we have you covered! 

#### Getters decorator options <a name="getter-options"></a>

##### optionalMethodStyleDefaults

With the use of decorators, you can pass in an optional defaults param like so:

```typescript
@mmmGetter({optionalMethodStyleDefaults: ['id123456']})
public getTodoById(id?: string): TodoItem { return; }
```

Pretty cool, huh? So yeah, if you pass an id param to your getter, it will naturally use that param. But, if you don't,
it mmm-typed-vuex will insert the __optionalMethodStyleDefaults__ value you defined in the decorator.

But why the array for __optionalMethodStyleDefaults__?

Lots of reasons that I won't fully go into here. Beyond ensuring the value you want is actually passed 
(e.g. 'undefined'), an array gives you the power to define default values for any number of getter params.
Want to define 3 optional default values but perhaps you sometimes want to call the getter with only
1 of the 3 params given? Don't worry, the remaining 2 will be assigned the default values that you defined in the decorator.

### Root singleton getter decorator <a name="singleton"></a>

```typescript
@mmmRootSingletonGetter()
```

Truth be told, this one is barely even worth it, but why not I figure? This puppy is a simple
convenience decorator that abstracts away the creation and getting of a rudimentary singleton instance.

> Completely optional, this is only needed within the RootStore / AppStore and is primarily used in
conjunction with RootStoreHelper / AppStoreHelper.

Here's what it looks like:

```typescript
@mmmRootSingletonGetter() public static get(): AppStore { return undefined as any; }
```

And what the non-decorator alternative looks like:

```typescript
public static instance: AppStore;
public static get(): AppStore { return AppStore.instance || (AppStore.instance = new AppStore()); }
```

It's just a tad cleaner and simpler but completely optional...as is the case with decorators as a whole.
