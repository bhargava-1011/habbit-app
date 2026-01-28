# 🔧 Deployment Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: "command not found: deploy.sh" ❌

**Error Message:**
```bash
zsh: command not found: deploy.sh
# or
bash: deploy.sh: command not found
```

**Problem:**  
You're trying to run `deploy.sh` without the `./` prefix.

**Solution:**  
Use `./` before the script name:

```bash
# ❌ Wrong:
deploy.sh

# ✅ Correct:
./deploy.sh
```

**Why?**  
For security reasons, Unix-like systems (Linux, macOS) don't include the current directory (`.`) in the PATH. You must explicitly tell the shell to run a script from the current directory using `./`

---

### Issue 2: "Permission denied" ❌

**Error Message:**
```bash
zsh: permission denied: ./deploy.sh
# or
bash: ./deploy.sh: Permission denied
```

**Problem:**  
The script doesn't have execute permissions.

**Solution:**  
Make the script executable:

```bash
chmod +x deploy.sh
./deploy.sh
```

---

### Issue 3: "No such file or directory" ❌

**Error Message:**
```bash
zsh: no such file or directory: ./deploy.sh
```

**Problem:**  
You're not in the correct directory or the file doesn't exist.

**Solution:**  
Navigate to the repository directory first:

```bash
# Find your repository
cd ~/path/to/habbit-app
# or
cd /home/runner/work/habbit-app/habbit-app

# Verify the file exists
ls -la deploy.sh

# Then run it
./deploy.sh
```

---

### Issue 4: Authentication Failed During Push ❌

**Error Message:**
```bash
fatal: Authentication failed for 'https://github.com/...'
```

**Problem:**  
Git credentials not configured or expired.

**Solution:**

**Option A: Use SSH instead of HTTPS**
```bash
# Check current remote
git remote -v

# If using HTTPS, switch to SSH
git remote set-url origin git@github.com:bhargava-1011/habbit-app.git

# Try deploying again
./deploy.sh
```

**Option B: Set up GitHub token**
```bash
# Create a personal access token at:
# https://github.com/settings/tokens

# Configure git to use it
git config --global credential.helper store

# Try again (you'll be prompted for username and token)
./deploy.sh
```

---

### Issue 5: Merge Conflicts ❌

**Error Message:**
```bash
CONFLICT (content): Merge conflict in ...
Automatic merge failed; fix conflicts and then commit the result.
```

**Problem:**  
Changes on main branch conflict with feature branch.

**Solution:**

```bash
# View conflicting files
git status

# Edit files to resolve conflicts (look for <<<<<<, ======, >>>>>>)
# Then:
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

Or reset and try manual merge:
```bash
git merge --abort
# Use GitHub UI to create and merge pull request instead
```

---

### Issue 6: Already on Main Branch ⚠️

**Warning:**
```bash
Already on 'main'
```

**Not an Error:**  
This is just informational - the script found you're already on main.

**Action:**  
Continue normally, the script will proceed with merging.

---

## Quick Diagnostic Commands

### Check where you are:
```bash
pwd                          # Show current directory
ls -la deploy.sh            # Check if script exists
git branch --show-current   # Show current branch
```

### Check git status:
```bash
git status                  # See uncommitted changes
git remote -v              # See remote configuration
git log --oneline -5       # See recent commits
```

### Test script permissions:
```bash
ls -la deploy.sh           # Check permissions (-rwxr-xr-x means executable)
file deploy.sh             # Check file type
head -1 deploy.sh          # Check shebang (should be #!/bin/bash)
```

---

## Step-by-Step Deployment (Foolproof)

If you're having multiple issues, follow these steps exactly:

### 1. Navigate to Repository
```bash
cd ~/Desktop/build/habbit-app
# or wherever your repository is located

# Verify you're in the right place
ls -la deploy.sh
```

### 2. Ensure Script is Executable
```bash
chmod +x deploy.sh
```

### 3. Run the Script
```bash
./deploy.sh
```

### 4. Follow On-Screen Instructions
The script will guide you through each step.

### 5. If Script Fails, Use Manual Method
```bash
git checkout main || git checkout -b main
git merge copilot/run-my-code-task --no-edit
git push origin main
```

---

## Alternative: Deploy via GitHub UI

If terminal/script methods aren't working:

1. Go to: https://github.com/bhargava-1011/habbit-app
2. Click "Pull requests"
3. Click "New pull request"
4. Base: `main` ← Compare: `copilot/run-my-code-task`
5. Click "Create pull request"
6. Click "Merge pull request"
7. Click "Confirm merge"

Done! Vercel will auto-deploy in 2-5 minutes.

---

## Still Having Issues?

### Check These:

1. **Are you using the correct path?**
   ```bash
   # Print full path
   pwd
   ```

2. **Is the file actually there?**
   ```bash
   # List with details
   ls -la | grep deploy
   ```

3. **What shell are you using?**
   ```bash
   # Check shell
   echo $SHELL
   ```

4. **Try with bash explicitly:**
   ```bash
   bash deploy.sh
   # or
   bash ./deploy.sh
   ```

5. **Check git configuration:**
   ```bash
   git config --list | grep user
   git config --list | grep credential
   ```

---

## Environment-Specific Notes

### macOS (zsh)
- Default shell since Catalina
- Requires `./` prefix for scripts
- Use `chmod +x` for permissions

### Linux (bash/zsh)
- Requires `./` prefix for scripts
- Use `chmod +x` for permissions

### Windows (Git Bash)
- Should work with `./deploy.sh`
- May need to run as Administrator

### Windows (WSL)
- Same as Linux
- Ensure file has Unix line endings (LF not CRLF)

---

## Quick Reference Card

```bash
# Navigate to repo
cd /path/to/habbit-app

# Make executable (if needed)
chmod +x deploy.sh

# Run deployment
./deploy.sh

# Or manual deployment
git checkout main || git checkout -b main
git merge copilot/run-my-code-task
git push origin main
```

---

## Need More Help?

See other documentation:
- `README_DEPLOY.md` - Quick start guide
- `DEPLOY_NOW.md` - Complete deployment guide
- `HOW_TO_DEPLOY.md` - Detailed instructions

Or use the GitHub UI method described above.

---

**Remember: Always use `./deploy.sh` not just `deploy.sh`!** ✅
