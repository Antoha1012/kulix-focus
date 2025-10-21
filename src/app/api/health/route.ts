/**
 * Purpose: Health check endpoint for monitoring and CI.
 * Boundaries: Server-only; returns basic app status.
 * Owner: @anton (initial)
 */
import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json({
		status: "healthy",
		timestamp: new Date().toISOString(),
		version: process.env.npm_package_version || "0.1.0",
		environment: process.env.NODE_ENV || "development",
	});
}
