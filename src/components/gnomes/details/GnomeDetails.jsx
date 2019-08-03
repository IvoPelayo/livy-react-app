import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import { TAB_TYPE } from './constants/constants.tabTypes';
import gnomeDetailsPageTeardown from './redux/details.redux.pageTeardown';
import gnomesDetailsInitData from './redux/details.redux.initData';
import { bindActionCreatorsExt } from './../../../redux/utils/utils.redux.bindActionCreatorsExt';
import { pageTeardown } from './../../shared/redux/shared.redux.pageTeardown';
import Grid from '../../shared/grid/Grid';
import { Input, Label } from 'reactstrap';
import Avatar from 'react-avatar';

class GnomeDetails extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    professions: PropTypes.array.isRequired,
    age: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    hair_color: PropTypes.string.isRequired,
    friends: PropTypes.array,  
    thumbnail: PropTypes.string,
    actions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  static defaultProps = {
    friends: [],
  };

  constructor(props){
    super(props);
    this.state = {
      activeTabKey: TAB_TYPE.GNOME_INFO,
    };
  }

  componentDidMount() {
    this.props.actions.gnomesDetailsInitData(parseInt(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.actions.gnomeDetailsPageTeardown();
    this.props.actions.pageTeardown();
  }

  getNavItem = (eventKey, navTitle) => {
    return (
      <NavItem eventKey={eventKey}>
        {navTitle}
      </NavItem>
    );
  }

  handleTabSelection = (activeTabKey) => {
    this.setState({ activeTabKey });
  };

  render() {
    const { name, age, thumbnail, weight, height, hair_color, friends, professions } = this.props;

    return(
        <Tab.Container
          id="details-tabs"
          activeKey={this.state.activeTabKey}
          onSelect={key => this.handleTabSelection(key)}
        >
          <Row>
            <Col sm={12} className="fixed-element-wrapper heading">
              <Nav bsStyle="tabs" className="bbna-nav-tabs">
                {this.getNavItem(
                  TAB_TYPE.GNOME_INFO, 'About me',
                )}
                {this.getNavItem(
                  TAB_TYPE.GNOME_FRIENDS, 'Friends',
                )}
              </Nav>
            </Col>
            <Col sm={12}>
              <Tab.Content animation={false}>
                <Tab.Pane eventKey={TAB_TYPE.GNOME_INFO}>
                  <div className="container-fluid">
                    <div className="col-sm-12">
                      <Row>
                        <Avatar src={thumbnail} size="170" />
                      </Row>
                      <Label>Name</Label>
                      <Input value={name} readOnly></Input>
                      <Label>Hair color</Label>
                      <Input value={hair_color} readOnly></Input>
                      <Label>Age</Label>
                      <Input value={age} readOnly></Input>
                      <Label>Height</Label>
                      <Input value={height} readOnly></Input>
                      <Label>Weight</Label>
                      <Input value={weight} readOnly></Input>
                      <Label>Professions: {professions.join(',')}</Label>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey={TAB_TYPE.GNOME_FRIENDS}>
                  <div className="container-fluid">
                    <div className="col-sm-12">
                    <Grid 
                      items={friends}
                      columns={[
                        {
                          id: '',
                          fieldType: 'image',
                          name: 'thumbnail',
                        },
                        {
                          id: 'name',
                          fieldType: 'string',
                          name: 'name',
                        }]}
                    />
                    </div>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
    );
  }
}

function mapStateToProps(state) {
  const { gnomeDetails } = state.gnomes;
	return ({
	  id: gnomeDetails.id,
    name: gnomeDetails.name,
    professions: gnomeDetails.professions,
    thumbnail: gnomeDetails.thumbnail,
    age: gnomeDetails.age,
    weight: gnomeDetails.weight,
    height: gnomeDetails.height,
    hair_color: gnomeDetails.hair_color,
    friends: gnomeDetails.friends,
	});
  }
  
  function mapDispatchToProps(dispatch) {
	return ({
	  actions: bindActionCreatorsExt(
		{
		  ...gnomesDetailsInitData,
      ...gnomeDetailsPageTeardown,
      ...pageTeardown,
		}, dispatch),
	});
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(GnomeDetails);
