var DeepLinkState = {
	_convertToNativeType(value, type) {
		type = type || "string";
		if(value == "" || value == null || value == undefined){
			return "";
		} else {
			if(value === "false" && type === "boolean"){
				value = false;
			} else if (value === "true" && type === "boolean"){
				value = true;
			} else if(!isNaN(value) && type === "number"){
				value = Number(value);
			} else if(type == "date") {
				try {
					value = Date.parse(value);
				} catch (exception) {}

			} else {
				//Already a string
			}
			return value;
		}
	},


	changeState(evt, component) {
		var target = evt.target;
		var path = target.getAttribute('data-path');
		var type = target.getAttribute('data-type');
		var value = this._convertToNativeType(target.value, type);
		var objectPath = path.split('.') || [];
		if(objectPath.length == 0)
			return;
		var state = component.state;
		var item = state;
		for(var i = 0; i < objectPath.length -1; i++) {
			var pathValue = objectPath[i];
			if(!isNaN(pathValue)){
				pathValue = parseInt(pathValue);
			}
			item = item[objectPath[i]];
		}

		item[objectPath[objectPath.length -1]] = value;
		component.setState(state);
	}
};

module.exports = DeepLinkState;