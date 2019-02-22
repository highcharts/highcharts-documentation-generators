Highcharts Documentation Generator for TypeScript
=================================================

This is the development documentation to ease modification of the TypeDoc theme
system, that lacks substantial information.



TypeDoc Rendering Pipeline
--------------------------

All files are by default piped trough the `./layouts/default.hbs` template. The
provided `contents` string is a result of the additional template file as listed
below:

| Output Path                          | Additional Template Input            |
|--------------------------------------|--------------------------------------|
| assets/                              | assets/                              |
| interfaces/*.html                    | templates/reflection.hbs             |
| modules/*.html                       | templates/reflection.hbs             |
| globals.html                         | templates/reflection.hbs             |
| index.html                           | templates/index.hbs                  |



TypeDoc Rendering Context
-------------------------

The context in all templates is quite similar and differs only minimal in some
properties, thagt might be undefined in some constellations.

- **BaseObject**
  - **contents**: `string|undefined`  
    Generated template content in the layout templates
  - **filename**: `string`  
    Full file path of the output file
  - **model**: `ReflectionObject`
    Information about the current member
  - **template**: `function`  
    Use case of this template function is unknown
  - **templateName**: `string`  
    File name of the template, e.g. `index.hbs` or `reflection.hbs`
  - **url**: `string`  
    Relative url path of the output file
  - **navigation**: `NavigationObject`
    Member structure of the project
  - **project**: `ReflectionObject` not verified
  - **settings**: `SettingsObject`  
    TypeDoc user settings
  - **toc**: `TocObject`
    Output file structure with reference to each reflected object
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
- **ReflectionObject**
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
- **SettingsObject**
  - **ignoreCompilerErrors**: `boolean`
  - **includeDeclarations**: `boolean`
  - **name**: `string`
  - **logger**: `Function`
  - **readme**: `string`
  - **theme**: `string`  
    Theme directory as given to TypeDoc
- **TocObject**
  - **children?**: `Array<TocObject>`
    Output files, that are logical children to the reflection object
  - **cssClasses**: `string`
    String of CSS classes for styling purposes
  - **isLabel?**: `boolean`
    Indicates object without a reflection
  - **parent?**: `TocObject`
    Output file, that is the logical parent to the reflection object
  - **reflection?**: `ReflectionObject`
    Reflection of the source code member
  - **title**: `string`
    Name of the source code member
  - **url**: `string`
    Relative path to the output file

