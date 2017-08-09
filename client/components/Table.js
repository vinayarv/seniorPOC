import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {} from '../store'


class Table extends Component{
  constructor(props){
    super(props)
    this.state ={
      enableTable: false,
      enableField: false,
      tableName: '',
      fields: []
    }

    this.handleTable = this.handleTable.bind(this);
    this.onAddTable = this.onAddTable.bind(this);
    this.onAddField = this.onAddField.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){

  }

  handleTable(evt){
    evt.preventDefault();
    this.setState({enableTable: true});
  }

  onAddTable(evt){
    evt.preventDefault();
    this.setState({enableField: true, enableTable: false});
  }

  onAddField(evt){
    evt.preventDefault();
    console.log("from add field", target);
  }

  handleChange(evt){
    this.setState({tableName: evt.target.value});
  }

  render(){
    console.log("After addTable", this.state);
    return (
      <div>
        <button type="button" onClick={this.handleTable}> Add Table </button>
        <button type="button" disabled={!this.state.enableField}> Add Field </button>
        <button type="button">Save </button>
        { this.state.enableTable
          ?
          <form onSubmit={this.onAddTable}>
          <label>Enter table name:<input type="text" name="tableName" value={this.state.tableName} onChange= {this.handleChange} /></label>
          <input type="submit" />
          </form>
          : ''
        }
        {
          this.state.enableField
          ?
          <form onSubmit={this.onAddField}>
          <label>Name:<input type="text" name="columnName"  onChange= {this.handleChange} /></label>
          <label>Type:<input type="text" name="columnType" onChange= {this.handleChange} /></label>
          <label>default:<input type="text" name="default"  onChange= {this.handleChange} /></label>
          <label>allowNull:
            <input type="radio" name="allowNull" value="true"  onChange= {this.handleChange} />true
            <input type="radio" name="allowNull" value="false"  onChange= {this.handleChange} />false
          </label>
          <input type="submit" />
          </form>
        : ''
        }
      </div>
    );
  }
}

// const mapStateToProps = () => ({});

// const mapDispatchToProps = (disptach) => {
//   return {

//   }
// }

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Table));

export default Table;
