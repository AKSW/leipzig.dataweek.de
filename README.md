# Das ist die Seite der DataWeek in Leipzig

| URL     | Source Branch | Target Branch | Workflow | Description |
|---------|---------------|---------------|----------|-------------|
| https://dataweek.de/ | `main` | `page-live` | `build.yml` | Live |
| https://staging.dataweek.de/ | `develop` | `page-staging` | `preview-yml` | Staging/development preview for the Live page  |
| https://next.dataweek.de/ | `next` | `page-next` | New Layout development area |
| https://2022.dataweek.de/ | `past/2022` | `page-2022` | Archived page from 2022 |
| | `feature/newLayout` | | Static branch of the new layout |

A *source branch* is built with an actions workflow and the result is pushed to the respective *target branch*.

The setup of the build workflow is as follows:

![Build Workflow](docu/page-build-setup.png)

## Local setup

### Requirements

- Git
- [Task](https://taskfile.dev/)
- Docker or Podman
- Optionally:
  - Python (for `serve` resp. `watch` and `pictures:scale` resp. `pictures:scale:preconditions`)
  - [entr](http://eradman.com/entrproject/) (for `watch` resp. `build:watch`)

### Build the page

```
task build
```

### Serve the page

```
task serve
```

Since jekyll only watches pages but not the layouts and data there is no automatic rebuild. You have to run `task build serve` again, if you perform changes.

### Development Setup

*Additional requirement:* [entr](http://eradman.com/entrproject/)

```
task watch
```

Serves the page and rebuilds it when changes happen in the directory.


### Get the data

To work with the data you need to clone https://github.com/AKSW/leipzig.dataweek.de-model/. This is done with

```
task sync-data
```

## Trouble Shooting

### Working on a single resource

Use the [`restriction_file` feature (Jekyll RDF Documentation)](https://github.com/AKSW/jekyll-rdf#restrict-resource-selection).

If you work on a single resource respectively the corresponding layout the build time might be to long for active development.
In this case the `restriction:` in the `_config.yml` file can be out-commented and replaced by a `restriction_file: restriction_file.txt` setting. The restriction file would just contain the resource(s) you are working on, e.g.:

```
<https://2023.dataweek.de/2023-06-26/>
```
