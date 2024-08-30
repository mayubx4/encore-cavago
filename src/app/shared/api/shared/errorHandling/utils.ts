/**
 * Converts a PascalCase string to kebab-case.
 * @param pascalCaseName - The PascalCase name.
 * @returns The kebab-case representation of the name.
 */
export function pascalToKebab(pascalCaseName: string): string {
  return pascalCaseName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}
