const speeds = [
    {'nome': 'ligeiro de passageiros', 'velocidades': [ 50, 90, 100, 120]},
    {'nome': 'motociclo cilindrada superior a 50cc', 'velocidades': [ 50, 90, 100, 120]},
    {'nome': 'ligeiro de mercadorias', 'velocidades': [ 50, 80, 90, 110]},
    {'nome': 'pesado de passageiros', 'velocidades': [ 50, 80, 90, 100]},
    {'nome': 'triciclo', 'velocidades': [ 50, 80, 90, 100]},
    {'nome': 'pesado de mercadorias', 'velocidades': [ 50, 80, 80, 90]},
    {'nome': 'pesado de mercadorias com semireboque', 'velocidades': [ 50, 80, 80, 90]},
    {'nome': 'ligeiro de passageiros com reboque', 'velocidades': [ 50, 70, 80, 100]},
    {'nome': 'motociclo de cilindrada superior a 50cc com carro lateral', 'velocidades': [ 50, 70, 80, 100]},
    {'nome': 'ligeiro de mercadorias com reboque', 'velocidades': [ 50, 70, 80, 90]},
    {'nome': 'pesado de passageiros com reboque', 'velocidades': [ 50, 70, 90, 90]},
    {'nome': 'pesado de mercadorias com reboque', 'velocidades': [ 50, 70, 70, 80]},
    {'nome': 'maquina industrial com matricula', 'velocidades': [ 50, 70, 70, 80]},
    {'nome': 'motociclos com cilindrada ate 50cc', 'velocidades': [ 40, 60]},
    {'nome': 'maquina agricula', 'velocidades': [ 20, 20]},
    {'nome': 'tratocarro', 'velocidades': [ 20, 20]},
    {'nome': 'multicultivador', 'velocidades': [ 20, 20]},
    {'nome': 'maquina industrial sem matricula', 'velocidades': [ 30, 30]},
    {'nome': 'trator agricula', 'velocidades': [ 30, 40]},
    {'nome': 'ciclomotores', 'velocidades': [ 40, 45]},
    {'nome': 'quadriciclo', 'velocidades': [ 40, 45]},
    {'nome': 'comboio turristico', 'velocidades': [ 25 ]},
];
const  vias = ['dentro das localidades', 'restantes vias publicas', 'via reservadas a automoveis e motociclos', 'autoestradas'];

window.onload = function(ev) {
    var velocidade;
    const form = document.getElementById('form');
    const road = document.getElementById('road');
    const vehicle = document.getElementById('vehicle');
    const incorrect = document.getElementById('incorrect');
    const ans1 = document.getElementById('answer-1');
    const ans2 = document.getElementById('answer-2');
    const ans3 = document.getElementById('answer-3');
    const ans4 = document.getElementById('answer-4');
    const ansButtons = [ans1, ans2, ans3, ans4]
    const incorrectText = 'Errado, resposta certa era ';

    generateQuestion();

    form.onsubmit = submit;

    function submit(event) {
        const response = +event.submitter.textContent;
        
        if (response === velocidade) {
            resetForm();
        } else {
            generateQuestion();
            incorrect.removeAttribute('hidden');
            incorrect.textContent = `${incorrectText} ${velocidade}`;
        }
    
        event.preventDefault();
    }

    function resetForm() {
        generateQuestion();
        incorrect.setAttribute('hidden', '');
        incorrect.textContent = '';
    }

    function generateQuestion() {
        const veiculo = speeds[Math.floor(Math.random() * speeds.length)];
        const index = Math.floor(Math.random() * veiculo.velocidades.length);
        velocidade = veiculo.velocidades[index];
        const via = vias[index];
        road.textContent = via;
        vehicle.textContent = veiculo.nome;

        const min = velocidade - 20 < 10 ? 10 : velocidade - 20;
        const max = velocidade + 20 > 120 ? 120 : velocidade + 20;
        const questions = randNumList(min, max, 5, 4, [velocidade]);
        shuffle(questions);
        for (var i = 0; i < questions.length; i++) {
            ansButtons[i].textContent = questions[i];
        }
    }

    // https://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }

    // https://stackoverflow.com/a/8904785
    // with a slight change to create the while loop so it creates an array
    // .. that is distinct
    function randNumList(min, max, step, numberOfElements, fillArray) {
        var delta,
            range,
            rand;
        var list = [...fillArray];
        while (list.length < numberOfElements) {
            if (arguments.length < 2) {
                max = min;
                min = 0;
            }
            if (!step) {
                step = 1;
            }
            delta = max - min;
            range = delta / step;
            rand = Math.random();
            rand *= range;
            rand = Math.floor(rand);
            rand *= step;
            rand += min;
            if (list.indexOf(rand) == -1) {
                list[list.length] = rand;
            }
        }
        return list;
    }
}