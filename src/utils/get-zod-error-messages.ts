import { ZodFormattedError } from "zod";

export function getZodErrorMessages<T>(error: ZodFormattedError<T>): string[] {
  const messages: string[] = [];

  function extract(err: unknown): void {
    if (!err || typeof err !== "object") return;

    const typedErr = err as { _errors?: string[] } & Record<string, unknown>;

    if (Array.isArray(typedErr._errors)) {
      messages.push(...typedErr._errors);
    }

    for (const key in typedErr) {
      if (key !== "_errors") {
        extract(typedErr[key]);
      }
    }
  }

  extract(error);

  return messages.filter(Boolean);
}
