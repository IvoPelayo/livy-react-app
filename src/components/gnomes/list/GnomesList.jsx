import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreatorsExt } from '../../../redux/utils/utils.redux.bindActionCreatorsExt';
import gnomesListInitData from './redux/list.redux.initData';
import filterGnomeList from './redux/list.redux.filters';
import resetGnomeListFilters from './redux/list.redux.filters';
import gnomesListPageTeardown from './redux/list.redux.pageTeardown';
import GridFilters from './filters/GridFilters';
import { pageTeardown } from './../../shared/redux/shared.redux.pageTeardown';
import Grid from '../../shared/grid/Grid';
import { Button } from 'reactstrap';
import { faFilter, faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';

class GnomesList extends Component{

	static propTypes = {
		actions: PropTypes.object.isRequired,
		items: PropTypes.array,
		columns: PropTypes.array,
		filters: PropTypes.object,
		history: PropTypes.object.isRequired,
		populationInfo: PropTypes.object.isRequired,
	};

	static defaultProps = {
		items: [],
		columns: [],
		filters: {},
	};

	constructor(props){
		super(props);

		this.state = {
			...props,
			showFilters: false,
		}
	}

	componentWillMount() {
		this.props.actions.gnomesListInitData();
	}

	componentWillUnmount() {
		this.props.actions.gnomesListPageTeardown();
		this.props.actions.pageTeardown();
	}

	handleRowClick = (gnomeId) => {
		this.props.history.push('/gnome/' + gnomeId);
	}

	handleClearFilters = () => {
		this.setState({ showClear: false });
		this.props.actions.resetGnomeListFilters();
	}

	handleFilterChange = (target, value) => {
		let { filters } = this.state;
		filters[target] = value;
		this.setState({filters, showClear: true });
		this.props.actions.filterGnomeList();
	}

	render() {
		const { columns, items, filters, populationInfo } = this.props;
		return (
			<div>
				{!this.state.showFilters &&
					<Button onClick={() => this.setState({showFilters:true})}>
						Filters 
						<FontAwesomeIcon icon={faFilter} />
					</Button>
				}
				{this.state.showFilters &&
				<React.Fragment>
					<fieldset>
						<GridFilters 
							onFilterChange={this.handleFilterChange}
							onClear={this.handleClearFilters}
							filters={filters}
							populationInfo={populationInfo}
							showClear={this.state.showClear}
						/>
					</fieldset>
					<Button onClick={() => this.setState({showFilters:false})}>
						Hide
					</Button>
					{this.state.showClear &&
					<Button onClick={this.handleClearFilters}>
						<FontAwesomeIcon icon={faSync} />
					</Button>
					}
				</React.Fragment>
				}
				<Grid 
					items={items}
					columns={columns}
					onRowClick={this.handleRowClick}
					paginate={true}
				/>
			</div>
		)
	}
};

function mapStateToProps(state) {
	const { gnomesList } = state.gnomes;
	return ({
	  items: gnomesList.items,
	  filters: gnomesList.filters,
	  columns: gnomesList.columns,
	  populationInfo: gnomesList.populationInfo,
	  showClear: gnomesList.showClear,
	});
  }
  
  function mapDispatchToProps(dispatch) {
	return ({
	  actions: bindActionCreatorsExt(
		{
		  ...gnomesListInitData,
		  ...filterGnomeList,
  		  ...resetGnomeListFilters,
		  ...gnomesListPageTeardown,
		  ...pageTeardown,
		}, dispatch),
	});
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GnomesList));