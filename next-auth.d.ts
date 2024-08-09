import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface User {
		error?:
			| "missing_credentials"
			| "email_not_found"
			| "invalid_credentials";
	}

	interface Session {
		user: {
			_id?: string;
			email?: string;
			name?: string;
		} & DefaultSession["user"];
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		_id?: string;
		email?: string;
		name?: string;
	}
}
