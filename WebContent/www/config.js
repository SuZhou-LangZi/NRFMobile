var AmApp = function(){};

AmApp.config = {
	"ServiceRealRootPath":"http://192.168.69.155:8085/NRFPhoneServer",
    "ServiceRootPath":"http://192.168.69.155:8085/NRFPhoneServer/JSONService?method=",
    // "ServiceRealRootPath":"http://192.168.101.105:9080/RFPhoneServer",
	// "ServiceRootPath":"http://192.168.101.105:9080/RFPhoneServer/JSONService?method=",
    "DeviceType":"MobileAndroid",
    "ServiceTimout":90000,
    "Version":"1.0",
    "enviroment":"dev",//produ
    "sysSelType":"010",  //"010"传统信贷  "020"金融板块
    "commericalLoanRate":4.35 //贷款计算器基准利率
};

