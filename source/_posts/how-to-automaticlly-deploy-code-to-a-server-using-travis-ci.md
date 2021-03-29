---
title: 通过travis-ci自动部署代码到服务器
date: 2020-06-01 21:11:17
tags: [ci-cd,travis-ci]
---

# Auto-Deploying via Travis CI
Because Travis CI can automatically execute scripts after successfully (or unsuccessfully!) executing tests, it is an obvious choice for a deployment tool. In order to deploy to a Git repository on a remote server, the process generally is as follows:
- Set up SSH keys
- Add the server's copy of the repository as a Git remote
- Push to the remote
- SSH into the server and execute any installation/compilation/miscellaneous commands

## Before even touching `.travis.yml`...

### Users
[Git recommends using a separate `git` user](https://git-scm.com/book/en/v2/Git-on-the-Server-Setting-Up-the-Server) for remote interactions. However, your repositories might be under a separate user (`apps`, for example), so you'll need to add both those users to a group (`deploy`, for example).

### SSH keypair
**Make sure to generate an SSH keypair for passwordless login!** This can be done on from the commandline via `ssh-keygen -t rsa` (provided OpenSSH is installed, which it normally is for Linux and other emulation layers like Git Bash) or through GUI tools like PuTTYgen. It does not matter where you generate the keys. When prompted for a passphrase, **make sure to leave it blank** so that Travis can automatically login. Make note of where the keys are generated. Now use either the `ssh-copy-id` tool or manually add the public key to `~/.ssh/authorized_keys` for both your `git` and `apps` users. (If you don't need to execute any additional commands after pushing your latest commits to the remote, feel free to skip the `apps` user in this step.)

Next you'll need to encrypt the private key via the Travis CLI. Note that a Linux/OSX environment is necessary for this function to work properly, so some sort of emulation layer is necessary for Windows. Either way, [install the Travis CLI](https://github.com/travis-ci/travis.rb#installation). Once you've done that, run `travis encrypt-file id_rsa` (your filename may differ). I would recommend running this command inside your repository and using the `--add` flag to automatically add the correct commands to `.travis.yml`. Check this `id_rsa.enc` file into Git (I recommend putting under a `.travis` directory), but **do not** add the unencrypted `id_rsa` file; however, you should add the `id_rsa.pub` file just in case. This does not need to be encrypted.

### Remote Git repository
Assuming you already have your Git repository cloned onto the remote server, the next step is to configure it to allow pushes. Run `git config --local receive.denyCurrentBranch updateInstead` to allow Git to accept pushes to a remote with a clean working tree. Once you've done that, make sure that the user and the group can access and modify the repository folder's contents (`chown apps:deploy -R my-repo; chmod g+rw -R my-repo`). You are now ready to start configuring Travis!

## Configuring Travis
The main configuration file that Travis uses is `.travis.yml`. The commands and configs you'll want to change depend on your language, so just take a look at the [official Travis guide](https://docs.travis-ci.com/user/customizing-the-build) for that. The only things you'll need to worry about are the `before_install` and `after_success` hooks. If you encrypted the SSH private key correctly, you should have a command in the `before_install` section containing some OpenSSL stuff. If you don't, try re-encrypting the file. The `after_success` hook should contain the scripts you want to execute after your tests succeed. I named my script `deploy.sh` and put it in the `.travis` folder that I previously created during the encryption step.

Once you're done with the deploy script, push it to your repository and enable Travis integration for it. The next step is to add environment variables to Travis to keep your IP, SSH port, and deploy directory secret. In the Travis menu, select your repository, click "More options", and click "Settings". Scroll down until you see the list of environment variables. There should be some already there that were added by the Travis CLI in the form `encrypted_[hex string]_iv/key`. Leave those alone. Add `IP`, `PORT`, and `DEPLOY_DIR` variables with their corresponding values. For full security, do not display these values in the build log. Once you've finished that, you're done!

## Deploy script
Here's what your `deploy.sh` should look like.

```bash
#!/bin/bash

eval "$(ssh-agent -s)" # Start ssh-agent cache
chmod 600 .travis/id_rsa # Allow read access to the private key
ssh-add .travis/id_rsa # Add the private key to SSH

git config --global push.default matching
git remote add deploy ssh://git@$IP:$PORT$DEPLOY_DIR
git push deploy master

# Skip this command if you don't need to execute any additional commands after deploying.
ssh apps@$IP -p $PORT <<EOF
  cd $DEPLOY_DIR
  crystal build --release --no-debug index.cr # Change to whatever commands you need!
EOF
```

 - [original source](https://gist.github.com/nickbclifford/16c5be884c8a15dca02dca09f65f97bd)