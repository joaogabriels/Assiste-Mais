const API_KEY = 'api_key=8a2240559c31a8380bef9a3f6ed874d7';
const BASE_URL = 'https://api.themoviedb.org/3/';

function exibeResultados(){
    let sectionTelaPesquisa = document.getElementById('pagina-pesquisa');
    let textoPesquisa = '';

    let dadosPesquisa = JSON.parse(this.responseText);

    if(dadosPesquisa.results.length === 0){
        textoPesquisa = textoPesquisa + `
            <div class="itens-pesquisados">
                <p>Não foram encontrado resultados para a sua pesquisa</p>
            </div>
        `;        
    }
    else{
        for(i = 0; i<dadosPesquisa.results.length; i++){
            let retornoPesquisa = dadosPesquisa.results[i];
            textoPesquisa = textoPesquisa + `
                <div class="d-flex flex-column justify-content-center align-items-center p-2">
                    <img class="img-fluid" src=${imgUrl}${retornoPesquisa.poster_path} alt=${retornoPesquisa.original_title} onClick="details(${retornoPesquisa.id})"/>
                    <p class="mt-2 h5">${retornoPesquisa.title}</p>
                    <span>Data de lançamento: ${retornoPesquisa.release_date}</span>
                    <span>Avaliação: ${retornoPesquisa.vote_average}</span>
                </div>
            </div>
            `;
        }
    }

    sectionTelaPesquisa.innerHTML = textoPesquisa;
}

function details(id){
    window.location.href = `https://www.themoviedb.org/movie/${id}`;
}

function exibeErro(){
    alert('Houve um erro com a requisição');
}

function executarPesquisa(){
    let query = document.getElementById('textoPesquisa').value;

    let xhr = new XMLHttpRequest();
    xhr.onload = exibeResultados;
    xhr.onerror = exibeErro;
    xhr.open('GET', `${BASE_URL}search/movie?${API_KEY}&language=pt-BR&query=${query}`, false);
    xhr.send();
}

document.getElementById('btnPesquisa').addEventListener('click',executarPesquisa);