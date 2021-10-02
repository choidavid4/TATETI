//Variables
let turnoX;
let contadorDeTurnos;
const celdasArray = Array.from(document.querySelectorAll(".celda"));
const combinacionesDeVictoria =[
    [0, 1 ,2],
    [3, 4 ,5],
    [6, 7 ,8],
    [0, 3 ,6],
    [1, 4 ,7],
    [2, 5 ,8],
    [0, 4 ,8],
    [2, 4 ,6],
]
const mensajeFinal = document.getElementById("mensaje-final");
const botonReinicio = document.getElementById("reiniciar");
const finDelJuegoPantalla = document.getElementById("fin-del-juego");
const turno = document.getElementById("turno");

//Eventos
botonReinicio.addEventListener('click', reiniciarJuego);

//Funcion principal que inicia el juego
reiniciarJuego();


//funciones
function mostrarFigura(evento){
    let elemento = evento.target.firstElementChild;
    turno.innerText = turnoX ? "Jugador O" : "Jugador X";
    if(turnoX){
        hacerMovimiento(elemento, "x");
        turnoX = false;
    }else{
        hacerMovimiento(elemento, "o");
        turnoX = true;
    }
}


function hacerMovimiento(elemento, figura){
    elemento.classList.add(figura);
    if (buscarGanador(recorrerTablero(figura))){
        finDelJuego("Ha ganado " + figura.toUpperCase() + "!");
    }
    else if(contadorDeTurnos == 9){
        finDelJuego("Empate!");
    }
    else{
        contadorDeTurnos++;
    }
}

function finDelJuego(mensaje){
    finDelJuegoPantalla.style.display = "flex";
    mensajeFinal.innerText = mensaje;
}

function reiniciarJuego(event){
    contadorDeTurnos = 1;
    finDelJuegoPantalla.style.display = "none";
    turnoX = true;
    turno.innerText = "Jugador X";
    celdasArray.forEach(element => {
        element.firstElementChild.setAttribute("class", "figura");
        element.addEventListener('click', mostrarFigura, {once: true});
    });
}

//a recorrerTablero() le paso la figura en string para que lo busque como clase. devuelve las posiciones del elemento.
function recorrerTablero(figura){
    let figuras = Array.from(document.querySelectorAll(".figura"));
    let result = [];
    for (let i = 0; i < figuras.length; i++){
        let listaClases = figuras[i].classList;
        if(listaClases.contains(figura)){
            result.push(i);
        }
    }
    return result;
    //arreglo con elementos
    //chequear si el elemento tiene la clase
}

//comparar posiciones con combinaciones
//buscarGanador retorna true si encuentra ganador
function buscarGanador(posicionesActuales){
    let matchPos;
    for(let i = 0; i < combinacionesDeVictoria.length; i++){
        combinacion = combinacionesDeVictoria[i];
        matchPos = combinacion.every((pos)=>{
            if(posicionesActuales.indexOf(pos) == -1){
                return false;
            }else{
                return true;
            }
        });
        if (matchPos){
            return true;
        }
    }
    return false;
}






