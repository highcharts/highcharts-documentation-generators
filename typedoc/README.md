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
    Reflection of the current source code member
  - ***template***: `function`  
    *Unknown template function*
  - **templateName**: `string`  
    File name of the template, e.g. *index.hbs* or *reflection.hbs*
  - **url**: `string`  
    Relative url path of the output file
  - **navigation**: `NavigationObject`  
    Member structure of the project
  - **project**: `ReflectionObject`  
    Reflection of the main source code member
  - **settings**: `SettingsObject`  
    TypeDoc command line settings
  - **toc**: `TocObject`  
    Output structure with reflection references
- **DirectoryObject**
  - ***categories***: `Array<any>`  
    *Unknown categories array*
  - **directories**: `Dictionary<DirectoryObject>`  
    List of containing directories
  - **dirName?**: `string`  
    Directory name
  - **files**: `Array<FileObject>`  
    List of containing files
  - **groups**: `Array<GroupObject>`  
    Groups with containing reflection objects
  - **name?**: `string`  
    Name of the object
  - **parent?**: `DirectoryObject`  
    Parent directory
- **FileObject**
  - ***categories?***: `Array<any>`  
    *Unknown categories array*
  - **fileName**: `string`  
    Relative path to the source file
  - **fullFileName**: `string`  
    Full path to the source file
  - **groups**: `Array<GroupObject>`  
    Groups with containing reflection objects
  - **name**: `string`  
    File name of the source file
  - **parent**: `ReflectionObject`  
    Logical parent of the reflection object
  - **reflections**: `Array<ReflectionObject>`  
    Containing reflection objects
  - **url**: `string`  
    Repository URL of the reflected source file
- **GroupObject**
  - **allChildrenAreExternal**: `boolean`
  - **allChildrenAreInherited**: `boolean`
  - **allChildrenArePrivate**: `boolean`
  - **allChildrenAreProtectedOrPrivate**: `boolean`
  - **allChildrenHaveOwnDocument**: `boolean`
  - **children**: `Array<ReflectionObject>`
  - **cssClasses?**: `string`
  - **kind**: `number`
  - **someChildrenAreExposed**: `boolean`
  - **title**: `string`
- **NavigationObject**
  - **children**: `Array<NavigationObject>`  
    Logical children of the reflection object
  - **cssClasses**: `string`  
    String of CSS classes for styling purposes
  - **isCurrent**: `boolean`  
    True, if reflected member is part of current output file
  - **isInPath**: `boolean`  
    True, if reflected member is part of logical path
  - **isVisible**: `boolean`  
    True, if reflected member is public
  - **parent?**: `NavigationObject`  
    Logical parent of the reflection object
  - **reflection?**: `ReflectionObject`  
    Related reflection object
  - **title**: `string`  
    Title of the reflection
  - **url**: `string`  
    Relative file path
- **ReflectionObject**
  - ***categories***: `Array<any>`  
    *Unknown purpose*
  - **children**: `Array<ReflectionObject>`  
    Logical children of the reflection object
  - **cssClasses?**: `string`  
    String of CSS classes for styling purposes
  - **directory?**: `DirectoryObject`  
    Directory structure of the source code
  - **files?**: `Array<FileObject>`  
    List of related source files
  - **flags**: `Array<string>`  
    Source code flags: Const, Let
  - **groups**: `Array<GroupObject>`  
    List of related reflection groups
  - **hasOwnDocument?**: `boolean`  
    True, if reflection owns the output file (see *url* property)
  - **id**: `number`  
    Reflection ID
  - **kind**: `number`  
    Kind ID of reflected member
  - **kindString?**: `string`  
    Describtive kind name of reflected member, e.g. *External module*
  - **name**: `string`  
    Name of the reflected member
  - **originalName**: `string`  
    Full path to the source file
  - **packageInfo?**: `Dictionary<boject|string>`  
    Structure of the npm *package.json* source file
  - **parent?**: `ReflectionObject`  
    Logical parent of the reflection object
  - **readme**: `string`  
    Raw content of the readme as recognized by TypeDoc
  - **reflections?**: `Dictionary<ReflectionObject>`  
    Mapping reflection IDs to reflection objects
  - **sources**: `Array<SourceObject>`  
    List of related source files
  - **symbolMapping?**: `Dictionary<number>`  
    Mapping (negative) symbol IDs to reflections IDs
  - **url?**: `string`  
    Realtive URL of the output file
- **SettingsObject**
  - **ignoreCompilerErrors?**: `boolean`  
    True, if TypeDoc continues with errors during reflection
  - **includeDeclarations?**: `boolean`  
    True, if declarations are included for reflection
  - **name?**: `string`  
    Project name as given to TypeDoc
  - ***logger***: `Function`  
    *Unknown logger function*
  - **readme?**: `string`  
    Modified readme path as given to TypeDoc
  - **theme?**: `string`  
    Modified theme path as given to TypeDoc
- **SourceObject**
  - **character**: `number`  
    First source row number of related reflection
  - **file**: `FileObject`  
    File details with related reflection
  - **fileName**: `string`  
    Relative file path
  - **line**: `number`  
    First source line number of related reflection
  - **url**: `string`  
    Repository URL of the reflected source file
- **TocObject**
  - **children?**: `Array<TocObject>`  
    Output files, that are logical children of the reflection object
  - **cssClasses**: `string`  
    String of CSS classes for styling purposes
  - **isLabel?**: `boolean`  
    Indicates object without a reflection
  - **parent?**: `TocObject`  
    Output file, that is the logical parent of the reflection object
  - **reflection?**: `ReflectionObject`  
    Reflection of the source code member
  - **title**: `string`  
    Name of the source code member
  - **url**: `string`  
    Relative path to the output file
