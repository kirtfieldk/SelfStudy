# Package Managment

### rpm

- one or more files that are packaged together in a special format and stored in files with the `.rpm` extension.
- `software package` is a group of files orgainized in a dir structure along metadata and intelligence that make the software application. Two Types `binary` and `source`.
  - `binary` are install ready and are bundles for distribution. Have the `.rpm` extension.
  - `source`

### Package naming

1. package name
2. version
3. release
4. Enterprise Linux Package Made for
5. processor
   ex. openss-1.1.1-8.el8.x86_64

- metadata for installed packages are stored in the `/var/lib/rpm` dir. This directory is referred to the `package database`.

```bash
    rpm -q[uery] -qa[query all]...
    rpm -e[rase] --force -F[reshen] -h[ash] -i[nstall] --import -v[erbose]
    -V[erify]

    # List document files
    rpm -qd audit
    # list config file
    rpm -qc cups
    # Which package owns the specified file
    rpm -qf /etc/passwd
    # Display info about an installed package including version, release, installation status, installation date, size, signature, desc,...
    rpm -qi setup
    # List all file and package dependencies for a given package
    rpm -qR chronu
    # Determin what package require the specified package in order to operate properly
    rpm -q --whatrequires lvm2
```

### Advance Package Management

A `package group` is a collection of correlated packages designed to serve a common purpose.

- Enviornment groups: Server, Server with GUI, min install, workstation, Virtual host, and custom OS.
- Package groups: Container Management, smart card support, security tools, network servers

`Application Streams` employs a modular approach to organize multiple versions of a software app alongside its dependencies to be avail forinstallation from a single repo. A `module` can be thought of as a logical set of application packages that include everything to install it. `Modularity` gives the flexibility to choose the version of software based on need.

`Module Stream` is a collection of packages orgainzed by version. Each mod can have multiple streams, and each stream recieves updates independantly of the other streams.

`Module Profile` is a list of recommended packages organized for purpose-built, convenient deployments to support a variety of use cases such as minimal, development, common, client, server, etc.

## Software Management with `dnf/yum`

The key config file for `dnf` is `dnf.conf` that resides in the `/etc/dnf` directory. The perferred location to store config for each custom repo in their own definition files is in the `/etc/yum.repos.d`.

```bash
    [keith@redhat ~]$ cat /etc/dnf/dnf.conf
    gpgcheck=1
    installonly_limit=3
    clean_requirements_on_remove=True
    best=True
    skip_if_unavailable=False
```

- best: Specifies whether to install the latest avail version
- clean_requirements_on_remove: Defines whether to remove dependencies during a package removal process that are no longer in use.
- installonly_limit: Specifies a count of packages that can be installed concurrently. Default is 3.

```bash
    # To see alladditional directives
    man 5 dnf.conf
```

- `yum` is a soft link to `dnf`

