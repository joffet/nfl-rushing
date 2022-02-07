import React from "react"
import PropTypes from "prop-types"
import './NflRushing.css';
import { CSVLink, CSVDownload } from "react-csv";

import { Button, Container, Modal, Table } from 'react-bootstrap';

class NflRushing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      sortColumn: "Player",
      sortDescending: true,
      nameFilterArray: [],
      showPlayerSelectModal: false,
    }
    this.attOrderArray = ["Player", "Team", "Pos", "Att_per_game", "Att", "Yds", "Avg", "Yds_per_game", "TD", "Lng", "Lng_with_touchdown", "First", "First_percentage", "Twenty_plus", "Forty_plus", "FUM"];
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
        return "Longest Rush"; break;
      case "Lng_with_touchdown":
        return "Longest Rush included a touchdown"; break;
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
    let displayArray = [];
    for (let index = 0; index < this.attOrderArray.length; index++) {
      const attName = this.attOrderArray[index];
      let title = null;
      if ( ["Player","Yds","Lng","TD"].includes(attName)) {
        const variant = attName === this.state.sortColumn ? "success" : "info";
        title = <Button variant={variant} data={attName} onClick={() => this.handleTitleClick(attName)} >{ this.getLabel( attName ) }</Button>
      } else {
        title = this.getLabel( attName )
      }
      displayArray.push( <th key={ this.getKey() }>{ title }</th> )
    }
    return displayArray
  }

  getDataRow = (dataRow) => {
    const dataRowArray = Object.values(dataRow).slice(1, this.attOrderArray.length + 1);
    return dataRowArray.map( dataPoint => <td key={ this.getKey() }>{ dataPoint === true ? "Yes" : dataPoint }</td> );
  }

  getDataBody = () => {
    const { nameFilterArray, dataArray } = this.state;
    if ( nameFilterArray.length === 0 ) return dataArray.map( dataRow => <tr key={ this.getKey() }>{ this.getDataRow( dataRow ) }</tr> );
    const filteredDataArray = dataArray.filter( e => nameFilterArray.includes( e.Player ));
    return filteredDataArray.map( dataRow => <tr key={ this.getKey() }>{ this.getDataRow( dataRow ) }</tr> );
  }

  handleTitleClick = (attName) => {
    let sortDescending = true;
    if ( attName === this.state.sortColumn ) {
      sortDescending = !this.state.sortDescending;
    } else if ( attName === "Player" ) {
      sortDescending = false
    }

    let newDataArray = [];
    if ( sortDescending ) {
      newDataArray = this.state.dataArray.sort( (a,b) => a[attName] < b[attName] ? 1 : -1 );
    } else {
      newDataArray = this.state.dataArray.sort( (a,b) => a[attName] > b[attName] ? 1 : -1 );
    }
    this.setState({ dataArray: newDataArray, sortColumn: attName, sortDescending });
  }

  getPlayerSelectButtons = () => {
    let displayArray = [];
    for (let index = 0; index < this.state.dataArray.length; index++) {
      const name = this.state.dataArray[index]["Player"];
      const variant = this.state.nameFilterArray.includes(name) ? "success" : "light";
      displayArray.push(<Button key={name} className="filter-btn" variant={variant} onClick={ () => this.handleNameFilterClick(name) }>{name}</Button>)
    }
    return (
      <div className="filter-btn-container">
        {displayArray}
      </div>
    )
  }

  handleNameFilterClick = (name) => {
    const { nameFilterArray } = this.state;
    if ( nameFilterArray.includes(name)) {
      this.setState({ nameFilterArray: nameFilterArray.filter( e => e !== name ) })
    } else {
      let newArray = nameFilterArray.slice();
      newArray.push(name);
      console.log(newArray);
      this.setState({ nameFilterArray: newArray })
    }
  }

  getDownloadData = () => {
    const { nameFilterArray, dataArray } = this.state;
    if ( nameFilterArray.length === 0 ) return dataArray;
    return dataArray.filter( e => nameFilterArray.includes( e.Player ));
  }

  render () {
    return (
      <React.Fragment>
        <Container className="centered-row top-row" fluid>
          <Button variant="warning" disabled={true} >NFL Rushing App by Jason Offet</Button>
          <Button variant="light" disabled={true} >Players Loaded {this.state.dataArray.length}</Button>
          <Button variant="light" onClick={ () => this.setState({ showPlayerSelectModal: true })} >Select Players to Filter Chart</Button>
          <Button variant="light" onClick={ () => this.setState({ nameFilterArray: [] })} >Clear Filter</Button>
          <CSVLink
            data={this.getDownloadData()}
            filename={"nfl-rushing.csv"}
            className="btn btn-primary"
            target="_blank"
          >
            Download Current Data
          </CSVLink>;
        </Container>
        <Container fluid>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>{ this.getHeaderRow()}</tr>
            </thead>
            <tbody>{ this.getDataBody() }</tbody>
          </Table>
        </Container>

        <Modal
          size="lg"
          show={this.state.showPlayerSelectModal}
          onHide={() => this.setState({ showPlayerSelectModal: false })}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title className="centered-row">
              Select Players to include in filtered view
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{ this.getPlayerSelectButtons() }</Modal.Body>
        </Modal>    

      </React.Fragment>
    );
  }
}

NflRushing.propTypes = {
  dataObject: PropTypes.object
};
export default NflRushing
