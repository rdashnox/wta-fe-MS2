export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["css/index.css","css/suites.css","images/logo.png","robots.txt"]),
	mimeTypes: {".css":"text/css",".png":"image/png",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.BCIc1HKT.js",app:"_app/immutable/entry/app.gqNmnR2l.js",imports:["_app/immutable/entry/start.BCIc1HKT.js","_app/immutable/chunks/5HIiGzq-.js","_app/immutable/chunks/BNCI9C8s.js","_app/immutable/chunks/BeyokSVw.js","_app/immutable/chunks/Dp2DCEtt.js","_app/immutable/entry/app.gqNmnR2l.js","_app/immutable/chunks/BNCI9C8s.js","_app/immutable/chunks/CzNmlj6E.js","_app/immutable/chunks/B6_CFXHU.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/Dp2DCEtt.js","_app/immutable/chunks/o86BNcyW.js","_app/immutable/chunks/tn8ylRoy.js","_app/immutable/chunks/BeyokSVw.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/dining",
				pattern: /^\/dining\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/experience",
				pattern: /^\/experience\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/oauth-success",
				pattern: /^\/oauth-success\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/suites",
				pattern: /^\/suites\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
