Highcharts Documentation Generator for TypeScript
=================================================

This is the development documentation to ease modification of the TypeDoc theme
system, that lacks substantial information.



TypeDoc Rendering Pipeline
--------------------------

All files are by default piped trough the `./layouts/default.hbs` template. The
provided `contents` string is a result of the additional template file as listed
below:

| Output Path                          | Additional Template File             |
|--------------------------------------|--------------------------------------|
| ./assets/*.*                         | ./assets/*.*                         |
| ./interfaces/*.html                  | ./templates/reflection.hbs           |
| ./modules/*.html                     | ./templates/reflection.hbs           |
| ./globals.html                       | ./templates/reflection.hbs           |
| ./index.html                         | ./templates/index.hbs                |



TypeDoc Rendering Context
-------------------------

The context in all templates is quite similar and differs only minimal in some
properties, thagt might be undefined in some constellations.

- **BaseObject**
  - **contents**: `string|undefined`  
    Generated template content in the layout templates
  - **filename**: `string`  
    Full file path of the output file
  - **template**: `function`  
    Use case of this template function is unknown
  - **templateName**: `string`  
    File name of the template, e.g. `index.hbs` or `reflection.hbs`
  - **url**: `string`  
    Relative url path of the output file
  - **model**: `ModelObject`
  - **navigation**: `NavigationObject`
  - **project**: `ModelObject`
  - **settings**: `SettingsObject`  
    TypeDoc user settings
  - **toc**: `Toc object`
- **ModelObject**
  - **categories**: Array not verfified
  - **children**: Array not verfified
  - **cssClasses?**: `string`
  - **directory?**: any not verfified
  - **files?**: any not verfified
  - **flags**: Object not verfified
  - **groups**: Array not verfified
  - **hasOwnDocument?**: `boolean`
  - **id**: `number`
  - **kind**: `number`
  - **kindString?**: `string`
  - **name**: `string`
  - **originalName**: `string`
  - **packageInfo?**: Object not verfified
  - **parent?**: `ModelObject` not verfified
  - **readme**: `string`
  - **reflections?**: Object
  - **sources**: Array not verfified
  - **symbolMapping?**: Object not verfified
  - **url?**: `string`
- **NavigationObject**
  - **children**: `Array<NavigationObject>` not verified
  - **cssClasses**: `string`
  - **isCurrent**: `boolean`
  - **isInPath**: `boolean`
  - **isVisible**: `boolean`
  - **parent?**: `NavigationObject` not verified
  - **reflection?**: Object; not verified
  - **title**: `string`
  - **url**: `string`
- **SettingsObject**
  - **ignoreCompilerErrors**: `boolean`
  - **includeDeclarations**: `boolean`
  - **name**: `string`
  - **logger**: `Function`
  - **readme**: `string`
  - **theme**: `string`  
    Theme directory as given to TypeDoc
- **TocObject**
  - **children?**: Array<Object>; not verified
  - **cssClasses**: `string`
  - **isLabel**: `boolean`
  - **parent?**: Object; not verified
  - **reflection?**: Object; not verified
  - **title**: `string`
  - **url**: `string`

