# Linux Boot Proccess

- systemd is service manager that manages boot seq, Backwards compatatble with sysv
- BIOS = Basic Input Output Setting -> POST= Power_on Self_test started
  - MBR MAster Boot Record Info saved in the first sector of a hard disk that includes where the GRUB2 is located so it can be loaded in RAM
  - GRUB2 loads the kernal /boot/grub2/grub.cfg
  - Kernal = Core OS, Loads req driver from initrd.img, starts the first OS process (Systemd)
  - systemd (PID #1) -> starts all req proccess. Reads `/etc/systemd/system/default.target` to bring system to run level. TOTAL OF 7 Levels (0-6)

```bash
    # Stops all proccess, unmount file system, and then power down
    systemctl poweroff
    # poweroff but renboots
    systemctl reboot
```

- Shorter `shutdown`, `poweroff`, `reboot`

## Select systemd target

- systemd is the first linux process which decides at which run level OS needs to be in. Run-Levels refered to as targets

- graphical.target=Supports multiple user, graphical and text based logins
- multi-user.target=support multiple user, text-based logins
- rescue.target=sulogin prompt, basgic system init complete
- emergency.target=sulogin prompts= == system root mount on `/` read only

```bash
    systemctl get-default
    #  graphical.target
    who -r
    # run-level 5
```

- Targets can depend on other targets. graphcal.target includes multi-user.target which depends on basic.target. To view these dependencies run
  `systemctl list-dependencies graphical.target | grep target`
- display new runlevels/targets by issuing the following command
  `ls -a /lib/systemd/system/runlevel*`
- Output
  lrwxrwxrwx. 1 root root 15 Jul 28 07:56 /lib/systemd/system/runlevel0.target -> poweroff.target
  lrwxrwxrwx. 1 root root 13 Jul 28 07:56 /lib/systemd/system/runlevel1.target -> rescue.target
  lrwxrwxrwx. 1 root root 17 Jul 28 07:56 /lib/systemd/system/runlevel2.target -> multi-user.target
  lrwxrwxrwx. 1 root root 17 Jul 28 07:56 /lib/systemd/system/runlevel3.target -> multi-user.target
  lrwxrwxrwx. 1 root root 17 Jul 28 07:56 /lib/systemd/system/runlevel4.target -> multi-user.target
  lrwxrwxrwx. 1 root root 16 Jul 28 07:56 /lib/systemd/system/runlevel5.target -> graphical.target
  lrwxrwxrwx. 1 root root 13 Jul 28 07:56 /lib/systemd/system/runlevel6.target -> reboot.target

/lib/systemd/system/runlevel1.target.wants:
total 0

/lib/systemd/system/runlevel2.target.wants:
total 0

/lib/systemd/system/runlevel3.target.wants:
total 0

/lib/systemd/system/runlevel4.target.wants:
total 0

/lib/systemd/system/runlevel5.target.wants:
total 0
[root@redhat ~]#

```bash
# Change run level
    systemctl set-default <target>
```

# Recover Root Password

- Restart whole Computer
- edit grub file
- change password

- On boot up screen where we click OS to boot, select first by pressing `e` on it
- find `ro` in textfile and replace with

```bash
# Run as single user
rw init=/sysroot/bin/sh
ctrl x
# We ar now in a single user terminal and run the commands
chroot /sysroot
passwd root
touch /.autorelabel
exit
reboot
```

## Repairing Filesystem corruption

- Make a mistake in /etc or filesystem becomes corrupted at disk level
  Problems
- Corrupt File System, If problem to harsh for auto repair, the system drops the user to an emergency shell
- Nonexistant Device or UUID referenced in /etc/fstab
- Nonexistant mount point in /etc/fstab
- ncorrect mount option in /etc/fstab

- Need to use emergency shell for all cases to fix issue because no file systems are mounted before the emergency shell is displayed. When using emergency shell, NEED TO RUN `systemctl daemon-reload` after editing `/etc/fstab`. WIthout reload systems may continu using old files
