import {NotFoundException, ArgumentException} from "@/core/exceptions";

/**
 * @throws {NotFoundException}
 */
export const init = () => {
  if (!process?.env) {
    throw new NotFoundException("Error! Environment variables not found");
  }
}

/**
 * @param {String} code
 * @return {String}
 * @throws {ArgumentException}
 */
export const get = (code) => {
  if (!code) {
    throw ArgumentException("Environment variable code cannot be empty");
  }
  return process.env[code] ?? "";
}

