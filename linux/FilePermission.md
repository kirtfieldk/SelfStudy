# File Permission

Everyt file/directory can be protected from or made accessable to other users
by changing its access permissions. Permissions can be restricted by types.

- Read r
- Write r
- Execute x

Controlled by three levels

- user
- group
- other

```bash
    ll
    # Each tri pair represents user/group/other read/write/execute permission
    # Files that are not executable will not have x
    rwxrwxrwx ...
```

To Change Permission `chmod`

```bash
    # Group cannot write
    chmod g-w <filename>
    # remove read access from user/group/other
    chmod a-r <filename>
    # A file with no permission will look like
    --------- <filename>
    # Allow Everyone to read file
    chmod a+r <filename>
    ...
```

Note, Directories will have `x` to signal executable. This allows us to cd directory, without we cannot affect directory.

# File Ownership

2 Owners - Users and Groups.

```bash
    # chown changes owner
    # chgrp changes group
    chown <newOwner> <fileName>
    chgrp <newGroup> filename>
```

With `ls -l` the third column will show the User that owns and the fourth is the group that owns.

### The only person that change ownership is `root` with `su -`.

To Log out as `root` type `exit`

- Note, if a file in your directory is not owned by you (i.e root) the owner of directory can still `rwx` all files. This is because directory has `rwx` over all files in its content.

```bash
    # Only root has rwx, the group only has r-x so we cannot write files
    drwxr-xr-x. 143 root root 8192 Nov  4 12:57 etc
```

# umask

`umask` is the default permission.

- root 022
- user 002
- Files 002
- Directories 777
  To calc the default permission, do binary subtractions `(666) - (002) = 664` which equated to root user having default `rw-rw-r`. For user, `(666) - (022) = 644` which is `rw-r-r`.
  To calc default permission for dir and root, `(777) - (002) = 775` which is
  `rwxrwxr-x`.

```bash
   # Change umask
   umask 270
   umask u=rwx,g=rw,o=
```

- Effective right away and affects only new files

# Special File Permission

Three types of special permission bits that may be set on binary executable files or directories that respond differently to non-root users for certin operations.

- user identifier bit (setuid or suid) non-owner get owner priv
- group identifier bit (setgid or sgid) non-owner get owner priv, also for group collab
- sticky bit set on public dir for inhibiting file erasure by non-owners

```bash
    # The s bit
    # su command allows us to swithc account, if ran by root, then not prompt for password
    # Normal user can run this and get the same results (but prompted for passwd)
    -rwsr-xr-x. 1 root root 50336 Jan 19  2021 /usr/bin/su
    su -
```

```bash
    # setgid
    # write allows normal users to write on someone else's terminal
    ls -l /usr/bin/write
    We are now able to write to root acct
    write root
    #  As root
    chmod -v g-s /usr/bin/write
    # Now we cannot write to anyones terminals, root can strill write to any
```

- setgid on shared Directories
  Can be set up on group-shared directories to allow files and sub created under to auto inherit the directory's owning group. This saves group members who share a directory from changing the group ID for every new file and subdirectory that they add.

```bash
    useradd u1
    userad u2
    groupadd -g 9999 shareGroup

    usermod -aG shareGroup u1
    usermod -aG shareGroup u2
    mkdir shareGroup

    chown root:shareGroup shareGroup
    ls -l | grep shareGroup
    drwxr-xr-x. 2 root shareGroup    6 Nov  8 09:25 shareGroup

    chmod -v g+s shareGroup
    chmod g+w,o-rx shareGroup
```

# File Searching

The `find` cmd recursivly searches dir tree, finds the files and optionally performs a task on the found files

```bash
    find [path] [search option] [action]
    # -iname case insentive
    # Looks for and finds all file/dir with name hello from current path
    find . -name hello -print
    # Looks for and finds all file/dir with name hello from absolupe path
    find / -name hello -print
    find /dev -iname usb*
    # Find files < 1M in user home dir
    find ~ -size -1M
    find /usr -size +40M

    find / -user daemon -not -group u1
    # Search for Directory (d) with name src with a max depth of 2
    # also mindepth option
    find /usr -maxdepth 2 -type d -name src
    # Find files mod 2000 days ago or more, replace with 12 to find files mod 12
    find /etc -mtime +2000
    # FIles modified less than 100 mins ago
    find /var/log -nmin -100
    # Block with permission 660
    find /dev -type b -perm 660
```

## Locate Command

- Discover all occurance of the string as they appear in pathnames.
- Unlike `find` command, `locate` searches the `/var/lib/mlocate/mlocate.db`. This DB is updated daily and can be manually updaed with `updatedb`

```bash
    locate passwd
    # Limit found
    locate -n3 passwd
    locate .sh -n2
    # to view stats
    locate -S
```
