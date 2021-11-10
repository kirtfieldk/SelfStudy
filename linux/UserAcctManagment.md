# User Account Managment

- useradd
- groupadd
- userdel
- groupdel
- usermod
- chgrp

When we create a user, their info is stored in three files

- /etc/passwd
- /etc/group
- /etc/shadow
- /etc/gshadow

As root user, `su -`, use command `useradd <name>` and to verify use
`id <name>` and the `/home` will now have a new directory with `<name>`. The output will be -

- Uid
- Gid
- Groups

To add group, use `groupadd <name>`. To verify us `cat /etc/group`, which contains all groups. To add user to group after creation use. `usermod` can also lock and unlock account.

```bash
    who
    whoami
    logname
    su - <user>
    # Normal user to run commands as root, you will remain original user
    # but will be prompted to input password for root
    # This is the perferred method instead of switching to root
    su -c "cat /etc/passwd"
    su -c "cat /etc/sudoers | grep -v ^# | grep -v ^$"
```

```bash
    usermod -G <group> <user>
    # Verify
    grep spider /etc/group

    usermod -L | -U <user>

    grep user3 /etc/shadow
    # user3:$6$BfoOB8kqy9EcvDdv$Dkn/QrksFlHN2mKbxvdYA.FR/ZZbj7wn07FrEiVTORjGe878BG3ExurayGsF/PTzd5NVlg6wAmyXmGmB8QE1t.:18939:0:99999:7:::
    # The passwd field starting with ! will signal acct is locked
    usermod -l user3
    grep user3 /etc/shadow
    grep user3 /etc/shadow
    # user3:!$6$BfoOB8kqy9EcvDdv$Dkn/QrksFlHN2mKbxvdYA.FR/ZZbj7wn07FrEiVTORjGe878BG3ExurayGsF/PTzd5NVlg6wAmyXmGmB8QE1t.:18939:0:99999:7:::
```

We can change the group of a user with

```bash
    chgrp -R <group> <user>
```

### When deleting a user, the directory will also be deleted

When looking into the `/etc/password` each line is
`<username>:<password>:<userid>:<groupId>:<desc>:<homeDirectory>:<bin>`

# MasterCommand

```bash
    useradd -g <group> -s <shell>(/bin/bash) -c <desc> -m -d <homeDirectory>(/home/<username>) <username>
    # Create Password for user
    passwd <username>
```

# Password Aging `/etc/login.def`

Need to enable password experation.

```bash
    #Per user
    chage [-m mindays] [-M maxdays] [-d lastday] [-I inactive] [-E expiredate]
        [-W warndays] <user>
```

```txt
<!-- /etc/login.defs -->
<!-- This file is the default for all new user's password -->
PASS_MAX_DAYS 9999
PASS_MIN_DAYS 0
PASS_MIN_LENGTH 5
PASS_WARN_AGE 7
```

### The `chage` command (change age) use to set params around password

```bash
    chage [-d lastday] [-m mindays] [-M maxdays] [-W warnDays] [-I inactive]
        [-E expireDate] <user>
    # list passwd values for user3
    chage -l <user>
```

```bash
    # set guid
    groupadd -g
    # Non unique guid, so both groups will have access to save files
    groupadd -o
    # Create system group with guid below 1000
    groupadd -r
    groupadd groupname
    # hroupmod has same flags as groupadd but -n changes name
    groupmod -n

    groupadd -g 5000 linuxadmin
    groupadd -o -g 5000 db

    cat /etc/group | tail -2
    usermod -aG linuxadmin user3
    id user3

    groupmod -n linux admin
    groupmod -g 6000 admin
    groupdek admin
```

```bash
    # Set password min 10 days max 90 days and
    # warn days 14 for user
    passwd -n 10 -x 90 -w 14 <user>
    # Set idle days for user to 5
    passwd -i5 <user>
    # Make sure user will need to change psswd next time
    passwd -e <user>
```

# SuperUser and Substitute

Provide normal users the ability to run a set of privlieged commands or to access non-owning files without knowing root password. Assign specfic commands to user/group with `sudo /etc/sudoers` and users are prompted for their own password.

- Defined in `sudoers`file that is able to be editied with `visudo` (vi sudo). `visudo` creates a copy of the file as `sudoers.tmp` and applies the changes there. After `visudo` is over, the updated file overrides the original `sudoers` file and `sudoers.tmp` is deleted.

```bash
    su -c "cat /etc/sudoers | grep -v ^# | grep -v ^$"
    Password:
    Defaults   !visiblepw
    Defaults    always_set_home
    Defaults    match_group_by_gid
    Defaults    always_query_group_plugin
    Defaults    env_reset
    Defaults    env_keep =  "COLORS DISPLAY HOSTNAME HISTSIZE KDEDIR LS_COLORS"
    Defaults    env_keep += "MAIL PS1 PS2 QTDIR USERNAME LANG LC_ADDRESS LC_CTYPE"
    Defaults    env_keep += "LC_COLLATE LC_IDENTIFICATION LC_MEASUREMENT LC_MESSAGES"
    Defaults    env_keep += "LC_MONETARY LC_NAME LC_NUMERIC LC_PAPER LC_TELEPHONE"
    Defaults    env_keep += "LC_TIME LC_ALL LANGUAGE LINGUAS _XKB_CHARSET XAUTHORITY"
    Defaults    secure_path = /sbin:/bin:/usr/sbin:/usr/bin
    root	ALL=(ALL) 	ALL
    %wheel	ALL=(ALL)	ALL

    visudo
    # ADD so user keith and group keith has all admin power at top of file
    keith ALL=(ALL) ALL
    %keith ALL=(ALL) AL
    # Can now run as keith
    sudo cat /etc/sudoers | grep -v ^# | grep -v ^$
    [sudo] password for keith:
    keith ALL=(ALL) ALL
    %keith ALL=(ALL) ALL
    Defaults   !visiblepw
    Defaults    always_set_home
    Defaults    match_group_by_gid
    Defaults    always_query_group_plugin
    Defaults    env_reset
    Defaults    env_keep =  "COLORS DISPLAY HOSTNAME HISTSIZE KDEDIR LS_COLORS"
    Defaults    env_keep += "MAIL PS1 PS2 QTDIR USERNAME LANG LC_ADDRESS LC_CTYPE"
    Defaults    env_keep += "LC_COLLATE LC_IDENTIFICATION LC_MEASUREMENT LC_MESSAGES"
    Defaults    env_keep += "LC_MONETARY LC_NAME LC_NUMERIC LC_PAPER LC_TELEPHONE"
    Defaults    env_keep += "LC_TIME LC_ALL LANGUAGE LINGUAS _XKB_CHARSET XAUTHORITY"
    Defaults    secure_path = /sbin:/bin:/usr/sbin:/usr/bin
    root	ALL=(ALL) 	ALL
    %wheel	ALL=(ALL)	ALL

    # TO NOT BE PROMPTED FOR PASSWORD
    visudo
    # add lines
    keith ALL=(ALL) NOPASSWD:ALL
    # Specific
    keith ALL=/usr/bin/cat

```

- Best pratice is to assign `alias` (user_alias / cmd_alias)

```bash
    alias catadmin=keith
    alias catcmd=/usr/bin/cat
```

```bash
    # Change owner and group of file in tmp with sudo
    whoami
    # keith
    cd tmp
    touch file10
    ls -l file10 | ls -ln file10
    chown user3 file10
    # Permission denied
    sudo chown user3 file10
    sudo groupadd -g 1050 power
    sudo chgrp power file10

```
