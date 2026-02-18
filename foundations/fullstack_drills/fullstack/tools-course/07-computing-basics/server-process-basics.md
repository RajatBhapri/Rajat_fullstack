# server process basic

## Start a server on any port 

starting a python server in port number 5000.

```bash
python3 -m http.server 5000
```

## Finding server from another terminal

opening a new terminal and found pid(process id)

Found 
### The process ID
### The command that started it
### Which user owns it

by using command

```bash
ps aux | grep python
```

## Verified the server working in a browser

server is running succesfully and showing the file and directory.
running on **localhost:5000**


## Killing the process and verifying the port is free.

killing the process uses single commands but need processid for it.
got the process id from privious drill.
use this command to kill a process, server is this case.

```bash
kill 6145           // kill {pid}
```

## Restarting it on a new port 7000.

running the same command again to start a serveer on port number 7000
command 

```bash
python3 -m http.server 7000
```