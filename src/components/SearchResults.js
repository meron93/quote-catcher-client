import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {reduxForm, Field, SubmissionError, focus, reset} from 'redux-form';
import './SearchResults.css';
import IndividualQuotes from './IndividualQuotes';
import {deleteQuote} from '../actions/index';
import {updateThemeToAddBoxId} from '../actions/index';
import {deleteQuoteFromSearchedQuotes} from '../actions/index';
import {addTheme} from '../actions/index';
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';

let themes = ["Relationships", "Finances", "Identity", "Fear", "Career", "Motivation", "Adventure", "Spirituality", "Loss", "Failure", "Happiness", "Discipline"];
export class SearchResults extends React.Component {
  handleDeleteClick(quote) {
    return this.props
    .dispatch(deleteQuote(quote._id))
  }

  handleAddThemeClick(quote) {
    return this.props
    .dispatch(updateThemeToAddBoxId(quote._id))
  }

  handleThemeSubmit(values) {
    console.log("inside themsubmnbit")
    console.log("themesToAdd", values)
    //return this.props
    //.dispatch(addTheme(themesToAdd, quote._id))
  }

  render() {
    let {open} = this.state || {};
    let searchedQuotes = [];
    let themeCounter;
    let themesToDisplay;
    let addQuoteThemes;
    if (this.props.searchedQuotes.length > 0) {
      this.props.searchedQuotes.map((quote, index) => {
      themeCounter = 0;
      themesToDisplay = [];
      addQuoteThemes = [];
      // const renderMultiselect = 
      //   <Multiselect 
      //     onBlur={() => input.onBlur()}
      //     value={input.value || []}
      //     disabled={!(this.props.isOpen && this.props.AddThemeId === quote._id)}
      //     className="selectBox"
      //     open={this.props.isOpen && this.props.AddThemeId === quote._id}
      //     data={themesToDisplay}
      //   />
      addQuoteThemes = themes.filter(theme => {
        return !(quote.theme.includes(theme))
      });
      quote.theme.map((theme, index) => {
        if (themeCounter + 1 === quote.theme.length) {
          themesToDisplay.push(<h3 key={index} className="addQuoteDisplayThemes">{theme}</h3>)
        } else {
          themesToDisplay.push(<h3 key={index} className="addQuoteDisplayThemes">{theme}<span>,&nbsp;</span></h3>)
        }
        themeCounter += 1
      });
      searchedQuotes.push( 
        <section key={quote._id} className="quote-expanded">
          <h2 className="quoteText"><span>"</span>{quote.quoteString}<span>"</span></h2>
          <h4 className="searchResultsAuthor"><span>- </span>{quote.author}</h4>
          <div>
            <div>
              <button onClick={() => this.handleAddThemeClick(quote)} className='addQuoteButton'>
                  ><i className='fa fa-plus fa-fw' aria-hidden='true'></i> {'Theme'}
              </button>
            </div> 
             <form onSubmit={this.props.handleSubmit(values => 
                this.handleThemeSubmit(values)
              )}>
              <Field
                {...this.props.input}
                className="selectBox"
                // name="themesToAdd"
                valueField={this.props.valueField}
                textField={this.props.textField}
                onBlur={() => this.props.onBlur()}
                component={Multiselect}
                defaultValue={[]}
                open={this.props.isOpen && this.props.AddThemeId === quote._id}
                disabled={!(this.props.isOpen && this.props.AddThemeId === quote._id)}
                data={addQuoteThemes}
              />
              <button 
                type="submit" 
                //disabled={this.props.pristine || this.props.submitting}
                >
                Submit
              </button>
             </form>
            <h3>Theme(s): {themesToDisplay}
            </h3>
          </div>
          <div>
            <button onClick={() =>
              this.handleDeleteClick(quote)}
              ><i className='fa fa-trash-o' aria-hidden='true'></i>
            </button>
          </div>
        </section>
      )
      });
      return (
        <div>
          {searchedQuotes} 
        </div>
      );
    }
    return (
     <div> 
     </div>
    );
  }
}

const mapStateToProps = state => ({
  isOpen: state.quoteCatcherReducer.isOpen,
  AddThemeId: state.quoteCatcherReducer.quotesToDisplayAddThemeId,
  searchedQuotes: state.quoteCatcherReducer.searchedQuotes
});

const SearchResultsConnect = connect(mapStateToProps)(SearchResults);

export default reduxForm({
  form: 'searchResults',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('searchResults', Object.keys(errors)[0]))
})(SearchResultsConnect);


