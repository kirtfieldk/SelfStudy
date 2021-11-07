# Shell

Shell is a container, it interfaces between users and kernal/OS. CLI is a shell. To find shell run

```bash
    echo $0
     - bash
    cat /etc/shells
    # /bin/sh
    # /bin/bash
    # /usr/bin/sh
    # /usr/bin/bash
    # /bin/ksh
    # /bin/rksh
    # /usr/bin/ksh
    # /usr/bin/rksh
```

- A shell script is an executable file, commands are ran sequentially
  - First Line is always #!/bin/bash
  - Shell script should have executable permission (x)
  - Shell script has to be called from executable path or ./<path>

# Input/Output

- read
- echo

# Crontab (schedule) / at (one time)

We want to schedule our script execution

```bash
    crontab -e
    22 13 * 3 * command
    #  The * signals every instance (like everyday, every hour, etc)
```
