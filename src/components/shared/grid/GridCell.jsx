import React from 'react';
import PropTypes from 'prop-types';
import { trim } from '../../shared/utils/utils.numeric';
import Avatar from 'react-avatar';

class GridCell extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    column: PropTypes.object.isRequired,
  };

  getCellContent(item, column){
      let content;
      switch(column.fieldType){
          case 'image': content = (<Avatar src={item[column.name]} size="100" round={true} />); break;
          case 'float': content = trim(item[column.name], 2) + column.unit; break;
          default: content = item[column.name] + column.unit; break;
      }
      return content;
  }

  render(){
    return(
      <React.Fragment>
        <td>
          {this.getCellContent(this.props.item, this.props.column)}
        </td>
      </React.Fragment>
    );
  }
}

export default GridCell;