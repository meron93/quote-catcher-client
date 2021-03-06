import React from 'react';
import {connect} from 'react-redux';
import './AddQuoteDisplay.css';
import Loader from 'react-loader-spinner';

export class AddQuoteDisplay extends React.Component {
  render() {
    if (this.props.isFetching) {
      return (
        <div className="addQuoteSpinner">
          <Loader className="addQuoteSpinner" type="TailSpin" height={100} width={100}/>
        </div>
      )
    } 
    if (this.props.addQuoteDisplay.length !== 0) {
      let themeCounter = 0; 
      let themesToDisplay;
      if (this.props.addQuoteDisplay.theme === undefined) {
          themesToDisplay = "None";
      } else {
        themesToDisplay = [];
        this.props.addQuoteDisplay.theme.map((theme, index) => {
          if (themeCounter + 1 === this.props.addQuoteDisplay.theme.length) {
            themesToDisplay.push(<div key={index} className="addQuoteDisplayThemes">{theme}</div>)
          } else {
            themesToDisplay.push(<div key={index} className="addQuoteDisplayThemes">{theme}<span>,&nbsp;</span></div>)
          }
          return themeCounter += 1
        });
      }
      return (
        <section className="addQuoteSuccessSection">
          <h2 className="quoteText"><span>&ldquo;</span>{this.props.addQuoteDisplay.quoteString}<span>&rdquo;</span></h2>
          <h4 className="searchResultsAuthor"><span>- </span>{this.props.addQuoteDisplay.author}</h4>
          <div>
            <h3>Theme(s): {themesToDisplay}</h3>
          </div>
        </section>
      )
    }
    return (
      <div>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  isFetching: state.quoteCatcherReducer.isFetching,
  addQuoteDisplay: state.quoteCatcherReducer.addQuoteDisplay
});

export default connect(mapStateToProps)(AddQuoteDisplay);