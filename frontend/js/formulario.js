const $ = (element) => document.getElementById(element)

window.onload = async () => {

    let query = new URLSearchParams(location.search);

    if(query.has('id')){
        $('botonGuardar').hidden = false;

        try {
            let response = await fetch(sessionStorage.getItem('urlBase') + '/api/movies/' + query.get('id'))
            let results = await response.json()
            let movie = results.data;

            $('title').value = movie.title;
            $('rating').value = movie.rating;
            $('awards').value = movie.awards;
            $('release_date').value = moment(movie.release_date).format('YYYY-MM-DD');
            $('length').value = movie.length;

            
            $('form').addEventListener('submit', async (e) =>{
            e.preventDefault();
          

            let bodyForm = {
                title: $('title').value,
                rating: $('rating').value,
                awards : $('awards').value,
                release_date: $('release_date').value,
                length: $('length').value
            }

            try {
                let response = await fetch(sessionStorage.getItem('urlBase') + '/api/movies/update/' + query.get('id'),{
                    method: 'PUT',
                    body: JSON.stringify(bodyForm),
                    headers:{
                        'Content-Type' : 'application/json'
                    }
                });
                let results = await response.json()
                console.log(results)
                alert('Formulario enviado')
            } catch (error) {
                console.log(error)
            }
    })

        } catch (error) {
            console.log(error)
        }
    }else{
        $('botonCrear').hidden = false;
    }

}