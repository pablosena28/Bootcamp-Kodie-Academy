import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({plugins:[react()],server:{proxy:{'/api':{target:'https://apoio-em-dia-pablo.royalkiwi66.chatgpt.site',changeOrigin:true}}}});
