import React from "react"
import PropTypes from "prop-types"
class NflRushing extends React.Component {
  
  render () {
    console.log(this.props.data)
    return (
      <React.Fragment>
        Greeting:
      </React.Fragment>
    );
  }
}

NflRushing.propTypes = {
  data: PropTypes.object
};
export default NflRushing
