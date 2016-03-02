import React from 'react';
import TadaStore from '../stores/TadaStore';


var PreschoolCircle = React.createClass({ 

  render() {
  	var project = TadaStore.getBoundaryDetailsById(this.props.params.projectId);
    //Prepend the hash. Really figure out why react-router is inserting hash and get rid of it if possible
  	var projectPath = "#" + project.path;
  	var district = TadaStore.getBoundaryDetailsById(this.props.params.districtId);
  	var districtPath = "#" + district.path;
  	var circle = TadaStore.getBoundaryDetailsById(this.props.params.circleId);
  	var circlePath = "#" + circle.path;
    return(
    	<div>
    		<ol className="breadcrumb">
    			<li><a href={districtPath}>{district.name}</a></li>
    			<li> <a href={projectPath}> {project.name}</a></li>
    			<li className="active"> {circle.name}</li>
    		</ol>
    		<h4 className="heading-border heading-warn"> Limited Permissions</h4>
    		<p>preschool circle screen</p>
    		<h4 className="heading-border brand-blue"> View Details</h4>
    	
    	</div>);
  }
});

export default PreschoolCircle;  