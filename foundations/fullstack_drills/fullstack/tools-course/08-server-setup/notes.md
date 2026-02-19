Public IP: 51.21.162.219

chmod 400 drill_keypair.pem

ssh -i ~/Downloads/drill_keypair.pem ubuntu@51.21.162.219

sudo adduser student
sudo usermod -aG sudo student
