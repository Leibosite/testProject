/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	generateQr:function(req,res){
    GenerateQrImage.generateQr(req,res);
  },
  getExcel: function(req,res){
    GenerateQrImage.getExcel(req,res);
  },
  nodeExcelExport: function(req,res){
    GenerateQrImage.nodeExcelExport(req,res);
  },
  downLoadPicture: function(req,res){
    GenerateQrImage.downLoadPicture(req,res);
  }
};

