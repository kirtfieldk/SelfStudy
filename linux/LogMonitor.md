# Log Monitoring

- Directory /var/log

- tail -f <log>

- grep -i error <log>

- more <log>

## Maintain Accurate Time

The Network Time Protocol is the standard way for mechines to provide and sync time on NTP sever. NTP server is dedicated server machine/computer which responds to client sync. `chronyd` is NTP service.

- date will display date
- timedatectl more in depth, can set time values too
- timedatectl list-timezones
- timedatectl set-timezone <timezone>
- timedatectl set-time <time> (HH:MM:SS)
- timedatectl set-ntp true (set computer clock to external clock)

## chroyd `/etc/crony.conf` `/var/log/chronyd`

```bash
systemctl start|restart chronyd
chronyd ...
# To check  if package installed
rpm -qa | grep chrony
# yum install chrony
```
