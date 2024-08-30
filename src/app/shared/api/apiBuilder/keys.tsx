/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
export function queryKeyPartFromVars(vars: { [key: string]: any } | undefined) {
  if (vars === undefined) {
    return [];
  }

  // tanstack query automatically deterministicly hashes query key objects
  return [vars];
}
