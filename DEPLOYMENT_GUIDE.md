# 🚀 Deployment Guide - Ethiopia B2B Platform

Complete guide for deploying your Ethiopia B2B e-commerce platform to production.

---

## 📋 Deployment Options

| Service | Use For | Best For |
|---------|---------|----------|
| **Render** | Backend API | Simple, managed PostgreSQL included |
| **Vercel** | Storefront | Fast, global CDN for Next.js |
| **Railway** | Backend API | Alternative with DB included |
| **DigitalOcean** | Backend API | Full control, affordable |

---

## 🎯 Recommended Setup

```
Backend (Medusa API)
    ↓ Deployed on Render
    ↓ With Render PostgreSQL
    ↓ https://your-api.onrender.com

Storefront (Next.js)
    ↓ Deployed on Vercel
    ↓ Connected to Backend API
    ↓ https://your-store.vercel.app

Admin Panel
    ↓ Included in Backend
    ↓ https://your-api.onrender.com/app
```

---

# 🔷 Part 1: Deploy Backend to Render

## Step 1: Prepare Your Repository

### Create `.env.production` file:
```bash
# In backend/ directory
# Copy this to Render environment variables
DATABASE_URL=<render-will-provide>
JWT_SECRET=your-super-secret-jwt-key-here
COOKIE_SECRET=your-super-secret-cookie-key-here
STORE_CORS=https://your-store.vercel.app
ADMIN_CORS=https://your-api.onrender.com
AUTH_CORS=https://your-api.onrender.com
NODE_ENV=production
```

### Update `package.json` (backend):
```json
{
  "scripts": {
    "build": "medusa build",
    "start": "medusa start",
    "seed": "medusa exec ./src/scripts/seed.ts",
    "demo-setup": "medusa exec ./src/scripts/demo-setup.ts",
    "dev": "medusa develop"
  },
  "engines": {
    "node": ">=20"
  }
}
```

## Step 2: Create Render Account

1. Go to https://render.com
2. Sign up with GitHub
3. Grant access to your repository

## Step 3: Create PostgreSQL Database

1. Click **"New +"** → **"PostgreSQL"**
2. Settings:
   - **Name**: `medusa-ethiopia-db`
   - **Database**: `medusa_et`
   - **User**: `medusa_admin`
   - **Region**: Choose closest to Ethiopia (e.g., Frankfurt, Singapore)
   - **Plan**: Free (or Starter for production)
3. Click **"Create Database"**
4. **Copy** the **Internal Database URL** (starts with `postgres://`)

## Step 4: Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:

### Basic Settings
- **Name**: `medusa-ethiopia-backend`
- **Region**: Same as database
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start`

### Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

Add these:
```
DATABASE_URL = <paste-internal-database-url-from-step-3>
JWT_SECRET = <generate-random-32-char-string>
COOKIE_SECRET = <generate-random-32-char-string>
STORE_CORS = https://your-store.vercel.app
ADMIN_CORS = https://medusa-ethiopia-backend.onrender.com
AUTH_CORS = https://medusa-ethiopia-backend.onrender.com
NODE_ENV = production
```

**Generate secrets**:
```bash
# In terminal
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Instance Settings
- **Plan**: Free (or Starter for production)
- **Health Check Path**: `/health`

4. Click **"Create Web Service"**

## Step 5: Wait for Deployment

- First deploy takes ~5-10 minutes
- Watch logs for any errors
- Status should show "Live" when ready

## Step 6: Seed Database

### Option A: Via Render Shell
1. Go to your web service
2. Click **"Shell"** tab
3. Run:
```bash
npm run seed
npm run demo-setup
```

### Option B: Via Environment Variable
1. Add environment variable:
   ```
   AUTO_SEED = true
   ```
2. Modify your start script to seed on first run

## Step 7: Test Backend

Visit:
- **API**: https://medusa-ethiopia-backend.onrender.com/health
- **Admin**: https://medusa-ethiopia-backend.onrender.com/app

Create admin account on first visit.

---

# ▲ Part 2: Deploy Storefront to Vercel

## Step 1: Prepare Storefront

### Create `.env.production` in `storefront/`:
```bash
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://medusa-ethiopia-backend.onrender.com
NEXT_PUBLIC_BASE_URL=https://your-store.vercel.app
NEXT_PUBLIC_DEFAULT_REGION=et
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=<get-from-admin-panel>
```

