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
