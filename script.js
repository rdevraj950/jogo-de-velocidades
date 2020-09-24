const speeds = [
    {'nome': 'ligeiro de passageiros', 'velocidades': [ 50, 90, 100, 120]},
    {'nome': 'ligeiro de mercadorias', 'velocidades': [ 50, 80, 80, 110]}
];
const  vias = ['dentro das localidades', 'restantes vias publicas', 'via reservadas a automoveis e motociclos', 'autoestradas'];

window.onload = function(ev) {
    var velocidade;
    const form = document.getElementById('form');
    const selector = document.getElementById('selector');
    const reset = document.getElementById('reset');
    const road = document.getElementById('road');
    const vehicle = document.getElementById('vehicle');
    const correct = document.getElementById('correct');
    const incorrect = document.getElementById('incorrect');
    const incorrectText = 'Errado, resposta certa era ';

    generateQuestion();

    form.onsubmit = submit;
    form.onreset = resetForm;

    function submit(event) {
        const response = +selector.value;
        
        if (response === velocidade) {
            resetForm();
        } else {
            incorrect.removeAttribute('hidden');
            reset.removeAttribute('hidden');
            incorrect.textContent = `${incorrectText} ${velocidade}`;
        }
    
        event.preventDefault();
    }

    function resetForm() {
        incorrect.setAttribute('hidden', '');
        incorrect.textContent = '';
        correct.setAttribute('hidden', '');
        reset.setAttribute('hidden', '');
        clearSelector();
        generateQuestion();
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
        const questions = [...rand(min, max, 5, 3, velocidade), velocidade];
        shuffle(questions);
        selector.options[0] = new Option('-', 0);
        for (var i = 0; i < questions.length; i++) {
            selector.options[i+1] = new Option(questions[i]);
        }
    }

    function clearSelector() {
        for (let i = selector.options.length; i >= 0; i--) {
            selector.options.remove(i);
        }
    }

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

    function rand(min, max, step, numberOfElements, savedNum) {
        var delta,
            range,
            rand;
        var list = [];
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
            if (list.indexOf(rand) == -1 && rand !== savedNum) {
                list[list.length] = rand;
            }
        }
        return list;
    }
}