# Linux Processes and Task Managment

### Process State

- Running: Proccess is being exc by CPU
- Sleeping: Proccess waiting for input from user or another proccess
- Waiting: Proccess recieves input and is waiting for its turn to exc
- Stopped:
- Zombie: Proccess is dead. Exists in the proccess table along other running proccesses. Entry is retained untill parent proccess permits it to die.

### Viewing and Monitoring Processes with ps

Processes may be viewed and monitored using various native tools such as `ps (Proccess status)` and `top (table of processes)`.

```bash
    # ps with no flags just report process tied to terminal
    ps [-every -f[ull format] -F[extra full format] -l[ong format]]
    # Columns
    UID | PID | PPID | C | STIME | TTY | TIME | CMD
    # Daemon processes have a ? in TTY column because they do not run on termnal
    ps -o comm,pid,ppid,user
    This will show all proccess that are of that cmd
    # ps -C top
    ps -C <cmd>
```

### Viewing and Monitoring Processes with `top`

### Listing specific Proccess

- `pidof | pgrep`

```bash
    # Two Terminals
    top
    # Both below cmds produce same result if without flags
    pidof top
    # 4181
    pgrep top
    # 4181
```

- List process of spefic user

```bash
    ps -U <user>
    ps -G keith
```

### Niceness

Linux runs n processes on a single proccessor core by giving each process a slice of time. The Process scheduler on the system preference performes rapid switching. Processes is spawned at a certain prio called `niceness (nice)`.

- 40 nice values with -20 as highest and 19 as the lowest
- Most start at nice of 0
- Inherits nice from parent
- User can only mod their process Nice value

```bash
    # View nice with, nice is NI column
    ps -lef
    top
```

- Check Default Nice

```bash
    nice
    nice -n -10 top
    ps -el | grep top
    # Run top at higher nice
    sudo nice -n -10 top
    ps -el | grep top
```

### Renicing a Running Process

```bash
    sudo renice 5 <pid>
    sudo renice <n> <pid>
    # can renice user or group process can use
    sudo renice <n> -u <user>

    sudo renice 10 -u keith
```

### Signals

Alert process of an event. The recieving process halts its execution as soon as it gets its signal and takes action enclosed in signal.

- to view all avail signals use `kill -l`

```bash
    # Send kill signal to all crond
    sudo pkill crond
    sudo kill $(pidof crond)
```

### Job scheduling

Job scheduling and execution is taken care of by two service daemons: `atd` and `crond`.

- `atd` manages one time running jobs
- `crond` manages reoccurring jobs
  At startup, daemon reads all schedule in the `/var/spool/cron` and `/etc/cron.d` directories.
- To controll who can create jobs, `/etc/at.allow` `/etc/at.deny` `/etc/cron.allow` `/etc/cron.deny`.
- By default, The `.deny` files are created but `.allow` files do not exists

- All activities for `atd` and `crond` service are logged to the `/var/log/cron` file. Info such as Time, hostname, process, and PID, Owner, and a msg for each invocation.

- `at` command is used for one time jobs. All submitted jobs are spooled in `var/spool/at` directory and executed by the ats daemon.

```bash
    at 06:30pm 11/09/2021
    # Given Job ID 2, cntrl + d after first line to schedule
        warning: commands will be executed using /bin/sh
        at> echo Hello World
        at> q
        at> ^C[keith@redhat ~]$
        [keith@redhat ~]$ at 06:22pm 11/09/2021
        warning: commands will be executed using /bin/sh
        at> echo hello world
        at> <EOT>
        job 2 at Tue Nov  9 18:22:00 2021

    # TO check
    sudo ls -l /var/spool/at
    # or
    at -l
    # Check job
    at -c <jobid>
    # delete
    at -d <jobId>
```

### crontab

- Define in `/etc/crontab`
- Crontables (crontab files) are located in `/var/spool/cron` directory
- Each auth user with a schedule job has a file matching their username in the dir
- ex. /var/spool/cron/<user>
- Other two locations for system crontables will stored is `/etc/crontab` and `/etc/crontab.d` but root user is only allow to mod and delete them.
- crond scans these three files and determins which jobs need to be executed

```bash
    # -u is use to mod another user's cron job
    crontab -e[edit] -l[list -r[remove] -u[user] ]
```

#### Cron syntax

```bash
    [Minutes 0-59] [hour 0-23] [day of month 1-31] [month 2-12] [day of week 0-7] <cmd or program>

    20 1,12 1-15 feb * ls >/tmp/ls.out

    */2 in min field means every other min
    */3 every third min
    0-49/4 every 4th min
```

```bash
    # Add user to cron.allow
    sudo vi /etc/cron.allow
    crontab -e
    */5 10-11 5,20 * * echo test > /tmp/cron.out
    crontab -l
    # If want to remove crontab file run
    crontab -r
    # If just want to delete entry
    crontab -e


```
