var path = require('path');
var fs = require('fs');


var helpers = {};



helpers.parseJsonToObject = function(str){
	try{
		var obj = JSON.parse(str);
		return obj;
	}catch(e){
		return {};
	}
};


helpers.getTemplate = function(templateName,templateData,callback){
	templateName = typeof(templateName) == 'string' && templateName.length > 0 ? templateName : false;
	if(templateName){
		var templatesDir = path.join(__dirname,'/./templates/');
		fs.readFile(templatesDir + templateName + '.html','utf-8',function(err,templateStr){
			if(!err){
				helpers.addHeaderAndFooter(templateStr,function(err,finalTemplateStr){
					var finalTemplateStrWithData = helpers.addTemplateData(finalTemplateStr,templateData);

					callback(false,finalTemplateStrWithData);
				});
			}
			else {
				callback('No template could be found');
			}
		});
	}
};


helpers.addTemplateData = function(templateStr,templateData){
	for(key in templateData){
		if(templateData.hasOwnProperty(key)){
			var replace = templateData[key];
			var find = '{' + key + '}';

			templateStr = templateStr.replace(find,replace);
		}
	}

	return templateStr;
};

helpers.addHeaderAndFooter = function(templateStr,callback){
	templateStr = typeof(templateStr) == 'string' && templateStr.length > 0 ? templateStr : false;
	var finalTemplateStr = '';
	if(templateStr){
		var templatesDir = path.join(__dirname,'/./templates/');
		fs.readFile(templatesDir + 'header.html','utf-8',function(err,headerStr){
			if(!err){
				finalTemplateStr += headerStr;
				finalTemplateStr += templateStr;
				fs.readFile(templatesDir + 'footer.html','utf-8',function(err,footerStr){
					if(!err){
						finalTemplateStr += footerStr;
						callback(false,finalTemplateStr);
					}
					else {
						callback('Footer not found!')
					}
				});
			}
			else {
				callback('Header not found!');
			}
		});
	}
};


helpers.getStaticAsset = function(fileName,callback){
	fileName = typeof(fileName) == 'string' && fileName.length > 0 ? fileName : false;
	if(fileName){
		var publicDir = path.join(__dirname,'/./public/');
		fs.readFile(publicDir+fileName,function(err,data){
			if(!err && data){
				callback(false,data);
			}
			else {
				callback('No file could be found');
			}
		});
	}
	else {
		callback('A valid filename was not specified');
	}
};




module.exports = helpers;