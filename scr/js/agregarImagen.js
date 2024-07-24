import { Dropzone } from 'dropzone'


Dropzone.options.imagen = {
    dictDefaultMessage:  'Sube tus imagenes acá',
    acceptedFiles: '.png,.jpg, .jpeg',
    maxFilesize: 5,
    maxFiles: 5,
    parallelUploads: 5,
    autoProcessQueue: false,
    addRemoveLinks: true,
    dictRemoveFile: 'Borrar Archivo',
    dictMaxFilesExceeded: 'El limite es un archivo',
    paramName: 'imagen',

    init: function() {
        const dropzone = this;
        const btnPublicar = document.querySelector("#publicar");

        btnPublicar.addEventListener('click', function() {
            dropzone.processQueue();
        });

        dropzone.on('queuecomplete', function(){

            if(dropzone.getActiveFiles().length == 0){
                window.location.href = '/propiedades/';
            }

        });
    }
    

}
