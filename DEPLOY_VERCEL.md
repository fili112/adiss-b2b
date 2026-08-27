# 🚀 Deploy to Vercel - Ethiopia B2B Platform

Complete guide to deploy your Ethiopia B2B e-commerce platform to Vercel.

---

## 📋 Prerequisites

- ✅ Vercel account (free tier works)
- ✅ GitHub account
- ✅ PostgreSQL database (we'll use Vercel Postgres or external)
- ✅ Your customized Ethiopia B2B code

---

## 🎯 Deployment Steps

### Step 1: Prepare Your Repository

#### Push to GitHub
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Ethiopia B2B platform ready for deployment"

# Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/medusa-b2b-ethiopia.git
git branch -M main
git push -u origin main
```

#### Create `.gitignore` (if not exists)
```bash
# Add to .gitignore
node_modules/
.env
.env.local
dist/
build/
.DS_Store
*.log
.medusa/
backend/.medusa/server/
```

---

### Step 2: Set Up Database

#### Option A: Vercel Postgres (Recommended for Testing)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Storage** → **Create Database**
3. Select **Postgres**
4. Choose a name: `medusa-ethiopia-db`
5. Region: Choose closest to Ethiopia (Europe - Frankfurt or Asia - Mumbai)
6. Click **Create**
7. Copy the connection string: `postgres://...`

#### Option B: External PostgreSQL (Recommended for Production)

Use services like:
- **Render Postgres** (free tier available)
- **Neon** (serverless Postgres)
- **Supabase** (includes Postgres)
- **Railway** (simple setup)

Get your connection string in format:
```
postgres://username:password@host:port/database
```

---

### Step 3: Configure Vercel Project

#### Import Project
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Select **medusa-b2b-ethiopia**

#### Configure Build Settings

**Framework Preset**: Other
**Root Directory**: `backend`
**Build Command**:
```bash
npm install && npm run build
```
**Output Directory**: Leave empty
**Install Command**:
```bash
npm install
```

---

### Step 4: Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

#### Required Variables
```env
# Database
DATABASE_URL=postgres://YOUR_CONNECTION_STRING_HERE

# CORS Settings (Update after deployment)
STORE_CORS=https://your-store-domain.com
ADMIN_CORS=https://your-admin-domain.vercel.app
AUTH_CORS=https://your-admin-domain.vercel.app

# Secrets
JWT_SECRET=your-super-secret-jwt-key-here-min-32-chars
COOKIE_SECRET=your-super-secret-cookie-key-here-min-32-chars

# Database Name
DB_NAME=medusa-et

# Node Environment
NODE_ENV=production
```

#### Generate Secrets
```bash
# Generate random secrets (run locally)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### Step 5: Create `vercel.json`

Create this file in **backend** folder:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

---

### Step 6: Update Package.json

Ensure your `backend/package.json` has:

```json
{
  "scripts": {
    "build": "medusa build",
    "start": "medusa start",
    "dev": "medusa develop",
    "seed": "medusa exec ./src/scripts/seed.ts",
    "demo-setup": "medusa exec ./src/scripts/demo-setup.ts"
  },
  "engines": {
    "node": ">=20"
  }
}
```

---

### Step 7: Deploy

#### Initial Deployment
1. Click **Deploy** in Vercel
2. Wait for build (~2-5 minutes)
3. Note your deployment URL: `https://your-project.vercel.app`

#### Run Migrations & Seed

After deployment, you need to seed the database:

**Option A: Use Vercel CLI (Recommended)**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link project
vercel link

# Run seed command
vercel exec --prod -- npm run seed

# Run demo setup
vercel exec --prod -- npm run demo-setup
```

**Option B: Connect to Database Directly**
```bash
# Install PostgreSQL client
# Connect to your Vercel Postgres
psql "postgres://YOUR_CONNECTION_STRING"

# Then run locally
DATABASE_URL="postgres://YOUR_CONNECTION_STRING" npm run build
DATABASE_URL="postgres://YOUR_CONNECTION_STRING" npm run seed
DATABASE_URL="postgres://YOUR_CONNECTION_STRING" npm run demo-setup
```

---

### Step 8: Update CORS Settings

After deployment, update environment variables:

1. Get your deployed URL: `https://your-project.vercel.app`
2. Go to Vercel Dashboard → Settings → Environment Variables
3. Update:
   ```env
   ADMIN_CORS=https://your-project.vercel.app
   AUTH_CORS=https://your-project.vercel.app
   STORE_CORS=https://your-store-domain.com
   ```
4. Redeploy for changes to take effect

---

### Step 9: Access Admin Panel

Your admin panel will be at:
```
https://your-project.vercel.app/app
```

**First Login**:
1. Visit the URL
2. Create admin account
3. Login with credentials
4. Start managing!

---

## 🔧 Vercel-Specific Configuration

### Build Output

Vercel expects serverless functions. Medusa needs adjustment:

#### Create `backend/api/index.js`:
```javascript
const { Medusa } = require('@medusajs/medusa');

let app;

async function getApp() {
  if (!app) {
    const medusa = await Medusa({
      projectConfig: {
        databaseUrl: process.env.DATABASE_URL,
        http: {
          storeCors: process.env.STORE_CORS,
          adminCors: process.env.ADMIN_CORS,
          authCors: process.env.AUTH_CORS,
          jwtSecret: process.env.JWT_SECRET,
          cookieSecret: process.env.COOKIE_SECRET,
        },
      },
    });
    app = medusa.app;
  }
  return app;
}

module.exports = async (req, res) => {
  const app = await getApp();
  app(req, res);
};
```

### Serverless Function Settings

Add to `vercel.json`:
```json
{
  "functions": {
    "api/index.js": {
      "memory": 1024,
      "maxDuration": 30
    }
  }
}
```

---

## 📊 Monitoring & Logs

### View Logs
1. Go to Vercel Dashboard
2. Click your project
3. Go to **Deployments** → Select latest
4. Click **View Function Logs**

### Check Database
```bash
# Using Vercel CLI
vercel env pull .env.production

# Connect to database
psql $(grep DATABASE_URL .env.production | cut -d '=' -f2-)
```

---

## 🚨 Troubleshooting

### Build Fails

**Error**: "Module not found"
```bash
# Ensure all dependencies in package.json
npm install
npm run build  # Test locally first
```

**Error**: "Out of memory"
```json
// Increase memory in vercel.json
{
  "functions": {
    "api/index.js": {
      "memory": 3008
    }
  }
}
```

### Database Connection Issues

**Error**: "Connection timeout"
- Check DATABASE_URL is correct
- Ensure Vercel IP is allowed in database firewall
- Try different database region (closer to Vercel deployment)

### CORS Errors

**Error**: "CORS policy blocked"
```env
# Update environment variables with correct domains
ADMIN_CORS=https://your-project.vercel.app,https://custom-domain.com
STORE_CORS=https://your-store.com
```

### Seed Fails on Vercel

Run seeds locally pointing to production database:
```bash
DATABASE_URL="postgres://production-url" npm run seed
```

---

## 🌐 Custom Domain

### Add Custom Domain

1. Go to Vercel Dashboard → Project Settings
2. Click **Domains**
3. Add your domain: `admin.yourbusiness.et`
4. Follow DNS instructions
5. Wait for SSL certificate (automatic)

### Update Environment Variables
```env
ADMIN_CORS=https://admin.yourbusiness.et
AUTH_CORS=https://admin.yourbusiness.et
```

---

## 💡 Production Best Practices

### Security
- ✅ Use strong JWT and Cookie secrets (32+ characters)
- ✅ Enable HTTPS only
- ✅ Restrict CORS to specific domains
- ✅ Use environment variables for all secrets
- ✅ Enable database SSL

### Performance
- ✅ Use Vercel Edge Network (automatic)
- ✅ Enable caching where possible
- ✅ Monitor function execution time
- ✅ Optimize database queries
- ✅ Use connection pooling

### Backup
- ✅ Regular database backups (daily)
- ✅ Store backups in separate location
- ✅ Test restore procedure
- ✅ Keep Git history clean

---

## 📱 Scaling

### Free Tier Limits
- 100GB bandwidth/month
- 100 hours serverless function execution
- 1 concurrent build

### Pro Tier ($20/month)
- 1TB bandwidth
- 1000 hours execution
- Unlimited team members

### Enterprise
- Custom limits
- SLA guarantees
- Priority support

---

## 🔄 Continuous Deployment

### Automatic Deployments
Vercel auto-deploys when you push to GitHub:

```bash
git add .
git commit -m "Update product pricing"
git push origin main
```

Vercel will:
1. Detect the push
2. Build automatically
3. Deploy to production
4. No downtime!

### Preview Deployments
Create a branch for testing:
```bash
git checkout -b feature/new-pricing
# Make changes
git push origin feature/new-pricing
```

Vercel creates a preview URL:
- Test changes safely
- Share with team
- Merge when ready

---

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] Code pushed to GitHub
- [ ] `.env` variables documented
- [ ] Database created and accessible
- [ ] All tests passing locally
- [ ] Build works locally

