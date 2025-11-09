import { NotFoundException } from "@/core/exceptions";
import useTranslation from "@/core/composable/useTranslation.js";

const translation = useTranslation('core');

/**
 * @const
 * @description IoC - контейнер
 */
export default {
  dependencies: new Map(),

  /**
   * @param {String} name
   * @param {Function} className
   * @param {String[]} dependencyNames
   */
  register(name, className, dependencyNames = []) {
    this.dependencies.set(name, { className, dependencyNames });
  },

  /**
   * @param name
   * @return {any}
   */
  resolve(name) {
    const registration = this.dependencies.get(name);
    if (!registration) {
      throw new NotFoundException(translation.value.injection.notFound + name);
    }

    const { className, dependencyNames } = registration;
    const resolvedDependencies = dependencyNames.map(dependenceName => this.resolve(dependenceName));

    return new className(...resolvedDependencies);
  }
}
