![Narative Logo Header](https://res.cloudinary.com/narative/image/upload/v1554161802/home-meta.jpg)

<br />

### Getting started

[Contentful CLI](https://github.com/contentful/contentful-cli)
[Contentful exporting](https://github.com/contentful/contentful-cli/tree/master/docs/space/export)
[Contentful importing](https://github.com/contentful/contentful-cli/tree/master/docs/space/import)

#### Exporting

```sh
# To export the latest Contentful content and assets run
yarn contentful:export
```

#### Importing

In your project, ...

```sh
# In this repository
yarn contentful:import ./exports/<content-export-id.json>

# In a new repository
contentful space import --content-file
```
