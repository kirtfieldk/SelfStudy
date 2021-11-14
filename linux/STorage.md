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
- Each Additional disk will be sdb,sdc,...

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

### Create an MBR (Master Boot Record) Partition

Create a partition type "msdos" to `/dev/sdc`

```bash
    sudo parted /dev/sdc print
        Error: /dev/sdc: unrecognised disk label
        Model: ATA VBOX HARDDISK (scsi)
        Disk /dev/sdc: 263MB
        Sector size (logical/physical): 512B/512B
        Partition Table: unknown
        Disk Flags:
    # Need to label disk
    # Assign disk label msdos to the disk with mklabel
    sudo parted /dev/sdc mklabel msdos
        Information: You may need to update /etc/fstab.
    sudo parted /dev/sdc print
        Model: ATA VBOX HARDDISK (scsi)
        Disk /dev/sdc: 263MB
        Sector size (logical/physical): 512B/512B
        Partition Table: msdos
        Disk Flags:

        Number  Start  End  Size  Type  File system  Flags

    # Create a 100MB primary partition starting at 1MB
    sudo parted /dev/sdc mkpart primary 1 101m

    sudo parted /dev/sdc print
        Model: ATA VBOX HARDDISK (scsi)
        Disk /dev/sdc: 263MB
        Sector size (logical/physical): 512B/512B
        Partition Table: msdos
        Disk Flags:

        Number  Start   End    Size    Type     File system  Flags
        1      1049kB  101MB  99.6MB  primary
    # Partiton numbers start at 1 by default

    lsblk
        NAME                 MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
        sda                    8:0    0    22G  0 disk
        ├─sda1                 8:1    0     1G  0 part /boot
        └─sda2                 8:2    0    21G  0 part
        ├─rhel_redhat-root 253:0    0  18.9G  0 lvm  /
        └─rhel_redhat-swap 253:1    0   2.1G  0 lvm  [SWAP]
        sdb                    8:16   0     2G  0 disk
        └─sdb1                 8:17   0     2G  0 part /data
        sdc                    8:32   0 251.1M  0 disk
        └─sdc1                 8:33   0    95M  0 part

    # Check partition file too
    cat /proc/partitions | grep sdc
        8       32     257136 sdc
        8       33      97280 sdc1
```

### Delete MBR partition

```bash
    sudo parted /dev/sdc rm 1
    sudo parted /dev/sdc print
    cat /proc/partitions | grep sdc
```

## GPT Storage Management with gdisk

The `gdisk` (GPT Disk) utility partitions disks using the GPT format.

```bash
    sudo gdisk /dev/sdd
        GPT fdisk (gdisk) version 1.0.3

        Partition table scan:
        MBR: not present
        BSD: not present
        APM: not present
        GPT: not present

        Creating new GPT entries.

        Command (? for help):
```

### Create GPT Partition

```bash
    sudo gdisk /dev/sdd
        o (new empty GUID partition table)
        p (print)
            Disk /dev/sdd: 514272 sectors, 251.1 MiB
            Model: VBOX HARDDISK
            Sector size (logical/physical): 512/512 bytes
            Disk identifier (GUID): 472E413D-27D2-46F6-ABF7-226C4B8848F3
            Partition table holds up to 128 entries
            Main partition table begins at sector 2 and ends at sector 33
            First usable sector is 34, last usable sector is 514238
            Partitions will be aligned on 2048-sector boundaries
            Total free space is 514205 sectors (251.1 MiB)

            Number  Start (sector)    End (sector)  Size       Code  Name
        n (add a new partition)
        p (print)
            Number  Start (sector)    End (sector)  Size       Code  Name
            1            2048          514238   250.1 MiB   8300  Linux filesystem
        w (write)

    grep sdd /proc/partitions
        8       48     257136 sdd
        8       49     256095 sdd1

    lsblk /dev/sdd
        NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
        sdd      8:48   0 251.1M  0 disk
        └─sdd1   8:49   0 250.1M  0 part
```

### Delete GPT Partition

```bash
    gdisk /dev/sdd
        d1 (delete partition 1)
        w (write updated partion to disk )
    grep sdd /proc/partitions
    lsblk /dev/sdd

```

## Storage opt with Virtual Data Optimizer (VDO)

