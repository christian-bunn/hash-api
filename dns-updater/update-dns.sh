#!/bin/sh

IP=$(curl -s ipinfo.io/ip)

curl -s "https://dynamicdns.park-your-domain.com/update?host=@&domain=ilovequt.lol&password=b3d9fe22e68f46488e2311901031ab78&ip=$IP"
curl -s "https://dynamicdns.park-your-domain.com/update?host=*&domain=ilovequt.lol&password=b3d9fe22e68f46488e2311901031ab78&ip=$IP"