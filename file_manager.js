const fs =  require('fs'); 

module.exports = {
    write: function(file, data){
        const isWrote = false
        fs.appendFile(file, data + "\n", function(error){
            if(!error){
                isWrote = true;
            }
        });

        return isWrote;
    },
    read: function(file){
        const data = fs.readFileSync(file, "utf8");
        return data;
    }
}