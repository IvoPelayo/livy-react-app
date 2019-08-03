import React from 'react';
import PropTypes from 'prop-types';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import "bootstrap-slider/dist/css/bootstrap-slider.css";
import {
    Form,
    FormGroup,
    Input,
    Row,
    Label,
  } from 'reactstrap';

class GridFilters extends React.Component {

    static propTypes = {
        filters: PropTypes.object.isRequired,
        populationInfo: PropTypes.object.isRequired,
        onFilterChange: PropTypes.func.isRequired,
        onClear: PropTypes.func.isRequired,
    };

    render() {
        const { partialDescription, profession, orderBy, orderByDirection , age, weight, height} = this.props.filters;
        const { maxAge, minAge, maxWeight, minWeight, maxHeight, minHeight, professions } = this.props.populationInfo;
        return(
            <React.Fragment>
                <Row>
                    <Form>
                        <FormGroup>
                            <Input 
                                id="partialDescription"
                                type="text"
                                placeholder="Search"
                                value={partialDescription}
                                onChange={(event) => this.props.onFilterChange('partialDescription', event.target.value)} 
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Profession</Label>
                            <Input
                                id="professions"
                                type="select"
                                value={profession}
                                onChange={(event) => this.props.onFilterChange('professions', event.target.value)}
                            >
                                <option key={'null'} value={null}>Select</option>
                                {professions.map((profession, i) =>
                                    (<option key={i} value={profession}>{profession}</option>))}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Order By</Label>
                            <Input
                                id="orderBy"
                                type="select"
                                value={orderBy}
                                onChange={(event) => this.props.onFilterChange('orderBy', event.target.value)}
                            >
                                <option key={'null'} value={null}>Select</option>
                                <option value="id">Id</option>
                                <option value="name">Name</option>
                                <option value="age">Age</option>
                                <option value="weight">Weight</option>
                                <option value="height">Height</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Profession</Label>
                            <Input
                                id="orderByDirection"
                                type="select"
                                value={orderByDirection}
                                onChange={(event) => this.props.onFilterChange('profession', event.target.value)}
                            >
                                <option key={'null'} value={null}>Select</option>
                                <option value="asc">1</option>
                                <option value="desc">2</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Age</Label>
                            <ReactBootstrapSlider
                                id="age"
                                value={age? age : maxAge}
                                slideStop={(event) => this.props.onFilterChange('age', event.target.value)}
                                step={1}
                                max={maxAge}
                                min={minAge}
                                orientation="horizontal" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Weight</Label>
                            <ReactBootstrapSlider
                                id="weight"
                                value={weight? weight : maxWeight}
                                slideStop={(event) => this.props.onFilterChange('weight', event.target.value)}
                                step={1}
                                max={maxWeight}
                                min={minWeight}
                                orientation="horizontal" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Height</Label>
                            <ReactBootstrapSlider
                                id="height"
                                value={height? height : maxHeight}
                                slideStop={(event) => this.props.onFilterChange('height', event.target.value)}
                                step={1}
                                max={maxHeight}
                                min={minHeight}
                                orientation="horizontal" />
                        </FormGroup>
                    </Form>
                </Row>
            </React.Fragment>
           
            );
    }
} 


export default GridFilters;