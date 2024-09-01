
sudo snap install docker
sudo chown $USER /var/run/docker.sock
openssl genrsa -out ./backend/keys/private.pem 4096
openssl rsa -in ./backend/keys/private.pem -pubout -out ./backend/keys/public.pem