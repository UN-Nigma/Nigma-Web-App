import React from 'react';
import QuestionExplorer from './question-explorer/QuestionExplorer';
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
