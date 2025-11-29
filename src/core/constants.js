import {EnvService} from "@/core/utils";

/**
 * @type {String}
 */
export const Lang = EnvService.get("APP_LANG") ?? "en";

/**
 * @type {Number}
 */
export const FileDividerTypeCasting = 1024;
