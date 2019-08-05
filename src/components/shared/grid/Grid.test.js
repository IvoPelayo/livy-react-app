import React from 'react';
import GnomesApi from '../../../apis/apis.gnomes';
import Grid from './Grid';
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

test("Grid component", () => {
    // Arrange
    const state = {
        items: [
            {
              'id':0,
              'name':'Tobus Quickwhistle',
              'thumbnail':'',
              'age':306,
              'weight':39.065952,
              'height':107.75835,
              'hair_color':'Pink',
              'professions':['Metalworker','Woodcarver','Stonecarver',' Tinker','Tailor','Potter'],
              'friends':[]
            },
            {
              'id':1,
              'name':'Fizkin Voidbuster',
              'thumbnail':'',
              'age':288,
              'weight':35.279167,
              'height':110.43628,
              'hair_color':'Green',
              'professions':['Brewer','Medic','Prospector','Gemcutter','Mason','Tailor'],
              'friends':[]
            }],
        columns: GnomesApi.getGridColumns(),
    };

    // Act
    const wrapper = shallow(<Grid items={state.items} columns={state.columns} />);

    expect(wrapper.find('tr')).toHaveLength(3); //one for headers and two for table results
});