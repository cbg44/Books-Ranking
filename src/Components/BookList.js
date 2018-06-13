import React, { Component } from 'react'
import Idea from './Idea'
import MdAdd from 'react-icons/lib/md/add'
import { cloneDeep, remove } from 'lodash';

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.add = this.add.bind(this)
        this.nextID = this.nextID.bind(this)
    }

    add(txt, grp) {
        this.setState(prevState => ({
            ideas: [
                ...prevState.ideas,
                {
                    id: this.nextID(),
                    idea: txt,
                    group: grp
                }]
        }))
    }
    nextID() {
        this.uniqueId = this.uniqueId || 0
        return this.uniqueId++
    }

    componentDidMount() {
        var self = this;
        if (this.props.match && this.props.match.params && this.props.match.params.rank && !this.props.match.params.authorRank)
            fetch('https://books-ranking.herokuapp.com/bookByRank/', {
                method: 'POST', body: JSON.stringify({
                    rank: this.props.match.params.rank
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then(data => data.json())
                .then(books => this.setState({ books: books }))
                .catch(err => alert(err));
        else if (this.props.match && this.props.match.params && this.props.match.params.rank && this.props.match.params.authorRank)
            fetch('https://books-ranking.herokuapp.com/bookRankAuthor/', {
                method: 'POST', body: JSON.stringify({
                    rank: this.props.match.params.rank,
                    author_rank: this.props.match.params.authorRank
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then(data => data.json())
                .then(books => this.setState({ books: books }))
                .catch(err => alert(err));
        else
            fetch('https://books-ranking.herokuapp.com/books')
                .then(data => data.json())
                .then(books => this.setState({ books: books }))
                .catch(err => alert(err))
    }

    update(newIdea, i) {
        let cloneState = cloneDeep(this.state.books);
        cloneState.map(book => {
            if (book._id === i) {
                book.name = newIdea.name;
                book.author.name = newIdea.author
            }
        })
        this.setState({
            books: cloneState
        })
    }

    delete(id) {
        let cloneBooks = cloneDeep(this.state.books);
        remove(cloneBooks, (book) => book._id == id);
        this.setState({
            books: cloneBooks
        })
        //finish yourself- this should be called by onDelete
    }

    eachBook = (book, i) => {
        return (
            <div className="card" style={{ width: 18 + 'rem' }}>
                <div className="card-body">
                    <Idea key={'idea' + i} book={book} index={book._id} onChange={this.update} onDelete={this.delete}>
                        <h5 className="card-title">{book.name}</h5>
                        <p className="card-text">{`By: ${book.author.name}`}</p>
                        <p className="card-text">{`Rank: ${book.rank}`}</p>
                    </Idea>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="ideaList">
                {this.state.books.length > 0 ? this.state.books.map(this.eachBook) : 'Books List is Empty.'}
                <br />
                <button id="add" className="btn btn-primary" style={{ marginTop: 7 + 'px' }}>
                    <MdAdd /></button>
            </div>
        )
    }
}
export default BookList
