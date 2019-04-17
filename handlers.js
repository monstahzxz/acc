var helpers = require('./helpers');
var xlsx = require('xlsx');

var handlers = {};



handlers.notFound = function(data, callback){
	callback(404);
};


handlers.index = function(data, callback){
	if(data.method == 'get'){
		helpers.getTemplate('index',{},function(err, templateStr){
			if(!err && templateStr){
				callback(200, templateStr, 'html');
			}
			else {
				callback(404);
			}
		});
	}
	else {
		callback(400);
	}
};


handlers.theoryH = function(data, callback){
	if(data.method == 'get'){
		helpers.getTemplate('theory_h',{'body.class' : 'theory_h'},function(err, templateStr){
			if(!err && templateStr){
				callback(200, templateStr, 'html');
			}
			else {
				callback(404);
			}
		});
	}
	else {
		callback(400);
	}
};


handlers.public = function(data, callback){
	if(data.method == 'get'){
		var trimmedAssetName = data.trimmedPath.replace('public/','').trim();
		if(trimmedAssetName.length > 0){
			helpers.getStaticAsset(trimmedAssetName,function(err,data){
				if(!err && data){
					var contentType = 'plain';

					if(trimmedAssetName.indexOf('.css') > -1){
						contentType = 'css';
					}
					if(trimmedAssetName.indexOf('.png') > -1){
						contentType = 'png';
					}
					if(trimmedAssetName.indexOf('.jpeg') > -1){
						contentType = 'jpeg';
					}
					if(trimmedAssetName.indexOf('.ico') > -1){
						contentType = 'favicon';
					}

					callback(200,data,contentType);
				}
				else {
					callback(404);
				}
			});
		}
		else {
			callback(404);
		}
	}
	else {
		callback(405);
	}
};


handlers.fileUpload = function(data, callback){
	
};


