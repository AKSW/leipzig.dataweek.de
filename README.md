# Das ist die Seite der DataWeek in Leipzig

- Live: https://dataweek.de/ (branch `main` built to `page-live`)
- Staging: https://staging.dataweek.de/ (branch `develop` built to `page-staging`)
- New Layout: https://next.dataweek.de/ (branch `feature/newLayout` built to `page-next`)
- 2022: https://2022.dataweek.de/ (branch `past/2022` built to `page-2022`)

Eventuell muss man noch `bundle add webrick` ausführen, falls ein Fehler mit webrick kommt.

## Local setup

### Requirements

- Git
- [Task](https://taskfile.dev/)
- Node.js & NPM
- Docker or Podman
- Python

### Preparation

Install the JavaScript dependencies
```
task install_javascript_dependencies
bundle install
```

### Build the styles

```
task styles
```

### Build the page (locally)

Only German language version:
```
task build_de
```

Alternatively all language versions:

```
task build_de build_en
```

### Build the page (docker)

Only German language version:
```
task build_docker_de
```

Alternatively all language versions:

```
task build_docker_de build_docker_en
```

### Serve the page

```
task serve
```

### Get the data, build the styles and the page in one run

With a local cmemc setup:

```
CMEMC_LOCAL='cmemc -c aksw.eccenca.dev' task default serve
```

## TODO

For Persons we might distinguish in the description between:
- [https://schema.org/affiliation](https://schema.org/affiliation)
- [https://schema.org/jobTitle](https://schema.org/jobTitle)
- [https://d-nb.info/standards/elementset/gnd#biographicalOrHistoricalInformation](https://d-nb.info/standards/elementset/gnd#id-feb84240ebb4724e71ceb35c74b63b13) (Short Bio for Keynote Speakers)
