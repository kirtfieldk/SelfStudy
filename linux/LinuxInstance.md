# Monitor and manage linux instances

- Application = Service
- Script
- Proccess can have multiple threads
- Daemon run continuously in the background
- Threads
- Job

Need to monitor all proccesses because they consume `CPU, memory, disk space`.

### Monioring commands

```bash
    # Displays free disk space df -h for human readable
    # df -T will display type of file System they are
    df
    # Display disk usage stats
    # du -k / | sort -nr | more Will sort the output by largest data used
    # du -h / | sort -nr | more
    du
    # How long system has been running
    uptime
    # Display and update sorted information about processes, with Kill CMD can
    # stop cpu intense app with PID
    top
    # Info on memory
    free
    # List Open File
    lsof
    # All network traffic comming from interface, to get specific interface use
    # ifconfig to get list of interface and run tcpdump -i <interface>
    tcpdump
    # netstate -rnv display nice table for network
    # netstate -at for all traffic
    netstat
    # Snapshot of current proccess, Highest proccess first
    # ps -ef | grep <keyword>
    ps
    kill
```

Note, with command `ps -ef | grep top` with the `top` cmd running in another terminal, the grep command will return two. This is because when `ps -ef | grep top` runs it creates a proccess with `top`.

# Control Service and Daemons

Most services are daemons, Services are controlled by `systemctl`. `systemctl` controls systemd system and service manager. `systemd` is a collection of system management daemons, utilities, and libraries which serve as a replacment of `system V`.

```bash
    # To control system
    systemctl --version
    # Check all running services
    systemctl --all
    # Check is systemctl is running
    ps -ef | grep systemd
    # TO check status, stop, start, restart service ? systemctl status colord.service
    systemctl status|start|stop|restart application.service
    # Reload config of service
    systemctl reload application.service
    # enable or disable
    systemctl enable|disable application.service
    # To enable or disable service completly
    systemctl mask|unmask application.service
    # List all packages installed
    rpm -qa
    rmp -qa | grep <package>
    # Total number of installed packages
    rpm -qa | wc -l
```

# Config and Secure SSH

We can SSH into Linux instance, which takes our cmd and translate to the kernal

- In command line $ is user login
- In command Line # is root user login
- SSH is always encrypt

Open SSH is a package and is a service daemon in SSHd. SSH port is `22`.

Most common ways to secure SSH:

- Set idle timeout, so inactive use will be timedout, below sets the timeout to 10 mins

```bash
    su -
    vi /etc/ssh/sshd_config
    # Add the following lines to file
    # Best to add at the end of file use
    # shift + g
    # ClientAliveInternal 600
    # ClientAliveCountMax 0
    systemctl retart sshd.service

```

- Disable Root Account, in `/etc/ssh/sshd_config` change line `PermitRootLogin` to `no`. Then `systemctl restart sshd`.

- Disable empty password, in `/etc/ssh/sshd_config` change line `PermitEmptyPassword` to `no`. Then `systemctl restart sshd`.

- Limit users SSH access. In `/etc/ssh/sshd_config` change line `AllowUser <u1> <u2>...`. Then `systemctl restart sshd`.

- Use a different port. Change `Port` to another number

- SSH Keys Access Remote Service without Password

# SSH Keys

We do not repetitive logins, Automate Login Scripts.

- Keys are geneerated at user or root level. We need two linux instances with both IP address. In current terminal (the one wanting to acces the second terminal), run `ssh-keygen`. This will generate a ssh key on local host. Then use `ssh-copy-id root@<ip>` with the Ip of the destination instance. This will prompty you to enter the password for the root account in the destination instance. To check if successful, go into destination terminal and `cat /root/.ssh/authorized_keys`

```bash
    ssh-keygen
    # Copy Key to server
    ssh-copy-id root@<ip>
    # Login from client to server
    ssh root@<ip>
```

# Analiyze

- Cockpit web based app to manage and analyze server
- `sos report` will collect all logs and send to Red Hat support
