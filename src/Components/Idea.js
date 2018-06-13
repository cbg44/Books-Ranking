import React, { Component } from 'react'
import MdDelete from 'react-icons/lib/md/delete'
import MdEdit from 'react-icons/lib/md/edit'
import MdSave from 'react-icons/lib/md/save'


class Idea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      editObj: {
        name: this.props.book && this.props.book.name,
        author: this.props.book && this.props.book.author.name
      }
    }
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.save = this.save.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderUI = this.renderUI.bind(this);
  }
  edit() {
    this.setState({
      editing: true
    });
  }

  delete = (e, ind) => {
    this.props.onDelete(this.props.index)
  }

  save(e) {
    e.preventDefault();
    this.props.onChange(this.state.editObj, this.props.index);
    this.setState({
      editing: false
    })
  }

  editingState = (val) => {
    let cloneObj = this.state.editObj;
    console.log(val)
    cloneObj[val.target.name] = val.target.value;
    this.setState({
      editObj: cloneObj
    })
  }

  renderForm() {
    return (
      <div>
        <form onSubmit={this.save}>
          <textarea placeholder="Book Name" name="name" value={this.state.editObj['name']} onChange={(ev) => this.editingState(ev)} />
          <textarea placeholder="Author Name" name="author" value={this.state.editObj['author']} onChange={(ev) => this.editingState(ev)} />
          <button><MdSave onClick={this.save} /></button>
        </form>
      </div>
    )
  }

  renderUI() {
    return (
      <div className='idea'>
        <div>{this.props.children}</div>
        <span>
          <button className="btn btn-primary" style={{ marginRight: 7 + 'px' }} onClick={this.edit}><MdEdit /></button>
          <button className="btn btn-primary" onClick={this.delete}><MdDelete /></button>
        </span>
      </div>
    );
  }


  render() {
    return (
      this.state.editing ? this.renderForm() : this.renderUI()
    )
  }
}
export default Idea