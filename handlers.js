var helpers = require('./helpers');
var xl = require('./xl')

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
		var univ_type = typeof(data.payload.univ) == 'string' && data.payload.univ.length > 0 ? data.payload.univ : undefined;
		var course = typeof(data.payload.course) == 'string' && data.payload.course.length > 0 ? data.payload.course : undefined;
		var crscode = typeof(data.payload.crscode) == 'string' && data.payload.crscode.length > 0 ? data.payload.crscode : undefined;
		var acadyear = typeof(data.payload.acadyear) == 'string' && data.payload.acadyear.length > 0 ? data.payload.acadyear : undefined;
		var batchyear = typeof(data.payload.batchyear) == 'string' && data.payload.batchyear.length > 0 ? data.payload.batchyear : undefined;
		var sem = typeof(data.payload.sem) == 'string' && data.payload.sem.length > 0 ? data.payload.sem : undefined;
		var weightint = typeof(data.payload.weightint) == 'number' ? data.payload.weightint : undefined;
		var weightext = typeof(data.payload.weightext) == 'number' ? data.payload.weightext : undefined;
		var intseries = typeof(data.payload.intseries) == 'number' ? data.payload.intseries : undefined;
		var intassign = typeof(data.payload.intassign) == 'number' ? data.payload.intassign : undefined;
		var assign1 = {};
		var assign2 = {};
		var series1 = {};
		var series2 = {};

		var serials = ['a','b','c','d'];

		var gen_info = {
			name,
			desig,
			dept,
			univ_type,
			course,
			crscode,
			acadyear,
			batchyear,
			sem,
			weightint,
			weightext,
			intseries,
			intassign
		};

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
				'CO1' : -1,
				'CO2' : -1,
				'CO3' : -1,
				'CO4' : -1,
				'CO5' : -1,
				'CO6' : -1,
				'CO7' : -1,
				'CO8' : -1
			},
			'series2' : {
				'CO1' : -1,
				'CO2' : -1,
				'CO3' : -1,
				'CO4' : -1,
				'CO5' : -1,
				'CO6' : -1,
				'CO7' : -1,
				'CO8' : -1
			},
			'assign1' : {
				'CO1' : -1,
				'CO2' : -1,
				'CO3' : -1,
				'CO4' : -1,
				'CO5' : -1,
				'CO6' : -1,
				'CO7' : -1,
				'CO8' : -1
			},
			'assign2' : {
				'CO1' : -1,
				'CO2' : -1,
				'CO3' : -1,
				'CO4' : -1,
				'CO5' : -1,
				'CO6' : -1,
				'CO7' : -1,
				'CO8' : -1
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
				if((coscore['CO' + (k + 1)] / comax['CO' + (k + 1)]) * 100 >= target){
					count.series1['CO' + (k + 1)] = count.series1['CO' + (k + 1)] == -1 ? 1 : count.series1['CO' + (k + 1)] + 1;
				}
			}
		}

		for(i=0;i<8;++i){
		if(count.series1['CO' + (i + 1)] == -1){
				series1.attainment.perc['CO' + (i + 1)] = 'nill';
				series1.attainment.level['CO' + (i + 1)] = 'nill';
			}
			else {
				series1.attainment.perc['CO' + (i + 1)] = (count.series1['CO' + (i + 1)] / series1.no_of_stud) * 100;
				series1.attainment.level['CO' + (i + 1)] = series1.attainment.perc['CO' + (i + 1)] >= series1.thresh3 ? 3 : series1.attainment.perc['CO' + (i + 1)] >= series1.thresh2 ? 2 : series1.attainment.perc['CO' + (i + 1)] >= series1.thresh1 ? 1 : 0
			}
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
				if((coscore['CO' + (k + 1)] / comax['CO' + (k + 1)]) * 100 >= target){
					count.series2['CO' + (k + 1)] = count.series2['CO' + (k + 1)] == -1 ? 1 : count.series2['CO' + (k + 1)] + 1;
				}
			}
		}

		for(i=0;i<8;++i){
			if(count.series2['CO' + (i + 1)] == -1){
				series2.attainment.perc['CO' + (i + 1)] = 'nill';
				series2.attainment.level['CO' + (i + 1)] = 'nill';
			}
			else {
				series2.attainment.perc['CO' + (i + 1)] = (count.series2['CO' + (i + 1)] / series2.no_of_stud) * 100;
				series2.attainment.level['CO' + (i + 1)] = series2.attainment.perc['CO' + (i + 1)] >= series2.thresh3 ? 3 : series2.attainment.perc['CO' + (i + 1)] >= series2.thresh2 ? 2 : series2.attainment.perc['CO' + (i + 1)] >= series2.thresh1 ? 1 : 0
			}
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

			for(k=0;k<8;++k){
				if((coscore['CO' + (k + 1)] / comax['CO' + (k + 1)]) * 100 >= target){
					count.assign1['CO' + (k + 1)] = count.assign1['CO' + (k + 1)] == -1 ? 1 : count.assign1['CO' + (k + 1)] + 1;
				}
			}
		}

		for(i=0;i<8;++i){
			if(count.assign1['CO' + (i + 1)] == -1){
				assign1.attainment.perc['CO' + (i + 1)] = 'nill';
				assign1.attainment.level['CO' + (i + 1)] = 'nill';
			}
			else {
				assign1.attainment.perc['CO' + (i + 1)] = (count.assign1['CO' + (i + 1)] / assign1.no_of_stud) * 100;
				assign1.attainment.level['CO' + (i + 1)] = assign1.attainment.perc['CO' + (i + 1)] >= assign1.thresh3 ? 3 : assign1.attainment.perc['CO' + (i + 1)] >= assign1.thresh2 ? 2 : assign1.attainment.perc['CO' + (i + 1)] >= assign1.thresh1 ? 1 : 0
			}
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
				if((coscore['CO' + (k + 1)] / comax['CO' + (k + 1)]) * 100 >= target){
					count.assign2['CO' + (k + 1)] = count.assign2['CO' + (k + 1)] == -1 ? 1 : count.assign2['CO' + (k + 1)] + 1;
				}
			}
		}

		for(i=0;i<8;++i){
				if(count.assign2['CO' + (i + 1)] == -1){
				assign2.attainment.perc['CO' + (i + 1)] = 'nill';
				assign2.attainment.level['CO' + (i + 1)] = 'nill';
			}
			else {
				assign2.attainment.perc['CO' + (i + 1)] = (count.assign2['CO' + (i + 1)] / assign2.no_of_stud) * 100;
				assign2.attainment.level['CO' + (i + 1)] = assign2.attainment.perc['CO' + (i + 1)] >= assign2.thresh3 ? 3 : assign2.attainment.perc['CO' + (i + 1)] >= assign2.thresh2 ? 2 : assign2.attainment.perc['CO' + (i + 1)] >= assign2.thresh1 ? 1 : 0
			}
		}	

		var internal_attainment = {
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
			},
			'avg' : {
				'perc' : 0,
				'level' : 0
			}
		};

		var counter = 0;

		for(i=0;i<8;++i){
			series_weightage_perc = series1.attainment.perc['CO' + (i + 1)] == 'nill' && series2.attainment.perc['CO' + (i + 1)] == 'nill' ? 'copy' : series1.attainment.perc['CO' + (i + 1)] !== 'nill' && series2.attainment.perc['CO' + (i + 1)] !== 'nill' ? (series1.attainment.perc['CO' + (i + 1)] + series2.attainment.perc['CO' + (i + 1)]) / 2 : series1.attainment.perc['CO' + (i + 1)] == 'nill' ? series2.attainment.perc['CO' + (i + 1)] : series1.attainment.perc['CO' + (i + 1)]; 
			assign_weightage_perc = assign1.attainment.perc['CO' + (i + 1)] == 'nill' && assign2.attainment.perc['CO' + (i + 1)] == 'nill' ? 'copy' : assign1.attainment.perc['CO' + (i + 1)] !== 'nill' && assign2.attainment.perc['CO' + (i + 1)] !== 'nill' ? (assign1.attainment.perc['CO' + (i + 1)] + assign2.attainment.perc['CO' + (i + 1)]) / 2 : assign1.attainment.perc['CO' + (i + 1)] == 'nill' ? assign2.attainment.perc['CO' + (i + 1)] : assign1.attainment.perc['CO' + (i + 1)];

			series_weightage_level = series1.attainment.level['CO' + (i + 1)] == 'nill' && series2.attainment.level['CO' + (i + 1)] == 'nill' ? 'copy' : series1.attainment.level['CO' + (i + 1)] !== 'nill' && series2.attainment.level['CO' + (i + 1)] !== 'nill' ? (series1.attainment.level['CO' + (i + 1)] + series2.attainment.level['CO' + (i + 1)]) / 2 : series1.attainment.level['CO' + (i + 1)] == 'nill' ? series2.attainment.level['CO' + (i + 1)] : series1.attainment.level['CO' + (i + 1)];
			assign_weightage_level = assign1.attainment.level['CO' + (i + 1)] == 'nill' && assign2.attainment.level['CO' + (i + 1)] == 'nill' ? 'copy' : assign1.attainment.level['CO' + (i + 1)] !== 'nill' && assign2.attainment.level['CO' + (i + 1)] !== 'nill' ? (assign1.attainment.level['CO' + (i + 1)] + assign2.attainment.level['CO' + (i + 1)]) / 2 : assign1.attainment.level['CO' + (i + 1)] == 'nill' ? assign2.attainment.level['CO' + (i + 1)] : assign1.attainment.level['CO' + (i + 1)];

			internal_attainment.perc['CO' + (i + 1)] = series_weightage_perc == 'copy' && assign_weightage_perc == 'copy' ? 'nill' : series_weightage_perc !== 'copy' && assign_weightage_perc !== 'copy' ? series_weightage_perc * 0.6 + assign_weightage_perc * 0.4 : series_weightage_perc == 'copy' ? assign_weightage_perc : series_weightage_perc;
			internal_attainment.level['CO' + (i + 1)] = series_weightage_level == 'copy' && assign_weightage_level == 'copy' ? 'nill' : series_weightage_level !== 'copy' && assign_weightage_level !== 'copy' ? series_weightage_level * 0.6 + assign_weightage_level * 0.4 : series_weightage_level == 'copy' ? assign_weightage_level : series_weightage_level;

			internal_attainment.perc['CO' + (i + 1)] = internal_attainment.perc['CO' + (i + 1)] !== 'nill' ? Math.round(internal_attainment.perc['CO' + (i + 1)] * 100) / 100 : 'nill';
			internal_attainment.level['CO' + (i + 1)] = internal_attainment.perc['CO' + (i + 1)] !== 'nill' ? Math.round(internal_attainment.level['CO' + (i + 1)] * 100) / 100 : 'nill';
			
			if(internal_attainment.perc['CO' + (i + 1)] !== 'nill'){
				counter++;
				internal_attainment.avg.perc += internal_attainment.perc['CO' + (i + 1)];
				internal_attainment.avg.level += internal_attainment.level['CO' + (i + 1)];
			}
		}

		internal_attainment.avg.perc = internal_attainment.avg.perc / counter;
		internal_attainment.avg.level = internal_attainment.avg.level / counter;

		var univ = {};
		univ.count = 0;
		univ.no_of_stud = data.payload.noofstud;
		univ.target = data.payload.target;
		univ.maxmarks = data.payload.marks;
		univ.thresh1 = data.payload.thresh1;
		univ.thresh2 = data.payload.thresh2;
		univ.thresh3 = data.payload.thresh3;

		for(i=0;i<univ.no_of_stud;++i){
			mark = data.payload['marks' + (i + 1)];

			if((mark / univ.maxmarks) * 100 > univ.target){
				univ.count++;
			}
		}

		univ.attainment = {};

		univ.attainment.perc = (univ.count / univ.no_of_stud) * 100;
		univ.attainment.level = univ.attainment.perc >= univ.thresh3 ? 3 : univ.attainment.perc >= univ.thresh2 ? 2 : univ.attainment.perc >= univ.thresh1 ? 1 : 0;


		var external_attainment = {};

		external_attainment.perc = univ.attainment.perc;
		external_attainment.level = univ.attainment.level;

		var total_attainment = {};

		total_attainment.perc = internal_attainment.avg.perc * 0.4 + external_attainment.perc * 0.6;
		total_attainment.level = internal_attainment.avg.level * 0.4 + external_attainment.level * 0.6;

		var xl_data = {
			'gen_info' : gen_info,
			'univ' : univ,
			'series1' : series1,
			'series2' : series2,
			'assign1' : assign1,
			'assign2' : assign2,
			'internal_attainment' : internal_attainment,
			'total_attainment' : total_attainment
		};

		xl.createWorkbook(xl_data, function(err){
			if(!err){
				callback(200);
			}
			else {
				callback(500);
			}
		});
	}
	else {
		callback(400);
	}
}



module.exports = handlers;