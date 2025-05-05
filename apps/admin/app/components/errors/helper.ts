export const parseError = (
	error: unknown,
): { message?: string; stack?: string } => {
	if (error instanceof Error) {
		return {
			message: error.message,
			stack: error.stack,
		};
	}
	return {
		message: String(error),
		stack: undefined,
	};
};
