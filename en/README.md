# Das ist die Seite der DataWeek in Leipzig

- Live: https://dataweek.de/
- Staging: https://staging.dataweek.de/
- 2022: https://2022.dataweek.de/

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
```

### Build the styles

```
task styles
```

### Build the page

Only German language version:
```
task build_de
```

Alternatively all language versions:

```
task build_de build_en
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
