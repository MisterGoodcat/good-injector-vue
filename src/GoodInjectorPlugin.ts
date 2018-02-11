// tslint:disable:ban-types => we really need to use the low-level "Function" type here

import "reflect-metadata";
import _Vue, { ComponentOptions } from "vue";
import { createDecorator } from "vue-class-component";
import { Container } from "good-injector";
import { GoodInjectorPluginOptions } from "./GoodInjectorPluginOptions";

/* tslint:disable-next-line:variable-name */
export function GoodInjectorPlugin(Vue: typeof _Vue, options?: GoodInjectorPluginOptions): void {
    __o.container = options != undefined ? options.container || new Container() : new Container();

    // make the container available for service locator pattern
    Vue.prototype.$container = __o.container;
}

export function InjectArguments() {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        if (!__supportedLifeCycleHooks.find((item) => item === propertyKey)) {
            const lifeCycleHooks = __supportedLifeCycleHooks.join(", ");
            throw new Error(`The decorated method '${propertyKey}' is not supported. Supported life cycle hooks are: '${lifeCycleHooks}'`);
        }

        let paramTypes = <Function[]>Reflect.getMetadata("design:paramtypes", target, propertyKey);
        if (paramTypes == undefined || paramTypes.length === 0) {
            return;
        }

        // defer actual decoration with vue-class-component, so we can get access to the component options        
        let decorator = createDecorator((componentOptions: ComponentOptions<_Vue>, key: string) => {
            wrapLifeCycleHook(componentOptions, propertyKey, paramTypes);
        });

        decorator(target, propertyKey);
    };
}

// tslint:disable:variable-name
const __supportedLifeCycleHooks: string[] = ["beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "beforeDestroy", "destroyed", "activated", "deactivated", "errorCaptured"];
const __o: GoodInjectorPluginOptions = GoodInjectorPluginOptions.createDefaultOptions();
// tslint:enable:variable-name

function wrapLifeCycleHook(componentOptions: ComponentOptions<_Vue>, hookName: string, paramTypes: Function[]) {
    const genericOptions = <any>componentOptions; // because indexer access is not possible otherwise    

    const currentComponentHooks = <Function | Function[]>genericOptions[hookName];
    if (currentComponentHooks == undefined || currentComponentHooks.length === 0) {
        throw new Error(`Got metadata for life cycle hook '${hookName}' but that hook is not part of the component '${componentOptions.name}'(??)`);
    }

    const originalHook = typeof currentComponentHooks === "function" ? currentComponentHooks : currentComponentHooks[currentComponentHooks.length - 1];
    const replacementHook = function(this: _Vue) {
        if (__o == undefined || __o.container == undefined) {
            throw new Error("No container defined. Did you forget to configure the good-injector plugin?");
        }

        // resolve arguments
        let args: any[] = paramTypes.map((item: any) => __o.container!.resolve(item));

        // call original hook with arguments
        originalHook.call(this, ...args);
    };

    if (typeof currentComponentHooks === "function") {
        genericOptions[hookName] = replacementHook;
    }
    else {
        currentComponentHooks[currentComponentHooks.length - 1] = replacementHook;
    }
}
