var React = require('react');
var AnimalAudioscape = require('./components/animal_audioscape');

mountPoint = document.querySelector('#animal-audioscape');
React.render(<AnimalAudioscape />, mountPoint);
