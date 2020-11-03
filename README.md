### Main idea was to get a Todo app in React/Express working on a Raspberry Pi in kiosk mode.

Accomplished, but no more progress on this, needs to be rewritten with web sockets at the center of the communication.

### Notes: 

#### Auto start Express service with a service
https://www.raspberrypi.org/forums/viewtopic.php?t=138861
```
$ nano /etc/systemd/system/{service name}.service
```

```
[Service]
WorkingDirectory=/home/pi/todo/app/server
ExecStart=node /home/pi/todo/app/server/index.js
Restart=always
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=propanel
User=root
Group=root
Environment=NODE_ENV=production
[Install]
WantedBy=multi-user.target
```

```
$ sudo chmod u+rwx /etc/systemd/system/{service name}.service
$ sudo systemctl enable  {service name}
$ sudo systemctl start {service name}
$ sudo systemctl stop {service name}
```

#### Auto start Pi in Chromium Kiosk
https://www.raspberrypi.org/forums/viewtopic.php?t=219952
```
$ nano /home/pi/.config/lxsession/LXDE-pi/autostart
```

```
@chromium-brower --kiosk 192.168.xxx.xxx
```
Note: Add paths if not already there lxsession/LXDE-pi/

#### Reverse Proxy: NGINX
https://dev.to/bogdaaamn/run-your-nodejs-application-on-a-headless-raspberry-pi-4jnn
```
$ sudo apt update
$ sudo apt install nginx
$ sudo nano /etc/nginx/sites-available/default
```

```
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root /var/www/html;

        index index.html index.htm index.nginx-debian.html;

        server_name _;

        location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
}
```

```
$ sudo nginx -t
$ sudo systemctl restart nginx
```

#### Other helpful notes
UFW: https://www.digitalocean.com/community/tutorials/how-to-setup-a-firewall-with-ufw-on-an-ubuntu-and-debian-cloud-server
