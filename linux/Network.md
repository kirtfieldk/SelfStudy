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
