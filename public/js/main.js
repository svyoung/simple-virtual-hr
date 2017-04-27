var TopHeader = React.createClass({
	render: function() {
		return (
			<div className="header-div">
				Employee Directory
			</div>
		)

	} 
});

var EmployeeList = React.createClass({
	getInitialState: function(){
		return {
			employees: {}
		}
	},

	componentDidMount: function(){
		var self = this;
    	axios.get('/employee/all/namelist')
	        .then(function (result) { 
	            self.setState({
	                employees: JSON.stringify(result.data)
	            });
	        })
	        .catch(function (error) {
	            console.log(error);
	        });
	},

	render: function(){
		return (
			<div class="site-content">
            <h1>Employees &nbsp;&nbsp;<a class="employee-add">+</a></h1> 
        	</div>
		);
	}
});



ReactDOM.render(<TopHeader /> , document.getElementById('main'));