const MetadataConstants = require('../../constants/space/metadata-constants');
var Dispatcher = require('../../dispatchers/dispatcher');

var MetadataActions = {
  setMetadata(metadata) {
    Dispatcher.dispatch({
      type: MetadataConstants.SET_METADATA,
      data: metadata,
    });
  }
}

module.exports = MetadataActions;
