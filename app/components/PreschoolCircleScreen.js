import React from 'react';
import {modifyBoundary, deleteBoundary, saveNewInstitution} from '../actions';
import CreateInstitution from './Modals/CreateInstitution';
import Button from './Button'
import ConfirmModal from './Modals/Confirm'



export default class PreschoolCircle extends React.Component {

  constructor(props){
    super(props);
    this.openSchoolModal = this.openSchoolModal.bind(this);
    this.saveSchool = this.saveSchool.bind(this)
    this.toggleSchoolModal = this.toggleSchoolModal.bind(this);
    this.saveCircle = this.saveCircle.bind(this);
    this.deleteCircle = this.deleteCircle.bind(this);
    this.state = {
      schoolModalIsOpen: false,
      openConfirmModal: false
    };
  }

  closeConfirmation = () => {
    this.setState({
      openConfirmModal: false
    })
  }

  showConfirmation = () => {
    this.setState({
      openConfirmModal: true
    })
  }


  toggleSchoolModal() {
   this.props.dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createInstitution'
    })
  }

  saveSchool(school) {
    const options = {
      name: school.name,
      boundary: this.props.params.circleId,
      languages: school.languages.map(school => school.value)
    }
    this.props.dispatch(saveNewInstitution(options))
  }

  getLanguages() {
    return fetch(serverApiBase + 'languages/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.token
      }
    }).then(checkStatus).then((languages) => {
        const langs = languages.results.map((language) => ({
          value: language.id,
          label: language.name
        }))
        return {
          options: langs,
          complete: true
        }
      }).catch(error => {
      console.log('request failed', error)
    })
  }

  openSchoolModal(){
    this.setState({
      schoolModalIsOpen: true
    })
  }

  saveCircle() {
    this.props.dispatch(modifyBoundary(this.props.params.circleId, this.circleName.value));
  }

  deleteCircle() {
    let {params} = this.props
    this.props.dispatch(deleteBoundary(params.circleId, params.projectId));
  }

  render() {
    var project = this.props.boundaryDetails[this.props.params.projectId];
    var district = this.props.boundaryDetails[this.props.params.districtId];
    var circle = this.props.boundaryDetails[this.props.params.circleId];
    var Displayelement;
    if(sessionStorage.getItem('isAdmin')) {
      Displayelement = (props) =>
        <div>
          <div className='heading-border-left'>
            <h4 className="brand-blue col-md-10">Modify Details</h4>
            <Button onClick={this.toggleSchoolModal} title='Add School'/>
          </div>
          <form className="form-horizontal boundary-form" role="form">
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="name">Circle :</label>
              <div className="col-sm-2">
                <input type="text" ref={(ref) => this.circleName = ref} className="form-control" id="name" defaultValue={circle.name}/>
              </div>
            </div>
           </form>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary" onClick={this.saveCircle}>Save</button>
            <button type="submit" className="btn btn-primary" onClick={this.showConfirmation}>Delete</button>
            <ConfirmModal isOpen={this.state.openConfirmModal} onAgree={this.deleteCircle} closeModal={this.closeConfirmation} entity={circle.name}/>
          </div>
        </div>
    }
    else {
      Displayelement = (props) =>
        <div>
          <h4 className="heading-err heading-border-left brand-red"> <i className="fa fa-lock brand-red" aria-hidden="true"></i>  Insufficient Permissions</h4>
          <p>You need administrator privileges to modify Boundary details.</p>
          <h4 className="brand-blue heading-border-left"> Circle Details</h4>
          <p> Name: {circle.name}</p>
        </div>
    }
     return(
      <div>
       <ol className="breadcrumb">
          <li><a href={district.path}>{district.name}</a></li>
          <li><a href={project.path}>{project.name}</a></li>
          <li className="active">{circle.name}</li>
        </ol>
        <Displayelement {...this.props}/>
        <CreateInstitution placeHolder='School Name' title='Create New School' isOpen={this.props.modal.createInstitution} onCloseModal={this.toggleSchoolModal} closeModal={ this.toggleSchoolModal} save={ this.saveSchool } />
      </div>
    );
  }
};

