import {mapValues, valueFn} from '../utils.js';

export const createInjector = (serviceFactoryMap) =>
    function inject(args = {}) {
        const target = {};
        const deps = new Proxy(target, {
            get(target, prop, receiver) {
                if (!(prop in target)) {
                    throw new Error(`could not resolve factory '${prop}'`);
                }
                return Reflect.get(target, prop, receiver);
            }
        });
        
        const propertyDescriptors = mapValues(createPropertyDescriptor);
        
        Object.defineProperties(
            target,
            propertyDescriptors({
                ...serviceFactoryMap,
                inject: valueFn(inject),
                ...args
            })
        );
        
        return deps;
        
        function createPropertyDescriptor(factory) {
            const actualFactory =
                typeof factory === 'function' ? factory : valueFn(factory);
            return {
                get() {
                    return actualFactory(deps);
                },
                enumerable: true
            };
        }
    };
