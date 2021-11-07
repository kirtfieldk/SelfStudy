# Network

- Static Ip does not change
- DHCP (Dynamic host protocol) changes after system reboot

# OS Network Component enp0s3

- Network Interface use `ifconfig` to get all interfaces
- MAC address use `ifconfig | grep ether` The MAC addr is `ether`. Never Change
- Subnet Mask use `ifconfig | grep netmask` The mask is `netmask`.
- Gateway `netstat -r`
- DNS

# Network Manager

Offers managment through different tools such as GUI, `nmtui`, `nmcli`.

```bash
    systemctl status NetworkManager
    ps -ef | grep Network
```

### Config Methods

- `nmcli`
- `nmtui` Network Text Manager. Run through terminal window and allows changes to be made by making menue selections
- `nm-connection-editor` GUI Best if have access to console
- `GNOME` basic network management

```bash
    nmcli c
```

### Network Files

- /etc/sysconfig/network-scripts
- /etc/hosts
- /etc/hostname
- /etc/resolv.conf
- /etc/nsswitch.conf

### Commands

- ping
- ifconfig
- ifup
- netstat
- traceroute
- tcpdump
- ethtool

# SELinux (Security Enhance linux)

Linux kernal security mod that provides a mechanism for supporting acess control secuirty policy, Includes mandatory access control

- Product of NSA and SELinux community
- DAC Discretinary Access control, defined security (ex. rwxr--r--)
- SELinux(MAC) Mandatory Access Control (If the Apache HTTP server is compromised, an attacker cannot use that proccess to read files in user home directory, unless specific SELinux policy rule was added or config to allow such access) - Cannot use chmod to change access to files

## SELinux option

- Enforcing = Enabled (enabled by default)
- permissive = Disabled but logs the activity (Use try/error with permissive than use enforcing)
- Disabled = Disabled and not activity Logs
- Check status

```bash
    sestatus or getenforce
    # SELinux settings, Not this are temp and will get reset once session expire
    setenforce 0 = Permissive/Disable
    setenforce 1 = enable
    # TO Perm mod Modify
    vi /etx/selinux/config
    SELINUX=enforcing
    SELINUX=disable
```

- Before modifying these values take snapshot of VM
- Before rebooting create a file /.autorelabel

### Example

```bash
    [root@redhat ~]# getenforce
    Enforcing
    [root@redhat ~]# sestatus
    SELinux status:                 enabled
    SELinuxfs mount:                /sys/fs/selinux
    SELinux root directory:         /etc/selinux
    Loaded policy name:             targeted
    Current mode:                   enforcing
    Mode from config file:          enforcing
    Policy MLS status:              enabled
    Policy deny_unknown status:     allowed
    Memory protection checking:     actual (secure)
    Max kernel policy version:      33
    [root@redhat ~]#
```

### Concepts

- Labeling (Label every file and dir)(4 Types User:role:type:level)

```bash
    # Check Tag of Directory
    [root@redhat ~]# ls -lZ /usr/sbin/httpd
    -rwxr-xr-x. 1 root root system_u:object_r:httpd_exec_t:s0 579808 Oct  6 12:45 /usr/sbin/httpd
```

- Type Enforcing
