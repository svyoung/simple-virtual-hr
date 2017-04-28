$(document).ready(function(){
	SearchBox.loadSearchbox();
});

$(document).mouseup(function (e)
{
    var container = $(".emp_profile_wrapper");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        closeModal();
    }
});

function closeModal() {
	$("#activate_profile").fadeOut(400, function(){
		$(this).remove();
	});
}


var PopUp = (function(){
	return {
		expandProfile: function(emp_id) {
			ReactDOM.render( React.createElement(this.profileBox(emp_id)), document.getElementById('activate_profile'))
		},
		profileBox: function(emp_id) {	
			return React.createClass({
				getInitialState: function() {
					return {
						expanded: false,
						employee: {},
						employee_id: emp_id
					}
				},
				componentDidMount: function() {
					$.get('/employee/'+this.state.employee_id, function(result) {
						this.setState({
							employee: result[0]
						})
					}.bind(this));
				},
				closeProfile: function(employee_id) {
					closeModal();
				},
				render: function() {
					return (
						<div className="emp_profile_wrapper">
							<div className="emp_profile_header">
								<div className="emp_profile_header_title">{this.state.employee.first_name} {this.state.employee.last_name}</div>
								<div className="close_profile" onClick={()=> this.closeProfile(this.state.employee.employee_id)}> &times; </div>
							</div>
							<div className="emp_profile_content">
								<div className="emp_profile_left_content">
									<img src="/img/defaultprofile.png" className="profile_pic" />
									<strong>{this.state.employee.department}</strong> <br/>
									{this.state.employee.title}
								</div>
								<div className="emp_profile_right_content">
									<div className="row">


									</div>
									Full Name: {this.state.employee.first_name} {this.state.employee.last_name}
								</div>
							</div>
						</div>

					)
				}
			});
		}
	}
})();

var SearchBox = (function(){
	return {
		searchbox: function() {
			return React.createClass({
				getInitialState: function() {
					return {
						inputValue: '',
						list: []
					}
				},
				handleOnChange: function(e) {
					this.setState({inputValue: e.target.value});
					return this.state.inputValue;
				},
				componentDidUpdate: function() {
					var self = this;
					var emp_list = [];
					if(this.state.inputValue) {
						$.get("/employee/fnln/"+this.state.inputValue, function(result) {
						result.forEach(function(item) {
							emp_list.push({
								"id": item.employee_id,
								"name": item.first_name+' '+item.last_name});
							})
							self.renderList(emp_list);	
						});
					} else {

					}		
				},
				renderList: function(item) {
					var self = this;
					ReactDOM.render(React.createElement('div', null, 
						item.map(function(thing){
							return (
								<div className="emp_list_cell" data-emp-id={thing.id} onClick={()=> {self.expandProfile(thing.id)}}>
									{thing.name}
								</div>
							)
						})
						), document.getElementById('result_list'));
				},
				expandProfile: function(emp_id) {
					$("body").append($('<div id="activate_profile" />').hide().fadeIn(400));
					PopUp.expandProfile(emp_id);
				},
				render: function() {
					var search_input = React.createElement(
							'input',
							{type: 'text', name: 'search_employee', className: 'employee_search_input', placeholder: 'search employee...', value: this.state.inputValue, onChange: this.handleOnChange}
						);       

					return React.createElement(
							'div',
							null,
							search_input
						)
				}
			});
		},
		loadSearchbox: function(){
			ReactDOM.render( React.createElement(this.searchbox()), document.getElementById('search_input'))
		}
	}
})();