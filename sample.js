(function(ext) {

    var post_start = 1;
    var post_next = 1;
    var post_previous = 1;

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {
    };

    // Status reporting code
    // Return any message to be displayed as a tooltip.
    // Status values: 0 = error (red), 1 = warning (yellow), 2 = ready (green)
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.callback = function( value ){
        return value;
    };

   ext.get_title = function(callback) {
          // Make an AJAX call to the WordPress REST API for the site title
          $.ajax({
                url: 'http://rest-api-demo.q21.co/wp-json/',
                dataType: 'json',
               // jsonp:false, // make it to false, to use your function on JSON RESPONSE
               //  jsonpCallback: 'response',
                success: function(ret){
                  callback(ret.name);
                }


          });
      };

     ext.get_description = function(callback) {
        // Make an AJAX call to the WordPress REST API to get site description
        $.ajax({
              url: 'http://rest-api-demo.q21.co/wp-json/',
              dataType: 'json',
             // jsonp:false, // make it to false, to use your function on JSON RESPONSE
             //  jsonpCallback: 'response',
              success: function(ret){
                callback(ret.description);
              }


        });
    };

         ext.get_next_posts = function(callback) {

            // Make an AJAX call to the WordPress REST API to get site description
            $.ajax({
                  url: 'http://rest-api-demo.q21.co/wp-json/wp/v2/posts?per_page=1&page='+post_start,
                  dataType: 'json',
                 // jsonp:false, // make it to false, to use your function on JSON RESPONSE
                 //  jsonpCallback: 'response',
                  success: function(ret){
                    console.log(ret);
                    callback('1');
                  }


            });
            post_start++;
        };

         ext.get_post_ids = function(callback) {
          //handle pagination somehow???

        // Make an AJAX call to the WordPress REST API to get a collection of post ids
        $.ajax({
              url: 'http://rest-api-demo.q21.co/wp-json/wp/v2/posts/',
              dataType: 'json',
             // jsonp:false, // make it to false, to use your function on JSON RESPONSE
             // jsonpCallback: 'response',

              success: function(ret){
                var post_ids = [];

                for (var i = ret.length - 1; i >= 0; i--) {
                  post_ids.push(ret[i]['id']);
                };
              callback(post_ids);
              }
        });
        // postcounter_scratchx = postcounter_scratchx + 1;
    };

    ext.set_post = function(post, value) {
      console.log(post);
      console.log(value);
    }

     ext.get_post_next_post = function(callback, scratch_id) {
            console.log(scratch_id);
            //find out what the first thing thrown is,


        // Make an AJAX call to the WordPress REST API to get site description
        $.ajax({
              url: 'http://rest-api-demo.q21.co/wp-json/wp/v2/posts/'+postcounter_scratchx+'',
              dataType: 'json',
             // jsonp:false, // make it to false, to use your function on JSON RESPONSE
             //  jsonpCallback: 'response',
              success: function(ret){
                callback(ret[0]);
              }


        });
        postcounter_scratchx = postcounter_scratchx + 1;
    };


         ext.get_user = function(callback) {

        // Make an AJAX call to the WordPress REST API to get site description
        $.ajax({
              url: 'http://rest-api-demo.q21.co/wp-json/wp/v2/user/1',
              dataType: 'json',
             // jsonp:false, // make it to false, to use your function on JSON RESPONSE
             //  jsonpCallback: 'response',
              success: function(ret){
                callback(ret.description);
              }


        });
    };

     ext.access_scratch_dataset = function(data, callback) {
        console.log(data);
        console.log(callback);
        console.log(getVar(foo));

    };


	ext.start = function() {
		return true;
	};

	ext.say = function() {

	};

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['h', 'Enable WordPress REST API', 'start'],
            ['R', 'Site Title', 'get_title'],
            ['R', 'Site Description', 'get_description'],
            ['R', 'NEXT POST', 'get_posts'],
            ['R', 'Post ID', 'get_post_ids', 1],
            ['R', 'Next Post', 'get_next_post'],
            [' ', 'Set %m.post_pagination to %n', 'set_post', 'post_now', '1'],
            [' ', 'Set %m.post_pagination to %n', 'set_post', 'post_now', '1'],
            // [' ', 'Access', 'access_scratch_dataset'],

        ],
        menus : {
          post_pagination: ['post_next', 'post_previous'],
        },
        url: 'http://rfair404.github.io/WP-REST-API-FOR-SCRATCHX' // Link to extension documentation, homepage, etc.
    };

    // Register the extension
    ScratchExtensions.register('WORDPRESS-REST-API', descriptor, ext);
})({});
