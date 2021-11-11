# Log Monitoring

- Directory /var/log

- tail -f <log>

- grep -i error <log>

- more <log>

The daemon responsible for system logging is `rsyslogd`, reads config file from `/etc/rsyslog.conf` and the config files located in `/etc/rsyslog.d`.

```bash
    systemctl stop|start|restart|reload rsyslog
    cat /etc/rsyslog.conf | grep -v ^# | grep -v ^$
    ls -l /var/log
```

## Rotate Log Files

Log files may quickly fill up `/var` dir, so we need to rotate. There exists a script `logrotate` under `/etc/cron.daily` invokes log rotate cmd on daily basis as defined in `/etc/logrotate.conf` for the services in `/etc/logrotate.d`.

```bash
    cat /etc/cron.daily/logrotate
    cat /etc/logrotate.conf
    # Config files for different services
    ls -l /etc/logrotate.d
    cat /etc/logrotate.d/cups
    sudo head /var/log/boot.log
```

The default location for storing most system activities, as defined in the `rsyslog.conf` file is the `/var/log/messages`.

## Logging custom metrics

The module section of the `rsyslog.conf` file provides the support via the `imuxsock` module to record custom msg to the messages file using the logger command.

```bash
    logger -i "System reboot by $USER"

```

## Systemd Journal

Systemd-based logging service for the collection and storage of logging data. Implemented via `systemd-journald`.

- Gather, store, and display logging events from a variety of sources such as the kernal.
- Store journals in `/run/log/journal`
- `journalctl`
- `rsyslogd` and `systemd-journals` run concurrently

```bash
    sudo journalcatl
    # detailed
    sudo journalctl -o verbose
    # All events since last reboot
    sudo journalctl -b
    # Details since n boots ago
    sudo journalctl -bn
    # Kernal generated alerts since last system reboot
    sudo journalctl -kb0
    # Limit output lines to n
    sudo journalctl -n<n>
    # SPecific services
    sudo journalctl /usr/sbin/crond
    # Recieve allmsg logged for a certain process
    sudo journalctl _PID=$(pgrep chronyd)
    # Msg fromsystem unit
    sudo journalctl _SYSTEMD_UNIT=sshd.service
    # All err msg between date
    sudo journalctl --since 2019-10-10 --intil 2019-10-13 -p err
    # Yesterday Today Tomorrow
    sudo journalctl --since today -p warning -r
    sudo journalctl -f
```

### Preserving Journal Information

- default stored in `/run/log/journal` untill end of system runtime, Does not survive reboots(transient)
- Default stores to `/var/log/journal` dir, but you need to manually create this directory.
  | Volatile | Stores in Mem only |
  |------------|-----------------------------------------------------------------------------------------------------|
  | Persistent | Stores data permunder /var/log/journal and uses in mem if dir doesnt exists, creates if not exists |
  |------------|------------------------------------------------------------------------------------------------------|
  | Auto | Same as Persistent, but does not create /var/log/journal |
  |-------|-----------------------------------------------------------------------------------------------------------|
  | None | |

```bash
    sudo mkdir /var/log/journal
    ls -l /var/log/journal
```

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