### Get Publishable Key:
1. Login to admin: https://medusa-ethiopia-backend.onrender.com/app
2. Go to **Settings** → **Publishable API Keys**
3. Copy the key for "Webshop"

### Update `storefront/next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["medusa-public-images.s3.eu-west-1.amazonaws.com"],
  },
  env: {
    NEXT_PUBLIC_MEDUSA_BACKEND_URL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
  },
}

module.exports = nextConfig
```

## Step 2: Create Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub
3. Import your repository

## Step 3: Configure Project

1. Click **"Add New..."** → **"Project"**
2. Import your repository
3. Configure:

### Project Settings
- **Framework Preset**: Next.js
- **Root Directory**: `storefront`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Environment Variables
Add these in Vercel dashboard:
```
NEXT_PUBLIC_MEDUSA_BACKEND_URL = https://medusa-ethiopia-backend.onrender.com
NEXT_PUBLIC_BASE_URL = https://your-store.vercel.app
NEXT_PUBLIC_DEFAULT_REGION = et
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY = <your-publishable-key>
```

4. Click **"Deploy"**

## Step 4: Update CORS

After deployment, copy your Vercel URL (e.g., `https://your-store.vercel.app`)

Go back to **Render** → your backend service → **Environment**:

Update `STORE_CORS`:
```
STORE_CORS = https://your-store.vercel.app,https://your-custom-domain.com
```

Click **"Save Changes"** (this will redeploy)

## Step 5: Test Storefront

Visit your Vercel URL and test:
- ✅ Homepage loads
- ✅ Products display with ETB prices
- ✅ Can browse categories
- ✅ Cart functionality works
- ✅ Company login works

---

# 🌐 Part 3: Custom Domain Setup

## For Backend (Render)

1. Go to **Render** → your service → **Settings**
2. Scroll to **Custom Domain**
3. Add your domain: `api.yourdomain.et`
4. Add DNS records (provided by Render):
   ```
   Type: CNAME
   Name: api
   Value: <render-provided-value>
   ```
5. Wait for SSL certificate (auto-issued)

## For Storefront (Vercel)

1. Go to **Vercel** → your project → **Settings** → **Domains**
2. Add domain: `www.yourdomain.et`
3. Add DNS records:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. SSL auto-configured

## Update Environment Variables

After custom domains are live, update:

**Backend (Render)**:
```
ADMIN_CORS = https://api.yourdomain.et
AUTH_CORS = https://api.yourdomain.et
STORE_CORS = https://www.yourdomain.et
```

**Storefront (Vercel)**:
```
NEXT_PUBLIC_MEDUSA_BACKEND_URL = https://api.yourdomain.et
NEXT_PUBLIC_BASE_URL = https://www.yourdomain.et
```

---

# 🔒 Part 4: Security Setup

## Environment Secrets

Never commit these to GitHub:
- `JWT_SECRET`
- `COOKIE_SECRET`
- `DATABASE_URL`
- API keys

Use Render/Vercel environment variables.

## CORS Configuration

Whitelist only your domains:
```
STORE_CORS=https://www.yourdomain.et
ADMIN_CORS=https://api.yourdomain.et
```

## Database Backups

### Render PostgreSQL:
1. Upgrade to paid plan for automated backups
2. Or manually backup via Shell:
```bash
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
```

### Download backups regularly

## HTTPS/SSL

- Render: Auto-configured ✅
- Vercel: Auto-configured ✅

---

# 📊 Part 5: Monitoring & Logging

## Render Monitoring

1. **Logs**: View in dashboard → Logs tab
2. **Metrics**: View CPU, Memory, Requests
3. **Alerts**: Set up email alerts for downtime

## Vercel Analytics

1. Enable **Vercel Analytics** in project settings
2. View:
   - Page views
   - Performance metrics
   - Top pages

## Custom Monitoring

Consider adding:
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **DataDog**: Full observability

---

# 🚀 Part 6: Performance Optimization

## Backend (Render)

### Upgrade Instance
- Free tier: 512MB RAM (demo only)
- Starter: 2GB RAM (production)
- Standard: 4GB RAM (high traffic)

### Enable Redis
```bash
# Add to Render
REDIS_URL=redis://...
```

