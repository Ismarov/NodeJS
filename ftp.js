//Crea cliente FTP

var Client = require('ssh2').Client;
var connSettings = {
     host: 'ip host',
     port: 22, // Normalmente se usa el puerto 22
     username: 'user',
     password: 'pass'
     // Puedes usar un archivo key si lees la documentación
};

var conn = new Client();
conn.on('ready', function() {
    conn.sftp(function(err, sftp) {
         if (err) throw err;
         // Podrás usar las funciones de SFTP con el objeto sftp
         // Por ejemplo funciones como .unlink ó chmod etc
    });
}).connect(connSettings);


//Listar directorio

/** 
var Client = require('ssh2').Client;
var connSettings = {
     host: 'ip host',
     port: 22, // Normalmente se usa el puerto 22
     username: 'user',
     password: 'pass.'
     // Puedes usar un archivo key si lees la documentación
};
var remotePathToList = '/var/www/html';

var conn = new Client();
conn.on('ready', function() {
    conn.sftp(function(err, sftp) {
         if (err) throw err;
         
         sftp.readdir(remotePathToList, function(err, list) {
                if (err) throw err;
                // Listar el directorio en la consola 
                console.dir(list);
                // No olvides cerrar la conexión de otra manera habrá problemas
                conn.end();
         });
    });
}).connect(connSettings);


*/

//Subir un archivo

var Client = require('ssh2').Client;
var connSettings = {
     host: 'ip host',
     port: 22, // Normalmente se usa el puerto 22
     username: 'user',
     password: 'pass'
     // Puedes usar un archivo key si lees la documentación
};

var conn = new Client();
conn.on('ready', function() {
    conn.sftp(function(err, sftp) {
         if (err) throw err;
         
        var fs = require("fs"); // Usar el módulo de sistema de archivos
        var readStream = fs.createReadStream("C:\guia_extensibility.docx");
        var writeStream = sftp.createWriteStream( "/u01/app/banner/GUAUPLP/test.docx" );

        writeStream.on('close',function () {
            console.log( "Archivo satisfactoriamente transferido" );
        });
        writeStream.on('end', function () {
            console.log( "Conexión SFTP cerrada" );
            conn.close();
        });
        // Iniciar transferencia de archivo
        readStream.pipe( writeStream );
    });
}).connect(connSettings);
