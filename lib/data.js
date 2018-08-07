var fs = require('fs');
var path = require('path');

var lib = {};

lib.baseDir=path.join(__dirname,'/../.data/')

lib.create = function(dir,file,data,callback){
    fs.open(lib.baseDir+dir+'/'+file+'.json','wx',function(err,fileDescriptor){
       if(!err && fileDescriptor){
    var stringData=JSON.stringify(data);
    fs.writeFile(fileDescriptor,stringData,function(err){
        if(!err){
            fs.close(fileDescriptor,function(err){
              if(!err){

              }
            })
        }
    })
       }
       else{
           callback('Could not create new file')
       }
    });
};

lib.read=function(dir,file,callback){
    fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf8',function(err,data){
        callback(err,data);
    })
}

lib.update=function(dir,file,data,callback){
fs.open(lib.baseDir+dir+'/'+file+'.json','r+',function(err,fileDescriptor){
    if(!err && fileDescriptor){
     var stringData = JSON.stringify(data);
     fs.truncate(fileDescriptor,function (err){
      if(!err){
        fs.writeFile(fileDescriptor,stringData,function(err){
            if(!err){
                fs.close(fileDescriptor,function(err){
                    if(!err){
                        callback(false);
                    }
                })
             }
        })
      }  
    })
    }
})
}

lib.delete=function(dir,file,callback){
    fs.unlink(lib.baseDir+dir+'/'+file+'.json',function(err){
        if(!err){
        callback(false);
        }
    })
}

module.exports=lib;