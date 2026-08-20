import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ['192.168.*.*', '10.*.*.*', '172.*.*.*'],
}

export default nextConfig
