import {
	baseUrl
} from './env'

export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();
	url = baseUrl + url;

	if (type == 'GET') {
	    if(url == "/user/login" || url == "/api/user/login"){

	      let storage = window.localStorage;
	      storage.setItem("store","");
	    }
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}
	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			 // headers: {
				//   'Content-Type': 'multipart/form-data'
				// }
			method: type,
			
		}

		if (type == 'POST') {
		  	let formData = new FormData();
      		let token = sessionStorage.getItem("token");


      		Object.keys(data).forEach(key => {
        		if(key == 'files'){
        			data[key].forEach(item=>{
        				formData.append('files',item);
        			})
        		}else{
        			formData.append(key,data[key]);
        		}
        		
      		});
      		if(token){
        		formData.append("token",token);
      		}
			Object.defineProperty(requestConfig, 'body', {
				value: formData
			})
		}

		try {
			const response = await fetch(url, requestConfig);
			const responseJson = await response.json();
			return responseJson
		} catch (error) {
			throw new Error(error)
		}
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if (type == 'POST') {
				sendData = JSON.stringify(data);
			}

			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-type", "application/json;charset=UTF-8");
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}
