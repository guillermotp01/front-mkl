# FrontMkl

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



## BD

create DATABASE bd_mkl;
USE bd_mkl;


-- Crear tabla para Usuarios
CREATE TABLE usuarios (
    id_usuario INT ZEROFILL NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(45) NOT NULL UNIQUE,
    password VARCHAR(45) NOT NULL UNIQUE,
    PRIMARY KEY (id_usuario)
);

CREATE TABLE tb_productos (
    id_producto INT PRIMARY KEY AUTO_INCREMENT,
    nombre_producto VARCHAR(200) NOT NULL,
    descripcion_producto VARCHAR(254) NOT NULL,
    precio_producto DOUBLE NOT NULL
);

CREATE TABLE tb_colores (
    id_color INT PRIMARY KEY AUTO_INCREMENT,
    nombre_color VARCHAR(20) NOT NULL,
    id_producto INT,
    FOREIGN KEY (id_producto) REFERENCES tb_productos(id_producto)
);

CREATE TABLE tb_tallas_productos (
    id_talla_producto INT PRIMARY KEY AUTO_INCREMENT,
    talla VARCHAR(255) NOT NULL,
    cantidad INT NOT NULL,
    id_producto INT,
    id_color INT,
    FOREIGN KEY (id_producto) REFERENCES tb_productos(id_producto),
    FOREIGN KEY (id_color) REFERENCES tb_colores(id_color)
);

-- DROP TABLE tb_productos;
-- DROP TABLE existencia_producto;


INSERT INTO usuarios (nombre, correo, password) VALUES('Joel','juradoec@gmail.com', 'joel123');
INSERT INTO usuarios (nombre, correo, password) VALUES('Carlos', 'mirandaTr98@gmail.com', 'carlos123');
INSERT INTO usuarios (nombre, correo, password) VALUES('Marcela', 'schMarce@gmail.com', 'marcela123');
INSERT INTO usuarios (nombre, correo, password) VALUES('Ben', 'ben10@gmail.com', 'ben123');




SELECT * FROM tb_productos;
SELECT * FROM tb_colores;
SELECT * FROM tb_tallas_productos;
SELECT * FROM usuarios;
