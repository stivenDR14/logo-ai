/**
 * Valida que las variables de entorno necesarias estén definidas
 */
export function validateEnvironment(requiredVars: string[]) {
  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    return {
      isValid: false,
      error: `Missing required environment variables: ${missingVars.join(
        ", "
      )}`,
    };
  }

  return { isValid: true };
}
