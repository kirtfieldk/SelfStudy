# Tips

```bash
    # Finds all accounts of phrase in files
    grep <value> : /etc/shadow /etc/passwd ...
    # Using regex
    # Remove all lines with # and the $ removes all empty lines
    grep -v ^# /etc/login.defs | grep -v ^$

    # Setup user3 with uid 1010 home dir /usr/user3a shell /bin/bash
    useradd -u 1010 -d /usr/user3a -s /bin/bash user3
    # Set password to user1234
    echo user1234 | passwd --stdin user3
```

```bash
    # Shortcuts
    ctrl+a start of cmd
    cntrl+e end of cmd
    cntrl+u erase entire line
    cntrl+k erase from cursor to end of line
    alt+f moves cursor right onw word at time
    alt+b moves cursor back one word at time
    cntrl+f moves forward one char at time
    cntrl+b


    echo ~
    /user/keith
    echo ~+
    pwd
    echo ~-
    last PWD
    echo ~<user>
    user HD

    ls -d .*
```

# Alias

```bash
    alias package="rpm -qa | grep"
    package podman
        podman-catatonit-3.2.3-0.11.module+el8.4.0+12050+ef972f71.x86_64
        cockpit-podman-32-2.module+el8.4.0+11990+22932769.noarch
        podman-3.2.3-0.11.module+el8.4.0+12050+ef972f71.x86_64
```
