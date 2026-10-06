const { spawn } = require('child_process');
const path = require('path');

const withTunnel = process.argv.includes('--tunnel') || process.env.TUNNEL === 'true';

console.log('=========================================================================');
console.log('  🏛  CHỦ TỊCH NƯỚC - VẬN MỆNH QUỐC GIA - KHỞI ĐỘNG HỆ THỐNG FULLSTACK  🏛');
console.log('=========================================================================\n');

console.log('[1/3] Đang khởi động Backend NestJS trên http://localhost:4000...');
const server = spawn('npm', ['run', 'start'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true,
});

let tunnel = null;
if (withTunnel) {
  console.log('[2/3] Đang khởi động Ngrok Tunnel (https://resurface-exert-reaffirm.ngrok-free.dev)...');
  tunnel = spawn('ngrok', ['http', '4000', '--url=resurface-exert-reaffirm.ngrok-free.dev'], {
    stdio: 'inherit',
    shell: true,
  });
} else {
  console.log('ℹ️  Mẹo: Để bật Ngrok tunnel cùng lúc, chạy: npm run start -- --tunnel');
  console.log('   Hoặc nhấp đúp file: start_tunnel.bat\n');
}

console.log('[3/3] Đang khởi động Frontend NextJS trên http://localhost:3000...');
const client = spawn('npm', ['run', 'start'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: true,
});

function handleExit() {
  console.log('\nĐang tắt hệ thống game...');
  if (server && !server.killed) server.kill();
  if (client && !client.killed) client.kill();
  if (tunnel && !tunnel.killed) tunnel.kill();
  process.exit();
}

process.on('SIGINT', handleExit);
process.on('SIGTERM', handleExit);
