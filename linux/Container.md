# Container

Docker is not supported in `8` so use `Podman`.

- `podman` manages pods
- `buildah` for building, signing and pushing container img
- `skopeo` for copying, signing, inspecting and deleting images
- `runc` for providing run and build features to podman and buildah
- `crun` optional runtime that can be config to give greater flexability, control, and security for rootless container

```bash
    yum install podman -y
    rpm -qa | grep podman
    podman -v
    podman info
    # PODMAN WORKS EXACTLY LIKE DOCKER
```
