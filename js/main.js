$(document).ready( ()=> {
  $('#searchForm').on('submit', (e) => {
    let searchText= $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText){
  axios.get('https://api.themoviedb.org/3/search/movie?api_key=6f48ce090c2768d09c56cca392944c95&query='+searchText)
    .then((response) =>{
      let movies=response.data.results;
      let output='';
      $.each(movies,(index,movie)=>{
        output +=`
          <div class="col-md-3">
            <div class="well text-center">
              <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}">
              <h5>${movie.title}</h5>
              <h5>${movie.release_date}</h5>
              <a onClick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });
      $('#movies').html(output);
    })
    .catch((err)=>{
      console.log(err);
    });
}

function movieSelected(id){
  sessionStorage.setItem('moviesId', id);
  window.location='movie.html';
  return false;
}

function getMovie(){
  let moviesId=sessionStorage.getItem('moviesId');
  axios.get('http://api.themoviedb.org/3/movie/'+moviesId+'?api_key=6f48ce090c2768d09c56cca392944c95')
    .then((response) =>{
      let movie=response.data;

      let output=`
        <div class="row">
          <div class="col-md-4">
            <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.title}</h2>
            <ul class="list-group">
            <li class="list-group-item"><strong>Budget:</strong> ${movie.budget}</li>
            <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
            <li class="list-group-item"><strong>Rated:</strong> ${movie.vote_average}</li>
            <li class="list-group-item"><strong>Original Language:</strong> ${movie.original_language}</li>
            <li class="list-group-item"><strong>Runtime:</strong> ${movie.runtime}</li>
            <li class="list-group-item"><strong>Homepage:</strong> ${movie.homepage}</li>
            <li class="list-group-item"><strong>Adult:</strong> ${movie.adult}</li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="well">
          <h3>Overview</h3>
          ${movie.overview}
          <hr>
          <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
          <a href="index.html" class="btn btn-default">Go Back To Search</a>
        </div>
      </div>
      `;

      $('#movie').html(output);
    })
    .catch((err)=>{
      console.log(err);
    });
}
