# Container Health Debug Fix

## Issue Identified
The service is showing as unhealthy likely due to server startup issues in the Docker container environment.

## Changes Made
1. **Simplified server.listen()** - Removed complex options that might cause issues
2. **Added comprehensive logging** - Console logs with timestamps for debugging
3. **Added error handling** - Catch and log startup errors
4. **Process exit on errors** - Proper cleanup if startup fails

## Files Changed
- `server/index.ts` - Fixed server binding and added error handling

## Deployment Instructions
1. **Push the fixes:**
   ```bash
   git add server/index.ts DEBUG_CONTAINER_FIX.md
   git commit -m "Fix container health - simplified server binding and added error logging"
   git push
   ```

2. **Check logs after deployment:**
   - In Coolify, go to your application
   - Click on "Logs" or "Container Logs" 
   - Look for the startup messages and any error details

3. **Expected logs:**
   ```
   [timestamp] Starting server initialization...
   [timestamp] Express server listening on port 5000
   serving on port 5000
   ```

## If Still Unhealthy
Check container logs for specific error messages. Common issues:
- Port binding conflicts
- Missing environment variables
- File permission issues
- Memory/resource constraints