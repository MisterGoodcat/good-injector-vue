import { Component, Prop, Vue } from "vue-property-decorator";
import { InjectArguments } from "../../src/Index";
import { DemoDependency } from "./DemoDependency";

@Component
export default class Demo extends Vue {
    // change through binding to trigger "beforeUpdate" and "updated" hooks
    @Prop() public text!: string;
    
    public receivedDependencyInBeforeCreate: boolean = false;
    public receivedDependencyInCreated: boolean = false;
    public receivedDependencyInBeforeMount: boolean = false;
    public receivedDependencyInMounted: boolean = false;
    public receivedDependencyInBeforeUpdate: boolean = false;
    public receivedDependencyInUpdated: boolean = false;
    public receivedDependencyInBeforeDestroy: boolean = false;
    public receivedDependencyInDestroyed: boolean = false;
    public receivedDependencyInActivated: boolean = false;
    public receivedDependencyInDeactivated: boolean = false;
    public receivedDependencyInErrorCaptured: boolean = false;

    // should throw if uncommented
    // @InjectArguments()
    // public something(demo: DemoDependency): void {        
    // }

    @InjectArguments()
    public beforeCreate(demo: DemoDependency): void {        
        this.receivedDependencyInBeforeCreate = demo != undefined;
    }
    
    @InjectArguments()
    public created(demo: DemoDependency): void {
        this.receivedDependencyInCreated = demo != undefined;
    }
    
    @InjectArguments()
    public beforeMount(demo: DemoDependency): void {
        this.receivedDependencyInBeforeMount = demo != undefined;
    }

    @InjectArguments()
    public mounted(demo: DemoDependency): void {
        this.receivedDependencyInMounted = demo != undefined;
    }
    
    @InjectArguments()
    public beforeUpdate(demo: DemoDependency): void {
        this.receivedDependencyInBeforeUpdate = demo != undefined;
    }
    
    @InjectArguments()
    public updated(demo: DemoDependency): void {
        this.receivedDependencyInUpdated = demo != undefined;
    }
    
    @InjectArguments()
    public beforeDestroy(demo: DemoDependency): void {
        this.receivedDependencyInBeforeDestroy = demo != undefined;
    }
    
    @InjectArguments()
    public destroyed(demo: DemoDependency): void {
        this.receivedDependencyInDestroyed = demo != undefined;
    }
    
    @InjectArguments()
    public activated(demo: DemoDependency): void {
        this.receivedDependencyInActivated = demo != undefined;
    }
    
    @InjectArguments()
    public deactivated(demo: DemoDependency): void {
        this.receivedDependencyInDeactivated = demo != undefined;
    }
    
    @InjectArguments()
    public errorCaptured(demo: DemoDependency): void {
        this.receivedDependencyInErrorCaptured = demo != undefined;
    }
}
