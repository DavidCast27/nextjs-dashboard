import { ReactElement } from "react";

export const ErrorsByField = ({ id, errors, }: { id: string; errors?: Array<string> }): ReactElement => {
  return (
    <div id={id} aria-live="polite" aria-atomic="true">
      {errors &&
        errors.map((error: string) => (
          <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
          </p>
        ))}
    </div>
  )
}