Device Driver Layer that sits between the OS and physical storage device. `VDO` employes thin provisioning, de-duplication, and compression. Uses thin provisioning to eliminate empty (zero byte) data blocks, `zero-block elimination`. If data is re-process, `vdo` does not add the new data, it just makes an internal note, `de-duplication`. `VDO` uses `kvdo` that compresses the residual data blocks.

# Advance Storage Partitioning

## Logical Volume Management (LVM)

- `Volume Group` is composed of `physical volumes` and `Logical Volumes`.
- `Logical volumes` are a pool of `physical volumes`
- `Physical Extent` Physical volume is devided into n smaller logical peices, `smallest allocatable unit of space in LVM`. Default 4MB. 20GB has 5k PE
- `Logical Extent` are the set of `PE` allocated to logical volume. Default 4MB

```bash
    pvs
        PV         VG          Fmt  Attr PSize   PFree
        /dev/sda2  rhel_redhat lvm2 a--  <21.00g    0
    lvs
    vgs
        VG          #PV #LV #SN Attr   VSize   VFree
        rhel_redhat   1   2   0 wz--n- <21.00g    0
    # Info about root LV
    sudo lvdisplay /dev/rhel/root
```

- HARD DISK -> PARTITION -> PHYSICAL_VOL -> VOLUME_GROUP -> LOGICAL_VOL -> FS

```bash
    # Find your Disk you want to make LVM
    fdisk -l | more
    fdisk /dev/sdg
        n for new
        p for partition
        t change partition type
        L list all code
        8e Linux LVM
        p
            Device     Boot Start     End Sectors  Size Id Type
            /dev/sdg1        2048 2097151 2095104 1023M 8e Linux LVM
        w
            The partition table has been altered.
            Calling ioctl() to re-read partition table.
            Syncing disks.

    # Next step create a physocal volume
    pvcreate /dev/sdg1
    # Verify
    pvdisplay
        "/dev/sdg1" is a new physical volume of "1023.00 MiB"
        --- NEW Physical volume ---
        PV Name               /dev/sdg1
        VG Name
        PV Size               1023.00 MiB
        Allocatable           NO
        PE Size               0
        Total PE              0
        Free PE               0
        Allocated PE          0
        PV UUID               Hpz7qh-wbvh-sFkq-edO8-B8yB-3Nvc-1N7MoO
    # Create volume group
    vgcreate test_vg /dev/sdg1
    # verify
    vgdisplay test_vg
         --- Volume group ---
        VG Name               test_vg
        System ID
        Format                lvm2
        Metadata Areas        1
        Metadata Sequence No  1
        VG Access             read/write
        VG Status             resizable
        MAX LV                0
        Cur LV                0
        Open LV               0
        Max PV                0
        Cur PV                1
        Act PV                1
        VG Size               1020.00 MiB
        PE Size               4.00 MiB
        Total PE              255
        Alloc PE / Size       0 / 0
        Free  PE / Size       255 / 1020.00 MiB
        VG UUID               zcbWzf-qtfW-RIIU-MYB7-0SXS-OM63-PiaTYR
    # Create logical volume (partition)
    lvcreate -n test_lv --size 1000MiB test_vg
        Logical volume "test_lv" created.
    lvdisplay
        --- Logical volume ---
        LV Path                /dev/test_vg/test_lv
        LV Name                test_lv
        VG Name                test_vg
        LV UUID                MaN0jd-BiKY-pSm2-OrFl-BB4L-wg2d-ZYKjsE
        LV Write Access        read/write
        LV Creation host, time redhat, 2021-11-13 20:24:52 -0500
        LV Status              available
        # open                 0
        LV Size                1000.00 MiB
        Current LE             250
        Segments               1
        Allocation             inherit
        Read ahead sectors     auto
        - currently set to     8192
        Block device           253:2
    # Make file system
    mkfs.xfs dev/<VG>/LV | mkfs.xfs /dev/test_vg/test_lv
        meta-data=/dev/test_vg/test_lv   isize=512    agcount=4, agsize=64000 blks
            =                       sectsz=512   attr=2, projid32bit=1
            =                       crc=1        finobt=1, sparse=1, rmapbt=0
            =                       reflink=1
        data     =                       bsize=4096   blocks=256000, imaxpct=25
                =                       sunit=0      swidth=0 blks
        naming   =version 2              bsize=4096   ascii-ci=0, ftype=1
        log      =internal log           bsize=4096   blocks=1566, version=2
                =                       sectsz=512   sunit=0 blks, lazy-count=1
        realtime =none                   extsz=4096   blocks=0, rtextents=0
    # Mount to dir
    mkdir /tester
    mount /dev/test_vg/test_lv /tester
    df -h
        /dev/mapper/test_vg-test_lv    1017736   40132    977604   4% /tester


```