### During Deployment
- [ ] Vercel project created
- [ ] Environment variables set
- [ ] Build settings configured
- [ ] Initial deployment successful
- [ ] Database migrated

### Post-Deployment
- [ ] Seeds run successfully
- [ ] Admin panel accessible
- [ ] Login works
- [ ] Companies visible
- [ ] Products display correctly
- [ ] Orders can be created
- [ ] CORS configured correctly

---

## 🆘 Support

### Vercel Issues
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support
- Community: https://github.com/vercel/vercel/discussions

### Medusa Issues
- Docs: https://docs.medusajs.com
- Discord: https://discord.gg/medusajs
- GitHub: https://github.com/medusajs/medusa

---

## 🎉 Success!

Your Ethiopia B2B platform is now live on Vercel:

✅ **Admin Panel**: `https://your-project.vercel.app/app`  
✅ **API**: `https://your-project.vercel.app/admin/*`  
✅ **Store API**: `https://your-project.vercel.app/store/*`  

**All configured for Ethiopia**:
- Currency: Ethiopian Birr (ETB) ✅
- Region: Ethiopia only ✅
- Demo companies ready ✅
- B2B features active ✅

---

**Deployment Time**: ~15-20 minutes  
**Cost**: Free tier available  
**Scalability**: Auto-scales with traffic 🚀
