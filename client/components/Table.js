import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {withRouter, Link} from 'react-router-dom'
import {} from '../store'


class Table extends Component{
  constructor(props){
    super(props)
    this.state ={
      enableTable: false,
      enableField: false,
      tableName: '',
      columnName : '',
      attributes: {}
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


  // Make axios post with body : {2:{type: "asd", default: "zdf", allowNull: "true"}, tableName:"asdf"}
  onAddField(evt){
    evt.preventDefault();
    console.log("from add field", evt.target);
    let columnName = this.state.columnName;
    let body = {tableName : this.state.tableName, [columnName] : this.state.attributes};
    console.log('sent body: ', body);
    axios.post('/api/tables', body);
  }

  handleChange(evt){
    if (evt.target.name === 'tableName' || evt.target.name ==='columnName'){
    this.setState({[evt.target.name]: evt.target.value});
    } else {
      this.setState({
        attributes : Object.assign({}, this.state.attributes, {[evt.target.name] : evt.target.value})
      })
    }
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
          <label>Type:<input type="text" name="type" onChange= {this.handleChange} /></label>
          <label>default:<input type="text" name="defaultValue"  onChange= {this.handleChange} /></label>
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
