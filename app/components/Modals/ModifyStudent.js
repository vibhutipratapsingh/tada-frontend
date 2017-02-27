import React, { Component } from 'react';
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

export default class ConfirmDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props.data
    }
    this.changeVal = this.changeVal.bind(this)
   }

   changeVal(e, key) {
    var obj = {}
    obj[key] = e.target.value
    this.setState(obj);
  }

  render() {
    return (
      <Modal contentLabel="Confirm Modal" isOpen={this.props.isOpen} onRequestClose={this.props.closeModal} style={customStyles}>
        <div className="">
          <div>First Name: <input value={this.state.first_name || ''} onChange={(e) => {this.changeVal(e, 'first_name')}} type='text' className='form-control'/></div>
          <div>Middle Name: <input value={this.state.middle_name || ''} onChange={(e) => {this.changeVal(e, 'middle_name')}} type='text' className='form-control'/></div>
          <div>Last Name: <input value={this.state.last_name || ''} onChange={(e) => {this.changeVal(e, 'last_name')}} type='text' className='form-control'/></div>
          <div>UID: <input value={this.state.uid || '' } onChange={(e) => {this.changeVal(e, 'uid')}} type='text' className='form-control'/></div>
          <div>Gender: <input value={this.state.gender} onChange={(e) => {this.changeVal(e, 'gender')}} type='text' className='form-control'/></div>
          <div>Language: <input value={this.state.language || 1} onChange={(e) => {this.changeVal(e, 'language')}} type='text' className='form-control'/></div>
          <div>DOB: <input value={this.state.dob} onChange={(e) => {this.changeVal(e, 'dob')}} type='date' className='form-control'/></div>
          <div>Father Name: <input value={this.state.fatherName || ''} onChange={(e) => {this.changeVal(e, 'fatherName')}} type='text' className='form-control'/></div>
          <div>Mother Name: <input value={this.state.motherName || ''} onChange={(e) => {this.changeVal(e, 'motherName')}} type='text' className='form-control'/></div>
      </div>
      <div className='button' onClick={ () => {
                                            this.props.saveStudent(this.state)
                                          } }>Yes</div>
        <div className='button' onClick={ this.props.closeModal }>No</div>
      </Modal>
    )
  }

}
