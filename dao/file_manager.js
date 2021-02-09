const fs = require('fs');

module.exports = {
    write: function (file, data) {
        var isWrote = false
        fs.appendFile(file, data + "\n", function (error) {
            if (!error) {
                isWrote = true;
            }
        });

        return isWrote;
    },
    read: function (file) {
        const data = fs.readFileSync(file, "utf8");
        return data;
    },
    delete: function (file, dataToDelete) {
        var isDeleted = false;

        isDeleted = fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                isDeleted = false;
                return;
            }

            fs.writeFile(file, dataToDelete, 'utf8', function (err) {
                if (err) {
                    console.log(err);
                    isDeleted = false;
                    return;
                }
                isDeleted = true;
            });

            return isDeleted;
        });

        return isDeleted;
    }
}