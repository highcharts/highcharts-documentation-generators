Highcharts Documentation Generator for TypeScript
=================================================

This is the development documentation to ease modification of the TypeDoc theme
system, that lacks substantial information.



TypeDoc Rendering Pipeline
--------------------------

All files are by default piped trough the `./layouts/default.hbs` template. The
provided `contents` string is a result of the additional template file as listed
below:

+--------------------------------------+--------------------------------------+
| Output Path                          | Additional Template File             |
+--------------------------------------+--------------------------------------+
| ./assets/*.*                         | ./assets/*.*                         |
| ./interfaces/*.html                  | ./templates/reflection.hbs           |
| ./modules/*.html                     | ./templates/reflection.hbs           |
| ./globals.html                       | ./templates/reflection.hbs           |
| ./index.html                         | ./templates/index.hbs                |
+--------------------------------------+--------------------------------------+


TypeDoc Rendering Context
-------------------------

The context in all templates is quite similar and differs only minimal in some
properties, thagt might be undefined in some constellations.

- root object
  - **contents**: `string|undefined` - Generated template content in the layout
    templates
  - **filename**: `string` - Full file path of the output file
  - **template**: `function` - Use case of this template function is unknown
  - **templateName**: `string` - File name of the template, e.g. `index.hbs` or
    `reflection.hbs`
  - **url**: `string` - Relative url path of the output file
  - **model**: `Model object`
  - **navigation**: `Navigation object`
  - **project**: `Project object`
  - **settings**: `Settings object` - TypeDoc user settings
  - **toc**: `Toc object`
