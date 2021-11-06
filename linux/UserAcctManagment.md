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

As root user, `su -`, use command `useradd <name>` and to verify use
`id <name>` and the `/home` will now have a new directory with `<name>`. The output will be -

- Uid
- Gid
- Groups

To add group, us `groupadd <name>`. To verify us `cat /etc/group`, which contains all groups. To add user to group after creation use

```bash
    usermod -G <group> <user>
    # Verify
    grep spider /etc/group
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
```
