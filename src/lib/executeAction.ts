"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";

type ActionResponse = {
  success: boolean;
  message: string;
};

/**
 * Executes an asynchronous action function and handles its success or error state.
 *
 * @param actionFn The asynchronous function to execute. It should not return anything directly
 * if its primary purpose is side effects (like database writes or redirects).
 * @param successMessage Optional message to return on successful execution.
 * @returns An object indicating success status and a message.
 * @throws If the `actionFn` throws a Next.js redirect error, it re-throws it to be handled by Next.js.
 */
export default async function executeAction(
  actionFn: () => Promise<void> | Promise<any>,
  successMessage: string = "Run successfully!!"
): Promise<ActionResponse> {
  try {
    await actionFn();

    return {
      success: true,
      message: successMessage,
    };
  } catch (error: unknown) {
    if (isRedirectError(error)) {
      throw error;
    }

    console.error("Error during action execution:", error);

    return {
      success: false,
      message: "An error has occurred during executing the action",
    };
  }
}
