(function() {

    const lng = document.querySelector('#lng').value || -73.132978; 
    const lat = document.querySelector('#lat').value || 7.1183812; 
    const mapa = L.map('mapa').setView([lat, lng ], 15);
    let marker;

    // Utilizar provider y geocoder
    const geocodeService = L.esri.Geocoding.geocodeService();
    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);


    // El pin
    marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true
    }).addTo(mapa);

    marker.on('moveend', (e)=>{
        marker = e.target;
        const position = marker.getLatLng();

        mapa.panTo(new L.LatLng(position.lat, position.lng));

        // Obtener informacion de las calles al soltar el pin
        geocodeService.reverse().latlng(position, 15).run(function(error, resultado){
        
        
        marker.bindPopup(resultado.address.LongLabel);
        
        // Llenar los campos
        document.querySelector('.calle').textContent = resultado?.address?.Address ?? ''
        document.querySelector('#calle').value = resultado?.address?.Address ?? ''
        document.querySelector('#lat').value = resultado?.latlng?.lat ?? ''
        document.querySelector('#lng').value = resultado?.latlng?.lng ?? ''

    });
    });

})()