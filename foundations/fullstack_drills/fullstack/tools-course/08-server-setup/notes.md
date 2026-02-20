## 1. **Created an AWS EC2 Instance**  
### To create an EC2 instance on AWS:
### - Log in to the AWS Management Console.
### - Navigate to EC2 > Instances > Launch Instance.
### - Choose an Ubuntu AMI (Amazon Machine Image).
### - Select an instance type 
### - Configure the instance, including selecting a key pair (create one or use an existing one).
### - Ensured I assign a public IP during instance setup (it will be used later to connect).

## 2. **Set up the correct permissions for the private key file**  
### The private key file (e.g., `drill_keypair.pem`) should have restricted permissions to ensure SSH can use it securely.
```bash
chmod 400 drill_keypair.pem
```

## 3. **SSH into the EC2 instance**  
### Once the instance is running and I have the public IP `51.21.162.219`, connected to it using SSH.
```bash
ssh -i ~/Downloads/drill_keypair.pem ubuntu@51.21.162.219 
```

## 4. **Created a new user called "student"**  
### Created a new user named `student` on the EC2 instance.
```bash
sudo adduser student
```

## 5. **Giving the new user sudo privileges**  
### Adding the `student` user to the `sudo` group to grant them administrative privileges.
```bash
sudo usermod -aG sudo student
```

## 6. **Exit the SSH session**  
### After setting up the user and sudo access, exited the SSH session.
```bash
exit
```

# Large Exercise — Hosting a Website with Caddy
## intalling caddy
installed caddy in my virtual machine from the command
```bash
sudo apt install caddy
```

## created a simple index.html file inside my work directory in virtual machine
```bash
~/work/drill_aganitha/index.html
```

## strating a server 
Started a caddy server from my virtual machine using command. 

```bash
caddy file-server --root ~/work/drill_aganitha --listen :8080
```
