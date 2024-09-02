FROM alpine:latest

RUN apk add --no-cache curl

COPY update-dns.sh /usr/local/bin/update-dns.sh

RUN chmod +x /usr/local/bin/update-dns.sh

ENTRYPOINT [ "/usr/local/bin/update-dns.sh" ]