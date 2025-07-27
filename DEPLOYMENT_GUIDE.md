# AI Chat Widget - Coolify Deployment Guide

## Step-by-Step Deployment Instructions

### Step 1: Download Project Files
1. Download all project files from Replit
2. Create a new folder on your computer called `ai-chat-widget`
3. Extract/copy all files into this folder

### Step 2: Prepare for Git Repository
1. Open terminal/command prompt in the project folder
2. Initialize git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - AI Chat Widget"
   ```

### Step 3: Create GitHub/GitLab Repository
1. Go to GitHub.com or GitLab.com
2. Create a new repository called `ai-chat-widget`
3. Make it public or private (your choice)
4. Copy the repository URL

### Step 4: Push Code to Repository
```bash
git remote add origin YOUR_REPOSITORY_URL
git branch -M main
git push -u origin main
```

### Step 5: Set Up Coolify Deployment

#### 5.1 Login to Coolify
1. Access your Coolify dashboard
2. Go to "Applications" section

#### 5.2 Create New Application
1. Click "New Application"
2. Choose "Public Git Repository"
3. Enter your repository URL
4. Set branch to `main`

#### 5.3 Configure Build Settings
- **Application Name**: `ai-chat-widget`
- **Build Pack**: `Docker`
- **Port**: `5000`
- **Dockerfile Path**: `./Dockerfile` (default)

#### 5.4 Configure Domain
1. Set custom domain: `chatwidget.datagen.agency`
2. Enable HTTPS/SSL certificate
3. Wait for DNS propagation

#### 5.5 Environment Variables
Set the following environment variable:
- `NODE_ENV` = `production`

#### 5.6 Deploy
1. Click "Deploy" button
2. Monitor build logs for any errors
3. Wait for deployment to complete

### Step 6: Verify Deployment
1. Visit `https://chatwidget.datagen.agency`
2. Check that the homepage loads
3. Verify the blue chat widget appears in bottom-left corner
4. Test sending a message to confirm n8n integration works

### Step 7: Use Widget on Any Website
Add this single line to any website's HTML:
```html
<script src="https://chatwidget.datagen.agency/widget.js"></script>
```

## Troubleshooting

### Build Fails
- Check build logs in Coolify dashboard
- Ensure all dependencies are in package.json
- Verify Dockerfile syntax

### Widget Not Appearing
- Check browser console for JavaScript errors
- Verify widget.js loads correctly
- Check if domain is blocked by ad blockers

### API Errors
- Check server logs in Coolify
- Verify n8n webhook is accessible
- Check network connectivity

### SSL/HTTPS Issues
- Wait for certificate generation (can take 10-15 minutes)
- Verify domain DNS points to Coolify server
- Check Coolify SSL settings

## File Structure After Deployment
```
ai-chat-widget/
├── client/                 # React frontend
├── server/                 # Express backend
├── public/                 # Static files including widget.js
├── shared/                 # Shared types/schemas
├── Dockerfile             # Container configuration
├── healthcheck.js         # Health monitoring
├── package.json           # Dependencies and scripts
└── dist/                  # Built application (generated)
```

## Security Features
- ✅ Domain validation for n8n webhooks
- ✅ CORS protection
- ✅ Input validation with Zod
- ✅ HTTPS encryption
- ✅ Session management

## Support
If you encounter issues:
1. Check Coolify application logs
2. Review browser console errors
3. Verify n8n webhook endpoint is working
4. Test with curl commands for API debugging