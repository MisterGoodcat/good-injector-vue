# good-injector-vue
An adapter for Vue.js to integrate with [good-injector](https://github.com/MisterGoodcat/good-injector), a dependency injection framework for TypeScript.

## Features

* Integrate as Vue.js plugin 
* Supports argument injection to all life cycle hooks of Vue.js components, meaning:
  * beforeCreate, created, beforeMount, mounted, beforeUpdate, updated, beforeDestroy, destroyed, activated, deactivated, errorCaptured
* Exposes the IoC container as `$container` on Vue component instances
* Supports all features of _good-injector_

## Usage

Install:

```
yarn add good-injector-vue

or 

npm install good-injector-vue
```

Set up dependency injection in your bootstrapping code (typically `Main.ts`):

```ts
import { Container, GoodInjectorPlugin } from "good-injector-vue";

// setup dependency injection
var container = new Container();
container.registerSingleton(Repository);

// configure plugin
Vue.use(GoodInjectorPlugin, { container })

// ... rest of the bootstrapping as usual
```

Let good-injector inject your registered dependencies directly into Vue.js' life cycle hooks:

```ts
// in Home.vue
import { InjectArguments } from "good-injector-vue";

export class Home extends Vue {
    @InjectArguments()
    public mounted(repo: Repository): void {
        // use "repo" and enjoy!
    }
}
```

Use the `$container` property in your components to access the container directly if you need to.

```ts
// in Home.vue
export class Home extends Vue {
    // @InjectArguments() => decorator would throw because it's not a life cycle hook!
    public someMethod(): void {
        // access container directly works
        let repo = this.$container.resolve(Repository);
    }
}
```

For all supported DI features, visit [good-injector](https://github.com/MisterGoodcat/good-injector).

## Limitations and hints

* Please note that the `InjectArguments` decorator is a decorator factory. Don't forget the parenthesis, i.e. `InjectArguments()` (in newer TypeScript versions, compiler will complain if you forget this).
* Please note that the `SupportsInjection` decorator of _good-injector_ does not work _directly on Vue.js components_, because they are not instantiated by the container. The decorator fully works on all your dependencies though, for example the `Repository` type in the sample above.
* Make sure that you don't inject costly to construct transient dependencies into potentially frequently called life cycle hooks like _updated_.

## Build yourself

Make sure you have ts-node globally installed for executing the unit tests.

* Clone repo
* `yarn`
* `npm run build:dev`

Look at the available scripts to see what's available to build, lint, test and watch.