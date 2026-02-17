## installing github(gh)

For releasing from the cli I installed gh, I used 
**sudo apt install gh**

## Creating a tag

First I had to create a tag yiou can do it later with the release to.
created a tag using 

git tag -a version1.0 -m "add message"

## releasing 

For this I used gh, authenticate gh using **gh login auth**
then i released the my version 1.0 using this command.

**git release create version1.0 --title "v1" --notes "my first release"**