### Database Optimization
- Index frequently queried fields
- Connection pooling
- Query optimization

## Storefront (Vercel)

### Next.js Optimizations
- Image optimization (built-in)
- Static generation for product pages
- Incremental static regeneration
- Code splitting

### CDN Benefits
- Global edge network
- Automatic caching
- Zero-config

---

# 🔄 Part 7: Continuous Deployment

## Automatic Deployments

### Backend (Render)
- Auto-deploys on `main` branch push
- Can set up staging branch

### Storefront (Vercel)
- Auto-deploys on `main` branch push
- Preview deployments for PRs

## Deployment Workflow

```
1. Develop locally
   ↓
2. Commit to feature branch
   ↓
3. Push to GitHub
   ↓
4. Create Pull Request
   ↓
5. Vercel creates preview
   ↓
6. Review & test
   ↓
7. Merge to main
   ↓
8. Auto-deploy to production
```

---

# 📝 Part 8: Post-Deployment Checklist

## Backend
- [ ] Database seeded with Ethiopia data
- [ ] Admin account created
- [ ] Products uploaded
- [ ] Companies created
- [ ] Payment methods configured
- [ ] Email notifications working
- [ ] CORS properly configured
- [ ] Health check passing
- [ ] SSL certificate active

## Storefront
- [ ] Connects to backend API
- [ ] Products display correctly
- [ ] Prices show in ETB
- [ ] Cart functionality works
- [ ] Checkout flow works
- [ ] Company login works
- [ ] Quote system works
- [ ] Responsive on mobile
- [ ] SEO metadata set
- [ ] Analytics configured

## Custom Domains
- [ ] Backend domain configured
- [ ] Storefront domain configured
- [ ] DNS records propagated
- [ ] SSL certificates issued
- [ ] All redirects working

## Testing
- [ ] Create test order
- [ ] Test company registration
- [ ] Test employee login
- [ ] Test quote request
- [ ] Test approval workflow
- [ ] Test all payment methods
- [ ] Test email notifications

---

# 💰 Cost Estimation

## Free Tier (Demo/Testing)

| Service | Plan | Cost |
|---------|------|------|
| Render PostgreSQL | Free | $0/month |
| Render Web Service | Free | $0/month |
| Vercel | Free | $0/month |
| **Total** | | **$0/month** |

**Limitations**:
- Sleeps after inactivity
- Limited resources
- Not for production

## Production Setup

| Service | Plan | Cost |
|---------|------|------|
| Render PostgreSQL | Starter | $7/month |
| Render Web Service | Starter | $7/month |
| Vercel | Pro (optional) | $20/month |
| **Total** | | **$14-34/month** |

## High Traffic Setup

| Service | Plan | Cost |
|---------|------|------|
| Render PostgreSQL | Standard | $65/month |
| Render Web Service | Standard | $25/month |
| Vercel | Pro | $20/month |
| **Total** | | **$110/month** |

---

# 🆘 Troubleshooting

## Build Failures

### Backend won't build
```bash
# Check Node version
node --version  # Should be 20+

# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Storefront won't build
```bash
# Check environment variables
# Make sure NEXT_PUBLIC_* variables are set

# Clear Next.js cache
rm -rf .next
npm run build
```

## Runtime Errors

### Database connection fails
- Check `DATABASE_URL` is correct
- Check database is running
- Check network connectivity

### CORS errors
- Update `STORE_CORS` with correct domain
- Include https://
- No trailing slash

### Payment fails
- Check payment provider configured
- Check region has payment methods
- Check logs for errors

## Performance Issues

### Slow API responses
- Upgrade Render instance
- Add Redis caching
- Optimize database queries
- Add database indexes

### Slow storefront
- Enable Next.js optimizations
- Use ISR for product pages
- Optimize images
- Use CDN

---

# 📚 Additional Resources

## Documentation
- Medusa Docs: https://docs.medusajs.com
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs

## Support
- Medusa Discord: https://discord.gg/medusajs
- Render Community: https://community.render.com
- Vercel Community: https://github.com/vercel/next.js/discussions

---

**🎉 Your Ethiopia B2B platform is now live!**

- **Backend**: https://your-api.onrender.com
- **Admin**: https://your-api.onrender.com/app
- **Storefront**: https://your-store.vercel.app

**Ready to serve Ethiopian businesses nationwide! 🇪🇹**
