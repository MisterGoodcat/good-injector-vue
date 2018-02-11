import { Container } from "good-injector";

export class GoodInjectorPluginOptions {
    public static createDefaultOptions(): GoodInjectorPluginOptions {
        return new GoodInjectorPluginOptions();
    }

    public container: Container | undefined;
}
