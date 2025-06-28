import { Logout } from "@app/auth/authController";

export async function GET() {
    await Logout();
}