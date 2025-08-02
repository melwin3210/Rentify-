#!/usr/bin/env node

/**
 * Clean deployment script for Rentify
 * This script helps deploy with a cleaner, more professional URL
 */

const { execSync } = require('child_process');

console.log('🚀 Deploying Rentify with clean URL...');

try {
  // Deploy to production with specific project name
  console.log('📦 Building and deploying...');
  execSync('vercel --prod --name rentify-platform', { stdio: 'inherit' });
  
  console.log('✅ Deployment successful!');
  console.log('🌐 Your app is now available at: https://rentify-platform.vercel.app');
  console.log('');
  console.log('💡 For an even more professional look, consider:');
  console.log('   1. Purchasing a custom domain (rentify.app, myrentify.com)');
  console.log('   2. Setting up the domain in Vercel dashboard');
  console.log('   3. Updating NEXT_PUBLIC_APP_URL in environment variables');
  
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}