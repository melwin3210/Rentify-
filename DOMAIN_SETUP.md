# Custom Domain Setup for Rentify

## Option 1: Purchase a Custom Domain (Recommended)

### Step 1: Purchase a Domain
Buy a professional domain like:
- `rentify.app`
- `rentify.co`
- `myrentify.com`
- `rentifyplatform.com`

### Step 2: Configure in Vercel
1. Go to your Vercel dashboard
2. Select your `rentify` project
3. Go to Settings → Domains
4. Add your custom domain
5. Follow Vercel's DNS configuration instructions

### Step 3: Update Environment Variables
```env
NEXT_PUBLIC_APP_URL=https://rentify.app
```

## Option 2: Improve Vercel Project Name

### Step 1: Rename Project in Vercel
1. Go to Vercel dashboard
2. Project Settings → General
3. Change project name to: `rentify-platform`
4. This will give you: `https://rentify-platform.vercel.app`

### Step 2: Set Custom Vercel Alias
Add to vercel.json:
```json
{
  "alias": ["rentify-platform.vercel.app"]
}
```

## Option 3: Use Vercel's Built-in Alias Feature

Create a cleaner URL using Vercel's alias system.