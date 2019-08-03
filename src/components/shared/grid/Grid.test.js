import { describe } from 'riteway';
import render from 'riteway/render-component';
import React from 'react';
import GnomesApi from '../../../apis/apis.gnomes';
import Grid from './Grid';

describe('Grid Component', async assert => {
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
        const $ = render(<Grid items={state.items} columns={state.columns} />);
    // Assert
        assert({
            given: 'an API result',
            should: 'Render a grid with data',
            actual: $('.table').find('tr').length,
            expected: 3,
        });
});