```bash
    # List the packages that are avail for installation from one or more enabled repos
    sudo dnf repoquery
        Updating Subscription Management repositories.
        Last metadata expiration check: 15:50:08 ago on Tue 09 Nov 2021 06:09:00 PM EST.
        CUnit-0:2.1.3-17.el8.i686
        CUnit-0:2.1.3-17.el8.x86_64
        GConf2-0:3.2.6-22.el8.i686
        GConf2-0:3.2.6-22.el8.x86_64
        HdrHistogram-0:2.1.11-2.module+el8.2.1+6346+3bc8dea2.noarch
        HdrHistogram-0:2.1.11-3.module+el8.4.0+10229+75da8244.noarch
        HdrHistogram-0:2.1.11-3.module+el8.5.0+12798+cbad756b.noarch
        HdrHistogram-javadoc-0:2.1.11-2.module+el8.2.1+6346+3bc8dea2.noarch
        HdrHistogram-javadoc-0:2.1.11-3.module+el8.4.0+10229+75da8244.noarch
        ...
    sudo dnf repoquery --repo "<repoName>"

    # List all installed package on the system
    sudo dnf list installed | head -10
        Installed Packages
        GConf2.x86_64                                      3.2.6-22.el8                                   @rhel-8-for-x86_64-appstream-rpms
        ModemManager.x86_64                                1.10.8-2.el8                                   @rhel-8-for-x86_64-baseos-rpms
        ModemManager-glib.x86_64                           1.10.8-2.el8                                   @rhel-8-for-x86_64-baseos-rpms
        NetworkManager.x86_64                              1:1.30.0-13.el8_4                              @rhel-8-for-x86_64-baseos-rpms
        NetworkManager-adsl.x86_64                         1:1.30.0-13.el8_4                              @rhel-8-for-x86_64-baseos-rpms
        NetworkManager-bluetooth.x86_64                    1:1.30.0-13.el8_4                              @rhel-8-for-x86_64-baseos-rpms
        NetworkManager-config-server.noarch                1:1.30.0-13.el8_4                              @rhel-8-for-x86_64-baseos-rpms
        NetworkManager-libnm.x86_64                        1:1.30.0-13.el8_4                              @rhel-8-for-x86_64-baseos-rpms

    # List all packages avail from all enabled repos that should be able to update
    sudo dnf list updates

    # List install packages whose names begin with gnome
    sudo dnf list installed gnome*

    sudo dnf install <package>

    sudo dnf update <package>

    # Update all packages
    sudo dnf -y update

    dnf info <package> | dnf info yelp
        Name         : yelp
        Epoch        : 2
        Version      : 3.28.1
        Release      : 3.el8
        Architecture : x86_64
        Size         : 2.2 M
        Source       : yelp-3.28.1-3.el8.src.rpm
        Repository   : @System
        From repo    : rhel-8-for-x86_64-appstream-rpms
        Summary      : Help browser for the GNOME desktop
        URL          : https://wiki.gnome.org/Apps/Yelp
        License      : LGPLv2+ and ASL 2.0 and GPLv2+
        Description  : Yelp is the help browser for the GNOME desktop. It is designed
                    : to help you browse all the documentation on your system in
                    : one central tool, including traditional man pages, info pages and
                    : documentation written in DocBook.

    sudo dnf remove <package>
```

```bash
    # check if cifs-utils is installed
    sudo dnf installed | grep cifs-utils
    # Not installed
    # determin if the cifs-utils package is avail for installation
    sudo dnf repoquery cifs-utils
        cifs-utils-0:6.8-2.el8.x86_64
        cifs-utils-0:6.8-3.el8.x86_64
    # The package is avail for installation
    # Display detailed info about the package
    # Package is avil for install from the BaseOS repo
    sudo dnf info cifs-utils
        Name         : cifs-utils
        Version      : 6.8
        Release      : 3.el8
        Architecture : x86_64
        Size         : 96 k
        Source       : cifs-utils-6.8-3.el8.src.rpm
        Repository   : rhel-8-for-x86_64-baseos-rpms
        Summary      : Utilities for mounting and managing CIFS mounts
        URL          : http://linux-cifs.samba.org/cifs-utils/
        License      : GPLv3
        Description  : The SMB/CIFS protocol is a standard file sharing protocol widely
                    : deployed on Microsoft Windows machines. This package contains tools for
                    : mounting shares on Linux using the SMB/CIFS protocol. The tools in this
                    : package work in conjunction with support in the kernel to allow one to
                    : mount a SMB/CIFS share onto a client and use it as if it were a standard
                    : Linux file system.
    # Installed package
    sudo dnf install -y cifs-utils
    # Verify if package is installed
    sudo dnf list installed | grep cifs-utils
    dnf info cifs-utils
    # remove
    sudo dnf remove -y cifs-utils
```

