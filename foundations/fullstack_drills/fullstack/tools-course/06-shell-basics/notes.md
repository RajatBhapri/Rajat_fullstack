# shell basics


## navigation

Revised how to navigate from or to a directory and creating and deleting a directory from commands. using  

```bash
cd filename
cd ..     //for previois directory
mkdir filename     //creating a new directory
rm filename     //to delete a file or folder
```

## File operations

Created 3 new text files for the 2nd drill a.txt, b.yxt, c.txt.
Renamed b.txt file to renamed_file.txt.
Copied c.txt file in the same directory with different name and in a diffrent directory to.
deleted a.txt file.
using commands - 
```bash
touch a.txt b.txt c.txt
mv b.txt renamed_bfile.txt      // to rename we have to use move command.
cp c.txt z.txt           // same directory with different name
cp c.txt ~/aganitha     //diffrent directory
rm a.txt            // deleting file

```

## Writing into files

Overwrote and appended text into c.txt file using ">" and ">>"
using command - 

```bash
echo "hello world" > c.txt    //cat c.txt **output-hello world**
echo "hiiii" >> c.txt       //cat c.txt **output-hello world hiiii**
echo "overwriting" > c.txt      //cat c.txt **output- overwriting**
```

## Inspecting files

Worked on command which can display a file differently using cat,less, head, tail and wc

commands used -
```bash
cat c.txt
less c.txt
head c.txt
- head -n 3 c.txt
tail c.txt
- tail -n 5 c.txt
wc c.txt        // shows line count, word count and character count
- wc -l c.txt       //number of lines as output 
- wc -w c.txt       //number of words as output 
- wc -c c.txt       //number of character as output 
```

##Searching

Created a new file naming it log.txt, and added some random paragraph in it.
searched for a specific word using grep.
I used these commands - 
```bash
grep "rajat" log.txt        // output - hii my name is rajat rajat

```

## Pipes

Tried merging 2 or more commands using pipe.

**Learnt grep is case-sensitive**

exampla ;-
 
 ```bash
cat log.txt | grep ERROR | wc -l        // there is no word ""error" in the file so output :- 0

cat log.txt | grep rajat | wc -l        // output :- 2

cat log.txt | grep Rajat | wc -l         // output :- 0
 ```

## History

reverse-i-search used to search previous commands you can use this when you have used a big command and you dont want to write them again, you can just search them and use the command.
Once you press control + r you will get something like this **(reverse-i-search)`':** and you can type the command you wanted to search.
commands :-

```bash
(reverse-i-search)`commit': **git commit -m "deleteing old files"**
```

## Aliases

alias is used when you want a command should have a shortcut or a small version of command so that you dont have to again and again write the same command you just set a alias and use a short command for that big command.
Here in this drill I first went to ~/.bashrc file and there, I set alias of git status -> gs 
using commands :-
```bash
nano ~/.bashrc      // to write alais in .bashrc file
alias gs = "git status"     // set alias like this gs will be your alias for git status
```

## Safety Awareness

**rm -rf** this command uses remove/delete command with force command -f and -r for delete all the files inside it.

Using this command might delete a file permanently sometimes some important file dont get delete and give warning using only **rm** but with **-f** you are forcing it to delete file so it wont show any warning here.

**sudo** gives a command a administrative power so using sudo everytime might be risky when you play with directories and file you never know when you used a command which you should not and everything now is messed up. 
Sudo gives that owner power to command which it wont deny.
It might delete some important file, security issues, breaks os.


# Large Exercise — Mini Data Playground

## commands

```bash
mkdir work
cd work
nano data-playground.txt
cat data-playground.txt
nano drill.sh

wc -l data-playground.txt
cat data-playground.txt | grep backend | wc -l
head -n 5 data-playground.txt
tail -n 5 data-playground.txt

wrote this inside drill.sh and ran 

./drill.sh
```

## output

50 
2
Web development is the process of creating websites and web applications.  
It includes everything users see on a website and how it works behind the scenes.  
There are two main parts: Frontend and Backend development.  
Frontend is what users interact with directly.  
Frontend includes layout, design, buttons, images, and forms.  
Learning web development requires practice and building real projects.  
Communities like Stack Overflow, Dev.to, and Reddit help solve problems.  
Web development can be front-end focused, back-end focused, or full-stack (both).  
Patience, problem-solving, and creativity are essential skills.  
A good web developer always tests, improves, and keeps learning.