module.exports = (row) => {
    return {
        condition: [{
                changeTarget: row.user_pw,
                defineIf: !row.user_pw.length > 0,
                changedValue: 'default'
            },
            //add your row condition
        ],
        NoSQLMatchKey : {
                user_id : username,
                user_pass : password
                //add your document key
            }
        
    }
};
