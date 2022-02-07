import React from "react"
import PropTypes from "prop-types"
// import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Table } from 'react-bootstrap';

class NflRushing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      sortColumn: "Player",
      nameFilterArray: [],
    }
    this.attOrderArray = ["Player", "Team", "Pos", "Att_per_game", "Att", "Yds", "Avg", "Yds_per_game", "TD", "Lng", "First", "First_percentage", "Twenty_plus", "Forty_plus", "FUM"];
    this.keyVar = 0;
  }

  componentDidMount = () => {
    this.setState({ dataArray: this.props.dataObject.dataArray })
  }
  
  getKey = () => { this.keyVar ++; return this.keyVar }

  getLabel = (attName) => {
    switch(attName) {
      case "Player":
        return "Player's name"; break;
      case "Team":
        return "Player's team abbreviation"; break;
      case "Pos":
        return "Player's postion"; break;
      case "Att_per_game":
        return "Rushing Attempts Per Game Average"; break;
      case "Att":
        return "Rushing Attempts"; break;
      case "Yds":
        return "Total Rushing Yards"; break;
      case "Avg":
        return "Rushing Average Yards Per Attempt"; break;
      case "Yds_per_game":
        return "Rushing Yards Per Game"; break;
      case "TD":
        return "Total Rushing Touchdowns"; break;
      case "Lng":
        return "Longest Rush -- a `T` represents a touchdown occurred"; break;
      case "First":
        return "Rushing First Downs"; break;
      case "First_percentage":
        return "Rushing First Down Percentage"; break;
      case "Twenty_plus":
        return "Rushing 20+ Yards Each"; break;
      case "Forty_plus":
        return "Rushing 40+ Yards Each"; break;
      case "FUM":
        return "Rushing Fumbles"; break;
      default:
        return "unknown"
    }
  }

  getHeaderRow = () => {
    return this.attOrderArray.map( attName => <th key={ this.attOrderArray.indexOf(attName)}>{ this.getLabel( attName )}</th> )
  }

  getDataRow = (dataRow) => {
    const dataRowArray = Object.values(dataRow).slice(1, this.attOrderArray.length + 1);
    return dataRowArray.map( dataPoint => <td key={ this.getKey() }>{ dataPoint }</td> );
  }

  getDataBody = () => {
    return this.state.dataArray.map( dataRow => <tr key={ this.getKey() }>{ this.getDataRow( dataRow ) }</tr> )
  }

  render () {
    return (
      <React.Fragment>
        <Container fluid>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>{ this.getHeaderRow()}</tr>
            </thead>
            <tbody>{ this.getDataBody() }</tbody>
          </Table>
        </Container>
      </React.Fragment>
    );
  }
}

NflRushing.propTypes = {
  dataObject: PropTypes.object
};
export default NflRushing
