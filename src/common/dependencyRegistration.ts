import { ClassProvider, container as defaultContainer, FactoryProvider, InjectionToken, ValueProvider } from 'tsyringe';
import { constructor, DependencyContainer } from 'tsyringe/dist/typings/types';

export type Providers<T> = ValueProvider<T> | FactoryProvider<T> | ClassProvider<T> | constructor<T>;

export interface InjectionObject<T> {
  token: InjectionToken<T>;
  provider: Providers<T>;
}

export const registerDependencies = (
  dependencies: InjectionObject<unknown>[],
  override?: InjectionObject<unknown>[],
  useChild = false
): DependencyContainer => {
  const container = useChild ? defaultContainer.createChildContainer() : defaultContainer;
  dependencies.forEach((obj) => {
    const injectionObj = override?.find((overrideObj) => overrideObj.token === obj.token) ?? obj;
    container.register(injectionObj.token, injectionObj.provider as constructor<unknown>);
  });
  return container;
};
