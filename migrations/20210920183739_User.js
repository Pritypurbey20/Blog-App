
exports.up = function(knex) {
    return knex.schema
    .createTable('Signup', function(table){
        table.string('Name')
        table.string('Email')
        table.string('Password')
    })
    
    .createTable('Post',function(table){
        table.string('Email')
        table.string('Post')
        table.string('Like')
        table.string('Dislike')
    })
    .createTable('Count',function(table){
        table.string('Email')
        table.string('Post')
        table.string('Like_or_Dislike')
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('Signup')
    .dropTable('Post')
    .dropTable('Count')
};
