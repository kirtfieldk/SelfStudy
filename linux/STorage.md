# STorage

- Local Storage
- SAN Storage Area Network (Attched to computer through fiber cable)
- NAS (Network Attached Storage)

## Disk Partition

```bash
    df -h[uman]
    fdisk -l
```

## Adding Disk and Creating Partition

- Run out of Disk Space?
- Create a new disk and tatach to VM

```bash
    # Show all disk attacked or not. we will see out new Disk
    fdisk -l
    fdisk <Disk> | fdisk /dev/sdb
    # This will start the proccess of attaching the disk
    fdisk -l
    # Grab the name of the new disk and turn it into filesystem
    mkfs.xfs /dev/sdb1
    # Need to create dir under root
    mkdir /data
    ls -l /
    mount /dev/sdb1 /data
    df -h
    # /dev/sdb1                     2.0G   47M  2.0G   3% /data
```

- Everytime System reboots it will not mount this

```bash
    vi /etc/fstab
    # Add Line
    /dev/sdb1       /data   xfs default 0   0
    [root@redhat ~]# cat /etc/fstab

#
# /etc/fstab
# Created by anaconda on Wed Nov  3 20:25:01 2021
#
# Accessible filesystems, by reference, are maintained under '/dev/disk/'.
# See man pages fstab(5), findfs(8), mount(8) and/or blkid(8) for more info.
#
# After editing this file, run 'systemctl daemon-reload' to update systemd
# units generated from this file.
#
/dev/mapper/rhel_redhat-root /                       xfs     defaults        0 0
UUID=513db4cb-962f-4538-8000-3e17f576f3c7 /boot                   xfs     defaults        0 0
/dev/mapper/rhel_redhat-swap none                    swap    defaults        0 0
/dev/sdb1	/data xfs	defaults	0	0

# To Reboot VM
    init 6
    df -h
    # Drive will be mounted
```

```bash
    # Will mount all Drives in /etc/fstab
    mount -a
```

# Logical Volume Management (LVM)

- Allows Disk to be combined
- Can group x physical volumes into a `Volume Group` and each `Volume Group` can be partitioned into `Logical Volumes` Ex. `/` ` /home``swap `
- Advantage, Easily add more `disk` into `Volume Group` if run out of space.
