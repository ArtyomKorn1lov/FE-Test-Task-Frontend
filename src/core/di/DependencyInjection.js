import {useI18n} from "vue-i18n";
import {NotFoundException} from "@/core/exceptions";

const {t} = useI18n();

/**
 * @const
 * @description Внедрение зависимостей
 */
export default {
  dependencies: new Map(),

  /**
   * @param {String} name
   * @param {Function} className
   * @param {String[]} dependencyNames
   * @param {any[]} constructorArgs
   */
  register(name, className, dependencyNames = [], constructorArgs = []) {
    this.dependencies.set(name, {className, dependencyNames, constructorArgs});
  },

  /**
   * @param name
   * @return {any}
   * @throws {NotFoundException}
   */
  resolve(name) {
    const registration = this.dependencies.get(name);
    if (!registration) {
      throw new NotFoundException(t('core.injection.notFound') + name);
    }

    const {className, dependencyNames, constructorArgs} = registration;
    const resolvedDependencies = dependencyNames.map(dependenceName => this.resolve(dependenceName));

    return new className(...resolvedDependencies, ...constructorArgs);
  }
}
