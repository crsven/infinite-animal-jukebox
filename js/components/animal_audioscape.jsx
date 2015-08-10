var React = require('react');
var Animal = require('./animal');

var AnimalAudioscape = React.createClass({
  _randFrom(min, max) {
    return (Math.random() * (max - min) + min);
  },

  _generateAnimalId: function() {
    return Math.floor(this._randFrom(10000, 130000));
  },

  getInitialState: function() {
    var animalIds = [];
    while(animalIds.length < 5) {
      var newAnimal = this._generateAnimalId();
      if(animalIds.indexOf(newAnimal) < 0) {
        animalIds.push(newAnimal);
      }
    };
    return {
      animalIds: animalIds
    };
  },

  componentDidMount: function() {
    this._nodesReady = 0;
    Object.keys(this.refs).forEach(function(refKey) {
      var node = React.findDOMNode(this.refs[refKey]);
      var intKey = parseInt(refKey);
      node.addEventListener('canplay', function() {
        this._nodesReady++;
        var refKeys = Object.keys(this.refs);
        if(refKeys.length <= this._nodesReady) {
          this._beginPlaying();
        }
      }.bind(this));
      node.addEventListener('ended', function() {
        this._removeAndReplace(intKey);
      }.bind(this));
      node.addEventListener('error', function() {
        this._removeAndReplace(intKey);
      }.bind(this));
    }.bind(this));
  },

  _removeAndReplace: function(refKey) {
    var animalIds = [].concat(this.state.animalIds);

    var oldIndex = animalIds.indexOf(refKey);
    animalIds.splice(oldIndex,1);

    var oldNode = React.findDOMNode(this.refs[refKey]);
    oldNode.removeEventListener('canplay');
    oldNode.removeEventListener('ended');

    var notFound = true;
    while(notFound) {
      var newAnimal = this._generateAnimalId();
      if(animalIds.indexOf(newAnimal) < 0) {
        animalIds.push(newAnimal);
        notFound = false;
      }
    }

    this.setState({
      animalIds: animalIds
    });
  },

  componentDidUpdate: function(prevProps, prevState) {
    var newAnimals = this.state.animalIds.filter(function(animal) {
      return prevState.animalIds.indexOf(animal) === -1;
    });
    newAnimals.forEach(function(animal) {
      var node = React.findDOMNode(this.refs[animal]);
      node.addEventListener('canplay', function() {
        node.currentTime = 7;
        node.play();
      });
      node.addEventListener('ended', function() {
        this._removeAndReplace(animal);
      }.bind(this));
      node.addEventListener('error', function() {
        this._removeAndReplace(animal);
      }.bind(this));
    }.bind(this));
  },

  _beginPlaying: function() {
    Object.keys(this.refs).forEach(function(refKey) {
      var node = React.findDOMNode(this.refs[refKey]);
      if(node.played.length === 0) {
        node.currentTime = 7;
        node.play();
      }
    }.bind(this));
  },

  render: function() {
    return(
      <div>
        <h1>Infinite Animals</h1>
        <p>
          An infinite jukebox of animal recordings from the
          <a href="http://macaulaylibrary.org/">Macauley Library</a>
        </p>
        <h3>Now listening to:</h3>
        {
          this.state.animalIds.map(function(animalId) {
            return <a style={{display: "block", margin: "0 0 15px"}} href={"http://macaulaylibrary.org/audio/"+animalId}>{ animalId }</a>
          })
        }
        {
          this.state.animalIds.map(function(animalId) {
            return <Animal ref={ animalId }
                           key={ animalId }
                           animalId={ animalId } />
          })
        }
      </div>
    );
  }
});

module.exports = AnimalAudioscape;
