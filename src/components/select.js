class FlavorForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: 'All'};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('Your favorite flavor is: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
           CATEGORIES:
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="all">ALL</option>
              <option value="shorts">SHORT FILMS</option>
              <option value="docs">DOCUMENTARIES</option>
              <option value="full">FULL MOVIES</option>
            </select>
          </label>
         
        </form>
      );
    }
  }