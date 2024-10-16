import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req) {
    const res = NextResponse.next();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name) {
                    return req.cookies.get(name)?.value;
                },
                set(name, value, options) {
                    req.cookies.set({
                        name, value, ...options
                    });
                    const response = NextResponse.next({
                        request: {
                            headers: req.headers
                        }
                    });
                    response.cookies.set({
                        name, value, ...options
                    });
                },
                remove(name, options) {
                    req.cookies.set({
                        name, value: '', ...options
                    });
                    const response = NextResponse.next({
                        request: {
                            headers: req.headers
                        }
                    });
                    response.cookies.set({
                        name, value: '', ...options
                    });
                }
            }
        }
    );

    // Remove the authentication check for open access
    return res; // Allow access to all
}

export const config = {
    matcher: ['/', '/photos'] // Define the paths this middleware applies to
};
