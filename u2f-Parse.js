class U2FParse {
	
	parseRegistration (registrationData)
	{
		var bRegData = this._Base64ToArrayBuffer(registrationData);
		if(bRegData[0]!=5)
		{
			throw "Reserved byte is incorrect";
		};
		return {
			userPublicKey : this._ArrayBufferToBase64(bRegData.slice(1,66)),
			keyHandleLength : bRegData[66],
			keyHandle : this._ArrayBufferToBase64(bRegData.slice(67,bRegData[66]+67))
		};

	}
	
	parseSign (signData)
	{
		var bSignData = this._Base64ToArrayBuffer(signData);
		return {
			userPresence : bSignData[0],
			userCounter : bSignData[4] 
						  + bSignData[3] * 256
						  + bSignData[2] * 256 * 256
						  + bSignData[1] * 256 * 256 * 256
		};
	}

    _Base64ToArrayBuffer (base64) {
		base64 = base64.replace(/_/g, '/').replace(/-/g, '+'); // web safe
		var binary_string = window.atob(base64);
		var len = binary_string.length;
		var bytes = new Uint8Array(len);
		for (var i = 0; i < len; i++) {
			bytes[i] = binary_string.charCodeAt(i);
		}
		return bytes;
	}
	
	_ArrayBufferToBase64 (arrayBuffer) {
		var dView = new Uint8Array(arrayBuffer);   
		var arr = Array.prototype.slice.call(dView);   
		var arr1 = arr.map(function(item){        
		  return String.fromCharCode(item);    
		});
		var b64 =  window.btoa(arr1.join(''));  
		return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
	}


};