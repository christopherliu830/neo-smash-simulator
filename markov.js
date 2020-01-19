var MarkovChain = require('markovchain');
const random = require('random');
var data = require('./data');

var init = false;
var simulators = new Array();

exports.generateMessage = () => {
  if (!init) {
    parseData();
    init = true;
  }
  let num = random.int(min = 0, max = data.length);
  if (data[num] != null) {
    var person = data[num];
    return {
      name: person.name, 
      message:simulators[num].process()//() => random.float(min=0, max=1) < 0.3).process()
    };
  }
  return {
    name: 'corrupted',
    message: 'corrupted'
  }
};

const parseData = () => {
  data.forEach((p) => {
    console.log(p.name);
    let markov = new MarkovChain();
    simulators.push(markov);
    p.messages.forEach((msg) => markov.parse(msg));
  });
};
