import { AsyncTest, Expect, Test, TestCase, TestFixture } from "alsatian";
import { Container } from "good-injector";
import * as Vue from "vue";
import { GoodInjectorPlugin } from "../src/Index";
import DemoComponent from "./samples/DemoComponent";
import { DemoDependency } from "./samples/DemoDependency";

@TestFixture("Vue injection tests")
export class InjectionTests {
    @Test("when registered a dependency it can be injected into Vue component on mount")
    public injectionTest1() {      
        let container = new Container();        
        container.registerTransient(DemoDependency, DemoDependency);
        
        Vue.use(GoodInjectorPlugin, { container });
        let demo = new DemoComponent({
            render: h => {}
        });        
        demo.$mount();
        
        Expect(demo.receivedDependencyInMounted).toBe(true);
    }
}