### Create Physical Volume

```bash
    # Init a partition x (90MB) and one disk y (250MB)
    sudo parted /dev/<x> mklabel msdos
    sudo parted /dev/<x> mkpart primary 1 91m
    sudo parted /dex/<x> print
    # set the flag on the partition to lvm
    sudo parted /dev/<x> set 1 lvm on
    sudo parted /dev/<x> print
    #
    sudo pvcreate /dev/<x> /dev/<y> -v
```

- Allows Disk to be combined
- Can group x physical volumes into a `Volume Group` and each `Volume Group` can be partitioned into `Logical Volumes` Ex. `/` ` /home``swap `
- Advantage, Easily add more `disk` into `Volume Group` if run out of space.

### Adding and extending sidk with LVM

- add new physical disk mount to /tester2
- add new virtual disk mount to /tester2
- Extend /tester with LVM (BEST)

```bash
    # PARTITION NEW DISK
    fdisk /dev/sdh
        n
        p
        t
            8e
        p
            Device     Boot Start     End Sectors  Size Id Type
            /dev/sdh1        2048 2097151 2095104 1023M 8e Linux LVM
        w
    pvdisplay or pvs
        PV         VG          Fmt  Attr PSize    PFree
        /dev/sda2  rhel_redhat lvm2 a--   <21.00g     0
        /dev/sdg1  test_vg     lvm2 a--  1020.00m 20.00m
    # Add new disk to test_vg
    vgdisplay test_vg
    pvcreate /dev/sdh1
    vgextend test_vg /dev/sdh1
    lvextend -L+<size> <df -h> | lvextend -L1024M /dev/mapper/test_vg-test_lv
    # Extend File System
    xfs_growfs /dev/mapper/test_vg-test_lv
    df -h
    /dev/mapper/test_vg-test_lv   2.0G   47M  2.0G   3% /tester
```

# NFS Network File System

- Access Files across network and treat them as local

```bash
    # Steps to config NFS
    yum install nfs-utils libnfsidmap
    # Once installed enable servcie
    systemctl enable rpcbind
    systemctl enable nfs-server
    systemctl start rpcbind, nfs-server, rpc-statd, nfs-idmapd
    # Create NFS Dir and assign pewrmission
    mkdir /keithk
    chmod a+rwx / keithk
    # Modify /etc/exports file to add the new shared FS
    # vi /etc/exports
    # Read/Write, sync: all changes immediate thoughout
    # no_root_squash root on client mechine has same access as root on server
    # vi /etc/exports /keith/ *(rw,sync,no_root_squash)
    /keithk <IP of Client|*>(rw,sync,no_root_squash) = for only 1 host
    /keithk <IP of Client|*>(rw,sync,no_root_squash) = for everyone
    # Export FS
    exportfs -rv

    # Client docker run -dit --name centos -p 80:80 centos
    # NFS CLIENT CONFIG
    yum install nfs-utils rpcbind
    # Systemctl start rpcbind
    service rpcbind start
    ps -ef | egrep "firewall|iptable"
    # Show mount from NFS server
    showmount -e <ip> (NFS server IP)
    mkdir /mnt/kramer
    mount <ip>:/keithk /mnt/kramer
    df -h
    umount /mnt/kramer

```

## Samba\*

Linux tool or utility that allows sharing for linux respources, Works exctly like `NFS` but can work with other OS.

### smb vs. CIFS

- Samba shares filesystem through SMB `Server Message Block` Invented by IBM
- Another protcol used to share Samba is through `CIFS` (Common Internet File System)
- CIFS became extension of SMB
- SMB and CIFS are the same
