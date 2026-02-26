
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/access" | "/dining" | "/experience" | "/oauth-success" | "/profile" | "/suites";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/access": Record<string, never>;
			"/dining": Record<string, never>;
			"/experience": Record<string, never>;
			"/oauth-success": Record<string, never>;
			"/profile": Record<string, never>;
			"/suites": Record<string, never>
		};
		Pathname(): "/" | "/access" | "/access/" | "/dining" | "/dining/" | "/experience" | "/experience/" | "/oauth-success" | "/oauth-success/" | "/profile" | "/profile/" | "/suites" | "/suites/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/images/logo.png" | "/robots.txt" | string & {};
	}
}