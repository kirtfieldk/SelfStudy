# Input and Output Redirects

- stdin file desc num 0
- stdout file desc num 1
- stderr file desc num 2

By desfualt `stdout`, output appears on terminal. Route output to file with `>` which will override original file content.
To use the same file for additional output or to append to the same file use `>>`.

```bash
- ls -l > <filename>
- pwd > <filename>
- ls -l >> <a>
- pwd >> <a>
```

For stdin, use `<` to feed

```bash
    cat < listings main -s "Office Memo" <email> < memoletter
```

For stderr, use `2>`, write errors that occure in console to a file.

```bash
    ls -l 2> errorfile
```

# Pipes

Pipe is used by the shell to connect the output of one command directly to the input of another command `|`.

```bash
    command [args] | command [args]
```

For example, take a large directory where its contents will need to scroll. To View in pagination instead of scrolling,
pipe the output into `more` command to switch between pages use `space`.

```bash
    ls -ltr | more
```

To view last few lines, `x`, of directory, pipe `ll` into `tail`.

```bash
    ll | tail -x
```
