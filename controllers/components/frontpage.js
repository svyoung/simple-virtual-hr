var React = require('react');
var axios = require('axios');

module.exports = React.createClass({
	componentDidMount: function(){
		axios.get('/employee/all/namelist')
        .then(function (result) { 
            self.setState({
                employees: result.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
	},

	render: function(){
		return (
			<div>
				<div class="site-content">
		            <h1>Employees &nbsp;&nbsp;<a class="employee-add">+</a></h1> 
		            {this.state.employees.map(function(item, i){
		            	return 
		            		<div>
		            			<h3>item</h3>
		            			<ul className="employee-list">
		            				<li>hii</li>
		            			</ul>
		            		</div>;
		            })}
		        </div>
		        <div class="site-art">
		        </div>
			</div>
		);
	}
})

ReactDOM.render(<EmployeeList />, document.getElsementById('main'));