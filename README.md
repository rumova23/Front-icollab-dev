# CompliacePerfil

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

ng build --output-path="dist/compliance" --deployUrl="compliance/" --prod

ng build --output-path="dist/compliance" --deployUrl="compliance/"

ng build --prod --base-href /icollab/

and set in src\environments\environment.ts
```
export const environment = {
  production: false
  ,mnUrl      : 'http://201.149.85.14:8383/catalogomaestro/'  /**micro catalago maestro port:1155*/
  ,sgUrl      : 'http://localhost:8400/'  /**seguridad port:8400*/
  ,pgUrl      : 'http://201.149.85.14:8383/microexamen/'  /**micro examen port:1144*/ 
  ,cnUrl      : 'http://201.149.85.14:8383/evaluacionexamen/' /**evaluacion port:1122*/ 
  ,mtUrl      : 'http://201.149.85.14:8383/tags/'  /**micro tag port:1188*/ 
  ,appVersion : 'Desarrollo V 0.0.0.1'
};
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
