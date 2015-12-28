/**
 * Created by leibosite on 2015/11/25.
 */
var qr = require('qr-image');
var connect = require('connect');
var nodeExcel = require('excel-export');
var xlsx = require('node-xlsx');
var fs = require('fs');

module.exports = {
  generateQr:function(req,res){

    var url = 'http://wechat.yuetech.com.cn:50001?activityId=1&action=sign';
    var qr_svg = qr.image(url, { type: 'png' });
    qr_svg.pipe(require('fs').createWriteStream('D:\\1.png'));

    var svg_string = qr.imageSync('hello world!', { type: 'png' });
    sails.log.info(svg_string.toString());

    res.ok('生成OK');
  },
  getExcel: function(req,res){
    var conf ={};
    conf.cols = [
      {caption:'string', type:'string',width:50},
      {caption:'date', type:'date',width:50},
      {caption:'bool', type:'bool',width:50},
      {caption:'number', type:'number',width:50}
    ];
    conf.rows = [
      ['pi', (new Date(2013, 4, 1)).getDate(), true, 3.14],
      ["e", (new Date(2012, 4, 1)).getDate(), false, 2.7182]
    ];
    var result = nodeExcel.execute(conf);
    res.set('Content-Type', 'application/vnd.openxmlformats');
    res.set('Content-Disposition', 'attachment; filename=' + 'Report.xlsx');
    res.end(result, 'binary');
  },

  nodeExcelExport: function(req,res){
    var data = [[1,2,3],[true, false, null, 'sheetjs'],['foo','bar',new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
    var buffer = xlsx.build([{name: "mySheetName", data: data}]); // returns a buffer
    res.end(buffer,'binary');
  },
  downLoadPicture: function(req,res){
    //var activityId = req.param('activityId');
    sails.log.info('------start read------');
    fs.readFile('D:\\1.png', function (err, data) {
      if (err) {
        sails.log.info('error',err);
      }
      sails.log.info('------start response------',data);
      if(data){
        sails.log.info('data length----',data.length);
        //res.set('Content-Type', 'image/jpeg');

        //res.set()
        res.attachment('1.png');

        res.end(data,'binary');
      }

    });
    //res.attachment('http://wechat.yuetech.com.cn:8088/financial/activity/8.png');

    //res.end('binary');

  }
}
