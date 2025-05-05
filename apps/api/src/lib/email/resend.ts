import * as process from "node:process";
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
	email: string,
	subject: string,
	html: string,
) => {
	await resend.emails.send({
		from: process.env.BETTER_AUTH_EMAIL || "",
		to: email,
		subject,
		html,
	});
};
