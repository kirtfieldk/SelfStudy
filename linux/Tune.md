# Tune System Performance

`Tuned` is a systemd service that is used to tune Linux system performance. Installed by default. Comes with predefined profiles and settings.

E.x. will Adjust IO when every workload detected.

## Profiles

- balanced compromise between power saving and performance
- desktop Derived from balance, faster response and interactive app
- Throughput-performance
- Latency Performance
- Network Latency Additional network tuning params to provide low network latency
- Network Throughput Max network throughput
- powersave
- oracle Op for oracle DB based on throughput profile
- virtual guest Max performance if run on VM
- virtual host max performance if act as host for VM

```bash
    # What is current profile
    tuned-adm active
    # All Profiles
    tuned-adm -list
    # To Change
    tuned-adm profile <profilename>
    #  Check for Recommendation
    tuned-adm recommend
    # Change through console
    <ip>:9090
    # Check status of firewall
    systemctl status firewalld
```

# nice and renice

If a server has 1 cpu then task are first come first serve. This prio can be set on 40 different levels. The nice level values run from -20 (highest) to 19 lowest and by default, processes inherit their nice level from their parent, which is usally 0.

- To check prio run `top`, the `pr` is the pro level and `ni` is user is pro level.
- Nice values is a user-space and prio PR is the processes actual priority that uses by linux kernal. In Linux system priorities are 0 - 139 in which 0-99 for real time and 100-139 for users
- We can view PR via ps with

```bash
    ps axo pid, comm, nice, cls --sort=-nice
```

- To set proccess prio

```bash
    nice -n # proccess-name
    nice -n 15 top|free|ll|...
```

- To change procces prioroty

```bash
    renice -n # 12 PID
    renice -n 10 1234
```
