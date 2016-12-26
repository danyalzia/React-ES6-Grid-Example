import React from "react";
import ReactDOM from "react-dom";

let resources = [{'ResourceAddress': 'http://www.discoversdk.com', 'ResourceDescription':'Great site'}];

export default class MainApp extends React.Component {
	
	constructor(props, context) {
    super(props, context);
	
	this.addItems = this.addItems.bind(this);
	this.removeItem = this.removeItem.bind(this);
	
    this.state = {
      items : resources
    };
  };
  
	addItems(newItem) {
		resources = resources.concat([newItem]);
		this.setState({items: resources}); 
	}
	removeItem(itemIndex) {
		resources.splice(itemIndex, 1);
		this.setState({items: resources});
	}
	show() {
		alert(JSON.stringify(resources));
	}
	render() { 
		return (
			<fieldset>
			<div>
				<h3>Add Resources</h3>
				<AddResourceForm onFormSubmit={this.addItems} />
				<a href="#" onClick={this.show}>Show</a>
				<h3>List of Resources</h3>
				<RecourceList items={this.state.items} removeItem={this.removeItem} /> 
			</div>
			</fieldset>
		); 
	} 
};

class RecourceList extends React.Component { 
	render() {
		const that = this;
    const st = {
			backgroundColor: '#3b97d3',
			color: '#fff',
			padding: '5px',
			borderRight: 'solid 1px #3b97d3',
			borderLeft: 'solid 1px #fff'
		};
		const st2 = {
			padding: '5px',
			borderRight: 'solid 1px #d4d4d4',
			width: '250'
		};
		const createItem = (itemText, index) => <ResourceListItem removeItem={that.props.removeItem} key={index}>{itemText}</ResourceListItem>;
		
		return (
			<table>
				<thead>
					<tr style={st}>
						<td style={st2}>Description</td>
						<td style={st2}>Url</td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					{this.props.items.map(createItem)}
				</tbody>
			</table>
		) 
	} 
};

class ResourceListItem extends React.Component { 

	constructor(props, context) {
		super(props, context);
		
		this.updateDescription = this.updateDescription.bind(this);
		this.updateAddress = this.updateAddress.bind(this);
		
		this.state = {
		  ResourceDescription: this.props.children.ResourceDescription, ResourceAddress: this.props.children.ResourceAddress
		};
	  };
	
	removeItem(e, index) {
		this.props.removeItem(resources.indexOf(this.props.children));
	}
	
	updateDescription(e) {
		resources[resources.indexOf(this.props.children)].ResourceDescription = e.target.value;
		this.setState({ResourceDescription: e.target.value});
	}
	
	updateAddress(e) {
		resources[resources.indexOf(this.props.children)].ResourceAddress = e.target.value;
		this.setState({ResourceAddress: e.target.value});
	}
	
	render() { 
		return (
			<tr>
			<td><input type="text" value={this.state.ResourceDescription} onChange={this.updateDescription} />{this.props.index}</td>
			<td><input type="text" value={this.state.ResourceAddress} onChange={this.updateAddress} /></td>
			<td><button onClick={this.removeItem.bind(null, this.props.children)}>remove</button></td>
			</tr>
		); 
	} 
};

class AddResourceForm extends React.Component {
	
		constructor(props, context) {
		super(props, context);
		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onChangeUrl = this.onChangeUrl.bind(this);
		
		this.state = {
		  description: '', url: ''
		};
	  };
	
	handleSubmit(e) { 
		e.preventDefault();
		if(this.state.url == "" || this.state.description == ""){
			return true;
		}
		const data = {'ResourceAddress': this.state.url, 'ResourceDescription': this.state.description};
		this.props.onFormSubmit(data); 
		this.setState({description: '', url: ''}); 
		return; 
	}
	
	onChangeDescription(e) { 
		this.setState({ description: e.target.value }); 
	}
	
	onChangeUrl(e) { 
		this.setState({ url: e.target.value }); 
	}
	
	render() { 
  const st2 = {
				height: '20px',
				fontSize: '14px',
				width: '220'
			};
		return (
			
			<form onSubmit={this.handleSubmit}> 
				<span style={st2}>Description:</span>
            	<input style={st2} type="text" ref='description' onChange={this.onChangeDescription} value={this.state.description} />
            	<span style={st2}> URL:</span>
            	<input style={st2} type="text" ref='url' onChange={this.onChangeUrl} value={this.state.url}  />
            	<input type="submit" name="submit" value="add" />
            </form>
            

		); 
	} 
};