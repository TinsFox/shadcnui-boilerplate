import { env } from "env";
import { Resend } from "resend";
export const resend = new Resend(env.RESEND_API_KEY);

export const sendEmail = async (
	email: string,
	subject: string,
	html: string,
) => {
	await resend.emails.send({
		from: env.BETTER_AUTH_EMAIL || "",
		to: email,
		subject,
		html,
	});
};
