var React = require('react');

var Animal = React.createClass({
  _audioUrl: function() {
    var idString = this.props.animalId.toString();
    var folderCharCount = idString.length % 4;
    var folderId = idString.substr(0, folderCharCount);

    return "http://animalrecordings.org/Audio/" +
           folderId + "/" +
           idString + ".mp3";
  },

  render: function() {
    return(
      <audio ref='audio' src={ this._audioUrl() } autoPlay={ false }></audio>
    );
  }
});

module.exports = Animal;