handlers.theorySub = function(data, callback){
	if(data.method == 'post'){
		var name = typeof(data.payload.name) == 'string' && data.payload.name.length > 0 ? data.payload.name : undefined;
		var desig = typeof(data.payload.desig) == 'string' && data.payload.desig.length > 0 ? data.payload.desig : undefined;
		var dept = typeof(data.payload.dept) == 'string' && data.payload.dept.length > 0 ? data.payload.dept : undefined;
		var course = typeof(data.payload.course) == 'string' && data.payload.course.length > 0 ? data.payload.course : undefined;
		var crscode = typeof(data.payload.crscode) == 'string' && data.payload.crscode.length > 0 ? data.payload.crscode : undefined;
		var acadyear = typeof(data.payload.acadyear) == 'string' && data.payload.acadyear.length > 0 ? data.payload.acadyear : undefined;
		var assign1 = {};
		var assign2 = {};
		var series1 = {};
		var series2 = {};

		var serials = ['a','b','c','d'];


		assign1.target = data.payload['assign1target'];
		assign1.thresh1 = data.payload['assign1thresh1'];
		assign1.thresh2 = data.payload['assign1thresh2'];
		assign1.thresh3 = data.payload['assign1thresh3'];

		assign2.target = data.payload['assign2target'];
		assign2.thresh1 = data.payload['assign1thresh1'];
		assign2.thresh2 = data.payload['assign1thresh2'];
		assign2.thresh3 = data.payload['assign1thresh3'];

		series1.target = data.payload['series1target'];
		series1.thresh1 = data.payload['series1thresh1'];
		series1.thresh2 = data.payload['series1thresh2'];
		series1.thresh3 = data.payload['series1thresh3'];

		series2.target = data.payload['series2target'];
		series2.thresh1 = data.payload['series2thresh1'];
		series2.thresh2 = data.payload['series2thresh2'];
		series2.thresh3 = data.payload['series2thresh3'];

		assign1.co = [];
		assign2.co = [];
		series1.co = [];
		series2.co = [];
		for(i=0;i<12;++i){
			assign1.co[i] = data.payload['assign1co' + (i + 1)];
			assign2.co[i] = data.payload['assign2co' + (i + 1)];
			series1.co[i] = [];
			series2.co[i] = [];
			for(idx in serials){
				series1.co[i][idx] = data.payload['series1co' + (i + 1) + serials[idx]];
				series2.co[i][idx] = data.payload['series2co' + (i + 1) + serials[idx]];
			}
		}

		assign1.mark = [];
		assign2.mark = [];
		series1.mark = [];
		series2.mark = [];
		for(i=0;i<12;++i){
			assign1.mark[i] = data.payload['assign1mark' + (i + 1)];
			assign2.mark[i] = data.payload['assign2mark' + (i + 1)];
			series1.mark[i] = [];
			series2.mark[i] = [];
			for(idx in serials){
				series1.mark[i][idx] = data.payload['series1mark' + (i + 1) + serials[idx]];
				series2.mark[i][idx] = data.payload['series2mark' + (i + 1) + serials[idx]];
			}
		}

		assign1.marksmark = [];
		assign2.marksmark = [];
		for(i=0;i<12;++i){
			assign1.marksmark[i] = [];
			assign2.marksmark[i] = [];
		}


		assign1.no_of_stud = data.payload.assign1noofstud;
		assign1.marks = {};
		assign1.marks.name = [];
		assign1.marks.rollno = [];
		for(i=0;i<assign1.no_of_stud;++i){
			assign1.marks.name.push(data.payload['assign1marksname' + (i + 1)]);
			assign1.marks.rollno.push(data.payload['assign1marksrollno' + (i + 1)]);
			for(j=0;j<12;++j){
				assign1.marksmark[j].push(data.payload['assign1marksmark' + (j + 1) + 'a' + (i + 1)]);
			}
		}

		assign2.no_of_stud = data.payload.assign2noofstud;
		assign2.marks = {};
		assign2.marks.name = [];
		assign2.marks.rollno = [];
		for(i=0;i<assign2.no_of_stud;++i){
			assign2.marks.name.push(data.payload['assign2marksname' + (i + 1)]);
			assign2.marks.rollno.push(data.payload['assign2marksrollno' + (i + 1)]);
			for(j=0;j<12;++j){
				assign2.marksmark[j].push(data.payload['assign2marksmark' + (j + 1) + 'a' + (i + 1)]);
			}
		}

		series1.marksmark = [];
		series2.marksmark = [];
		for(i=0;i<12;++i){
			series1.marksmark[i] = [];
			series2.marksmark[i] = [];
			for(idx in serials){
				series1.marksmark[i][idx] = [];
				series2.marksmark[i][idx] = [];
			}
		}

		series1.no_of_stud = data.payload.series1noofstud;
		series1.marks = {};
		series1.marks.name = [];
		series1.marks.rollno = [];
		for(i=0;i<series1.no_of_stud;++i){
			series1.marks.name.push(data.payload['series1marksname' + (i + 1)]);
			series1.marks.rollno.push(data.payload['series1marksrollno' + (i + 1)]);
			for(j=0;j<12;++j){
				for(idx in serials){
					series1.marksmark[j][idx].push(data.payload['series1marksmark' + (j + 1) + serials[idx] + (i + 1)]);
				}
			}
		}

		series2.no_of_stud = data.payload.series2noofstud;
		series2.marks = {};
		series2.marks.name = [];
		series2.marks.rollno = [];
		for(i=0;i<series2.no_of_stud;++i){
			series2.marks.name.push(data.payload['series2marksname' + (i + 1)]);
			series2.marks.rollno.push(data.payload['series2marksrollno' + (i + 1)]);
			for(j=0;j<12;++j){
				for(idx in serials){
					series2.marksmark[j][idx].push(data.payload['series2marksmark' + (j + 1) + serials[idx] + (i + 1)]);
				}
			}
		}

		//console.log(series1);

		assign1.attainment = {
			'perc' : {
				'CO1' : 0,
				'CO2' : 0,
				'CO3' : 0,
				'CO4' : 0,
				'CO5' : 0,
				'CO6' : 0,
				'CO7' : 0,
				'CO8' : 0
			},
			'level' : {
				'CO1' : 0,
				'CO2' : 0,
				'CO3' : 0,
				'CO4' : 0,
				'CO5' : 0,
				'CO6' : 0,
				'CO7' : 0,
				'CO8' : 0
			}
		};
		assign2.attainment = {
			'perc' : {
				'CO1' : 0,
				'CO2' : 0,
				'CO3' : 0,
				'CO4' : 0,
				'CO5' : 0,
				'CO6' : 0,
				'CO7' : 0,
				'CO8' : 0
			},
			'level' : {
				'CO1' : 0,
				'CO2' : 0,
				'CO3' : 0,
				'CO4' : 0,
				'CO5' : 0,
				'CO6' : 0,
				'CO7' : 0,
				'CO8' : 0
			}
		};
		series1.attainment = {
			'perc' : {
				'CO1' : 0,
				'CO2' : 0,
				'CO3' : 0,
				'CO4' : 0,
				'CO5' : 0,
				'CO6' : 0,
				'CO7' : 0,
				'CO8' : 0
			},
			'level' : {
				'CO1' : 0,
				'CO2' : 0,
				'CO3' : 0,
				'CO4' : 0,
				'CO5' : 0,
				'CO6' : 0,
				'CO7' : 0,
				'CO8' : 0
			}
		};
		series2.attainment = {
			'perc' : {
				'CO1' : 0,
				'CO2' : 0,
				'CO3' : 0,
				'CO4' : 0,
				'CO5' : 0,
				'CO6' : 0,
				'CO7' : 0,
				'CO8' : 0
			},
			'level' : {
				'CO1' : 0,
				'CO2' : 0,
				'CO3' : 0,
				'CO4' : 0,
				'CO5' : 0,
				'CO6' : 0,
				'CO7' : 0,
				'CO8' : 0
			}
		};

		var count = {
			'series1' : {
				'CO1' : 0,
				'CO2' : 0,
				'CO3' : 0,
				'CO4' : 0,
				'CO5' : 0,
				'CO6' : 0,
				'CO7' : 0,
				'CO8' : 0
			},
			'series2' : {
				'CO1' : 0,
				'CO2' : 0,
				'CO3' : 0,
				'CO4' : 0,
				'CO5' : 0,
				'CO6' : 0,
				'CO7' : 0,
				'CO8' : 0
			},
			'assign1' : {
				'CO1' : 0,
				'CO2' : 0,
				'CO3' : 0,
				'CO4' : 0,
				'CO5' : 0,
				'CO6' : 0,
				'CO7' : 0,
				'CO8' : 0
			},
			'assign2' : {
				'CO1' : 0,
				'CO2' : 0,
				'CO3' : 0,
				'CO4' : 0,
				'CO5' : 0,
				'CO6' : 0,
				'CO7' : 0,
				'CO8' : 0
			}
		};

		//Series 1 attainment calc

		var target = series1.target;
		for(i=0;i<series1.no_of_stud;++i){
			var coscore = {};
			var comax = {};
			for(j=0;j<12;++j){
				for(idx in serials){
					var score = series1.marksmark[j][idx][i];
					var max = series1.mark[j][idx]
					var co = series1.co[j][idx];
					coscore[co] = coscore.hasOwnProperty(co) ? coscore[co] + parseInt(score) : parseInt(score);
					comax[co] = comax.hasOwnProperty(co) ? comax[co] + parseInt(max) : parseInt(max);
				}
			}
			for(k=0;k<8;++k){
				if((coscore['CO' + (k + 1)] / comax['CO' + (k + 1)]) * 100 > target){
					count.series1['CO' + (k + 1)] += 1;
				}
			}
		}

		for(i=0;i<8;++i){
				series1.attainment.perc['CO' + (i + 1)] = (count.series1['CO' + (i + 1)] / series1.no_of_stud) * 100;
				series1.attainment.level['CO' + (i + 1)] = series1.attainment.perc['CO' + (i + 1)] >= series1.thresh3 ? 3 : series1.attainment.perc['CO' + (i + 1)] >= series1.thresh2 ? 2 : series1.attainment.perc['CO' + (i + 1)] >= series1.thresh1 ? 1 : 0
		}


		//Series 2 attainment calc

		var target = series2.target;
		for(i=0;i<series2.no_of_stud;++i){
			var coscore = {};
			var comax = {};
			for(j=0;j<12;++j){
				for(idx in serials){
					var score = series2.marksmark[j][idx][i];
					var max = series2.mark[j][idx]
					var co = series2.co[j][idx];
					coscore[co] = coscore.hasOwnProperty(co) ? coscore[co] + parseInt(score) : parseInt(score);
					comax[co] = comax.hasOwnProperty(co) ? comax[co] + parseInt(max) : parseInt(max);
				}
			}
			for(k=0;k<8;++k){
				if((coscore['CO' + (k + 1)] / comax['CO' + (k + 1)]) * 100 > target){
					count.series2['CO' + (k + 1)] += 1;
				}
			}
		}

		for(i=0;i<8;++i){
				series2.attainment.perc['CO' + (i + 1)] = (count.series2['CO' + (i + 1)] / series2.no_of_stud) * 100;
				series2.attainment.level['CO' + (i + 1)] = series2.attainment.perc['CO' + (i + 1)] >= series2.thresh3 ? 3 : series2.attainment.perc['CO' + (i + 1)] >= series2.thresh2 ? 2 : series2.attainment.perc['CO' + (i + 1)] >= series2.thresh1 ? 1 : 0
			
		}


		//Assign 1 attainment calc

		var target = assign1.target;
		for(i=0;i<assign1.no_of_stud;++i){
			var coscore = {};
			var comax = {};
			for(j=0;j<12;++j){
				var score = assign1.marksmark[j][i];
				var max = assign1.mark[j];
				var co = assign1.co[j];
				coscore[co] = coscore.hasOwnProperty(co) ? coscore[co] + parseInt(score) : parseInt(score);
				comax[co] = comax.hasOwnProperty(co) ? comax[co] + parseInt(max) : parseInt(max);	
			}
			console.log(coscore);
			for(k=0;k<8;++k){
				if((coscore['CO' + (k + 1)] / comax['CO' + (k + 1)]) * 100 > target){
					count.assign1['CO' + (k + 1)] += 1;
				}
			}
		}

		for(i=0;i<8;++i){
				assign1.attainment.perc['CO' + (i + 1)] = (count.assign1['CO' + (i + 1)] / assign1.no_of_stud) * 100;
				assign1.attainment.level['CO' + (i + 1)] = assign1.attainment.perc['CO' + (i + 1)] >= assign1.thresh3 ? 3 : assign1.attainment.perc['CO' + (i + 1)] >= assign1.thresh2 ? 2 : assign1.attainment.perc['CO' + (i + 1)] >= assign1.thresh1 ? 1 : 0
		}


		//Assign 2 attainment calc

		var target = assign2.target;
		for(i=0;i<assign2.no_of_stud;++i){
			var coscore = {};
			var comax = {};
			for(j=0;j<12;++j){
				var score = assign2.marksmark[j][i];
				var max = assign2.mark[j];
				var co = assign2.co[j];
				coscore[co] = coscore.hasOwnProperty(co) ? coscore[co] + parseInt(score) : parseInt(score);
				comax[co] = comax.hasOwnProperty(co) ? comax[co] + parseInt(max) : parseInt(max);	
			}
			for(k=0;k<8;++k){
				if((coscore['CO' + (k + 1)] / comax['CO' + (k + 1)]) * 100 > target){
					count.assign2['CO' + (k + 1)] += 1;
				}
			}
		}

		for(i=0;i<8;++i){
				assign2.attainment.perc['CO' + (i + 1)] = (count.assign2['CO' + (i + 1)] / assign2.no_of_stud) * 100;
				assign2.attainment.level['CO' + (i + 1)] = assign2.attainment.perc['CO' + (i + 1)] >= assign2.thresh3 ? 3 : assign2.attainment.perc['CO' + (i + 1)] >= assign2.thresh2 ? 2 : assign2.attainment.perc['CO' + (i + 1)] >= assign2.thresh1 ? 1 : 0
		}

		console.log(assign1.attainment);
	}
	else {
		callback(400);
	}
}



module.exports = handlers;