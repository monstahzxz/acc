var excel = require('exceljs');
var fs = require('fs');
var config = require('./config');
var path = require('path');


var xl = {};



xl.createWorkbook = function(data, callback){
	var workbook = new excel.Workbook();

	workbook.xlsx.readFile(config.template_xl).then(function(){
		worksheet = workbook.getWorksheet(1);

		worksheet.getCell(config.cells.crsname).value = data.gen_info.course;
		worksheet.getCell(config.cells.crscode).value = data.gen_info.crscode;
		worksheet.getCell(config.cells.acadyear).value = data.gen_info.acadyear
		worksheet.getCell(config.cells.sem).value = data.gen_info.sem;
		worksheet.getCell(config.cells.batchyear).value = data.gen_info.batchyear;

		for(i=0;i<8;++i){
			worksheet.getCell(config.cells['series1co' + (i + 1) + 'perc']).value = data.series1.attainment.perc['CO' + (i + 1)] !== 'nill' ? data.series1.attainment.perc['CO' + (i + 1)] : undefined;
			worksheet.getCell(config.cells['series2co' + (i + 1) + 'perc']).value = data.series2.attainment.perc['CO' + (i + 1)] !== 'nill' ? data.series2.attainment.perc['CO' + (i + 1)] : undefined;
			worksheet.getCell(config.cells['assign1co' + (i + 1) + 'perc']).value = data.assign1.attainment.perc['CO' + (i + 1)] !== 'nill' ? data.assign11.attainment.perc['CO' + (i + 1)] : undefined;
			worksheet.getCell(config.cells['assign2co' + (i + 1) + 'perc']).value = data.assign2.attainment.perc['CO' + (i + 1)] !== 'nill' ? data.assign2.attainment.perc['CO' + (i + 1)] : undefined;

			worksheet.getCell(config.cells['series1co' + (i + 1) + 'level']).value = data.series1.attainment.level['CO' + (i + 1)] !== 'nill' ? data.series1.attainment.level['CO' + (i + 1)] : undefined;
			worksheet.getCell(config.cells['series2co' + (i + 1) + 'level']).value = data.series2.attainment.level['CO' + (i + 1)] !== 'nill' ? data.series2.attainment.level['CO' + (i + 1)] : undefined;
			worksheet.getCell(config.cells['assign1co' + (i + 1) + 'level']).value = data.assign1.attainment.level['CO' + (i + 1)] !== 'nill' ? data.assign1.attainment.level['CO' + (i + 1)] : undefined;
			worksheet.getCell(config.cells['assign2co' + (i + 1) + 'level']).value = data.assign2.attainment.level['CO' + (i + 1)] !== 'nill' ? data.assign2.attainment.level['CO' + (i + 1)] : undefined;

			worksheet.getCell(config.cells['intco' + (i + 1) + 'perc']).value = data.internal_attainment.perc['CO' + (i + 1)] !== 'nill' ? data.internal_attainment.perc['CO' + (i + 1)] : undefined;
			worksheet.getCell(config.cells['intco' + (i + 1) + 'level']).value = data.internal_attainment.level['CO' + (i + 1)] !== 'nill' ? data.internal_attainment.level['CO' + (i + 1)] : undefined;
		}

		worksheet.getCell(config.cells.avgintperc).value = data.internal_attainment.avg.perc;
		worksheet.getCell(config.cells.avgintlevel).value = data.internal_attainment.avg.level;

		worksheet.getCell(config.cells.avgextperc).value = data.univ.attainment.perc;
		worksheet.getCell(config.cells.avgextlevel).value = data.univ.attainment.level;

		worksheet.getCell(config.cells.overallperc).value = data.total_attainment.perc;
		worksheet.getCell(config.cells.overalllevel).value = data.total_attainment.level;

		for(i=0;i<3;++i){
			worksheet.getCell(config.cells['series1thresh' + (i + 1)]).value = data.series1['thresh' + (i + 1)];
			worksheet.getCell(config.cells['series2thresh' + (i + 1)]).value = data.series2['thresh' + (i + 1)];
			worksheet.getCell(config.cells['assign1thresh' + (i + 1)]).value = data.assign1['thresh' + (i + 1)];
			worksheet.getCell(config.cells['assign2thresh' + (i + 1)]).value = data.assign2['thresh' + (i + 1)];
			worksheet.getCell(config.cells['univthresh' + (i + 1)]).value = data.univ['thresh' + (i + 1)];
		}

		worksheet.getCell(config.cells.series1target).value = data.series1.target;
		worksheet.getCell(config.cells.series2target).value = data.series2.target;
		worksheet.getCell(config.cells.assign1target).value = data.assign1.target;
		worksheet.getCell(config.cells.assign2target).value = data.assign2.target;
		worksheet.getCell(config.cells.univtarget).value = data.univ.target;

		worksheet.getCell(config.cells.univweightage).value = data.gen_info.weightext;
		worksheet.getCell(config.cells.intweightage).value = data.gen_info.weightint;
		worksheet.getCell(config.cells.intseriesweightage).value = data.gen_info.intseries;
		worksheet.getCell(config.cells.intassignweightage).value = data.gen_info.intassign;

		//var save_path = path.join(__dirname,'/data/' + data.gen_info.univ_type + data.gen_info.acadyear + data.gen_info.crscode + data.gen_info.name + '.xlsx');

		workbook.xlsx.writeFile('test.xlsx').then(function(){
			console.log('done');
			callback(false);
		});
	});
};



module.exports = xl;