import React, { Component } from 'react'

export default class Input extends Component {
  render() {
    return (
      <div>
            <input type={this.props.types} onFocus={this.props.handleFocus} onBlur={this.props.handleBlur} value={this.props.values} defaultValue={this.props.defaultValues} placeholder={this.props.placeholders} name={this.props.name} onChange={this.props.handleChange} required={this.props.require}/>
      </div>
    )
  }
}
