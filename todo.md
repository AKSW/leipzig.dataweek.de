# TODOs

Let's add TODOs here.

## Pipeline

- **Unsure**: cmem: add class for teams -> cleanup: delete all rdf:_* properties insert foaf:member instead
- domain of (at least) all events have to be the same as the base domain
- first level subevents should have a short title (e.g. LSWT23)
- main resource team needs a description
- schema:affiliations and schema:memberOf range objects should have labels with language tag
- shortnames for events needed (e.g. "LSWT")
- cmem: add an update query for resources (n:m) built from date and room helping to generate program sites
with naviation (date) and subnavigation (room)

first draw:
```
CONSTRUCT {
    ?html rdf:type dw:RoomDay ;
    dw:datestring ?datestring_de, ?datestring_en ;
	rdfs:label "A resource helping jekyll-rdf in program.html." ;
    dw:rel_link ?rel_link ;
	schema:location ?location ;
  	dct:date ?date .}
WHERE {
  ?subEvent schema:subEvent ?session ;
    rdfs:label ?eventTitle ;
    dct:date ?date .
    FILTER(langMatches(lang(?eventTitle), "en"))

  ?session schema:location ?location ;
    schema:subEvent ?talk ;
    schema:startTime ?start ;
    schema:endTime ?end .
  ?talk dct:title ?talk_title .
  FILTER(langMatches(lang(?talk_title), "en"))

  ?location dct:title ?location_name .

  FILTER(DATATYPE(?date) = xsd:date)
  BIND(CONCAT("/", str(?date), "-", ?location_name) as ?rel_path)
  BIND(CONCAT(?rel_path, ".html") as ?rel_link)
  BIND(IRI(CONCAT("https://2022.dataweek.de", ?rel_path)) as ?html)
  BIND(strlang(CONCAT(str(day(?date)), ".", str(month(?date)), ".", str(year(?date))), "de") as ?datestring_de)
  BIND(strlang(str(?date), "en") as ?datestring_en)
}
```

## HTML - Jekyll
- events.html
  - render Markdown used in dct:description-Literal
  - fix links in menu for all events
  - shortnames for events needed

## HTML - extern
