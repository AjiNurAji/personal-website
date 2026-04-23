import { auth } from "~/auth";

export default auth;
export const proxy = auth;

export const config = {
	matcher: ["/dashboard/:path*", "/login"],
};
