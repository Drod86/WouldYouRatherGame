import React, { Component } from 'react'

class AddQuestion extends Component {
	render() {
		return(
			<div>
                <h3>AddQuestion</h3>
                <h4>Would you rater...?</h4>
                <input placeholder='Option One' type='text' />
                <input placeholder='Option Two' type='text' />
                <button>Add</button>
            </div>
		)
	}
}

export default AddQuestion
