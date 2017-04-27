var EmployeeInfo = React.createClass({
	getDefaultProps: function() {
		return {
			url: window.location.href
		}
	},

	componentDidMount: function(){
		// $.get('/getemployee/'+)
	},

	render: function(){
		return (
			<div id="employee-info">
				<div className="box-header">{this.props.boxtitle}</div>
				<div className="box-content">
					{this.props.url}
				</div>
			</div>
		)
	}
});

var Container = React.createClass({
	render: function() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<EmployeeInfo boxtitle="Employee Info" />
					</div>
					<div className="col-md-6">
						<EmployeeInfo boxtitle="Time Off" />
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						
					</div>
					<div className="col-md-6">
						
					</div>
				</div>
			</div>
		)
	}
});

// ReactDOM.render(
// 	<Container />, document.getElementById('main'));