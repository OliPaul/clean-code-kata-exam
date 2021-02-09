module.exports = {
    auth: function(userID, role){
        const user = {
            userID: userID,
            role: role
        }

        return user;
    }
}