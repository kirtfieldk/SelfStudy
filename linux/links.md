## Soft And Hard Links

#### Links are shortcuts that we can call anywhere

- inode = Pointer / number of a file on the hard disk. A computer assigns a number to a file
- soft link = Link will be rm if file is removed or renamed, direct to file
- hard link = Deleting or renaming or moving original file will not affect the hard link, Direct to inode
  ln (hard link) ln -s (soft link)
  - ls -ltri displays the Inode too
