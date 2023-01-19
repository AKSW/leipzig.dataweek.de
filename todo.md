# TODOs

Let's add TODOs here.

## Pipeline

- **Unsure**: cmem: add class for teams -> cleanup: delete all rdf:_* properties insert foaf:member instead
- domain of (at least) all events have to be the same as the base domain
- first level subevents should have a short title (e.g. LSWT23)
- cmem: add an update query for resources (n:m) built from date and room helping to generate program sites
with naviation (date) and subnavigation (room)

first draw:
```
PREFIX schema: <http://schema.org/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
SELECT DISTINCT ?html ?date
INSERT {
    ?html a ex:Day2Room ;
  	schema:date ?date .}
WHERE {
  ?e a schema:Event ;
  # ex:relationToRoom ?room
  schema:date ?date .
    FILTER(DATATYPE(?date) = xsd:date)
    BIND(IRI(CONCAT("https://dataweek.de/", str(?date), "-")) as ?html)
 #   BIND(IRI(CONCAT("https://dataweek.de/", str(?date), "-", ?room)) as ?html)
  }
```

## HTML - Jekyll

## HTML - extern
