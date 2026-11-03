import {spawn} from 'node:child_process';
const args=process.argv.slice(2),port=args.includes('--port')?args[args.indexOf('--port')+1]:(process.env.PORT||'3000');
const child=spawn(process.execPath,['node_modules/next/dist/bin/next','dev','--webpack','--hostname','0.0.0.0','--port',port],{stdio:'inherit',env:process.env});
for(const sig of ['SIGTERM','SIGINT'])process.on(sig,()=>child.kill(sig));child.on('exit',code=>process.exit(code||0));
