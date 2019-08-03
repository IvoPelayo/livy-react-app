import React from 'react';
import PropTypes from 'prop-types';
import GridCell from './GridCell';
import { capitalize } from '../utils/utils.string';
import { Table, Pagination } from 'react-bootstrap';
import { round } from '../utils/utils.numeric';

class Grid extends React.Component {
    static propTypes = {
        items: PropTypes.array,
        columns: PropTypes.array,
        onRowClick: PropTypes.func,
        paginate: PropTypes.bool,
    };

    static defaultProps = {
        onRowClick: () => {},
        columns: [],
        items: [],
        paginate: false,
    };

    constructor(props){
        super(props);

        this.state = {
            currentPage: 1,
            pageCount: 0,
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({ pageCount: round(nextProps.items.length / 10, 'top') });
    }

    handleNextPage = () => {
        if(this.state.currentPage < this.state.pageCount) {
            this.setState({ currentPage: this.state.currentPage + 1 });
        }
    }

    handlePrevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({ currentPage: this.state.currentPage - 1 });
        }
        
    }

    getCurrentPageItems = () =>{
        if(this.props.paginate){
            return this.props.items.slice((this.state.currentPage - 1) * 10, this.state.currentPage * 10);
        }
        return this.props.items;
    }

    render(){
        return(
            <React.Fragment>
                <Table bordered striped hover>
                    <thead>
                        <tr>
                            {this.props.columns.map((col, i) => (<th key={i}>{capitalize(col.id)}</th>))}
                        </tr>
                    </thead>
                    <tbody>
                    {this.getCurrentPageItems().map(gnome => {
                        return (
                            <tr key={gnome.id} onClick={() => this.props.onRowClick(gnome.id)}>
                                {this.props.columns.map((col, i) => (<GridCell key={i} column={col} item={gnome} />))}
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
                {this.props.paginate &&
                <Pagination size="lg">
                    <Pagination.Prev disabled={this.state.currentPage === 1} onClick={() => this.handlePrevPage()} />
                    <Pagination.Item active>{this.state.currentPage}</Pagination.Item>
                    <Pagination.Next disabled={this.state.currentPage === this.state.pageCount } onClick={() => this.handleNextPage()} />
                </Pagination>
                }
            </React.Fragment>
        );
    }
}

export default Grid;