import {defineConfig} from 'vite';
import vinext from 'vinext';
import {cloudflare} from '@cloudflare/vite-plugin';
export default defineConfig({plugins:[vinext(),cloudflare({configPath:'wrangler.local.jsonc',viteEnvironment:{name:'rsc',childEnvironments:['ssr']},persistState:{path:'.wrangler/state'},inspectorPort:false})]});