```bash
    # To search for package that contains a specific file such as /etc/passwd, use the provides or whatprovides subcommand with dnf
    dnf provides /etc/passwd
        Repo        : rhel-8-for-x86_64-baseos-rpms
        Matched from:
        Filename    : /etc/passwd

        setup-2.12.2-2.el8.noarch : A set of system configuration and setup files
        Repo        : rhel-8-for-x86_64-baseos-rpms
        Matched from:
        Filename    : /etc/passwd

        setup-2.12.2-2.el8_1.1.noarch : A set of system configuration and setup files
        Repo        : rhel-8-for-x86_64-baseos-rpms
        Matched from:
        Filename    : /etc/passwd

        setup-2.12.2-5.el8.noarch : A set of system configuration and setup files
        Repo        : rhel-8-for-x86_64-baseos-rpms
        Matched from:
        Filename    : /etc/passwd

        setup-2.12.2-6.el8.noarch : A set of system configuration and setup files
        Repo        : @System
        Matched from:
        Filename    : /etc/passwd

        setup-2.12.2-6.el8.noarch : A set of system configuration and setup files
        Repo        : rhel-8-for-x86_64-baseos-rpms
        Matched from:
        Filename    : /etc/passwd

    # whatprovides
    dnf whatprovides /usr/bin/system-config*

    # To search for all packages that match the specified string in their name
    # or summary
    dnf search system-config
            Last metadata expiration check: 0:18:59 ago on Wed 10 Nov 2021 10:11:35 AM EST.
            ============================= Name Matched: system-config =============================
            system-config-printer-libs.noarch : Libraries and shared code for printer
                                            : administration tool
            system-config-printer-udev.x86_64 : Rules for udev for automatic configuration of USB
                                            : printers
            =========================== Summary Matched: system-config ============================
            cups-pk-helper.x86_64 : A helper that makes system-config-printer use PolicyKit
```

### Package group management

- two group

```bash
    dnf group list
        Available Environment Groups:
        Server
        Minimal Install
        Workstation
        Custom Operating System
        Virtualization Host
        Installed Environment Groups:
        Server with GUI
        Installed Groups:
        Headless Management
        Container Management
        Available Groups:
        Legacy UNIX Compatibility
        Security Tools
        RPM Development Tools
        Scientific Support
        Development Tools
        Smart Card Support
        Network Servers
        System Tools
        .NET Core Development
        Graphical Administration Tools

    # To Display the number of installed and avail package groups
    sudo dnf group summary -v
        Installed Groups: 2
        Available Groups: 10

    # To list groups hidden or not
    sudo dnf group list hidden [--available --installed]

    # To list all package that a specified package group
    sudo dnf group info <package> -v

    #Install package to group - smart card support
    sudo dnf -y groupinstall "smart card support"
    sudo dnf groupupdate "smart card support" -y
    sudo dnf -y groupremove "smart card support" -y
```

### Manipulate Package Groups - system tools

```bash
    # Check whether the system tools package group exists
    sudo dnf list group | grep "system tools"
    # Look if system tools group is avail for instal
    sudo dnf group list available | grep "System Tools"
    dnf group info "system tools"
    # Display list of package this group contains
    dnf group info "system tools"
    # Install
    sudo dnf group install "system tools" -y
    sudo dnf group remove -y "system tools"
    dnf group list installed
```

## Module Management

- List installed and Avail Modules

```bash
    dnf module list
    dnf module list --repo <repo>
    dnf module list perl
        Red Hat Enterprise Linux 8 for x86_64 - AppStream (RPMs)
        Name    Stream         Profiles              Summary
        perl    5.24           common [d], minimal   Practical Extraction and Report Language
        perl    5.26 [d][e]    common [d], minimal   Practical Extraction and Report Language
        perl    5.30           common [d], minimal   Practical Extraction and Report Language
    # List Specific stream
    dnf module list perl:5.24
```

- above cmd says two streams (5.24 and 5.26) avail for perl module
- (d) default
- (e) enable
- (x) disabl
- (i) installed

```bash
    dnf module list --enabled
    dnf module list --installed
    dnf module list --disabled
```

- Installing a module creates the needed directory tree for all the packages included in the module and all dependent packages, installes the req files for the selected profile, and runs any post-install steps.

```bash
    sudo dnf -y module install perl
    # Update squid
    sudo dnf module update squid -y
    # View info on a module
    sudo dnf module info --profile perl
    # Limit output to stream
    sudo dnf module info --profile perl:5.26
    # Remove module
    sudo dnf module remove <module>
```

```bash
    # postgresql Default stream is 10 and default profile is server
    dnf module list postgresql
        Name           Stream     Profiles               Summary
        postgresql     9.6        client, server [d]     PostgreSQL server and client module
        postgresql     10 [d]     client, server [d]     PostgreSQL server and client module
        postgresql     12         client, server [d]     PostgreSQL server and client module
        postgresql     13         client, server [d]     PostgreSQL server and client module

    dnf module info poastgresql:10
    sudo dnf module install postgresql:10 -y
    dnf module info postgresql:10
    sudo dnf module remove postgresql:10 -y
    dnf module info postgresql:10

```
