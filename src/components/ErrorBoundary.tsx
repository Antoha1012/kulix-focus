"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
	error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		if (process.env.NODE_ENV === "development") {
			console.error("ErrorBoundary caught an error:", error, errorInfo);
		}
	}

	handleRetry = () => {
		this.setState({ hasError: false, error: undefined });
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<Card className="bg-gradient-to-br from-red-900/20 to-red-800/10 border-red-400/40">
					<CardContent className="p-6 text-center">
						<AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
						<h3 className="text-lg font-semibold text-red-200 mb-2">
							Something went wrong
						</h3>
						<p className="text-red-300 mb-4">
							We encountered an unexpected error. Please try
							refreshing the page.
						</p>
						{process.env.NODE_ENV === "development" &&
							this.state.error && (
								<details className="text-left mb-4 p-3 bg-red-900/20 rounded border border-red-400/20">
									<summary className="cursor-pointer text-red-200 font-medium">
										Error Details
									</summary>
									<pre className="text-xs text-red-300 mt-2 whitespace-pre-wrap">
										{this.state.error.message}
									</pre>
								</details>
							)}
						<Button
							onClick={this.handleRetry}
							className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
						>
							<RefreshCw className="h-4 w-4 mr-2" />
							Try Again
						</Button>
					</CardContent>
				</Card>
			);
		}

		return this.props.children;
	}
}
