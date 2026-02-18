# Note

## GitHUb setup

I created a repository from my personal github account naming it as rajat_fullstack, and giving all the info like discription.

## Ssh key steps and configuration

Generated a ssh key from terminal using command
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```
then I started my agent and gave the private key to it using command.

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```
next copied my public key from .ssh folder using command

```bash
cat ~/.ssh/id_ed25519.pub
```
and now went to github -> settings -> ssh key
created a new key using the ssh public key which I have copied from .ssh folder.

And now I am good to use git/github from my terminal.