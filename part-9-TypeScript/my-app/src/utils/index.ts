/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled deiscriminated union member: ${JSON.stringify(value)}`
  );
};
