import { env } from "cloudflare:workers";
import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Link,
	Preview,
	Text,
} from "@react-email/components";
import * as React from "react";

interface ResetPasswordEmailProps {
	resetLink: string;
}

export const ResetPasswordEmail = ({ resetLink }: ResetPasswordEmailProps) => (
	<Html>
		<Head />
		<Preview>Reset your password for {env.BETTER_AUTH_URL}</Preview>
		<Body style={main}>
			<Container style={container}>
				<Heading style={h1}>Reset your password</Heading>
				<Text style={text}>
					Someone requested a password reset for your account. If this
					wasn&apos;t you, please ignore this email.
				</Text>
				<Link style={button} href={resetLink}>
					Reset Password
				</Link>
				<Text style={text}>
					If you&apos;re having trouble clicking the button, copy and paste this
					URL into your browser:
				</Text>
				<Text style={link}>{resetLink}</Text>
				<Text style={footer}>
					This link will expire in 1 hour. After that, you&apos;ll need to
					request a new password reset link.
				</Text>
			</Container>
		</Body>
	</Html>
);

const main = {
	backgroundColor: "#ffffff",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
	margin: "0 auto",
	padding: "20px 0 48px",
	maxWidth: "560px",
};

const h1 = {
	fontSize: "24px",
	fontWeight: "normal",
	textAlign: "center" as const,
	margin: "30px 0",
};

const text = {
	fontSize: "14px",
	lineHeight: "24px",
	margin: "16px 0",
	color: "#333",
};

const button = {
	backgroundColor: "#5850EC",
	borderRadius: "5px",
	color: "#fff",
	display: "block",
	fontSize: "14px",
	fontWeight: "bold",
	textAlign: "center" as const,
	textDecoration: "none",
	padding: "10px 16px",
	margin: "26px auto",
	width: "170px",
};

const link = {
	color: "#5850EC",
	display: "block",
	fontSize: "14px",
	textAlign: "center" as const,
	textDecoration: "underline",
	margin: "8px 0 24px",
	wordBreak: "break-all" as const,
};

const footer = {
	color: "#898989",
	fontSize: "12px",
	lineHeight: "22px",
	margin: "0",
};
