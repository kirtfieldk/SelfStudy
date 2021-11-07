# Compress Files

- tar zip up multiple files
- gzip more compression
- gzip -d or gunzip to unzip

```bash
    # tar cvf <file>.tar <files to tar>
    tar cvf keith.tar /home/keith/
    # unzip
    tar xvf keith.tar
    # Compress tar file Massive size reduction
    gzip keith.tar
    # Unxompress file
    gunzip keith.tar.gz
    # Delete the unempty dir
    rm -rf <dir>
```

# FTP File Transfer Protocol

Transfer computer's files on network. Protocol is the set of rules to define how files will be transfered.

- Default port 21

Install and config FTP on remote server

```bash
    su -
    rpm -qa | grep ftp
    yum install vsftpd
    vi /etc/vsftpd/vsftpd.conf
```

# Update Packages

`yum/dnf and rpm` Linux package managment. System Update and Patch Managment.

- yum (CentOS), apt-get (Other)
- yum installes packages defined int `/etc/yum.repos.d` which has the URL of the package source. Installs all dependencies
- rpm Redhat Package Manager. rpm is used when package is already downloaded in system so we can install locally. rmp is used with no internet access. Does not install additional packages

```bash
    rpm -qa (query all)
    # Installs package
    rpm -ihv <path>
    # Removes package
    rpm -e <package>
```

Types of Upgrades

- Major version upgrades 7
- Minor Version 7.1

- Major cannot be upgrade from `yum` command
- Minor version can be upgrade with `yum`

```bash
    yum update -y
    yum install httpd
    yum remove httpd
```

- Upgrade delete old package
- Update preserves

- To download package without yum

```bash
    # Get rpm to act as yum
    # get download URL of package.rpm and copy it
    wget <url>
    # downloads to current dir
    # DOwnloads package to be used in cli
    rpm -hiv <downloadedPackage>
    # Remove packageyum in
    rmp -e <package>
```

- to get all files associated with package (config files)

```bash
    rpm -qa | grep <package>
    rpm -qc <result>
```

- What package owns command

```bash
    which ksh
    # /usr/bin/ksh
    rmp -qf /usr/bin/ksh
    # ksh-20120801-254.el8.x86_64
    # For non obvious commands
    [root@redhat keith]# which pwd
    /usr/bin/pwd
    [root@redhat keith]# rpm -qf /usr/bin/pwd
    coreutils-8.30-8.el8.x86_64
```

# ACL Access Control List

Allows to give permission to any user/group for any disk resource

- Want to give some specific user permission to access some files and not put them in any group.
  Commands to assign and remove ACL `setfacl | getfacl`

```bash
    setfacl -m u:<user>:rwx <path>
    # Add permission to specific group
    setfacl -m g:<group>:rwx <path>
    #Allow file/dir to inherit ACL entries from Dir it is in
    setfacl -dm "entry" <path>
    # To remove a specific User/Group from having any permission
    setfacl -x u:user <path>
    # Remove all ACL
    setfacl -b <path>
    # remove all entries
    setfacl -b <path> (for all users)
    # More Info
    getfacl <file>

    # ex as root WOrks the same as group
    touch /tmp/temp
    setfacl -m[odify] u:keith:rw /tmp/temp
    getfacl /tmp/temp
    # file: temp
    # owner: root
    # group: root
    # user::rw-
    # user:keith:rw-
    # group::r--
    # mask::rw-
    # other::r--
    ll
    # -rw-rw-r--+ 1 root  root     0 Nov  6 19:15 temp
```

- As assign ACL to file/dir it add '+' to end of permission
- Setting 'w' with ACL does not grant deleting file
