var U2FRegistration = {
	
	parse : function(registrationData)
	{
		var bRegData = U2FRegistration._Base64ToArrayBuffer(registrationData);
		if(bRegData[0]!=5)
		{
			throw "Reserved byte is incorrect";
		}		
		U2FRegistration.userPublicKey = U2FRegistration._ArrayBufferToBase64(bRegData.slice(1,66));
	    U2FRegistration.keyHandleLength = bRegData[66];		
		U2FRegistration.keyHandle = U2FRegistration._ArrayBufferToBase64(bRegData.slice(67,U2FRegistration.keyHandleLength+67));
	},
	userPublicKey : "",
	keyHandleLength : 0,
	keyHandle : "",
    _Base64ToArrayBuffer : function (base64) {
		base64 = base64.replace(/_/g, '/').replace(/-/g, '+'); // web safe
		var binary_string = window.atob(base64);
		var len = binary_string.length;
		var bytes = new Uint8Array(len);
		for (var i = 0; i < len; i++) {
			bytes[i] = binary_string.charCodeAt(i);
		}
		return bytes;
	},
	_ArrayBufferToBase64 : function (arrayBuffer) {
		var dView = new Uint8Array(arrayBuffer);   
		var arr = Array.prototype.slice.call(dView);   
		var arr1 = arr.map(function(item){        
		  return String.fromCharCode(item);    
		});
		var b64 =  window.btoa(arr1.join(''));  
		return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
	}


};