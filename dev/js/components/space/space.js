import React from 'react';
import QuestionExplorer from './question-explorer/QuestionExplorer';
window.MenuStore = require('../../stores/menu-store');
export default class Space extends React.Component {


  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      	<QuestionExplorer />
      </div>
    );
  }
}
