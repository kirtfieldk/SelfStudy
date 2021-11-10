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

- variables

```bash
  NAME=keith
  echo $NAME
  # Enter subshell
  bash
  echo $NAME
  # Returns nothing because this var is not defined in theis subshell as it was not a env var
  exit
  # To Make ENV var
  export NAME
  bash
  echo $NAME
  # keith
  exit
  unset NAME
  echo $NAME
  # Nothing

  export NAME="KEITH KIRTFIELD"

```

```bash
  # Customize cmd line
  export PS1="< $LOGNAME on $(hostname) in /$PWD >"
```

- /dev/null is a special dir to discard data

# History Substitution

HS is a time saver bash shell feature that keeps a log of all commands or commandsets that you run at the command prompt in chrono order with one cmd per line. On by default and stored in file in user dir.

- HISTFILE defins name and location of the history fileto be used to store history, default .bash_history in usr home dir.
- HISTSIZE Dictates the max num of commands to be held in memory for current session
- HISTFILESIZE sets max num of commands allowed for storage in the history file at the beginning of the current session and are written to the HISTFILE from mem at the end of the current terminal session

```bash
  echo $HISTFILE
  # Path

  # Usally set to same value ex 1000
  echo $HISTSIZE
  echo $HISTFILESIZE

  # SHow history
  history
  # last n entries
  history n
  # To reexecute command by line number - this will execute the 15th cmd
  !15
  # To reexecute the most recent of cmd that started with a particular letter
  # E.x. cmd that start with ch
  !ch
  # most recent that contained grep
  !?grep?
  # Remove entry
  history -d 24
  # Last executed cmd
  !!


```
