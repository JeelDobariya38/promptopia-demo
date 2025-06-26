import { isRedirectError } from "next/dist/client/components/redirect-error";


export default executeAction = async (actionFn, successMessage) => {
    try {
        await actionFn();

        return {
            success: true,
            message: successMessage,
        };
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }

        return {
            success: false,
            message: "An error has occurred during executing the action",
        };
    }
};
